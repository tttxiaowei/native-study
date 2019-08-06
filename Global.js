/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Global.js
 * @Description:  Global
 * @author: xiaowei
 * @date:   2019/8/5
 */

{
    /**
     * encodeURI    函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。
     * encodeURI(URI)
     * encodeURI 会替换所有的字符，但不包括以下字符，即使它们具有适当的UTF-8转义序列：
     类型        包含
     保留字符    ; , / ? : @ & = + $
     非转义的字符    字母 数字 - _ . ! ~ * ' ( )
     数字符号    #
     * encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests, 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。然而encodeURIComponent这个方法会对这些字符编码。
     */
    encodeURI()                 // 'undefined'
    encodeURI(null)         // 'null'
    encodeURI(undefined)    // 'undefined'
    encodeURI('a#aa')       // 'a#aa'
    encodeURI(111)          // '111'
    encodeURI(true)         // 'true'
    encodeURI(false)        // 'false'
    encodeURI({a: 12})      // '%5Bobject%20Object%5D'
    encodeURI([2, 5, 6])    // '2,5,6'
    encodeURI('%')          // '%25'
    encodeURI('&')          // '&'

}

{
    /**
     * decodeURI() 函数解码一个由encodeURI 先前创建的统一资源标识符（URI）或类似的例程。将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 encodeURI 编码的内容（例如 "#"）。
     * decodeURI(encodedURI)
     * 当encodedURI包含encodedURI编码后不应该存在的字符，则抛出一个URIError
     */
    decodeURI()                        // 'undefined'
    decodeURI(null)         // 'null'
    decodeURI(undefined)    // 'undefined'
    decodeURI('a#aa')       // 'a#aa'
    decodeURI(111)          // '111'
    decodeURI(true)         // 'true'
    decodeURI(false)        // 'false'
    decodeURI({a: 12})      // '[object Object]'
    decodeURI([2, 5, 6])    // '2,5,6'
    // decodeURI('%')          // URIError: URI malformed...
    decodeURI('&')          // '&'
}

{
    /**
     * encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的方法。它使用一到四个转义序列来表示字符串中的每个字符的UTF-8编码（只有由两个Unicode代理区字符组成的字符才用四个转义字符编码）。
     * encodeURIComponent(str);
     * encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。
     */
    encodeURIComponent()                        // 'undefined'
    encodeURIComponent(null)         // 'null'
    encodeURIComponent(undefined)    // 'undefined'
    encodeURIComponent('a#aa')       // 'a%23aa'
    encodeURIComponent(111)          // '111'
    encodeURIComponent(true)         // 'true'
    encodeURIComponent(false)        // 'false'
    encodeURIComponent({a: 12})      // '%5Bobject%20Object%5D'
    encodeURIComponent([2, 5, 6])    // '2%2C5%2C6'
    encodeURIComponent('%')          // '%25'
    encodeURIComponent('&')          // '%26'
    let end = 1
}

{
    /**
     * decodeURIComponent() 方法用于解码由 encodeURIComponent 方法或者其它类似方法编码的部分统一资源标识符（URI）。
     * decodeURIComponent(encodedURI)
     */
    decodeURIComponent()                        // 'undefined'
    decodeURIComponent(null)         // 'null'
    decodeURIComponent(undefined)    // 'undefined'
    decodeURIComponent('a#aa')       // 'a#aa'
    decodeURIComponent(111)          // '111'
    decodeURIComponent(true)         // 'true'
    decodeURIComponent(false)        // 'false'
    decodeURIComponent({a: 12})      // '[object Object]'
    decodeURIComponent([2, 5, 6])    // '2,5,6'
    // decodeURIComponent('%')          // URIError: URI malformed...
    decodeURIComponent('&')          // '&'
    let end = 1
}

