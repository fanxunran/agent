/**
 * 这里主要写一些校验器
 */
const validate = {
  validInteger (rule, value, callback) {
    const reg = new RegExp('^\\d*$')
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('格式错误'))
    }
  }
}

export default validate
