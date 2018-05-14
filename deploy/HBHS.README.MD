HBHS项目打包部署如下：
1. 进入项目根目录下，类似如下：

~~~~~~
juqi@LAPTOP-PTEU0ADI MINGW64 /d/00_project/minimall/litemall (master)
$ ls
CHANGELOG.md   LICENSE    deploy  installer       litemall-admin-api  litemall-core  litemall-os-api  litemall-wx-api  pom.xml
CONTRIBUTE.md  README.md  doc     litemall-admin  litemall-all        litemall-db    litemall-wx      litemall.iml

~~~~~~

2. 在项目根目录下执行如下脚本：

~~~~
./deploy/util/hbhs.lazy.sh
~~~~

3. 执行完成后会完成自动打包和上传，完成后，最终项目会放到服务器的/opt/service/mini-mall下

4. 通过ssh进入服务器，进入目录/opt/service/mini-mall,执行如下脚本

~~~~
[root@izbp13056tlb7hykfrik75z mini-mall]# 
[root@izbp13056tlb7hykfrik75z mini-mall]# ll
total 36
drwxr-xr-x 2 root root 4096 May 14 20:02 bin
drwxr-xr-x 2 root root 4096 May  4 19:27 cert
drwxr-xr-x 3 root root 4096 May 14 20:19 litemall-admin
drwxr-xr-x 2 root root 4096 Apr 24 13:57 litemall-admin-api
drwxr-xr-x 2 root root 4096 Apr 24 13:57 litemall-db
drwxr-xr-x 3 root root 4096 Apr 24 14:01 litemall-os-api
drwxr-xr-x 2 root root 4096 Apr 24 13:57 litemall-wx-api
-rw-r--r-- 1 root root 2313 May 14 19:59 README.md
drwxr-xr-x 2 root root 4096 Apr 24 13:58 util
[root@izbp13056tlb7hykfrik75z mini-mall]# ./bin/hbhs.deploy.sh 
~~~~

5. 执行完成后即可查看项目