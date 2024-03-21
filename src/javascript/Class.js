/*
 * @Author: xiaowei
 * @Date: 2020-05-11 11:23:35
 * @LastEditors: xiaowei
 * @LastEditTime: 2020-05-12 11:19:00
 * @Description: Class
 */

{   // 静态公有字段
    /**
     * 静态公有字段在你想要创建一个只在每个类里面只存在一份，而不会存在于你创建的每个类的实例中的属性时可以用到。
     * 你可以用它存放缓存数据、固定结构数据或者其他你不想在所有实例都复制一份的数据。
     * 
     * 静态公有字段是使用关键字 static 声明的。
     * 我们在声明一个类的时候，使用Object.defineProperty方法将静态公有字段添加到类的构造函数中。
     * 在类被声明之后，可以从类的构造函数访问静态公有字段。
     */

    class C1 {
        static s1 = 1
        static s2
        static s3 = this.f1()       // 静态属性初始化时this指向C1，可以调用静态方法
        // static s4 = this.f2()    // 普通方法不能在在这里调用   TypeError: undefined is not a function

        static f1() {
            return 111
        }
        f2() {
            return 222
        }
    }
    // console.log(C1.s1);     // 1
    // console.log(C1.s2);     // undefined
    // console.log(C1.hasOwnProperty('s1'));     // true  静态公有字段是定义在C1自身上的，而不是C1.prototype上
    let o1 = new C1()       
    // console.log(o1.s1);     // undefined   实例没有继承静态公有字段

    class C2 extends C1 {
        static s4 = super.f1()      // 初始化时supper指向父类C1自身
    }
    // console.log(C2.s1)          // 1
    // console.log(C2.hasOwnProperty('s1'))            // false C2自身没有新的s1属性，可以通过原型访问到C1.s1
    // console.log(C2.__proto__.hasOwnProperty('s1'))  // true 
    let o2 = new C2()
    // console.log(o2.s1)          // undefined

    let end
}

{   // 公有实例字段
    /**
     * 公有实例字段存在于类的每一个实例中。通过声明一个公有字段，我们可以确保该字段一直存在，而类的定义则会更加像是自我描述。
     * 公有实例字段可以在基类的构造过程中（构造函数主体运行前）使用Object.defineProperty添加，也可以在子类构造函数中的super()函数结束后添加。
     */

     class C1 {
         static s1 = this.f3()      // 这里的this指向C1这个类
         i1 = 1
         i2 = this.f1()             // 这里的this指向生成的实例
         i3 = this.f2()
        //  i4 = this.f3()             // TypeError: undefined is not a function 实例原型链上没有f3这个方法

         static f3() {
             return 5
         }

         f1() {
             return 111
         }

         f2() {
            return 222
        }
     }
    //  console.log(C1.i1)     // undefined    公有实例字段只在实例自身上存在
    //  console.log(C1.hasOwnProperty('i1'))               // false
    //  console.log(C1.prototype.hasOwnProperty('i1'))     // false
     let o1 = new C1()
    //  console.log(o1.i1)     // 1
    //  console.log(o1.hasOwnProperty('i1'))     // true

     class C2 extends C1 {
    }
    //  console.log(C2.i1)     // undefined    
    //  console.log(C2.hasOwnProperty('i1'))               // false
    //  console.log(C2.prototype.hasOwnProperty('i1'))     // false
     let o2 = new C2()
    //  console.log(o2.i1)     // 1
    //  console.log(o2.hasOwnProperty('i1'))     // true   子类会继承公有实例字段
    let end
}

{   // 静态公有方法
    /**
     * 关键字static将为一个类定义一个静态方法。静态方法不会在实例中被调用，而只会被类本身调用。它们经常是工具函数，比如用来创建或者复制对象。
     * 静态方法是在类的赋值阶段用Object.defineProperty方法添加到类中的。静态方法是可编辑的、不可遍历的和可配置的
     */
    let end
}


