/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Set
 * @Description:     Set对象
 * @author: xiaowei
 * @date:   2019/7/16
 */
{   // Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
    /**
     *  new Set([iterable]);
     *  Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
     *  0,+0,-0都会保留为0，NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（尽管 NaN !== NaN）
     *
     */
    let s1 = new Set([0, +0, -0, null, undefined, NaN, 0, +0, -0, null, undefined, NaN])        // Set(4){0, null, undefined, NaN]}
    let s2 = new Set()  // Set(0) {}
}

{   // Set.prototype.size size属性将会返回Set对象中元素的个数。
    // mySet.size;
    let s1 = new Set([78, 78, 52, 1, 12, 1])    // Set(4) {78, 52, 1, 12}
    s1.size     // 4
    s1.size = 12     // 4 size不能改变
}

{   // get Set[@@species]  访问器属性返回Set的构造函数.
    // Set[Symbol.species]
    class MySet extends Set {       //  MySet 的species 属性 是 MySet 构造函数. 又或者, 你想要重写它, 让它能在你派生的类方法中能返回父级Set 对象:
        static get [Symbol.species]() {
            return Set;
        }
    }
}

{   // Set.prototype.add 用来向一个 Set 对象的末尾添加一个指定的值,返回Set 对象本身
    // mySet.add(value);
    let s1 = new Set()
    s1.add(5).add("some text")  // 链式调用
}

{   // Set.prototype.clear 用来清空一个 Set 对象中的所有元素。返回undefined
    // mySet.clear();
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    let r1 = s1.clear()  // r1:undefined    s1:Set(0) {}
}

{   // Set.prototype.delete 用来从一个 Set 对象中删除指定的元素。成功删除返回 true，否则返回 false。
    // mySet.delete(value);
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    let r1 = s1.delete(78)  // r1:true      s1: Set(1) {56}
    let r2 = s1.delete(78)  // r2:false     s1:Set(1) {56}
}

{   // Set.prototype.has 返回一个布尔值来指示对应的值value是否存在Set对象中
    // mySet.has(value);
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    let r1 = s1.has(78)  // r1:true
    let r2 = s1.has(1278) // r2 =:false
}

{   // Set.prototype.forEach 会根据集合中元素的插入顺序，依次执行提供的回调函数。返回undefined
    /** mySet.forEach(callback[, thisArg])
     * callback为集合中每个元素执行的回调函数，该函数接收三个参数：
     *      currentValue, currentKey: currentValue 是正在被操作的元素。并且由于集合没有索引，所以 currentKey 也表示这个正在被操作的元素。
     *      set: 调用当前 forEach 方法的集合对象
     *
     */
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    s1.forEach((v, k, set) => {
        v === k       // true
        set.has(56) // true
    })
}
{   // Set.prototype.values 返回一个 Iterator  对象，该对象按照原Set 对象元素的插入顺序返回其所有元素。
    // mySet.values()        keys() 方法是这个方法的别名 (与 Map 对象相似); 它的行为与 value 方法完全一致，返回 Set 对象的元素。
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    let i1 = s1.values()    // SetIterator
    for (let v of i1) {
        // console.log(v)   // 56  78
    }
}

{   // Set.prototype.entries 返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，
    // mySet.entries()
    // 由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    let i1 = s1.entries()    // SetIterator
    for (let v of i1) {
        // console.log(v)   // [56, 56]    [78, 78]
    }
}

{   // Set.prototype[@@iterator]()      Set.prototype[@@iterator]就是Set.prototype.values这个方法
    // mySet[Symbol.iterator]
    // 由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。
    let s1 = new Set([56, 78])  // Set(2) {56, 78}
    s1.values === s1[Symbol.iterator]   // true
    let i1 = s1[Symbol.iterator]()      // SetIterator
    for (let v of i1) {
        // console.log(v)   // 56  78
    }
}


