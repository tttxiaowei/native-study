module.exports = {
    speed(fn, ...args) {
        console.time()
        for (let j = 0; j < 1000; j++) {
            fn.apply(null, args);
        }
        console.log(fn.name + ': ')
        console.timeEnd()
    }
}
