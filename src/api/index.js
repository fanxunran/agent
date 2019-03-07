import services from '../utils/services';
const SCHEMA = '/athena';
export default {
  /**
   * 查询应用管理
   * @param userId
   */
  configList(userId) {
    return services.get('/agent/parameter/list', {
      action: '查看所有应用',
      params: { userId }
    });
  },
  /**
   * 添加应用
   * @param params
   */
  addApplication(params) {
    return services.post(SCHEMA + '/appmanager/add', params, {
      action: '添加应用'
    });
  }
};
