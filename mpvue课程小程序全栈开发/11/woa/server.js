const Woa = require('./application');
const app = new Woa();

app.use(async (ctx, next) => {
    ctx.body = '1';
    await next();
    ctx.body += '2';
})
app.use(async (ctx, next) => {
    ctx.body += '3';
    await delay();
    await next();
    ctx.body += '4';
})
app.use(async (ctx, next) => {
    ctx.body += '5';
})

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}
// app.use((req, res) => {
//     res.writeHead(200);
//     res.end('hello imooc');
// })

app.listen(9092, () => {
    console.log('server running on port 9092');
})












// const http = require('http');

// const server = http.createServer((req,res) => {
//     res.writeHead(200);
//     res.end('hello imooc');
// })

// server.listen(9092, () => {
//     console.log('server starts on port 9092')
// })