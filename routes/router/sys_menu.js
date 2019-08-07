const Router = require('koa-router');
const SysMenuController = require('../../controller/sys_menu');

var router = new Router({
    prefix: '/api/sys/menu'
});

// 创建
router.post('/create', SysMenuController.create);

//获取菜单列表
router.get('/list', SysMenuController.list);

//获取菜单列表分页数据
router.post('/list/page', SysMenuController.listByPage);

module.exports = router;




