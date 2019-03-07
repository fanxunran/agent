/**
 * 这里是常用的一些过滤器
 */
import utils from './index.js';
const filters = {
  time(value, format) {
    return utils.timeFormat(value, format);
  },
  price(value, scale = 100) {
    return value ? (value / scale).toFixed(2) : '0.00';
  },
  percent(value, max = 100, decimal = 2) {
    return max ? `${((value / max) * 100).toFixed(decimal)}%` : '0.00%';
  },
  rate(value) {
    return (value * 100).toFixed(2) + '%';
  },
  number(value) {
    return value !== null ? utils.addSeparator(value) : 'N/A';
  },
  discount(value) {
    if (value % 10 === 0) return value / 10;
    return (value / 10).toFixed(1);
  },
  Percentage(value) {
    let sign = '';
    if (value > 0) {
      sign = '+';
    }
    return sign + (value * 100).toFixed(2) + '%';
  },
  thousands(num) {
    num = num || 0;
    if (num.toString().indexOf('.') > 0) {
      let list = num.toString().split('.');
      return list[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + list[1];
    } else {
      return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
};

export default filters;
