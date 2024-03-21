/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Promise.js
 * @Description:     Promise
 * @author: xiaowei
 * @date:   2019/6/14
 */

{   // 加法 (+)   法运算符的作用是数值求和，或者字符串拼接
    // Number + Number -> 数字相加
    1 + 2 // 3

    // Boolean + Number -> 数字相加
    true + 1 // 2

    // Boolean + Boolean -> 数字相加
    false + false // 0

    // Number + String -> 字符串连接
    5 + "foo" // "5foo"

    // String + Boolean -> 字符串连接
    "foo" + false // "foofalse"

    // String + String -> 字符串连接
    "foo" + "bar" // "foobar"
    let end
}

{   // 减法 (-)   减法运算符使两个操作数相减，结果是它们的差值。
    5 - 3 // 2
    3 - 5 // -2
    "foo" - 3 // NaN
    let end
}

{   // 除法 (/)   除法运算符的结果是操作数的商 ，左操作数是被除数，右操作数是除数。
    1.0 / 2.0  // 在 JavaScript 或 Java 中都返回 0.5

    2.0 / 0    // 在 JavaScript 中返回 Infinity
    2.0 / 0.0  // 同样返回 Infinity
    2.0 / -0.0 // 在 JavaScript 中返回 -Infinity
    let end
}

{   // 乘法 (*)   乘法运算符的结果是操作数的乘积。
    2 * 2; // 4
    -2 * 2 // -4
    Infinity * 0 // NaN
    Infinity * Infinity // Infinity
    "foo" * 2 // NaN
    let end
}

{   // 求余 (%)   求余运算符返回第一个操作数对第二个操作数的模，即 var1 对 var2 取模
    12 % 5; // 2
    -1 % 2 // -1
    NaN % 2 // NaN
    1 % 2 // 1
    2 % 3; // 2
    -4 % 2 // -0
    5.5 % 2 // 1.5
    let end
}

{   // 幂 (**)   幂运算符返回第一个操作数做底数，第二个操作数做指数的乘方,幂运算符是右结合的。a ** b ** c 等同于 a ** (b ** c)。
    // 在最新的 JavaScript（ES2016） 中，禁止使用带歧义的幂运算表达式。比如，底数前不能紧跟一元运算符（+/-/~/!/delete/void/typeof）
    2 ** 3 // 8
    3 ** 2 // 9
    3 ** 2.5 // 15.588457268119896
    10 ** -1 // 0.1
    NaN ** 2 // NaN

    2 ** 3 ** 2 // 512
    2 ** (3 ** 2); // 512
    (2 ** 3) ** 2 // 64
    let end
}

{   // 递增 (++)  递增运算符为其操作数增加1，返回一个数值。
    // 如果后置（postfix）使用，即运算符位于操作数的后面（如 x++），那么将会在递增前返回数值
    // 如果前置（prefix）使用，即运算符位于操作数的前面（如 ++x），那么将会在递增后返回数值。
    // 后置
    let x = 3;
    y = x++;
    // y = 3, x = 4

    // 前置
    let a = 2;
    b = ++a;
    // a = 3, b = 3
    let end
}

{   // 递减 (--)  递减运算符将其操作数减去1，并返回一个数值。
    // 如果后置使用（如 x--），则在递减前返回数值。
    // 如果前置使用（如 --x），则在递减后返回数值。
    // 后置
    let x = 3;
    y = x--; // y = 3, x = 2

    // 前置
    let a = 2;
    b = --a; // a = 1, b = 1
    let end
}

{   // 一元负号 (-) 一元负号运算符位于操作数前面，并转换操作数的符号。
    let x = 3;
    y = -x; // y = -3, x = 3
    let end
}

{   // 一元正号 (+) 一元正号运算符位于其操作数前面，计算其操作数的数值，如果操作数不是一个数值，会尝试将其转换成一个数值。
    /**
     *  尽管一元负号也能转换非数值类型，但是一元正号是转换其他对象到数值的最快方法，也是最推荐的做法，因为它不会对数值执行任何多余操作。
     *  它可以将字符串转换成整数和浮点数形式，也可以转换非字符串值 true，false 和 null。
     *  小数和十六进制格式字符串也可以转换成数值。
     *  负数形式字符串也可以转换成数值（对于十六进制不适用）。
     *  如果它不能解析一个值，则计算结果为 NaN
     */
    +3;     // 3
    +"3";   // 3
    +true;  // 1
    +false; // 0
    +null;  // 0
    +function (val) {
        return val;
    } //NaN
    let end
}

{   // 赋值(=)    简单的赋值运算符，把一个值赋给一个变量。为了把一个值赋给多个变量，可以以链式使用赋值运算符

    let x = y = z = 25  // // x, y and z are all 25
    let a = 21
    let end
}

{   // 加赋值(+=)  加赋值运算符把一个右值与一个变量相加，然后把相加的结果赋给该变量。两个操作数的类型决定了加赋值运算符的行为。算术相加或字符串连接都有可能。
    // Number + Number -> addition
    let foo = 'foo'
    let bar = 5
    let baz = true
    bar += 2 // 7

    // Boolean + Number -> addition
    baz += 1 // 2

    // Boolean + Boolean -> addition
    baz += false // 2

    // Number + String -> concatenation
    bar += 'foo' // "7foo"

    // String + Boolean -> concatenation
    foo += false // "foofalse"

    // String + String -> concatenation
    foo += 'bar' // "foofalsebar"
    let end
}

