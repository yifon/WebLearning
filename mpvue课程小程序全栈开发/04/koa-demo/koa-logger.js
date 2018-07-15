//遍历中间件，输出进入中间件和出中间件的所有时间
module.exports = async (ctx, next) => {
    const start = new Date().getTime(); //进入中间件1的时间
    await next();
    const end = new Date().getTime(); //出中间件1的时间
    //打印请求路由，进出中间件耗时，整个网络请求的body长度
    console.log(ctx.request.url, end - start, ctx.body.length);
}