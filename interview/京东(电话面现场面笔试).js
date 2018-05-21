{
    //0.固定的自我介绍
}
{
    /**
     1.对html语义化的理解
     根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好地解析。
     */
}
{
    //2.说下html,js,css各自作用区别
}
{
    /**
     3.使用过的布局方式
     讲了圣杯布局和双飞翼布局
     */

}
{
    /**
     4. a.CSS3使用过哪些功能？
    -用trasform处理居中问题,动画,border-radius,盒模型border-sizing,box-shadow阴影

    b.说一说CSS3动画是怎么实现的？
    -扯了自己用的一些场景。然后就是要定义个keyframes帧名，动画持续时间(animation-duration),动画效果如ease-in、ease-out等(animation-timing-function),然后就是它的过渡，如从左移到右,一开始背景是什么,50%的时候再改变背景,100%再改变。
    
    c.CSS3兼容性问题
    -回答我没怎么处理兼容性问题，用webpack等构建工具会帮忙做处理。

    d.使用过什么CSS预编译处理器?
    -Less,SASS(实际上Stylus也接触过一点，没说，毕竟不是深入研究)

    e.CSS预编译处理器的作用
    -自己扯了语法上更有像js一样的逻辑，组织结构上更清晰，支持嵌套。

    f.响应式处理过吗？
    -回答我平时如果用bootstrap,其实大部分它自己处理好了，如果自己要写一些响应式的化，就用媒体查询，自定义合适的宽度范围。
     */
}
{
    /**
     5.说下对原型继承的理解
     */
}
{
    /**
     6.Object.create(Foo)是否可以访问到Object的所有属性?
     这道题没答好，觉得换种问法可以是Object.create(Foo)和new创建的对象有什么区别?

     */
    //new
    {
        function Person(name, age) {
            this.name = name ? name : "";
            this.age = age;
        }
        //函数有了prototype属性，由函数创建的对象才有原型的概念。
        Person.prototype.sayHi = function () {
            console.log("hi, my name is " + this.name + ", I'm " + this.age + " year old.");
        }
        var p = new Person("June", 25);
        console.log(p.sayHi());//hi, my name is June, I'm 25 year old.

        console.log(p.__proto__);//{sayHi: ƒ, constructor: ƒ}
        console.log(Person.prototype);//{sayHi: ƒ, constructor: ƒ}
        /**
         new做了： 
        1. 创建实例对象p 
        2. 调用构造函数(Person)初始化p成员变量（name,age)。 
        3. 指定实例对象的原型为Person.prototype对象。即p0.__proto__指向Person.prototype。
         */
    }
    //Object.create
    {
        function Person(name, age) {
            this.name = name ? name : "";
            this.age = age;
        }
        //函数有了prototype属性，由函数创建的对象才有原型的概念。
        Person.prototype.sayHi = function () {
            console.log("hi, my name is " + this.name + ", I'm " + this.age + " year old.");
        }
        console.log(Person.prototype);//{sayHi: ƒ, constructor: ƒ}

        let p0 = new Person();
        console.log(p0);//Person {name: "", age: undefined} age:undefined name:""  __proto__:Object
        console.log(p0.sayHi());//hi, my name is , I'm undefined year old.
        console.log(p0.__proto__);//{sayHi: ƒ, constructor: ƒ}

        let p1 = Object.create(Person.prototype);
        console.log(p1);////Person {}  __proto__:Object
        console.log(p1.sayHi());//hi, my name is , I'm undefined year old.
        console.log(p1.__proto__);//{sayHi: ƒ, constructor: ƒ}
        // p1.name = "June";
        // p1.age = 25;
    }
}
{
    /**
     7.ES6箭头函数和普通函数的区别？
     -this指针的指向问题
     具体this指针会指向哪里?
     -箭头函数的话，会指向调用它的实例对象；普通函数，像闭包，会指向全局
     */
}
{
    /**
     8.ES6 promise的使用?
     －后台渲染页面前，依赖数据库的异步处理结果的话，我会用Promise去包装，然后异步结果返回时，再resolve相应的值出去，在then函数就可以处理页面相关的渲染
     假如promise处理内部跑出异常应该怎么处理?
     -直接用自带的catch函数捕获异常
     ps:谈promise的应用场景时，我提了下有一些场景我会选择用async/await让模块之间的调用更优雅
     */
}
{
    /**
     9.对ES6的模块化是否有了解
     -先讲了我后台用node.js,是基于CommonJS的,CommonJS是运行时加载,ES6是编译时加载,ES6可以按需加载，而CommonJS是整体加载，例如fs模块。
     其实还有阮一峰的《ECMAScript 6 入门》提到的不少其他点我没说到。
     如 CommonJS模块输出的是一个值的拷贝,ES6模块输出的是值的引用。
     */
}
{
    /**
     10.谈谈对ES6模块中的default命令的了解。
     -default其实就是声明叫做default的变量
     export与export default的区别？怎么import一个export default的模块?
     -这个可以说答不上来。export和export default最大的区别是export不限变量数,而export default只输出一次，而且
     */
}
{
    /**
     11.socket了解多少，和http区别？
     -大概谈了我工作的部门为什么选取socket编程的背景。然后socket是双向通向，长连接，心跳检测等实际用途，请求不多，安全。http适合请求数比较多的web请求。这个没怎么多答，也没多问。
     */
}
{
    /**
     12.了解过cookie吗？有接触过什么存储的方式？
     -还接触过session,localStorage,sessionStorage等。
     cookie可以从客户端在请求头中携带给服务器,大小为4kb,有过期限制等
     localStorage和sessionStorage是存储在客户端的，localStorage永不过期，存储更大，不发送给服务器端，例如我用vue写个todolist应用，就没必要跟服务器端有数据交互，用localStorage就可以了
     */
}
{
    /**
     13.接触过什么前端框架?
     -jQuery用得多一点，vue的话不深，做个todolist应用，还没什么时间去深入。
     */
}
{
    /**
     14.a.服务器端缓存是否用过?了解多少?
    －扯了下Expires,Cache-control,顺便提了两个的区别，应用场景.
    还有与304相关的If Modified Since,ETag的If-Non-Match/If-Match

    b.发起请求时，如果有缓存会怎么处理?
    -也是讲讲不发是什么情况、发了304又是什么情况等
     */
}
{
    /**
     15.Object.assign是否了解
     －尴尬，一开始扯成Object.defineProperty去了，还好质疑了下回头是岸了。
     ES5/ES6新的方法，不是所有浏览器都兼容。Object.assign(target,...source).用于对象的合并，将源对象的所有可枚举属性，复制到目标对象，如果有同名属性，将做覆盖。
     可以看阮一峰的对应章节做深入。
     */
    //Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
    var obj = Object.create({ foo: 1 }, {// foo 是个继承属性。
        bar: {
            value: 2  // bar 是个不可枚举属性。
        },
        baz: {
            value: 3,
            enumerable: true  // baz 是个自身可枚举属性。
        }
    });

    var copy = Object.assign({}, obj);
    console.log(copy); // { baz: 3 }
}
{
    /**
     16.a.性能优化了解多少？
     -静态资源等可以使用wepack等构造工具，合并请求文件减少请求数、压缩图片大小、压缩文件大小、cdn、缓存等。
     代码层次的优化可以使用像节流、去抖等.

     b.讲讲节流、去抖.
     -扯了扯实际电梯例子来理解概念，然后应用场景就提了滚动时导航栏的吸顶，还有改变窗口大小onsize，频繁地切换鼠标到导航栏上mouseover等等。
     再讲讲节流、去抖区别。
     */
}
{
    /**
     17.单元测试是否了解?
     －讲了做过压测，然后平时没专门研究，学过点Mocha
     */
}
{
    /**
     18.a.调试怎么做的?
     -平常就直接用浏览器，再加debug code等.

     b.浏览器开发者模式的哪些功能使用过?如network、profile等是否了解?
     -profile不了解，network浅浅讲了点，再讲了performance来查看内存使用过。

     c.断点调试过吗?
     －几乎没.其实几百年前调过，确实不熟悉。
     */
}
{
    /**
     19.a.守护进程了解吗？如你怎么让node应用一直运行着。
     -提了用过nohup,pm2

     b.pm2的实现原理了解吗?
     -不了解，拿来主义，让我ECS服务器上的应用没挂，其实没深入了解过。
     引用：
     pm2 是一个带有负载均衡功能的Node应用的进程管理器。当你要把你的独立代码利用全部的服务器上的所有CPU,并保证进程永远都活着,0秒的重载, PM2是完美的。
     基于RPC,远程过程调用协议。
     */
}
{
    /**
     * 20.unshift是否会生成新的数组？
     * unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度，unshift()方法不创建新的数组，而是修改原有的数组
     */
    var a = [1, 2, 3];
    a.unshift(4);
    console.log(a);//[4,1,2,3]
}
{
    /**
     * 21.用git团队开发时，不同开发分支怎么做合并？
     */
}
{
    /**
     * 22.git pull和git fetch的区别？
     */
}
{
    /**
     * 23.如何将fn的上下文和参数传递给一个新的函数newFn
     */
    function bind(fn, context) {
        var newFn = function () {
            return fn.apply(context, arguments);
        };
        return newFn;
    }
}