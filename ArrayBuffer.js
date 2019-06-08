/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  ArrayBuffer.js
 * @Description:     ArrayBuffer对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{   // 构造
    /* new ArrayBuffer(length)      如果 length 大于 Number.MAX_SAFE_INTEGER（>= 2 ** 53）或为负数，则抛出一个RangeError异常
     */
    let buffer = new ArrayBuffer(8);
    buffer.byteLength;                      // 8 ArrayBuffer.prototype.byteLength    数组的字节大小。在数组创建时确定，并且不可变更。只读(只有getter)
    let view = new Int32Array(buffer);
    ArrayBuffer[Symbol.species];            // 返回ArrayBuffer构造函数
    ArrayBuffer.prototype.constructor === ArrayBuffer[Symbol.species];   // true
}
{   // ArrayBuffer.isView       arg是一个ArrayBuffer的视图就返回true，否则返回false.
    /* ArrayBuffer.isView(arg)
     */
    ArrayBuffer.isView();                    // false
    ArrayBuffer.isView([]);                  // false
    ArrayBuffer.isView({});                  // false
    ArrayBuffer.isView(null);                // false
    ArrayBuffer.isView(undefined);           // false
    ArrayBuffer.isView(new ArrayBuffer(10)); // false

    ArrayBuffer.isView(new Uint8Array());    // true
    ArrayBuffer.isView(new Float32Array());  // true
    ArrayBuffer.isView(new Int8Array(10).subarray(0, 3)); // true
}
{   // ArrayBuffer.prototype.slice
    /* arraybuffer.slice(begin[, end]
        end: 默认ArrayBuffer末尾
     */
    let buf1 = new ArrayBuffer(8);
    let buf2 = buf1.slice(0);
}