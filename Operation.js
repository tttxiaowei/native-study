/*
 * @Author: xiaowei
 * @Date: 2020-04-20 10:20:28
 * @LastEditors: xiaowei
 * @LastEditTime: 2020-04-20 17:14:57
 * @Description: js Operation
 */

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
{

    let end 
}
{

    let end 
}