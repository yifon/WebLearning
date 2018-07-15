const http = require('http');

let request = {
    get url() {
        return this.req.url;
    }
}
let response = {
    //修改body体
    get body() {
        return this._body;
    },
    set body(val) {
        this._body = val;
    }
}
//将request和response挂载到context上
let context = {
    get url() {
        return this.request.url;
    },
    get body() {
        return this.response.body;
    },
    set body(val) {
        this.response.body = val;
    }
}

class Application {
    constructor() {
        //this.callback = () => {
        //将上述定义好的三个对象挂载到application里
        this.context = context;
        this.request = request;
        this.response = response;
        this.middlewares = []; //初始值是一个空数组
    }
    //模拟use
    use(callback) {
        this.middlewares.push(callback); //将多个callback变成middlewares里的数组
        // this.callback = callback; //将本身的callback复制为外部传进去的callback
    }
    //实现异步的compose，控制每个中间件执行的顺序
    compose(middlewares) {
        //执行中间件最后的结果要给context
        return (context) => {
            return dispatch(0);

            function dispatch(i) {
                let fn = middlewares[i];
                if (!fn) {
                    return Promise.resolve(); //如果没有fn,则证明中间件执行结束
                }
                //否则手动执行下一个中间件
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1);
                }))
            }
        }
    }
    //
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            //挂载ctx,将request和response对象传递进去
            let ctx = this.createCtx(req, res);
            //先定义一个数组
            const fn = this.compose(this.middlewares); //
            await fn(ctx); //把上下文ctx传给fn,fn即为compose第一个return的函数
            // await this.callback(ctx); //将ctx直接传给callback
            ctx.res.end(ctx.body);
            // this.callback(req, res); //上面use里的callback
        })
        server.listen(...args); //把listen里的参数都传给server.listen
    }
    createCtx(req, res) {
        let ctx = Object.create(this.context); //继承复制一份新的对象,挂载了url和body
        //将request,response挂载到ctx上
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);

        //将原生的req,res也挂载到ctx和ctx.request上
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
}
module.exports = Application;