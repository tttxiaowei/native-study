/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Generator.js
 * @Description:     Generator对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{   // 构造函数
    let g = function* () {
        let i = 1;
        let a;
        while (i) {
            a = yield i++;
        }
    };
    let g1 = g();
    console.log('next', g1.next());      // { value: 1, done: false }    a = undefined, value是yield表达式的值
    console.log('next', g1.next(3));     // { value: 2, done: false }    a = 32
    console.log('next', g1.next());      // { value: 3, done: false }    a = undefined
    console.log('return', g1.return());    // { value: undefined, done: true }  return后函数体不再执行，直接返回
    console.log('next', g1.next());      // { value: undefined, done: true }
    console.log('next', g1.next());      // { value: undefined, done: true }


}
{   // Generator.prototype.next
    console.log('\n\nGenerator.prototype.next-----------------------------------------------');
    let g = function* () {
        let val = 100;
        while (true) {
            console.log('-----')
            val = yield val;
            console.log('a', val);
        }
    };

    let g1 = g();
    for (let i = 0; i < 5; i++) {
        console.log(i, g1.next(i).value);
    }

    /* 返回：
     0 100  // i=0， next(0)是给上一次的yield表达式赋值，所以第一次执行next时val是100

     1      // i=1， 上一次执行next后停在yield，这次next才调用console.log(val);
     1 1

     2
     2 2

     3
     3 3

     4
     4 4
    */
}
{   // Generator.prototype.return， 返回对象中done为true, value为return函数的传参
    console.log('\n\nGenerator.prototype.return-----------------------------------------------');

    function* g() {
        let val = 100;
        while (true) {
            val = yield (val + 10);
        }
    }

    let g1 = g();
    for (let i = 0; i < 5; i++) {
        console.log(i, g1.next(i).value);
    }
    console.log('return', g1.return());  // { value: undefined, done: true }
    console.log('return', g1.return(555));  // { value: 555, done: true }   return 的返回值是他传参
    console.log('next', g1.next(555));  // { value: undefined, done: true }
}
{   // Generator.prototype.throw， 返回对象中done为true, value为return函数的传参
    console.log('\n\nGenerator.prototype.throw-----------------------------------------------');

    function* g() {
        let val = 100;
        while (val != 4) {
            try {
                val = yield (val + 10);
            } catch (e) {
                console.log('error', e);    // g1.throw抛出的错误在yield的catch里捕捉到
            }
        }
    }

    let g1 = g();
    console.log(g1.next(1));                    // { value: 110, done: false }
    console.log(g1.next(2));                    // { value: 12, done: false }
    console.log('throw', g1.throw('dddd'));     // { value: 12, done: false }   throw还是会返回值，value为上次next的值
    console.log(g1.next(3));                    // { value: 13, done: false }   throw不会使将done置为true，主要还是看迭代是否能够继续生产在序列中的下一个值
    console.log(g1.next(4));                    // { value: undefined, done: true }
    console.log(g1.next(1));                    // { value: undefined, done: true }
    // console.log('throw', g1.throw('aaaa'));     // done已经是true，再throw会报错
}
