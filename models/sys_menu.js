// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const SysMenu = Sequelize.import('../schema/sys_menu');
console.log(SysMenu);
SysMenu.sync({force: false}); // 自动创建表

class SysMenuModel {
    /**
     * 创建菜单或目录
     * @param data
     * @returns {Promise<*>}
     */
    static async create (data) {
        return await SysMenu.created({
            parent_id: data.parent_id,
            name: data.name,
            url: data.url,
            perms: data.perms,
            type: data.type,
            icon: data.icon,
            order_num: data.order_num,
            sta: data.sta
        });
    }

    /**
     * 查询菜单详情
     * @param id
     * @returns {Promise<*>}
     */
    static async getMenuDetail (id) {
        return await SysMenu.findOne({
            where: {
                menu_id: id
            }
        });
    }

    /**
     * 查询菜单列表
     * @param page
     * @param limit
     * @returns {Promise<void>}
     */
    static async getMenuList () {
        return await SysMenu.findAll({row:true});
    }

    /**
     * 查询菜单列表
     * @param page
     * @param limit
     * @returns {Promise<void>}
     */
    static getMenuListByPage ({page, limit}) {
        return new Promise((resolve, reject) => {
            SysMenu.findAndCountAll({
                limit: limit,
                offset: parseInt(page - 1) * limit
            }).then((result) => {
                resolve(result);
            });
        });
    }
}

module.exports = SysMenuModel;