{   // 减赋值(-=)  减赋值运算符使一个变量减去右值，然后把结果赋给该变量。
    let bar = 5
    bar -= 2     // 3
    bar -= "foo" // NaN
    let end
}

{   // 乘赋值(*=)  乘赋值运算符使一个变量乘以右值，然后把相成的结果赋给该变量
    let bar = 5
    bar *= 2     // 10
    bar *= 'foo' // NaN
    let end
}

{   // 除赋值(/=)  除赋值运算符使一个变量除以右值，然后把结果赋给该变量
    let bar = 5
    bar /= 2     // 2.5
    bar /= "foo" // NaN
    bar /= 0     // Infinity
    let end
}

{   // 模赋值(%=)  模赋值运算符使一个变量除以右值，然后把余数赋给该变量
    let bar = 5

    bar %= 2     // 1
    bar %= 'foo' // NaN
    bar %= 0     // NaN
    let end
}

{   // 指数赋值(**=)  指数赋值运算符使一个变量为底数、以右值为指数的指数运算（乘方）结果赋给该变量
    let bar = 5

    bar **= 2     // 25
    bar **= 'foo' // NaN
    let end
}

{   // 左移赋值(<<=)  左移赋值运算符使变量向左移动指定位数的比特位，然后把结果赋给该变量
    let bar = 5; //  (00000000000000000000000000000101)
    bar <<= 2; // 20 (00000000000000000000000000010100)
    let end
}

{   // 右移赋值(>>=)  右移赋值运算符使变量向右移指定位数的比特位，然后把结果赋给该变量
    let bar = 5; //   (00000000000000000000000000000101)
    bar >>= 2;   // 1 (00000000000000000000000000000001)

    bar = -5; //    (-00000000000000000000000000000101)
    bar >>= 2;  // -2 (-00000000000000000000000000000010)
    let end
}

{   // 无符号右移赋值(>>>=)  无符号右移赋值运算符向右移动指定数量的比特位，然后把结果赋给变量。
    let bar = 5; //   (00000000000000000000000000000101)
    bar >>>= 2;  // 1 (00000000000000000000000000000001)

    bar = -5; // (-00000000000000000000000000000101)
    bar >>>= 2; // 1073741822 (00111111111111111111111111111110)
    let end
}

{   // 按位与赋值(&=)  按位与赋值运算符使用两个操作值的二进制表示，执行按位与运算，并把结果赋给变量
    let bar = 5;
    // 5:     00000000000000000000000000000101
    // 2:     00000000000000000000000000000010
    bar &= 2; // 0
    let end
}

{   // 按位异或赋值(^=)  按位异或赋值运算符使用两个操作值的二进制表示，执行二进制异或运算，并把结果赋给变量
    let bar = 5;
    bar ^= 2; // 7
    // 5: 00000000000000000000000000000101
    // 2: 00000000000000000000000000000010
    // -----------------------------------
    // 7: 00000000000000000000000000000111
    let end
}

{   // 按位或赋值(|=)  按位或赋值运算符使用两个操作值的二进制表示，执行按位或运算，并把结果赋给变量
    let bar = 5;
    bar |= 2; // 7
// 5: 00000000000000000000000000000101
// 2: 00000000000000000000000000000010
// -----------------------------------
// 7: 00000000000000000000000000000111
    let end
}

{   // 带有赋值运算符的左值, 当一个赋值运算符的左值包含有一个赋值运算符时，左值只会被求值一次
    let a = [1, 2, 3, 4]
    i = 0
    a[i++] += 5         // i 执行一次求值     a[i++] += 5 不等同于 a[i++] = a[i++] + 5
    a[i++] = a[i++] + 5 // i 执行两次求值     a = [6, 8, 3, 4]    左值最后求值
    let end
}

