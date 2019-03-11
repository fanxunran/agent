<template>
  <div class="dss_chart_bar">
    <chart :options="options"></chart>
  </div>
</template>

<script>
  import Chart from './ChartEmpty';
  import bar from '../../assembler/bar'
  export default {
    components: {
      Chart
    },
    data(){
      return{
        options:null,
      }
    },
    mounted(){
      this.options = bar.assembleBarYOptions(this.fakeData(), 'date', 'salesVolume', 'level', 0, false);
      if (this.options) {
        this.options.grid = {
          top: '19',
          bottom: '5',
          left: 100,
          right: 10
        };
        this.options.yAxis[0].axisLabel.margin = 100;
        /*不显示排序*/
         // this.options.yAxis[0].axisLabel.formatter = function(value) {
         //   return value;
         // };
      }
    },
    methods: {
      fakeData(){
        const pieData = [
          {date: '10/1', salesVolume: 10, level: '高'},
          {date: '10/2', salesVolume: 130, level: '高'},
          {date: '10/3', salesVolume: 150, level: '高'},
          {date: '10/4', salesVolume: 100, level: '高'},
        ];
        return pieData;
      }
    }
  }
</script>
<style>
  .dss_chart_bar {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width:100%;
    height:100%;
  }
</style>

