/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  GeneratorFunction.js
 * @Description:    GeneratorFunction对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{   // 构造函数
    /**
     *  new GeneratorFunction ([arg1[, arg2[, ...argN]],] functionBody);
     *  GeneratorFunction并不是一个全局对象。它可以通过下面的代码获取。
     *  当创建函数时，将使用GeneratorFunction构造函数创建的生成器函数对象进行解析。这比使用function* 表达式 声明生成器函数效率更低，并且在代码中调用它，因为这些函数与其余的代码一起被解析。
     *  使用GeneratorFunction构造函数创建的生成器函数不会为其创建上下文创建闭包；它们始终在全局范围内创建。
     *  当运行它们时，它们只能访问自己的本地变量和全局变量，而不是从GeneratorFunction构造函数调用的范围的变量。这与使用eval与生成函数表达式的代码不同。
     *  原型指向Function
     *  生成Generator函数
     */
    let GeneratorFunction = Object.getPrototypeOf(function* () {
    }).constructor;

    let c = 213;
    let g = new GeneratorFunction('a', 'b', 'while(true){yield a}');        // 与Function类似，效率还低，只能访问本地作用域和全局作用于域，没有闭包
    let g1 = g(111);
    console.log(g1.next());     // { value: undefined, done: true }
    console.log(g1.next());     // { value: undefined, done: true }
}
