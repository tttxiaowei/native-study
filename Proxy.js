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
    let f1 = function (a) {
        return 123;
    };
    // let p = new Proxy({}, {
    //     apply() {
    //     }
    // });
    // p();        // TypeError: p is not a function   target必须是可被调用的。也就是说，它必须是一个函数对象。否则在apply拦截触发时会报TypeError
    let p1 = new Proxy(f1, {
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
    let end = 12;
}