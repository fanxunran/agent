import services from '../utils/services';
const ROOT = process.env.API_ROOT;
export default {
  /************************************ 分类接口*************************************/
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
  },
  /**
   * 更新分类
   * @param params
   */
  updateCategory(params) {
    return services.post(ROOT + '/tagcategory/update', params, {
      action: '更新分类'
    });
  },
  /**
   * 更新分类状态
   * @param params
   */
  updateStatus(params) {
    return services.post(ROOT + '/tagcategory/status', params, {
      action: '更新分类状态'
    });
  },
  /**
   * 获取单条分类内容
   * @param params
   */
  tagcategoryContent(params) {
    return services.get(ROOT + '/tagcategory/get', {
      params,
      action: '获取单条分类内容'
    });
  },
  /************************************ 标签接口*************************************/
  /**
   * 获取标签列表
   * @param params
   */
  tagList(params) {
    return services.get(ROOT + '/tag/list', {
      params,
      action: '获取标签列表'
    });
  },
  /**
   * 添加标签
   * @param params
   */
  tagAdd(params) {
    return services.post(ROOT + '/tag/add', params, {
      action: '添加标签'
    });
  },
  /**
   * 调整标签顺序
   * @param params
   */
  tagMove(params) {
    return services.post(ROOT + '/tag/move', params, {
      action: '调整标签顺序'
    });
  },
  /**
   * 修改标签状态
   * @param params
   */
  tagStatus(params) {
    return services.post(ROOT + '/tag/status', params, {
      action: '修改标签状态'
    });
  },
  /**
   * 修改标签
   * @param params
   */
  tagUpdate(params) {
    return services.post(ROOT + '/tag/update', params, {
      action: '修改标签'
    });
  },
};
