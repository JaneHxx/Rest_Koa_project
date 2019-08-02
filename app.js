const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const server = require('koa-static');
const path = require('path');

const routes = require('./routes/init');
// 实现一个cors标准，解决跨域问题
const cors = require('koa-cors');

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(server(path.join(__dirname + '/public')))

app.use(views(path.join(__dirname + '/views'), {
  extension: 'html'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(cors());
// routes初始化
routes.init(app, './routes/router/');
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
