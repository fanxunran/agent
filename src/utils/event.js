function getTrigger() {
  let eventHanle = window.dispatchEvent;
  if (!eventHanle) {
    eventHanle = window.fireEvent;
  }

  if (typeof (Event) === 'function') {
    return function (eventName) {
      const evt = new window.Event('resize');
      eventHanle(evt);
    };
  }

  return function (eventName) {
    const evt = window.document.createEvent('UIEvents');
    evt.initUIEvent(eventName, true, false, window, 0);
    eventHanle(evt);
  };
}

const trigger = getTrigger();

export default {
  /**
   * 触发事件
   * @param {String} eventName
   */
  trigger(eventName) {
    trigger(eventName);
  }
};
