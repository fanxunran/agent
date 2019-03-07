/**
 * 这里是表格类的页面通用模块
 */
import utils from './index.js'

const mixin = {
  methods: {
    // 获取数据
    getData () { },
    // 从地址栏获取参数，并设置为当前对象的参数
    setQuery () {
      let target = this.query || {}
      let source = this.$route.query || {}
      let original = this.default || {}
      let copy = utils.copy(original)
      for (let key in source) {
        let val1 = copy[key]
        let val2 = source[key]
        if (val1 !== undefined) {
          copy[key] = utils.isNumber(val1) ? +val2 : val2
        }
      }
      Object.assign(target, copy)
    },
    // 设置默认参数
    setDefault () {
      this.default = utils.copy(this.query || {})
    },
    // 点击查询进行搜索
    onSearch () {
      if (!this.routeUpdate) {
        this.$router.push({
          query: this.query
        })
        !this.routeUpdate && this.getData()
      }
    },
    // 页码变化进行查询
    onPageChange (page) {
      this.query.page = page
      this.onSearch()
    },
    // 页大小变化进行查询
    onSizeChange (pageSize) {
      this.query.pageSize = pageSize
      this.onSearch()
    }
  },
  created () {
    this.routeUpdate = false
    this.setDefault()
    this.setQuery()
    this.getData()
  },
  beforeRouteUpdate (to, from, next) {
    this.routeUpdate = true
    next()
    this.setQuery()
    this.getData()
    setTimeout(() => {
      this.routeUpdate = false
    })
  }
}

export default mixin
