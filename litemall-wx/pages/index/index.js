const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: [],
    allGoods: [],
    // 所有商品下拉分页
    allGoodsPageNum: 1,   // 设置加载的第几次，默认是第一次  
    allGoodsPageSize: 10,      //返回数据的个数  
    allGoodsRefreshTime:"",             // 刷新时间
    allGoodsHasMoreData: false, //是否还有更多数据，默认false，隐藏
    allGoodsMoreDataMessage:"正在载入更多..."   // 还有更多时候展示的信息  
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '我爱败家微信小程序商城',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brands: res.data.brandList,
          floorGoods: res.data.floorGoodsList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
  },

  getGoodsInPaging: function(){
    let that = this;
    console.log(that)
    console.log(that.data.allGoodsPageNum)
    util.request(api.GoodsList + "?page=" + that.data.allGoodsPageNum + "&size=" + that.data.allGoodsPageSize).then(function (res) {
      if (res.errno === 0) {
        
        if (that.data.allGoodsPageNum * that.data.allGoodsPageSize<res.data.count){
          that.setData({
            allGoods: res.data.goodsList,
            allGoodsHasMoreData: true
          });
          
        }else{
          that.setData({
            allGoods: res.data.goodsList,
            allGoodsHasMoreData: false,
            allGoodsMoreDataMessage:"已经到底啦..."
          });
        }
        console.log();
      }else{
        console.log(res)
      }
    });
  },

  onLoad: function (options) {
    this.getIndexData();
    this.getGoodsInPaging();
    console.log(this.data)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  // 所有商品类目分页查询
  allGoodsScrollLower: function () {
    let that = this;
    console.log("that.data.allGoodsHasMoreData" + that.data.allGoodsHasMoreData);
    if (that.data.allGoodsHasMoreData) {
      that.setData({
        allGoodsPageNum: that.data.allGoodsPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
      });
      console.log(that.data);
      that.getGoodsInPaging();
    }
  }  
})