{   // 按位操作符    将其操作数（operands）当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值
    /**
     运算符                用法                描述
     按位与（ AND）        a & b        对于每一个比特位，只有两个操作数相应的比特位都是1时，结果才为1，否则为0。
     按位或（OR）        a | b        对于每一个比特位，当两个操作数相应的比特位至少有一个1时，结果为1，否则为0。
     按位异或（XOR）        a ^ b        对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。
     按位非（NOT）        ~ a            反转操作数的比特位，即0变成1，1变成0。
     左移（Left shift）    a << b        将 a 的二进制形式向左移 b (< 32) 比特位，右边用0填充。
     有符号右移            a >> b        将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位。
     无符号右移            a >>> b        将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充。
     */

    /**
     * 所有的按位操作符的操作数都会被转成补码（two's complement）形式的有符号32位整数。
     * 补码形式是指一个数的负对应值（negative counterpart）（如 5和-5）为数值的所有比特位反转后，再加1。
     * 反转比特位即该数值进行’非‘位运算，也即该数值的反码。例如下面为整数314的二进制编码：
     * 00000000000000000000000100111010
     * 下面编码 ~314，即 314 的反码：
     * 11111111111111111111111011000101
     * 最后，下面编码 -314，即 314 的反码再加1：
     * 11111111111111111111111011000110
     * 补码保证了当一个数是正数时，其最左的比特位是0，当一个数是负数时，其最左的比特位是1。因此，最左边的比特位被称为符号位（sign bit）。
     *
     * 0 (base 10) = 00000000000000000000000000000000 (base 2)
     * -1 (base 10) = 11111111111111111111111111111111 (base 2)
     * -2147483648 (base 10) = 10000000000000000000000000000000 (base 2)
     * 2147483647 (base 10) = 01111111111111111111111111111111 (base 2)
     * 数字-2147483648 和 2147483647 是32位有符号数字所能表示的最小和最大整数。
     */

    /**
     * 从概念上讲，按位逻辑操作符按遵守下面规则：
     * 操作数被转换成32位整数，用比特序列（0和1组成）表示。超过32位的数字会被丢弃。例如, 以下具有32位以上的整数将转换为32位整数:
     * 转换前: 11100110111110100000000000000110000000000001
     * 转换后:             10100000000000000110000000000001
     * 第一个操作数的每个比特位与第二个操作数的相应比特位匹配：第一位对应第一位，第二位对应第二位，以此类推。
     * 位运算符应用到每对比特位，结果是新的比特值。
     */
}

{   // & (按位与)
    /**
     9 (base 10) =      00000000000000000000000000001001 (base 2)
     14 (base 10) =     00000000000000000000000000001110 (base 2)
     14 & 9 (base 10) = 00000000000000000000000000001000 (base 2) = 8 (base 10)
     将任一数值 x 与 0 执行按位与操作，其结果都为 0。将任一数值 x 与 -1 执行按位与操作，其结果都为 x。
     */
}

{   // | (按位或)
    /**
     * 9 (base 10) =    00000000000000000000000000001001 (base 2)
     14 (base 10) =     00000000000000000000000000001110 (base 2)
     14 | 9 (base 10) = 00000000000000000000000000001111 (base 2) = 15 (base 10)
     将任一数值 x 与 0 进行按位或操作，其结果都是 x。将任一数值 x 与 -1 进行按位或操作，其结果都为 -1。
     */
}

{   // ^ (按位异或)
    /**
     * 9 (base 10) =    00000000000000000000000000001001 (base 2)
     14 (base 10) =     00000000000000000000000000001110 (base 2)
     14 ^ 9 (base 10) = 00000000000000000000000000000111 (base 2) = 7 (base 10)
     将任一数值 x 与 0 进行异或操作，其结果为 x。将任一数值 x 与 -1 进行异或操作，其结果为 ~x。
     */
}

{   // ~ (按位非)
    /**
     * 9 (base 10) =    00000000000000000000000000001001 (base 2)
     ~9 (base 10) =     11111111111111111111111111110110 (base 2) = -10 (base 10)
     对任一数值 x 进行按位非操作的结果为 -(x + 1)。例如，~5 结果为 -6。
     if (-1*str.indexOf('a') <= 0) 等价于 if (~str.indexOf('0'))
     */
}

{
    /**
     * 按位移动操作符有两个操作数：第一个是要被移动的数字，而第二个是要移动的长度。移动的方向根据操作符的不同而不同。
     * 按位移动会先将操作数转换为大端字节序顺序(big-endian order)的32位整数,并返回与左操作数相同类型的结果。右操作数应小于 32位，否则只有最低 5 个字节会被使用。
     *
     注：Big-Endian:高位字节排放在内存的低地址端，低位字节排放在内存的高地址端，
     又称为"高位编址"。
     Big-Endian是最直观的字节序：
     ①把内存地址从左到右按照由低到高的顺序写出；
     ②把值按照通常的高位到低位的顺序写出；
     ③两者对照，一个字节一个字节的填充进去。
     */
}

{   // << (左移)
    /**
     * 9 (base 10):     00000000000000000000000000001001 (base 2)
     9 << 2 (base 10):  00000000000000000000000000100100 (base 2) = 36 (base 10)
     */
}

{   // >> (有符号右移)
    // 该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧。由于新的最左侧的位总是和以前相同，符号位没有被改变。所以被称作“符号传播”。
    /**
     * -9 (base 10):    11111111111111111111111111110111 (base 2)
     -9 >> 2 (base 10): 11111111111111111111111111111101 (base 2) = -3 (base 10)
     */

}

{   // >>> (无符号右移)
    // 该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用0填充。因为符号位变成了 0，所以结果总是非负的。（译注：即便右移 0 个比特，结果也是非负的。）
    // 对于非负数，有符号右移和无符号右移总是返回相同的结果;但是对于负数却不尽相同
    /**
     * -9 (base 10):        11111111111111111111111111110111 (base 2)
     -9 >>> 2 (base 10):    00111111111111111111111111111101 (base 2) = 1073741821 (base 10)
     */
}

