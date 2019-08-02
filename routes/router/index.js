const Router = require('koa-router');

const router = new Router({
  prefix: '/'
});

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('index/title', async (ctx, next) => {
  ctx.response.status = 200;
  ctx.body = {
    title: 'koa2'
  }
});

module.exports = router
