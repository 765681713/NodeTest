const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const static = require('koa-static');
const views = require('koa-views')

app.use(static(__dirname + '/public'));
app.use(views('views',{extension:'ejs'}));
app.use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
  
  next();
});

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.render(index);
});


app.listen(3000);