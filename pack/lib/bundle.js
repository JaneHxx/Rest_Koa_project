const fs = require('fs')
const uglify = require('uglify-js')
const path = require('path');

const bundle = async function (deps, entry, outPath, isCompress) {
    let modules = ''
    let moduleId
    deps.forEach(dep => {
        // var filePath = dep.reletivePaht || entry
        var id = dep.id
        modules = modules + `${id}: function (module, exports, require) {${dep.code}},`
    });
    let result = `
        (function (modules, mType) {
            function require (id) {
                var module = { exports: {}}
                var module_id = require_moduleId(mType, id)
                modules[module_id](module, module.exports, require)
                return module.exports
            }
            require('${entry}')
        })({${modules}},${JSON.stringify(deps)});
        function require_moduleId (typelist, id) {
            var module_id
            typelist.forEach(function (item) {
                if(id === item.filePath || id === item.reletivePaht){
                    module_id = item.id
                }
            })
            return module_id
        }
    `
    if(isCompress) {
        result = uglify.minify(result,{ mangle: { toplevel: true } }).code
    }
    await existDir(outPath);
    fs.writeFileSync(path.join(outPath + '/bundle.js'), result);
    console.log('打包完成【success】（./bundle.js）')
};

/**
 * 获取路径信息
 * @param path
 * @returns {Promise<any>}
 */
const getStats = function (path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats);
            }
        });
    });
};

/**
 * 创建目录
 * @param dir
 * @returns {Promise<any>}
 */
const mkDir = function (dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, (err) => {
           if (err) {
               resolve(false);
           } else {
               resolve(true);
           }
        });
    });
};

const existDir = async function (dir) {
    let isExists = await getStats(dir);
    try {
        if (isExists) {
            if (isExists.isDirectory()) {
                return true;
            } else if (isExists) {  // 如果路径存在，且是文件
                return false;
            }
        }
    } catch (e) {
        console.error(e.message);
    }

    let tempDir = await path.parse(dir).dir;   //拿到上级目录
    let status = await existDir(tempDir);
    let mkDirStatus;
    if (status) {
        mkDirStatus = mkDir(dir);
    }
    return mkDirStatus;
};

module.exports = bundle