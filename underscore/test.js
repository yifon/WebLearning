const _ = require("underscore");

//集合(Collections)

{
    /**
     * each:_.each(list, iteratee, [context])
     * 遍历list中的所有元素，按顺序用每个元素当做参数调用 iteratee 函数。如果传递了context参数，则把iteratee绑定到context对象上。
     */
    _.each([1, 2, 3], function (value, index, list) {
        console.log("value:" + value + "; index:" + index + "; list:" + list);
    })
    //如果list是个JavaScript对象，iteratee的参数是 (value, key, list))。返回list以方便链式调用。
    _.each({
        one: 1,
        two: 2,
        three: 3
    }, function (value, key, list) {
        console.log("value:" + value + "; key:" + key + "; list:" + list);
    })
} {
    /**
     * map:_.map(list,iteratee,[context])
     * 通过对list里的每个元素调用转换函数(iteratee迭代器)生成一个与之相对应的数组,iteratee的参数是(value,index/key,list)
     */
    const a = _.map([1, 2, 3], function (num) {
        return num * 3;
    });
    console.log(a);
    //[3,6,9]
    const b = _.map({
        one: 1,
        two: 2,
        three: 3
    }, function (num, key) {
        return num * 3;
    });
    console.log(b);
    //[3,6,9]
    const c = _.map([
        [1, 2],
        [3, 4]
    ], _.first);
    console.log(c);
    //[1,3]
} {
    /**
     * reduce:_reduce(list,iteratee,[memo],[context])
     * 把list中元素归结为一个单独的数值。
     * memo是reduce函数的初始值，会被每一次成功调用iteratee函数的返回值所取代。
     * iteratee传递4个参数:memo,value和迭代的index/key和list
     * 如果没有memo传递给reduce的初始调用，iteratee不会被列表中的第一个元素调用。
     * 第一个元素将取代memo参数传递给列表中下一个元素调用的iteratee函数。
     */
    const sum = _.reduce([1, 2, 3], function (memo, num) {
        return memo + num;
    }, 1);
    console.log(sum); //7
} {
    /**
     * reduceRight:_reduceRight(list,iteratee,memo,[context])
     * 从右侧开始组合元素的reduce函数
     */
    const list = [
        [0, 1],
        [2, 3],
        [4, 5, [6, 7]]
    ];
    const flat = _.reduceRight(list, function (a, b) {
        return a.concat(b);
    }, []);
    console.log(flat); //[4,5,[6,7],2,3,0,1]
} {
    /**
     * find:_find(list,predicate,[context])
     * 在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有元素通过检测则返回undefined。
     * 如果找到匹配的元素，将立刻返回，不会遍历整个list.
     */
    const even = _.find([1, 2, 3, 4, 5, 6], function (num) {
        return num % 2 === 0;
    });
    console.log(even); //2
} {
    /**
     * filter:_filter(list,predicate,[context])
     * 遍历list中的每个值，返回所有通过predicate真值检测的元素所组成的数组。
     */
    const events = _.filter([1, 2, 3, 4, 5, 6], function (num) {
        return num % 2 === 0;
    });
    console.log(events); //[2,4,6]
} {
    /**
     * reject:reject(list,predicate,[context])
     * 遍历list中的每个值，返回所有没有通过predicate真值检测的元素所组成的数组,与filter相反
     */
    const events = _.reject([1, 2, 3, 4, 5, 6], function (num) {
        return num % 2 === 0;
    });
    console.log(events); //[1,3,5]
} {
    /**
     * every:_every(list,[predicate],[context])
     * 如果list中的所有元素都通过predicate的真值检测就返回true
     */
    const a = _.every([true, 1, null, 'yes'], _.identity);
    console.log(a); //false
} {
    /**
     * some:some(list,[predicate],[context])
     * 如果list中有任何一个元素通过 predicate 的真值检测就返回true。一旦找到了符合条件的元素, 就直接中断对list的遍历. 
     */
    const a = _.some([false, 0, null, 'yes']);
    console.log(a); //true。‘yes’为true
} {
    /**
     * contains:_contains(list,value,[fromIndex])
     * 如果list包含指定的value,则返回true,如果lisst是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置
     */
    const a = _.contains([1, 2, 3], 4);
    console.log(a); //false
} {
    /**
     * where:_where(list,properties)
     * 遍历list中的每一个值，返回一个数组，这个数组里的元素包含properties所列出的键值对
     */
    const listOfPlays = [{
        name: "June",
        age: 19,
        sex: "Female"
    }, {
        name: "Yifon",
        age: 25,
        sex: "Female"
    }, {
        name: "Apple",
        age: 19,
        sex: "Male"
    }, , {
        name: "Rice",
        age: 19,
        sex: "Female"
    }];
    const a = _.where(listOfPlays, {
        age: 19,
        sex: "Female"
    });
    console.log(a);
    //[ { name: 'June', age: 19, sex: 'Female' },{ name: 'Rice', age: 19, sex: 'Female' } ]
} {
    /**
     * findWhere:_findWhere(list,properties)
     * 遍历整个list,返回匹配properties参数所列出的所有键值对的第一值。
     * 如果没有找到匹配的属性，或者list是空的，那么将返回undefined
     */
    const listOfPlays = [{
        name: "June",
        age: 19,
        sex: "Female"
    }, {
        name: "Yifon",
        age: 25,
        sex: "Female"
    }, {
        name: "Apple",
        age: 19,
        sex: "Male"
    }, , {
        name: "Rice",
        age: 19,
        sex: "Female"
    }];
    const a = _.findWhere(listOfPlays, {
        age: 19,
        sex: "Female"
    });
    console.log(a);
    //{ name: 'June', age: 19, sex: 'Female' }
} {
    /**
     * invoke:_.invoke(list,methodName,*arguments)
     * 在list的每个元素上执行methodName方法，任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它.
     */
    const a = _.invoke([
        [5, 1, 7],
        [3, 2, 1]
    ], 'sort');
    console.log(a); //[ [ 1, 5, 7 ], [ 1, 2, 3 ] ]
} {
    /**
     * pluck:_pluck(list,propertyName)
     * 萃取数组对象中某属性值，返回一个数组
     */
    const stooges = [{
        name: 'june',
        age: 11
    }, {
        name: 'yifon',
        age: 12
    }, {
        name: 'apple',
        age: 13
    }];
    const a = _.pluck(stooges, "age");
    console.log(a); //[ 11, 12, 13 ]
} {
    /**
     * max:_.max(list,[iteratee],[context])
     * 返回list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity.
     * 所以最好事先用isEmpty检查 list 。
     */
    const stooges = [{
        name: 'june',
        age: 11
    }, {
        name: 'yifon',
        age: 12
    }, {
        name: 'apple',
        age: 13
    }];
    const a = _.max(stooges, function (stooge) {
        return stooge.age;
    })
    console.log(a); //{ name: 'apple', age: 13 }
} {
    /**
     * min:_.min(list,[iteratee],[context])
     * 返回list中的最小值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将Infinity.
     * 所以最好事先用isEmpty检查 list 。
     */
    const stooges = [{
        name: 'june',
        age: 11
    }, {
        name: 'yifon',
        age: 12
    }, {
        name: 'apple',
        age: 13
    }];
    const a = _.min(stooges, function (stooge) {
        return stooge.age;
    })
    console.log(a); //{ name: 'june', age: 11 }
} {
    /**
     * sortBy:_sortBy(list,iteratee,[context])
     * 返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。
     * 用来进行排序迭代器也可以是属性名称的字符串(比如length)
     */
    const a = _.sortBy([1, 2, 3, 4, 5, 6], function (num) {
        return Math.sin(num); //sin() 方法可返回一个数字的正弦。
    })
    console.log(a); //[5,4,6,3,1,2]

    const stooges = [{
        name: 'june',
        age: 11
    }, {
        name: 'yifon',
        age: 12
    }, {
        name: 'apple',
        age: 13
    }];
    const b = _.sortBy(stooges, "name");
    console.log(b); //[ { name: 'apple', age: 13 } ,{ name: 'june', age: 11 }, { name: 'yifon', age: 12 } ]
} {
    /**
     * groupBy:_.groupBy(list,iteratee,[context])
     * 把一个集合分组为多个集合,通过iterator返回的结果进行分组。如果iterator是一个字符串而不是函数，那么将使用iterator作为各元素的属性名来进行分组
     */
    const a = _.groupBy([1.3, 2.1, 2.4], function (num) {
        return Math.floor(num);
    });
    console.log(a); //{ '1': [ 1.3 ], '2': [ 2.1, 2.4 ] }
    const b = _.groupBy(['one', 'two', 'three'], 'length');
    console.log(b); //{ '3': [ 'one', 'two' ], '5': [ 'three' ] }
} {
    /**
     * indexBy:_.index(list,iteratee,[context])
     * 给定一个list,和一个用来返回一个在列表中的每个元素键的iterator函数(或属性名),返回一个每项索引的对象
     */
    const stooges = [{
        name: 'june',
        age: 11
    }, {
        name: 'yifon',
        age: 12
    }, {
        name: 'apple',
        age: 13
    }];
    const a = _.indexBy(stooges, "age");
    console.log(a); //{ '11': { name: 'june', age: 11 },'12': { name: 'yifon', age: 12 },'13': { name: 'apple', age: 13 } }
} {
    /**
     * countBy:_countBy(list,iteratee,[context])
     * 排序一个列表组成多个组，并且返回各组中的对象的数量的计数。
     */

    const a = _.countBy([1, 2, 3, 4, 5], function (num) {
        return num % 2 === 0 ? "even" : "odd";
    })
    console.log(a); //{ odd: 3, even: 2 }
} {
    /**
     * shuffle:_shuffle(list)
     * 返回一个随机乱序的list副本，使用Fisher-Yates-shuffle来进行随机乱序
     */
    const a = _.shuffle([1, 2, 3, 4, 5, 6]);
    console.log(a);
}
{
    /**
     * sample:_sample(list,[n])
     * 从list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项
     */
    const a = _.sample([1, 2, 3, 4, 5, 6]);
    console.log(a);
    const b = _.sample([1, 2, 3, 4, 5, 6], 4);
    console.log(b);
}
{
    /**
     * toArray:_.toArray(list)
     * 把list(任何可以迭代的对象)转换成一个数组，在转换arguments对象时非常有用
     */
    const a = (function () {
        return _.toArray(arguments).slice(1);
    })(0, 1, 2, 3, "hi", 5);
    console.log(a);//[ 1, 2, 3, 'hi', 5 ]
}
{
    /**
     * size:_size(list)
     * 返回list的长度
     */
    const a = _.size({ one: 1, two: 2, three: 3 });
    console.log(a);//3
}
{
    /**
     * partition:_.partition(array,predicate)
     * 拆分一个数组(array)为两个数组：第一个数组其元素都满足predicate迭代函数，而第二个的所有元素均不能满足predicate迭代函数
     */
    function isOdd(num) {
        return num % 2 !== 0;
    }
    const a = _.partition([0, 1, 2, 3, 4, 5], isOdd);
    console.log(a);//[ [ 1, 3, 5 ], [ 0, 2, 4 ] ]
}

