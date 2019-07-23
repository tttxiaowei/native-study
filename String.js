/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  String
 * @Description:     String对象
 * @author: xiaowei
 * @date:   2019/7/21
 */
{   // String 全局对象是一个用于字符串或一个字符序列的构造函数。
    /**
     *  字面量：
     *      'string text'
     *      "string text"
     *
     *  使用 String 函数将其他值生成或转换成字符串：
     *      String(thing)
     *      new String(thing)
     *
     * 除了普通的可打印字符以外，一些特殊有特殊功能的字符可以通过转义字符的形式放入字符串中：
     Code    Output
     \0    空字符
     \'    单引号
     \"    双引号
     \\    反斜杠
     \n    换行
     \r    回车
     \v    垂直制表符
     \t    水平制表符
     \b    退格
     \f    换页
     \uXXXX    unicode 码
     \u{X} ... \u{XXXXXX}    unicode codepoint
     \xXX    Latin-1 字符(x小写)

     * 基本字符串和字符串对象的区别节：
     * 请注意区分 JavaScript 字符串对象和基本字符串值 . ( 对于 Boolean 和Numbers 也同样如此.)
     * 字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。
     * JavaScript会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。
     * 当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。
     */
    let s1 = 'string text'
    let s2 = String('string text')
    let s3 = new String('string text')
    s1 === s2       // true
    s1 === s3       // false    s1,s2是基本字符串，而s3是字符串对象
    typeof s1       // 'string'
    typeof s3       // 'Object'
    Object.prototype.toString.call(s1)      // '[object String]'
    Object.prototype.toString.call(s3)      // '[object String]'

    //  eval会将基本字符串当成代码来执行, eval会将字符串对象则被看作对象处理, 返回对象
    // eval(s1)         // 报错， eval会将基本字符串当成代码来执行
    let o1 = eval(s3)   // String {"string text"},  eval会将字符串对象则被看作对象处理, 返回对象

    // 使用 String() 方法将其它对象转化为字符串可以被认为是一种更加安全的做法，虽然该方法底层使用的也是 toString() 方法，但是针对 null/undefined/symbols，String() 方法会有特殊的处理：
    null + ''               // 'null'
    undefined + ''          // 'undefined'
    // Symbol(111) + ''      Uncaught TypeError: Cannot convert a Symbol value to a string
    String(null)        // 'null'
    String(undefined)   // 'undefined'
    String(Symbol(111)) // 'Symbol(111)'
}

{   // String.prototype.length  表示一个字符串的长度
    // 该属性返回字符串中字符编码单元的数量,JavaScript 使用 UTF-16 编码，该编码使用一个 16 比特的编码单元来表示大部分常见的字符，使用两个代码单元表示不常用的字符。因此 length 返回值可能与字符串中实际的字符数量不相同。
    let s1 = '😂'
    s1.length           //  2
}

{   // String.fromCharCode()    返回由指定的UTF-16代码单元序列创建的字符串。
    // String.fromCharCode(num1, ..., numN)     num1, ..., numN:一系列UTF-16代码单元的数字。 范围介于0到65535（0xFFFF）之间。 大于0xFFFF的数字将被截断。 不进行有效性检查。
    String.fromCharCode(65, 66, 67)  // "ABC"
    String.fromCharCode(0x2014)       // "—"
    String.fromCharCode(0x12014)      // "—"; 第一位被截断抛弃
}

{   // String.fromCodePoint()    返回由指定的UTF-16代码单元序列创建的字符串。
    // String.fromCodePoint(num1, ..., numN)     num1, ..., numN:一串 Unicode 编码位置，即“代码点”。如果传入无效的 Unicode 编码，将会抛出一个RangeError
    String.fromCodePoint(65, 66, 67)  // "ABC"
    String.fromCodePoint(0x2014)       // "—"
    String.fromCodePoint(0x12014)      // '𒀔'
    // String.fromCodePoint('aa')                // RangeError: Invalid code point NaN
}

