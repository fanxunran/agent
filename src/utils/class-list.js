/**
 * Created by love on 18/11/22.
 * @author trumpli<李志伟>
 */

function ClassList(obj) {
  this.obj = obj;
}

ClassList.prototype.add = function(value) {
  if (typeof value !== 'string') throw TypeError('the type of value is error');
  if (this.obj.classList) {
    this.obj.classList.add(value);
  } else {
    let will = value.replace(/^\s+|\s+$/g, '');
    let _className = this.obj.className;
    if (_className.search(new RegExp('(\\s+)?' + will + '(\\s+)?')) === -1) {
      this.obj.className = _className + ' ' + will;
    }
  }
};
ClassList.prototype.contains = function(value) {
  if (typeof value !== 'string') throw TypeError('the type of value is error');
  if (this.obj.classList) {
    return this.obj.classList.contains(value);
  } else {
    let arr = value.replace(/^\s+|\s+$/g, '').split(/\s+/);
    let _className = this.obj.className;
    for (let i = 0, len = arr.length; i < len; i++) {
      if (_className.search(new RegExp('(\\s+)?' + arr[i] + '(\\s+)?')) === -1) {
        return false;
      }
    }
    return true;
  }
};
ClassList.prototype.remove = function(value) {
  if (typeof value !== 'string') throw TypeError('the type of value is error');
  if (this.obj.classList) {
    return this.obj.classList.remove(value);
  } else {
    let arr = value.replace(/^\s+|\s+$/g, '').split(/\s+/);
    let _className = this.obj.className;
    for (let i = 0, len = arr.length; i < len; i++) {
      if (_className.search(new RegExp('(\\s+)?' + arr[i] + '(\\s+)?')) !== -1) {
        _className = _className.replace(new RegExp('(\\s+)?' + arr[i] + '(\\s+)?'), '');
      }
    }
    this.obj.className = _className;
  }
};

export default ClassList;
