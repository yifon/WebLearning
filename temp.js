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
    June.__proto__.country = "China"; //可以使用实例的__proto__属性修改原型,谨慎使用！
    // June.prototype.city = "Shantou";//报错，June不是一个函数，是一个实例对象，没有prototype属性
    console.log(June.__proto__ === Person.prototype); //true
    console.log(June.add(10, 99)); //109
    console.log(June.country); //China
    console.log(June.name); //June
    console.log(June.age); //25
    console.log(Person.prototype); //返回一个对象，{add:f,country:"China",constructor:f},只有函数才有这个prototype属性
    console.log(typeof Person.prototype === "object"); //true
    console.log(typeof Person.prototype === "function"); //false
    console.log(June.prototype); //undefined
    console.log(typeof June); //object
    console.log(June instanceof Person); //true

    var Yifon = {}; //先创建一个空对象
    Yifon.__proto__ = Person.prototype; //将Yifon的原型指向其构造函数Person的原型对象
    Person.call(Yifon, "yifon", 18); //将Person的this对象用Yifon替换，并传参
    console.log(Yifon.name); //yifon
    console.log(Yifon.age); //18
    console.log(Yifon.add(11, 22)); //33
    console.log(Yifon.country); //China, Yifon也可以访问到country，此处的country已经被上面的June.__proto__.country修改
    console.log(Yifon.prototype); //undefined
    console.log(typeof Yifon); //object
    console.log(Yifon instanceof Person); //true
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
    }("June"); //立即执行的类实例
    person.sayName(); //June

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
    s1 === s3; //false,参数只是表示对当前Symbol值的描述，相同参数的Symbol函数的返回值是不相等的
    s4 == s5; //false
    // true+s2;//Cannot convert a Symbol value to a number, Symbol值不能与其它类型的值进行运算
    Boolean(s5); //true, Symbol值可以转为布尔值
    !s5; //false
    if (s5) {
        console.log("test"); //test
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
    Object.defineProperty(a, mySymbol, {
        value: 'Hello!'
    });

    //以上写法都得到同样的结果
    a[mySymbol] //'Hello!'
    a.mySymbol; //undefined,因为点运算符后面总是字符串，而不会读取mySymbol作为标志名所指代的那个值
    a['mySymbol']; //undefined

    const b = {};
    b.mySymbol = "testing"; //b的属性名mySymbol实际上是一个字符串，而不是一个Symbol值
    b[mySymbol]; //undefined
    b['mySymbol']; //"testing"

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
} {
    //Symbol.for(),Symbol(),Symbol.keyFor()
    Symbol.for("bar") === Symbol.for("bar"); //true
    Symbol("bar") === Symbol("bar"); //false
    let s1 = Symbol.for("foo");
    console.log(Symbol.keyFor(s1)); //foo
    let s2 = Symbol("foo");
    console.log(Symbol.keyFor(s2)); //undefined
}

