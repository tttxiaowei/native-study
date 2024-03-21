/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Number.js
 * @Description:     Number
 * @author: xiaowei
 * @date:   2019/6/11
 */

{       // 构造函数
    /**
     * new Number(value);
     * 如果参数无法被转换为数字，则返回 NaN。
     * 在非构造器上下文中 (如：没有 new 操作符)，Number 能被用来执行类型转换。
     */

    let biggestInt = 9007199254740992;      // Number对象所能表示的最大和最小整数
    let smallestInt = -9007199254740992;    // 在解析序列化的JSON时，如果JSON解析器将它们强制转换为Number类型，那么超出此范围的整数值可能会被破坏。在工作中使用String 类型代替，是一个可行的解决方案。

    let d = new Date("December 17, 1995 03:24:00");     // Number可以将Date转换为时间戳
    d.getTime();    // 819199440000
    Number(d);      // 819199440000

    Number("123");     // 123
    Number("0x11");    // 17
    Number("0b11");    // 3
    Number("0o11");    // 9
    Number("foo");     // NaN
    Number("100a");    // NaN

    Number();          // 0
    Number("");        // 0
    Number(null);      // 0
    Number(undefined); // NaN
}
{   // 静态属性
    Number.EPSILON;     // 接近于 2.2204460492503130808472633361816E-16，或者 2-52

    Number.MAX_VALUE;           // 1.7976931348623157e+308，表示在 JavaScript 里所能表示的最大数值。绝对值大于 MAX_VALUE 的值代表 +Infinity、-Infinity。
    Number.MIN_VALUE;           // 5e-324，表示在 JavaScript 中所能表示的最小的正值,绝对值小于 MIN_VALUE 的值将会转换为 0。
    Number.NEGATIVE_INFINITY;   // -Infinity
    Number.POSITIVE_INFINITY;   // +Infinity
    /**
     * 代表在 JavaScript中最大的安全的integer型数字
     * 因为Javascript的数字存储使用了IEEE 754中规定的双精度浮点数数据类型，而这一数据类型能够安全存储 -(2^53 - 1) 到 2^53- 1 之间的数值（包含边界值）。
     * 这里安全存储的意思是指能够准确区分两个不相同的值，例如 Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 将得到 true的结果，而这在数学上是错误的
     */
    Number.MAX_SAFE_INTEGER;    // 9007199254740991，2^53-1
    Number.MIN_SAFE_INTEGER;    // -9007199254740991，-(2^53-1)
}
{   // Number.isFinite      检测传入的参数是否是一个有穷数
    // 和全局的 isFinite() 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），非NaN，才返回 true。
    let result1 = Number.isFinite(NaN);       // false
    let result2 = Number.isFinite();          // false
    let result3 = Number.isFinite(undefined); // false
    let result4 = Number.isFinite(null);      // false
    let result5 = Number.isFinite('');        // false
    let result6 = Number.isFinite('0');       // false
    let result7 = Number.isFinite([]);        // false
    let result8 = Number.isFinite([1]);       // false

    let result10 = isFinite(NaN);       // false
    let result11 = isFinite();          // false
    let result12 = isFinite(undefined); // false
    let result13 = isFinite(null);      // true
    let result14 = isFinite('');        // true
    let result15 = isFinite('0');       // true
    let result16 = isFinite([]);        // true
    let result17 = isFinite([1]);       // true
}
{   // Number.isInteger(value)  判断给定的参数是否为整数,不会强制将一个非数值的参数转换成数值
    let result1 = Number.isInteger(NaN);       // false
    let result2 = Number.isInteger();          // false
    let result3 = Number.isInteger(undefined); // false
    let result4 = Number.isInteger(null);      // false
    let result5 = Number.isInteger('');        // false
    let result6 = Number.isInteger('0');       // false
    let result7 = Number.isInteger([]);        // false
    let result8 = Number.isInteger([1]);       // false
    let result9 = Number.isInteger(Infinity);  // false
    let result10 = Number.isInteger(0);        // true
    let result11 = Number.isInteger(3.0);        // true
}
{   // Number.isNaN(value)  确定传递的值是否为 NaN和其类型是 Number。它是原始的全局isNaN()的更强大的版本。
    // 和全局函数 isNaN() 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 NaN 的时候才会返回 true。
    let result1 = Number.isNaN(NaN);       // true
    let result2 = Number.isNaN();          // false
    let result3 = Number.isNaN(undefined); // false
    let result4 = Number.isNaN(null);      // false
    let result5 = Number.isNaN('');        // false
    let result6 = Number.isNaN('0');       // false
    let result7 = Number.isNaN([]);        // false
    let result8 = Number.isNaN([1]);       // false
    let result9 = Number.isNaN(Infinity);  // false
    let result10 = Number.isNaN(0);        // false

    let result11 = isNaN(NaN);       // true
    let result12 = isNaN();          // true
    let result13 = isNaN(undefined); // true
    let result14 = isNaN(null);      // false
    let result15 = isNaN('');        // false
    let result16 = isNaN('0');       // false
    let result17 = isNaN([]);        // false
    let result18 = isNaN([1]);       // false
    let result19 = isNaN(Infinity);  // false
    let result20 = isNaN(0);         // false
}
{
    /**
     *  Number.isNaN(value)  判断传入的参数值是否是一个“安全整数”（safe integer）。一个安全整数是一个符合下面条件的整数：
     *  1. can be exactly represented as an IEEE-754 double precision number    （能被IEEE-754双精度数字精确表示）
     *  2. whose IEEE-754 representation cannot be the result of rounding any other integer to fit the IEEE-754 representation.（在任何 IEEE-754 舍入模式下，没有其他整数舍入结果为该整数）
     *  比如，2^53 - 1 是一个安全整数，它能被精确表示，在任何 IEEE-754 舍入模式（rounding mode）下，没有其他整数舍入结果为该整数。
     *  作为对比，2^53 就不是一个安全整数，它能够使用 IEEE-754 表示，但是 2^53 + 1 不能使用 IEEE-754 直接表示，在就近舍入（round-to-nearest）和向零舍入中，会被舍入为 2^53。
     *  安全整数范围为 -(2^53 - 1)到 2^53 - 1 之间的整数，包含 -(2^53 - 1)和 2^53 - 1。
     *  不会强制将一个非数值的参数转换成数值
     */
    let result1 = Number.isSafeInteger(NaN);       // false
    let result2 = Number.isSafeInteger();          // false
    let result3 = Number.isSafeInteger(undefined); // false
    let result4 = Number.isSafeInteger(null);      // false
    let result5 = Number.isSafeInteger('');        // false
    let result6 = Number.isSafeInteger('0');       // false
    let result7 = Number.isSafeInteger([]);        // false
    let result8 = Number.isSafeInteger([1]);       // false
    let result9 = Number.isSafeInteger(Infinity);  // false
    let result10 = Number.isSafeInteger(0);        // true
    let result11 = Number.isSafeInteger(3.0);        // true
}

