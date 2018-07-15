function ajax(fn) {
    setTimeout(() => {
        console.log("你好")
        fn();
    })
}
//1.回调地狱
// ajax(() => {
//     console.log("执行结束");
//     ajax(() => {
//         ajax(() => {
//             ajax(() => {

//             })
//         })
//     })
// });

//2.promise
function delay(word) {
    //delay函数返回的是Promise对象
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello " + word);
        }, 2000)
    })
}
// delay("June").then(word => {
//     console.log(word);
//     return delay('yifon');
// }).then(word => {
//     console.log(word);
//     return delay('david');
// }).then(word => {
//     console.log(word);
// })

//3.async+await一起使用,async是定义一个函数,await是async函数内部用的,等待一个异步结束
async function start() {
    const word1 = await delay('june');
    console.log(word1);
    const word2 = await delay('jay');
    console.log(word2);
    const word3 = await delay('leo');
    console.log(word3);
}
start();