{
    //Symbol.match
    class MyMatcher {
        [Symbol.match](string) {
            return 'hello world'.indexOf(string);
        }
    }
    'e'.match(new MyMatcher()); //1
} {
    //Symbol.replace
    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);
    var temp = 'Hello'.replace(x, 'World'); //["Hello","World"]
    console.log(temp); //undefined
    var temp2 = 'Hello'.replace('Hello', 'World');
    console.log(temp2); //World
} {
    //Symbol.search
    class MySearch {
        constructor(value) {
                this.value = value;
            }
            [Symbol.search](string) {
                return string.indexOf(this.value);
            }
    }
    'foobar'.search(new MySearch('foo')); //0
} {
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
    console.log('foobar'.split(new MySplitter('foo'))); //['','bar']
    console.log('foobar'.split(new MySplitter('bar'))); //['foo','']
    console.log('foobar'.split(new MySplitter('baz'))); //'foobar'
} {
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
    console.log(2 * obj); //246
    console.log(3 + obj); //'3default'
    console.log(obj == 'default'); //true
    String(obj); //'str'
} {
    //Symbol.toStringTag
    ({
        [Symbol.toStringTag]: 'Foo'
    }.toString())
    //"[object Foo]"
    class Collection {
        get[Symbol.toStringTag]() {
            return 'xxx';
        }
    }
    let x = new Collection();
    Object.prototype.toString.call(x); //"[object xxx]"
} {
    //Symbol.unscopables
    {
        class MyClass {
            foo() {
                return 1;
            }
        }
        var foo = function () {
            return 2;
        }
        with(MyClass.prototype) {
            foo(); //1
        }
    } {
        class MyClass {
            foo() {
                return 1;
            }
            //通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量
            get[Symbol.unscopables]() {
                return {
                    foo: true
                };
            }
        }
        var foo = function () {
            return 2;
        }
        with(MyClass.prototype) {
            foo(); //2
        }
    }
} {
    //静态属性
    class Foo {
        // static myStaticProp = 42;//SyntaxError,此提案暂时还不支持
    }
    Foo.prop = 1; //定义了类的静态属性prop
    Foo.prop; //1
    // Foo.myStaticProp;
} {
    //new.target属性
    function Person(name) {
        if (new.target === Person) {
            this.name = name;
        } else {
            throw new Error("必须使用new 命令生成实例");
        }
    }
    var person = new Person("June"); //正确
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
        var obj = new Square(2); //输出false
    }
} {
    //Decorator
} {
    //export
    //1
    export var m = 1;
    //2
    var m = 1;
    export {
        m
    };
    //3
    var n = 1;
    export {
        n as m
    }; //通过as关键字，重命名类变量n对外接口

    function V1() {
        //...
    }
    export {
        V1 as oneV1, //重命名类函数V1对外接口
        V1 as anotherV1 //可以用不同的名字输出两次
    }
    //export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
    export var foo = 'bar';
    setTimeout(() => foo = "baz", 5000); //变量foo值为bar,5秒后，变成baz
} {
    //随机排序
    function shuffle(arr) {
        var copy = [],
            n = arr.length,
            i;
        while (n) {
            i = Math.floor(Math.random() * n--); //随机获取下标[0,n),然后n-1
            copy.push(arr.splice(i, 1)[0]);
        }
        return copy;
    }
    console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
} {
    //随机排序,Fisher-Yates算法
    function shuffle(arr) {
        var len = arr.length,
            temp, i;
        while (len) {
            //随机选取一个元素
            i = Math.floor(Math.random() * len--); //随机获取下标[0,len),然后len-1
            //与当前元素交换
            temp = arr[len]; //最后一个元素
            arr[len] = arr[i]; //随机抽到的元素与最后一个元素替换位置
            arr[i] = temp;
        }
        return arr;
    }
    console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
} {
    function shuffle(arr) {
        return arr.sort(function () {
            return Math.random() - 0.5; //[-0.5,0.5)之间的随机数，这样保证正数(升序),负数(降序)获得的比例都一致
        })
    }
    console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
} {
    let b = [1, 2];
    //返回指定对象上一个自有属性对应的属性描述符。(obj,prop)
    Object.getOwnPropertyDescriptor(b, "length");
    //{value: 2, writable: true, enumerable: false, configurable: false}
    //length的命名访问器属性set和get不能动所以就无法设置setter和getter
    //Uncaught TypeError: Cannot redefine property: length
    // Object.defineProperty(b, "length", {
    //     set: function () {
    //         console.log(1)
    //     }
    // }) 
    //数组下的索引是可以用setter和getter的
    let a = ['hi', 'girl'];
    Object.getOwnPropertyDescriptor(a, "1"); //传数字代表索引
    //{value: "girl", writable: true, enumerable: true, configurable: true}
    //vue下索引也不允许更新，是因为如:length＝5的数组，它不一定每个索引都有属性,所以没法用setter
} {
    /**
     * Vue不能检测对象属性的添加或删除
     */
    // let b = {
    //     "a": "string a",
    //     "b": 10
    // }
    let b = {};
    //默认是non-configurable,non-enumerable,non-writable
    Object.defineProperties(b, {
        "a": {
            value: "string a",
        },
        "b": {
            value: 10
        }
    });
    Object.getOwnPropertyDescriptor(b, "b");
    //{value: 10, writable: false, enumerable: false, configurable: false}
    b["c"] = true;
    Object.getOwnPropertyDescriptor(b, "c");
    // {value: true, writable: true, enumerable: true, configurable: true}

    //返回一个由指定对象的所有自身属性的属性名(包括不可枚举属性但不包括Symbol值作为名称的属性)组成的数组
    // Object.getOwnPropertyNames(b);
} {
    // 比较 a === vm1.userProfile，返回的是true，意味着只是在vm.userProfile上面添加新属性
    let vm1 = {
        userProfile: {
            name: "June"
        }
    };
    //如果vm1.userProfile没定义，会Uncaught TypeError: Cannot convert undefined or null to object
    let a = Object.assign(vm1.userProfile, {
        age: 27,
        favoriteColor: 'Vue Green'
    })
    console.log(a === vm1.userProfile);
    let vm2 = {
        userProfile: {
            name: "June"
        }
    };
    // b === vm2.userProfile 返回的是false，意味着返回了一个新对象
    let b = Object.assign({}, vm2.userProfile, {
        age: 27,
        favoriteColor: 'Vue Green'
    })
    console.log(b === vm2.userProfile);
} {
    function Person(name, sex) {
        this.name = name;
        this.sex = sex;
    }
    Person.prototype.getInfo = function () {
        console.log('getInfo: [name:' + this.name + ', sex:' + this.sex + ']');
    }
    // var a = new Person('jojo', 'femal');
    var a = new Person();
    console.log(a);
    var b = Object.create(Person.prototype);
    console.log(b);
} {
    //创建一个集合
    let set = new Set(['a', 'b', 'c']);
    console.log(set); //Set(3) {"a", "b", "c"}
    set.delete('a');
    set.delete("d");
    console.log(set); //Set(2) {"b", "c"}
    console.log(set.keys);
    console.log(set.has('b')); //true
} {
    //map
    let obj1 = {
            a: 1
        },
        obj2 = {
            b: 2
        };
    const map = new Map([
        ['name', 'Lee'],
        [obj1, 'hahah'],
        [obj2, 'code'],
        [
            [1, 2], '123'
        ]
    ]);
    console.log(map); //Map(4) {"name" => "Lee", {…} => "hahah", {…} => "code", Array(2) => "123"}
    console.log(map.size); //4,4个键值对

    //set,<key,value>
    map.set('friends', ['xiaoming', 'xiaohuang']);
    //get (key)
    map.get('friends');
    //delete (key)
    map.delete('friends'); //true
    //has (key)
    map.has(obj1); //true
    //clear
    // map.clear();
    console.log(map); //Map(0) {}

    console.log(map.keys());
    console.log(map.values());
    console.log(map.entries());

    //对map进行遍历
    map.forEach(function (value, index) {
        console.log(value);
        // console.log(index);
    });
} {
    //Symbol
    //1.定义
    let str1 = Symbol();
    let str2 = Symbol();
    console.log(str1 === str2); //false
    console.log(typeof str1); //symbol

    //2.描述
    let str3 = Symbol("name");
    let str4 = Symbol("name");
    console.log(str3 === str4); //false

    //3.对象的属性名
    const obj = {};
    obj.name = "张三";
    obj.name = "李四";
    obj[Symbol("age")] = 20;
    obj[Symbol("age")] = 55;
    console.log(obj); //{name: "李四", Symbol(age): 20, Symbol(age): 55}
} {
    //Class的基本运用
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        print() {
            console.log("My name is " + this.name + ", I'm " + this.age + " year old.");
        }
    }
    let person = new Person("June", 25);
    console.log(person); //Person {name: "June", age: 25}
    person.print(); //My name is June, I'm 25 year old.
} {
    //1.模板字符串
    let str = "天气不错!";
    let className = 'test';
    let html = `
    <html>
    <head>
    <style>
    .test{
        color:red;
    }
    </style>
    </head>
    <body>
    <ul>
    <li>a</li>
    <li>b</li>
    </ul>
    <p class='${className}'>${str}</p>
    </body>
    </html>`;
    console.log(html);
    //数组的扩展
    //Array.from,把一些伪数组转成正式数组
    let allLis = document.querySelectorAll("li");
    console.log(allLis); //NodeList []
    console.log(Array.isArray(allLis)); //false

    Array.from(allLis); //转成真实的数组
    console.log(Array.isArray(Array.from(allLis))); //true

    //Array.of,将零零散散的东西转成数组
    Array.of(1, 2, 3, 4);

    //对象的扩展
    //key和value一样，则写一个就够了
    let name = '张三';
    let age = 18;
    let obj = {
        name,
        age
    };
    // console.log(obj);

    //Object.assign(),合并
    let obj1 = {
        name: "三"
    };
    let obj2 = {
        age: 22
    };
    let obj = {};
    Object.assign(obj, obj1, obj2);
    console.log(obj); //{name: "三", age: 22}

    //延展操作符
    let str1 = "Wether";
    let strArr = [...str1];
    console.log(strArr); //(6) ["W", "e", "t", "h", "e", "r"]

    let student = {
        name: "june",
        age: 25,
        sex: 'female'
    };

    //去重
    let myArr = [1, 2, 10, 'june', 2, 1, 'june', 'ray'];
    // console.log(new Set(myArr));//Set(5) {1, 2, 10, "june", "ray"}
    console.log([...new Set(myArr)]); //转成数组,(5) [1, 2, 10, "june", "ray"]
} {
    //函数扩展
    //1.ES5中形参设置默认值
    function sum1(num1, num2) {
        num1 = num1 || 0;
        num2 = num2 || 0;
        console.log(num1 + num2);
    }
    sum1(); //0
    //ES6
    function sum2(num1 = 0, num2 = 0) {
        console.log(num1 + num2);
    }
    sum2(); //0
    sum2(1, 2); //3

    //2.参数形式  延展操作符
    //ES5
    function sum3() {
        let result = 0;
        for (let value of arguments) {
            result += value;
        }
        return result;
    }
    console.log(sum3(10, 20, 30)); //60

    //ES6
    function sum4(name, ...nums) {
        console.log(name); //june
        let result = 0;
        for (let value of nums) {
            result += value;
        }
        return result;
    }
    console.log(sum4('june', 10, 20, 30, 50)); //110
}