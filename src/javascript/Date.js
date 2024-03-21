/**
 * All rights Reserved, Designed By www.tttxiaowei.top
 * @Title:  Date.js
 * @Description:     Date对象
 * @author: xiaowei
 * @date:   2019/6/7
 */

{   // 构造函数
    /*
    new Date();             当前时间
    new Date(value);        一个 Unix 时间戳
    new Date(dateString);   表示日期的字符串值。该字符串应该能被 Date.parse() 正确方法识别
    new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);    monthIndex从0开始

     */
    new Date();                                     //如果没有输入任何参数，则Date的构造器会依据系统设置的当前时间来创建一个Date对象。
    new Date(2012, 4, 4000, 4, 4, 4, 4000);         // Thu Apr 13 2023 04:04:08 GMT+0800 (中国标准时间)，如果某位数值大于合理范围，会自动计算到真实日期
    new Date(8640000000000000);     // Sat Sep 13 275760 08:00:00 GMT+0800 (中国标准时间), JavaScript的时间由世界标准时间（UTC）1970年1月1日开始，用毫秒计时，一天由 86,400,000 毫秒组成。
    new Date(8640000000000001);     // Invalid Date
    new Date(-8640000000000000);    // Tue Apr 20 -271821 08:05:43 GMT+0805 (中国标准时间), Date 对象的范围是 -100,000,000 天至 100,000,000 天（等效的毫秒值）。
    Date();                         // "Thu May 23 2019 22:18:30 GMT+0800 (中国标准时间)",  以一个函数的形式来调用 Date 对象（即不使用 new 操作符）会返回一个代表当前日期和时间的字符串。
    let end
}
{   // 方法
    /*
    Date.now()      // 返回自 1970-1-1 00:00:00  UTC（世界标准时间）至今所经过的毫秒数。
    Date.parse()    // 解析一个表示日期的字符串，并返回从 1970-1-1 00:00:00 所经过的毫秒数。 以本地时间的日期为终点
    Date.UTC()      // 接受和构造函数最长形式的参数相同的参数（从2到7），并返回从 1970-01-01 00:00:00 UTC 开始所经过的毫秒数。以UTC时间的日期为终点
     */
    Date.now();                             // 1558622896367,Thu May 23 2019 22:48:16 GMT+0800 (中国标准时间)
    Date.parse('2019-5-23 0:0:0');          // 1558540800000,Thu May 23 2019 00:00:00 GMT+0800 (中国标准时间)
    Date.UTC(2019, 4, 23, 0, 0, 0, 0);      // 1558569600000,Thu May 23 2019 08:00:00 GMT+0800 (中国标准时间)     获取的是UTC该时间的时间戳，但是东八区比该时间快8小时
    let end
}
{   // Date.prototype.getDate   根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）
    (new Date()).getDate();     // 23
    let end
}

