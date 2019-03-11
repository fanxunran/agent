<template>
  <div class="dss_chart_pie">
    <chart :options="options"></chart>
  </div>
</template>

<script>
import Chart from './ChartEmpty';
import pie from '../../assembler/pie'
export default {
  components: {
    Chart
  },
  data (){
    return{
      options:null,
    }
  },
  computed: {

  },
  mounted(){
    this.options = pie.pie(this.fakeData());
  },
  methods: {
    fakeData(){
      const pieData = [
        {tradeChannel: "扫码购", tradePercent: 0.001907978725254542},
        {tradeChannel: "SCO2.0", tradePercent: 0.08874536049840509},
        {tradeChannel: "O2O", tradePercent: 0.31113967378259827},
        {tradeChannel: "普通收银机", tradePercent: 0.5982069869937421}
      ];
      return pieData;
    }
  }
};
</script>
<style>
.dss_chart_pie {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width:100%;
  height:100%;
}

</style>
