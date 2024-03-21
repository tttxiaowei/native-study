/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Math.js
 * @Description:     Math
 * @author: xiaowei
 * @date:   2019/6/11
 */

{
    /**
     * 需要注意的是很多数学函数都有一个精度，并且精度在不同环境下也是不相同的。这就意味着不同的浏览器会给出不同的结果，甚至相同的 JS 引擎在不同的OS或者架构下也会给出不同的结果。
     * Math 是一个内置对象， 它具有数学常数和函数的属性和方法。不是一个函数对象。Math 的所有属性和方法都是静态的
     * 应该是先进行隐式类型转换为Number再调用函数
     */
    Object.prototype.toString.call(Math);   // "[object Math]"
    Math[Symbol.toStringTag];               // "Math"
}
{   // 静态属性       writable:false,enumerable:false,configurable:false
    Math.E;                     // 2.718281828459045    表示自然对数的底数（或称为基数），e，约等于 2.718
    Math.LN10;                  // 2.302585092994046    表示 10 的自然对数，约为 2.302
    Math.LN2;                   // 0.6931471805599453    表示 2 的自然对数，约为 0.693
    Math.LOG10E;                // 0.4342944819032518    表示以 10 为底数，e 的对数，约为 0.434
    Math.LOG2E;                 // 1.4426950408889634    表示以 2 为底数，e 的对数，约为 1.442
    Math.PI;                    // 3.141592653589793     圆周率，约为  3.14159
    Math.SQRT1_2;               // 0.7071067811865476    表示 1/2 的平方根，约为 0.707
    Math.SQRT2;                 // 1.4142135623730951    表示 2 的平方根，约为 1.414
}
{   // Math.abs     返回绝对值
    Math.abs('-1');     // 1
    Math.abs(-2);       // 2
    Math.abs(null);     // 0
    Math.abs('');       // 0
    Math.abs("string"); // NaN
    Math.abs();         // NaN
}
{
    Math.ceil(-1.23);           // -1       向上取整, 返回大于或等于一个给定数字的最小整数
    Math.floor(-1.23);          // -2       向下取整, 返回小于或等于一个给定数字的最大整数

    /**
     *  JavaScript 内部使用64位的双浮点数字，支持很高的精度。但是，有时你需要用32位浮点数字，比如你从一个Float32Array 读取值时.
     *  这时会产生混乱：检查一个64位浮点数和一个32位浮点数是否相等会失败，即使二个数字几乎一模一样。
     */
    Math.fround(8.5);           // 8.800000190734863        将任意的数字转换为离它最近的32位单精度浮点数形式的数字

    Math.max(23, 34, 6, 8);             // 23       返回给定的一组数字中的最大值
    Math.max(23, 34, 6, undefined);     // NaN      如果有任一参数不能被转换为数值，则结果为 NaN。
    Math.max();                         // -Infinity   如果没有参数，则结果为 - Infinity。
    Math.min(23, 34, 6, 8);             // 6        给定数值中最小的数。如果任一参数不能转换为数值，则返回NaN.如果没有参数，结果为Infinity。
    Math.pow(2, 4);                     // 16       函数返回基数（base）的指数（exponent）次幂，即 base的exponent次幂。
    Math.random();                      // 0.05782650055724803   函数返回一个浮点,  伪随机数在范围[0，1)
    Math.round(1.551);                  // 2        函数返回一个数字四舍五入后最接近的整数
    Math.sqrt(9);                       // 3        函数返回一个数的平方根
    Math.trunc(-4.5);                   // -4       将数字的小数部分去掉，只保留整数部分。
}