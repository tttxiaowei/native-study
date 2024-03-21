/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Object.js
 * @Description:     Object
 * @author: xiaowei
 * @date:   2019/6/12
 */

{   // 构造函数
    /**
     *  1. 对象初始化器（Object initialiser）或对象字面量（literal）:     { [ nameValuePair1[, nameValuePair2[, ...nameValuePairN] ] ] }
     *  2. 以构造函数形式来调用:                                         new Object([value])
     *  Object 构造函数为给定值创建一个对象包装器。如果给定值是 null 或 undefined，将会创建并返回一个空对象，否则，将返回一个与给定值对应类型的对象。
     *  当以非构造函数形式被调用时，Object 等同于 new Object()。
     */

    let o1 = Object();                  // {}
    let o2 = Object(null);              // {}
    let o3 = Object(undefined);         // {}
    let o4 = Object('');                // String {""}
    let o5 = Object(1);                 // Number {1}
    let o6 = Object(false);             // Boolean {false}
    let o7 = Object(Symbol(12));        // Symbol {Symbol(12)}
    let o8 = Object([]);                // []
}
{   // Object.assign        将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    /** Object.assign(target, ...sources)
     * 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
     * 只会拷贝源对象自身的并且可枚举的属性到目标对象
     * 该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性
     * 如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty()
     * Object.assign 不会在那些source对象值为 null 或 undefined 的时候抛出错误。
     */
    let o1 = Object.assign({}, "abc", null, true, undefined, 10, Symbol("foo"));     // { "0": "a", "1": "b", "2": "c" }    原始类型会被包装，null 和 undefined 会被忽略。注意，只有字符串的包装对象才可能有自身可枚举属性。
}
{   // Object.create
    /**
     *  Object.create(proto, [propertiesObject])
     *  propertiesObject: 可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
     *  如果propertiesObject参数是 null 或非原始包装对象，则抛出一个 TypeError 异常。
     */
    let o1 = Object.create(null);

    let o2 = {};
    // 以字面量方式创建的空对象就相当于:
    let o3 = Object.create(Object.prototype);

    let o4 = Object.create(Object.prototype, {
        // foo会成为所创建对象的数据属性
        foo: {
            writable: true,
            configurable: true,
            value: "hello"
        },
        // bar会成为所创建对象的访问器属性
        bar: {
            configurable: false,
            get: function () {
                return 10
            },
            set: function (value) {
                console.log("Setting `o.bar` to", value);
            }
        }
    });
}

{       // Object.defineProperty    直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    /**
     *   Object.defineProperty(obj, prop, descriptor)
     *   obj:     要在其上定义属性的对象。
     *   prop:     要定义或修改的属性的名称。
     *   descriptor:     将被定义或修改的属性描述符。
     *   属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由getter-setter函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。
     *
     *   数据描述符和存取描述符均具有以下可选键值：
     *   configurable：当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
     *   enumerable：当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
     *
     *   数据描述符同时具有以下可选键值：
     *   value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
     *   writable： 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
     *
     *   存取描述符同时具有以下可选键值：
     *   get：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined，当访问该属性时，该方法会被执行，方法执行时没有参数传入
     *   set: 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
     *
     *  如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。
     */

    let o1 = {};
    Object.defineProperty(o1, 'aaa', {});       // o1.aaa 的value为undefined
    Object.defineProperty(o1, 'bbb', {
        value: 12,
        writable: true
    });
    o1.bbb = 555555;                            //  写入成功
    Object.defineProperty(o1, 'bbb', {          //  可以将configurable为false的属性的writable从true改为false
        value: 12,
        writable: false
    });
    o1.bbb = 66666;                             //  写入失败
    // Object.defineProperty(o1, 'bbb', {       //   TypeError: Cannot redefine property: bbb    不可以将configurable为false的属性的writable从false改为true
    //     value: 12,
    //     writable: true
    // });
    delete o1.bbb;                              // configurable为false的属性，删除失败
    // Object.defineProperty(o1, 'bbb', {       // TypeError: Cannot redefine property: bbb     当试图改变不可配置属性（除了设置value、单向改变 writable 为 false）的值时会抛出TypeError，除非当前值和新值相同。
    //     value: 444,
    //     configurable: true
    // });

    Object.defineProperty(o1, 'ccc', {
        value: 12,
        writable: false,
        configurable: true
    });
    o1.ccc = 2222;          // 试图写入非可写属性不会改变它，也不会引发错误。

}
{       // Object.defineProperties  直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
    let obj = {};
    Object.defineProperties(obj, {
        'property1': {
            value: true,
            writable: true
        },
        'property2': {
            value: 'Hello',
            writable: false
        }
        // etc. etc.
    });
}
{       // Object.entries   返回一个给定对象自身可枚举属性的键值对数组
    const obj = {foo: 'bar', baz: 42};
    let a1 = Object.entries(obj);                  // [ ['foo', 'bar'], ['baz', 42] ]
}

{       // Object.keys(obj)   返回一个由一个给定对象的自身可枚举属性组成的数组
    const obj = {foo: 'bar', baz: 42};
    let a1 = Object.keys(obj);                  // [ 'foo', 'baz']
}