{   // eval() 函数会将传入的字符串当做 JavaScript 代码进行执行
    /**
     * eval() 是一个危险的函数， 它使用与调用者相同的权限执行代码。如果你用 eval() 运行的字符串代码被恶意方（不怀好意的人）修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。
     * 更重要的是，第三方代码可以看到某一个 eval() 被调用时的作用域，这也有可能导致一些不同方式的攻击。相似的 Function 就不容易被攻击。
     * eval() 通常比其他替代方法更慢，因为它必须调用 JS 解释器，而许多其他结构则可被现代 JS 引擎进行优化。
     * eval 返回最后一个表达式的值。
     */
    let r1 = eval('45')         // 45
    let r2 = eval('"45"')       // '45'
    let r3 = eval('new String("2 + 2")')    // 返回了包含"2 + 2"的字符串对象,如果 eval() 的参数不是字符串， eval() 会将参数原封不动地返回
    let r4 = eval("2 + 2")                  // 4
    let r5 = eval("r4")                     // 4  直接调用，使用本地作用域
    // 如果你间接的使用 eval()，比如通过一个引用来调用它，而不是直接的调用 eval。 从 ECMAScript 5 起，它工作在全局作用域下，而不是局部作用域中
    // let r6 = eval.call(null, "r4") // Uncaught ReferenceError: r4 is not defined
    let fct1 = eval('function a() {}')  // return undefined     eval 中函数作为字符串被定义需要“（”和“）”作为前缀和后缀
    let fct2 = eval('(function a() {})')  // return a function

}

{   // globalThis  可以获取全局对象
    /**
     * 此功能某些浏览器尚在开发中，请参考浏览器兼容性表格以得到在不同浏览器中适合使用的前缀。由于该功能对应的标准文档可能被重新修订，所以在未来版本的浏览器中该功能的语法和行为可能随之改变。
     * 事实上，在不同的 JavaScript 环境中拿到全局对象是需要不同的语句的。
     * 在 Web 中，可以通过 window、self 或者 frames 取到全局对象，
     * 但是在 Web Workers 中只有 self 可以。
     * 在 Node.js 中，它们都无法获取，必须使用 global。
     * 在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式下 this 会返回 undefined 。
     */
    // 在 globalThis 之前，获取某个全局对象的唯一方式就是 Function('return this')()，但是这在某些情况下会导致 CSP 危害，所以 es6-shim 使用如下的方式：
    function getGlobal() {
        if (typeof self !== 'undefined') {
            return self;
        }
        if (typeof window !== 'undefined') {
            return window;
        }
        if (typeof global !== 'undefined') {
            return global;
        }
        throw new Error('unable to locate global object');
    }

}

{   // isFinite 函数用来判断被传入的参数值是否为一个有限数值（finite number）。在必要情况下，参数会首先转为一个数值。 如果参数是 NaN，正无穷大或者负无穷大，会返回false，其他返回 true。
    isFinite(Infinity);  // false
    isFinite(NaN);       // false
    isFinite(-Infinity); // false
    isFinite(0);         // true
    isFinite(2e64);      // true, 在更强壮的Number.isFinite(null)中将会得到false
    isFinite("0");       // true, 在更强壮的Number.isFinite('0')中将会得到false
}

{   // isNaN  函数用来确定一个值是否为NaN,  如果给定值为 NaN则返回值为true；否则为false。
    /**
     * 当算术运算返回一个未定义的或无法表示的值时，NaN就产生了。但是，NaN并不一定用于表示某些值超出表示范围的情况。将某些不能强制转换为数值的非数值转换为数值的时候，也会得到NaN。例如，0 除以0会返回NaN —— 但是其他数除以0则不会返回NaN
     * 如果isNaN函数的参数不是Number类型， isNaN函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是NaN进行判断,对于能被强制转换为有效的非NaN数值来说（空字符串和布尔值分别会被强制转换为数值0和1），返回false值也许会让人感觉莫名其妙
     */
    isNaN(NaN);       // true
    isNaN(undefined); // true
    isNaN({});        // true

    isNaN(true);      // false
    isNaN(null);      // false
    isNaN(37);        // false

// strings
    isNaN("37");      // false: 可以被转换成数值37
    isNaN("37.37");   // false: 可以被转换成数值37.37
    isNaN("37,5");    // true
    isNaN('123ABC');  // true:  parseInt("123ABC")的结果是 123, 但是Number("123ABC")结果是 NaN
    isNaN("");        // false: 空字符串被转换成0
    isNaN(" ");       // false: 包含空格的字符串被转换成0

// dates
    isNaN(new Date());                // false
    isNaN(new Date().toString());     // true

    isNaN("blabla")   // true: "blabla"不能转换成数值
}

