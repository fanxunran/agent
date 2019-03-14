import services from '../utils/services';
const ROOT = process.env.API_ROOT;
export default {
  /**
   * 获取标签分类列表
   * @param params
   */
  tagcategoryList(params) {
    return services.get(ROOT + '/tagcategory/list', {
      params,
      action: '获取标签分类列表'
    });
  },
  /**
   * 添加应用
   * @param params
   */
  addApplication(params) {
    return services.post('/agent/parameter/add', params, {
      action: '添加应用'
    });
  }
};
