/**
 * 这里是控制菜单高亮显示的代码
 */
const keyHeader = document.getElementById('key-header');
export default {
  setOn(key) {
    const menuList = keyHeader.querySelectorAll('[on|=key]');
    const repeater = (list, key) => {
      for (let len = list.length - 1; len >= 0; len--) {
        const item = list[len];
        const keyName = item.getAttribute('on');
        if (!key) {
          item.className = item.className.replace(/on/g, '');
        } else if (keyName === key) {
          const temp = key.split('-');

          if (temp.length === 3) {
            const parentName = temp[0] + '-' + temp[1];
            const parentMenuList = keyHeader.querySelectorAll('[on=' + parentName + ']');
            repeater(parentMenuList, parentName);
          }
          if (item.className.indexOf('on') === -1) {
            item.className += ' on';
          }
        }
      }
    };
    repeater(menuList, key);
  },

  //设置活动监测中选中的菜单的颜色
  setActivityOn(key) {
    const listActivity = document.getElementById('list').classList;
    const effectActivity = document.getElementById('effect').classList;
    const highlightClass = 'activity-highlight';
    if (key === 'list') {
      listActivity.add(highlightClass);
      effectActivity.remove(highlightClass);
    } else if (key === 'effect') {
      listActivity.remove(highlightClass);
      effectActivity.add(highlightClass);
    }
  },

  //设置活动监测中选中的菜单的颜色
  setHeaderMenuOn(key) {
    const analysisClassList = document.getElementById('analysis').classList;
    const storeMgrClassList = document.getElementById('storeMgr').classList;
    const highlightClass = 'active-tab';
    if (key === 'analysis') {
      analysisClassList.add(highlightClass);
      storeMgrClassList.remove(highlightClass);
    } else if (key === 'storeMgr') {
      analysisClassList.remove(highlightClass);
      storeMgrClassList.add(highlightClass);
    }
  }
};
