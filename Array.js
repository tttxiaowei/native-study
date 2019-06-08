/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Array.js
 * @Description:     Array对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{ // 构造
    let arr1 = [1, 2, 3];
    let arr2 = new Array(1, 2, 3);
    let arr3 = new Array(4);  // 生成一个length为4的数组，元素值都为undefined

    arr1[2] == arr1['02'];      // false ，因为索引会被js解释器通过调用toString隐式的转换为字符串，但a1没有02这个属性，所以a1['02']的值为undefined
    arr1['02'] = 222;         // 数组长度length不变！！！实际效果是为a1添加了一个02的属性
    arr1['33'] = 44;          // 数组长度改变！！！与上面相比，同样是字符串，这个却添加成功了，why？？？
}

{   // 属性
    // length属性
    // let a = new Array(4294967296);   // 报错。length 属性的值是一个 0 到 2^32-1(4294967295)
    // let b = new Array(-100);         // 报错。length不合法就会报错

    // prototype属性
    Array.isArray(Array.prototype);     // true, Array.prototype 本身也是一个 Array

    // Symbol.unscopables属性
    Object.keys(Array.prototype[Symbol.unscopables]);   // ["copyWithin", "entries", "fill", "find", "findIndex","includes", "keys", "values"]
    with (Array.prototype) {
        // keys;        // 报错: keys is not defined, 当给一个对象的Symbol.unscopables的某属性赋值为true后，就会在这个对象的with环境绑定中排除这个属性
    }

    // Symbol.iterator属性
    let arr = ['w', 'y', 'k', 'o', 'p'];
    let eArr = arr[Symbol.iterator]();      // 数组的 iterator 方法，默认情况下与 values() 返回值相同
    for (let letter of eArr) {
        console.log(letter);
    }

    // Array[Symbol.species]    访问器属性返回 Array 的构造函数。
    // 在继承类的对象中,MyArray 的 species 属性返回的是 MyArray 这个构造函数. 然而你可能想要覆盖它，以便在你继承的对象 MyArray 中返回父类的构造函数 Array :
    class MyArray extends Array {
        // 重写 MyArray 的 species 属性到父类 Array 的构造函数
        static get [Symbol.species]() {
            return Array;
        }
    }
}

