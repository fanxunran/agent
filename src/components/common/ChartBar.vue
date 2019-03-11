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
    this.options = bar.assembleBarXOptions(this.fakeData(), 'date', 'salesVolume', 'level',);
  },
  methods: {
    fakeData(){
      const pieData = [
        {date: '10/1', salesVolume: 10, level: '高'},
        {date: '10/2', salesVolume: 130, level: '高'},
        {date: '10/3', salesVolume: 150, level: '高'},
        {date: '10/4', salesVolume: 100, level: '高'},
        {date: '10/3', salesVolume: 150, level: '中'},
        {date: '10/4', salesVolume: 100, level: '低'},
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