//数组函数(Array Functions)
{
    /**
     * first:_.first(array,[n])
     * 返回array(数组)的第一个元素。传递n参数将返回数组中从第一个元素开始的n个元素
     */
    const a = _.first([5, 4, 3, 2, 1]);
    console.log(a);//5
    const b = _.first([5, 4, 3, 2, 1], 4);
    console.log(b);//[ 5, 4, 3, 2 ]
}
{
    /**
     * last:_.last(array,[n])
     * 返回array(数组)的最后一个元素。传递n参数将返回数组中从最后一个元素开始的n个元素
     */
    const a = _.last([5, 4, 3, 2, 1]);
    console.log(a);//1
    const b = _.last([5, 4, 3, 2, 1], 4);
    console.log(b);//[ 4, 3, 2,1 ]
} {
    /**
     * initial:_.initial(array,[n])
     * 返回数组中除了最后一个元素外的其他全部元素。在arguments对象上特别有用。传递n参数将从结果中排除从最后一个开始的n个元素
     */
    const a = _.initial([5, 4, 3, 2, 1]);
    console.log(a);//[5,4,3,2]
    const b = _.initial([5, 4, 3, 2, 1], 2);
    console.log(b);//[5, 4, 3]
}
{
    /**
     * rest:_.rest(array,[index])
     * 返回数组中除了第一个元素外的其他全部元素。传递index参数将返回从index开始的剩余所有元素
     */
    const a = _.rest([5, 4, 3, 2, 1]);
    console.log(a);//[5,4,3,2,1]
    const b = _.rest([5, 4, 3, 2, 1], 3);
    console.log(b);//[2,1]
}
{
    /**
     * compact:_.compact(array)
     * 返回一个除去了所有false值的array副本。
     * 在js中,false,null,0,"",undefined,NaN都是false值
     */
    const a = _.compact([0, 1, false, 2, "", 3]);
    console.log(a);//[1,2,3]
}
{
    /**
     * flatten:_flatten(array,[shallow])
     * 将一个嵌套多层的数组array（嵌套可以是任何层数转换为只有一层的数组。
     * 如果传递shallow参数，数组将只减少一维的嵌套
     */
    const a = _.flatten([1, [2], [3, [[4]]]]);
    console.log(a);//[ 1, 2, 3,4 ]
    const b = _.flatten([1, [2], [3, [[4]]]], true);
    console.log(b);//[ 1, 2, 3, [ [ 4 ] ] ]
}
{
    /**
     * without:_.without(array,*values)
     * 返回一个删除所有values值后的array副本
     */
    const a = _.without([1, 2, 1, 0, 3, 4, 1, 0], 0, 4);
    console.log(a);//[1,2,1,3,1]
}
{
    /**
     * union:_.union(*arrays)
     * 返回传入的arrays(数组)并集:按顺序返回,返回数组的元素是唯一的,可以传入一个或多个arrays(数组)
     */
    const a = _.union([1, 2, 3], [3, 4, 5], [1, 3, 4, 5]);
    console.log(a);//[1,2,3,4,5]
}
{
    /**
     * intersection:_.intersection(*arrays)
     * 返回传入arrays(数组)交集。
     */
    const a = _.intersection([1, 2, 3], [2, 2, 3], [3, 3, 4, 1]);
    console.log(a);//[3]
} {
    /**
     * difference:_.difference(array,*others)
     * 返回的值来自array参数数组，并且不存在于other数组
     */
    const a = _.difference([1, 2, 3, 4, 5], [5, 2, 1]);
    console.log(a);//[3,4]
}
{
    /**
     * uniq:_.uniq(array,[isSorted],[iteratee])
     * 返回array去重后的副本，使用===做相等测试。如果确定array已经排序，那么给isSorted参数传递true值，
     * 此函数将运行更快的算法。
     * 如果要处理对象元素，传递iteratee函数来获取要对比的属性
     */
    const a = _.uniq([1, 2, 1, 3, 1, 4]);
    console.log(a);//[1,2,3,4]
}
{
    /**
     * zip:_.zip(*arrays)
     * 将每个array中对应位置的值合并值一起。
     */
    const a = _.zip(["june", "yifon", "apple"], [12, 13, 14], [true, false, true]);
    console.log(a);//[["june",12,true],["yifon",13,false],["apple",14,true]]
}
{
    /**
     * unzip:_.unzip(*arrays)
     * 作用与zip相反
     */
    const a = [["june", 12, true], ["yifon", 13, false], ["apple", 14, true]];
    console.log(_.unzip(a));//[ [ 'june', 'yifon', 'apple' ],[ 12, 13, 14 ],[ true, false, true ] ]
} {
    /**
     * object:_object(list,[values])
     * 将数组转换成对象。传递任何一个单独[key, value]对的列表，或者一个键的列表和一个值得列表。 如果存在重复键，最后一个值将被返回。
     */
    const a = _.object(["june", "apple", "yifon"], [12, 13, 14]);
    console.log(a);//{ june: 12, apple: 13, yifon: 14 }
    const b = _.object([["june", 12], ["apple", 13], ["yifon", 14]]);
    console.log(b);//{ june: 12, apple: 13, yifon: 14 }
}
{
    /**
     * indexOf:_.indexOf(array,value,[isSorted])
     * 返回value在该 array 中的索引值，如果value不存在 array中就返回-1。
     * 使用原生的indexOf 函数，除非它失效。如果您正在使用一个大数组，你知道数组已经排序，传递true给isSorted将更快的用二进制
     * 搜索..,或者，传递一个数字作为第三个参数，为了在给定的索引的数组中寻找第一个匹配值
     */
    const a = _.indexOf([1, 2, 3], 2);
    console.log(a);//1
}
{
    /**
     * lastIndexOf:_.lastIndexOf(array,value,[fromIndex])
     * 返回value在该 array 中的从最后开始的索引值，如果value不存在 array中就返回-1
     */
    const a = _.lastIndexOf([1, 2, 3, 2, 3, 4], 2);
    console.log(a);//3
}
{
    /**
     * sortedIndex:_.sortedIndex(list,value,[iteratee],[context])
     * 使用二分查找确定value在list中的位置序号,value将按此序号插入能保持list原有的排序。
     * 如果提供iterator函数，将其作为list排序的依据。
     * iterator也可以是字符串的属性名用来排序(比如length)
     */
    const a = _.sortedIndex([10, 20, 30, 40, 50], 35);
    console.log(a);//3
    const stooges = [{ name: "june", age: 12 }, { name: "yifon", age: 13 }];
    const b = _.sortedIndex(stooges, { name: "apple", age: 14 }, "age");
    console.log(b);//2
} {
    /**
     * findIndex_.findIndex(array, predicate, [context]) 
     * 类似于_.indexOf，当predicate通过真检查时，返回第一个索引值；否则返回-1。
     */
}
{
    /**
     * findLastIndex_.findLastIndex(array, predicate, [context])
     * 和_.findIndex类似，但反向迭代数组，当predicate通过真检查时，最接近末端的索引值将被返回。
     */
    const users = [{ 'id': 1, 'name': 'Bob', 'last': 'Brown' },
    { 'id': 2, 'name': 'Ted', 'last': 'White' },
    { 'id': 3, 'name': 'Frank', 'last': 'James' },
    { 'id': 4, 'name': 'Ted', 'last': 'Jones' }];
    const a = _.findLastIndex(users, { name: 'Frank' });
    console.log(a);//2
}
{
    /**
     * range:_.range([start],stop,[step])
     * 返回一个从start到stop的整数的列表，用step来增加(或减少)独占
     * 一个用来创建整数灵活编号到列表的函数，便于each和map循环。
     * 如果省略start则默认为0；
     * step默认为1
     * 值得注意的是，如果stop值在start前面（也就是stop值小于start值），那么值域会被认为是零长度，而不是负增长。-如果你要一个负数的值域 ，请使用负数step.
     */
    const a = _.range(10);
    console.log(a);//[0,1,2,3,4,5,6,7,8,9]
    const b = _.range(1, 11);
    console.log(b);//[1,2,3,4,5,6,7,8,9,10]
    const c = _.range(0, 30, 5);
    console.log(c);//[0,5,10,15,20,25]
    const d = _.range(0, -10, -1);
    console.log(d);//[0,-1,-2,-3,-4,-5,-6,-7,-8,-9]
    const e = _.range(0);
    console.log(e);//[]
}

//与函数有关的函数
{
    /**
     * 
     */
}