{       // Object.values(obj)   返回一个给定对象自身的所有可枚举属性值的数组
    const obj = {foo: 'bar', baz: 42};
    let a1 = Object.values(obj);                  // [ 'bar', 42]
}

{   // Object.freeze   冻结一个对象，返回传递的对象，而不是创建一个被冻结的副本。
    /**
     * 一个被冻结的对象再也不能被修改；
     * 冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。
     * 此外，冻结一个对象后该对象的原型也不能被修改。
     * freeze() 返回和传入的参数相同的对象。
     * 如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。
     * 数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。
     */
    let o1 = {};
    Object.defineProperties(o1, {
        aaa: {
            value: 1,
            enumerable: true,
            configurable: true,
            writable: true,
        },
    });
    let o2 = {};
    let value = 2;
    Object.defineProperties(o2, {
        bbb: {
            get() {
                return value;
            },
            set(v) {
                value = v;
            },
            enumerable: true,
            configurable: true,
        },
    });
    Object.freeze(o1);
    Object.freeze(o2);
    o1.aaa = 3;     // 修改失败
    o1.ccc = 4;     // 添加属性失败
    delete o1.aaa;  // 删除失败
    o2.bbb = 5;     // 修改成功
    o2.ddd = 6;     // 添加属性失败
    delete o2.ccc;  // 删除失败

    let a1 = [12, {a: 1, b: 3}, 443];
    Object.freeze(a1);
    a1.length = 1;      // 修改失败
    a1.length = 12;     // 修改失败
    a1[0] = 333;        // 修改失败
    a1[1].c = 123;      // 修改成功
    // a1.push(555);            // TypeError: Cannot add property 3, object is not extensible
    // let r1 = a1.pop();         // TypeError: Cannot delete property '2' of [object Array]
}
{   // Object.fromEntries(iterable)
    /**
     * Object.fromEntries() 是 Object.entries 的反转。
     */
    // let o1 = Object.fromEntries([['a', 1], ['b', 32]]);     // {a: 1, b: 32}
    // let obj = Object.fromEntries(new Map([ ['foo', 'bar'], ['baz', 42] ]));      // {foo: "bar", baz: 42}
}
{   //  Object.getOwnPropertyDescriptors(obj)   获取一个对象的所有自身属性的描述符
    let o1 = {a: 1};
    Object.defineProperties(o1, {
        b: {
            value: 2,
        },
        c: {
            get() {
                return 3;
            }
        }
    });
    let o2 = Object.getOwnPropertyDescriptors(o1);
    /**
     {
      "a": {
        "value": 1,
        "writable": true,
        "enumerable": true,
        "configurable": true
      },
      "b": {
        "value": 2,
        "writable": false,
        "enumerable": false,
        "configurable": false
      },
      "c": {
        get: get(){},
        set: undefined,
        "enumerable": false,
        "configurable": false
      }
    }
     */
}
{   // Object.getOwnPropertyDescriptor(obj, prop)
    let o1 = {a: 1};
    let o2 = Object.getOwnPropertyDescriptor(o1, 'a');
    /**
     {
          "value": 1,
          "writable": true,
          "enumerable": true,
          "configurable": true
        }
     */
}
{   // Object.getOwnPropertyNames(obj)  返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
    let o1 = {a: 1};
    o1[Symbol(1)] = 22;
    Object.defineProperties(o1, {
        b: {
            value: 2,
        },
        c: {
            get() {
                return 3;
            }
        }
    });
    let a1 = Object.getOwnPropertyNames(o1);    // ['a', 'b', 'c']
}
{   // Object.getOwnPropertySymbols(obj)  返回一个给定对象自身的所有 Symbol 属性的数组。
    let o1 = {a: 1};
    o1[Symbol(1)] = 22;
    Object.defineProperties(o1, {
        b: {
            value: 2,
        },
        c: {
            get() {
                return 3;
            }
        }
    });
    let a1 = Object.getOwnPropertySymbols(o1);    // [Symbol(1)]
}
{   // Object.getPrototypeOf(object)    要返回其原型的对象, 如果没有继承属性，则返回 null 。
    let o1 = Object.create(null);
    let o2 = {};
    let o3 = Object.getPrototypeOf(o1);     // null
    let o4 = Object.getPrototypeOf(o2);     // Object
}
{   // Object.is(value1, value2)   判断两个值是否是相同的值

    /**
     * Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：
     两个值都是 undefined
     两个值都是 null
     两个值都是 true 或者都是 false
     两个值是由相同个数的字符按照相同的顺序组成的字符串
     两个值指向同一个对象
     两个值都是数字并且
     都是正零 +0
     都是负零 -0
     都是 NaN
     都是除零和 NaN 外的其它同一个数字
     这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。
     这与 === 运算符的判定方式也不一样。=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。
     */
    Object.is(0, -0);            // false
    Object.is(0, +0);            // true
    Object.is(-0, -0);           // true
    Object.is(NaN, 0 / 0);         // true
}

