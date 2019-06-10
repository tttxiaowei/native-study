/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Map.js
 * @Description:  Map
 * @author: xiaowei
 * @date:   2019/6/10
 */

{   // 构造函数
    /**
     * new Map([iterable])
     * Iterable 可以是一个数组或者其他 iterable 对象，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。 每个键值对都会添加到新的 Map。null 会被当做 undefined。
     * 键的比较是基于 "SameValueZero" 算法：NaN 是与 NaN 相等的（虽然 NaN !== NaN），剩下所有其它的值是根据 === 运算符的结果判断是否相等。
     * Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：
     *  1. 一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。
     *  2. Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
     *  3. 你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。
     *  4. Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代
     *  5. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。
     *  6. Map 在涉及频繁增删键值对的场景下会有些性能优势。
     */
    let keyObj1 = {a: 1};
    let keyArr1 = [3, 4];
    let keyArr2 = [511, 611];
    let m1 = new Map([
        [keyObj1, 32],
        [keyArr1, [5, 6]],
        [keyArr2, [555, 666]],
        [keyArr2, [777, 888]],      // map会维持键的唯一，后面的值覆盖前面的值，所以这一行只是把keyArr2的值更新
    ]);
    let m2 = new Map(m1);       // 根据map对象创建一个map对象, 键和值都是浅拷贝

    keyObj1.b = 222;            // m1键的值改变会影响m2，键是浅拷贝
    m1.set(keyObj1, 444);       // m1的
    m1.get(keyArr1).push(8888); // m2键的值改变会影响m2，值也是浅拷贝
    m1.set(keyArr2, 333);       // 调用set方法重新设置值，m1的值改变不会影m2
}
{   // Map.prototype.size   size 属性的值是一个整数，表示 Map 对象有多少个键值对。size 是只读属性，用set 方法修改size返回 undefined，即不能改变它的值。
    let m1 = new Map();
    m1.set("a", "alpha");
    m1.set("b", "beta");
    m1.set("b", "gamma");

    m1.size // 3
}
{   // Map.prototype[@@toStringTag]     只读
    let m1 = new Map();
    m1[Symbol.toStringTag];     // Map
    Object.prototype.toString.call(m1);  // [object Map]
    Object.defineProperty(m1.__proto__, Symbol.toStringTag, {   // 修改toStringTag会导致Object.prototype.toString.call的结果出问题
        value: 'asdasd'
    });
    Object.prototype.toString.call(m1);  // [object asdasd]
}
{   // get Map[Symbol.species]  访问器属性会返回一个 Map 构造函数.
    class MyMap extends Map {
        // 重写覆盖 MyMap species to the parent Map constructor
        static get [Symbol.species]() {
            return Map;
        }
    }
}
{   // Map.prototype.clear  会移除Map对象中的所有元素，返回undefined
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result = m1.clear();        // undefined
}
{   // Map.prototype.delete  用于移除 Map 对象中指定的元素，返回Boolean
    /**
     *  myMap.delete(key);
     *  key 必须。从 Map 对象中移除的元素的键。
     *  返回值Boolean，如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。
     */
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result1 = m1.delete();           // false， key不传时不会报错，不过没有删除的效果，返回false
    let result2 = m1.delete(6);          // true
}
{   // Map.prototype.get   返回某个 Map 对象中的一个指定元素,，如果找不到这个键则返回 undefined。
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result1 = m1.get(777);  // undefined
    let result2 = m1.get(2);    // 4
}
{   // Map.prototype.has   返回一个bool值，用来表明map 中是否存在指定元素.
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result1 = m1.has(777);  // false
    let result2 = m1.has(2);    // true
}
{   // Map.prototype.set   为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对,返回该Map对象
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result1 = m1.set(777, 12);
    let result2 = m1.set(23, 888);
    result1 === result2;            // true

    m1.set(6, 34)       // set返回map自身，所以可以链式调用
        .set(5, 66)
        .set(8, 23);
}
{   // Map.prototype.entries  返回一个新的包含 [key, value] 对的 Iterator 对象，返回的迭代器的迭代顺序与 Map 对象的插入顺序相同。
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result = m1.entries();
    for (let item of result) {
        // console.log(item);      // 遍历器每次返回一个键值对数组
    }
    let result2 = m1.entries();
    for (let [k, v] of result2) {   // 运用结构赋值遍历
        // console.log(k, v)
    }
}
{   // Map.prototype.forEach   将会以插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数。
    /**
     *  myMap.forEach(callback[, thisArg])
     *  返回undefined.
     *  它不会对任何已经被删除的元素执行调用。然而，它还会对键存在而值为 undefined 的元素执行调用。
     *  forEach 函数处理的元素的范围为第一次执行 callback 函数时 Map 对象中的键值对集合。在 Map 对象调用 forEach 之后加入的元素将不会被调用callback 函数。
     *  如果在调用 forEach 之后 Map 对象中的被改变或者删除了，它们传给 callback 函数的值将会变成 forEach 函数访问它们时的值；callback 不会访问其调用其间被删除的元素。
     */
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    m1.forEach((v, k, map) => {
        // console.log(k, v);
    }, m1);
}

{   // Map.prototype.keys  返回一个新的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result = m1.keys();
    for (let item of result) {
        // console.log(item);
    }
}

{   // Map.prototype.values  返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result = m1.values();
    for (let item of result) {
        // console.log(item);
    }
    let end = 12;
}
{   // myMap[Symbol.iterator]  map 的 iterator 函数默认就是 entries() 函数
    let m1 = new Map([
        [2, 4],
        [6, 3],
    ]);
    let result = m1[Symbol.iterator];
    result === m1.entries;              // true
}
