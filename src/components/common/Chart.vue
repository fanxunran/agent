<template>
  <div ref="chart"
       class="chart-container"
       :style="{ height: height, width: width }"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'Chart',
  props: {
    options: null,
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    svg: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.render();
      }
    }
  },
  methods: {
    render() {
      if (this.chart && this.options) {
        this.chart.setOption(this.options, true);
      }
    },
    resize() {
      if (this.__resizeTimeout) {
        clearTimeout(this.__resizeTimeout);
      }
      // 图表宽度为0，不进行resize（如果宽度为0调用resize会导致图表变得很小）
      if (this.$el.clientWidth) {
        this.__resizeTimeout = setTimeout(() => {
          this.chart && this.chart.resize();
        }, 400);
      }
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, null, {
      renderer: this.svg ? 'svg' : 'canvas'
    });
    this.render();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  }
};
</script>