{   // Object.preventExtensions(obj) 方法法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
    // 它将永远不会具有超出它被标记为不可扩展的属性。注意，一般来说，不可扩展对象的属性可能仍然可被删除。尝试将新属性添加到不可扩展对象将静默失败或抛出TypeError
    let obj = {};
    let obj2 = Object.preventExtensions(obj);
    obj === obj2;  // true
    Object.isExtensible(obj);       // false
}
{   // Object.Object.seal(obj) 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。
    // 密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。
    // 属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改
    // 尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出TypeError
    let o1 = {a: 1};
    o1[Symbol(1)] = 22;
    Object.defineProperties(o1, {
        b: {
            value: 2,
            enumerable: true,
            configurable: true,
            writable: true,
        },
        c: {
            get() {
                return 3;
            },
            enumerable: true,
            configurable: true,
        }
    });
    Object.seal(o1);
    Object.isExtensible(o1);   // false
    Object.isSealed(o1);       // true
    let o3 = Object.getOwnPropertyDescriptors(o1);   // configurable都变成false
}
{   // Object.setPrototypeOf(obj, prototype)
    // 如果prototype参数不是一个对象或者null(例如，数字，字符串，boolean，或者 undefined)，则什么都不做。否则，该方法将obj的[[Prototype]]修改为新的值。
    let o1 = {};
    let o2 = Object.getPrototypeOf(o1); // Object
    Object.setPrototypeOf(o1, null);
    let o3 = Object.getPrototypeOf(o1); // null

}
{   // Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
    // Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。
    let o1 = {a: 1};
    let o2 = {b: 1};
    let o3 = {c: 1};
    Object.preventExtensions(o1);
    Object.seal(o2);
    Object.freeze(o3);
    let b1 = Object.isExtensible(o1);   // false
    let b2 = Object.isExtensible(o2);   // false
    let b3 = Object.isExtensible(o3);   // false
}
{   // Object.isSealed(obj) 判断一个对象是否被密封。
    // 密封对象是指那些不可扩展的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。
    let o1 = {a: 1};
    let o2 = {b: 1};
    let o3 = {c: 1};
    Object.preventExtensions(o1);
    Object.seal(o2);
    Object.freeze(o3);
    let b1 = Object.isSealed(o1);   // false
    let b2 = Object.isSealed(o2);   // true
    let b3 = Object.isSealed(o3);   // true
}
{   // Object.isFrozen()方法判断一个对象是否被冻结。
    // 一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有getter或setter组件的访问器的属性）都是不可写的。
    let o1 = {a: 1};
    let o2 = {b: 1};
    let o3 = {c: 1};
    Object.preventExtensions(o1);
    Object.seal(o2);
    Object.freeze(o3);
    let b1 = Object.isFrozen(o1);   // false
    let b2 = Object.isFrozen(o2);   // false
    let b3 = Object.isFrozen(o3);   // true
}
{   // obj.hasOwnProperty(prop) 会返回一个布尔值，指示对象自身属性中是否具有指定的属性
    // prop: 要检测的属性  字符串 名称或者 Symbol。
    // 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
    let s1 = Symbol(12);
    let o1 = {a: 1, [s1]: 789};
    o1.hasOwnProperty('a'); // true
    o1.hasOwnProperty(s1); // true
}
{   // prototypeObj.isPrototypeOf(object) 测试一个对象是否存在于另一个对象的原型链上。
    // isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。
    let o1 = {a: 1};
    let o2 = Object.create(o1);
    let b1 = o1.isPrototypeOf(o2); // true
    let b2 = Object.prototype.isPrototypeOf(o2); // true
}
{   // obj.propertyIsEnumerable(prop) 返回一个布尔值，表示指定的属性是否可枚举。
    let o1 = {};
    Object.defineProperties(o1, {
        a: {
            value: 12
        },
        b: {
            value: 232,
            enumerable: true
        }
    });
    let b1 = o1.propertyIsEnumerable('a');  // false
    let b2 = o1.propertyIsEnumerable('b');  // true
}

{   // obj.toString() 返回一个表示该对象的字符串
    // 每个对象都有一个toString()方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。
    // 默认情况下，toString()方法被每个Object对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中type是对象的类型
    let o1 = {a: 1};
    let s1 = o1.toString();  // [object Object]
}

{   // obj.valueOf() 返回指定对象的原始值。
    // JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。
    // 默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。
    // 不同类型对象的valueOf()方法的返回值:
    // Array	返回数组对象本身。
    // Boolean	布尔值。
    // Date	存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。
    // Function	函数本身。
    // Number	数字值。
    // Object	对象本身。这是默认情况。
    // String	字符串值。
    // Math 和 Error 对象没有 valueOf 方法。
    let s1 = ({a: 1}).valueOf();            // {"a": 1}
    let s2 = ([2, 45]).valueOf();           // [2, 45]
    let s3 = (new Boolean(11)).valueOf();   // true
    let s4 = (new Date()).valueOf();        // 1560526779389
    let s5 = (function () {
    }).valueOf();                           // function () {}
    let s6 = (new Number(111)).valueOf();   // 111
    let s7 = (new String('asd')).valueOf(); // 'asd'
}
