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
}

{   // String.prototype.lastIndexOf()   返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。
    //str.lastIndexOf(searchValue[, fromIndex])   fromIndex: 从调用该方法字符串的此位置处开始查找。可以是任意整数。默认值为 str.length。如果为负值，则被看作 0。如果 fromIndex > str.length，则 fromIndex 被看作 str.length。
    let s1 = 'hello world'
    s1.lastIndexOf('world', 5)  // -1   从索引5往左搜索，已经找不到world的开头w了
    s1.lastIndexOf('world', 6)  // 6
    s1.lastIndexOf('world', 7)  // 6
}

{   // String.prototype.localeCompare()   返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
    /**
     * referenceStr.localeCompare(compareString[, locales[, options]])
     * referenceStr： 引用字符串
     * compareString： 比较字符串
     * locales：  用来表示一种或多种语言或区域的一个符合 BCP 47 标准的字符串或一个字符串数组
     * options： 支持下列的一些或全部属性的一个对象
     *
     * 当 引用字符串 在 比较字符串 前面时返回 负数
     * 当 引用字符串 在 比较字符串 后面时返回 正数
     * 相同位置时返回 0
     * 切勿依赖于 -1 或 1 这样特定的返回值。不同浏览器之间（以及不同浏览器版本之间） 返回的正负数的值各有不同，因为W3C规范中只要求返回值是正值和负值，而没有规定具体的值。一些浏览器可能返回-2或2或其他一些负的、正的值。
     *
     */

    'a'.localeCompare('c')      // -1
    'check'.localeCompare('against')   // 1
    'a'.localeCompare('a') // 0
}

{   // String.prototype.match()   返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
    /**
     * str.match(regexp)
     * regexp: 一个正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。如果你没有给出任何参数并直接使用match() 方法 ，你将会得到一 个包含空字符串的 Array ：[""] 。
     *
     * 返回值
     * 如果使用g标志，则将返回与完整正则表达式匹配的所有结果（Array），但不会返回捕获组，或者未匹配 null。
     * 如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性，或者未匹配 null。
     *
     * 附加属性
     * groups: 一个捕获组数组 或 undefined（如果没有定义命名捕获组）。
     * index: 匹配的结果的开始位置
     * input: 搜索的字符串.
     *
     * 如果你需要知道一个字符串是否与一个正则表达式匹配 RegExp ，可使用 test() 。
     * 如果你只是需要第一个匹配结果，你也可以使用 RegExp.exec() 。
     * 如果你想要获得捕获组，并且设置了全局标志，你需要用 RegExp.exec() 。
     */
    let s1 = 'a b c ab ac abc acb'
    let r1 = s1.match()         // [""]
    let r2 = s1.match('c')      // ['c']
    let r3 = s1.match(/ab/g)    // ['ab', 'ab']
    let r4 = s1.match(/(a)b/g)  // ['ab', 'ab']
    let r5 = s1.match(/(a)b/)   // ['ab', 'a']

    let s2 = 'a6b a7b aab abb'
    let re1 = /a(\w)b/g
    let re2 = /a(\w)b/g
    let re3 = /a(\w)b/

    let r6 = s2.match(re1)      // ['a6b', 'a7b', 'aab', 'abb']
    let r7 = s2.match(re1)      // ['a6b', 'a7b', 'aab', 'abb']

    let r8 = re2.exec(s2)       // ['a6b', '6']
    let r9 = re2.exec(s2)       // ['a7b', '7']
    let r10 = re2.exec(s2)      // ['aab', 'a']
    let r11 = re2.exec(s2)      // ['abb', 'b']
    let r12 = re2.exec(s2)      // null             lastIndex=15,所以没匹配到
    let r13 = re2.exec(s2)      // ['a6b', '6']


    let r14 = s2.match(re3)     // ['a6b', '6']
    let r15 = s2.match(re3)     // ['a6b', '6']

}

