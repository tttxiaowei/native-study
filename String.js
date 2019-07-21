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

