/**
 * 理解_proto_, prototype,原型链关系
 */
{
    function Person(name, age) {
        // constructor(name,age){
        this.name = name;
        this.age = age;
        // }

    }
    Person.prototype.add = function (a, b) {
        return a + b;
    }
    Person.prototype.country = "UK";
    var June = new Person("June", 25);
    June.__proto__.country = "China";//可以使用实例的__proto__属性修改原型,谨慎使用！
    // June.prototype.city = "Shantou";//报错，June不是一个函数，是一个实例对象，没有prototype属性
    console.log(June.__proto__ === Person.prototype);//true
    console.log(June.add(10, 99));//109
    console.log(June.country);//China
    console.log(June.name);//June
    console.log(June.age);//25
    console.log(Person.prototype);//返回一个对象，{add:f,country:"China",constructor:f},只有函数才有这个prototype属性
    console.log(typeof Person.prototype === "object");//true
    console.log(typeof Person.prototype === "function");//false
    console.log(June.prototype);//undefined
    console.log(typeof June);//object
    console.log(June instanceof Person);//true

    var Yifon = {};//先创建一个空对象
    Yifon.__proto__ = Person.prototype;//将Yifon的原型指向其构造函数Person的原型对象
    Person.call(Yifon, "yifon", 18);//将Person的this对象用Yifon替换，并传参
    console.log(Yifon.name);//yifon
    console.log(Yifon.age);//18
    console.log(Yifon.add(11, 22));//33
    console.log(Yifon.country);//China, Yifon也可以访问到country，此处的country已经被上面的June.__proto__.country修改
    console.log(Yifon.prototype);//undefined
    console.log(typeof Yifon);//object
    console.log(Yifon instanceof Person);//true
}
/**
 * Class
 */
{
    let person = new class {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    }("June");//立即执行的类实例
    person.sayName();//June

    /**
     * Symbol,ES6新引入的原始数据类型，表示独一无二的值
     */
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');
    let s3 = Symbol('foo');
    let s4 = Symbol();
    let s5 = Symbol();

    s1 // Symbol(foo)
    s2 // Symbol(bar)

    s1.toString() // "Symbol(foo)"
    s2.toString() // "Symbol(bar)"
    s1 === s3;//false,参数只是表示对当前Symbol值的描述，相同参数的Symbol函数的返回值是不相等的
    s4 == s5;//false
    // true+s2;//Cannot convert a Symbol value to a number, Symbol值不能与其它类型的值进行运算
    Boolean(s5);//true, Symbol值可以转为布尔值
    !s5;//false
    if (s5) {
        console.log("test");//test
    }
    // Number(s5);//TypeError,不能转为数值
    // s5 + 1;

    //作为属性名的Symbol
    let mySymbol = Symbol();
    //第一种写法
    // let  a = {};
    // a[mySymbol] = 'testing';

    //第二种写法
    // let a = {
    //     [mySymbol]: "Hello!"
    // }

    //第三种写法
    let a = {};
    Object.defineProperty(a, mySymbol, { value: 'Hello!' });

    //以上写法都得到同样的结果
    a[mySymbol]//'Hello!'
    a.mySymbol;//undefined,因为点运算符后面总是字符串，而不会读取mySymbol作为标志名所指代的那个值
    a['mySymbol'];//undefined

    const b = {};
    b.mySymbol = "testing";//b的属性名mySymbol实际上是一个字符串，而不是一个Symbol值
    b[mySymbol];//undefined
    b['mySymbol'];//"testing"

    //属性名的遍历
    const obj = {};
    let a = Symbol('a');
    let b = Symbol('b');
    let foo = Symbol('foo');
    obj[a] = 'Hello';
    obj[b] = 'World';
    Object.defineProperty(obj, foo, {
        value: "foobar"
    });
    for (let i in obj) {
        console.log(i);
    }
    Object.getOwnPropertyNames(obj);
    Object.getOwnPropertySymbols(obj);
}
{
    //Symbol.for(),Symbol(),Symbol.keyFor()
    Symbol.for("bar") === Symbol.for("bar");//true
    Symbol("bar") === Symbol("bar");//false
    let s1 = Symbol.for("foo");
    console.log(Symbol.keyFor(s1));//foo
    let s2 = Symbol("foo");
    console.log(Symbol.keyFor(s2));//undefined
}

