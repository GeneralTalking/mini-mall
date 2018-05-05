/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        console.log("微信登陆成功: ");
        console.log(res);
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        console.log("微信登陆失败: ");
        console.log(err);
        reject(err);
      }
    });
  });
}

/**
 * Promise封装wx.getUserInfo
 */
function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log("获取微信用户信息成功: ")
        console.log(res);
        resolve(res);
      },
      fail: function (err) {
        console.log("获取微信用户信息失败: ")
        console.log(err);
        wx.showModal({
          title: '用户未授权',
          content: '请给予您的用户信息授权。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.userInfo"] === true) {
                    wx.getUserInfo({
                      withCredentials: true,
                      success: function (res) {
                        resolve(res);
                      },
                    })
                  }
                }
              })
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      code = res.code;
      return getUserInfo();
    }).then((userInfo) => {
      console.log("开始调用服务保存用户信息...")
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
        console.log("保存用户信息返回：");
        console.log(res);
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        console.log("保存用户信息失败：");
        console.log(err);
        reject(err);
      });
    }).catch((err) => {
      console.log("保存用户信息失败：");
      console.log(err);
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin,
};











