const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const static = require('koa-static');
const views = require('koa-views')

app.use(static(__dirname + '/public'));
app.use(views('views',{extension:'ejs'}));


router.get('/',async (ctx)=>{
  let title = '你好ejs';
  let list = ['哈哈','嘻嘻','看看','问问'];
  let content = "<h2>这是一个h2</h2>";
  let num = 10;
  await ctx.render('index',{
      title,list,content,num
  });
});


app.use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


app.listen(3000);