{   // 逗号操作符    对它的每个操作数求值（从左到右），并返回最后一个操作数的值。
    let x = 1;

    x = (x++, x);   // x=2

    x = (2, 3);     // x=3
    let end
}

{   // 相等(==)
    /**
     * 比较操作符会为两个不同类型的操作数转换类型，然后进行严格比较。
     * 当两个操作数都是对象时，JavaScript会比较其内部引用，当且仅当他们的引用指向内存中的相同对象（区域）时才相等，即他们在栈内存中的引用地址相同。
     */
}

{   // 不相等 (!=)
    /**
     * 不等操作符仅当操作数不相等时返回true，如果两操作数不是同一类型，JavaScript会尝试将其转为一个合适的类型，然后进行比较。
     * 如果两操作数为对象类型，JavaScript会比较其内部引用地址，仅当他们在内存中引用不同对象时不相等。
     */
}

{   // 一/严格相等 (===)    一致运算符不会进行类型转换，仅当操作数严格相等时返回true
    3 === 3   // true
    3 === '3' // false
    let end
}

{   // 不一致/严格不相等 (!==)
    3 !== '3' // true
    4 !== 3   // true
    let end
}

{   // 大于运算符 (>)    大于运算符仅当左操作数大于右操作数时返回true
}

{   // 大于等于运算符 (>=) 大于等于运算符当左操作数大于或等于右操作数时返回true
}

{   // 小于运算符 (<)    小于运算符仅当左操作数小于右操作数时返回true
}

{   // 小于等于运算符 (<=)     小于等于运算符当左操作数小于或等于右操作数时返回true
}

{
    /**
     * 当比较运算涉及类型转换时 (i.e., non–strict comparison), JavaScript 会按以下规则对字符串，数字，布尔或对象类型的操作数进行操作:
     * 当比较数字和字符串时，字符串会转换成数字值。 JavaScript 尝试将数字字面量转换为数字类型的值。 首先, 一个数学上的值会从数字字面量中衍生出来，然后这个值将被转为一个最接近的Number类型的值。
     * 如果其中一个操作数为布尔类型，那么布尔操作数如果为true，那么会转换为1，如果为false，会转换为整数0，即0。
     * 如果一个对象与数字或字符串相比较，JavaScript会尝试返回对象的默认值。操作符会尝试通过方法valueOf和toString将对象转换为其原始值（一个字符串或数字类型的值）。如果尝试转换失败，会产生一个运行时错误。
     * 注意：当且仅当与原始值比较时，对象会被转换为原始值。当两个操作数均为对象时，它们作为对象进行比较，仅当它们引用相同对象时返回true。
     * 注意: 字符串对象的类型是对象，不是字符串！字符串对象很少被使用，所以下面的结果也许会让你惊讶：
     */
}

{   // 条件（三元）运算符    condition ? expr1 : expr2
    // 多个三元操作符也是可能的（注：条件运算符是右结合）：
    let condition1
    let condition2
    let condition3
    let result
    if (condition1) {
        result = 1
    } else if (condition2) {
        result = 2
    } else if (condition3) {
        result = 3
    } else {
        result = 4
    }

    result = condition1 ? 1
        : condition2 ? 2
            : condition3 ? 3
                : 4

    // 这二者是一样的效果
    let end
}