{
    //Symbol.match
    class MyMatcher {
        [Symbol.match](string) {
            return 'hello world'.indexOf(string);
        }
    }
    'e'.match(new MyMatcher());//1
}
{
    //Symbol.replace
    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);
    var temp = 'Hello'.replace(x, 'World');//["Hello","World"]
    console.log(temp);//undefined
    var temp2 = 'Hello'.replace('Hello', 'World');
    console.log(temp2);//World
}
{
    //Symbol.search
    class MySearch {
        constructor(value) {
            this.value = value;
        }
        [Symbol.search](string) {
            return string.indexOf(this.value);
        }
    }
    'foobar'.search(new MySearch('foo'));//0
}
{
    //Symbol.split
    class MySplitter {
        constructor(value) {
            this.value = value;
        }
        [Symbol.split](string) {
            let index = string.indexOf(this.value);
            if (index === -1) {
                return string;
            }
            return [
                string.substr(0, index),
                string.substr(index + this.value.length)
            ];
        }
    }
    console.log('foobar'.split(new MySplitter('foo')));//['','bar']
    console.log('foobar'.split(new MySplitter('bar')));//['foo','']
    console.log('foobar'.split(new MySplitter('baz')));//'foobar'
}
{
    //Symbol.toPrimitive
    let obj = {
        [Symbol.toPrimitive](hint) {
            switch (hint) {
                case 'number':
                    return 123;
                case 'string':
                    return 'str';
                case 'default':
                    return 'default';
                default:
                    throw new Error();
            }
        }
    }
    console.log(2 * obj);//246
    console.log(3 + obj);//'3default'
    console.log(obj == 'default');//true
    String(obj);//'str'
}
{
    //Symbol.toStringTag
    ({
        [Symbol.toStringTag]: 'Foo'
    }.toString())
    //"[object Foo]"
    class Collection {
        get [Symbol.toStringTag]() {
            return 'xxx';
        }
    }
    let x = new Collection();
    Object.prototype.toString.call(x);//"[object xxx]"
}
{
    //Symbol.unscopables
    {
        class MyClass {
            foo() { return 1; }
        }
        var foo = function () { return 2; }
        with (MyClass.prototype) {
            foo();//1
        }
    }
    {
        class MyClass {
            foo() { return 1; }
            //通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量
            get [Symbol.unscopables]() {
                return { foo: true };
            }
        }
        var foo = function () { return 2; }
        with (MyClass.prototype) {
            foo();//2
        }
    }
}
{
    //静态属性
    class Foo {
        // static myStaticProp = 42;//SyntaxError,此提案暂时还不支持
    }
    Foo.prop = 1;//定义了类的静态属性prop
    Foo.prop;//1
    // Foo.myStaticProp;
}
{
    //new.target属性
    function Person(name) {
        if (new.target === Person) {
            this.name = name;
        } else {
            throw new Error("必须使用new 命令生成实例");
        }
    }
    var person = new Person("June");//正确
    // var notAPerson = Person.call(person, "Yifon");//"必须使用new 命令生成实例"

    //子类继承父类时，new.target会返回子类
    {
        class Rectangle {
            constructor(length, width) {
                console.log(new.target === Rectangle);
            }
        }
        class Square extends Rectangle {
            constructor(length) {
                super(length, 100);
            }
        }
        var obj = new Square(2);//输出false
    }
}
{
    //Decorator
}
{
    //export
    //1
    export var m = 1;
    //2
    var m = 1;
    export { m };
    //3
    var n = 1;
    export { n as m };//通过as关键字，重命名类变量n对外接口

    function V1() {
        //...
    }
    export {
        V1 as oneV1,//重命名类函数V1对外接口
        V1 as anotherV1//可以用不同的名字输出两次
    }
    //export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
    export var foo = 'bar';
    setTimeout(() => foo = "baz", 5000);//变量foo值为bar,5秒后，变成baz
}
{
    //随机排序
    function shuffle(arr) {
        var copy = [], n = arr.length, i;
        while (n) {
            i = Math.floor(Math.random() * n--);//随机获取下标[0,n),然后n-1
            copy.push(arr.splice(i, 1)[0]);
        }
        return copy;
    }
    console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
}
{
    //随机排序,Fisher-Yates算法
    function shuffle(arr) {
        var len = arr.length, temp, i;
        while (len) {
            //随机选取一个元素
            i = Math.floor(Math.random() * len--);//随机获取下标[0,len),然后len-1
            //与当前元素交换
            temp = arr[len];//最后一个元素
            arr[len] = arr[i];//随机抽到的元素与最后一个元素替换位置
            arr[i] = temp;
        }
        return arr;
    }
    console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
}
{
    function shuffle(arr) {
        return arr.sort(function () {
            return Math.random() - 0.5;//[-0.5,0.5)之间的随机数，这样保证正数(升序),负数(降序)获得的比例都一致
        })
    }
    console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
}
