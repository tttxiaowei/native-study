/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Symbol
 * @Description:     Symbol对象
 * @author: xiaowei
 * @date:   2019/7/25
 */
{
    /**
     * Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。
     * 它的静态属性会暴露几个内建的成员对象；
     * 它的静态方法会暴露全局的symbol注册，且类似于内建对象类，
     * 但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。
     * 每个从Symbol()返回的symbol值都是唯一的。
     * 一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的
     * symbol 是一种基本数据类型
     *
     * 当使用 symbol 值进行类型转换时需要注意一些事情：
     * 尝试将一个 symbol 值转换为一个 number 值时，会抛出一个 TypeError 错误  (e.g. +sym or sym | 0).
     * 使用宽松相等时， Object(sym) == sym returns true.
     * 这会阻止你从一个 symbol 值隐式地创建一个新的 string 类型的属性名。例如，Symbol("foo") + "bar" 将抛出一个 TypeError (can't convert symbol to string).
     * "safer" String(sym) conversion 的作用会像symbol类型调用 Symbol.prototype.toString() 一样，但是注意 new String(sym) 将抛出异常。
     */
    let s1 = Symbol('as')
    let s2 = Symbol('as')
    let s3 = Symbol.for('as')
    let s4 = Symbol.for('as')
    let s5 = Symbol.keyFor(s3)          // 'as'
    s1 === s2       // false
    s3 === s4       // true
}

{   // Symbol.asyncIterator 符号指定了一个对象的默认AsyncIterator。如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环。
    // Symbol.asyncIterator 是一个用于访问对象的@@asyncIterator方法的内建符号。一个异步可迭代对象必须要有Symbol.asyncIterator属性。
    // 目前没有默认设定了[Symbol.asyncIterator]属性的JavaScript内建的对象。不过，WHATWG（网页超文本应用技术工作小组）Streams会被设定为第一批异步可迭代对象，[Symbol.asyncIterator] 最近已在设计规范中落地。
    // 你可以通过设置[Symbol.asyncIterator]属性来自定义异步可迭代对象。
    const myAsyncIterable = new Object();
    myAsyncIterable[Symbol.asyncIterator] = async function* () {
        yield "hello";
        yield "async";
        yield "iteration!";
    };

    (async () => {
        for await (const x of myAsyncIterable) {
            // console.log(x);
            // expected output:
            //    "hello"
            //    "async"
            //    "iteration!"
        }
    })();
    let end = 12
}

{   // Symbol.hasInstance 用于判断某对象是否为某构造器的实例。 因此你可以用它自定义 instanceof 操作符在某个类上的行为。
    class MyArray {
        static [Symbol.hasInstance](instance) {
            return Array.isArray(instance);
        }
    }

    // console.log([] instanceof MyArray); // true
}

{   // Symbol.isConcatSpreadable 内置的Symbol.isConcatSpreadable符号用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素,
    /**
     * 它可以控制数组或类似数组（array-like）的对象的行为：
     * 对于数组对象，默认情况下，用于concat时，会按数组元素展开然后进行连接（数组元素作为新数组的元素）。重置Symbol.isConcatSpreadable可以改变默认行为。
     * 对于类似数组的对象，用于concat时，该对象整体作为新数组的元素，重置Symbol.isConcatSpreadable可改变默认行为。
     */
    let a1 = [2, 3]
    let a2 = ['a', 'b']
    a1.concat(a2)       // [2, 3, 'a', 'b']
    a2[Symbol.isConcatSpreadable] = false
    a1.concat(a2)       // [2, 3, ['a', 'b']]
    a2.concat(a1)       // [['a', 'b'], 2, 3]
    a1[Symbol.isConcatSpreadable] = false
    a1.concat(a2)       // [[2, 3], ['a', 'b']]
    a2.concat(a1)       // [['a', 'b'], [2, 3]]
}

