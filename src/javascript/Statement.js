/*
 * @Author: xiaowei
 * @Date: 2020-04-21 11:06:19
 * @LastEditors: xiaowei
 * @LastEditTime: 2020-05-09 18:05:20
 * @Description: Statements
 */

{   // async function
    /**
     * async function 用来定义一个返回 AsyncFunction 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。
     */

 /*    let f1 = function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(22222)
                resolve(3333)
                console.log(23231)
                // reject(3333)
            }, 2000)
        })
    }

    let f2 = async function() {
        console.log(1111)
        console.log(await f1())
        console.log(4444)
    }

    f2().catch(e => {
        console.log(e)
    })
    let end 
    
    */
}

{   // 块语句（或其他语言的复合语句）用于组合零个或多个语句。该块由一对大括号界定，可以是labelled：
    /**
     * 块声明: { StatementList }
     * 标记块声明: LabelIdentifier: { StatementList }
     */
    outer_block: {
        inner_block:{
            let a = 1
        }
        let a = 2
    }
    let end 
}

{   // break 语句中止当前循环，switch语句或label 语句，并把程序控制流转到紧接着被中止语句后面的语句。 
    /**
     * break语句包含一个可选的标签，可允许程序摆脱一个被标记的语句。break语句需要内嵌在引用的标签中。被标记的语句可以是任何 块语句；不一定是循环语句。
     * 
     * break [label];
     * label: 可选。与语句标签相关联的标识符。如果 break 语句不在一个循环或 switch 语句中，则该项是必须的
     */
 /* 
    outer_block:{
        inner_block:{
          console.log(1);
          break outer_block;    // break把程序控制流转到outer_block之后
          console.log(2);       // 不执行
        }
        console.log(3);         // 不执行
    }
    console.log(4)
    let end  
    */
}

{   // continue
    /**
     * continue 声明终止当前循环或标记循环的当前迭代中的语句执行，并在下一次迭代时继续执行循环。
     */
    
   /*  
    let i = 1
    let j = 1
    outer_block: while(i < 10){
        i++
        console.log ('a ' + i);    
        inner_block: while(j < 5){  
          console.log ('b ' + j);
          j++
          continue outer_block;     // continue把程序控制流转到outer_block的下一次循环
          console.log('d' + j)      // 不会执行
        }
        console.log ('c ' + i);     
    }

    let end  
    */
}


{   // const
    /**
     * 此声明创建一个常量，其作用域可以是全局或本地声明的块。 
     * 与var变量不同，全局常量不会变为窗口对象的属性。需要一个常数的初始化器；也就是说，您必须在声明的同一语句中指定它的值（这是有道理的，因为以后不能更改）。
     * const声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，其参数）
     */
    let end
}

{   // export 用于从模块中导出函数、对象或原始值，以便其他程序可以通过 import 语句使用它们。
    /**
     * 无论您是否声明，导出的模块都处于严格模式。 
     * export语句不能用在嵌入式脚本中。
     * 
     * 两种 exports 导出方式：
     * 1. 命名导出（每个模块包含任意数量）
     * 2. 默认导出（每个模块包含一个）
     * 
     
     // 导出单个特性
    export let name1, name2, …, nameN; // also var, const
    export let name1 = …, name2 = …, …, nameN; // also var, const
    export function FunctionName(){...}
    export class ClassName {...}

    // 导出列表
    export { name1, name2, …, nameN };

    // 重命名导出
    export { variable1 as name1, variable2 as name2, …, nameN };

    // 解构导出并重命名
    export const { name1, name2: bar } = o;

    // 默认导出
    export default expression;
    export default function (…) { … } // also class, function*
    export default function name1(…) { … } // also class, function*
    export { name1 as default, … };

    // Aggregating modules
    export * from …; // does not set the default export
    export * as name1 from …;
    export { name1, name2, …, nameN } from …;
    export { import1 as name1, import2 as name2, …, nameN } from …;
    export { default } from …;
     */
    

    let end 
}

{   // for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
    /**
     * 
     */
    let iterator = function() {
        let arr = this
        let target = arr.length
        let pos = 0
        return {
            next() {
                return {
                    value: arr[pos++] + 'aaa',
                    done: pos > target,
                }
            },
        }
    }
   /* 
    let aaa = [11, 22, 333]
    aaa[Symbol.iterator] = iterator
    for (let i of aaa) {
        console.log(i)
    }  
    */
    let end 
}

{  // for await...of
    /**
     * for await...of 语句会在异步或者同步可迭代对象上创建一个迭代循环，
     * 包括 String，Array，Array-like 对象（比如arguments 或者NodeList)，TypedArray，Map， Set和自定义的异步或者同步可迭代对象。
     * 其会调用自定义迭代钩子，并为每个不同属性的值执行语句。
     */

     function* asyncGenerator() {
        var i = 0;
        while (i < 3) {
          yield i++;
        }
    }

   /*  
    for(let num of asyncGenerator()) {
        console.log(num)
    } 
    // */
/* 
    (async function() {
        for await (num of asyncGenerator()) {
        console.log(num);
        }
    })();
 */
    let end 
}

