const Router = require('koa-router');

const router = new Router({
  prefix: '/'
});
// 默认跳转至首页
router.get('/', async (ctx, next) => {
  await ctx.render('index.html', {
      title: 'koa2'
  });
});
// web-worker计数器，根据输入时间统计次数
router.get('web-worker/count', async (ctx, next) => {
  await ctx.render('web-worker-count.html');
});

router.get('index/title', async (ctx, next) => {
  ctx.response.status = 200;
  ctx.body = {
    title: 'koa2'
  }
});

module.exports = router;
