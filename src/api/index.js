import services from '../utils/services';
const ROOT = process.env.API_ROOT;
export default {
  /**
   * 查询应用管理
   * @param userId
   */
  configList(userId) {
    return services.get(ROOT+'/agent/parameter/list', {
      action: '查看所有应用',
      params: { userId }
    });
  },
  /**
   * 添加应用
   * @param params
   */
  addApplication(params) {
    return services.post(ROOT + '/agent/parameter/add', params, {
      action: '添加应用'
    });
  }
};
