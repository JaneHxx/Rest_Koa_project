const SysMenuModel = require('../models/sys_menu');

class SysMenuController {

    static async create (ctx, next) {
        let req = ctx.request.body;
        if (req.parent_id &&
            req.name &&
            req.type &&
            req.order_num &&
            req.sta) {
            try {
                // 创建菜单,并返回菜单id
                const ret = await SysMenuModel.create(req);
                // 查询菜单详情
                const data = await SysMenuModel.getMenuDetail(ret.menu_id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建成功',
                    data
                };
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败'
                };
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            };
        }
    }

    /**
     * 获取分页数据
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    static async listByPage (ctx, next) {
        let req = ctx.request.body;
        if (req.page &&
            req.limit) {
            try {
                // 分页查询菜单详情
                let data = await SysMenuModel.getMenuListByPage(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建成功',
                    data
                };
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败'
                };
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            };
        }
    }

    /**
     * 获取侧边栏菜单列表数据
     * @param ctx
     * @returns {Promise<void>}
     */
    static async list (ctx) {
        try {
            // 分页查询菜单详情
            let data = await SysMenuModel.getMenuList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建成功',
                data
            };
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败'
            };
        }
    }
}

module.exports = SysMenuController;


