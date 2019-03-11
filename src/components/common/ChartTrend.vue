<template>
  <div class="dss_chart_trend">
    <div class="da-block bar-box"
         v-loading="overviewLoading.trend">
      <div class="bar-action-box action-float">
        <span class="da-block-title bar-title">指标小时趋势</span>
        <span class="bar-action"
              :class="trendType.value === trendTypeEnum.NEW.value ? 'bar-action-active' : ''"
              @click="trendType = trendTypeEnum.NEW">
          新增会员
        </span>
        <span class="bar-action"
              :class="trendType.value === trendTypeEnum.ACTIVE.value ? 'bar-action-active' : ''"
              @click="trendType = trendTypeEnum.ACTIVE">
          活跃会员数
        </span>
        <span class="bar-action"
              :class="trendType.value === trendTypeEnum.NEW_RATE.value ? 'bar-action-active' : ''"
              @click="trendType = trendTypeEnum.NEW_RATE">
          新增会员占比
        </span>
        <span class="bar-action"
              :class="trendType.value === trendTypeEnum.CUST_PRICE.value ? 'bar-action-active' : ''"
              @click="trendType = trendTypeEnum.CUST_PRICE">
          会员客单价
        </span>
      </div>
      <chart :options="trendOptions"
             height="300px"
             :key="trendType.value"
      ></chart>
    </div>
  </div>
</template>

<script>
  import Chart from './ChartEmpty';
  const trendTypeEnum = {
    NEW: { value: 'new', label: '新增会员' },
    ACTIVE: { value: 'active', label: '活跃会员数' },
    NEW_RATE: { value: 'newRage', label: '新增会员占比' },
    CUST_PRICE: { value: 'custPrice', label: '会员客单价' },
    CON_RATE: { value: 'conRate', label: '会员贡献率' }
  };
  const lgendEnum = { LAST_WEEK: { label: '上周同期', value: 'last' }, TODAY: { label: '今日', value: 'new' } };
export default {
  components:{Chart},
  data() {
    return{
      valueType: trendTypeEnum.NEW,
      trendOptions: null,
    }
  },
  mounted() {
    // this.setTrendLineOptions()
  },

  methods: {
    /**
     * 设置贡献分析报表options
     */
    setTrendLineOptions() {
      let valueType = 'newMember';

      switch (this.trendType.value) {
        case trendTypeEnum.NEW.value:
          this.trendData = this.newData;
          valueType = 'newMember';
          break;
        case trendTypeEnum.ACTIVE.value:
          this.trendData = this.activeData;
          valueType = 'activeMember';
          break;
        case trendTypeEnum.NEW_RATE.value:
          this.trendData = this.newRateData;
          valueType = 'rate';
          break;
        case trendTypeEnum.CUST_PRICE.value:
          valueType = 'pac';
          this.trendData = this.custPriceData;
          break;
      }

      if (!this.trendData || !this.trendData.length) {
        return;
      }

      const sortLegendData = [lgendEnum.TODAY, lgendEnum.LAST_WEEK];
      this.trendOptions = line.assembleLineOptions(
        this.trendData,
        'statDate',
        valueType,
        'timeGroup',
        time.getTimeList(1, 24),
        sortLegendData
      );

      if (this.trendOptions) {
        if (this.trendType === trendTypeEnum.NEW_RATE) {
          this.trendOptions.yAxis[0].axisLabel.formatter = '{value} %';
          this.trendOptions.yAxis[0].max = 100;
        } else {
          this.trendOptions.yAxis[0].axisLabel.formatter = '{value}';
          this.trendOptions.yAxis[0].max = null;
        }
      }
    },
    fakeTrendData() {
      return [
        {
          orderTime: '06:00',
          value: '420',
          type: 'new'
        },
        {
          orderTime: '07:00',
          value: '420',
          type: 'new'
        },
        {
          orderTime: '08:00',
          value: '420',
          type: 'new'
        },
        {
          orderTime: '09:00',
          value: '420',
          type: 'new'
        },
        {
          orderTime: '10:00',
          value: '420',
          type: 'new'
        },
        {
          orderTime: '06:00',
          value: '520',
          type: 'last'
        },
        {
          orderTime: '07:00',
          value: '620',
          type: 'last'
        },
        {
          orderTime: '08:00',
          value: '720',
          type: 'last'
        },
        {
          orderTime: '09:00',
          value: '820',
          type: 'last'
        },
        {
          orderTime: '10:00',
          value: '920',
          type: 'last'
        }
      ];
    }
  }
}
</script>
<style>
.dss_chart_trend {
  position: relative;
  text-align: left;
  margin-top: 16px;
  width:100%;
  height:100%;

  .bar-box {
    position: relative;

    .action-float {
      position: absolute;
    }
  }
}

</style>
