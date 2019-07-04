/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Reflect.js
 * @Description:    Reflect
 * @author: xiaowei
 * @date:   2019/7/4
 */

{   // Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与处理器对象的方法相同。Reflect不是一个函数对象，因此它是不可构造的。

}
{   // Reflect.apply(target, thisArgument, argumentsList)
    // Reflect.apply与ES5中Function.prototype.apply()方法类似

    // Reflect.apply({});  // TypeError: Function.prototype.apply was called on #<Object>, which is a object and not a function     如果target对象不可调用，抛出TypeError。
    Reflect.apply(Math.floor, null, [1.75]);    // 1
    Math.floor.apply(null, [1.75]);             // 1
}
{   // Reflect.construct(target, argumentsList[, newTarget])
    // Reflect.construct方法的行为有点像 new 操作符 构造函数 ， 相当于运行 new target(...args).

    // Reflect.construct({}, [1.75]);    // TypeError: #<Object> is not a constructor  抛出TypeError,异常， 如果target或者newTarget不是构造函数
    Reflect.construct(Date, [1776, 6, 4]);
    new Date(1776, 6, 4);
}
{   // Reflect.defineProperty(target, propertyKey, attributes)      返回Boolean 值指示了属性是否被成功定义。
    // Reflect.defineProperty() 基本等同于 Object.defineProperty() 方法，唯一不同是返回 Boolean 值。

    // Reflect.defineProperty(1, 'a', {});    // TypeError: Reflect.defineProperty called on non-object  如果目标不是 Object，抛出一个 TypeError。
    Reflect.defineProperty({}, 'a', {});    // true
    Object.defineProperty({}, 'a', {});     // {a: undefined}
}
{   // Reflect.deleteProperty(target, propertyKey)      返回Boolean 值表明该属性是否被成功删除。
    // Reflect.deleteProperty() 允许用于删除属性,返回Boolean 值表明该属性是否被成功删除。

    // Reflect.deleteProperty(1, 'a');    // TypeError: Reflect.deleteProperty called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Reflect.deleteProperty({}, 'a');        // true
    let end = 12;
}
{   // Reflect.get(target, propertyKey[, receiver])     返回属性值。
    // Reflect.get() 方法的工作方式，就像从 object (target[propertyKey]) 中获取属性，但它是作为一个函数执行的。

    // Reflect.get(1, 'a');    // TypeError: Reflect.get called on non-object  如果目标值类型不是 Object，则抛出一个 TypeError。
    Reflect.get({}, 'a');        // undefined
}
{   // Reflect.getOwnPropertyDescriptor(target, propertyKey)        如果属性存在于给定的目标对象中，则返回属性描述符；否则，返回 undefined。
    // 静态方法 Reflect.getOwnPropertyDescriptor() 与 Object.getOwnPropertyDescriptor() 方法相似。如果在对象中存在，则返回给定的属性的属性描述符。否则返回 undefined。

    // Reflect.getOwnPropertyDescriptor(1, 'a');    // TypeError: Reflect.getOwnPropertyDescriptor called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Reflect.getOwnPropertyDescriptor({}, 'a');        // undefined
    Object.getOwnPropertyDescriptor({}, 'a');        // undefined
}
{   // Reflect.getPrototypeOf(target)       返回给定对象的原型。如果没有继承的属性，则返回 null。
    // Reflect.getPrototypeOf() 与 Object.getPrototypeOf() 方法是一样的。都是返回指定对象的原型（即，内部的 [[Prototype]] 属性的值）

    // Reflect.getPrototypeOf(1, 'a');    // TypeError: Reflect.getPrototypeOf called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Reflect.getPrototypeOf({});        // Object.prototype
    Object.getPrototypeOf({});        // Object.prototype
}
{   // Reflect.has(target, propertyKey)     返回一个 Boolean 类型的对象指示是否存在此属性。
    // Reflect.has() 作用与 in 操作符 相同。

    // Reflect.has(1, 'a');    // TypeError: Reflect.has called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Reflect.has({}, 'a');        // false
}
{   // Reflect.isExtensible(target) 返回一个 Boolean 值表明该对象是否可扩展。
    // Reflect.isExtensible() 判断一个对象是否可扩展 （即是否能够添加新的属性）。与它 Object.isExtensible() 方法相似，但有一些不同

    // Reflect.isExtensible(1);    // TypeError: Reflect.isExtensible called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Object.isExtensible(1);         // false
    Reflect.isExtensible({});        // true
}
{   // Reflect.ownKeys(target) 返回一个由目标对象自身的属性键组成的数组。
    // Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。

    // Reflect.ownKeys(1);     // TypeError: Reflect.ownKeys called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Reflect.ownKeys({});    // []
}
{   // Reflect.preventExtensions(target)    返回一个 Boolean 值表明目标对象是否成功被设置为不可扩展。
    // Reflect.preventExtensions() 方法阻止新属性添加到对象 例如：防止将来对对象的扩展被添加到对象中)。该方法与 Object.preventExtensions()相似，但有一些不同点

    // Reflect.preventExtensions(1);     // TypeError: Reflect.preventExtensions called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Object.preventExtensions(1);        // 1 对于Object.preventExtensions() 方法， 非对象的第一个参数将被强制转换为对象。
    Object.preventExtensions({a: 1});       // {a: 1}
    Reflect.preventExtensions({a: 1});      // true
}
{   // Reflect.set(target, propertyKey, value[, receiver])  返回一个 Boolean 值表明是否成功设置属性
    // Reflect.set() 工作方式就像在一个对象上设置一个属性。

    // Reflect.set(1, 1);     // TypeError: Reflect.set called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Reflect.set({}, 12);      // true
}
{   // Reflect.setPrototypeOf(target, prototype)  返回一个 Boolean 值表明是否原型已经成功设置。
    // Reflect.setPrototypeOf() 与 Object.setPrototypeOf() 方法是一致的。它将指定对象的原型 （即，内部的[[Prototype]] 属性）设置为另一个对象或为 null。

    // Reflect.set(1, 1);     // TypeError: Reflect.set called on non-object  抛出一个 TypeError，如果目标不是 Object。
    Object.setPrototypeOf({a: 1}, {b: 2});      // {a: 1}
    Reflect.setPrototypeOf({a: 1}, {b: 2});      // true
    let end = 12;
}