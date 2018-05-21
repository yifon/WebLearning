/**
 一面、二面、三面和HR面各自都是20分钟左右
 一面问前端基础多一点；二面因为我有些后台基础，所以问了些后台的；三面是主管面，没多少问技术的；HR面谈钱等
 */

{
    //1.找出数组中的最大数
    var arr = [7, 2, 0, -3, 5];
    /**
     apply()应用某一对象的一个方法，用另一个对象替换当前对象
     由于max()里面参数不能为数组，所以借助apply(funtion,args)方法调用Math.max()，f
     unction为要调用的方法，args是数组对象，当function为null时，默认为上文,即相当于apply(Math.max,arr)
     */
    var max = Math.max.apply(null, arr);
    console.log(max); //7
    /**
     call()调用一个对象的一个方法，以另一个对象替换当前对象
     call()与apply()类似，区别是传入参数的方式不同，apply()参数是
     一个对象和一个数组类型的对象，call()参数是一个对象和参数列表
     */
    var max1 = Math.max.call(null, 7, 2, 0, -3, 5)
    console.log(max1); //7

    /**
     ES6的写法
     
     // 等同于
     Math.max(14, 3, 77);
     */
    var max2 = Math.max(...arr);
    console.log(max2); //7
} {
    //2.js基本数据类型：Boolean,Null,String,Undefined,Number
    //3.基本类型跟引用类型的区别：基本类型存数值，保存在栈内存中，引用类型保存在栈内存的只是指向堆内存的指针
} {
    //4.ES6箭头函数主要作用: 最主要的目的就是解决this指针的问题
    /**
     Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。
     前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。
     所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。
     */
    function Timer() {
        this.s1 = 0;
        this.s2 = 0;
        // 箭头函数
        setInterval(() => this.s1++, 1000);
        // 普通函数
        setInterval(function () {
            this.s2++;
        }, 1000);
    }

    var timer = new Timer();

    setTimeout(() => console.log('s1: ', timer.s1), 3100);
    setTimeout(() => console.log('s2: ', timer.s2), 3100);
    // s1: 3
    // s2: 0
} {
    //5.socket状态码怎么约定
} {
    //6.socket.io怎么去识别是哪个客户端发送的消息
    //ip?socket id？我回答说连接的时候发送名字，显然被鄙视不好
    /**
     拓展深入：
     怎样知道每个客户端只在自己的房间通信呢？ 
    设计思路是只要新建一个客户端socket实例，就产生一个房间号。 
    如果用io.emit对该房间广播消息，那么只有此房间的socket可以收到，而非此房间的socket则收不到信息。
     */
} {
    //7.express觉得比较好用的地方
    /**
     Express框架建立在node.js内置的http模块上,是对http模块的再包装
     */

    //8.express中间件机制及实现原理
    /**
     app.use 加载用于处理http请求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理。
     */
} {
    //9.display:flex怎么处理兼容性
    //display:-webkit-box;（适用于-webkit-内核的浏览器）来做兼容，
} {
    //10.webapck中postcss的autoprefix大致作用
    //写css样式时，有些情况下需要加样式前缀以兼容不同的浏览器。手动添加css前缀会写较多的重复代码，降低开发效率。autoprefixer-loader为我们提供了自动添加css前缀的功能。
} {
    //11.是否接触过小程序
}
{
    //12.继承的方式
}