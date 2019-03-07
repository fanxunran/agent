<template>
  <div class="dss_chart_pie"
       :style="{width,height}">
    <chart :options="options"></chart>
    <div>
      <span>{{count|rate}}<b>{{title}}</b></span>
    </div>
  </div>
</template>

<script>
import Chart from './Chart';
export default {
  components: {
    Chart
  },
  props: {
    title: String,
    width: {
      type: String,
      default: '160px'
    },
    height: {
      type: String,
      default: '160px'
    },
    count: {
      type: Number,
      default: 0
    },
    otherCount: {
      type: Number,
      default: -1
    },
    mColor: {
      type: String,
      default: '#3499FE'
    },
    bgColor: {
      type: String,
      default: 'rgba(218, 224, 230, 0.4)'
    }
  },
  computed: {
    options() {
      return {
        color: [this.mColor, this.bgColor],
        series: [
          {
            type: 'pie',
            radius: ['60%', '90%'],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            silent: true,
            data: [this.count, this.otherCount === -1 ? 1 - this.count : this.otherCount]
          }
        ]
      };
    }
  }
};
</script>
<style>
.dss_chart_pie {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
.dss_chart_pie div {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.dss_chart_pie span {
  display: block;
  font-size: 20px;
  color: #99b4ce;
  font-weight: bold;
}
.dss_chart_pie b {
  color: #000;
  display: block;
  font-size: 14px;
  font-weight: normal;
}
</style>
