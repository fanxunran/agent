const _CnReg = new RegExp(/[^\x00-\xff]/ig);
export default {
  /**
   * 格式化数字，添加逗号分隔符
   * @example
   * <pre>示例：<br>
   * MZ.string.addCommasForNumber(1222333223.23223);
   * </pre>
   * @param {float} nStr
   * @return {string}
   */
  addCommasForNumber: function (number) {
    var x, x1, x2, rgx;
    number += '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },
  
  /**
   * 计算字符串长度（一个中文算两个长度）
   * @param str
   * @returns {*}
   */
  countCharLen:function (str){
    if(!str){
      return 0;
    }
    const cnLength = (str.match(_CnReg) || '').length;
    return str.length + cnLength
  }
  
}
