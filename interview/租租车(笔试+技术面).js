/**
 * 先填个人资料，再做8道笔试题，涉及知识点:闭包、arguments、性能优化、输入url发生了什么、数组去重、委托冒泡、跨域实现方式、<script>标签放</body>前的原因
 * 技术面试共一个小时多一点，最后本来有hr面的，但hr开会去了，面试官让3天左右等hr电话通知，让等通知的都是没戏了
 */
{
    /**
     * 1.让输出结果，fn()部分没问题，arguments[0](),其实arguments第一个参数是fn,
     * 所以fn()实际上还是让输出this.lenght,但此时的this是arguments,所以长度始终为参数个数
     */
    var length = 10;
    function fn() {
        console.log(this.length);
    }
    var test = {
        length: 5,
        callFn: function (fn) {
            fn();//10
            arguments[0]();//调用fn,同时this指向了arguments,所以this.length就是arguments的长度
        }
    }
    test.callFn(fn, 5);//10,2
}
{
    /**
     * 2.三列布局，左右贴边，宽为200px，中间列宽度自适应，且间隔左右两列各10px.
     * 提了圣杯布局，手写环境跪了，细节没写好，参考三列布局.html
     */
}
{
    /**
     * 3.pm2如何查看进程内存占用
     * pm2 show 0:查看执行编号为0的进程
     * pm2 monit:显示每个应用程序的CPU和内存占用情况
     */
}
{
    /**
     * 4.node如何在后台抓包
     */
}
{
    /**
     * 5.git 主分支，开发分支，测试分支的使用，污染问题
     */
}
{
    /**
     * 6.jsonp的实现，为什么要带callback?
     */
}
{
    /**
     * 7.js是单线程的，但node.js怎么解决这个问题?
     */
}
{
    /**
     * 8.假设同一个租租车页面，但A,B,C三个国家访问速度差异很大，你觉得会是什么造成的，怎么做优化？
     */
}
{
    /**
     * 9.平常上线是怎么部署的?
     */
}
{
    /**
     * 10.移动端布局用rem还是px做单位?
     * rem,适配不同手机屏幕分辨率
     */
}