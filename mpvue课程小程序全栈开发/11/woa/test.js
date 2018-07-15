async function fn1(next) {
    console.log('fn1');
    await next();
    console.log('end fn1');
}
async function fn2(next) {
    console.log('fn2');
    await delay(); //延迟异步的中间件
    await next();
    console.log('end fn2');
}

function fn3(next) {
    console.log('fn3');
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}
//实现异步的compose
function compose(middlewares) {
    return () => {
        return dispatch(0);

        function dispatch(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve(); //如果没有fn,则证明中间件执行结束
            }
            //否则手动执行下一个中间件
            return Promise.resolve(fn(function next() {
                return dispatch(i + 1);
            }))
        }
    }
}
const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();




// function add(x, y) {
//     return x + y;
// }

// function double(z) {
//     return z * 2;
// }

// const middlewares = [add, double];
// let len = middlewares.length;

// function compose(midds) {
//     return (...args) => {
//         //将第一个函数执行并作为初始值，...args获取参数1,2,midds[0]=>add()==>add(1,2)
//         let res = midds[0](...args);
//         //从i=1开始
//         for (let i = 1; i < len; i++) {
//             res = midds[i](res);//add(1,2)=>3==>double(3)
//         }
//         return res
//     }
// }
// const fn = compose(middlewares);
// const res = fn(1, 2);
// console.log(res);


// const res1 = add(1, 2);
// const res2 = double(res1);
// console.log(res2);

// const res3=double(add(1,2));
// console.log(res3);



// let woniu = {
//     _name: '蜗牛',
//     get name() {
//         return this._name;
//     },
//     set name(val) {
//         console.log("new name is " + val);
//         this._name = val;
//     }

// }
// console.log(woniu.name);
// woniu.name = 'imooc';
// console.log(woniu.name);