const Router = require('koa-router');
const ArticleController = require('../../controller/article');

const router = new Router({
  prefix: '/api/article'
});

router.get('/', async (ctx, next) => {
  ctx.render('article/index.html');
});

/**
 * 文章接口
 */
//创建文章
router.post('/create',ArticleController.create);

//获取文章详情
router.get('/detail/:id',ArticleController.detail);

// 获取所有文章
router.post('/list',ArticleController.list);

module.exports = router;