{   // null 特指对象的值未设置
    // 值 null 是一个字面量，它不像undefined 是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象。把 null 作为尚未创建的对象，也许更好理解
    typeof null        // "object" (因为一些以前的原因而不是'null')
    typeof undefined   // "undefined"
    null === undefined // false
    null == undefined // true
    null === null // true
    null == null // true
    !null //true
    isNaN(1 + null) // false
    isNaN(1 + undefined) // true
}

{   // 全局属性undefined表示原始值undefined
    /**
     * undefined是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined的最初值就是原始数据类型undefined。
     * 一个没有被赋值的变量的类型是undefined。如果方法或者是语句中操作的变量没有被赋值，则会返回undefined
     * 在现代浏览器（JavaScript 1.8.5/Firefox 4+），自ECMAscript5标准以来undefined是一个不能被配置（non-configurable），不能被重写（non-writable）的属性。即便事实并非如此，也要避免去重写它。
     */
    // 这里没有声明y
    if (typeof y === 'undefined') {       // 没有错误，执行结果为true
        // console.log("y is " + typeof y)  // y is undefined
    }

    // if (y === undefined) {                // ReferenceError: y is not defined
    // }
}

{   // parseFloat() 函数解析一个字符串参数并返回一个浮点数。如果给定值不能被转换成数值，则会返回 NaN。
    /**
     * parseFloat(value)
     * 如果在解析过程中遇到了正负号(+或-),数字(0-9),小数点,或者科学记数法中的指数(e或E)以外的字符,则它会忽略该字符以及之后的所有字符,返回当前已经解析到的浮点数.同时参数字符串首位的空白符会被忽略.
     * 如果参数字符串的第一个字符不能被解析成为数字,则parseFloat返回NaN.
     */
    parseFloat("3.14");
    parseFloat("314e-2");
    parseFloat("0.0314E+2");
    parseFloat("3.14more non-digit characters");
}

{   // parseInt(string, radix)  string为字符串，radix为介于2-36之间的数。使用者告诉这个函数string（比如11）是radix（比如2）进制的，函数将固定返回string以十进制时显示的数（3）
    /**
     * parseInt(string, radix);
     * string：要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用  ToString 抽象操作)。字符串开头的空白符将会被忽略。
     * radix：一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。始终指定此参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为10。
     *      在基数为 undefined，或者基数为 0 或者没有指定的情况下，JavaScript 作如下处理：
     *          如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).
     *          如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。
     *          如果字符串 string 以其它任何值开头，则基数是10 (十进制)。
     *
     *  如果parseInt的字符不是指定基数中的数字，则忽略该字符和所有后续字符，并返回解析到该点的整数值。parseInt将数字截断为整数值。允许使用前导空格和尾随空格。
     * 返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。
     */
    // 以下例子均返回15:
    parseInt("0xF", 16);
    parseInt("F", 16);
    parseInt("17", 8);
    parseInt(0o21, 8);
    parseInt("015", 10);   // parseInt(015, 10); 返回 15
    parseInt(15.99, 10);
    parseInt("15,123", 10);
    parseInt("FXX123", 16);
    parseInt("1111", 2);
    parseInt("15 * 3", 10);
    parseInt("15e2", 10);
    parseInt("15px", 10);
    parseInt("12", 13);

    // 以下例子均返回 NaN:
    parseInt("Hello", 8); // 根本就不是数值
    parseInt("546", 2);   // 除了“0、1”外，其它数字都不是有效二进制数字

    // 以下例子均返回 -15：
    parseInt("-F", 16);
    parseInt("-0F", 16);
    parseInt("-0XF", 16);
    parseInt(-15.1, 10);
    parseInt(" -17", 8);
    parseInt(" -15", 10);
    parseInt("-1111", 2);
    parseInt("-15e1", 10);
    parseInt("-12", 13);

    // 下例中全部返回 4:
    parseInt(4.7, 10);
    parseInt(4.7 * 1e22, 10); // 非常大的数值变成 4
    parseInt(0.00000000000434, 10); // 非常小的数值变成 4

    let end = 1
}