{   // String.prototype.matchAll()   返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。
    /**
     * str.matchAll(regexp)
     * regexp: 一个正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。如果你没有给出任何参数并直接使用match() 方法 ，你将会得到一 个包含空字符串的 Array ：[""] 。
     *
     * 返回值
     * 一个迭代器
     *
     * 在 matchAll 出现之前，通过在循环中调用regexp.exec来获取所有匹配项信息（regexp需使用/g标志：
     * 果使用matchAll ，就可以不必使用while循环加exec方式（且正则表达式需使用／g标志）。使用matchAll 会得到一个迭代器的返回值，配合 for...of, array spread, or Array.from() 可以更方便实现功能：
     */
    let s1 = 'a6b a7b aab abb'
    let re1 = /a(\w)b/g
    let i1 = s1.matchAll(re1)
    for (let v of i1) {
        // console.log(v)       // ['a6b', '6'], ['a7b', '7'], ['aab', 'a'], ['abb', 'b']
    }
}

{   // String.prototype.normalize()   按照指定的一种 Unicode 正规形式将当前字符串正规化.
    /**
     * str.normalize([form]);
     *
     * form
     * 四种 Unicode 正规形式 "NFC", "NFD", "NFKC", 以及 "NFKD" 其中的一个, 默认值为 "NFC".
     * NFC - Normalization Form Canonical Composition.
     * NFD - Normalization Form Canonical Decomposition.
     * NFKC - Normalization Form Compatibility Composition.
     * NFKD - Normalization Form Compatibility Decomposition.
     *
     * RangeError: 如果给 form 传入了非法的参数值, 则会抛出 RangeError 异常.
     */
    let s1 = '\u1E9B\u0323'
    s1.normalize()          // ẛ̣
    s1.normalize('NFC')     // ẛ̣
    s1.normalize('NFD')     // ẛ̣
    s1.normalize('NFKC')    // ṩ
    s1.normalize('NFKD')    // ṩ
    // s1.normalize('NFaKD')    // RangeError
}


{   // String.prototype.padEnd()   用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
    /**
     * str.padEnd(targetLength [, padString])
     * targetLength: 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
     * padString: 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "
     *
     * 返回值：返回在原字符串末尾填充指定的填充字符串直到目标长度所形成的新字符串。不修改原字符串
     */
    let s1 = "abc"
    let s2 = s1.padEnd(10, 0)       // abc0000000
    let s3 = s1.padEnd(2, 0)        // abc
    let s4 = s1.padEnd(4, '1234')   // abc1
}

{   // String.prototype.padStart()   用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。
    /**
     * str.padStart(targetLength [, padString])
     * targetLength: 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
     * padString: 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "
     *
     * 返回值：返回在原字符串末尾填充指定的填充字符串直到目标长度所形成的新字符串。不修改原字符串
     */
    let s1 = "abc"
    let s2 = s1.padStart(10, 0)       // 0000000abc
    let s3 = s1.padStart(2, 0)        // abc
    let s4 = s1.padStart(4, '1234')   // 1abc
}

{   // String.prototype.repeat()   构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
    /**
     * str.repeat(count)
     * 返回包含指定字符串的指定数量副本的新字符串
     * RangeError: 重复次数不能为负数。
     * RangeError: 重复次数必须小于 infinity，且长度不会大于最长的字符串。
     */
    let s1 = "abc"
    s1.repeat(0)      // ""
    s1.repeat(1)      // "abc"
    s1.repeat(2);      // "abcabc"

    // ([1, 3, 6, 54]).repeat(2)   // ncaught TypeError: [1,3,6,54].repeat is not a function
    ({toString: () => "abc", repeat: String.prototype.repeat}).repeat(2)  // 'abcabc'    ,repeat是一个通用方法,也就是它的调用者可以不是一个字符串对象.
}

{   // String.prototype.replace()   返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。
    /**
     * str.replace(regexp|substr, newSubStr|function)
     * regexp： 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
     *
     * substr： 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
     *
     * newSubStr： 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。替换字符串可以插入下面的特殊变量名：
     * $$    插入一个 "$"。
     * $&    插入匹配的子串。
     * $`    插入当前匹配的子串左边的内容。
     * $'    插入当前匹配的子串右边的内容。
     * $n   假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始
     *
     * function： 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果
     * 当匹配执行后，该函数就会执行。 函数的返回值作为替换字符串。 (注意：上面提到的特殊替换参数在这里不能被使用。)
     * 另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。下面是该函数的参数：
     * match        匹配的子串。（对应于上述的$&。）
     * p1,p2, ...   假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。
     * offset       匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）
     * string       被匹配的原字符串。
     * NamedCaptureGroup    命名捕获组匹配的对象
     */
    function replacer(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return [p1, p2, p3].join(' - ')
    }

    let newString = 'abc12345#$*%abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer)      // abc - 12345 - #$*%abc12345#$*%
}

