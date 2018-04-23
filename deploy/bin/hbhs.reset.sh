#!/bin/bash

# 本脚本的作用是重置部署环境
# 1.重置数据库
# 2.删除storage文件夹内文件
# 3.调用deploy.sh启动服务
# 注意：由于1和2的原因，请仅在开发测试阶段使用本脚本！


# 重置数据库
# i. 请在`XXXXXX`处设置相应的root密码
# ii. 同时请注意root密码放在脚本是非常危险的，因此这里仅仅是用于开发测试阶段。
cd /opt/service/mini-mall/deploy/litemall-db
cat litemall_schema.sql > db.sql
cat litemall.sql >> db.sql
mysql -h localhost -u root -p1qaz@WSX < db.sql
rm db.sql
cd /opt/service/mini-mall/deploy/litemall-db

# 删除storage文件夹内文件
cd /opt/service/mini-mall/deploy/litemall-os-api/storage
rm -f ./**

# 重新部署服务
cd /opt/service/mini-mall/deploy/bin
sudo ./deploy.sh