/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Infinity .js
 * @Description:    Infinity
 * @author: xiaowei
 * @date:   2019/6/7
 */
{
    /**
     * Infinity 的初始值是 Number.POSITIVE_INFINITY。Infinity（正无穷大）大于任何值。
     * 该值和数学意义上的无穷大很像，例如任何正值乘以 Infinity 为 Infinity, 任何数值（除了Infinity 和 -Infinity）除以 Infinity 为 0。
     * 在 ECMAScript 5 的规范中， Infinity 是只读的
     * js能处理的最大值为正负1.7976931348623157e+308，最小值为正负5e-324
     */
    console.log(typeof Infinity);       // number
    console.log(Infinity);              // Infinity
    console.log(Infinity + 1);          // Infinity
    console.log(8 / 0);                 // Infinity
    console.log(0 / 0);                 // NaN
    console.log(Math.pow(10, 1000));    // Infinity
    console.log(Math.log(0));           // -Infinity
    console.log(1 / Infinity);          // 0
    console.log(1.7976931348623157e+308);   // 1.7976931348623157e+308
    console.log(1.7976931348623158e+308);   // 1.7976931348623157e+308
    console.log(1.7976931348623159e+308);   // Infinity
    console.log(5e-324);                    // 5e-324
    console.log(5e-325);                    // 0
}