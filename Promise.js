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
}
{   // Promise.prototype.then 返回一个  Promise， 它最多需要有两个参数：Promise 的成功和失败情况的回调函数。
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
    })
}