/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  RegExp.js
 * @Description:    RegExp
 * @author: xiaowei
 * @date:   2019/7/4
 */
/*
字面量: /pattern/flags
构造函数: new RegExp(pattern [, flags])
工厂符号: RegExp(pattern [, flags])

pattern: 正则表达式的文本。
flags:
    g: 全局匹配;找到所有匹配，而不是在第一个匹配后停止
    i: 忽略大小写
    m: 多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
    u: Unicode; 将模式视为Unicode序列点的序列
    y: 粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。
       y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
       实际上，y修饰符号隐含了头部匹配的标志^。y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
    s: 使得.可以匹配任意单个字符,包括四个字节的 UTF-16 字符、行终止符
 */
{
    let r1 = new RegExp('\\w', 'g');
    let m1 = r1.exec('sdfaadfasdfwq');

    let r2 = new RegExp(r1);
    let m2 = r1.exec('sdfaadfasdfwq');

    let r3 = /(\S+) line\n?/y;
    let m3 = r3.exec("First line\nsecond line");
    m3 = r3.exec("First line\nsecond line");


    let str = '#fooa#';
    let regex = /foo/y;
    regex.test(str);        // false
    regex.lastIndex = 1;
    regex.test(str);        // true
    regex.test(str);        // false
    regex.lastIndex = 2;
    regex.test(str);        // false
    regex.test(str);        // false
    'a1a2aa3'.match(/a\d/y);     // ["a1"]    单单一个y修饰符对match方法，只能返回第一个匹配
    'a1a2aa3'.match(/a\d/g);     // ["a1", "a2", "a3"]
    'a1a2aa3'.match(/a\d/gy);    // ["a1", "a2"]
}
{   // RegExp.prototype.dotAll 属性表明是否在正则表达式中使用"s"修饰符
    /asd/.dotAll;     // false
    /asd/s.dotAll;    // true
}
{   // RegExp.prototype.flags 属性返回一个字符串，由当前正则表达式对象的标志组成。
    /asd/.flags;    // ''
    /asd/s.flags;   // 's'
    /asd/sg.flags;  // "gs"
}
{   // RegExp.prototype.ignoreCase 属性表明是否在正则表达式中使用"i"修饰符
    /asd/.ignoreCase;     // false
    /asd/i.ignoreCase;    // true
}
{   // RegExp.prototype.multiline  属性表明是否在正则表达式中使用"m"修饰符
    /asd/.ignoreCase;     // false
    /asd/m.ignoreCase;    // true
}
{   // RegExp.prototype.unicode   属性表明是否在正则表达式中使用"u"修饰符
    /asd/.unicode;     // false
    /asd/u.unicode;    // true
}
{   // RegExp.prototype.sticky   属性表明是否在正则表达式中使用"y"修饰符
    /asd/.sticky;     // false
    /asd/y.sticky;    // true

}
{   // RegExp.prototype.source  属性返回一个值为当前正则表达式对象的模式文本的字符串，该字符串不会包含正则字面量两边的斜杠以及任何的标志字符。
    /asd/.source;       // 'asd'
    /asd/mg.source;     // 'asd'    丢失修饰符
    /a\s\\.sd/mg.source;            // 'a\s\\.sd'
    new RegExp('a\s\\.sd'); // /as\.sd/  就算没有修饰符，从source新建的正则也可能与原正则不同
}
{   // regexp.lastIndex lastIndex 是正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引
    /**只有正则表达式使用了表示全局检索的 "g", "y" 标志时，该属性才会起作用。此时应用下面的规则：
     如果 lastIndex 大于字符串的长度，则 regexp.test 和 regexp.exec 将会匹配失败，然后 lastIndex 被设置为 0。
     如果 lastIndex 等于字符串的长度，且该正则表达式匹配空字符串，则该正则表达式匹配从 lastIndex 开始的字符串。（then the regular expression matches input starting at lastIndex.）
     如果 lastIndex 等于字符串的长度，且该正则表达式不匹配空字符串 ，则该正则表达式不匹配字符串，lastIndex 被设置为 0.。
     否则，lastIndex 被设置为紧随最近一次成功匹配的下一个位置。
     */
    let r1 = /a/g;
    let s1 = 'asd1adqqaadd';
    r1.lastIndex;   // 0
    r1.exec(s1);
    r1.lastIndex;   // 1
    r1.exec(s1);
    r1.lastIndex;   // 5
    r1.exec(s1);
    r1.lastIndex;   // 9
    r1.exec(s1);
    r1.lastIndex;   // 10
    r1.exec(s1);
    r1.lastIndex;   // 0
}

