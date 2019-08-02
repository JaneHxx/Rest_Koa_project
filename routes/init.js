const fs = require('fs');
const path = require('path');
module.exports = {
    app: null,
    dirPath: '../routes/',
    // 动态加载路由
    listDir: function (pathName) {
        let fileList = fs.readdirSync(pathName, 'utf-8');
        for (let i = 0; i < fileList.length; i++) {
            let file = fileList[i];
            let stat = fs.lstatSync(path.join(pathName, file));
            if (stat.isDirectory()) {
                this.listDir(path.join(pathName, file, '/'));
            } else {
                this.loadRoute(path.join(pathName, file));
            }
        }
    },
    // 加载路由
    loadRoute: function (filePath) {
        let absolutePath = path.resolve(filePath);
        let routePath = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.'));
        const route = require(absolutePath);
        // 注册路由
        this.app.use(route.routes(), route.allowedMethods());
    },
    // 初始化
    init: function (app, dirPath) {
        if (!app) {
            console.error("系统参数未设置!");
            return false;
        }
        this.app = app;
        this.dirPath = dirPath ? dirPath : this.dirPath;
        this.listDir(this.dirPath);
    }
};