/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  JSON.js
 * @Description:   JSON
 * @author: xiaowei
 * @date:   2019/6/9
 */
{
    /** JSON.parse(text[, reviver])
     reviver 可选 转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在parse函数返回之前。
     */
    let str = '{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}';
    JSON.parse(str, function (k, v) {
        console.log(k, v);  // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                            // 最后一个属性名会是个空字符串。
        return v;           // 返回原始属性值，相当于没有传递 reviver 参数。
    });
    /** 输出
     1 1
     2 2
     4 4
     6 6
     5 { '6': 6 }
     3 { '4': 4, '5': { '6': 6 } }
     { '1': 1, '2': 2, '3': { '4': 4, '5': { '6': 6 } } }
     */
}
{
    /** JSON.stringify(value[, replacer [, space]])
     replacer 可选
     如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
     如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
     如果该参数为null或者未提供，则对象所有的属性都会被序列化

     space 可选
     指定缩进用的空白字符串，用于美化输出（pretty-print）；
     如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；
     如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
     如果该参数没有提供（或者为null）将没有空格。
     */
    console.log('\n\n\nJSON.stringify-------------------------------------------');

    let str1 = JSON.stringify(11);                          // '11'         数字没有引号
    let str2 = JSON.stringify('abc');                       // '"abc"'
    let str3 = JSON.stringify(false);                       // 'false'      boolean值没有引号
    let str4 = JSON.stringify([]);                          // '[]'         数组本身没有引号
    let str5 = JSON.stringify([7, '8', 9, false, 'false']); // '[7,"8",9,false,"false"]'  数组的值需要引号的地方还是有的
    let str6 = JSON.stringify({});                          // '{}'
    let str7 = JSON.stringify({a: undefined});              // '{}'           值为undefined的属性会丢失
    let str8 = JSON.stringify({a: null});                   // '{"a":null}'   值为null会保留，且null没有引号
    let str9 = JSON.stringify({a: 'false', b: false});      // '{"a":"false","b":false}'    boolean和字符串的区别
    let str11 = JSON.stringify({                            // '{"r":77}'     如果有toJSON，则返回该函数返回值序列化的结果
        a: 'false', b: false, toJSON() {
            return {r: 77}
        }
    });

    let str12 = JSON.stringify(Boolean('78'));              // 'true'    布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
    let str13 = JSON.stringify(Number('78'));               // '78'
    let str14 = JSON.stringify(String(false));              // '"false"'

    let str15 = JSON.stringify({                            // '{}'         undefined、任意的函数以及 symbol 值，出现在非数组对象的属性值中时,在序列化过程中会被忽略
        a() {
        }
    });
    let str16 = JSON.stringify({a: Symbol(12)});             // '{}'
    let str17 = JSON.stringify({a: undefined});              // '{}'

    let str18 = JSON.stringify([                             // '[null]'    undefined、任意的函数以及 symbol 值，出现在数组中时被转换成 null
        function a() {
        }
    ]);
    let str19 = JSON.stringify([Symbol(12)]);               // '[null]'
    let str20 = JSON.stringify([undefined]);                // '[null]'

    let str21 = JSON.stringify(                             // undefined     undefined、任意的函数以及 symbol 值，被单独转换时，会返回undefined
        function a() {
        }
    );
    let str22 = JSON.stringify(Symbol(12));               // undefined
    let str23 = JSON.stringify(undefined);                // undefined


    let obj1 = {a: 21};
    obj1.b = obj1;
    // let str24 = JSON.stringify(obj1);                      // TypeError: Converting circular structure to JSON   对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

    let str24 = JSON.stringify({a: NaN});                   // '{"a": null}'    NaN和Infinity格式的数值及null都会被当做null。
    let str25 = JSON.stringify({a: null});                  // '{"a": null}'
    let str26 = JSON.stringify({a: Infinity});              // '{"a": null}'

    let str27 = JSON.stringify(NaN);                   // 'null'    NaN和Infinity格式的数值及null都会被当做null。
    let str28 = JSON.stringify(null);                  // 'null'
    let str29 = JSON.stringify(Infinity);              // 'null'

    let str30 = JSON.stringify({                       // '{}'  所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
        [Symbol(11)]: 123
    });

    let str31 = JSON.stringify(                         // '{"y":"y"}'  其他类型的对象，包括Map/Set/weakMap/weakSet，仅会序列化可枚举的属性。
        Object.create(
            null,
            {
                x: {value: 'x', enumerable: false},
                y: {value: 'y', enumerable: true}
            }
        )
    );

    let obj2 = {
        1: 1,
        2: '2',
        3: {1: 88, 2: '44', 4: 4, 5: {6: 6, 7: false, 8: 'false', 9: null, 10: undefined, 11: [22]}}
    };
    let str32 = JSON.stringify(obj2, null, 10);     //
    let str33 = JSON.stringify(obj2, [2]);          // '{"2":"2"}'                replacer为数组时，数组的值代表将被序列化成JSON字符串的属性名
    let str34 = JSON.stringify(obj2, [2, 3]);       // '{"2":"2","3":{"2":44}}'

    let str35 = JSON.stringify(obj2, function (k, v) {  // undefined    replacer为函数时如果没有返回值，则返回undefined
    });
    let str36 = JSON.stringify(obj2, function (k, v) {  // '{"1":1,"2":true,"3":{"1":88,"2":true,"4":4,"5":{"6":6,"7":"false","8":true,"11":{"a":1,"b":true}}}}'
        // console.log('-----------', k, v);               // 输出顺序表明replacer的调用顺序为按属性在对象中的顺序调用
        if (typeof v === 'number') {
            return v;                   // 如果返回一个 Number, 该Number值被添加入JSON字符串。
        }
        if (typeof v === 'string') {
            return true;                // 如果返回一个 Boolean, 该Boolean值被作为属性值被添加入JSON字符串。
        }
        if (typeof v === 'boolean') {
            return v + '';              // 如果返回一个 String, 该字符串作为属性值被添加入JSON。
        }
        if (v === null) {
            return undefined;           // 如果返回undefined，该属性值不会在JSON字符串中输出。
        }
        if (Object.prototype.toString.call(v) === '[object Array]') {
            return {a: 1, b: '2'};      // 如果返回任何其他对象，该对象递归地序列化成JSON字符串，对每个属性调用replacer方法。除非该对象是一个函数，这种情况将不会被序列化成JSON字符串。
        }
        return v;
    });
    let str37 = JSON.stringify(obj2);                   // '{"1":1,"2":"2","3":{"1":88,"2":"44","4":4,"5":{"6":6,"7":false,"8":"false","9":null,"11":[22]}}}'
    let str38 = JSON.stringify(obj2, function (k, v) {  // '{"2":"2","3":{"2":"44","5":{"7":false,"8":"false","9":null,"11":[null]}}}'
        if (typeof v === 'number') {
            return function () {        // 返回对象是一个函数，这种情况将不会被序列化成JSON字符串。
            };
        }
        return v;
    });                   // '{"1":1,"2":"2","3":{"1":88,"2":"44","4":4,"5":{"6":6,"7":false,"8":"false","9":null,"11":[22]}}}'

    let date = new Date();  // Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
    JSON.stringify(date);   // '"2019-06-09T11:40:58.536Z"'
    date.toJSON();          // '2019-06-09T11:40:58.536Z'
    JSON.stringify(date) === date.toJSON();     // false
    JSON.stringify(date) === '"' + date.toJSON() + '"';     // true
}
{   // 深拷贝
    console.log('\n\n\n深拷贝-------------------------------------------');
    let obj1 = {
        1: 1,
        2: '2',
        [Symbol(11)]: 12,
        3: undefined,
        4: Symbol(22),
        a() {
        },
        5: [undefined, Symbol(33), function () {
        }],
        6: NaN,
        7: Infinity,
        8: null,
        9: [1, '2', false],
        10: {a: 23},
    };
    let temp = 12;
    Object.defineProperties(obj1, {
        [Symbol(33)]: {
            value: 44,
            enumerable: false
        },
        11: {
            get() {
                return temp;
            },
            set(val) {
                temp = val;
            },
            enumerable: false
        }
    });
    let obj2 = JSON.parse(JSON.stringify(obj1));
    let obj3 = Object.assign({}, obj1);

    let k11 = [];                                   // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a"]     for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
    for (let k in obj1) {
        k11.push(k);
    }
    let k21 = Object.keys(obj1);                    // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a"]     Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
    let k31 = Object.getOwnPropertyNames(obj1);     // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "a"]   Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
    let k41 = Object.getOwnPropertySymbols(obj1);   // [Symbol(11), Symbol(33)]     Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
    let k51 = Reflect.ownKeys(obj1);                // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "a", Symbol(11), Symbol(33)]   Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。


    let k12 = [];                                   // ["1", "2", "5", "6", "7", "8", "9", "10"]
    for (let k in obj2) {
        k12.push(k);
    }
    let k22 = Object.keys(obj2);                    // ["1", "2", "5", "6", "7", "8", "9", "10"]
    let k32 = Object.getOwnPropertyNames(obj2);     // ["1", "2", "5", "6", "7", "8", "9", "10"]
    let k42 = Object.getOwnPropertySymbols(obj2);   // []
    let k52 = Reflect.ownKeys(obj2);                // ["1", "2", "5", "6", "7", "8", "9", "10"]


    let k13 = [];                                   // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a"]
    for (let k in obj3) {
        k13.push(k);
    }
    let k23 = Object.keys(obj3);                    // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a"]
    let k33 = Object.getOwnPropertyNames(obj3);     // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a"]
    let k43 = Object.getOwnPropertySymbols(obj3);   // [Symbol(11)]
    let k53 = Reflect.ownKeys(obj3);                // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "a", Symbol(11)]


    let obj4 = deepCopy(obj1);
    let k64 = Reflect.ownKeys(obj4);
    let end = 12;
}

