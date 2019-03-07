const ua = navigator.userAgent;
const ieReg = {
  _6: /MSIE 6.0/,
  _7: /MSIE 7.0/,
  _8: /MSIE 8.0/,
  _9: /MSIE 9.0/,
  _10: /MSIE 10.0/,
  _11: /rv:11.0/,
  _edge: /edge/i
};

export default {
  isIE(version = '') {
    const isIE = !!window.ActiveXObject || 'ActiveXObject' in window;
    if (version === '') {
      return isIE;
    }
    const key = `_${version}`;
    const reg = ieReg[key];
    if (!reg) {
      return false;
    }
    return isIE && reg.test(ua);
  },
  isFirefox() {
    return /firefox/i.test(ua);
  },
  isChrome() {
    return /chrome/i.test(ua);
  },
  isSafari() {
    return /safari/i.test(ua) && ua.indexOf("Chrome") === -1;
  },
  isOpera() {
    return /opera/i.test(ua);
  },
  isLowerBrowser(lowerIE = 9) {
    if (this.isIE()) {
      if (this.isIE('edge')) {
        return false;
      }
      var regIE = new RegExp("MSIE (\\d+\\.\\d+);");
      regIE.test(navigator.userAgent);
      const version = parseFloat(RegExp.$1);
      return version < lowerIE;
    }
    return false;
  }
};
