export default {
  getTimeList(startTime, endTime) {
    const timeList = [];
    for (let i = startTime; i <= endTime; i++) {
      let preZero = '';
      if (i < 10) {
        preZero = '0';
      }
      const time = preZero + i + ':00';
      timeList.push(time);
    }
    return timeList;
  }
};
