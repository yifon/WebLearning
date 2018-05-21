{
    /**
     * 1.浏览器缓存的方式，如何设置localStoragae或者sessionStorage
     * 浏览器缓存的方式：
     *  a.http缓存:基于http协议的浏览器文件级缓存机制。即针对文件的重复请求情况下，浏览器可以根据协议头判断是从服务器端请求文件还是从本地读取文件。
     *      a.1:判断expires,如果未过期,直接读取http缓存文件,不发http请求,否则进入下一步
     *      a.2:判断是否有etag,有则带上if-none-match发送请求，未修改返回304,修改则返回200,否则进入下一步
     *      a.3:判断是否含有last-modified,有则带上if-modified-since发送请求,无效返回200,有效返回304,否则直接向服务器请求
     *  b.websql:将数据以数据库的形式存储在客户端,根据需求去读取
     *  c.indexDB:是一个能够在客户端存储客观数量的结构化数据,并且在这些数据上使用索引进行高性能检索的API.
     *  d.cookie
     *  e.localStorage
     *    一般用来存储ajax返回的数据，加快下次页面打开时的渲染速度.5M,localstorage大小有限制，不适合存放过多的数据，如果数据存放超过最大限制会报错，并移除最先保存的数据。
     *      //localStorage核心API
     *      localStorage.setItem(key, value)    //设置记录
     *      localStorage.getItem(key)            //获取记录
     *      localStorage.removeItem(key)        //删除该域名下单条记录
     *      localStorage.clear()                //删除该域名下所有记录
     *   f.sessionStorage
     *   g.application cache
     *      application cahce是将大部分图片资源、js、css等静态资源放在manifest文件配置中。当页面打开时通过manifest文件来读取本地文件或是请求服务器文件。
     */
}
{
    /**
     * 2.浏览器内核有哪些?
     * Trident:IE浏览器
     * Gecko:Firefox浏览器
     * Webkit:苹果的Safari,谷歌的Chrome,塞班手机浏览器,安卓手机默认浏览器
     * Presto:Opera浏览器
     */
}
{
    /**
     * 3.浏览器多线程是怎么实现的?
     * 浏览器内核是多线程的，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：
     * GUI渲染线程
     *  -负责渲染浏览器界面HTML元素,当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时，该线程就会执行。在JavaScript引擎运行脚本期间，
     *    GUI渲染线程都是处于挂起状态的，也就是说被“冻结”了。
     * JavaScript引擎线程
     *  -也称为JS内核，主要负责处理JavaScript脚本程序，例如V8引擎。
     *   JS阻塞页面加载：由于GUI渲染线程与JavaScript执行线程是互斥的关系，当浏览器在执行JavaScript程序的时候，GUI渲染线程会被保存在一个队列中，
     *   直到JS程序执行完成，才会接着执行。因此如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。
     * 定时触发器线程
     *  -浏览器定时计数器并不是由JavaScript引擎计数的, 因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确, 
     *   因此通过单独线程来计时并触发定时是更为合理的方案。
     * 事件触发线程
     *  -当一个事件被触发时该线程会把事件添加到待处理队列的队尾,等待JS引擎的处理。这些事件可以是当前执行的代码块如定时任务、
     *   也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系，所有这些事件都得排队等待JS引擎处理。
     * 异步http请求线程
     *  -在XMLHttpRequest在连接后是通过浏览器新开一个线程请求，将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件放到
     *   JavaScript引擎的处理队列中等待处理。
     */
}
{
    /**
     * 4.js为什么是单线程的?
     * js运行在浏览器中，是单线程的，js代码始终在一个线程上执行，此线程被称为js引擎线程。
     * JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
     * 这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM
     * 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
     * 为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主
     * 线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。
     */
}
{
    /**
     * 5.setTimeout(fn,1000)在一个需要2s的同步任务前，那什么时候会执行setTimeout
     */
    //3秒后执行setTimeout回调
    setTimeout(() => {
        console.log(new Date().getTime());
    }, 1000);
    console.log(new Date().getTime());
}
{
    /**
     * 6.
     */
}
{
    /**
     * 7.网络通信有多少层?http是哪一层?TCP位于哪一层？
     * 七层协议:应用层、表示层、会话层、传输层、网络层、数据链路层、物理层。
     * http位于应用层
     * tcp位于传输层
     */
}
{
    /**
     * 8.TCP与UDP区别？
     * 基于连接与无连接
     * TCP要求系统资源较多,UDP较少
     * UDP程序结构较简单
     * 流模式(TCP)与数据报模式(UDP)
     * TCP保证数据准确性,UDP可能丢包
     * TCP保证数据顺序,UDP不保证
     */
}
{
    /**
     * 9.怎么解决UDP丢包的问题？
     * a.从发送端:发送频率不要太快,延迟发送
     * b.从接收端:收到数据之后尽快返回，可以通过多线程+队列来解决，收到数据后将数据放入队列中，另起一个线程去处理收到的数据
     *        修改接收端缓冲区大小
     * QoS
     */
}
{
    /**
     * 10.CSS3有哪些实现了性能优化?为什么可以实现性能优化？
     * 如translate3d进行GPU加速。CSS动画中使用webkit-transform:translateX(500px)的方案代替使用left:500px.因为webkit-transform只触发页面的重排，而left会触发页面的回流和重绘
     * opacity
     * 元素本身使用transform和opacity做CSS动画的时候，会提前告诉GPU动画如何开始和结束及所需要的指令；所以会创建一个复合层（渲染层），并把页面所有的复合层发送给GPU；
     * 作为图像缓存，然后动画的发生仅仅是复合层间相对移动。而使用js做动画，js必须在动画的每一帧计算元素的状态；发送给GPU，但不会将元素提升至一个复合层；所以想让元素提升至一个复合层，必须使用translateZ或will-change: transform, opacity。
     */
}
{
    /**
     * 11.实现动画一定要用CSS3吗?
     * 不一定，可结合.
     * CSS3优点:不占用js主线程,可以利用硬件加速,浏览器可对动画做优化
     * 
     */
}
{
    /**
     * 12.id和class哪个性能好一点?
     * id唯一，查找事件较短
     */
}
{
    /**
     * 13.<div class="parent"><div class="child"></div></div>
     * 父div宽度未知，实现子div水平和垂直居中
     * .parent{position:relative;}
     * .child{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;}
     */
}
{
    /**
     * 14.进程和线程的区别和关系
     * a.进程是操作系统分配资源的最小单位，线程是程序执行的最小单位。
     * b.一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线。
     * c.进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间(包括代码段、数据集、堆等)及一些进程的资源(如打开文件和信号)
     * d.调度和切换:线程上下文切换比进程上下文切换要快得多
     */
}
{
    /**
     * 15.什么是BFC?
     * 块级格式化上下文
     */
}
{
    console.log(1 + "2");//12
    console.log("2" + 1);//21
    console.log(NaN * 4);//NaN
    console.log(2 * 0.0123 === 0.0246);//true
    console.log(13 >> 2);//01101,右移两位,00011=>3
    console.log(-13 >> 2);//原码(1)1101,负数按位取反(1)0010,加1=>(1)0011,右移两位,(1)1100,减1=>(1)1011,再按位取反=>(1)0100,得到原码-4
    console.log(13 | 5);//1101 和0101或运算=>1101,13
    console.log(13 & 5);//1101 和0101与运算=>0101,5
    console.log(void (0));//undefined
    console.log(typeof null);//"object"

    //输出结果
    var foo = "abc";
    (function () {
        var bar = "dddd";
        console.log(foo + bar);//abcdddd
    })();
    console.log(foo + bar);//Uncaught ReferenceError:bar is not defined

    //输出foo.x的值
    var foo = { n: 1 };
    var bar = foo;//bar和foo都指向同一个对象{n:1}
    //赋值表达式是右结合的==>foo.x=(foo={n:2}),JS引擎总是先计算左边的操作数，再计算右边的操作数
    //先从左到右解析各个引用，然后计算最右侧的表达式的值，最后把值从右到左赋给各个引用。
    foo.x = foo = { n: 2 };
    console.log(foo.x);//undefined
    console.log(bar.x);//{n:2}
    console.log(bar);//{n: 1, x: {n: 2}}
    console.log(foo);//{n:2}
}
{
    //判断是不是 Chrome 浏览器
    var ua = navigator.userAgent
    var isChrome = ua.indexOf('Chrome')
    console.log(isChrome !== -1);
}