{   // 解构赋值

    // 解构数组
    {   // 变量声明并赋值时的解构
        let foo = ["one", "two", "three"];
        let [one, two, three] = foo;
        let end
    }

    {   // 变量先声明后赋值时的解构
        let a, b;
        [a, b] = [1, 2];
        let end
    }

    {   // 默认值
        let a, b;
        [a = 5, b = 7] = [1];
        let end
    }

    {   // 交换变量
        let a = 1;
        let b = 3;
        [a, b] = [b, a];
        let end
    }

    {   // 解析一个从函数返回的数组
        function f() {
            return [1, 2];
        }

        let a, b;
        [a, b] = f();
        let end
    }

    {   // 忽略某些返回值
        function f() {
            return [1, 2, 3];
        }

        let [a, , b] = f();
        let end
    }

    {   // 将剩余数组赋值给一个变量
        let [a, ...b] = [1, 2, 3];  // 如果剩余元素右侧有逗号，会抛出 SyntaxError，因为剩余元素必须是数组的最后一个元素。
        let end
    }


    // 解构对象
    {   // 基本赋值
        let o = {p: 42, q: true};
        let {p, q} = o;
        let end
    }

    {   // 无声明赋值
        let a, b;
        ({a, b} = {a: 1, b: 2});    // 赋值语句周围的圆括号 ( ... ) 在使用对象字面量无声明解构赋值时是必须的。{a, b} = {a: 1, b: 2} 不是有效的独立语法，因为左边的 {a, b} 被认为是一个块而不是对象字面量。
        let end
    }

    {   // 给新的变量名赋值
        let o = {p: 42, q: true};
        let {p: foo, q: bar} = o;
        let end
    }

    {   // 默认值
        let {a = 10, b = 5} = {a: 3};
        let end
    }

    {   // 给新的变量命名并提供默认值
        let {a: aa = 10, b: bb = 5} = {a: 3};
        let end
    }

    {   // 函数参数默认值
        let {a = 10, b = 5} = {a: 3};
        let end
    }

    {   // 解构嵌套对象和数组
        const metadata = {
            title: 'Scratchpad',
            translations: [
                {
                    locale: 'de',
                    localization_tags: [],
                    last_edit: '2014-04-14T08:43:37',
                    url: '/de/docs/Tools/Scratchpad',
                    title: 'JavaScript-Umgebung'
                }
            ],
            url: '/en-US/docs/Tools/Scratchpad'
        };

        let {
            title: englishTitle, // rename
            translations: [
                {
                    title: localeTitle, // rename
                },
            ],
        } = metadata;
        let end
    }

    {   // For of 迭代和解构
        let people = [
            {
                name: 'Mike Smith',
                family: {
                    mother: 'Jane Smith',
                    father: 'Harry Smith',
                    sister: 'Samantha Smith'
                },
                age: 35
            },
            {
                name: 'Tom Jones',
                family: {
                    mother: 'Norah Jones',
                    father: 'Richard Jones',
                    brother: 'Howard Jones'
                },
                age: 25
            }
        ];

        for (let {name: n, family: {father: f}} of people) {
            console.log('Name: ' + n + ', Father: ' + f);
        }
        let end
    }

    {   // 从作为函数实参的对象中提取数据
        function whois({displayName: displayName, fullName: {firstName: name}}) {
            console.log(displayName + " is " + name);
        }

        let user = {
            id: 42,
            displayName: "jdoe",
            fullName: {
                firstName: "John",
                lastName: "Doe"
            }
        };

        whois(user); // "jdoe is John"
        let end
    }

    {   // 对象属性计算名和解构
        let key = "z";
        let {[key]: foo} = {z: "bar"};

        console.log(foo); // "bar"
        let end
    }

    {   // 对象解构中的 Rest
        let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
        a; // 10
        b; // 20
        rest; // { c: 30, d: 40 }
        let end
    }

    {   // 解构对象时会查找原型链（如果属性不在对象自身，将从原型链中查找
        // 声明对象 和 自身 self 属性
        let obj = {self: '123'};
        // 在原型链中定义一个属性 prot
        obj.__proto__.prot = '456';
        // test
        const {self, prot} = obj;
        // self "123"
        // prot "456"（访问到了原型链）
        let end
    }
    let end
}


{   // 逻辑表达式
    /** 短路计算
     由于逻辑表达式的运算顺序是从左到右，也可以用以下规则进行"短路"计算：
     (some falsy expression) && (expr) 短路计算的结果为假。
     (some truthy expression) || (expr) 短路计算的结果为真。
     短路意味着上述表达式中的expr部分不会被执行
     */

    // 将 AND 转换为 OR:  bCondition1 && bCondition2  总是等于 !(!bCondition1 || !bCondition2)
    // 将 OR 转换为 AND:  bCondition1 || bCondition2  总是等于 !(!bCondition1 && !bCondition2)
}


{   // 对象初始化

    {   // 扩展属性 ...和Object.assign都是浅拷贝
        let o1 = {a: {b: 12}, c: 21}
        let o2 = {...o1}
        let o3 = Object.assign({}, o1)
        o1.a == o2.a    // true
        o1.a == o3.a    // true
        let end
    }
}


{   // 运算符优先级

    {   // 关联性
        // a OP b OP c
        // 左关联（左到右）相当于把左边的子表达式加上小括号(a OP b) OP c
        // 右关联（右到左）相当于a OP (b OP c)
        // a = b = 5; 相当于a = (b = 5);
    }

/*

优先级	运算类型				关联性		运算符
20		圆括号				n/a（不相关）( … )
19		成员访问				从左到右		… . …
		需计算的成员访问		从左到右		… [ … ]
		new (带参数列表)		n/a	new 	… ( … )
		函数调用				从左到右		… ( … )
		可选链				从左到右		?.
18		new (无参数列表)		从右到左		new …
17		后置递增(运算符在后)	n/a 		… ++
		后置递减(运算符在后)				… --
16		逻辑非				从右到左		! …
		按位非							~ …
		一元加法							+ …
		一元减法							- …
		前置递增							++ …
		前置递减							-- …
		typeof							typeof …
		void							void …
		delete							delete …
		await							await …
15		幂					从右到左		… ** …
14		乘法					从左到右		… * …
		除法								… / …
		取模								… % …
13		加法					从左到右		… + …
		减法								… - …
12		按位左移				从左到右		… << …
		按位右移							… >> …
		无符号右移						… >>> …
11		小于					从左到右		… < …
		小于等于							… <= …
		大于 							… > …
		大于等于 						… >= …
		in								… in …
		instanceof			从左到右		… instanceof …
10		等号								… == …
		非等号							… != …
		全等号							… === …
		非全等号							… !== …
9		按位与				从左到右		… & …
8		按位异或				从左到右		… ^ …
7		按位或				从左到右		… | …
6		逻辑与				从左到右		… && …
5		逻辑或				从左到右		… || …
4		条件运算符			从右到左		… ? … : …
3		赋值					从右到左		… = …
										… += …
										… -= …
										… *= …
										… /= …
										… %= …
										… <<= …
										… >>= …
										… >>>= …
										… &= …
										… ^= …
										… |= …
2		yield				从右到左		yield …
		yield*							yield* …
1		展开运算符			n/a			... …
0		逗号					从左到右		… ,

*/
}


