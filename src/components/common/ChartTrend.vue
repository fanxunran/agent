<template>
  <div class="dss_chart_trend">
    <div class="da-block bar-box"
         >
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
  import line from '../../assembler/line'
  import time from '../../utils/time.js';
  const trendTypeEnum = {
    NEW: { value: 'new', label: '新增会员' },
    ACTIVE: { value: 'active', label: '活跃会员数' },
    NEW_RATE: { value: 'newRage', label: '新增会员占比' },
    CUST_PRICE: { value: 'custPrice', label: '会员客单价' }
  };
  const lgendEnum = { LAST_WEEK: { label: '上周同期', value: 'last' }, TODAY: { label: '今日', value: 'new' } };
export default {
  components:{Chart},
  data() {
    return{
      newData: null,
      activeData: null,
      newRateData: null,
      custPriceData: null,
      trendTypeEnum,
      trendType: trendTypeEnum.NEW,
      trendOptions: null,
      trendData: null
    }
  },
  mounted() {
    this.listNewData();
  },
  watch: {
    trendType(newVal, oldVal) {
      this.trendData = null;
      switch (newVal) {
        case trendTypeEnum.NEW:
          this.setNewOptions();
          break;
        case trendTypeEnum.ACTIVE:
          this.setActiveOptions();
          break;
        case trendTypeEnum.NEW_RATE:
          this.setNewRateOptions();
          break;
        case trendTypeEnum.CUST_PRICE:
          this.setCustPriceOptions();
          break;
      }
    }
  },
  methods: {
    setNewOptions() {
      if (!this.newData) {
        this.listNewData();
      } else {
        this.setTrendLineOptions();
      }
    },
    setActiveOptions() {
      if (!this.activeData) {
        this.listActiveData();
      } else {
        this.setTrendLineOptions();
      }
    },
    setNewRateOptions() {
      if (!this.newRateData) {
        this.listNewRateData();
      } else {
        this.setTrendLineOptions();
      }
    },
    setCustPriceOptions() {
      if (!this.custPriceData) {
        this.listCustPriceData();
      } else {
        this.setTrendLineOptions();
      }
    },
    listNewData() {
        this.newData = this.fakeTrendData();
        this.setTrendLineOptions();
    },
    listActiveData()
    {
      this.activeData = this.fakeTrendData();
      this.setTrendLineOptions();
    },
    listCustPriceData()
    {
      this.custPriceData = this.fakeTrendData();
      this.setTrendLineOptions();
    },
    listNewRateData()
    {
      this.newRateData = this.fakeTrendData();
      this.setTrendLineOptions();
    },
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
        'orderTime',
        valueType,
        'type',
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
          newMember: 20,
          type: 'new'
        },
        {
          orderTime: '07:00',
          newMember: 40,
          type: 'new'
        },
        {
          orderTime: '08:00',
          newMember: 42,
          type: 'new'
        },
        {
          orderTime: '09:00',
          newMember: 40,
          type: 'new'
        },
        {
          orderTime: '10:00',
          newMember: 400,
          type: 'new'
        },
        {
          orderTime: '06:00',
          newMember: 520,
          type: 'last'
        },
        {
          orderTime: '07:00',
          newMember: 20,
          type: 'last'
        },
        {
          orderTime: '08:00',
          newMember: 70,
          type: 'last'
        },
        {
          orderTime: '09:00',
          newMember: 80,
          type: 'last'
        },
        {
          orderTime: '10:00',
          newMember: 90,
          type: 'last'
        }
      ];
    }
  }
}
</script>
<style lang="scss">
.dss_chart_trend {
  position: relative;
  text-align: left;
  width: 100%;
  height: 100%;

  .bar-box {
    position: relative;

    .action-float {
      position: absolute;
    }
    .bar-action-box {
      z-index: 1;
      overflow: hidden;

      .bar-title {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #222b4d;
        line-height: 22px;
        margin-right: 31px;
      }
      .bar-action-active {
        color: #3879fb;
        border-bottom: 2px solid #3879fb;
      }
      .bar-action + .bar-action {
        margin-left: 20px;
      }
      .bar-action {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}

</style>