{   // Date.prototype.getDay    根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。
    (new Date()).getDay();      // 4
    let end
}
{   // Date.prototype.getFullYear   根据当地时间，返回一个对应于给定日期的年份数字。
    (new Date()).getFullYear();     // 2019
    let end
}
{   // Date.prototype..getHours     根据本地时间，返回一个指定的日期对象的小时。
    (new Date()).getHours();        // 23
    let end
}
{   // Date.prototype.getMilliseconds   根据本地时间，返回一个指定的日期对象的毫秒数。
    (new Date()).getMilliseconds(); // 547
    let end
}
{   // Date.prototype.getMinutes    根据本地时间，返回一个指定的日期对象的分钟数。
    (new Date()).getMinutes();  // 36
    let end
}
{   // Date.prototype.getMonth   根据本地时间，返回一个指定的日期对象的月份，为基于0的值
    (new Date()).getMonth();    // 4
    let end
}
{   // Date.prototype.getSeconds    根据本地时间，返回一个指定的日期对象的秒数。
    (new Date()).getSeconds();  // 26
    let end
}
{   // Date.prototype.getTime   返回一个时间的格林威治时间数值。
    (new Date()).getTime();     // 1558626162284
    let end
}
{   // Date.prototype.getTimezoneOffset     返回协调世界时（UTC）相对于当前时区的时间差值，单位为分
    (new Date()).getTimezoneOffset();   // -480
    let end
}
{   // Date.prototype.getUTCDate    以世界时为标准，返回一个指定的日期对象为一个月中的第几天（在东八区，比getDate慢8小时）
    (new Date()).getUTCDate();      // 23
    let end
}
{   // Date.prototype.getUTCDay     以世界时为标准，返回一个指定的日期对象为一星期中的第几天，其中 0 代表星期天。（在东八区，比getDay慢8小时）
    (new Date()).getUTCDay();       // 4
    let end
}
{   // Date.prototype.getUTCFullYear    世界时为标准，返回一个指定的日期对象的年份。（在东八区，比getFullYear慢8小时）
    (new Date()).getUTCFullYear();  // 2019
    let end
}
{   // Date.prototype.getUTCHours   以世界时为标准，返回一个指定的日期对象的小时数。（在东八区，比getHours慢8小时）
    (new Date()).getUTCHours();     // 15   getHours是23
}
{   // Date.prototype.getUTCMilliseconds    世界时为标准，返回一个指定的日期对象的毫秒数。（在东八区，比getMilliseconds慢8小时）
    (new Date()).getUTCMilliseconds();
    let end
}
{   // Date.prototype.getUTCMinutes     以世界时为标准，返回一个指定的日期对象的分钟数。（在东八区，比getMinutes慢8小时）
    (new Date()).getUTCMinutes();
    let end
}
{   // Date.prototype.getUTCMonth   以世界时为标准，返回一个指定的日期对象的月份，它是从 0 开始计数的（0 代表一年的第一个月）。（在东八区，比getMonth慢8小时）
    (new Date()).getUTCMonth();
    let end
}
{   // Date.prototype.getUTCSeconds     以世界时为标准，返回一个指定的日期对象的秒数。（在东八区，比getSeconds慢8小时）
    (new Date()).getUTCSeconds();
    let end
}
{   // Date.prototype.setDate       根据本地时间来指定一个日期对象的天数。 数值超出返回会计算出真实日期
    (new Date()).setDate(1);                // 1556640673662 返回值为时间戳
    new Date((new Date()).setDate(1));      // Wed May 01 2019 00:11:48 GMT+0800 (中国标准时间)   // 设置当前月的第几天
    new Date((new Date()).setDate(32));      // Sat Jun 01 2019 00:14:48 GMT+0800 (中国标准时间)   // 日期计算到下个月
    new Date((new Date()).setDate(0));      // Tue Apr 30 2019 00:12:38 GMT+0800 (中国标准时间)   // 上个月的最后一天
    new Date((new Date()).setDate(-20));    // Wed Apr 10 2019 00:13:17 GMT+0800 (中国标准时间)   // 日期依次往前推
    let end
}
{   // Date.prototype.setFullYear   根据本地时间为一个日期对象设置年份。数值超出返回会计算出真实日期
    /*
    dateObj.setFullYear(yearValue[, monthValue[, dayValue]])
    如果没有指定 monthValue 和dayValue 参数，将会使用 getMonth 和getDate 方法的返回值。
     */
    (new Date()).setFullYear(1977);                     // 233252236702 返回值为时间戳
    new Date((new Date()).setFullYear(1977));           // Tue May 24 1977 00:18:17 GMT+0800 (中国标准时间)
    new Date((new Date()).setFullYear(1977, 11, 12));   // Mon Dec 12 1977 00:20:40 GMT+0800 (中国标准时间)
    new Date((new Date()).setFullYear(1977, 18, 12));   // Wed Jul 12 1978 00:19:44 GMT+0800 (中国标准时间)

    let end
}
{   // Date.prototype.setHours  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setHours(hoursValue[, minutesValue[, secondsValue[, msValue]]])
    如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。
    如果指定了 msValue 参数，则必须同时指定 minutesValue 和 secondsValue 参数。
    如果不指定 minutesValue，secondsValue 和 msValue 参数，则会使用getMinutes()，getSeconds() 和getMilliseconds() 方法的返回值。
     */
    (new Date()).setHours(10);                          // 1558664767254 返回值为时间戳
    new Date((new Date()).setHours(10));                // Fri May 24 2019 10:26:30 GMT+0800 (中国标准时间)
    new Date((new Date()).setHours(10, 11, 12, 300));   // Fri May 24 2019 10:11:12 GMT+0800 (中国标准时间)
    new Date((new Date()).setHours(10, 110, 12, 300));  // Fri May 24 2019 11:50:12 GMT+0800 (中国标准时间)
    let end
}
{   // Date.prototype.setMilliseconds   根据本地时间设置一个日期对象的豪秒数。数值超出返回会计算出真实日期
    (new Date()).setMilliseconds(100);                  // 1558628939100
    new Date((new Date()).setMilliseconds(100));        // Fri May 24 2019 00:29:12 GMT+0800 (中国标准时间)
    new Date((new Date()).setMilliseconds(10000));      // Fri May 24 2019 00:29:49 GMT+0800 (中国标准时间)
    let end
}
{   // Date.prototype.setMinutes  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setMinutes(minutesValue[, secondsValue[, msValue]])
    如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。
    如果指定了 msValue 参数，则必须同时指定 minutesValue 和secondsValue 参数。
    如果没有指定 secondsValue 和 msValue 参数，就会使用 getSeconds() 和 getMilliseconds() 方法的返回值。
     */
    (new Date()).setMinutes(10);                    // 1558627835414 返回值为时间戳
    new Date((new Date()).setMinutes(10));          // Fri May 24 2019 00:10:52 GMT+0800 (中国标准时间)
    new Date((new Date()).setHours(10, 11, 12));    // Fri May 24 2019 10:11:12 GMT+0800 (中国标准时间)
    new Date((new Date()).setHours(10, 110, 12));   // Fri May 24 2019 11:50:12 GMT+0800 (中国标准时间)
    let end
}
{   // Date.prototype.setMonth  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setMonth(monthValue[, dayValue])
    如果不指定 dayValue 参数，就会使用 getDate 方法的返回值。
     */
    (new Date()).setMonth(10);                  // 1574526903617 返回值为时间戳
    new Date((new Date()).setMonth(10));        // Sun Nov 24 2019 00:35:12 GMT+0800 (中国标准时间)
    new Date((new Date()).setMonth(10, 11));    // Mon Nov 11 2019 00:35:35 GMT+0800 (中国标准时间)
    new Date((new Date()).setMonth(10, 110));   // Tue Feb 18 2020 00:35:40 GMT+0800 (中国标准时间)
    let end
}
{   // Date.prototype.setSeconds  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setSeconds(secondsValue[, msValue])
    如果没有指定 msValue 参数，就会使用 getMilliseconds() 方法的返回值。
     */
    (new Date()).setSeconds(10);                  // 1558629430167 返回值为时间戳
    new Date((new Date()).setSeconds(10));        // Fri May 24 2019 00:37:10 GMT+0800 (中国标准时间)
    new Date((new Date()).setSeconds(10, 2000));  // Fri May 24 2019 00:37:12 GMT+0800 (中国标准时间)
    let end
}
{   // Date.prototype.setTime   以一个表示从1970-1-1 00:00:00 UTC计时的毫秒数为来为 Date 对象设置时间
    (new Date()).setTime(1558629430167);            // 1558629430167
    let end
}