{   // 属性访问器
    {   // 如果对数字字面量使用方法，并且数字文字没有指数且没有小数点，请在方法调用之前的点之前留出空格，以防止点被解释为小数点。
        77 .toExponential();
// 或
        77
            .toExponential();
// 或
        (77).toExponential();
// 或
        77..toExponential();
// 或
        77.0.toExponential();
// 因为 77. === 77.0，没有歧义（no ambiguity）
    }
    let end
}


{   // 属性名称必须是字符串或符号 Symbol。这意味着非字符串对象不能用来作为一个对象属性的键。任何非字符串对象，包括 Number，都会通过 toString 方法，被转换成一个字符串。
    let object1 = {};
    object1['1'] = 'value';
    console.log(object1[1]);     // value   1被转为'1'

    let foo = {unique_prop: 1}, 
        bar = {unique_prop: 2},
        object2 = {};
    object2[foo] = 'value';      // foo被转化为字符串"[object Object]"
    console.log(object2[bar]);   // value    因为bar也被转化为"[object Object]"
    let end
}


{   // 展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；
    // 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开
    let o1 = {a: 1}
    let a1 = [4, 543, 3, 44]
    let o2 = {...o1}            // 浅拷贝，相当于Object.assign，但是Object.assign会触发 setters，而展开语法则不会
    let a2 = [...a1]        
    
    let f1 = function (...rest) {        
        console.log(rest)
    }
    f1(...a1) 
    // f1(...o1)        // TypeError: Found non-callable @@iterator 在数组或函数参数中使用展开语法时, 该语法只能用于 可迭代对象
    let end
}

{   // async function 关键字用来定义异步函数
    // await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
    /**
        await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。
        若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
        另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。
     */
    let p1 = function() {
        return new Promise(function(resolve, reject) {
            setTimeout(()=>{
                reject(111111)
            }, 200)
        }).then(res => {
            return 22222
        }).catch(e => {         // 如果没有catch，错误会在await处抛出
            return 44444
        })
    }

    let f1 = async function() {
        let a1 = await p1()     // 如果p1 resolve，则a1等于22222； 如果p1 reject,则a1等于44444
        console.log(a1)
    }
    f1()
    let end
}

{   
    class C1 {          // class声明的类也是局部作用域
        a  = 1
        constructor() {
        }
    }     
    let C2 = class {
    }

    function F1() {
    }
    F1.prototype.a = 1

    let o1 = new C1()
    let o2 = new F1()
    let end
}

{   /**
     delete操作符
        1. 与通常的看法不同，delete操作符与直接释放内存无关。内存管理 通过断开引用来间接完成的
        2. 对于所有情况都是true，除非属性是一个自己不可配置的属性，在这种情况下，非严格模式返回 false, 在严格模式下，会抛出Global_objects/SyntaxError
        3. 如果你试图删除的属性不存在，那么delete将不会起任何作用，但仍会返回true
        4. delete操作只会在自身的属性上起作用,不会删除原型链上的属性
        5. 任何使用 var 声明的属性不能从全局作用域或函数的作用域中删除，使用了 var，它会标记为不可配置。同样 let 或 const 也是不可配置的。
        6. 任何用let或const声明的属性不能够从它被声明的作用域中删除
        7. 不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式）
        8. 不可设置的(Non-configurable)属性不能被移除。这意味着像Math, Array, Object内置对象的属性以及使用Object.defineProperty()方法设置为不可设置的属性不能被删除。
    */
    (function(){
        var v1 = 1111
        let v2 = 222
        const v3 = 333
        v4 = 888
        function f1() {}
        let d1 = delete v1
        let d2 = delete v2
        let d3 = delete v3      // d1 d2 d3都是false，删除失败
        let d4 = delete v4      // d4为true, 删除成功，因为没有用var let const
    })()
}

{   /**
    in 操作符   prop in object
        1. prop  一个字符串类型或者 symbol 类型的属性名或者数组索引（非symbol类型将会强制转为字符串）
        2. objectName 检查它（或其原型链）是否包含具有指定名称的属性的对象
        3. in右操作数必须是一个对象值，否则会报错
        4. 对象中，对delete的属性使用in返回false，对赋值为undefined的属性使用in返回true
    */

    let a = 'aaa'
    let o1 = {aaa: 777}
    let r1 = a in o1
    // a in 'sadasd'       // TypeError: Cannot use 'in' operator to search for 'aaa' in sadasd

    let end = 3
}

{   // instanceof 运算符    object instanceof constructor
    // instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
    /**
     * 在浏览器中，我们的脚本可能需要在多个窗口之间进行交互。多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。这可能会引发一些问题。
     * 比如，表达式[] instanceof window.frames[0].Array 会返回 false，因为 Array.prototype !== window.frames[0].Array.prototype，并且数组从前者继承。
     * 
     *  */  
     
}