{   // RegExp.prototype.exec  在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
    // 如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。
    // 如果匹配失败，exec() 方法返回 null。
    let re = /quick\s(brown).+?(jumps)/ig;
    let result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
    /**
     *  result: Array[3]
     *  0: Quick Brown Fox Jumps
     *  1: Brown
     *  2: Jumps
     *  index: 4        匹配到的字符位于原始字符串的基于0的索引值
     *  input: 'The Quick Brown Fox Jumps Over The Lazy Dog'    原始字符串
     *  length: 3
     */
}

{   //  RegExp.prototype.toString 返回一个表示该正则表达式的字符串。
    /a\s\\.sd/mg.toString();            // "/a\s\\.sd/gm"
    new RegExp("/a\s\\.sd/gm"); // //as\.sd/gm/     从toString得到的字符串不一定能得到原正则
}

{   //  RegExp.prototype[@@matchAll] 返回对字符串使用正则表达式的所有匹配项(RegExpStringIterator, 一个iterator遍历器)，本方法在String.prototype.matchAll()中被内部调用
    let iterator1 = /a/g[Symbol.matchAll]('asdaf');     // RegExpStringIterator 
    for (let m of iterator1) {
        // console.log(m)
    }

    let iterator2 = /a/g[Symbol.matchAll]('99999');     // RegExpStringIterator 没有匹配到也返回iterator
}
{   // RegExp.prototype[@@match] 用于获取匹配结果。本方法在String.prototype.match()中被内部调用
    // match 方法会返回一个数组，它包括整个匹配结果，和通过捕获组匹配到的结果，如果没有匹配到则返回null
    let iterator1 = /a/g[Symbol.match]('asdaf');    // ['a', 'a']
    let iterator2 = /a/g[Symbol.match]('99999');     // null 没有匹配到也返回iterator
}
{   // RegExp.prototype[@@replace] 会在一个字符串中用给定的替换器，替换所有符合正则模式的匹配项，并返回替换后的新字符串结果。用来替换的参数可以是一个字符串或是一个针对每次匹配的回调函数。.
    // 如果匹配模式也是RegExp对象，本方法在String.prototype.replace()中被内部调用
    // regexp[Symbol.replace](str, newSubStr|function)
    // replace 方法会返回用替换器替换相应匹配项后的新字符串
    let s1 = 'a77asx98a6ssd54v3vv';
    let r1 = /[a-z](\d)[a-z]/g;
    let s2 = r1[Symbol.replace](s1, '+');       // 'a77asx98+sd54+v'
    let s3 = r1[Symbol.replace](s1, '$1');      // 'a77asx986sd543v'
    let s4 = r1[Symbol.replace](s1, (...args) => {  // args: (match, p1,p1..., offset, string)  ['a6s', '6', 8, 'a77asx986sd543v']
        let a = 12;
    });         // s4 = ’a77asx98undefinedsd54undefinedv'
}

{   // RegExp.prototype[@@search] 执行了一个在给定字符串中的一个搜索以取得匹配正则模式的项。本方法在String.prototype.search()中被内部调用
    // regexp[Symbol.search](str)
    // 如果成功的话，[@@search]() 返回该正则模式的第一个匹配项的在字符串中的位置索引。否则将返回-1。
    let s1 = 'a77asx98a6ssd54v3vv';
    let r1 = /[a-z](\d)[a-z]/g;
    let s2 = r1[Symbol.search](s1);       // 8
}

{   // RegExp.prototype[@@split] 切割 String 对象为一个其子字符串的数组。
    // 如果切割器是一个RegExp对象，本方法在String.prototype.split()中被内部调用
    // regexp[Symbol.split](str[, limit])
    // 返回包含其子字符串的Array
    let s1 = 'a77asx98a6ssd54v3vv';
    let r1 = /[a-z](\d)[a-z]/g;
    let a1 = r1[Symbol.split](s1);       // ['a77asx98', '6', 'sd54', '3', 'v']  如果包含捕获括号，则其匹配结果将会包含在返回的数组中。
}