{   // Symbol.iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用
    /**
     * 当需要对一个对象进行迭代时（比如开始用于一个for..of循环中），它的@@iterator方法都会在不传参情况下被调用，返回的迭代器用于获取要迭代的值。
     * 一些内置类型拥有默认的迭代器行为，其他类型（如 Object）则没有。下表中的内置类型拥有默认的@@iterator方法：
     * Array.prototype[@@iterator]()
     * TypedArray.prototype[@@iterator]()
     * String.prototype[@@iterator]()
     * Map.prototype[@@iterator]()
     * Set.prototype[@@iterator]()
     *
     * 如果一个迭代器 @@iterator 没有返回一个迭代器对象，那么它就是一个不符合标准的迭代器，这样的迭代器将会在运行期抛出异常，甚至非常诡异的 Bug。
     */
    let myIterable = {}
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    [...myIterable] // [1, 2, 3]
}

{   // Symbol.match 指定了匹配的是正则表达式而不是字符串。String.prototype.match() 方法会调用此函数。
    /**
     * 此函数还用于标识对象是否具有正则表达式的行为。
     * 比如， String.prototype.startsWith()，String.prototype.endsWith() 和 String.prototype.includes() 这些方法会检查其第一个参数是否是正则表达式，是正则表达式就抛出一个TypeError。
     * 现在，如果 match symbol 设置为 false（或者一个 假值），就表示该对象不打算用作正则表达式对象。
     */
    let s1 = 'asdd'
    let s2 = '/a/sdd'
    let r1 = /a/
    // s1.startsWith(r1)        //  Uncaught TypeError: First argument to String.prototype.startsWith must not be a regular expression
    r1[Symbol.match] = false
    s1.startsWith(r1)           //  false
    s2.startsWith(r1)           //  true
}

{   // Symbol.matchAll   返回一个迭代器，该迭代器根据字符串生成正则表达式的匹配项。此函数可以被 String.prototype.matchAll() 方法调用
    /**
     * 此Symbol用于 String.prototype.matchAll() 特别是 RegExp.prototype[@@matchAll]()
     */
    let s1 = 'abdtttacd'
    let re1 = /a\wd/g
    let r1 = s1.matchAll(re1)
    for (let v of r1) {
        // console.log(v)      // ['abd']  ['acd']
    }

    re1[Symbol.matchAll] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    let r2 = s1.matchAll(re1)
    for (let v of r2) {
        // console.log(v)      // 1  2  3
    }
}

{   // Symbol.replace    这个属性指定了当一个字符串替换所匹配字符串时所调用的方法。String.prototype.replace() 方法会调用此方法。
    /**
     * 更多信息， 详见 RegExp.prototype[@@replace]() 和 String.prototype.replace()。
     */
    let end = 1
}

{   // Symbol.search    指定了一个搜索方法，这个方法接受用户输入的正则表达式，返回该正则表达式在字符串中匹配到的下标，这个方法由以下的方法来调用 String.prototype.search()。
    /**
     * 更多信息请参见 RegExp.prototype[@@search]() 和String.prototype.search().
     */
    let end = 1
}

{   // Symbol.species   是个函数值属性，其被构造函数用以创建派生对象
    let end = 1
}

{   // Symbol.split    指向 一个正则表达式的索引处分割字符串的方法。 这个方法通过 String.prototype.split() 调用。
    /**
     * 详情请参阅RegExp.prototype[@@split]() 和String.prototype.split().
     */
    let end = 1
}

{   // Symbol.toPrimitive   是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
    /**
     * 在 Symbol.toPrimitive 属性(用作函数值)的帮助下，一个对象可被转换为原始值。
     * 该函数被调用时，会被传递一个字符串参数 hint ，表示要转换到的原始值的预期类型。
     * hint 参数的取值是 "number"、"string" 和 "default" 中的任意一个。
     */
    let end = 1
}

