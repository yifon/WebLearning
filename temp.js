/**
 * 理解_proto_, prototype,原型链关系
 */
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
June.__proto__.country = "China";//任何对象都有__proto__属性
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
