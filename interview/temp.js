{
    function a() {
        var i = 0;

        function b() {
            alert(++i);
        }
        return b;
    }
    var c = a();
    c();
} {
    function Parent() {}

    function Child() {}
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
    var child = new Child();
    console.log(child.constructor); //function Child(){}
    console.log(child instanceof Child);
} {
    //构造继承法instanceof
    function Animal() {}

    function Person() {
        Animal.call(this);
    }
    var p = new Person();
    console.log(p instanceof Animal); //false
} {
    //原型继承法instanceof
    function Animal() {}

    function Person() {}
    Person.prototype = Animal.prototype;
    var p = new Person();
    console.log(p instanceof Animal); //true
} {
    //原型继承法instanceof
    function Animal() {}

    function Person() {}
    Person.prototype = new Animal();
    var p = new Person();
    console.log(p instanceof Person); //true
    console.log(p instanceof Animal); //true
} {
    //实例继承instanceof  借腹生子
    function Person(name) {
        var instance = new Animal();
        return instance;
    }
    var p = new Person();
    console.log(p instanceof Animal); // true
    console.log(p instanceof Cat); // false
} {
    //复制继承instanceof
    function Animal() {
        this.name = "animal";
    }

    function Person() {}
    for (prop in Animal.prototype) {
        Person.prototype[prop] = Animal.prototype[prop];
    }
    Person.prototype.constructor = Person;
    var p = new Person();
    console.log(p instanceof Animal); //false
} {
    //实现数组的冒泡排序
    //此算法的时间复杂度为O(n^2),因为数组中的每个元素都要与其它元素进行一轮复杂度为O(n)的内循环，n * n==>总时间复杂度为O(n^2)
    function bubbleSort(oldArr) {
        for (var i = 0; i < oldArr.length - 1; i++) {
            for (var j = i; j < oldArr.length - 1; j++) {
                //如果下标较小的元素较大，则需替换位置，直到替换到本轮最小的元素
                if (oldArr[i] > oldArr[j]) {
                    var temp = oldArr[i];
                    oldArr[i] = oldArr[j]; //小的元素游标越小
                    oldArr[j] = temp; //大的元素替换向上
                }
            }
        }
        return oldArr;
    }
    var arr = [32, 55, 78, 43, 78, 10, 45, 20, 9, 89];
    console.log(bubbleSort(arr)); //[9, 10, 20, 32, 43, 45, 55, 78, 78, 89]
} {
    //1.改进上述冒泡排序的代码，让最佳情况下时间复杂度为O(n),最佳情况是数组为正序的情况
    //如[1,2,3,5,9],可以在内循环中加flag,第一轮完整的内部for循环先对前后数据两两比较，若从头到尾高位数字总是大于低位数字，则外循环可以终止，这样时间复杂度即为O(n);
    //需要设置一个flag来决定是否要中止外部for循环
    function bubbleSort(oldArr) {
        var didSwap;
        for (let i = 0; i < oldArr.length - 1; i++) {
            didSwap = false; //设置中止外循环的flag,以此优化循环
            var temp;
            for (let j = 0; j < oldArr.length - 1 - i; j++) {
                if (oldArr[j] > oldArr[j + 1]) {
                    temp = oldArr[j];
                    oldArr[j] = oldArr[j + 1]; //小数放前
                    oldArr[j + 1] = temp; //大数靠后
                    didSwap = true;
                }
            }
            //如果经过一轮内循环相邻数据的两两比较后，发现不需要置换数据，则正面数组本身就是正序的，此时最佳时间复杂度为O(n),中止外层循环;最差复杂度为O(n^2)，如刚好是降序的情况
            if (didSwap == false) {
                return oldArr;
            }
        }
        return oldArr;
    }
    let arr = [32, 55, 78, 43, 78, 10, 45, 20, 9, 89];
    console.log(bubbleSort(arr)); //[9, 10, 20, 32, 43, 45, 55, 78, 78, 89]
} {
    //通过构造闭包保存变量值
    //功能：单击页面中的超链接时，弹出该链接的编号
    //前：［因为闭包里共用里i值，执行里for循环后，都变成了统一的最大值］
    var a = document.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
        a[i].onclick = function () {
            alert(i); //始终弹出a个数
        }
    }
    //后［加一层闭包，将i值以局部变量的形式传递给内层函数］
    for (var i = 0; i < a.length; i++) {
        a[i].onclick = function () {
            alert(i);
        }(i);
    }
} {
    //Promise的构造函数中的代码是同步执行的，但是then是异步执行的，then方法需要等到resolve函数执行时才能得到执行
    const promise = new Promise((resolve, reject) => {
        console.log(1);
        resolve();
        console.log(2);
    }).then(() => {
        console.log(3);
    })
    console.log(4);
    //1 2 4 3
} {
    //Promise的状态一旦改变了，就不会再次改变。
    const promise = new Promise((resolve, reject) => {
        resolve('success1');
        reject('error');
        resolve('success2');
    }).then((res) => {
        console.log('then:' + res);
    }).catch((err) => {
        console.log('catch:' + err);
    })
    //then:success1
} {
    Promise.resolve(1).then((res) => {
        console.log(res);
        return 2;
    }).catch((err) => {
        return 3;
    }).then((res) => {
        console.log(res);
    })
    //1 2
} {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('once');
            resolve('success');
        }, 1000);
    });
    const start = Date.now();
    promise.then((res) => {
        console.log(res, Date.now() - start);
    });
    promise.then((res) => {
        console.log(res, Date.now() - start);
    })
    //once //promise状态一旦改变，则每次调用.then都会拿到同一个值
    //success 1001
    //success 1002
    //上述大的时间是1s，最后的毫秒一般是隔着1ms 
} {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success'); //1s后改变promise1的状态为resolve
        }, 1000)
    })
    const promise2 = promise1.then(() => {
        throw new Error('error');
    })
    console.log('promise1', promise1);
    console.log('promise2', promise2);
    setTimeout(() => {
        console.log('promise1', promise1);
        console.log('promise2', promise2);
    }, 2000);
    //promise1 Promise{<pending>}
    //promise2 Promise{<pending>}
    //Uncaugth(in promise) Error:error at promise1.then
    //promise1 Promise{<resolved>:"successs"}
    //promise Promise{<rejected>:Error : error at promise1.then}
} {
    Promise.resolve().then(() => {
        return new Error('error!!'); //.then或者.catch中return一个error对象并不会抛出错误，所以不会被后续的.catch捕获
    }).then(res => {
        console.log('then: ', res);
    }).catch(err => {
        console.log('catch: ', err);
    })
    //then: Error: error!!
    //返回任何一个非promise的值都会被包裹成promise对象，即return new Error('error!!')<==>return Promise.resolve(new Error('error!!'))

    //要想错误被.catch捕获，需要：
    //1.return Promise.reject(new Error('error!!'));
    //2.throw new Error('error!!')
} {
    const promise = Promise.resolve().then(() => {
        return promise;
    })
    promise.catch(console.error);
    //TypeError:Chaining cycle detected for promise
    //.then或者.catch返回的值不能是promise本身，否则会造成死循环
} {
    Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
    //1
    //.then或者.catch的参数期望是函数，传入非函数则发生值穿透
} {
    Promise.resolve().then(function success(res) {
        throw new Error('error');
    }, function fail1(e) {
        console.error('fail1:', e);
    }).catch(function fail2(e) {
        console.error('fail2:', e);
    })
    //fail2:Error:error at success
    //.then可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数；
    //.catch是.then第二个参数的简便写法，但是它们值用法上有一点需要注意：.then的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的.catch可以捕获之前的错误。
} {
    process.nextTick(() => {
        console.log('nextTick');
    })
    Promise.resolve().then(() => {
        console.log('then');
    })
    setImmediate(() => {
        console.log('setImmediate');
    })
    console.log('end');
    //end
    //nextTick
    //then
    //setImmediate
    /**
     * process.nextTick和promise.then都属于microtask,而setImmediate属于macrotask,在事件循环都check阶段执行。事件循环都每个阶段(macrotask)之间都会执行microtask,
     * 事件循环都开始会先执行一个microtask
     */
} {
    console.log('start');
    const interval = setInterval(() => {
        console.log('setInterval');
    }, 0);
    setTimeout(() => {
        console.log('setTimeout 1');
        Promise.resolve().then(() => {
            console.log('promise 3').then(() => {
                console.log('promise 4')
            }).then(() => {
                setTimeout(() => {
                    console.log('setTimeout 2');
                    Promise.resolve().then(() => {
                        console.log('promise 5');
                    }).then(() => {
                        console.log('promise 6');
                    }).then(() => {
                        clearInterval(interval);
                    })
                }, 0)
            })
        })
    }, 0)
    Promise.resolve().then(() => {
        console.log('promise 1');
    }).then(() => {
        console.log('promise 2')
    })
    //start
    //promise 1
    //promise 2
    //setInterval
    //setTimeout 1
    //promise 3
    //promise 4
    //setTimeout 2
    //promise 5
    //promise 6
    /**
     同步任务：在主线程上排队执行的任务，前一个任务执行完毕，才能执行后一个任务
     异步任务：不进入主线程而进入‘任务队列’(task queue)的任务，只有'任务队列'通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行
     总结：只要主线程空了，就会去读取'任务队列',这就是javascript的运行机制
     microtasks:process.nextTick,promise,Object.observe,MutationObserver
     macrotasks:setTimeout,setInterval,setImmediate,I/O,UI渲染

     一个事件循环(event loop)会有一个或多个任务队列(task queue)
     task queue就是macrotask queue
     每一个event loop都有一个microtask queue
     task queue ==macrotask queue!=microtask queue
     一个任务task可以放入macrotask queue也可以放入microtask queue中

     执行原理：
     事件循环的顺序，决定了javascript代码的执行顺序。它从script(整体代码)开始第一个循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task.
     当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task,这样一直循环下去

     包裹在一个script标签中的js代码也是一个task,确切地说是macrotask

     同步代码执行完后有microtask执行microtask,没有microtask执行下一个macrotask,如此往复循环至结束
     
     */
} {
    //实现数组升序排序
    var arr = [2, 3, 5, 1, 15, 8, 12, 11, 7];

    function asc(a, b) {
        return a - b;
    }
    console.log(arr.sort(asc));
    //降序
    function des(a, b) {
        return b - a;
    }
    console.log(arr.sort(des));
} {
    //实现一个算法，寻找字符串中出现次数最少的、并且首次出现位置最前的字符
    //如"cbaacfdeaebb"，符合要求的是"f"，因为他只出现了一次（次数最少）。并且比其他只出现一次的字符（如"d"）首次出现的位置最靠前。
    var str = "cbaacfdeaebb";
    //[...new Set(str)]=>c,b,a,f,d,e
    var result = [...new Set(str)] //c,b,a,f,d,e
        .map(key => ({
            key,
            times: str.split(key).length
        })) //{key:"c",times:3},{key:"b",times:4},{key:"a",times:4},{key:"f",times:2},{key:"d",times:2},{key:"e",times:3}
        .reduce((x, y) =>
            (x.times > y.times ? y : x)) //
        .key;
    //({ key, times: str.split(key).length })分组操作符（圆括号操作符），返回对象本身
} {
    //请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']
    var arr = ['adam', 'LISA', 'barT'];

    function normalize(arr) {
        return arr.map(function (e) {
            return e.split('').reverse().reduce(function (x, y) {
                return y.toUpperCase() + x.toLowerCase();
            })
        })
    }
    console.log(normalize(arr))
} {
    //请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']
    var arr = ['adam', 'LISA', 'barT'];
    //如传入'adam'，通过map=>['a','d','a','m']=>['m','a','d','a']
    var result = arr.map(item =>
        item.split('').reverse() //['m','a','d','a']
        .reduce((x, y) => {
            return y.toUpperCase() + x.toLowerCase();
        }))
    console.log(result);
} {
    //获取浏览器特性(俗称的UA),然后识别客户端，例如判断是不是Chrome浏览器
    var ua = navigator.userAgent;
    var isChrome = ua.indexOf("Chrome");
    console.log(isChrome);

    //获取屏幕的宽度和高度
    console.log(screen.width);
    console.log(screen.height);

    //获取网址
    console.log(location.href);
    //协议
    console.log(location.protocol);
    //path
    console.log(location.pathname);
    //参数
    console.log(location.search);
    //hash
    console.log(location.hash);
    //浏览器的前进、后退功能等
    history.back();
    history.forward();
} {
    //新增节点
    var div1 = document.getElementById("div1");
    //添加新节点
    var p1 = document.createElement("p");
    p1.innerHTML = "this is p1";
    div1.appendChild(p1); //添加新创建的元素
    //移动已有节点（这里是移动，而不是复制）
    var p2 = document.getElementById("p2");
    div1.appendChild(p2);

    //获取父元素
    var parent = div1.parentElement;

    //获取子元素
    var child = div1.childNodes;

    //删除节点
    div1.removeChild(child[0]);
} {
    //事件
    var btn = document.getElementById("btn1");
    btn.addEventListener("click", function (e) {
        //e.preventDefault();//阻止默认行为
        //e.stopPropagation();//阻止冒泡
        console.log("clicked");
    })
} {
    /**
    <div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
    </div>
     */
    var div1 = document.getElementById("div1");
    //使用代理，bindEvent多一个"a"参数
    bindEvent(div1, "click", "a", function (e) {
        console.log(this.innerHTML);
    })
    //不使用代理
    var a = document.getElementById("a1");
    bindEvent(div1, "click", function (e) {
        console.log(a.innerHTML);
    })

    function bindEvent(elem, type, selector, fn) {
        if (fn == null) {
            fn = selector;
            selector = null;
        }
        elem.addEventListener(type, function (e) {
            var target;
            //有selector,即说明需要事件代理
            if (selector) {
                target = e.target;
                if (target.matches(selector)) {
                    fn.call(target, e);
                }
            } else {
                fn(e);
            }
        })
    }
} {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/url", false);
    xhr.onreadystatechange = function () {
        //xhr.readyState是浏览器判断请求过程中各个阶段的
        if (xhr.readyState == 4) {
            //xhr.status是HTTP协议中规定的不同结果的返回状态说明
            if (xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(null);
    /*
     xhr.readyState的状态码说明：
     0:未初始化,还没有发送send()方法
     1:载入,已经调用send()方法，正在发送请求
     2:载入完成，send()方法执行完成，已经接收到全部响应内容
     3:交互,正在解析响应内容
     4:完成,响应内容解析完成,可以在客户端调用了

     xhr.status即HTTP状态，有2xx,3xx,4xx,5xx
     200:正常
     3xx:
        301:永久重定向。如http://xxx.com这个GET请求(最后没有/),就会被301到http://xxx.com/
        302:临时重定向。
        304:资源找到但是不符合请求条件，不会返回任何主体。如发送GET请求时，head中有If-Modified-Since:xxx(要求返回更新时间是xxx之后的资源)，如果此时
        服务器端资源未更新，则会返回304，即不符合要求
    404:找不到资源
    5xx:服务器端出错了
     */
} {
    /*
    快排:
    1.随机找一个中间数
    2.小于中间数的都放左边，大于中间数的都放右边
    3.递归步骤2
     */
    const arr = [85, 24, 63, 45, 17, 31, 96, 50];

    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let randomIndex = Math.floor(arr.length / 2);
        let randomNum = arr.splice(randomIndex, 1)[0]; //返回从数组中被删除的元素,arr中已经除去了该元素
        let left = []; //存放左边较小的数
        let right = []; //存放右边较大的数
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < randomNum) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat([randomNum], quickSort(right));
    }
    console.log(quickSort(arr));
} {
    /*
    splice()
    原型: Array.prototype.splice(start,deleteCount,item1,item2...)
    splice()的运行可能出现三种情况:
    1.只删除元素
    2.只插入元素
    3.同时删除和插入元素
    */
    let a = [1, 2, 3, 4, 5, 6];
    a.splice(1, 2); //在index为1的地方开始删除2个元素,即删除a[1],a[2]==>返回删除元素2,3,数组a为[1,4,5,6]
    console.log(a);

    let b = [1, 2, 3, 4, 5, 6];
    b.splice(1, 0, 7, 8, 9); //在index为1的地方不删除元素，插入元素7，8，9==>返回空数组，数组b为[1,7,8,9,2,3,4,5,6]
    console.log(b);

    let c = [1, 2, 3, 4, 5, 6];
    c.splice(1, 1, 7, 8, 9); //在index为1的地方删除一个元素，同时插入元素7,8,9=>返回删除的元素c[1],即2,数组c为[1,7,8,9,3,4,5,6]
    console.log(c);
} {
    function quickSort(a, left, right) {
        var i = left; //递归左值
        var j = right; //递归右值
        var key = a[i]; //基准值
        if (left >= right) {
            return;
        }
        while (i != j) {
            //高位由右向左对比key值
            while (i < j && a[j] >= key) {
                j--;
            }
            //结束后j仍大于i,则证明a[j]>key,需要替换基准值所在位置(i)的值和a[j],此时a[j]存放的就是key,完成一遍高位遍历对比
            if (j > i) {
                a[i] = a[j];
                a[j] = key;
            }
            //June[Question]上述a[j]怎么处理
            //低位由左向右对比key值
            while (i < j && a[i] <= key) {
                i++;
            }
            //结束后i仍小于j,则证明a[i]<key,需要替换基准值所在位置(j)的值和a[i]位置,完成一遍高位遍历对比
            if (i < j) {
                a[j] = a[i];
                a[i] = key;
            }
        }
        //i==j,一趟快速排序结束
        //接着以key所在位置左右分割数组，递归左右两边数组，进行快排
        quickSort(a, left, i - 1); //递归左边
        quickSort(a, i + 1, right); //递归左边
    }
    var oldArr = [8, 2, 6, 12, 1, 9, 5, 5, 10];
    console.log(quickSort(oldArr, 0, 8));
    console.log(oldArr); //[1, 2, 5, 5, 6, 8, 9, 10, 12]
} {
    //千分位标注 1234567=>1,234,567
    function exchange(num) {
        num += ""; //装成字符串
        if (num.length <= 3) {
            return num;
        }
        num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
            console.log(v);
            return v + ",";
        })
        return num;
    }
    exchange(1234567);
} {
    //lastIndex:如果匹配模式带有g修饰符，这个属性存储在整个字符串中下次索引的开始位置
    var str = 'google';
    var reg = /o/g;
    console.log(reg.test(str), reg.lastIndex); //go,2
    console.log(reg.test(str), reg.lastIndex); //goo,3
    console.log(reg.test(str), reg.lastIndex); //找不到，又变成 0
    console.log(reg.test(str), reg.lastIndex); //又从头开始找到
} {
    async function async1() {
        console.log("async1 start"); //2
        await async2(); //执行了这一句，输出async2后，await会让出当前线程，将后面的代码加到任务队列中
        console.log("async1 end"); //7
    }
    async function async2() {
        console.log('async2'); //3
    }
    console.log("script start"); //1
    setTimeout(function () {
        console.log("settimeout"); //将回调函数加入队列，Timers阶段，属于microtask,级别<promise队列
    }, 0);
    async1(); //<--
    new Promise(function (resolve) {
        console.log("promise1"); //4 ,创建promise对象里的代码属于同步代码
        resolve();
    }).then(function () {
        console.log("promise2"); //6 then属于异步性，加入队列
    });
    console.log('script end'); //5
    /**
     script start
     async1 start
     async2
     promise1
     script end
     promise2
     async1 end
     settimeout

     队列任务优先级：promise.trick()>promise的回调>setTimeout>setImmediate
     */
} {
    async function async1() { //async返回的是一个promise对象，要等它resolve，所以将当前Promise推入队列
        console.log("a"); //2
        await async2(); //执行这一句后，await会让出当前线程，将后面的代码加到任务队列中，然后跳出async1函数继续执行函数后面的同步代码,由于async2是async函数，所以要返回一个promise对象，将其推入promise队列
        console.log("b"); //7

    }
    async function async2() {
        console.log('c'); //3

    }
    console.log("d"); //1
    setTimeout(function () {
        console.log("e"); //8
    }, 0);
    async1(); //<--
    new Promise(function (resolve) {
        console.log("f"); //4
        resolve();
    }).then(function () {
        console.log("g"); //6
    });
    console.log('h'); //5
    /**
     d
     a
     c
     f
     h
     g
     b
     e
     */
} {
    async function async1() { //async返回的是一个promise对象，要等它resolve，所以将当前Promise推入队列
        console.log("a"); //2
        await async2(); //执行这一句后，await会让出当前线程，将后面的代码加到任务队列中，然后跳出async1函数，继续执行函数后面的同步代码,由于async2不是async函数，立即执行上下文
        console.log("b"); //6

    }

    function async2() {
        console.log('c'); //3

    }
    console.log("d"); //1
    setTimeout(function () {
        console.log("e"); //8
    }, 0);
    async1(); //<--
    new Promise(function (resolve) {
        console.log("f"); //4
        resolve();
    }).then(function () {
        console.log("g"); //7
    });
    console.log('h'); //5
    /**
     d
     a
     c
     f
     h
     b
     g
     e
     */
} {
    //写出函数DateDemo的返回结果，系统时间假定为今天
    function DateDemo() {
        var d, s = "今天日期是：";
        d = new Date();
        s += d.getMonth() + "/"; //0-11月份 =2
        s += d.getDate() + "/"; //1-31日期 =13
        s += d.getYear(); //当前系统年份-1900=2018-1900=118
        return s;
    }
    //今天日期是：2/13/118
} {
    //每隔一秒输出时间和i的值  0->1->2->3->4->5
    const tasks = [];
    for (var i = 0; i < 5; i++) { // 这里 i 的声明不能改成 let，如果要改该怎么做？
        ((j) => {
            tasks.push(new Promise((resolve) => {
                setTimeout(() => {
                    console.log(new Date, j);
                    resolve(); // 这里一定要 resolve，否则代码不会按预期 work
                }, 1000 * j); // 定时器的超时时间逐步增加
            }));
        })(i);
    }

    Promise.all(tasks).then(() => {
        setTimeout(() => {
            console.log(new Date, i);
        }, 1000); // 注意这里只需要把超时设置为 1 秒
    });
} {
    const tasks = []; // 这里存放异步操作的 Promise
    const output = (i) => new Promise((resolve) => {
        setTimeout(() => {
            console.log(new Date, i);
            resolve();
        }, 1000 * i);
    });
    // 生成全部的异步操作
    for (var i = 0; i < 5; i++) {
        tasks.push(output(i));
    }
    // 异步操作完成之后，输出最后的 i
    Promise.all(tasks).then(() => {
        setTimeout(() => {
            console.log(new Date, i);
        }, 1000);
    });
} {
    //用async/await  0->1->2->3->4->5
    async function print(num) {
        const tasks = [];
        //注册num个promise对象到队列中
        var output = (i) => new Promise(resolve => {
            setTimeout(() => {
                console.log(new Date, i);
                resolve();
            }, 1000 * i); //间隔1秒输出
        });
        for (var i = 0; i < num; i++) {
            tasks.push(output(i));
        }
        return Promise.all(tasks);
    }
    const result = await print(5);
    setTimeout(() => {
        console.log(new Date, 5);
    }, 1000);
} {
    // 模拟其他语言中的 sleep，实际上可以是任何异步操作
    const sleep = (timeountMS) => new Promise((resolve) => {
        setTimeout(resolve, timeountMS);
    });
    (async () => { // 声明即执行的 async 函数表达式
        for (var i = 0; i < 5; i++) {
            await sleep(1000);
            console.log(new Date, i);
        }
        await sleep(1000);
        console.log(new Date, i);
    })();
} {
    ["1", "2", "3"].map(parseInt);
    //[1, NaN, NaN]
    ["1", "2", "11", "4"].map(parseInt);
    //map接受两个参数，回调函数和this
    //parseInt接受三个参数：当前值、基数、数组==>parseInt("1",0)=1,parseInt("2",1)=NaN,parseInt("11",2)=3,parseInt("4",3)=NaN
} {
    [typeof null]
    //"object". typeof 返回一个表示类型的字符串.null是javascript中用来表示空引用的一个特殊值
} {
    [null instanceof Object]
    //false. 本质上Null和Object不是一个数据类型，null值并不是以Object为原型创建出来的
} {
    [3, 2, 1].reduce(Math.pow);
    //9,Math.pow(3,2)=9,Math.pow(9,1)=9
    /*
    arr.reduce(callback[, initialValue])
    reduce接受两个参数, 一个回调, 一个初始值.
    回调函数接受四个参数 previousValue, currentValue, currentIndex, array
    */
} {
    var val = 'smtg';
    console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');
    //Something
    /* 
    + 的优先级 大于 ?
    所以原题等价于 'Value is true' ? 'Somthing' : 'Nonthing' 而不是 'Value is' + (true ? 'Something' : 'Nonthing')
    */
} {
    var name = 'World!';
    (function () {
        if (typeof name === 'undefined') {
            var name = 'Jack';
            console.log('Goodbye ' + name);
        } else {
            console.log('Hello ' + name);
        }
    })();
    //Goodbye Jack
} {
    var END = Math.pow(2, 53);
    var START = END - 100;
    var count = 0;
    for (var i = START; i <= END; i++) {
        count++;
    }
    console.log(count);
} {
    /**
     splice()的第一个参数为指定了要插入或删除的元素在数组中的位置。
     第二个参数指定了要从数祖中删除的元素个数(可省略，若省略，则删除从开始元素到数组结尾处到所有元素个数)
     */
    var a = [1, 2, 3, 4, 5, 6, 7, 8];
    a.splice(4); //返回[5,6,7,8],a被删除后为[1,2,3,4]
    var b = [1, 2, 3, 4, 5, 6, 7, 8];
    b.splice(1, 2); //返回[2,3],b被删除后为[1,4,5,6,7,8]
} {
    //ES6 WeakSet/WeakMap，弱引用，对于值的引用不计入垃圾回收机制。
    let wm = new WeakMap();
    let b = new Object();
    wm.set(b, new Array(5 * 1024 * 1024));
    //可以通过node --expose-gc手动执行垃圾回收机制
    //通过global.gc()执行垃圾回收，通过process.memoryUsage()查看内存占用
    b = null;
} {
    var a = new Set([1, 2, 3]);
    var b = new Set([4, 2, 3]);
    let d1 = new Set([...a].filter(x => !b.has(x))); //1
    for (let i of d1) {
        console.log("d1:" + i);
    }
    let d2 = new Set([...b].filter(x => !a.has(x))); //4
    for (let i of d2) {
        console.log("d2:" + i);
    }
}