{   // Symbol.toStringTag    是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签
    /**
     * 通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。
     */
    // 许多内置的 JavaScript 对象类型即便没有 toStringTag 属性，也能被 toString() 方法识别并返回特定的类型标签，比如：
    Object.prototype.toString.call('foo');     // "[object String]"
    Object.prototype.toString.call([1, 2]);    // "[object Array]"
    Object.prototype.toString.call(3);         // "[object Number]"
    Object.prototype.toString.call(true);      // "[object Boolean]"
    Object.prototype.toString.call(undefined); // "[object Undefined]"
    Object.prototype.toString.call(null);      // "[object Null]"

    // 另外一些对象类型则不然，toString() 方法能识别它们是因为引擎为它们设置好了 toStringTag 标签：
    Object.prototype.toString.call(new Map());       // "[object Map]"
    Object.prototype.toString.call(function* () {
    }); // "[object GeneratorFunction]"
    Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"

    // 但你自己创建的类不会有这份特殊待遇，toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签：
    // class ValidatorClass {
    // }
    //
    // Object.prototype.toString.call(new ValidatorClass()); // "[object Object]"

    // 加上 toStringTag 属性，你的类也会有自定义的类型标签了：
    class ValidatorClass {
        get [Symbol.toStringTag]() {
            return "Validator";
        }
    }

    Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
}

{   // Symbol.unscopables  指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。
    /**
     * 可以在任何对象上定义 @@unscopables symbol (Symbol.unscopables)，用于排除属性名称并与 with 环境绑定在一起作为词法变量公开。
     * 请注意，如果使用 Strict mode，语句将不可用，并且可能也不需要 symbol。
     */
    let obj = {
        foo: 1,
        bar: 2
    };

    obj[Symbol.unscopables] = {
        foo: false,
        bar: true
    };

    with (obj) {
        // console.log(foo); // 1
        // console.log(bar); // ReferenceError: bar is not defined
    }
}

{   // Symbol.for(key) 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
    /**
     * Symbol.for(key);
     * key: 一个字符串，作为 symbol 注册表中与某 symbol 关联的键（同时也会作为该 symbol 的描述）。
     * 和 Symbol() 不同的是，用 Symbol.for() 方法创建的的 symbol 会被放入一个全局 symbol 注册表中。
     * Symbol.for() 并不是每次都会创建一个新的 symbol，它会首先检查给定的 key 是否已经在注册表中了。假如是，则会直接返回上次存储的那个。否则，它会再新建一个。
     *
     * symbol 注册表中的记录结构：
     * 字段名    字段值
     * [[key]]    一个字符串，用来标识每个 symbol
     * [[symbol]]    存储的 symbol 值
     */
    let end = 1
}

{   // Symbol.keyFor(sym) 用来获取 symbol 注册表中与某个 symbol 关联的键。
    /**
     * Symbol.keyFor(sym);
     * sym: 必选参数，存储在 symbol 注册表中的某个 symbol
     * 如果全局注册表中查找到该symbol，则返回该symbol的key值，形式为string。如果symbol未在注册表中，返回undefined
     */
    let sy1 = Symbol('as')
    let sy2 = Symbol.for('ddd')
    let s1 = Symbol.keyFor(sy1)     // undefined
    let s2 = Symbol.keyFor(sy2)     // 'ddd'
}

{   // Symbol.prototype.toString()    方法返回当前 symbol 对象的字符串表示。
    /**
     * symbol.toString();
     */
    let sy1 = Symbol('as')
    sy1.toString()              // 'Symbol(as)'
    Object(sy1).toString()      // 'Symbol(as)'
    String(sy1)                 // 'Symbol(as)'
    Symbol.iterator.toString();  // "Symbol(Symbol.iterator)
}

{   // Symbol.prototype[@@toPrimitive]    返回当前 symbol 对象所包含的 symbol 原始值。
    /**
     * symbol[Symbol.toPrimitive](hint);
     *  Symbol 的 [@@toPrimitive]() 方法返回该 Symbol 对象原始值作为 Symbol 数据形式。 hint 参数未被使用。
     *  JavaScript 调用 [@@toPrimitive]() 方法将一个对象转换为原始值表示。你不需要自己调用 [@@toPrimitive]() 方法；当对象需要被转换为原始值时，JavaScript 会自动地调用该方法。
     */
    let end = 1
}
