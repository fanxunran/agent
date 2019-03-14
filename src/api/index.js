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
   * 新增分类
   * @param params
   */
  newCategory(params) {
    return services.post(ROOT + '/tagcategory/add', params, {
      action: '新增分类'
    });
  },
  /**
   * 调整标签分类顺序
   * @param params
   */
  categoryMove(params) {
    return services.post(ROOT + '/tagcategory/move', params, {
      action: '调整标签分类顺序'
    });
  }
};