{   // String.prototype.search()   执行正则表达式和 String 对象之间的一个搜索匹配
    /**
     * str.search(regexp)
     * regexp： 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
     *
     * 如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。
     */
    let s1 = 'aaasss'
    s1.search('as')     // 2
}

{   // String.prototype.slice()   提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
    /**
     * str.slice(beginIndex[, endIndex])
     * beginIndex:从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如， 如果 beginIndex 是 -3 则看作是：strLength - 3）
     * endIndex: 可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。
     */
    let s1 = 'aaasss'
    s1.slice(1, -1)     // 'aass'
    let end = 1
}

{   // String.prototype.split()   使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置
    /**
     * str.split([separator[, limit]])
     * separator: 指定表示每个拆分应发生的点的字符串。separator 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将str原字符串中每个字符的数组形式返回。
     * limit: 一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。
     */
    let s1 = 'abcabcbcdbcd'
    s1.split()          // [abcabcbcdbcd]
    s1.split('')        // ["a","b", "c", "a", "b", "c", "b", "c", "d", "b", "c", "d"]
    s1.split('bc')      // ["a","a", "", "d", "d"]
    s1.split(/c\w/)     // ["ab", "b", "", "b", ""]
    s1.split(/c\w/, 2)  // ["ab", "b"]
    s1.split(/c\w/, 8)  // ["ab", "b", "", "b", ""]
}

{   // String.prototype.startsWith()   方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
    /**
     * str.startsWith(searchString[, position])
     * searchString: 要搜索的子字符串。
     * position: 可选,在 str 中搜索 searchString 的开始位置，默认值为 0，也就是真正的字符串开头处。
     */
    let s1 = 'abcabcbcdbcd'
    s1.startsWith('a')      // true
    s1.startsWith('b')      // false
    s1.startsWith('b', 1)   // true
}

{   // String.prototype.substring()  返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
    /**
     * str.substring(indexStart[, indexEnd])
     * substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。特别地：
     * 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
     * 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
     * 如果任一参数小于 0 或为 NaN，则被当作 0。
     * 如果任一参数大于 stringName.length，则被当作 stringName.length。
     * 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。见下面的例子。
     */
    let s1 = 'abcabcbcd'
    let r11 = s1.substring()        // abcabcbcd
    let r12 = s1.slice()            // abcabcbcd

    let r21 = s1.substring(1, 1)        // ''
    let r22 = s1.slice(1, 1)            // ''

    let r31 = s1.substring(1)        // bcabcbcd
    let r32 = s1.slice(1)            // bcabcbcd

    let r41 = s1.substring(-2)        // abcabcbcd
    let r42 = s1.slice(-2)            // cd

    let r51 = s1.substring(12)        // ''
    let r52 = s1.slice(12)            // ''

    let r61 = s1.substring(5, 3)        // ab
    let r62 = s1.slice(5, 3)            // ''

}

{   // String.prototype.toLocaleLowerCase()  根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。
    /**
     * str.toLocaleLowerCase()
     * toLocaleLowerCase()方法返回调用该方法的字符串被转换成小写之后的值，转换规则根据任何本地化特定的大小写映射。
     * toLocaleLowerCase()并不会影响字符串自身的值。
     * 在大多数情况下，该方法产生的结果和调用toLowerCase()的结果相同，但是在某些本地环境中，比如土耳其语，它的大小写映射并不遵循在Unicode中的默认的大小写映射，因此会有一个不同的结果。
     */
    let s1 = 'ADAS'
    s1.toLocaleLowerCase()
}

{   // String.prototype.toLocaleUpperCase()  根据任何特定于语言环境的案例映射，返回调用字符串值转换为大写的值。
    /**
     * str.toLocaleUpperCase()
     */
    let s1 = 'adas'
    s1.toLocaleUpperCase()  // 'ADAS'
}

