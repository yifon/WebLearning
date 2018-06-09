import {
    POINT_CONVERSION_COMPRESSED
} from "constants";

/**
 * 一面:xxx大厦,xxx部门,感谢一个不认识的HR这么久了一直还有我的简历,推完了才告诉我
 * 感受:现场面,20min,面试官有两个梨涡，全程比较和善，这里主要记录下我觉得答得不全面，或者要去学习的点,一些觉得理解和回答得没有不满意的就不记录了
 * 二面:上午的电话上班太认真了，居然没看到，等到下午四五点其它短信过来，才发现有个来电提醒...机会差点就没了
 * 感受:电面,20min,比较开放性,聊思路,经验,学习规划,是否接受加班
 * 三面:
 */
{
    //1.mysql数据库引擎
    //-回答:不清楚,Tomcat?[打脸，不懂就不要随便猜]
} {
    //2.const声明一个数组的话，可以改变数组里面的值吗？
    //－回答：我认为是可以，但我倒是没实际测试过
    //[待拓展]
    /*
    http://es6.ruanyifeng.com/#docs/let#const-%E5%91%BD%E4%BB%A4
     const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），
     值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），
     变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
     */
    const arr = ['a', 'b', 'c'];
    arr[1] = 'd';
    console.log(arr); //['a','d','c']
} {
    //3.process.nextTick()和Promise优先级
    //－回答：阮一峰的博客有提过，看过，可能是process.nextTick(),不猜了，记不太清楚了
    //[参考]http://www.ruanyifeng.com/blog/2014/10/event-loop.html
    //https://segmentfault.com/a/1190000013102056#articleHeader10
    /*
    process.nextTick()优先级比Promise.then高，_tickCallback在每执行完一个任务队列中的任务后被调用，而这个_tickCallback中实质上干了两件事：
    1.nextTickQueue中所有任务执行完
    2.第一步执行完后执行_runMicrotasks函数,执行microtasks中的部分(promise.then注册的回调)
    */
    new Promise((resolve, reject) => {
        console.log(1);
        resolve(1);
    }).then(() => {
        console.log(2);
    }).catch(() => {
        console.log(4);
    })
    process.nextTick(() => {
        console.log(3);
    })
    console.log(5);
    //1  --->Promise内的部分为同步
    //5
    //3  -->process.nextTick()优先级高于promise.then
    //2
} {
    //4.如何定义一个私有属性
    //-回答:ES6 Symbol可以
    //-问:除了Symbol呢?
    //-回答:忘了....［尴尬］
    //[待拓展]
    {
        /*
        0.所谓私有属性，就是说Person内定义的属性只能给自己调用
        首先看看不定义私有属性会存在的问题,下面的_name属性会向外暴露给所有的实例了，不满足
        */
        function Person(name) {
            this._name = name;
        }
        let person = new Person("June");
        console.log(person._name); //June
    } {
        /*
        1.基于闭包的实现
        下面的_name就不会暴露给实例了
        缺点:私有变量和特权函数只能在构造函数中创建
        */

        function Person(name) {
            let _name = name;

            this.getName = function () {
                return _name;
            }
        }
        let person = new Person("June");
        console.log(person._name); //undefined
        console.log(person.getName()); //June
    } {
        /*
        2.基于WeakMap的实现
        */
        var Person = (function () {
            var privateData = new WeakMap();

            function Person(name) {
                privateData.set(this, {
                    _name: name
                })
            }
            //记得不要使用箭头函数，否则this指向的会是实例person,而不是当前Person内的上下文
            Person.prototype.getName = function () {
                console.log(this);//Person {}
                return privateData.get(this)._name;
            };
            return Person;
        })();
        let person = new Person("June");
        console.log(person._name); //undefined
        console.log(person.getName()); //June
    }
} {
    //5.CND的实现原理
    //-回答:其实是利用反向代理，多个代理服务器作为CDN服务器做负载均衡，平时看视频时网络不好会弹出是否切换线路，其原理就是就近原则找一个最近的CDN服务器
    //[待拓展]
} {
    //6.ES6的class用得多吗？
    //-回答:很少用,我用node.js
    //[待拓展]
} {
    //7.公司做的项目有没有经历过一些安全攻击的案例，如XSS
    //-回答:实话说没有,我们的服务器主要是走内网,也有部分功能是调用第三方外网服务器的,但是会用防火墙和代理服务器隔开[实际上觉得该说虽然没有经历,但是我懂原理,你可以问我...]
    //[待拓展]
} {
    //8.服务器端缓存
}