export default {

  setLocalValue(key, value) {
    window.localStorage.setItem(key, value);
  },

  getLocalValue(key) {
    return window.localStorage.getItem(key);
  },

  clearLocalValue() {
    window.localStorage.clear();
  }
}