{   // for...in
    /**
     * for...in语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性
     * for...in 循环以任意序迭代一个对象的属性（请参阅delete运算符，了解为什么不能依赖于迭代的表面有序性，至少在跨浏览器设置中）。
     * 如果一个属性在一次迭代中被修改，在稍后被访问，其在循环中的值是其在稍后时间的值。一个在被访问之前已经被删除的属性将不会在之后被访问。在迭代进行时被添加到对象的属性，可能在之后的迭代被访问，也可能被忽略。
     * 通常，在迭代过程中最好不要在对象上进行添加、修改或者删除属性的操作，除非是对当前正在被访问的属性。这里并不保证是否一个被添加的属性在迭代过程中会被访问到，不保证一个修改后的属性（除非是正在被访问的）会在修改前或者修改后被访问，不保证一个被删除的属性将会在它被删除之前被访问。
     */
    Object.prototype.aaa = 122         
    for (let k in {e: 32}) {
        // console.log(k)          // 原生属性Object、Array等的属性和方法都是不可枚举的，所以不会遍历到
    }
    let end 
}

{  // function
    /**
     * JavaScript 中的函数声明被提升到了函数定义。你可以在函数声明之前使用该函数。但是函数表达式不会被提升
     */

     test1()                        // 函数声明提升
    function test1() {} 

    // test2()                      // TypeError: test2 is not a function   不会提升
    var test2 = function() {}

    let end 
}

{  // function*
    /**
     * function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
     * 生成器函数在执行时能暂停，后面又能从暂停处继续执行。
     * 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （ iterator ）对象。
     * 当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
     * 生成器函数不能当构造器使用
     */
    function *gen1(){
        yield 10;
        x=yield 'foo';
        yield x;
    }
    let o1 = gen1();            // 生成器的迭代器对象
    // console.log(o1.next());     // {value: 10, done: false}     执行 yield 10，返回 10
    // console.log(o1.next());     // {value: "foo", done: false}  执行 yield 'foo'，返回 'foo'
    // console.log(o1.next(100));  // {value: 100, done: false}    将 100 赋给上一条 yield 'foo' 的左值，即执行 x=100，返回 100
    // console.log(o1.next());     // {value: undefined, done: true} 执行完毕，value 为 undefined，done 为 true

    let end 
}

{  // import
    /**
     * 静态的import 语句用于导入由另一个模块导出的绑定。无论是否声明了 strict mode ，导入的模块都运行在严格模式下。在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用
     * 此外，还有一个类似函数的动态 import()，它不需要依赖 type="module" 的script标签
     *  import defaultExport from "module-name";
        import * as name from "module-name";
        import { export } from "module-name";
        import { export as alias } from "module-name";
        import { export1 , export2 } from "module-name";
        import { foo , bar } from "module-name/path/to/specific/un-exported/file";
        import { export1 , export2 as alias2 , [...] } from "module-name";
        import defaultExport, { export [ , [...] ] } from "module-name";
        import defaultExport, * as name from "module-name";
        import "module-name";       // 整个模块仅为副作用（中性词，无贬义含义）而导入，而不导入模块中的任何内容（接口）。 这将运行模块中的全局代码, 但实际上不导入任何值。
        var promise = import("module-name");//这是一个处于第三阶段的提案。 以这种方式调用，将返回一个 promise。这种使用方式也支持 await 关键字。
     */

    let end 
}

{  // 标记语句 label
    /**
     * 标记语句可以和 break 或 continue 语句一起使用。标记就是在一条语句前面加个可以引用的标识符（identifier）。
     */
    let i, j;

    loop1:
    for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
       loop2:
       for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
          if (i === 1 && j === 1) {
             continue loop1;       // 当i=1，j=1时，loop2循环会停止，开始loop1的下一个循环
          }
        //   console.log('i = ' + i + ', j = ' + j);
       }
    }

    let end 
}

{   // throw
    /**
     * throw语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。
     */ 
    // throw 111
    let end 
}

{  // try...catch语句标记要尝试的语句块，并指定一个出现异常时抛出的响应。
    /**
     * try语句包含了由一个或者多个语句组成的try块, 和至少一个catch块或者一个finally块的其中一个，或者两个兼有， 下面是三种形式的try声明：
     * 1. try...catch
     * 2. try...finally
     * 3. try...catch...finally
     */

     try {
         throw 111
     } catch(e) {
        //  console.log(e)
     } finally {
     }
    let end 
}

{   // with
    /**
     * with语句 扩展一个语句的作用域链。
     * JavaScript查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的context或者包含这个变量的函数有关。
     * 'with'语句將某个对象添加到作用域链的顶部，如果在statement中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出ReferenceError异常
     * 利：with语句可以在不造成性能损失的情況下，减少变量的长度。其造成的附加计算量很少。使用'with'可以减少不必要的指针路径解析运算。需要注意的是，很多情況下，也可以不使用with语句，而是使用一个临时变量来保存指针，来达到同样的效果。
     * 弊：with语句使得程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，查找起来将会很慢。如果是在对性能要求较高的场合，'with'下面的statement语句中的变量，只应该包含这个指定对象的属性。
     */

     let o1 = {
         a: 222,
     }
     let d = 444
     with(o1) {
         let b = 333
        // console.log(a)      // 222，取o1.a
        // console.log(b)      // 333，取with中定义的变量
        // console.log(c)      // 报错，因为o1中没有c属性
        // console.log(d)      // 444，取with外定义的变量
     }

     // 弊端：with语句使得代码不易阅读，同时使得JavaScript编译器难以在作用域链上查找某个变量，难以决定应该在哪个对象上来取值。
     let f1 = function(x, o) {
        with (o) 
          print(x);     // 如果o上有x属性则取的是o.x，否则取得是第二个参数
      }

    // 弊端：使用with语句的代码，无法向前兼容，特別是在使用一些原生数据类型的时候。
    let f2 = function(arr, values) {
        with (arr) {
            console.log(values)     // es5中取第二个参数values，es6中取Array.prototype.values
        }
    }
    let end 
}

{  

    let end 
}

{  

    let end 
}

{  

    let end 
}

