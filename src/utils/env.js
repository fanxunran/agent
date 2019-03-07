/**
 * Created by love on 18/7/30.
 * @author trumpli<李志伟>
 */
const env = {
  isThirdCorp: false,
  isQuanHou: false,
  search: {}
};

(location.search.split('?')[1] || '').split('&').forEach((item) => {
  item = item.split('=');
  if (item[0] == 'third-corp') {
    env.isThirdCorp = true;
    if (item[1] == 'quanhou') {
      env.isQuanHou = true;
    }
  }
  if (item[0] == 'path') {
    env.path = item[1];
  }
  env.search[item[0]] = item[1];
});

export default {
  //是否来自第三方合作伙伴
  isThirdCorp(){
    return env.isThirdCorp;
  },
  //是否来自泉后
  isQuanHou(){
    return env.isQuanHou;
  },
  getSearchValue(key){
    return env.search[key];
  }
};