{
    //实现一个算法，寻找字符串中出现次数最少的、并且首次出现位置最前的字符
    //如"cbaacfdeaebb"，符合要求的是"f"，因为他只出现了一次（次数最少）。并且比其他只出现一次的字符（如"d"）首次出现的位置最靠前。
    var str = "cbaacfdeaebb";
    var result = [...new Set(str)]
        .map(key => ({
            key,
            times: str.split(key).length
        }))
        .reduce((x, y) => (x.times > y.times ? y : x))
        .key;
} {
    //null、undefined和未声明变量之间有什么区别？如何检查判断这些状态值？
    var foo;
    console.log(foo); // undefined
    console.log(foo === undefined); // true
    console.log(typeof foo === 'undefined'); // true

    console.log(foo == null); // true. 错误，不要使用非严格相等！

    function bar() {}
    var baz = bar();
    console.log(baz); // undefined
} {
    /**
     null只能被显式赋值给变量。它表示空值，与被显式赋值 undefined 的意义不同。
     要检查判断null值，需要使用严格相等运算符。请注意，和前面一样，不能使用非严格
     相等（==）来检查，因为如果变量值为undefined，使用非严格相等也会返回true。
     */
    var foo = null;
    console.log(foo === null); // true
    console.log(foo == undefined); // true. 错误，不要使用非严格相等！
} {
    var obj = {
        name: "hi"
    }
    obj["age"] = 19;
    console.log(obj);
} {
    /*
    var person = Person()将Person以普通函数调用，而不是构造函数。如果该函数是用作构造函数的，
    那么这种调用方式是一种常见错误。通常情况下，构造函数不会返回任何东西，因此，像普通函数一样调用构造函数，只会返回undefined赋给用作实例的变量。

    var person = new Person()使用new操作符，创建Person对象的实例，该实例继承自Person.prototype。
    另外一种方式是使用Object.create，例如：Object.create(Person.prototype)`。
    */
    function Person(name) {
        this.name = name;
    }

    var person1 = Person('John');
    console.log(person1); // undefined
    console.log(person1.name); // Uncaught TypeError: Cannot read property 'name' of undefined

    var person2 = new Person('John');
    console.log(person2); // Person { name: "John" }
    console.log(person2.name); // "John"

    var person3 = Object.create(Person.prototype);
    console.log(person3.name = "John"); // "John"
    console.log(person3); // Person { name: "John" }
} {
    function Person(name) {
        this.nickname = name;
        this.distractedGreeting = function () {
            setTimeout(function () {
                console.log("Hello, my name is " + this.nickname);
            }.bind(this), 500); // <-- this line!
        }
    }

    var alice = new Person('Alice');
    alice.distractedGreeting();
    // after 500ms logs "Hello, my name is Alice"
} {
    //查看函数的调用帧
    function a() {
        b();
    }

    function b() {
        c();
        console.trace();
    }

    function c() {
        // console.trace();
    }
    a();
    //c
    //b
    //a
} {
    //普通递归
    // 启动计时器
    console.time('testing');

    function factorial(n) {
        if (n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    factorial(5); // 120
    // 停止计时，输出时间
    console.timeEnd('testing'); // 0.0751953125ms
} {
    //尾递归
    // 启动计时器
    console.time('testing');

    function factorial(n, total) {
        if (n === 1) return total;
        return factorial(n - 1, n * total);
    }
    factorial(5, 1) // 120 f(5,1)->f(4,5x1)->f(3,4x5)->f(2,3x20)->f(1,2x60)==>120
    // 停止计时，输出时间
    console.timeEnd('testing'); //0.04296875ms
} {
    //函数声明会使函数体提升，但函数表达式（以声明变量的形式书写）只有变量声明会被提升。
    // 函数声明
    //console.log(foo); // [Function: foo]
    foo(); // 'FOOOOO'
    function foo() {
        console.log('FOOOOO');
    }
    // console.log(foo); // [Function: foo]

    // 函数表达式
    console.log(bar); // undefined
    bar(); // Uncaught TypeError: bar is not a function
    var bar = function () {
        console.log('BARRRR');
    };
    console.log(bar); // [Function: bar]
} {
    //==是抽象相等运算符,==运算符是在进行必要的类型转换后，再比较。
    1 == '1'; // true
    1 == [1]; // true
    1 == true; // true
    0 == ''; // true
    0 == '0'; // true
    0 == false; // true

    var a = null;
    console.log(a == null); // true
    console.log(a == undefined); // true
}

{
    //===是严格相等运算符,===运算符不会进行类型转换，所以如果两个值不是相同的类型，会直接返回false。
    1 === '1'; // false
    1 === [1]; // false
    1 === true; // false
    0 === ''; // false
    0 === '0'; // false
    0 === false; // false

    var a = null;
    console.log(a === null); // true
    console.log(a === undefined); // false
} {
    //创建一个循环，从1迭代到100，3的倍数时输出 "fizz"，5的倍数时输出 "buzz"，同时为3和5的倍数时输出 "fizzbuzz"。
    function fizzbuzz(num) {
        for (let i = 1; i <= num; i++) {
            if (i % 3 == 0) {
                if (i % 5 == 0) {
                    console.log(i + "-fizzbuzz");
                } else {
                    console.log(i + "-fizz");
                }
            } else if (i % 5 == 0) {
                console.log(i + "-buzz");
            }
        }
    }
    fizzbuzz(100);
} {
    //arr.every(callback[, thisArg])测试数组的所有元素是否都通过了指定函数的测试。
    function isBigEnough(element) {
        return (element >= 10);
    }
    var passed = [12, 5, 8, 130, 44].every(isBigEnough);
    console.log(passed); //false
    passed = [12, 54, 18, 130, 44].every(isBigEnough);
    console.log(passed); //true
} {
    //arr.some(callback[, thisArg])测试数组中的某些元素是否通过了指定函数的测试
    function isBigEnough(element) {
        return (element >= 10);
    }
    var passed = [2, 5, 8, 1, 4].some(isBigEnough);
    console.log(passed); //false
    passed = [12, 5, 8, 1, 4].some(isBigEnough);
    console.log(passed); //true
} {
    //ES6解构赋值
    /**
     * 数组赋值
     */
    // 变量赋值
    const foo = ['one', 'two', 'three'];

    const [one, two, three] = foo;
    console.log(one); // "one"
    console.log(two); // "two"
    console.log(three); // "three"

    // 变量交换
    let a = 1;
    let b = 3;

    [a, b] = [b, a];
    console.log(a); // 3
    console.log(b); // 1

    /**
     * 对象解构
     */
    // 变量赋值
    const o = {
        p: 42,
        q: true
    };
    const {
        p,
        q
    } = o;

    console.log(p); // 42
    console.log(q); // true
} {
    //函数柯里化
    var curryWeight = function (fn) {
        var tempArr = [];
        //构造一个闭包，保存tempArr值
        return function () {
            if (arguments.length === 0) {
                return fn.apply(null, tempArr); //把tempArr数组返回
            } else {
                tempArr = tempArr.concat([].slice.call(arguments));
            }
        }

    };
    //fn==function(){.....},fn.apply(null,tempArr)实现为匿名函数传参
    var fishWeight = 0;
    var addWeight = curryWeight(function () {
        for (let i = 0; i < arguments.length; i++) {
            fishWeight += arguments[i];
        }
    });

    addWeight(2.3);
    addWeight(6.5);
    addWeight(1.2);
    addWeight(2.5);
    addWeight(); //这里才计算,curryWeight(()=>{})(),立即执行函数

    console.log(fishWeight); // 12.5
} {
    //节流 resize事件
    var i = 0;

    function handler() {
        console.log(i++);
    }

    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 1000);
    }
    window.onresize = function () {
        throttle(handler, window);
    }
} {
    setTimeout(() => {
        console.log(new Date().getTime());
    }, 1000);
    console.log(new Date().getTime());
} {
    /**
     浅克隆:对象只会被克隆最外部的一层，至于更深沉的对象，则依然是通过引用指向同一块堆内存
     */
    function shallowClone(o) {
        const obj = {};
        for (let i in o) {
            obj[i] = o[i]; //遍历对象o的属性，将其复制给obj
        }
        return obj;
    }
    //被克隆对象
    const oldObj = {
        a: 1,
        b: ['e', 'f', 'g'],
        c: {
            h: {
                i: 2
            }
        }
    };
    const newObj = shallowClone(oldObj);
    console.log(newObj.c.h, oldObj.c.h); //{i:2} {i:2}
    console.log(newObj.c.h === oldObj.c.h); //true，表明指向同一段堆内存,如果对newObj.c.j进行修改，也会影响oldObj.c.h
} {
    /*
    深克隆:
    JSON.parse方法:
    JSON对象parse方法可以将JSON字符串反序列化成JS对象,stringify方法可以将JS对象序列化成JSON
    */
    //被克隆对象
    const oldObj = {
        a: 1,
        b: ['e', 'f', 'g'],
        c: {
            h: {
                i: 2
            }
        }
    };
    const newObj = JSON.parse(JSON.stringify(oldObj));
    console.log(newObj.c.h, oldObj.c.h); //{i:2} {i:2}
    console.log(newObj.c.h === oldObj.c.h); //false
    newObj.c.h.i = 'change';
    console.log(newObj.c.h, oldObj.c.h); //{i:'change'} {i:2}
    //限制：
    //1.无法实现对函数、RegExp等特殊对象的克隆
    //2.会抛弃对象的constructor,所有构造函数会指向Object
    //3.对象有循环引用、会报错
    {
        //构造函数
        function Person(name) {
            this.name = name;
        }
        const p = new Person('June');

        //函数
        function say() {
            console.log('hi');
        }
        const oldObj = {
            a: say,
            b: new Array(1),
            c: new RegExp('ab+c', 'i'),
            d: p
        };
        const newObj = JSON.parse(JSON.stringify(oldObj));

        //无法复制函数
        console.log(newObj.a, oldObj.a); //undefined [Function:say]

        //稀疏数组复制错误
        console.log(newObj.b[0], oldObj.b[0]); //null undefined

        //无法复制正则对象
        console.log(newObj.c, oldObj.c); //{} /ab+c/i

        //构造函数指向错误
        console.log(newObj.d.constructor, oldObj.d.constructor); //[Function:Object] [Function:Person]
    } {
        const oldObj = {};

        oldObj.a = oldObj;

        const newObj = JSON.parse(JSON.stringify(oldObj));
        console.log(newObj.a, oldObj.a); // TypeError: Converting circular structure to JSON
    }
} {

    const obj = [
        1, 2, 3, 3, {
            a: 1
        },
        false, '1', true
    ];
    const tmp = {};
    tmp[JSON.stringify(obj[4])] = 1; //将对象作为key存储到对象中,如果不反序列化对象，则key值会变成[Object Object]
    for (prop in tmp) {
        console.log(prop); //key值变成了[object Object]而不是{"a":1}
        console.log(tmp[prop]); //1
    }
}