{   // String.prototype.toLowerCase()  会将调用该方法的字符串值转为小写形式，并返回。
    /**
     * str.toLowerCase()
     * toLowerCase 会将调用该方法的字符串值转为小写形式，并返回。toLowerCase 不会影响字符串本身的值。
     */
    let s1 = 'ADAS'
    s1.toLowerCase()    // 'adas'
}

{   // String.prototype.toUpperCase()  会将调用该方法的字符串值转为大写形式，并返回。
    /**
     * str.toUpperCase()
     */
    let s1 = 'adas'
    s1.toUpperCase()    // 'ADAS'
}

{   // String.prototype.toString()  返回指定对象的字符串形式。
    /**
     * str.toString()
     */
    let s1 = new String('adas')
    s1.toString()    // 'adas'
}

{   // String.prototype.trim()  从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。
    /**
     * str.trim()
     */
    ' as a  '.trim()        // 'asa a'
    ' as a \n '.trim()      // 'asa a'
    ' as a \r '.trim()      // 'asa a'
    ' as a \n\r '.trim()    // 'asa a'
    let end = 12
}

{   // String.prototype.trimRight()  从一个字符串的右端移除空白字符。
    /**
     * str.trim()
     * 为了与 String.prototype.padEnd 等函数保持一致，标准方法名称为trimEnd。 但是，出于Web兼容性原因，trimRight仍然是trimEnd的别名
     */
    ' as a  '.trimRight()        // ' asa a'
    ' as a \n '.trimRight()      // ' asa a'
    ' as a \r '.trimRight()      // ' asa a'
    ' as a \n\r '.trimRight()    // ' asa a'
    String.prototype.trimRight.name === "trimEnd"   // true
}

{   // String.prototype.trimLeft()  从一个字符串的右端移除空白字符。
    /**
     * str.trim()
     * 为了与 String.prototype.padStart 等函数保持一致，标准方法名称为trimStart。 但是，出于Web兼容性原因，trimLeft仍然是trimStart的别名
     */
    ' as a '.trimLeft()        // 'asa a '
    ' \n as a '.trimLeft()      // 'asa a '
    ' \r as a '.trimLeft()      // 'asa a '
    ' \n\r as a '.trimLeft()    // 'asa a '
    String.prototype.trimLeft.name === "trimStart"   // true
    let end = 12
}

{   // String.prototype.valueOf()  返回一个String对象的原始值
    /**
     * str.valueOf()
     * String 对象的 valueOf 方法返回一个String对象的原始值。该值等同于String.prototype.toString()。
     */
    ' as a '.valueOf()        // ' asa a '
}

{   // String.prototype.[@@iterator]()  返回一个String对象的原始值
    /**
     * string[Symbol.iterator]
     * 返回一个新的Iterator对象。
     */
    let i1 = 'abcd'[Symbol.iterator]()
    for (let v of i1) {
        // console.log(v)
    }
}

{   // String.raw()   是一个模板字符串的标签函数
    /**
     * String.raw(callSite, ...substitutions)
     * String.raw`templateString`
     * callSite： 一个模板字符串的“调用点对象”。类似{ raw: ['foo', 'bar', 'baz'] }。
     * ...substitutions：     任意个可选的参数，表示任意个内插表达式对应的值。
     * templateString：     模板字符串，可包含占位符（${...}）。
     *
     * 在大多数情况下, String.raw()是用来处理模版字符串的
     * String.raw() 是唯一一个内置的模板字符串标签函数，因为它太常用了
     */
    let s1 = String.raw`Hi\n${2 + 3}!`      // Hi\n5!       Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符
    let s2 = `Hi\n${2 + 3}!`                // Hi\n5!
    let s3 = 'Hi\n!'                        // Hi\n!
    let s4 = String.raw`Hi\u000A!`          // Hi\u000A!    任何类型的转义形式都会失效，保留原样输出

    // 正常情况下，你也许不需要将 String.raw() 当作函数调用。但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
    String.raw({raw: 'test'}, 0, 1, 2); // 't0e1s2t'
    // 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
    String.raw({
        raw: ['foo', 'bar', 'baz']
    }, 2 + 3, 'Java' + 'Script');   // 'foo5barJavaScriptbaz'
    let end = 12
}































