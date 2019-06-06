{   // 构造函数
    /* new Boolean([value])
     */
    let b1 = new Boolean(false);
    if (b1) {   // 虽然b1的值为false，但它是一个对象，在if判断中对象转换为boolean值时为true
        // console.log(111)
    }

    let arr = [0, -0, null, false, NaN, undefined, ''];     // 转换为boolean时为false
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i], new Boolean(arr[i]), Boolean(new Boolean(arr[i])));     // new Boolean得到一个值为false的Boolean对象
    }
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i], Boolean(arr[i]));   // Boolean函数直接得到原始值
    }
}
{   // Boolean.prototype.toString   // 返回字符串'true'、'false'
    /* bool.toString()
     */
    let b1 = new Boolean(false);
    if (b1.toString()) {   // toString返回字符串'false'，所以是true
        // console.log(222)
    }
}
{   // Boolean.prototype.valueOf   // 返回一个Boolean对象或Boolean字面量的原始值
    /* bool.valueOf()
     */
    let b1 = new Boolean(false);
    let b2 = false;
    if (b1.valueOf()) {   // valueOf返回原始值false
        // console.log(333)
    }
}