{   // Date.prototype.setUTCDate       根据全球时间设置特定date对象的日期。 数值超出返回会计算出真实日期
    (new Date()).setUTCDate(1);                // 1556728847200 返回值为时间戳
    new Date((new Date()).setUTCDate(1));      // Thu May 02 2019 01:05:03 GMT+0800 (中国标准时间)   // 之所以是2号，是因为现在是0点，所以setUTCDate的结果是UTC时间1号17点左右，然后转换为东八区，就是2号0点左右了
    new Date((new Date()).setUTCDate(1)).toUTCString(); // "Wed, 01 May 2019 17:05:03 GMT"      因为是晚上0点，所以UTC时间是17点
    let end
}
{   // Date.prototype.setUTCFullYear   根据世界标准时间为一个具体日期设置年份。数值超出返回会计算出真实日期
    /*
    dateObj.setUTCFullYear(yearValue[, monthValue[, dayValue]])
    如果你指定了dayValue参数，那么你必须指定monthValue参数。
    如果你没有指定具体的monthValue和dayValue，将会使用 getUTCMonth 和getUTCDate 方法的返回值。
     */
    (new Date()).setUTCFullYear(1977);                     // 233255303306 返回值为时间戳
    new Date((new Date()).setUTCFullYear(1977)).toUTCString();           // "Mon, 23 May 1977 17:08:47 GMT“
    new Date((new Date()).setUTCFullYear(1977, 11, 12)).toUTCString();   // "Mon, 12 Dec 1977 17:09:04 GMT"
    new Date((new Date()).setUTCFullYear(1977, 18, 12)).toUTCString();   // "Wed, 12 Jul 1978 17:09:10 GMT"
    let end

}
{   // Date.prototype.setUTCHours  根据本地时间世界标准时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setUTCHours(hoursValue[, minutesValue[, secondsValue[, msValue]]])
    如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。
    如果指定了 msValue 参数，则必须同时指定 minutesValue 和 secondsValue 参数。
    如果不指定 minutesValue，secondsValue 和 msValue 参数，则会使用getUTCMinutes()，getUTCSeconds() 和getUTCMilliseconds() 方法的返回值。
     */
    (new Date()).setUTCHours(10);                          // 1558606595443 返回值为时间戳
    new Date((new Date()).setUTCHours(10)).toUTCString();                // "Thu, 23 May 2019 10:15:12 GMT"
    new Date((new Date()).setUTCHours(10, 11, 12, 300)).toUTCString();   // "Thu, 23 May 2019 10:11:12 GMT"
    new Date((new Date()).setUTCHours(10, 110, 12, 300)).toUTCString();  // "Thu, 23 May 2019 11:50:12 GMT"
    let end
}
{   // Date.prototype.setUTCMilliseconds   根据本地时间设置一个日期对象的豪秒数。数值超出返回会计算出真实日期
    (new Date()).setUTCMilliseconds(100);                  // 1558631788100
    new Date((new Date()).setUTCMilliseconds(100)).toUTCString();        // "Thu, 23 May 2019 17:16:12 GMT"
    new Date((new Date()).setUTCMilliseconds(10000)).toUTCString();      // "Thu, 23 May 2019 17:16:30 GMT"
    let end
}
{   // Date.prototype.setUTCMinutes  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setUTCMinutes(minutesValue[, secondsValue[, msValue]])
    如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。
    如果指定了 msValue 参数，则必须同时指定 minutesValue 和secondsValue 参数。
    如果没有指定 secondsValue 和 msValue 参数，就会使用 getUTCSeconds() 和 getUTCMilliseconds() 方法的返回值。
     */
    (new Date()).setUTCMinutes(10);                    // 1558631429098 返回值为时间戳
    new Date((new Date()).setUTCMinutes(10)).toUTCString();          // "Thu, 23 May 2019 17:10:43 GMT"
    new Date((new Date()).setUTCMinutes(10, 11, 12)).toUTCString();    // "Thu, 23 May 2019 17:10:11 GMT"
    new Date((new Date()).setUTCMinutes(10, 110, 12)).toUTCString();   // "Thu, 23 May 2019 17:11:50 GMT"
    let end
}
{   // Date.prototype.setUTCMonth  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setUTCMonth(monthValue[, dayValue])
    如果不指定 dayValue 参数，就会使用 getUTCDate 方法的返回值。
     */
    (new Date()).setUTCMonth(10);                  // 1574526903617 返回值为时间戳
    new Date((new Date()).setUTCMonth(10)).toUTCString();        // "Sat, 23 Nov 2019 17:18:54 GMT"
    new Date((new Date()).setUTCMonth(10, 11)).toUTCString();    // "Mon, 11 Nov 2019 17:18:58 GMT"
    new Date((new Date()).setUTCMonth(10, 110)).toUTCString();   // "Tue, 18 Feb 2020 17:19:01 GMT"
    let end
}
{   // Date.prototype.setUTCSeconds  根据本地时间为一个日期对象设置小时数,数值超出返回会计算出真实日期
    /*
    dateObj.setUTCSeconds(secondsValue[, msValue])
    如果没有指定 msValue 参数，就会使用 getMilliseconds() 方法的返回值。
     */
    (new Date()).setUTCSeconds(10);                  // 1558629430167 返回值为时间戳
    new Date((new Date()).setUTCSeconds(10)).toUTCString();        // "Thu, 23 May 2019 17:20:10 GMT"
    new Date((new Date()).setUTCSeconds(10, 2000)).toUTCString();  // "Thu, 23 May 2019 17:20:12 GMT"
    let end
}
{   // Date.prototype.toDateString  以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。
    new Date().toDateString();                  // "Fri May 24 2019"
    let end
}
{   // Date.prototype.toISOString  返回一个 ISO 格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。时区总是UTC（协调世界时），加一个后缀“Z”标识。
    new Date().toISOString();                  // "2019-05-23T17:23:01.874Z"
    let end
}
{   // Date.prototype.toJSON    返回 Date 对象的字符串形式。使用toISOString
    new Date().toJSON();                  // "2019-05-23T17:23:01.874Z"
}
{   // Date.prototype.toLocaleDateString    返回该日期对象日期部分的字符串，该字符串格式因不同语言而不同
    /*
    dateObj.toLocaleDateString([locales [, options]])
     查看浏览器兼容性小节，看下哪些浏览器支持 locales 和 options 参数，还可以参看例子： 检测 locales 和 options 参数支持情况。
     */
    new Date().toLocaleDateString();        // "2019/5/24"
    let event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    event.toLocaleDateString('de-DE', options);     // "Donnerstag, 20. Dezember 2012"      这几个在浏览器端是这么显示的，但node端不支持
    event.toLocaleDateString('ar-EG', options);     // "الخميس، ٢٠ ديسمبر ٢٠١٢"
    event.toLocaleDateString('ko-KR', options);     // "2012년 12월 20일 목요일"
    let end
}
{   // Date.prototype.toLocaleString    返回该日期对象日期部分的字符串，该字符串格式因不同语言而不同
    /*
    dateObj.toLocaleString([locales [, options]])
     查看浏览器兼容性小节，看下哪些浏览器支持 locales 和 options 参数，还可以参看例子： 检测 locales 和 options 参数支持情况。
     */
    new Date().toLocaleString();                  // "2019/5/24 上午1:35:39"
    let event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    event.toLocaleDateString('de-DE', options);     // "Donnerstag, 20. Dezember 2012"      这几个在浏览器端是这么显示的，但node端不支持
    event.toLocaleDateString('ar-EG', options);     // "الخميس، ٢٠ ديسمبر ٢٠١٢"
    event.toLocaleDateString('ko-KR', options);     // "2012년 12월 20일 목요일"
    let end
}
{   // Date.prototype.toLocaleTimeString    返回该日期对象时间部分的字符串，该字符串格式因不同语言而不同
    /*
    dateObj.toLocaleTimeString([locales [, options]])
     查看浏览器兼容性小节，看下哪些浏览器支持 locales 和 options 参数，还可以参看例子： 检测 locales 和 options 参数支持情况。
     */
    new Date().toLocaleTimeString();                  // "上午1:35:39"
    new Date().toLocaleTimeString('en-US');         // "1:38:13 AM"
    new Date().toLocaleTimeString('it-IT');         // "01:38:22"
    new Date().toLocaleTimeString('ar-EG');         // "١:٣٨:٢٩ ص"
    let end
}
{   // Date.prototype.toString  返回一个字符串，表示该Date对象。
    new Date().toString();                  // "Fri May 24 2019 01:40:32 GMT+0800 (中国标准时间)"
    let end
}
{   // Date.prototype.toTimeString  以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。
    new Date().toTimeString();                  // "01:41:00 GMT+0800 (中国标准时间)"
    let end
}
{   // Date.prototype.toUTCString   把一个日期转换为一个字符串，使用UTC时区。
    new Date().toUTCString();                  // "Thu, 23 May 2019 17:41:47 GMT"
    let end
}
{   // Date.prototype.valueOf   返回从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期的毫秒数。
    new Date().valueOf();                  // 1558633331221
    let end
}