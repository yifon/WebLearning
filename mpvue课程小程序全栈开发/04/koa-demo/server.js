const Koa = require('koa');
const koaLog = require('./koa-logger');
const Router = require('koa-router');

const app = new Koa(); //应用的启动
const router = new Router(); //新建一个路由的实例

//访问根目录
router.get('/', (ctx, next) => {
    ctx.body = "孙悟空";
})
router.get('/zbj', (ctx, next) => {
    ctx.body = "猪八戒";
})

app.use(koaLog);

app.use(router.routes()) //把router所有的路由都注册进来
    .use(router.allowedMethods()); //允许的方法，如get,post都注册进来

//ctx:封装啦request和response的上下文
//next:下一个中间件
// app.use(async (ctx, next) => {
//     console.log(ctx);
//     if (ctx.request.url == '/') {
//         ctx.body = "jay"
//     } else if (ctx.request.url == '/jolin') {
//         ctx.body = "jolin"
//     } else {
//         ctx.body = '<h1>404</h1>'
//     }
//2s后再运行next(),而此时网络请求已经结束，所以输出结果为12
// setTimeout(() => {
//     next();
//     // }, 2000)
//     await next(); //加上await,等next延迟执行结束
//     ctx.body += '2';
// })
// app.use(async (ctx, next) => {
//     ctx.body += '3';
//     await delay();
//     await next();
//     ctx.body += '4';
// })
// app.use(async (ctx, next) => {
//     ctx.body += '5';
//     await next(); //加上await,等next延迟执行结束
//     ctx.body += '6';
// })
// app.use(async (ctx, next) => {
//     ctx.body = 'hello koa';
// })
// function delay() {
//     //delay函数返回的是Promise对象
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000)
//     })
// }
app.listen(3000);