{   // Number.parseFloat(value)  可以把一个字符串解析成浮点数, 如果无法被解析成浮点数，则返回NaN
    // 该方法与全局的 parseFloat(value) 函数相同
    // 如果value是个字符串，会试图截取字符串开头的数字，若不是数字开头则返回NaN
    let result1 = Number.parseFloat(NaN);       // NaN
    let result2 = Number.parseFloat();          // NaN
    let result3 = Number.parseFloat(undefined); // NaN
    let result4 = Number.parseFloat(null);      // NaN
    let result5 = Number.parseFloat('');        // NaN
    let result6 = Number.parseFloat('0');       // 0
    let result7 = Number.parseFloat([]);        // NaN
    let result8 = Number.parseFloat([1]);       // 1
    let result9 = Number.parseFloat(Infinity);  // Infinity
    let result10 = Number.parseFloat(0);        // 0
    let result101 = Number.parseFloat(3.0);     // 3
    let result102 = Number.parseFloat('3.0asd');// 3
    let result103 = Number.parseFloat('5asd');  // 5

    let result11 = parseFloat(NaN);       // NaN
    let result12 = parseFloat();          // NaN
    let result13 = parseFloat(undefined); // NaN
    let result14 = parseFloat(null);      // NaN
    let result15 = parseFloat('');        // NaN
    let result16 = parseFloat('0');       // 0
    let result17 = parseFloat([]);        // NaN
    let result18 = parseFloat([1]);       // 1
    let result19 = parseFloat(Infinity);  // Infinity
    let result20 = parseFloat(0);         // 0
    let result201 = parseFloat(3.0);     // 3
    let result202 = parseFloat('3.0asd');// 3
    let result203 = parseFloat('5asd');  // 5
}
{   // Number.parseInt(string[, radix])  依据指定基数 [ 参数 radix 的值]，把字符串 [ 参数 string 的值] 解析成整数。该方法和全局的 parseInt() 函数是同一个函数：
    // radix: 进制，一个介于2和36之间的整数，通常将值默认为10。
    // 返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。
    // 将整型数值以特定基数转换成它的字符串值可以使用 intValue.toString(radix).
    let result1 = Number.parseInt(NaN);       // NaN
    let result2 = Number.parseInt();          // NaN
    let result3 = Number.parseInt(undefined); // NaN
    let result4 = Number.parseInt(null);      // NaN
    let result5 = Number.parseInt('');        // NaN
    let result6 = Number.parseInt('0');       // 0
    let result7 = Number.parseInt([]);        // NaN
    let result8 = Number.parseInt([1]);       // 1
    let result9 = Number.parseInt(Infinity);  // Infinity
    let result10 = Number.parseInt(0);        // 0
    let result101 = Number.parseInt(3.0);     // 3
    let result102 = Number.parseInt('3.0asd');// 3
    let result103 = Number.parseInt('5asd');  // 5

    let result11 = parseInt(NaN);       // NaN
    let result12 = parseInt();          // NaN
    let result13 = parseInt(undefined); // NaN
    let result14 = parseInt(null);      // NaN
    let result15 = parseInt('');        // NaN
    let result16 = parseInt('0');       // 0
    let result17 = parseInt([]);        // NaN
    let result18 = parseInt([1]);       // 1
    let result19 = parseInt(Infinity);  // Infinity
    let result20 = parseInt(0);         // 0
    let result201 = parseInt(3.0);     // 3
    let result202 = parseInt('3.0asd');// 3
    let result203 = parseInt('5asd');  // 5
    let result204 = parseInt('5.6asd');  // 5
    let result205 = parseInt(5.6);  // 5

    let result31 = '16'.toString('10');
    let result32 = '16'.toString('2');
    let result33 = '16'.toString('8');
}

