/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Proxy.js
 * @Description:    Proxy
 * @author: xiaowei
 * @date:   2019/6/20
 */
{
    /**
     *  let p = new Proxy(target, handler);
     *  target: 用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
     *  handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数。
     */
    let o1 = {};
    let p = new Proxy(o1, {});      // 使用了一个原生 JavaScript 对象，代理会将所有应用到它的操作转发到这个对象上。
    p.aa = 12;                      // o1: {aa: 12}
}
{   // handler.apply() 方法用于拦截函数的调用。
    // 如果违反了以下约束，代理将抛出一个TypeError：
    // target必须是可被调用的。也就是说，它必须是一个函数对象。
    let f1 = function (a) {
        return 123;
    };
    // let p = new Proxy({}, {
    //     apply() {
    //     }
    // });
    // p();        // TypeError: p is not a function   target必须是可被调用的。也就是说，它必须是一个函数对象。否则在apply拦截触发时会报TypeError
    let p1 = new Proxy(f1, {
        // target: 目标对象（函数）。
        // thisArg: 被调用时的上下文对象。
        // argumentsList: 被调用时的参数数组。
        apply: function (target, thisArg, argumentsList) {
            let a = 12;
        }
    });
    let a1 = p1(1);         // 拦截proxy(...args)形式
    p1.call();              // 拦截Function.prototype.call()
    p1.apply();             // 拦截Function.prototype.apply()
    Reflect.apply(p1, null, []);    // 拦截Reflect.apply
    let p2 = p1.bind({});
    p2();                   // 拦截

    f1();                   // 不会影响原函数的操作
    let a22 = new p1(2);    // 不会拦截new操作
}
{   // handler.construct() 方法用于拦截new 操作符.
    // 如果违反以下约定，代理将会抛出错误 TypeError:
    // 必须返回一个对象.
    let f1 = function (a) {
        return 123;
    };
    // let f2 = {};     // TypeError: p1 is not a constructor       Proxy初始化时，传给它的target 必须具有一个有效的constructor供new操作符调用。
    let p1 = new Proxy(f1, {
        // target: 目标对象（函数）。
        // argumentsList: constructor的参数列表。
        // newTarget: 最初被调用的构造函数，就上面的例子而言是p。。
        construct: function (target, argumentsList, newTarget) {
            // return 111;     // TypeError: 'construct' on proxy: trap returned non-object ('111')    construct 方法必须返回一个对象。
            return {};
        }
    });
    new p1(222);    // 可以拦截
    Reflect.construct(p1, [333]);    // 可以拦截

}
{   // handler.defineProperty() 方法用于拦截对对象的 Object.defineProperty() 操作。
    // 如果违背了以下的不变量，proxy会抛出 TypeError:
    // 如果目标对象不可扩展， 将不能添加属性。
    // 不能添加或者修改一个属性为不可配置的，如果它不作为一个目标对象的不可配置的属性存在的话。
    // 如果目标对象存在一个对应的可配置属性，这个属性可能不会是不可配置的。
    // 如果一个属性在目标对象中存在对应的属性，那么 Object.defineProperty(target, prop, descriptor) 将不会抛出异常。
    // 在严格模式下， false 作为 handler.defineProperty 方法的返回值的话将会抛出 TypeError 异常.
    let o1 = {};
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // property: 待检索其描述的属性名。
        // descriptor: 待定义或修改的属性的描述符
        defineProperty: function (target, property, descriptor) {
            Object.defineProperty(target, property, descriptor);
            return true;        // defineProperty 方法必须以一个 Boolean 返回，表示定义该属性的操作成功与否。 否则会报错
        }
    });
    Object.defineProperty(p1, 'a', {        // 拦截
        value: 123
    });
    Object.defineProperties(p1, {       // 拦截，一个属性调用一次p1的defineProperty
        aaa: {
            value: 111
        },
        bbb: {
            value: 222
        },
    });

    let o2 = {a: 333};
    // let o2 = {a:333};       // 如果一个属性在目标对象中存在对应的属性，那么 Object.defineProperty(target, prop, descriptor) 将不会抛出异常。
    // Object.freeze(o2);      // 如果目标对象不可扩展， 将不能添加属性。     TypeError: Cannot define property a, object is not extensible
    let p2 = new Proxy(o2, {
        defineProperty: function (target, property, descriptor) {
            Object.defineProperty(target, property, descriptor);
            return true;        // 在严格模式下， false 作为 handler.defineProperty 方法的返回值的话将会抛出 TypeError 异常.
        }
    });
    Object.defineProperty(p2, 'a', {
        value: 123,
        // configurable: true,
        configurable: false,         //   不能修改目标对象的不可配置的属性   TypeError: Cannot redefine property: a
    });
    Object.defineProperty(p2, 'a', {
        value: 33,
        enumerable: true
    });
}
{   // handler.deleteProperty() 方法用于拦截对对象属性的 delete 操作。
    // 如果违背了以下不变量，proxy 将会抛出一个 TypeError:
    // 如果目标对象的属性是不可配置的，那么该属性不能被删除。
    let o1 = {};

    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // property: 待删除的属性名。
        deleteProperty: function (target, property) {
            delete target[property];
            let a = 12;
        }
    });
    delete p1.aaa;      // 拦截
    Reflect.deleteProperty(p1, 'nbbb');     // 拦截
}
{   // handler.get() 方法用于拦截对对象属性的 get 操作。
    // 如果违背了以下的约束，proxy会抛出 TypeError:
    // 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同。
    // 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined。
    let o1 = {a: 22};
    Object.defineProperties(o1, {
        b: {
            value: 12,
        },
        c: {
            set() {

            }
        },
        d: {
            get() {
                return 11;
            }
        }
    });

    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // property: 被获取的属性名。
        // receiver: Proxy或者继承Proxy的对象。
        get: function (target, property, receiver) {
            return 888;
        }
    });
    //如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同。
    // p1.b;   // TypeError: 'get' on proxy: property 'b' is a read-only and non-configurable data property

    // 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined
    // p1.c;   // TypeError: 'get' on proxy: property 'c' is a non-configurable accessor property on the proxy target

    p1.a;       //  拦截
    p1.d;       //  拦截
    p1['a'];    //  拦截
    Reflect.get(p1, 'a');   //  拦截
}
{   // handler.getOwnPropertyDescriptor() 方法是 Object.getOwnPropertyDescriptor()  的钩子。
    //如果下列不变量被违反，代理将抛出一个 TypeError：
    // getOwnPropertyDescriptor 必须返回一个 object 或 undefined。
    // 如果属性作为目标对象的不可配置的属性存在，则该属性无法报告为不存在。
    // 如果属性作为目标对象的属性存在，并且目标对象不可扩展，则该属性无法报告为不存在。
    // 如果属性不存在作为目标对象的属性，并且目标对象不可扩展，则不能将其报告为存在。
    // 属性不能被报告为不可配置，如果它不作为目标对象的自身属性存在，或者作为目标对象的可配置的属性存在。
    // Object.getOwnPropertyDescriptor（target）的结果可以使用 Object.defineProperty 应用于目标对象，也不会抛出异常。
    let o1 = {b: 12};
    Object.defineProperties(o1, {
        c: {
            value: 121
        }
    })
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // prop: 返回属性名称的描述。。
        getOwnPropertyDescriptor: function (target, prop) {
            // return 12;       // TypeError: 'getOwnPropertyDescriptor' on proxy: trap returned neither object nor undefined   必须返回一个 object 或 undefined。
            return Object.getOwnPropertyDescriptor(target, prop);
        }
    });

    // Object.getOwnPropertyDescriptor(p1, 'a');   // TypeError: 'getOwnPropertyDescriptor' on proxy: trap reported non-configurability for property 'a' which is either non-existant or configurable in the proxy target
    Object.getOwnPropertyDescriptor(p1, 'b');
    // Object.getOwnPropertyDescriptor(p1, 'c');    // TypeError: 'getOwnPropertyDescriptor' on proxy: trap returned undefined for property 'c' which is non-configurable in the proxy target
    Object.getOwnPropertyDescriptors(p1);           // 对o1的每个属性依次调用p1的getOwnPropertyDescriptor钩子
    Reflect.getOwnPropertyDescriptor(p1, 'a');
}
{   // handler.getPrototypeOf() 当读取代理对象的原型时，该方法就会被调用。
    // 如果遇到了下面两种情况，JS 引擎会抛出 TypeError 异常：
    // getPrototypeOf() 方法返回的不是对象也不是 null。
    // 目标对象是不可扩展的，且 getPrototypeOf() 方法返回的原型不是目标对象本身的原型。
    let o1 = {};
    Object.freeze(o1);
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        getPrototypeOf(target) {
            // return;     // TypeError: 'getPrototypeOf' on proxy: trap returned neither object nor null
            // return {};      // TypeError: 'getPrototypeOf' on proxy: proxy target is non-extensible but the trap did not return its actual prototype
            return Object.getPrototypeOf(target);
        }
    });
    Object.getPrototypeOf(p1);      // 拦截
    Reflect.getPrototypeOf(p1);     // 拦截
    p1.__proto__;                   // 拦截
    ({}).isPrototypeOf(p1);         // 拦截
    p1 instanceof Object;           // 拦截
}
{   // handler.has() 是针对 in 操作符的代理方法。
    // 如果违反了下面这些规则,  proxy 将会抛出 TypeError:
    // 如果目标对象的某一属性本身不可被配置，则该属性不能够被代理隐藏.
    // 如果目标对象为不可扩展对象，则该对象的属性不能够被代理隐藏
    let o1 = {};
    // Object.freeze(o1);      // TypeError: Cannot define property a, object is not extensible
    Object.defineProperties(o1, {
        a: {
            value: 12
        }
    });
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // prop: 需要检查是否存在的属性。
        has: function (target, prop) {
            return false;
        }
    });
    1 in p1;                // 拦截
    2 in Object.create(p1); // 拦截
    Reflect.has(p1, 3);     // 拦截
    // 'a' in p1;      // TypeError: 'has' on proxy: trap returned falsish for property 'a' which exists in the proxy target as non-configurable
}
{   // handler.isExtensible() 用于拦截对对象的Object.isExtensible()。
    // 如果违背了以下的约束，proxy会抛出 TypeError:
    // Object.isExtensible(proxy) 必须同Object.isExtensible(target)返回相同值。也就是必须返回true或者为true的值,返回false和为false的值都会报错。
    let o1 = {};
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        isExtensible: function (target) {
            // return false;       // TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
            return true;
        }
    });
    Object.isExtensible(p1);
    Reflect.isExtensible(p1);
    let end = 12;
}
{   // handler.ownKeys() 用于拦截 Reflect.ownKeys().
    // 如果违反了下面的约定，proxy将抛出错误 TypeError:
    // ownKeys 的结果必须是一个数组.
    // 数组的元素类型要么是一个 String ，要么是一个 Symbol.
    // 结果列表必须包含目标对象的所有不可配置（non-configurable ）、自有（own）属性的key.
    // 如果目标对象不可扩展，那么结果列表必须包含目标对象的所有自有（own）属性的key，不能有其它值.
    let o1 = {a: 12};
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        ownKeys: function (target) {
            // return false;       // TypeError: CreateListFromArrayLike called on non-object
            // return [true];      // TypeError: true is not a valid property name
            return [];
        }
    });
    Object.getOwnPropertyNames(p1);     // 拦截
    Object.getOwnPropertySymbols(p1);   // 拦截
    Object.keys(p1);                    // 拦截
    Reflect.ownKeys(p1);                // 拦截
}
{   // handler.ownKeys() 用于设置对Object.preventExtensions()的拦截
    // 如果违反了下列规则, proxy则会抛出一个 TypeError:
    // 如果Object.isExtensible(proxy)是false，Object.preventExtensions(proxy)只能返回true。
    let o1 = {a: 12};
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        preventExtensions: function (target) {
            Object.preventExtensions(target);
            return true;
        }
    });
    Object.preventExtensions(p1);   // 拦截
    Reflect.preventExtensions(p1);  // 拦截
}
{   // handler.set() 方法用于拦截设置属性值的操作
    // set方法应该返回一个布尔值，返回true代表此次设置属性成功了，如果返回false且设置属性操作发生在严格模式下，那么会抛出一个TypeError。
    // 如果违背以下的约束条件，proxy会抛出一个TypeError:
    // 若目标属性是不可写及不可配置的，则不能改变它的值。
    // 如果目标属性没有配置存储方法，即set方法是undefined的，则不能设置它的值。
    // 在严格模式下，若set方法返回false，则会抛出一个 TypeError 异常。
    let o1 = {a: 12};
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // property: 被设置的属性名。
        // value: 被设置的新值
        // receiver: 最初被调用的对象。通常是proxy本身，但handler的set方法也有可能在原型链上或以其他方式被间接地调用（因此不一定是proxy本身）。
        // 比如，假设有一段代码执行 obj.name = "jen"，obj不是一个proxy且自身不含name属性，但它的原型链上有一个proxy，那么那个proxy的set拦截函数会被调用，此时obj会作为receiver参数传进来。
        set: function (target, property, value, receiver) {
            // target[property] = value;
            Object.defineProperty(receiver, property, {     // 不会被set拦截
                value
            });
            return true;
        }
    });
    p1.a = 11;                  // 拦截
    Reflect.set(p1, 'b', 22);   // 拦截
    let o2 = Object.create(p1); // 拦截
    o2.c = 32;
}
{   // handler.set() 方法用来拦截 Object.setPrototypeOf().
    // 如果违反了下列规则，则proxy将抛出一个TypeError:
    // 如果 target 不可扩展, 原型参数必须与Object.getPrototypeOf(target) 的值相同.
    let o1 = {a: 12};
    // Object.freeze(o1);      // TypeError: #<Object> is not extensible
    let p1 = new Proxy(o1, {
        // target: 目标对象。
        // property: 对象新原型或为null
        setPrototypeOf: function (target, prototype) {
            Object.setPrototypeOf(target, prototype);
            return true;
        }
    });
    Object.setPrototypeOf(p1, {b: 1});  // 拦截
    Reflect.setPrototypeOf(p1, {c: 2}); // 拦截
    let end = 12;
}