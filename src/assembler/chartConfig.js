import echarts from 'echarts';

export default {
  initChart(option, echartId) {
    let container = document.getElementById(echartId);
    let myChart = echarts.init(container);

    // 为 echarts 对象加载数据
    myChart.setOption(option, true);
    // 返回给业务使用，设置自定义的 option
    return myChart;
  }
};
