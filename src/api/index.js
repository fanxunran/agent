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
  /**
   * 获取单条标签内容
   * @param params
   */
  tagCategory(params) {
    return services.get(ROOT + '/tag/get', {
      params,
      action: '获取单条标签内容'
    });
  },
  /************************************ 标签值接口*************************************/
  /**
   * 获取标签列表
   * @param params
   */
  tagValueList(params) {
    return services.get(ROOT + '/tagvalue/list', {
      params,
      action: '获取标签列表'
    });
  },
  /**
   * 添加标签
   * @param params
   */
  tagValueAdd(params) {
    return services.post(ROOT + '/tagvalue/add', params, {
      action: '添加标签'
    });
  },
  /**
   * 调整标签顺序
   * @param params
   */
  tagValueMove(params) {
    return services.post(ROOT + '/tagvalue/move', params, {
      action: '调整标签顺序'
    });
  },
  /**
   * 修改标签状态
   * @param params
   */
  tagValueStatus(params) {
    return services.post(ROOT + '/tagvalue/status', params, {
      action: '修改标签状态'
    });
  },
  /**
   * 修改标签
   * @param params
   */
  tagValueUpdate(params) {
    return services.post(ROOT + '/tagvalue/update', params, {
      action: '修改标签'
    });
  },
  /**
   * 获取单条标签内容
   * @param params
   */
  tagValueCategory(params) {
    return services.get(ROOT + '/tagvalue/get', {
      params,
      action: '获取单条分类内容'
    });
  },
  /************************************ 用户角色接口*************************************/
  /**
   * 获取用户角色列表
   * @param params
   */
  privilegeList(params) {
    return services.get(ROOT + '/privilege/list', {
      params,
      action: '获取用户角色列表'
    });
  },
  /**
   * 添加用户角色
   * @param params
   */
  privilegeAdd(params) {
    return services.post(ROOT + '/privilege/add', params, {
      action: '添加用户角色'
    });
  },
  /**
   * 删除用户角色
   * @param params
   */
  privilegeDelete(params) {
    return services.get(ROOT + '/privilege/delete', {
      params,
      action: '删除用户角色'
    });
  },
  /**
   * 修改用户角色
   * @param params
   */
  privilegeUpdate(params) {
    return services.post(ROOT + '/privilege/update', params, {
      action: '修改用户角色'
    });
  },
  /**
   * 获取单条用户角色内容
   * @param params
   */
  privilegeGet(params) {
    return services.get(ROOT + '/privilege/get', {
      params,
      action: '获取单条用户角色内容'
    });
  },
};
