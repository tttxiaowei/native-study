/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Promise.js
 * @Description:     Promise
 * @author: xiaowei
 * @date:   2019/6/14
 */

{   // 构造函数|
    let p = new Promise((resolve, reject) => {
        let a = 1;
        setTimeout(() => {
            let a = 1;
            resolve(111);
            let b = 1;      // resolve或reject后的代码还是会执行的，并且在执行玩之后才执行then
        }, 1000)
    });
    p.then((data) => {      // data: 111
        let a = 1;
        return 222;
    }).then((data) => {     // data: 222
        let a = 1;
        throw  333;
    }).catch((data) => {    // data: 333
        let a = 1;
        return 444;
        // throw  555;      // 抛出异常下一个catch才会执行
    }).catch((data) => {    // 因为前面已经catch了异常，然后返回了Promise，如果上一个catch中没有throw异常，就不会执行这个catch
        let a = 1;
    }).then((data) => {
        let a = 1;
        return 666;
    }).finally((data) => {  // data: undefined  finally不接受参数
        let a = 1;
        return 777;
    }).then((data) => {     // data: 666  data不是finally返回的数据，而是进finally前一个then或catch返回的数据
        let a = 1;
    });


    let p1 = new Promise((resolve, reject) => {
        setImmediate(() => {
            setImmediate(() => {
                // console.log(11111);     // #11   第二轮结束
            });
            process.nextTick(() => {    // #5   第二轮第1个微任务
                // console.log(22222);
            });
            // console.log(333333);        // #3   第一轮第1个宏任务
            resolve();
        })
    });
    setImmediate(() => {
        // console.log(44444);             // #4   第一轮第2个宏任务， 说明从resolve到then的调用是异步的
    });
    process.nextTick(() => {
        process.nextTick(() => {
            // console.log(555555);        // #2   第一轮第2个微任务  结合#3，说明微任务队列执行完了才会执行宏任务，就算是新添加的微任务
        });
        // console.log(66666);             // #1   第一轮第1个微任务
    });
    let p2 = p1.then(() => {
        process.nextTick(() => {        // #10   结合#11，说明在#10之前第二轮微任务还没执行完，否则新增的微任务会在第三轮微任务队列中执行，说明promise resolve后确实创建的是微任务
            // console.log(777777);
        });
        // console.log(888888)             // #6   第二轮第1个then执行
    });
    let p3 = p2.then(() => {
        // console.log(99999)              // #7   第二轮第2个then执行
    });
    p2.then(() => {
        // console.log(100000)             // #8   第二轮第3个then执行，结合#8、#10，这个应该是微任务，但是如果是新建的微任务应该在#10之后执行才对，搞不懂？？？？
    });
    p3.then(() => {
        // console.log(122222)             // #9   第二轮第4个then执行， 因为resolve调用then是异步的，结合#10、#11，then返回的Promise在then调用时就创建了微任务，根据
    });
}
{   // Promise.prototype.then 返回一个  Promise， 它最多需要有两个参数：Promise 的成功和失败情况的回调函数
    /**
     p.then(onFulfilled, onRejected);
     p.then(function(value) {
           // fulfillment
          }, function(reason) {
          // rejection
         });

     then返回的Promise的返回值依据以下规则返回：
     如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
     如果then中的回调函数没有返回值，那么then返回的Promise将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
     如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
     如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
     如果then中的回调函数返回一个已经是拒绝状态的Promise，那么then返回的Promise也会成为拒绝状态，并且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
     如果then中的回调函数返回一个未定状态（pending）的Promise，那么then返回Promise的状态也是未定的，并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。
     */

    let p = new Promise((resolve, reject) => {
        let a = 1;
        setTimeout(() => {
            return resolve(111);
        }, 1000)
    });
    p.then('bar')       // 'bar' 不是函数，会在内部被替换为 (x) => x
        .then(data => { // data: 111
            let a = 1;
            return 222;
        }).then(data => { // data: 222  如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
        let a = 1;
    }).then(data => { // data: undefined    如果then中的回调函数没有返回值，那么then返回的Promise将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
        let a = 1;
        throw 333;
    }).catch(data => { // data: 333    如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
        let a = 1;
    }).then(data => {
        let p2 = new Promise((resolve, reject) => {
            resolve(444);
        });
        p2.then((data) => { // data: 444    then return的参数不会作为外面then的参数，而是p2 resolve的参数
            let a = 1;
            return 555;
        });
        return p2;
    }).then(data => {     // data: 444  如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
        let a = 1;
    }).then(data => {
        let p3 = new Promise((resolve, reject) => {
            reject(666);
        });
        p3.catch((data) => { // data: 666    catch return的参数不会作为外面catch的参数, 而是p3 reject的参数
            let a = 1;
            return 777;
        });
        return p3;
    }).then(data => {       // 不会执行，前一个then返回了reject状态的Promise
        let a = 1;
    }).catch(data => {     // 666   如果then中的回调函数返回一个已经是拒绝状态的Promise，那么then返回的Promise也会成为拒绝状态，并且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
        let a = 1;
    }).then(data => {
        let p4 = new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve(888);
                reject(888);
            }, 1000);
        });
        p4.then((data) => { // data: 888    会在外面的then之前执行， return的参数不会作为外面then的参数, 而是p4 resolve的参数
            let a = 1;
            return 999;
        }).catch((data) => { // data: 888    会在外面的catch之前执行，return的参数不会作为外面catch的参数, 而是p4 reject的参数
            let a = 1;
            return 1000;
        });
        return p4;
    }).then(data => {       // data: 888
        let a = 1;
    }).catch(data => {     // data: 888       如果then中的回调函数返回一个未定状态（pending）的Promise，那么then返回Promise的状态也是未定的，并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。
        let a = 1;
    });
}
{   // Promise.prototype.catch 返回一个  Promise,并且处理拒绝的情况.它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。 (事实上, calling obj.catch(onRejected) 内部calls obj.then(undefined, onRejected)).

}
{   // Promise.prototype.finally 返回一个  Promise,并且处理拒绝的情况.它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。 (事实上, calling obj.catch(onRejected) 内部calls obj.then(undefined, onRejected)).
    /**
     *  finally() 虽然与 .then(onFinally, onFinally) 类似，它们不同的是:
     *  调用内联函数时，不需要多次声明该函数或为该函数创建一个变量保存它。
     *  由于无法知道promise的最终状态，所以finally的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况。
     *  与Promise.resolve(2).then(() => {}, () => {}) （resolved的结果为undefined）不同，Promise.resolve(2).finally(() => {}) resolved的结果为 2。
     *  同样，Promise.reject(3).then(() => {}, () => {}) (resolved 的结果为undefined), Promise.reject(3).finally(() => {}) rejected 的结果为 3。
     */

    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(111);
        }, 1000)
    });
    p.then(data => {        // data: 1111
        return 222;
    }).finally(data => {    // data: undefined
        return 333;
    }).then(data => {       // data: 222
        return 444;
    }).finally(data => {    // data: undefined
        throw 555;
    }).catch(data => {      // data: 555
        return 666;
    }).then(data => {       // data: 666
        return 777;
    })
}
{   // Promise.all
    /**
     * Promise.all(iterable) 方法返回一个 Promise 实例，
     * 此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；
     * 如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
     *
     * 返回值：
     * 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise。
     * 如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved） Promise。注意：Google Chrome 58 在这种情况下返回一个已完成（already resolved）状态的 Promise。
     * 其它情况下返回一个处理中（pending）的Promise。这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败。 见下方关于“Promise.all 的异步或同步”示例。
     * 返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
     */
        // let p = Promise.all(12);   // TypeError: 12 is not iterable   Promise.all的参数必须实现了iterable
    let p1 = Promise.all([]);       // 返回一个resolve的Promise
    p1.then(data => {               // data: []     Promise.all resolve的参数总是数组
        let a = 1;
    });

    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(222);
        }, 500)
    });
    let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(333);
        }, 1000)
    });
    let p4 = new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(444);
        }, 200)
    });
    p2.then(data => {
        let a = 5;
        // console.log(9);
    }).then(data => {
        let a = 7;
        // console.log(11);
    });
    p3.then(data => {
        let a = 9;
        // console.log(5);
    }).then(data => {
        let a = 11;
        // console.log(7);
    });
    p4.then(data => {
        let a = 1;
        // console.log(1);      // p4最先resolve，所以执行他的第一个then
    }).then(data => {
        let a = 3;
        // console.log(3);
    });
    let p5 = Promise.all([p2, p3, p4]);
    p5.then((data) => {     // data: [222, 333, 444]    返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
        let a = 12;
        // console.log(12);
    });
    p2.then(data => {
        let a = 6;
        // console.log(10);
    }).then(data => {
        let a = 8;
        // console.log(13);
    });
    p3.then(data => {
        let a = 10;
        // console.log(6);
    }).then(data => {
        let a = 13;
        // console.log(8);
    });
    p4.then(data => {
        let a = 2;
        // console.log(2);      // 执行p4的第二个then，和p4的第一个then是一个微任务队列
    }).then(data => {
        let a = 4;
        // console.log(4);
    });

    let p6 = new Promise((resolve, reject) => {
        setTimeout(() => {
            return reject(222);
        }, 5000)
    });
    let p7 = new Promise((resolve, reject) => {
        setTimeout(() => {
            return reject(333);
        }, 1000)
    });
    let p8 = new Promise((resolve, reject) => {
        setTimeout(() => {
            return reject(444);
        }, 200)
    });


    let p9 = Promise.all([p6, p7, p8]);
    p9.then((data) => {     // data: [222, 333, 444]    返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
        let a = 1;
    }).catch(e => {         // e: 444   第一个reject的Promise的返回值
        let a = 1;
    });
    let end = 12;
}
{   // Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
    // Promise.race(45);            // TypeError: 45 is not iterable     参数必须实现了iterable
    Promise.race([]).then(() => {    // 如果传的iterable是空的，则返回的 promise 将永远等待。
        let a = 1;
    });

    Promise.race(['asd']).then((data) => {  // data: 'asd'
        let a = 1;
    });

    let p1 = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
    Promise.race([p1, 'asd']).then((data) => {  // data: 'asd'
        let a = 1;
    });

}
{   // Promise.reject(reason)方法返回一个带有拒绝原因reason参数的Promise对象。
    Promise.reject("Testing static").then((data) => {
        let a = 1;          // then 不会执行
    }).catch((data) => {    // data: Testing static
        let a = 1;
    });
}
{   // Promise.resolve(value)返回一个以给定值解析后的Promise 对象
    /**
     *
     */
    Promise.resolve("Testing static").then((data) => {      // data: Testing static
        let a = 1;
    }).catch((data) => {     // catch不会执行
        let a = 1;
    });

    let p1 = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
    let p2 = Promise.resolve(p1);
    p1 === p2;      // true     如果传入的value本身就是promise对象，则该对象作为Promise.resolve方法的返回值返回；

    let p3 = Promise.resolve({  // 如果value这个值是个thenable（即带有then方法），会将这个对象转为 Promise 对象，然后立即执行thenable对象的then方法。
        then(resolve, reject) { // Promise.resolve将thenable转为promise后then中就有了resolve, reject参数
            resolve(123);
        }
    }).then((data) => { // data: 123
        let a = 1;
    }).catch((data) => {
        let a = 1;
    });
}