<template>
  <div class="dss_chart_map">
    <span class="title">地图占比</span>
    <chart :options="options"></chart>
  </div>
</template>

<script>
  import Chart from './ChartEmpty';
  import map from '../../assembler/map'
export default {
  components: {
    Chart
  },
  data () {
    return {
      options:null,
    }
  },
  mounted(){
    this.options = map.assembleMapOptions(this.fakeData(), 'name', 'value' , 'type');
  },
  methods: {
    fakeData(){
      const mapData = [
        {type: 'iphone', name: '湖北', value: 10},
        {type: '华为', name: '湖南', value: 130},
        {type: '华为', name: '广东', value: 150},
        {type: '华为', name: '浙江', value: 100},
        {type: 'vivo', name: '江西', value: 150},
        {type: 'iphone', name: '新疆', value: 100},
      ];
      return mapData;
    }
  }
}
</script>
<style lang="scss">
  .dss_chart_map {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width:100%;
    height:100%;
    .title{
      position:absolute;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      margin-bottom: 15px;
    }
  }
</style>