{   // Number.prototype.toExponential   以指数表示法返回该数值字符串表示形式。
    /**
     *   numObj.toExponential(fractionDigits)
     *   fractionDigits: 可选。一个整数，用来指定小数点后有几位数字。默认情况下用尽可能多的位数来显示数字。小数点后以fractionDigits 提供的值来四舍五入
     *   如果 fractionDigits 太小或太大将会抛出RangeError。介于 0 和 20（包括20）之间的值不会引起 RangeError 。 执行环境也可以支持更大或更小范围。
     *   如果该方法在一个非数值类型对象上调用会抛出TypeError
     */
    let result1 = 3.5454125.toExponential(2);       // "3.55e+0"
    // let result2 = 35454125.toExponential(2);     // Uncaught SyntaxError: Invalid or unexpected token
    let result3 = 35454125 .toExponential(2);       // "3.55e+7"    对数值字面量使用 toExponential() 方法，且该数值没有小数点和指数时，应该在该数值与该方法之间隔开一个空格，以避免点号被解释为一个小数点。
    let result4 = 35454125..toExponential(2);       // "3.55e+7"    也可以使用两个点号调用该方法。建议用两个点，用空格的话格式化可能就没了
    let result5 = 354.54125.toExponential(2);        // "3.55e+2"

}
{   // Number.prototype.toFixed   使用定点表示法来格式化一个数值。。
    /**
     *   numObj.toFixed(digits)
     *   digits: 可选。小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。
     *   如果 digits 太小或太大将会抛出RangeError。介于 0 和 20（包括20）之间的值不会引起 RangeError 。 执行环境也可以支持更大或更小范围。
     *   如果该方法在一个非数值类型对象上调用会抛出TypeError
     *   必要时会用 0 来填充小数部分，以便小数部分有指定的位数
     *   如果数值大于 1e+21，该方法会简单调用 Number.prototype.toString()并返回一个指数记数法格式的字符串。
     *   返回一个数值的字符串表现形式，不使用指数记数法，而是在小数点后有 digits位数字
     */
    let num = 12345.6789;
    let result1 = num.toFixed();       // '12346'
    let result2 = num.toFixed(1);      // '12345.7'
    let result3 = num.toFixed(6);      // '12345.678900'
    let result4 = (1.23e+20).toFixed(2);    // '123000000000000000000.00'
    let result41 = (1.23e+21).toFixed(2);    // '1.23e+21'
    let result5 = (1.23e-10).toFixed(2);    // '0.00'
    let result6 = 2.34.toFixed(1);          // '2.3'
    let result7 = -2.34.toFixed(1);         // -2.3 （由于操作符优先级，负数不会返回字符串）
    let result8 = (-2.34).toFixed(1);       // '-2.3' （若用括号提高优先级，则返回字符串）
}
{   // Number.prototype.toLocaleString   使用定点表示法来格式化一个数值。
    /**
     *   numObj.toLocaleString([locales [, options]])
     *   新的 locales 和 options 参数让应用程序可以指定要进行格式转换的语言，并且定制函数的行为。
     *   在旧的实现中，会忽略 locales 和 options 参数，使用的语言环境和返回的字符串的形式完全取决于实现方式。
     *   在没有指定区域的基本使用时，返回使用默认的语言环境和默认选项格式化的字符串。
     */
    let num = 12345.6789;
    let result1 = num.toLocaleString();       // '12,345.679'
}
{   // Number.prototype.toPrecision   以指定的精度返回该数值对象的字符串表示
    /**
     *   numObj.toPrecision(precision)
     *   precision  可选。一个用来指定有效数个数的整数。
     *   如果忽略 precision 参数，则该方法表现类似于 Number.prototype.toString()。如果该参数是一个非整数值，将会向下舍入到最接近的整数。
     *   如果 precison 参数不在 1 和 100 （包括）之间，将会抛出一个 RangeError 。执行环境也可以支持更大或更小的范围。ECMA-262 只需要最多 21 位显示数字。
     */
    let num = 12345.6789;
    let result1 = num.toPrecision();       // '12345.6789'
    let result2 = num.toPrecision(3);       // '1.23e+4'
    let result3 = num.toPrecision(6);       // '12345.7'
    let result4 = num.toPrecision(12);       // '12345.6789000'
}
{   // Number.prototype.toString   返回指定 Number 对象的字符串表示形式。
    /**
     *   numObj.toString([radix])
     *   radix  可选。指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。
     *   如果radix 参数不在 2 到 36 之间，将会抛出一个 RangeError
     *   如果对象是负数，则会保留负号。即使radix是2时也是如此：返回的字符串包含一个负号（-）前缀和正数的二进制表示，不是 数值的二进制补码。
     *   进行数字到字符串的转换时，建议用小括号将要转换的目标括起来，防止出错。
     */
    let num = 12345.6789;
    let result1 = num.toString();           // '12345.6789'
    let result2 = num.toString(3);          // '121221020.200022220210021221222112'
    let result3 = num.toString(6);          // '133053.402350431451525'
    let result4 = num.toString(12);         // '7189.819180654b9'
    let result5 = (-num).toString(2);         // '-11000000111001.101011011100110001100011111100010100001'

}
{   // Number.prototype.valueOf   返回一个被 Number 对象包装的原始值。
    /**
     *   numObj.valueOf()
     */
    let num = new Number(10);               // Number {10}
    let result1 = num.valueOf();            // 10

}
