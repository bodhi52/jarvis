#!/bin/sh bash
# 发布脚本，需要从jenkins中下载，然后复制到对应的项目中
# 发布工程目录
PROJ_DIR="$WORKSPACE"

# 验证是否是root用户
if [ `whoami` = "root" ];then
    echo "root用户！"
else
    echo "非root用户！"
fi
echo "---------------开始构建-----------------------"

# 网站的访问目录为/data/wwwroot/jarvis/dist.
# 在访问目录下保留node_modules，以免除npm install 耗费时间

# 进入项目文件删除原有的配置和src
cd '/data/wwwroot/jarvis'
rm -rf 'dist/' 'src/' 'package.json' 'angular.json' 'tsconfig.json'
echo "---------------开始拷贝-----------------------"
# 开始拷贝
cp -r $PROJ_DIR/src '/data/wwwroot/jarvis/'

cp -r $PROJ_DIR/package.json '/data/wwwroot/jarvis/'

cp -r $PROJ_DIR/angular.json '/data/wwwroot/jarvis/'

cp -r $PROJ_DIR/tsconfig.json '/data/wwwroot/jarvis/'

echo "---------------拷贝结束-----------------------"
npm run bulid
echo "--打包结束-----------------------"