{
    //无初始值,callback从index为1开始
    var arr = [0, 1, 2, 3];
    arr.reduce(function (pre, cur, index, arr) {
        debugger;
        return pre + cur;
    });
    /*
    第一次debugger
    cur:1
    index:1
    pre:0
    return->pre+cur=0+1=1
    第二次debugger
    cur:2
    index:2
    pre:1
    return->pre+cur=1+2=3
    第三次debugger
    cur:3
    index:3
    pre:3
    return->pre+cur=3+3=6
     */
} {
    //有初始值,callback从index为0开始
    var arr = [0, 1, 2, 3];
    arr.reduce(function (pre, cur, index, arr) {
        debugger;
        return pre + cur;
    }, 5);
    /*
    第一次debugger
    cur:0
    index:0
    pre:5-->为初始值
    return->pre+cur=5+0=5
    第二次debugger
    cur:1
    index:1
    pre:5
    return->pre+cur=5+1=6
    第三次debugger
    cur:2
    index:2
    pre:6
    return->pre+cur=6+2=8
    第四次debugger
    cur:3
    index:3
    pre:8
    return->pre+cur=8+3=11
     */
} {
    /**
     * 实现对operate传多个参数，从第三个参数开始都是一个函数，其参数为operate的参数1和2,如加add(a,b),减minus(a,b),乘multiply(a,b),除divide(a,b)....
     */
    function operate() {
        if (arguments.length < 3) {
            throw new Error("至少要3个参数");
        }
        if (typeof arguments[0] !== 'number' || typeof arguments[1] !== 'number') {
            throw new Error("前两个参数必须是数字");
        }
        var args = Array.prototype.slice.call(arguments, 2); //存储[add,minus,multiply...]
        var a = arguments[0];
        var b = arguments[1];
        //使用reduce做累积计算
        args.reduce(function (pre, cur, index, arr) {
            debugger;
            return pre + cur(a, b);
        }, 0)

    }

    function add(a, b) {
        return a + b;
    }

    function multiply(a, b) {
        return a * b;
    }
    //实现add(arguments[0],arguments[1])+....
    console.log(operate(11, 2, add, multiply));

    /*
    第一次debugger
    cur:add(a,b)
    index:0
    pre:0-->为初始值
    return->pre+cur=0+add(11,2)=0+13=13
    第二次debugger
    cur:multiply(a,b)
    index:1
    pre:13
    return->pre+cur=13+multiply(11,2)=13+22=35
     */
}
