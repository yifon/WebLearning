/**
 * 1.合并多个对象为一个对象，如{a:1},{b:2,c:3}...===>{a:1,b:2,c:3...}
 */
{
    //ES5以上写法
    function set() {
        Object.assign(this, ...arguments);
        console.log(this)
    }
    set.call({
        a: 1
    }, {
        b: 2,
        c: 3
    }); //{a:1,b:2,c:3}
} {
    //旧的写法
    function set() {
        for (let i = 0; i < arguments.length; i++) {
            for (key in arguments[i]) {
                this[key] = arguments[i][key];
            }
        }
        return this;
    }
    set.call({
        a: 1
    }, {
        b: 2,
        c: {
            d: 4,
            f: 5
        }
    });
} {
    /**
     * 一道不错的面试题
     * 要求写出输出结果
     */
    var length = 10;

    function fn() {
        debugger;
        console.log(this); //第一次this为Window,第二次为Arguments(2)[f,5]
        console.log(this.length);
    }
    var test = {
        length: 5,
        callFn: function (fn) {
            fn(); //10
            arguments[0](); //调用fn,同时this指向了arguments,所以this.length就是arguments的长度
        }
    }
    test.callFn(fn, 5); //10,2
    /*
    这道题很迷惑性，实际上有两个输出，一个是fn()，一个是arguments[0]()
     a.fn():考察的是this的指向问题，匿名函数中this指向Window，所以输出10
     b.arguments[0]():这里arguments[0]指的是callFn的第一个参数fn，即==>fn()
     所以fn()实际上还是让输出this.length,但此时的this是callFn的Arguments,所以长度始终为callFn参数个数,即2
     */
} {
    /**
     * 改用箭头函数，不能使用arguments,但可以用rest参数替代
     */
    var length = 10;

    function fn() {
        debugger;
        console.log(this); //第一次this为Window,第二次为Array(2)[ƒ, 5]
        console.log(this.length);
    }
    var test = {
        length: 5,
        callFn: (...rest) => {
            fn(); //10
            rest[0](); //2
        }
    }
    test.callFn(fn, 5);
}