{   // 公共实例方法
    /**
     * 公共实例方法是在类的赋值阶段用Object.defineProperty方法添加到类中的。静态方法是可编辑的、不可遍历的和可配置的。
     * 在实例的方法中，this指向的是实例本身，你可以使用super访问到超类的原型，由此你可以调用超类的方法。
     * getter和setter是和类的属性绑定的特殊方法，分别会在其绑定的属性被取值、赋值时调用
     */
    class C1 {
        i1 = 1

        f1() {
            return this.i1
        }
    }
    class C2 extends C1 {
        get a1() {
            return 1
        }
        
        set a1(val) {
            let a = 1
        }

        f2() {
            // console.log(super.f1())      // 1
            // console.log(this.f1())       // 1
            return this.i1
        }
    }
    let o1 = new C2()
    o1.f2()
    o1.a1
    o1.a1 = 11
    let end
}


{   // 静态私有字段
    /**
     * 静态私有字段可以在类声明本身内部的构造函数上被访问到。
     * 静态变量只能被静态方法访问的限制依然存在。
     * 静态私有字段是在类赋值的时候被添加到类构造函数中的。
     * 静态私有字段有一个来源限制。只有定义静态私有字段的类可以访问该字段。这在使用this时，可能会导致不符合预期的行为。
     */

    class C1 {
        static #a1 = 222       // 这里只是声明，赋值没有效果

        static #a2              // 要用a2调用，而不是#a2

        static init() {
            this.a1 = 111   // 赋值之前，this.a1是undefined
            this.#a2 = 333  // 用#a2调用相当于加了一个新私有静态变量#a2
        }

        static f1() {
            return this.a1
        }
        static f2() {
            return this.#a2
        }
        static f3() {
            return this.a2
        }
     
    }
    C1.init()
    // console.log(C1.f1())     // 111
    // console.log(C1.f2())     // 333 
    // console.log(C1.f3())     // undefined
    let end
}

{   // 私有实例字段
    class C1{
        #a1 = 111

        #a2

        f1() {
            return this.#a1     // 要用#a1引用，而不是a1
        }
        f2() {
            return this.a1
        }
        f3() {
            return this.#a2
        }
    }

    let o1 = new C1()
    // console.log(o1.f1())    // 111
    // console.log(o1.f2())    // undefined
    // console.log(o1.f3())    // undefined
    let end
}

{   // 静态私有方法
    /**
     * 和静态公共方法一样，静态私有方法也是在类里面而非实例中调用的。和静态私有字段一样，它们也只能在类的声明中访问。
     * 静态私有方法可以是生成器、异步或者异步生成器函数。
     */
    let end
}

{   // 私有实例方法
    /**
     * 私有实例方法在类的实例中可用，它的访问方式的限制和私有实例字段相同。
     * 私有实例方法可以是生成器、异步或者异步生成器函数。私有getter和setter也是可能的：
     */
    let end
}

{   // constructor
    /**
     * 在一个构造方法中可以使用super关键字来调用一个父类的构造方法。
     * 如果没有显式指定构造方法，则会添加默认的 constructor 方法。
     * 
     * 默认构造方法:
     * 对于基类，默认构造函数是：constructor() {}
     * 对于派生类，默认构造函数是：constructor(...args) {super(...args);}
     */

    class C1 {
        constructor() {
            this.name = 111
        }
    }
    class C2 extends C1{
        constructor() {
            super()     // 必须在派生类的构造函数中调用super，否则派生类中this不可用
        }
        f1() {
            return this.name
        }
    }
    let o1 = new C2()
    // console.log(o1.f1())    // 111
    let end
}

{   // extends
    /**
     * extends关键字用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。
     * extends关键字用来创建一个普通类或者内建对象的子类。
     * 继承的.prototype必须是一个Object 或者 null。
     */

     // 可以像扩展普通类一样扩展null，但是新对象的原型将不会继承 Object.prototype。
    class nullExtends extends null {
        constructor() {}
    }
    console.log(Object.getPrototypeOf(nullExtends)); // Function.prototype
    console.log(Object.getPrototypeOf(nullExtends.prototype)) // null
      
    new nullExtends(); //ReferenceError: this is not defined
    let end
}

{   // 
    let end
}

{   // 
    let end
}