{   // Array.from
    /* Array.from(arrayLike[, mapFn[, thisArg]])        要使用thisArg则函数不能用箭头函数
            arrayLike:想要转换成数组的伪数组对象或可迭代对象。 (String, Set, Map, Array-like Object)
            mapFn (可选参数):如果指定了该参数，新数组中的每个元素会执行该回调函数。
            thisArg (可选参数):可选参数，执行回调函数 mapFn 时 this 对象。
    */
    let obj = {
        a: 5
    };
    let fn = function (v) {
        return v + this.a;
    };
    let arr1 = Array.from('abcd', fn, obj);
    let arr2 = Array.from(new Set([1, 2, 3]), fn, obj);
    let arr3 = Array.from(new Map([[2, 3], [5, 6]]), fn, obj);
    let arr4 = Array.from({1: 6, 4: 9, length: 5}, fn, obj);

    // polyfill
    function arrayFrom(arrayLike, mapFn, scope) {
        if (!arrayLike || (typeof arrayLike.length) !== 'number' || arrayLike.length <= 0 || arrayLike.length % 1 !== 0) {   // length必须是大于0的整数
            return arrayLike;
        }
        var len = arrayLike.length;
        var result = [];
        var cb = mapFn && Object.prototype.toString.call(mapFn) === '[object Function]' ? function () {
            return mapFn.apply(scope || this, arguments);
        } : null;
        for (var i = 0; i < len; i++) {
            result[i] = cb ? cb(arrayLike[i]) : arrayLike[i];
        }
        return result;
    }

    let arr5 = arrayFrom('abcd', fn, obj);
    let arr6 = arrayFrom(new Set([1, 2, 3]), fn, obj);
    let arr7 = arrayFrom(new Map([[2, 3], [5, 6]]), fn, obj);
    let arr8 = arrayFrom({1: 6, 4: 9, length: 5}, fn, obj);
}
{   // Array.isArray
    // Array.isArray(obj)
    // 当检测Array实例时, Array.isArray 优于 instanceof, 因为Array.isArray能检测iframes.
    try {
        let iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        xArray = window.frames[window.frames.length - 1].Array;   // 获取iframe窗口window对象下的Array
        let arr = new xArray(1, 2, 3); // [1,2,3]
        Array.isArray(arr);  // true
        arr instanceof Array; // false      因为此Array不是当前window.Array的对象，而是iframe的window.Array
    } catch (e) {
    }

    // polyfill
    function isArray(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}
{   // Array.of
    // Array.of(element0[, element1[, ...[, elementN]]])
    // Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组

    // polyfill
    function arrayOf() {
        return Array.prototype.slice.call(arguments);
    }
}
{   // Array.concat 将数组展开一层深度结合
    // var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])  将数组和/或值连接成新数组。
    let alpha = ['a', 'b', 'c'];
    let alphaNumeric = alpha.concat(1, [2, 3]);     // ['a', 'b', 'c', 1, 2, 3]
}
{   // Array.prototype.copyWithin  根据start、end从原数组中copy一个片段，然后以target为起始点粘贴这个片段
    /* arr.copyWithin(target[, start[, end]])  将数组和/或值连接成新数组。
     target: 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，
              将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
     start: 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
                如果 start 被忽略，copyWithin 将会从0开始复制。
      end:  0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。
            如果是负数， end 将从末尾开始计算。 如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。

      copyWithin 函数被设计为通用式的，其不要求其 this 值必须是一个数组对象。
      copyWithin 是一个可变方法，它不会改变 this 的长度 length，但是会改变 this 本身的内容，且需要时会创建新的属性。*/
    let numbers = [1, 2, 3, 4, 5];
    numbers.copyWithin(-2);         // [1, 2, 3, 1, 2]
    numbers.copyWithin(1, 3);       // [1, 1, 2, 1, 2]
    numbers.copyWithin(2, 3, 4);    // [1, 1, 1, 1, 2]
    numbers.copyWithin(-2, -3);     // [1, 1, 1, 1, 1]
    [].copyWithin.call({length: 5, 3: 1}, 0, 2);    // {1: 1, 3: 1, length: 5}
    [1, 2, 3, 4, 5].copyWithin(8, 1, 3);    // [1, 2, 3, 4, 5]  target > length 不改变数组
    [1, 2, 3, 4, 5].copyWithin(-8, 1, 3);   // [2, 3, 3, 4, 5]  target < -length 使target=0
    [1, 2, 3, 4, 5].copyWithin(1, 8, 3);    // [1, 2, 3, 4, 5]  start > length 不改变数组        start、end越界主要考虑二者有没有交集
    [1, 2, 3, 4, 5].copyWithin(1, -8, 3);   // [1, 1, 2, 3, 5]  start < -length 使start=0
    [1, 2, 3, 4, 5].copyWithin(1, 2, 8);    // [1, 3, 4, 5, 5]  end > length end=length
    [1, 2, 3, 4, 5].copyWithin(1, 2, -8);   // [1, 2, 3, 4, 5]  end < -length 不改变数组

    // polyfill
    function copyWithin(target, start, end) {
        var self = this;
        if (!self || (typeof self.length) !== 'number' || self.length <= 0 || self.length % 1 !== 0) {   // this.length必须是大于0的整数
            throw new TypeError();
        }
        var len = self.length;
        target = +target || 0;
        start = +start || 0;
        end = +end || len;
        if (target >= len || start >= len) {      // 这两种情况不会改变数组
            return self;
        }
        target = target >= 0 ? target : (target < -len ? 0 : len + target);
        start = start >= 0 ? start : (start < -len ? 0 : len + start);
        end = end >= 0 ? (end > len ? len : end)
            : (end < -len ? 0 : len + end);
        if (start >= end || target === start) {       // 这两种情况不会改变数组
            return self;
        }
        var step = end - start;
        var temp = [];
        for (var i = 0; i < step; i++) {
            if (target + i < len) {
                temp.push(self[start + i]);     // 先把copy的片段缓存起来，直接赋值的话可能出问题（考虑target在start和end之间的情况）
            } else {
                break;
            }
        }
        for (i = 0; i < temp.len; i++) {
            self[target + i] = temp[i];
        }
        return self;
    }

    numbers = [1, 2, 3, 4, 5];
    copyWithin.call(numbers, -2);               // [1, 2, 3, 1, 2]
    copyWithin.call(numbers, 1, 3);             // [1, 1, 2, 1, 2]
    copyWithin.call(numbers, 2, 3, 4);          // [1, 1, 1, 1, 2]
    copyWithin.call(numbers, -2, -3);           // [1, 1, 1, 1, 1]
    copyWithin.call({length: 5, 3: 1}, 0, 2);   // {0: undefined, 1: 1, 2: undefined, 3: 1, length: 5}
    copyWithin.call([1, 2, 3, 4, 5], 8, 1, 3);    // [1, 2, 3, 4, 5]
    copyWithin.call([1, 2, 3, 4, 5], -8, 1, 3);   // [2, 3, 3, 4, 5]
    copyWithin.call([1, 2, 3, 4, 5], 1, 8, 3);    // [1, 2, 3, 4, 5]
    copyWithin.call([1, 2, 3, 4, 5], 1, -8, 3);   // [1, 1, 2, 3, 5]
    copyWithin.call([1, 2, 3, 4, 5], 1, 2, 8);    // [1, 3, 4, 5, 5]
    copyWithin.call([1, 2, 3, 4, 5], 1, 2, -8);   // [1, 2, 3, 4, 5]

}
{   // Array.prototype.entries  获取数组迭代器
    // arr.entries() 返回一个数组迭代器对象
    let arr = ["a", "b", "c"];

    let iterator = arr.entries();
    for (let key of iterator) {     // for of 遍历
        // console.log(key)
    }

    let iterator2 = arr.entries();
    let result = iterator2.next();
    while (!result.done) {          // while遍历
        // console.log(result.value);
        result = iterator2.next();
    }

    let iterator3 = arr.entries();
    [...iterator3];                 // ...展开

    // polyfill
    function entries() {
        var self = this;
        if (Object.prototype.toString.call(self) !== '[object Array]') {
            throw new TypeError();
        }
        var index = 0;
        var len = self.length;
        return {
            next: function () {
                var done = index >= len;
                var result = {
                    value: done ? void 0 : [index, self[index]],
                    done: done
                };
                index++;
                return result;
            }
        }
    }

    let iterator4 = entries.call(arr);
    result = iterator4.next();
    while (!result.done) {
        // console.log(result.value);
        result = iterator4.next();
    }
}
{   // Array.prototype.every    是否所有元素都符合条件（callback都返回true），返回false则循环结束。
    /* arr.every(callback[, thisArg])
    回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
    every 遍历的元素范围在第一次调用 callback 之前就已确定了。
    在调用 every 之后添加到数组中的元素不会被 callback 访问到。
    如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。
    那些被删除的元素或从来未被赋值的元素将不会被访问到。
     */
    let result = [].every(() => {       // result=true, 因为空数组没有元素,所以都符合条件
    });
    let number = [1, 2, 3, 4, 5];
    number.every((v, k) => {
        delete number[2];           // 那些被删除的元素或从来未被赋值的元素将不会被访问到
        number[1] = void 0;         // 值为undefined会被访问到
        number[k + 3] += 10;        // 如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值
        number.push(k);             // every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到
        // console.log(k, v);
        return true;
    });

    // polyfill
    function every(cb) {
        var self = this;
        if (Object.prototype.toString.call(self) !== '[object Array]' || typeof cb !== 'function') {
            throw new TypeError();
        }
        var len = self.length;
        var result = true;
        for (var i = 0; i < len; i++) {
            result = i in self ? cb(self[i], i, self) : true;       // 使用 in 判断 数组是否有这个索引
            if (!result) {
                break;
            }
        }
        return !!result;
    }

    number = [1, 2, 3, 4, 5];
    every.call(number, (v, k) => {
        delete number[2];
        number[1] = void 0;
        number[k + 3] += 10;
        number.push(k);
        // console.log(k, v);
        return true;
    });
}
{   // Array.prototype.fill  用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引
    /* arr.fill(value[, start[, end]])
    start:可选,起始索引，默认值为0。如果 start 是个负数, 则开始索引会被自动计算成为 length+start
    end: 可选,终止索引，默认值为 this.length。如果 end 是个负数, 则结束索引会被自动计算成为 length+end。
    fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。
    fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。*/

    let arr1 = new Array(4);
    arr1.fill(1, 0, 9);             // [1, 1, 1, 1]
    arr1.fill(2, 10, 20);           // [1, 1, 1, 1]
    arr1.fill(3, -10, -2);          // [3, 3, 1, 1]  start~end不在数组索引范围内的不变
    [].fill.call({length: 3}, 4);   // {0: 4, 1: 4, 2: 4, length: 3}
    let arr2 = Array(3).fill({});   // [{}, {}, {}];
    arr2[0].hi = "hi";              // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]

    function fill(value, start, end) {
        var self = this;
        if (!self || (typeof self.length) !== 'number' || self.length <= 0 || self.length % 1 !== 0) {
            throw new TypeError();
        }
        var len = self.length;
        start = +start || 0;
        end = +end || len;
        start = start >= 0 ? start : (start < -len ? 0 : len + end);
        end = end >= 0 ? (end > len ? len : end) : len + end;
        if (end < start || start >= len) {
            return self;
        }
        for (; start < end; start++) {
            self[start] = value;
        }
        return self;
    }

    arr1 = new Array(4);
    fill.call(arr1, 1, 0, 9);             // [1, 1, 1, 1]
    fill.call(arr1, 2, 10, 20);           // [1, 1, 1, 1]
    fill.call(arr1, 3, -10, -2);          // [3, 3, 1, 1]  start~end不在数组索引范围内的不变
    fill.call({length: 3}, 4);   // {0: 4, 1: 4, 2: 4, length: 3}
    arr2 = fill.call(Array(3), {});   // [{}, {}, {}];
    arr2[0].hi = "hi";              // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]

}

{   // Array.prototype.filter   返回通过函数测试的所有元素
    /* var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
    回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
    filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组
    callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。
    那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
    filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。
    在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。
    如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。
    被删除或从来未被赋值的元素不会被遍历到。
     */
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = arr1.filter((v, k) => {
        return v > 3;
    });

}
{   // Array.prototype.find     遍历查找元素
    /* arr.find(callback[, thisArg])
        回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
        当有一个 callback 返回 true时，该方法会立即返回这个元素的值，否则返回 undefined
        callback 函数会为数组中的每个索引调用即从 0 到 length - 1，不会跳过那些已经被删除或者从未被赋值的索引
        在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。
        如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。
        被删除的元素仍旧会被访问到。
     */
    let arr1 = [
        {id: 1, name: 'a'},
        {id: 2, name: 'b'},
        {id: 3, name: 'c'},
        {id: 4, name: 'd'}];
    let elem = arr1.find(function (v) {   // {id: 3, name: 'c'}
        return v.id === 3;
    });

}

{   // Array.prototype.findIndex    遍历查找索引
    /* arr.findIndex(callback[, thisArg])
        回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
        当有一个 callback 返回 true时，该方法会立即返回这个元素的值，否则返回 -1
        callback 函数会为数组中的每个索引调用即从 0 到 length - 1，不会跳过那些已经被删除或者从未被赋值的索引
        在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。
        如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。
        被删除的元素仍旧会被访问到。
     */
    let arr1 = [
        {id: 1, name: 'a'},
        {id: 2, name: 'b'},
        {id: 3, name: 'c'},
        {id: 4, name: 'd'}];
    let index = arr1.findIndex((v) => {   // 2
        return v.id === 3;
    });

}
{   // Array.prototype.flat  展开数组，深度可指定
    /* var newArray = arr.flat(depth)
        depth: 指定要提取嵌套数组的结构深度，默认值为 1。
     */
    // polyfill
    if (!([].flat)) {
        Array.prototype.flat = function (depth) {
            var self = this;
            var toStr = Object.prototype.toString;
            if (toStr.call(self) !== '[object Array]') {
                throw  new TypeError();
            }

            function expand(arr, d) {
                var result = [], len = arr.length;
                for (var i = 0; i < len; i++) {
                    if (!(i in arr)) {
                        continue;
                    }
                    if (toStr.call(arr[i]) === '[object Array]' && d <= depth) {
                        result = result.concat(expand(arr[i], ++d));
                    } else {
                        result.push(arr[i]);
                    }
                }
                return result;
            }

            return expand(self, 1);
        }
    }
    let arr1 = [1, 2, [3, 4, [5, 6]]];
    arr1.flat(2);                   // [1, 2, 3, 4, 5, 6]
    arr1.flat(Infinity);            // [1, 2, 3, 4, 5, 6], 使用 Infinity 作为深度，展开任意深度的嵌套数组
    let arr2 = [1, 2, , 4, 5];
    arr2.flat();                    // [1, 2, 4, 5]     flat() 方法会移除数组中的空项

}
{   // Array.prototype.flatMap      // 遍历数组，对每个返回值进行concat后返回（即展开一层深度）
    /* var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
     // 返回新数组的元素
     }[, thisArg])*/

    // polyfill
    if (!Array.prototype.flatMap) {
        Array.prototype.flatMap = function (cb) {
            var self = this;
            if (Object.prototype.toString.call(self) !== '[object Array]') {
                throw  new TypeError();
            }
            var len = self.length, result = [];
            for (var i = 0; i < len; i++) {
                result = result.concat(cb(self[i], i, self));
            }
            return result;
        }
    }
    let arr1 = [1, 2, 3, 4];
    arr1.map(x => [x * 2]);         // [[2], [4], [6], [8]]
    arr1.flatMap(x => [x * 2]);     // [2, 4, 6, 8]
    arr1.flatMap(x => [[x * 2]]);   // [[2], [4], [6], [8]]  // 只会将 flatMap 中的函数返回的数组 “压平” 一层

    let arr2 = ["今天天气不错", " ", "早上好"]
    arr2.map(s => s.split(""));     // [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
    arr2.flatMap(s => s.split("")); // ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
}
{   // Array.prototype.forEach      遍历数组
    /* arr.forEach(callback[, thisArg]);
        总是返回undefined，无法提前终止循环，
        forEach 遍历的范围在第一次调用 callback 前就会确定
        如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值
        已删除、未赋值的项不会被遍历到
     */
    let arr1 = [1, 2, , 3, 4];
    arr1.forEach((v, k) => {
        // console.log(k, v)
    });
    let words = ['one', 'two', 'three', 'four'];
    words.forEach(function (word) {     // 整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置
        //console.log(word);      // one two four
        if (word === 'two') {
            words.shift();
        }
    });
}
{   // Array.prototype.includes     返回Boolean， 判断数组中是否包含某元素
    /* arr.includes(valueToFind[, fromIndex])
        valueToFind：需要查找的元素值。
        fromIndex： 可选。从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 。默认为 0。
        includes() 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)
     */
    let obj1 = {a: 1, '3': 6, h: 7, length: 9};
    let arr1 = [obj1, 3, 6, 8, 7, 5, 18, NaN];
    arr1.includes(6);           // true
    arr1.includes(6, -2);       // false
    arr1.includes(6, -20);      // true
    arr1.includes(obj1);        // true
    arr1.includes(NaN);         // true
    [].includes.call(obj1, 6);   // true   可以查找对象
    [].includes.call(obj1, 1);   // false  不能查找对象属性

}
{   // Array.prototype.indexOf     返回index或-1
    /* arr.indexOf(searchElement[, fromIndex = 0])
    fromIndex： 可选。从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 。默认为 0。
     */
    let arr1 = [1, 2, 3, '4', 5];
    arr1.indexOf(2);        // 1
    arr1.indexOf(4);        // -1,  使用===判断

}
{   // Array.prototype.join     将数组连接为字符串
    /* arr.join([separator])
        separator: 分隔符，默认","
     */
    let arr1 = [1, 2, 3, undefined, null, NaN, [9, 8, [4, 5]]];
    arr1.join();        // 1,2,3,,,NaN,9,8,4,5  undefined和null会被转换为空字符串
    [].join.call({a: 1, b: 2, 3: 4, 5: 6, length: 8});  // ,,,4,,6,, 可以处理类数组对象，不过只连接数字属性
}
{   // Array.prototype.keys 返回一个索引的迭代器
    /* arr.keys()
     */
    let arr1 = [1, 2, 3, 4, 5];
    let iterator = arr1.keys(); // Array Iterator
    [...iterator];              // [1, 2, 3, 4, 5, 6]
}
{   // Array.prototype.lastIndexOf  数组中最后一个元素的索引，如未找到返回-1
    /* arr.lastIndexOf(searchElement[, fromIndex ])
        fromIndex： 可选。从fromIndex 索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 。默认为 arr.length - 1。
     */
    let arr1 = [1, 2, 3, '4', 5];
    arr1.lastIndexOf(2);        // 1
    arr1.lastIndexOf(4);        // -1,  使用===判断

}
{   // Array.prototype.map  收集遍历后函数处理的返回值
    /*
    var new_array = arr.map(function callback(currentValue[, index[, array]]) {
                     // Return element for new_array
                    }[, thisArg])
    使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了。
    callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
    若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。
     */
    let arr1 = [1, 2, 3, 4, 5];
    ["1", "2", "3"].map(parseInt);      // [1, NaN, NaN]   即[parseInt(1, 0), parseInt(2, 1),parseInt(3, 2)]
}
{   // Array.prototype.pop  从数组中删除的元素(当数组为空时返回undefined)。
    /* arr.pop()
    pop 方法有意具有通用性。可应用在类似数组的对象上。
    pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined。

     */
    let obj1 = {length: 'a', 1: 5};
    let item1 = [].pop.call(obj1);      // item1的值为undefined, obj1的length属性被置为0

    let obj2 = {length: 2, 1: 5, 2: 8};
    let item2 = [].pop.call(obj2);      // item1的值为5, obj1的length属性被置为1
}
{   // Array.prototype.push     返回新的length属性值
    /* arr.push(element1, ..., elementN)
        push 方法有意具有通用性。可应用在类似数组的对象上。
        push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
     */
    let obj1 = {1: 5};
    [].push.call(obj1);     // obj1.length为0

    let obj2 = {length: 2, 1: 5, 2: 8};
    [].push.call(obj2, 9);     // {1: 5, 2: 9, length: 3};

    let vegetables = ['parsnip', 'potato'];
    let moreVegs = ['celery', 'beetroot'];
    Array.prototype.push.apply(vegetables, moreVegs);  // vegetables=['parsnip', 'potato', 'celery', 'beetroot']  将第二个数组融合进第一个数组

    let obj3 = {
        length: 0,
        addElem: function addElem(elem) {  // 每一次调用会增加length
            [].push.call(this, elem);
        }
    };
    obj3.addElem('a');  // {0: a, length: 1, addElem}
    obj3.addElem('b');  // {0: a, 1: b, length: 2, addElem}
    obj3.addElem('c');  // {0: a, 1: b, 2: c, length: 3, addElem}

}
{   // Array.prototype.reduce   遍历数组得到一个累加值
    /* arr.reduce(callback[, initialValue])
        callback执行数组中每个值的函数，包含四个参数：
            accumulator累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue。
            currentValue数组中正在处理的元素。
            currentIndex可,选数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
            array可选,调用reduce()的数组
        initialValue可选,作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
        如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
     */
    let arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
    let result = arr1.sort().reduce((init, current) => {        // [1,2,3,4,5]  数组去重
        if (init.length === 0 || init[init.length - 1] !== current) {
            init.push(current);
        }
        return init;
    }, []);

    // polyfill
    function reduce(fn, initial) {
        if (Object.prototype.toString.call(this) != '[object Array]') {
            throw new TypeError();
        }
        if (typeof fn !== 'function') {
            throw new TypeError();
        }
        var len = this.length;
        if (len === 0) {
            if (initial === void 0) {
                throw new TypeError();
            } else {
                return initial;
            }
        }
        if (len === 1 && initial === void 0) {
            return this[0];
        }
        var i = 0;
        if (!initial) {
            initial = this[0];
            i = 1;
        }
        for (; i < len; i++) {
            initial = fn(initial, this[i], i, this);
        }
        return initial;
    }

    result = reduce.call(arr1.sort(), (init, current) => {        // [1,2,3,4,5]  数组去重
        if (init.length === 0 || init[init.length - 1] !== current) {
            init.push(current);
        }
        return init;
    }, []);
    let a = reduce.call([0, 1, 2, 3, 4], function (accumulator, currentValue, currentIndex, array) {
        return accumulator + currentValue;
    });
}
{   // Array.prototype.reduceRight   reduce从右到左执行
    /* arr.reduceRight(callback[, initialValue])
     */
}
{   // Array.prototype.reverse   将数组中元素的位置颠倒,并返回该数组。该方法会改变原数组。
    /* arr.reverse()
     */
}
{   // Array.prototype.shift  删除第一个元素，并返回该元素的值，如果数组为空则返回undefined 。
    /* arr.shift()
     */
}
{   // Array.prototype.slice 返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。
    /*
        arr.slice();            // [0, end]
        arr.slice(begin);       // [begin, end]
        arr.slice(begin, end);  // [begin, end)
        begin 可选, 如果是负数，则从length + begin开始，如果省略 begin，则 slice 从索引 0 开始。
        end   可选，如果是负数，则从length + begin开始，如果 end 被省略或end 大于数组长度，则slice 会一直提取到原数组末尾。
     */
    let arr1 = [1, 2, 3, 4, 5];
    arr1.slice();       // [1, 2, 3, 4, 5]
    arr1.slice(2);      // [ 3, 4, 5]
    arr1.slice(1, 3);   // [2, 3]

    let arr2 = [].slice.call({length: 5, 3: 4, 5: 8});      // [,,,4,,] 将类数组转换为数组
}
{   // Array.prototype.some     遍历数组找到符合条件的值（返回true）就停止遍历，函数返回Boolean
    /* arr.some(callback(element[, index[, array]])[, thisArg])
        回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
        some 遍历的元素范围在第一次调用 callback 之前就已确定了。
        在调用 some 之后添加到数组中的元素不会被 callback 访问到。
        如果数组中存在的元素被更改，则他们传入 callback 的值是 some 访问到他们那一刻的值。
        那些被删除的元素或从来未被赋值的元素将不会被访问到。
     */

    let arr1 = [1, 2, 3, 4, 5];
    arr1.some((v) => {        // true
        return v > 3;       // 不会再遍历4,5
    });
}
{   // Array.prototype.sort  对数组排序，返回排序后的数组，且会修改原数组
    /* arr.sort([compareFunction])
        compareFunction 可选,用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
        firstEl第一个用于比较的元素。
        secondEl第二个用于比较的元素。
        如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
        如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
        如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
     */
    let arr1 = [1, 2, 5, 23, 46, 12];
    arr1.sort();        // [1, 12, 2, 23, 46, 5]
}
{   // Array.prototype.splice
    /* array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        start: 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容,如果是负值，则表示从数组末位开始的第几位.如果负数的绝对值大于数组的长度，则表示开始位置为第0位
        deleteCount: 表示要移除的数组元素的个数。如果 deleteCount 大于 start 之后的元素的总数或被省略了，则从 start 后面的元素都将被删除（含第 start 位）。如果 deleteCount 是 0 或者负数，则不移除元素。
        item1, item2, ...：要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素
     */
    let arr1 = [1, 2, 3, 4, 5];
    arr1.splice();      // [1, 2, 3, 4, 5]
    arr1.splice(0);     // []
}
{   // Array.prototype.toLocaleString  表示数组元素的字符串。
    /* arr.toLocaleString([locales[,options]]); 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
            locales 可选,带有BCP 47语言标记的字符串或字符串数组，关于locales参数的形式与解释，请看Intl页面。
            options 可选,一个可配置属性的对象，对于对象Object.prototype.toLocaleString(),对于数字 Number.prototype.toLocaleString()，对于日期Date.prototype.toLocaleString().
     */
    let arr1 = [1, 2, 3, 4, 5];
    let array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
    let localeString = array1.toLocaleString('en', {timeZone: "UTC"});      // 1,a,1997-12-21 22:12:00
}
{   // Array.prototype.toString     数组转字符串函数
    /* arr.toString()       返回一个表示指定的数组及其元素的字符串。
        Array对象覆盖了Object的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。
        当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。
     */
    let arr1 = [1, 2, 3, 4, 5, {a: 3}];
    arr1.toString();        // 1,2,3,4,5,[object Object]
}
{   // Array.prototype.unshift      会在调用它的类数组对象的开始位置插入给定的参数
    /* arr.unshift(element1, ..., elementN)
        unshift 特意被设计成具有通用性，可用于类数组对象
     */
}
{   // Array.prototype.values       返回一个新的 Array Iterator 对象
    /* arr.values()
     */
    let arr1 = [1, 2, 3, 4, 5];
    let iterator1 = arr1.values();
    for (let v of iterator1) {
        // console.log(v)
    }
}