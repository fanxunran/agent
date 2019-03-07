<template>
  <div class="dss_chart_trend">
    <dl>
      <template v-for="(item,index) in data" v-if="index<3">
        <dt><i>{{index+1}}.</i>{{item.fName}}</dt>
        <dd>
          <ul>
            <!-- <el-tooltip placement="top" popper-class="red" enterable>
              <div slot="content" v-html="getTip(item.fUserCount)"></div>
              <li></li>
            </el-tooltip> -->
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <span>{{Number(item.fUserCount).toLocaleString()}}</span>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    formatter: {
      type: Function,
      default: null
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getTip (val) {
      return `<div class="dss_tooltip_d">2018-05-21<br/>客流量：${Number(val).toLocaleString()}</div>`
    }
  }
}
</script>
<style>
.dss_chart_trend {
  position: relative;
  text-align: left;
  margin-top: 16px;
}
.dss_chart_trend i {
  font-style: normal;
  margin-right: 10px;
}
.dss_chart_trend dt {
  margin-top: 50px;
}
.dss_chart_trend dt:first-child {
  margin: 0;
}
.dss_chart_trend dl,
.dss_chart_trend dd,
.dss_chart_trend ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.dss_chart_trend dd {
  height: 30px;
  font-size: 0;
  margin-top: 10px;
}
.dss_chart_trend ul {
  height: 100%;
}
.dss_chart_trend ul,
.dss_chart_trend span {
  display: inline-block;
  width: 50%;
}

.dss_chart_trend ul::after {
  content: '';
  display: inline-block;
  height: 30px;
  vertical-align: bottom;
}
.dss_chart_trend li {
  width: 4px;
  height: 0;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 2px;
  height: attr(data-val) " ";
  background-color: #FB6042
}
.dss_chart_trend span {
  color: #3B4757;
  font-weight: bold;
  font-size: 22px;
}
@media screen and (max-width: 1160px) {
  .dss_chart_trend ul,
  .dss_chart_trend span {
    width: 100%;
  }
}
</style>
