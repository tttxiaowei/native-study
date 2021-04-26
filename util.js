const util = {
    /**
     * 下载文件
     * @param url   文件url
     * @param name  下载后的文件名
     */
    downloadFile(url, name) {
        const a = document.createElement('a')
        a.setAttribute('download', name)
        a.setAttribute('href', url)
        a.click()
    },
    /**
     * 查询接口中清除值为空的参数
     * @param params 要清除空值的对象
     */
    clearEmptyParams(params) {
        if (!params) {
            return
        }
        Object.keys(params).forEach(k => {
            if (params[k] === '' || params[k] == null) {
                delete params[k]
            }
        })
    },

    /**
     * @param func 输入完成的回调函数
     * @param delay 延迟时间
     */
    debounce(func, delay) {
        let timer
        return (scope, ...args) => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = window.setTimeout(() => {
                func.apply(scope, args)
            }, delay)
        }
    },

    /**
     * 根据链式的key，从对象中取到对应的值
     * @param obj   {Object} 要取值的对象
     * @param path  {String} 取值的路径，例如'a.b.c'
     * @returns     {any}    undefined或取到的值
     */
    getValueByPath(obj, path) {
        if (!obj || typeof obj !== 'object' || !path) {
            return
        }
        let result = obj
        let arr = path.split('.')
        let len = arr.length
        let i = 0
        for (; i < len; i++) {
            result = result[arr[i]]
            if (result == null) {       // null和undefined避免停止循环，返回undefined，防止报错
                break
            }
        }
        return i === len ? result : undefined
    },

    /**
     * 根据链式的key，对对象中某个key赋值
     * @param obj   {Object}  要设置值的对象
     * @param path  {String}  设置值的路径，例如'a.b.c'
     * @param newVal {any}    要拷贝的值
     * @param deep  {Boolean} 是否深拷贝
     * @returns     {undefined}     undefined
     */
    setValueByPath(obj, path, newVal, deep = true) {
        if (!obj || typeof obj !== 'object' || !path) {
            return
        }
        let result = obj
        let arr = path.split('.')
        let len = arr.length - 1
        let i = 0
        for (; i < len; i++) {
            result = result[arr[i]]
            if (result == null) {       // null和undefined避免停止循环，防止报错
                break
            }
        }
        if (i === len) {
            result[arr[i]] = deep ? _.cloneDeep(newVal) : newVal
        }
    },
    
    /**
     * 将obj拼接成url里的query字符串
     * @param obj     {Object}  要转化的对象
     * @param encode  {Boolean} 是否对每个字段编码
     * @returns       {string}  query字符串'a=1&b=2'
     */
    getQueryParams(obj, encode = true) {
        let list = []
        Object.keys(obj).forEach(k => {
            if (Array.isArray(obj[k])) {    // 处理数组
                obj[k].forEach(v => {
                    list.push(k + '[]=' + (encode ? encodeURIComponent(v) : v))
                })
            } else if (this.getTypeString(obj[k]) === '[object Object]') {  // 处理对象
                list.push(k + '=' + (encode ? encodeURIComponent(JSON.stringify(obj[k])) : obj[k]))
            } else {    // 其他
                list.push(k + '=' + (encode ? encodeURIComponent(obj[k]) : obj[k]))
            }
        })
        return list.join('&')
    },

    /**
     * 通过动态创建a标签进行跳转
     * @param url        {String}       要跳转的url值
     * @returns          {*}            无返回值
     */
    openUrl(url) {
        if (!url) {
            return
        }
        let linkA = document.createElement('a')
        linkA.target = '_blank'
        // 通过设置rel属性值，避免子页面取到源页面的window对象
        linkA.setAttribute('rel', 'noopener noreferrer')
        linkA.href = url
        linkA.click()
    },
    
    /**
     * @Description:  深拷贝函数（不能算完全的深拷贝，暂时没想如何到拷贝函数、对象中有getter和setter的属性）
     * @param  {*} val 需要拷贝的值
     * @return {*}    深拷贝后得到的新值
     */
    cloneDeep(val, hash = new WeakMap()) {
        if (hash.has(val)) {
            return hash.get(val)
        }
        let type = Object.prototype.toString.call(val)
        let result = val
        switch (type) {
            case '[object String]':
            case '[object Number]':
            case '[object Boolean]':
            case '[object Null]':
            case '[object Undefined]':
            case '[object Symbol]':
                return val                         // 基本类型直接返回
            case '[object RegExp]':
                result = new RegExp(val)            // 处理RegExp
                hash.set(val, result)
                break
            case '[object Date]':
                result = new Date(val)             // 处理Date
                hash.set(val, result)
                break
            case '[object Array]':
                result = []
                hash.set(val, result)
                result.splice(0, 1, ...val.map(v => this.cloneDeep(v, hash)))             // 处理Array
                break
            case '[object Set]':
            case '[object WeakSet]':
                result = type === '[object WeakSet]' ? new WeakSet() : new Set()          // 处理Set
                hash.set(val, result)
                val.values.forEach(v => {
                    result.add(this.cloneDeep(v, hash))
                })
                break
            case '[object Map]':
            case '[object WeakMap]':
                result = type === '[object WeakMap]' ? new WeakMap() : new Map()          // 处理Map
                hash.set(val, result)
                val.keys.forEach(k => {
                    result.set(k, this.cloneDeep(val.get(k), hash))
                })
                break
            case '[object Object]':                                                         // 处理纯对象
                result = {}
                hash.set(val, result)
                // Reflect.ownKeys(val).forEach(k => {     // 获取所有属性
                Object.keys(val).forEach(k => {     // 获取所有属性
                    let des = Object.getOwnPropertyDescriptor(val, k)
                    if (des.value !== undefined) {
                        des.value = this.cloneDeep(des.value, hash)  // 不是get、set就继续深拷贝
                    } else if (des.get) {        // 对于get，获取当前get的值
                        des.value = des.get ? this.cloneDeep(des.get.call(val), hash) : null
                    } else {
                        des.value = undefined
                    }
                    delete des.get
                    delete des.set
                    des = Object.assign({
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    }, des)
                    Object.defineProperty(result, k, des)
                })
                break
            case '[object Function]':   // 不拷贝函数，可能涉及闭包, 可能影响原对象
            case '[object GeneratorFunction]':
            case '[object Promise]':    // 不拷贝Promise，可能涉及闭包, 可能影响原对象
            case '[object Error]':      // 拷贝Error无意义
            case '[object Math]':       // 拷贝Math无意义
                hash.set(val, val)
                break
            default:
                break
        }
        return result
    },
        /**
     * 获取类型
     * @param val {*}      要获取类型的值
     * @returns   {string} 类型
     */
    getTypeString(val) {
        return Object.prototype.toString.call(val)
    },

    /**
     * 根据类型是否相同决定是否设置默认值 (暂时只针对有JSON转化的对象)
     * @param dest {Object}        要设置默认值的对象
     * @param key  {String|Number} 要设置默认值的键
     * @param type {String}        期望的类型
     * @param data {*}             默认值
     */
    setValueByType(dest, key, type, data) {
        if (this.getTypeString(dest[key]) !== type) {
            dest[key] = this.deepClearArray(data)
        }
    },

    /**
     * 直接将默认值赋值给目标时，深度清空默认值中的数组格式(暂时只针对有JSON转化的对象)
     * @param data     {*} 要清理的数据
     * @returns        {*} 清理后的数据
     */
    deepClearArray(data) {
        switch (this.getTypeString(data)) {
            case '[object Object]':
                Object.keys(data).forEach(k => {
                    data[k] = this.deepClearArray(data[k])
                }) 
                return data
            case '[object Array]':
                return []
            default:
                return data
        }
    },

    /**
     * 给对象设置默认值 (暂时只针对由JSON转化的对象)
     * @param dest  {*}             要设置默认值的对象
     * @param key   {string|Number} 要设置默认值的键
     * @param data  {*}             默认值
     * @returns                     无返回，直接在函数中改变dest，以data为主要参照，保证data中有的字段在dest[key]中都有
     */
    setDefaultData(dest, key, data) {
        let defaultType = this.getTypeString(data)
        if (dest[key] == null || this.getTypeString(dest[key]) !== defaultType) {   // 如果dest中没有这个字段或为null，或者和默认值类型不同，直接赋值为默认值
            return (dest[key] = this.deepClearArray(data))
        }
        if (defaultType === '[object Array]') {             // 如果默认值是数组
            if (!data.length) {                             // 没有指定数组元素默认值，直接返回
                return
            }
            let childType = this.getTypeString(data[0])     // 数组默认值只要写第一个元素的默认值，其他元素与其一致
            if (childType === '[object Array]') {           // 数组的元素还是数组的情况
                dest[key].forEach((v, k) => {               // 对数组的每个元素调用设置默认值函数
                    this.setDefaultData(dest[key], k, data[0])
                })
            } else if (childType === '[object Object]') {   // 如果数组元素是对象
                dest[key].forEach((item) => {               // 给dest[key]的每个元素设置默认值
                    Object.keys(data[0])
                        .forEach(v => {
                            this.setDefaultData(item, v, data[0][v])
                        })
                })
            } else {                                        // 如果数组元素是String,Number,Boolean,Null
                dest[key].forEach((v, k) => {
                    this.setValueByType(dest[key], k, childType, data[0])
                })
            }
        } else if (defaultType === '[object Object]') {     // 如果默认值是对象
            Object.keys(data)
                .forEach(v => {
                    this.setDefaultData(dest[key], v, data[v])   // 给dest[key]的每个属性设置默认值
                })
        }
    },

    /**
     * 将数据转换成指定类型(暂时只针对有JSON转化的对象)
     * @param dest    {Object|Array}  要转换的对象
     * @param key     {String|Number} 要转换的键
     * @param typeFn  {function}      类型转换函数（String，Number，Boolean）
     */
    translateDataType(dest, key, typeFn) {
        if (dest[key] === '' && typeFn !== String) {    // 如果不是String类型，并且值为'',则赋值为null
            dest[key] = null
            return
        }
        if (typeFn === Number) {
            let n = Number(dest[key])
            dest[key] = Number.isNaN(n) ? null : n
        }  else {
            dest[key] = typeFn(dest[key])
        }
    },

    /**
     * 将传给后台的json数据字段格式化为要求的类型(暂时只针对有JSON转化的对象)
     * @param dest   {Object|Array}  要格式化的对象
     * @param key    {string|Number} 要格式化的键
     * @param format {*}             格式化参数
     * @returns                      无返回，直接在函数中改变dest，以format为主要参照，保证format,dest[key]中都有的字段符合format中声明的类型要求
     */
    formatParamsType(dest, key, format) {
        let formatType = this.getTypeString(format)
        if (dest[key] == null || (formatType !== '[object Function]' && this.getTypeString(dest[key]) !== formatType)) {   // 如果dest中没有这个字段或为null，或者dest[key]是数组、对象而formatType不是，直接返回
            return
        }
        if (formatType === '[object Function]') {
            formatType = `[object ${format.name}]`
        }
        if (formatType === '[object Array]') {              // 如果格式化参数是数组
            if (!format.length) {                           // 没有指定数组元素格式，直接返回
                return
            }
            let childType = this.getTypeString(format[0])   // 数组格式化参数只要写第一个元素的类型，其他元素与其一致
            if (childType === '[object Array]') {           // 数组的元素还是数组的情况
                dest[key].forEach((v, k) => {               // 对数组的每个元素调用格式化函数
                    this.formatParamsType(dest[key], k, format[0])
                })
            } else if (childType === '[object Object]') {   // 如果数组元素是对象
                dest[key].forEach((item) => {               // 遍历目标数组，对比每个子对象中format中存在的键的类型
                    Object.keys(format[0])
                        .forEach(v => {
                            this.formatParamsType(item, v, format[0][v])
                        })
                })
            } else if (childType === '[object Function]') { // 如果数组元素是构造函数String,Number,Boolean
                dest[key].forEach((v, k) => {
                    this.translateDataType(dest[key], k, format[0])
                })
            }
        } else if (formatType === '[object Object]') {     // 如果格式化参数是对象
            Object.keys(format)
                .forEach(v => {
                    this.formatParamsType(dest[key], v, format[v])   // 遍历对象的每个键调用格式化函数
                })
        } else {                                            // 如果格式化参数是构造函数String,Number,Boolean
            this.translateDataType(dest, key, format)
        }
    },
    /**
     * 将base64转blob
     * @param dataURI
     * @param type
     */
    dataURItoBlob(dataURI, type) {
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for(let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
    },
    /**
     * 将blo转为字符串
     * @param   data    {Blob}
     * @returns         {Promise}
     */
    blobToString(data) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.onload = function (event) {
                resolve(reader.result)
            }
            reader.readAsText(data)
        })
    },

    getMonthLastDay(year, month) {  // 获取一个月最多多少天
        let d = new Date(year, month)
        d.setDate(31)
        let day = 31 - d.getDate()
        return day || 31
    },

    copyText(text) {
        let copyInput
        if (document.getElementsByClassName('copyInputComponent').length > 0) {
            copyInput = document.getElementsByClassName('copyInputComponent')[0]
        } else {
            copyInput = document.createElement('input')
            copyInput.className = 'copyInputComponent'
            copyInput.style.width = '1px'
            copyInput.style.height = '1px'
            copyInput.style.border = 0
            copyInput.style.padding = 0
            copyInput.readOnly = true
            document.body.appendChild(copyInput)
        }
        copyInput.value = text
        copyInput.select()
        document.execCommand('Copy')
        window.$tips('success', 'Copy successfully')
    },
}
module.exports = util