{   // new 操作符
    /** 
     *  new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
     *  1. 创建一个空的简单JavaScript对象（即{}）；
     *  2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
     *  3. 将步骤1新创建的对象作为this的上下文 ；
     *  4. 如果该函数没有返回对象，则返回this。
     * 
     * 
     * 当代码 new Foo(...) 执行时，会发生以下事情：
     * 1. 一个继承自 Foo.prototype 的新对象被创建。
     * 2. 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
     * 3. 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
     */

    let f1 = function() {
        this.a = 111
    }
    let o1 = new f1()           // 一般的构造函数不返回值，自动返回执行构造函数的this



    let f2 = function(a) {
        return {
            b: 2
        }
    }
    let o2 = new f2(444, 55)    // 构造函数返回对象，o2接收是这个对象，而不是运行构造函数的this



    let f3= function(a) {
        return a 
    }
    let o3 = new f3({           // 构造函数返回对象，o3是传给构造函数的对象
        c: 2343
    })
    let o4 = new f3()           // 构造函数返回不是对象，o4是指向f3.prototype的新对象


    
    let f4 = f1.bind({  
        aaa: 3444
    })
    let o5 = new f4()           // 指定了this的构造函数在new时，this被新建的对象替代
    let end 
}

{   // new.target
    /**
     * new.target语法由一个关键字"new"，一个点，和一个属性名"target"组成。通常"new."的作用是提供属性访问的上下文，但这里"new."其实不是一个真正的对象。
     * 不过在构造方法调用中，new.target指向被new调用的构造函数，所以"new."成为了一个虚拟上下文。
     * new.target属性适用于所有函数访问的元属性。在arrow functions 中，new.target 指向最近的外层函数的new.target
     */
    let a1 = new.target     // undefined
    
    let f1 = function () {
        let o = {}
        if (!new.target) {
            o.a = 111
        } else {
            o.a = 222
        }
        return o
    }
    let o1 = f1();      // o1.a = 111
    let o2 = new f1();  // o2.a = 222


    // 在类的构造方法中，new.target指向直接被new执行的构造函数。并且当一个父类构造方法在子类构造方法中被调用时，情况与之相同。
    class A {
        constructor() {
            let name = new.target.name
        }
    }
    
    class B extends A { constructor() { super(); } }
      
    let end 
}
{   // super关键字
    /**
     * super关键字用于访问和调用一个对象的父对象上的函数
     * super.prop和super[expr]表达式在类和对象字面量任何方法定义中都是有效的。
     */
    class c1 {
        constructor() {
            this.a = 111
        }

        b() {
            return this.a
        }
    }

    class c2 extends c1 {
        constructor () {
            super()     // 如果子类构造函数不调用super会报错，在调用super之前，this为undefined
        }
        
        superTest() {
            let a = super.a    // undefined 无法引用父对象的属性
            super.b()               // 可以调用父类的方法
            super.a = 222           // 当父类没有a这个方法时，super相当于this
            super.b = 333           // 父类有这个方法，但是也不能给父类方法赋值，这里super相当于this
            super.b = function() {  // 无法修改父类方法
            }
            super.b()               // 父类的方法没有被覆盖
            // delete super.as       // 不能使用super删除属性，将抛出异常ReferenceError: Unsupported reference to 'super'
        }
    }
    let o1 = new c1()
    let o2 = new c2()
    o2.superTest()
    let o3 = new c2()


    let obj1 = {
        a: 111,
        b() {
            return 8888
        }
    }
    let obj2 = {
        f1() {
            let a = super.a    // undefined 无法引用父对象的属性
            super.a = 222           // 当父类没有a这个方法时，super相当于this
            super.b = 333           // 父类有这个方法，但是也不能给父类方法赋值，这里super相当于this
            super.b = function() {  // 无法修改父类方法
            }
            return super.b()
        }
    }
    Object.setPrototypeOf(obj2, obj1)
    obj2.f1()

    let end 
}
{   // this  当前执行代码的环境对象，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值
    /**
     * 全局环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象
     * 函数（运行内）环境：在函数内部，this的值取决于函数被调用的方式
     * 作为对象的方法: 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。（getter 与 setter 中的 this指向属性所属的对象）
     * 作为构造函数： 它的this被绑定到正在构造的新对象
     * 作为一个DOM事件处理函数： 当函数被用作事件处理函数时，它的this指向触发事件的元素（一些浏览器在使用非addEventListener的函数动态添加监听函数时不遵守这个约定）。
     * 作为一个内联事件处理函数： 当代码被内联on-event 处理函数调用时，它的this指向监听器所在的DOM元素：<button onclick="alert(this.tagName.toLowerCase());">Show this</button>
     */

    function f1(){
        return this;
    }
    let r1 = f1()                // global, 简单调用, 严格模式下为undefined, 非严格模式为全局对象global、window
    let r2 = f1.call({a: 1})     // {a: 1}， call、apply指定this
    let r3 = f1.apply(2)         // Number对象，call、apply会将第一个参数转为对象
    let r4 = f1.apply()          // global， call、apply第一个参数为null、undefined时，this和简单调用时一样

    let f2 = f1.bind({a: 222})  
    let r5 = f2()                // {a: 222}
    let f3 = f1.bind({a: 333})  
    let r6 = f3()                // {a: 333} 原始的函数f1可以多次bind
    let f4 = f2.bind({a: 333})  
    let r7 = f4()                // {a: 222} bind的返回函数不能再bind
    let end
}
{   // typeof
    /**
     * typeof 操作符返回一个字符串，表示未经计算的操作数的类型。返回表示对象或原始值的表达式，其类型将被返回。
     *  类型	        结果
        Undefined	    "undefined"
        Null	        "object" (见下文)
        Boolean	        "boolean"
        Number	        "number"
        BigInt	        "bigint"
        String	        "string"
        Symbol (ECMAScript 2015 新增)	                 "symbol"
        宿主对象（由 JS 环境提供）	                         取决于具体实现
        Function 对象 (按照 ECMA-262 规范实现 [[Call]])	    "function"
        其他任何对象	  "object"
     */
    let end 
}
{   // void
    /**
     * void 运算符 对给定的表达式进行求值，然后返回 undefined。
     * 这个运算符能向期望一个表达式的值是undefined的地方插入会产生副作用的表达式。
     * void 运算符通常只用于获取 undefined的原始值，一般使用void(0)（等同于void 0）。在上述情况中，也可以使用全局变量undefined 来代替（假定其仍是默认值）。
     * 
     * JavaScript URIs
     * 当用户点击一个以 javascript: URI 时，它会执行URI中的代码，然后用返回的值替换页面内容，除非返回的值是undefined。void运算符可用于返回undefined。例如：
        <a href="javascript:void(0);">
        这个链接点击之后不会做任何事情，如果去掉 void()，
        点击之后整个页面会被替换成一个字符 0。
        </a>
        <p> chrome中即使<a href="javascript:0;">也没变化，firefox中会变成一个字符串0 </p>
        <a href="javascript:void(document.body.style.backgroundColor='green');">
        点击这个链接会让页面背景变成绿色。
        </a> 
     
     * 在箭头函数中避免泄漏
     * 箭头函数标准中，允许在函数体不使用括号来直接返回值。 如果右侧调用了一个原本没有返回值的函数，其返回值改变后，则会导致非预期的副作用。 
     * 安全起见，当函数返回值是一个不会被使用到的时候，应该使用 void 运算符，来确保返回 undefined（如下方示例），这样，当 API 改变时，并不会影响箭头函数的行为。
     * button.onclick = () => void doSomething();
     */

    let end 
}
{   // yield
    /**
     * yield 关键字用来暂停和恢复一个生成器函数（(function* 或遗留的生成器函数）。
     * [rv] = yield [expression];
     * expression: 定义通过迭代器协议从生成器函数返回的值。如果省略，则返回undefined。
     * rv: 返回传递给生成器的next()方法的可选值，以恢复其执行。
     * 
     * yield关键字使生成器函数执行暂停，yield关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。
     * yield关键字实际返回一个IteratorResult对象，它有两个属性，value和done。value属性是对yield表达式求值的结果，而done是false，表示生成器函数尚未完全完成
     * 如果将参数传递给生成器的next()方法，则该值将成为生成器当前yield操作返回的值。
     * 
     * 一旦遇到 yield 表达式，生成器的代码将被暂停运行，直到生成器的 next() 方法被调用。每次调用生成器的next()方法时，生成器都会恢复执行，直到达到以下某个值：
     * 1. yield，导致生成器再次暂停并返回生成器的新值。 下一次调用next()时，在yield之后紧接着的语句继续执行。
     * 2. throw用于从生成器中抛出异常。这让生成器完全停止执行，并在调用者中继续执行，正如通常情况下抛出异常一样。
     * 3. 到达生成器函数的结尾；在这种情况下，生成器的执行结束，并且IteratorResult给调用者返回undefined并且done为true。
     * 4. 到达return 语句。在这种情况下，生成器的执行结束，并将IteratorResult返回给调用者，其值是由return语句指定的，并且done 为true
     */

    let end 
}
{   // yield*
    /**
     *  yield* 表达式用于委托给另一个generator 或可迭代对象。
     * yield* [[expression]];
     * expression: 返回一个可迭代对象的表达式。
     * 
     * yield* 表达式迭代操作数，并产生它返回的每个值。
     * yield* 表达式本身的值是当迭代器关闭时返回的值（即done为true时）
     */

     // 以下代码中，g1() yield 出去的每个值都会在 g2() 的 next() 方法中返回，就像那些 yield 语句是写在 g2() 里一样。
     let g1 = function* () {
        yield 2;
        yield 3;
        yield 4;
      }
      
      let g2 = function* () {
        yield 1;
        yield* g1();
        yield 5;
      }
      
      let iterator = g2();
      console.log(iterator.next()); // { value: 1, done: false }
      console.log(iterator.next()); // { value: 2, done: false }
      console.log(iterator.next()); // { value: 3, done: false }
      console.log(iterator.next()); // { value: 4, done: false }
      console.log(iterator.next()); // { value: 5, done: false }
      console.log(iterator.next()); // { value: undefined, done: true }
    let end 
}