{
    let getType = function (val) {
        return Object.prototype.toString.call(val);
    };
    let isReference = function (val) {
        let temp = val;
        temp.aaa = 12;
        return temp === val;
    };
    let t1 = getType('');
    let t2 = getType(1);
    let t3 = getType(true);
    let t4 = getType(undefined);
    let t5 = getType(null);
    let t6 = getType(new Symbol);

    let t7 = getType({});
    let t8 = getType([]);
    let t9 = getType([]);

    // let t9 = getType(new Set());
    // let t10 = getType(new WeakSet());
    // let t11 = getType(new Map());
    // let t12 = getType(new WeakMap());

}

/**
 * @Description:  深拷贝函数（不能算完全的深拷贝，暂时没想如何到拷贝函数、对象中有getter和setter的属性）
 * @param {all} val 需要拷贝的值
 * @return {all}    深拷贝后得到的新值
 */
function deepCopy(val) {
    let type = Object.prototype.toString.call(val);
    switch (type) {
        case '[object String]':
        case '[object Number]':
        case '[object Boolean]':
        case '[object Null]':
        case '[object Undefined]':
        case '[object Symbol]':
        case '[object Error]':
        case '[object Math]':
        case '[object Function]':   // 函数无法深拷贝，可能涉及闭包、局部变量
        case '[object GeneratorFunction]':
        case '[object Promise]':    // Promise无法深拷贝，可能涉及闭包、局部变量
            return val;                         // 基本类型或不处理的直接返回
        case '[object RegExp]':
            return new RegExp(val);             // 处理RegExp
        case  '[object Date]':
            return new Date(val);               // 处理Date
        case  '[object ArrayBuffer]':
            return val.slice(0);                // 处理ArrayBuffer
        case  '[object DataView]':
            return new DataView(val.buffer.slice(0), val.byteOffset, val.byteLength);   // 处理DataView
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object Uint8Array]':
        case '[object Uint8Clamped​Array]':
        case '[object Uint16Array]':
        case '[object Uint32Array]':
        case '[object Int8Array]':
        case '[object Int16Array]':
        case '[object Int32Array]':
            let g = global ? global : window;
            return g[type.slice(8, -1)]['from'](val);                                   // 处理****Array
        case '[object Array]':
            return val.map(v => deepCopy(v));                                           // 处理Array
        case '[object Set]':
        case '[object WeakSet]':
            let set = type === '[object WeakSet]' ? new WeakSet() : new Set();          // 处理Set
            for (let v of val.values()) {
                set.add(deepCopy(v));
            }
            return set;
        case '[object Map]':
        case '[object WeakMap]':
            let map = type === '[object WeakMap]' ? new WeakMap() : new Map();          // 处理Map
            for (let k of val.keys()) {
                map.set(k, deepCopy(val.get(k)));
            }
            return map;
        case '[object Object]':                                                         // 处理纯对象
            let obj = {};
            Reflect.ownKeys(val).forEach(k => {     // 获取所有属性
                let des = Object.getOwnPropertyDescriptor(val, k);
                if (!(des.get || des.set)) {        // 除非设置了getter、setter，否则就要递归。对getter、setter无能为力，因为getter、setter函数内很可能用了闭包、局部变量
                    des.value = deepCopy(des.value);
                }
                Object.defineProperty(obj, k, des);
            });
            return obj;
    }
    throw new Error('深拷贝匹配逻辑不完善');        // 如果执行到这里，则说明前面匹配逻辑不完善
}