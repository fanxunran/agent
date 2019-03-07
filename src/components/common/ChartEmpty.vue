<template>
  <div class="dss-chart-empy"
       :style="{ height: height, width: width }">
    <div class="echart"
         ref="chart"></div>
  </div>
</template>
<style>
.dss-chart-empy .echart {
  height: 100%;
  width: 100%;
}
</style>

<script>
import echarts from 'echarts';
import td from 'throttle-debounce';

export default {
  name: 'Chart',
  props: {
    // echart options
    options: null,
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 如果组件在mounted阶段就被销毁，nextTick仍然会执行，所以需要判断$refs
      if (this.$refs.chart) {
        this.initChart();
      }
    });

    // 这个函数不能放在methods里，同个页面有多个相同组件，debounce会有影响
    this.resize = td.debounce(300, () => {
      if (this.echart) {
        if (this.$el.clientWidth) {
          this.echart.resize();
        }

        // 计算当前屏幕的宽度
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.$emit('resize', width);
      }
    });

    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  watch: {
    options: {
      immediate: true,
      handler(val, oldVal) {
        if (this.echart && this.options) {
          this.render();
        }
      }
    }
  },
  methods: {
    initChart() {
      this.echart = echarts.init(this.$refs.chart);

      if (this.options) {
        this.render();
      }
    },
    render() {
      this.echart.setOption(this.options, true);
    }
  }
};
</script>
