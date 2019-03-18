/**
 * 这里是常用的一些工具
 */

import string from './string';
import date from './date';
const toString = Object.prototype.toString;

const utils = {
  date,
  string,
  picker: {
    shortcuts: [
      {
        text: '最近一周',
        onClick(picker) {
          picker.$emit('pick', utils.getTimeRange(7));
        }
      },
      {
        text: '最近一个月',
        onClick(picker) {
          picker.$emit('pick', utils.getTimeRange(30));
        }
      },
      {
        text: '最近三个月',
        onClick(picker) {
          picker.$emit('pick', utils.getTimeRange(90));
        }
      },
      {
        text: '最近半年',
        onClick(picker) {
          picker.$emit('pick', utils.getTimeRange(180));
        }
      },
      {
        text: '最近一年',
        onClick(picker) {
          picker.$emit('pick', utils.getTimeRange(360));
        }
      }
    ]
  },
  /*小数转成百分比，保留两位小数*/
  decimalToPercent(source) {
    if (source !== null) {
      return Math.round(source * 100 * 100) / 100;
    }
    return null;
  },
  isUndefined(val) {
    return typeof val === 'undefined';
  },
  isObject(o) {
    return toString.call(o) === '[object Object]';
  },
  isArray(o) {
    return toString.call(o) === '[object Array]';
  },
  isNull(o) {
    return toString.call(o) === '[object Null]';
  },
  isNumber(o) {
    return toString.call(o) === '[object Number]';
  },
  isDate(o) {
    return toString.call(o) === '[object Date]';
  },
  isString(o) {
    return toString.call(o) === '[object String]';
  },
  isEmpty(o) {
    return o === undefined || o === null || o === '' || JSON.stringify(o) === '{}';
  },
  copy(o) {
    return JSON.parse(JSON.stringify(o || {}));
  },
  makeUrl(url, queryObj) {
    if (url.indexOf('?') === -1) {
      url += '?';
    }
    if (!/\?$/.test(url)) {
      url += '&';
    }
    if (typeof queryObj === 'string') {
      url += queryObj;
    } else {
      url += this.urlEncodeObj(queryObj);
    }
    return url;
  },
  urlEncodeObj(queryObj) {
    let arr = [];
    for (let p in queryObj) {
      if (queryObj.hasOwnProperty(p)) {
        arr.push(p + '=' + encodeURIComponent(queryObj[p]));
      }
    }
    return arr.join('&');
  },
  getDatepickerOptions(minDate, maxDate) {
    return {
      disabledDate(date) {
        if (maxDate && date > maxDate) {
          return true;
        }
        if (minDate && date < minDate) {
          return true;
        }
        return false;
      }
    };
  },
  objToArray(obj, type) {
    let arr = [];
    for (let key in obj) {
      arr.push(type === 'key' ? key : obj[key]);
    }
    return arr;
  },
  addSeparator(value, split = ',') {
    if (!value) {
      return '0';
    }

    let arr = (value += '').split('.');
    let rgx = /(\d+)(\d{3})/;

    while (rgx.test(arr[0])) {
      arr[0] = arr[0].replace(rgx, '$1' + split + '$2');
    }

    return arr.join('.');
  },
  arrayToObj(arr, key) {
    let obj = {};
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (key || 0 === key) {
        obj[arr[i][key]] = arr[i];
      } else {
        obj[arr[i]] = arr[i];
      }
    }
    return obj;
  },
  removeRepeat(arr) {
    return this.objToArray(this.arrayToObj(arr));
  },
  plain(data) {
    if (data === null || typeof data === 'undefined') {
      return data;
    }
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      throw 'vue-plain: Parse failed, make sure your parameter can be JSON.stringify';
    }
  },
  page(data, page, pageSize) {
    const start = pageSize * (page - 1);
    const end = start + pageSize;
    return data.slice(start, end);
  },
  /**
   * 获取日期范围
   * @param day
   * @param [lastDate] 最后一天
   * @returns {[*,*]}
   */
  getTimeRange(day, lastDate) {
    day = day - 1;
    const last = lastDate || new Date();
    const start = new Date(utils.timeFormat(last, 'YYYY-MM-DD')); // 获取0点的时间
    const end = last;
    start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
    return [start, new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)];
  },
  getTimeList(start, end) {
    if (!start || !end) {
      return [];
    }
    const times = [];
    start = new Date(start).getTime();
    end = new Date(end).getTime();
    while (start <= end) {
      times.push(this.timeFormat(start, 'YYYY-MM-DD'));
      start += 86400000;
    }
    return times;
  },
  timeFormat(time, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!time) {
      return '';
    }
    if (this.isNumber(time) && (time + '').length === 10) {
      time *= 1000;
    }
    if (!this.isDate(time)) {
      time = new Date(time);
    }
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();
    const hours24 = time.getHours();
    const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();
    const dd = t => ('0' + t).slice(-2);
    const map = {
      YYYY: year,
      MM: dd(month + 1),
      M: month + 1,
      DD: dd(day),
      D: day,
      HH: dd(hours24),
      H: hours24,
      hh: dd(hours),
      h: hours,
      mm: dd(minutes),
      m: minutes,
      ss: dd(seconds),
      s: seconds,
      S: milliseconds
    };
    return (format || this.format).replace(/Y+|M+|D+|H+|h+|m+|s+|S+/g, str => map[str]);
  },
  /**
   * 返回基本的element datepicker的配置项，限制日期选择范围
   * @param  {[type]} minDate [description]
   * @param  {[type]} maxDate [description]
   * @return {[type]}         [description]
   */
  getDatepickerOptions(minDate, maxDate) {
    return {
      disabledDate(date) {
        if (maxDate && date > maxDate) {
          return true;
        }

        if (minDate && date < minDate) {
          return true;
        }

        return false;
      }
    };
  },
  /**
   * 对象数组排序方法
   *  - 接受一个成员名字符串和一个可选的次要比较函数做为参数，并返回一个可以用来包含该成员的对象数组进行排序的比较函数。
   *  - 当o[age] 和 p[age] 相等时，次要比较函数被用来决出高下。
   * @param {String} name - 要排序的字段
   * @param {Function} [minor] - 次要比较方法
   * @return {Function} - 返回一个用于 [].sortby 的自定义排序方法
   *
   * @example
   * var employees= [{age: 18, name: 'jack'}, {age: 18, name: 'hello'}, {age: 15, name: 'hi'}];
   * employees.sort(MZ.array.sortBy('age', MZ.array.sortBy('name')));
   * //console
   * [{age: 15, name: 'hi'}, {age: 18, name: 'hello'}, {age: 18, name: 'jack'}]
   */
  arraySortBy(name, minor) {
    return function(o, p) {
      let a, b;

      if (o && p && typeof o === 'object' && typeof p === 'object') {
        a = o[name];
        b = p[name];

        if (a === b) {
          return typeof minor === 'function' ? minor(o, p) : 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      } else {
        throw 'error';
      }
    };
  },
  getChartOption({ title, legend, xData, yData }) {
    const series = [];
    legend.forEach((name, index) => {
      series.push({
        name: name,
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: yData[index],
        lineStyle: {
          width: 3
        },
        itemStyle: {
          normal: {
            borderWidth: 3
          }
        },
        symbolSize: 10
      });
    });
    return {
      color: ['#409eff', '#2364aa', '#344055', '#7f7caf', '#8d5a97', '#1c0556'],
      title: {
        text: title
      },
      dataZoom: {
        show: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: legend,
        selectedMode: 'single'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        },
        right: 78
      },
      grid: {
        left: 50,
        right: 78,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: series
    };
  },
  //一个对象给另一个对象赋值
  listAssign(arrA, arrB){
     Object.keys(arrA).forEach(key => { arrA[key] = arrB[key] || arrA[key]});
  }
};

export default utils;
