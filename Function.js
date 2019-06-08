/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Function.js
 * @Description:     Function对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{   // 构造函数
    /*
    new Function ([arg1[, arg2[, ...argN]],] functionBody)
    使用Function构造器生成的Function对象是在函数创建时解析的。这比你使用函数声明或者函数表达式(function)并在你的代码中调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的。
    使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在全局作用域中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问Function构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 eval 不同。
    */
    let a = 12;
    // (new Function('b', 'c', 'return a'))();      // ReferenceError: a is not defined  并不会在创建它们的上下文中创建闭包
    // (Function('b', 'c', 'return a'))();          // ReferenceError: a is not defined  以调用函数的方式调用Function的构造函数 (不是用new关键字) 跟以构造函数来调用是一样的.
}
{   // 属性
    let f1 = function (a, b) {
        // f1.caller;              // 函数f是在全局作用域内被调用的,则f.caller为null,相反,如果一个函数是在另外一个函数作用域内被调用的,则f.caller指向调用它的那个函数.严格模式下不可用，    非标准
        // arguments.callee;       // 当前调用的函数，箭头函数中取不到arguments，严格模式下不可用
    }
    f1();
    f1.length;                  // 形参的数量, 不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
    f1.name;                    // 'f1'     非标准
}
{   // Function.prototype.apply
    /*
        func.apply(thisArg, [argsArray])    指定函数内的this对象，并且传一个参数数组
        使用 call 方法调用函数并且不指定第一个参数，this 的值将会被绑定为全局对象。在严格模式下，this 的值将会是 undefined
     */

    let array = ['a', 'b'];
    let elements = [0, 1, 2];
    array.push.apply(array, elements);  // 把一个数组转换为多个参数 在es6中可以这样写：array.push(...elements)

    var numbers = [5, 6, 2, 3, 7];
    var max = Math.max.apply(null, numbers);    /* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */
    var min = Math.min.apply(null, numbers);    // 对于这种需要多个参数，但现有数据却是数组的情况，apply格外好用，不过现在es6的...也可以达到这样的效果

    let f1 = function () {
        // console.log(this);
    };
    f1.apply();
    let end = 1;
}
{   // Function.prototype.call
    /*
        fun.call(thisArg, arg1, arg2, ...)    指定函数内的this对象，并且传一个参数列表
        该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组
        使用 call 方法调用函数并且不指定第一个参数，this 的值将会被绑定为全局对象。在严格模式下，this 的值将会是 undefined
     */

    let f1 = function () {
        // console.log(this);
    };
    f1.call();
}
{   // Function.prototype.bind
    /*
        function.bind(thisArg[, arg1[, arg2[, ...]]])   指定函数内的this对象，并且设置初始参数
        返回一个原函数的拷贝，并拥有指定的this值和初始参数。
        thisArg: 绑定的this参数，如果使用new运算符构造绑定函数，则忽略该值 。
        arg1, arg2, ...： 当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。
     */

    let f1 = function () {
        return [...arguments];
    };
    let f2 = f1.bind(1, 7, 8, 9);       // bind() 函数会创建一个新绑定函数, 有三个属性：[[TargetFunction]]包装的函数对象。[[BoundThis]] 在调用包装函数时始终作为this值传递的值。[[BoundArguments]]列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
    let a1 = f2(66);                    // [ 7, 8,  9,  66 ]
    let obj1 = new f2();                //  [7, 8,  9]  绑定函数也可以使用new运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的this值会被忽略，但前置参数仍会提供给模拟函数。
    let f3 = function () {
        let slice1 = Array.prototype.slice;
        slice1.apply(arguments);                // 将arguments转换为对象的apply写法

        let unboundSlice = Array.prototype.slice;
        let slice2 = Function.prototype.apply.bind(unboundSlice);
        slice2(arguments);      // 将arguments转换为对象的bind写法，不用每次都使用apply了

    }

}
{   // Function.prototype.toString
    /*
        function.toString()    返回表示函数源代码的一个字符串
        该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组
        使用 call 方法调用函数并且不指定第一个参数，this 的值将会被绑定为全局对象。在严格模式下，this 的值将会是 undefined
     */

    let f1 = function () {
        let a = 2134;
    };
    f1.toString();      // 源码字符串
    isNaN.toString();   // function isNaN() { [native code] }
    (function () {
    }).toString();      // function() {}
    (new Function('a', 'return a')).toString();         // function anonymous(a) { return a}.若是在由 Function 构造器生成的函数上调用 toString() ，则 toString() 返回创建后的函数源码，包括形参和函数体，函数名为 "anonymous"。

}