{   // String.prototype.charAt()    从一个字符串中返回指定的字符。
    // str.charAt(index)    字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符的索引值为 stringName.length - 1。 如果指定的 index 值超出了该范围，则返回一个空字符串。
    let s1 = String.fromCodePoint(0x12014)
    s1.length       // 2
    s1.charAt(-1)   // ''
    s1.charAt(0)    // ?
    s1.charAt(1)    // ?
    s1.charAt(2)    // ''
}

{   // String.prototype.charCodeAt()    返回0到65535之间的整数
    // str.charCodeAt(index)    如果指定的 index 小于 0 或不小于字符串的长度，则 charCodeAt 返回 NaN
    /**
     * Unicode 编码单元（code points）的范围从 0 到 1,114,111（0x10FFFF）。开头的 128 个 Unicode 编码单元和 ASCII 字符编码一样
     * 注意，charCodeAt 总是返回一个小于 65,536 的值。这是因为高位编码单元（higher code point）使用一对（低位编码 lower valued）代理伪字符（"surrogate" pseudo-characters）来表示，从而构成一个真正的字符。
     * 因此，为了查看或复制（reproduce）65536 及以上编码字符的完整字符，需要在获取 charCodeAt(i) 的值的同时获取 charCodeAt(i+1) 的值（如同查看/reproducing 拥有两个字符的字符串一样），或者改为获取 codePointAt(i) 的值。
     */
    let s1 = String.fromCodePoint(0x12014)
    s1.charCodeAt(-1)   // NaN
    s1.charCodeAt(0)    // 55304    0xD808
    s1.charCodeAt(1)    // 56340    0xDC14
    s1.charCodeAt(2)    // NaN
}

{   // String.prototype.codePointAt()    返回 一个 Unicode 编码点值的非负整数。
    // str.codePointAt(index)   如果在索引处没找到元素则返回 undefined
    let s1 = String.fromCodePoint(0x12014)
    s1.codePointAt(-1)   // undefined
    s1.codePointAt(0)    // 73748    0x12014
    s1.codePointAt(1)    // 56340    0xDC14
    s1.codePointAt(2)    // undefined
}

{   // String.prototype.concat()    将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。   强烈建议使用 赋值操作符（+, +=）代替 concat 方法
    // str.concat(string2, string3[, ..., stringN])
    'a'.concat('b', 'c')    // 'abc'
}

{   // String.prototype.endsWith()    判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
    // str.endsWith(searchString[, length])     length: 可选。作为 str 的长度。默认值为 str.length。
    let s1 = 'hello world'
    s1.endsWith('world')    // true
    s1.endsWith('World')    // false  大小写敏感

    s1.endsWith('hello', 5)    // true  只搜索了前5个字符
    s1.endsWith('hello', 4)    // false
}

{   // String.prototype.includes()    用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
    // str.includes(searchString[, position])   position： 可选。从当前字符串的哪个索引位置开始搜寻子字符串，默认值为0。
    let s1 = 'hello world'
    s1.includes('hello')    // true
    s1.includes('hello', 1)    // false
}

{   // String.prototype.indexOf()   返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。如果未找到该值，则返回-1。
    //str.indexOf(searchValue[, fromIndex])   表示调用该方法的字符串中开始查找的位置。可以是任意整数。默认值为 0。如果 fromIndex < 0 则查找整个字符串（如同传进了 0）。如果 fromIndex >= str.length，则该方法返回 -1
    let s1 = 'hello world'
    s1.indexOf('hello')    // 0
    s1.indexOf('hello', 1)    // -1
    let end = 121
}

{   // String.prototype.lastIndexOf()   返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。
    //str.lastIndexOf(searchValue[, fromIndex])   fromIndex: 从调用该方法字符串的此位置处开始查找。可以是任意整数。默认值为 str.length。如果为负值，则被看作 0。如果 fromIndex > str.length，则 fromIndex 被看作 str.length。
    let s1 = 'hello world'
    s1.lastIndexOf('world', 5)  // -1   从索引5往左搜索，已经找不到world的开头w了
    s1.lastIndexOf('world', 6)  // 6
    s1.lastIndexOf('world', 7)  // 6
    let end = 121
}
