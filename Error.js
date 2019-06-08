/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Error.js
 * @Description:     Error对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{   // 构造函数
    /**
     * new Error([message [, fileName [, lineNumber ]]]);
     * message: 可选。人类可阅读的错误描述信息。
     * fileName: 可选。被创建的Error对象的fileName属性值。默认是调用Error构造器代码所在的文件 的名字。      非标准
     * lineNumber: 可选。被创建的Error对象的lineNumber属性值。默认是调用Error构造器代码所在的文件的行号。   非标准
     */
    let e1 = new Error('aaa', 'asdas', 1232);     // 只有message和stack属性，fileName和lineNumber没有效果
    let e2 = Error('aaa');                        // 用不用new都会生成Error对象
    let end = 1;
}
{   // 原型   全局Error对象自身不包含任何方法,但从原型链中继承了一些方法.
    let e1 = new Error('aaa');
    e1.name;            // 'Error'
    e1.constructor;     // Error构造函数
    e1.toString();      // 'Error: aaa'
}
{   // 自定义Error
    function MyError(msg) {
        this.name = 'MyError';
        this.message = msg || 'Default Message';
        this.stack = (new Error()).stack;
    }

    MyError.prototype = Object.create(Error.prototype);
    MyError.prototype.costructor = MyError;
    let e1 = new MyError('nnn');
}
{   // EvalError     本对象代表了一个关于 eval 函数的错误.此异常不再会被JavaScript抛出，但是EvalError对象仍然保持兼容性.
    let e1 = EvalError('asdasdas');      // EvalError对象
    e1.name;            // 'EvalError'
    e1.constructor;     // EvalError构造函数
    e1.toString();      // 'EvalError: asdasdas'
    e1 instanceof Error;// true  EvalError继承了Error
}
{   // RangeError      对象标明一个错误，当一个值不在其所允许的范围或者集合中。
    /* 试图传递一个number参数给一个范围内不包含该number的函数时则会引发RangeError。
    当传递一个不合法的length值作为Array 构造器的参数创建数组，
    或者传递错误值到数值计算方法（Number.toExponential()，Number.toFixed() ，Number.toPrecision()），会出现RangeError。.
     */
    let e1 = RangeError('asdasdas');      // RangeError对象
    e1.name;            // 'RangeError'
    e1.constructor;     // RangeError构造函数
    e1.toString();      // 'RangeError: asdasdas'
    e1 instanceof Error;// true  RangeError继承了Error
    // new Array(54444444444444444444444444444454444444444444);    // RangeError: Invalid array length
}
{   // SyntaxError       当Javascript语言解析代码时,Javascript引擎发现了不符合语法规范的tokens或token顺序时抛出SyntaxError。
    let e1 = SyntaxError('asdasdas');      // SyntaxError对象
    e1.name;            // 'SyntaxError'
    e1.constructor;     // SyntaxError构造函数
    e1.toString();      // 'SyntaxError: asdasdas'
    e1 instanceof Error;// true  SyntaxError继承了Error
    // eval('hoo bar');          // Uncaught SyntaxError: Unexpected identifier
}
{   // TypeError       当传入函数的操作数或参数的类型并非操作符或函数所预期的类型时，将抛出一个 TypeError 类型错误。
    let e1 = TypeError('asdasdas');      // TypeError对象
    e1.name;            // 'TypeError'
    e1.constructor;     // TypeError构造函数
    e1.toString();      // 'TypeError: asdasdas'
    e1 instanceof Error;// true  TypeError继承了Error
    // null.f();          // Uncaught TypeError: Cannot read property 'f' of null
}
{   // URIError       表示以一种错误的方式使用全局URI处理函数而产生的错误。当向全局 URI 处理函数传递一个不合法的URI时，URIError 错误会被抛出。
    let e1 = TypeError('asdasdas');      // URIError对象
    e1.name;            // 'URIError'
    e1.constructor;     // URIError构造函数
    e1.toString();      // 'URIError: asdasdas'
    e1 instanceof Error;// true  URIError继承了Error
    // decodeURIComponent('%');;          // Uncaught URIError: URI malformed
}