<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img class="userImg" :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-4-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px;">
        <el-table :data="tableData"  style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px; width: 1200px" :span="16">
      <div class="num" style="width: 100%;">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${ item.icon }`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 270px; margin-bottom: 20px;">
        <div style="height: 280px;" ref="echarts"></div>
        <!-- <echart :chartData="echartData.order" style="height: 280px" /> -->
      </el-card>
      <!-- <div class="graph" style="display: flex; justify-content: space-between;"> -->
        <el-card style="height: 260px;">
          <!-- <echart :chartData="echartData.user" style="height: 240px" /> -->
          <div style="height: 240px;" ref="userEcharts"></div>
        </el-card>
        <!-- <el-card style="height: 260px;">
          <div style="height: 240px;" ref="videoEcharts"></div>
        <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" /> -->
        <!-- </el-card> -->
      <!-- </div> -->
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../../api/data.js'
import * as echarts from 'echarts'
// import echart from '../../components/ECharts.vue'

export default {
  name: 'home',
  // components: {
  //   echart
  // },
  data () {
    return {
      userImg: require('@/assets/user.png'),
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 234,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 'success',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 2234,
          icon: 's-goods',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 250,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
      // echartData: {
      //   order: {
      //     xData: [],
      //     series: []
      //   },
      //   user: {
      //     xData: [],
      //     series: []
      //   },
      //   video: {
      //     series: []
      //   }
      // }
    }
  },
  mounted () {
    getData().then(res => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        // 折线图
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }
        // this.echartData.order.xData = xData
        // this.echartData.order.series = series
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
      }

      // 柱状图
      const userOption = {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category', // 类目轴
          data: data.userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#9F5F9F', '#17b3a3'],
        series: [
          {
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          }
        ]
      }
      // this.echartData.order.xData = data.userData.map(item => item.date)
      // this.echartData.order.series =  [
      //     {
      //       name: '新增用户',
      //       data: data.userData.map(item => item.new),
      //       type: 'bar'
      //     },
      //     {
      //       name: '活跃用户',
      //       data: data.userData.map(item => item.active),
      //       type: 'bar'
      //     }
      //   ]

      const U = echarts.init(this.$refs.userEcharts)
      U.setOption(userOption)

      // 饼图
      const videoOption = {
        tooltip: {
          tigger: 'item'
        },
        color: [
          '#7FFF00',
          '#70DB93',
          '#5C3317',
          '#FF7F00',
          '#871F78',
          '#9F9F5F',
          '#FF7F00'
        ],
        series: [
          {
            data: data.videoData,
            type: 'pie'
          }
        ]
      }
      const V = echarts.init(this.$refs.videoEcharts)
      V.setOption(videoOption)

      // this.echartData.video.series = [
      //     {
      //       data: data.videoData,
      //       type: 'pie'
      //     }
      //   ]
      // console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    display: flex;
    .el-col {
      border-radius: 4px;
      .user {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .userImg {
          height: 200px;
          width: 200px;
          border-radius: 50%;
        }
        .userInfo {
          align-items: center;
          .name {
            font-size: 32px;
            font-weight: 600;
          }
          .access {
            color: gray;
          }
        }
      }
        .login-info {
          font-size: 12px;
          color: gray;
          padding-top: 10px;
        }
    }
    .num {
      display: flex;
      flex-wrap: wrap;
      // margin-bottom: 20px;
      .el-card {
        width: 350px;
        margin-right: 20px;
        margin-bottom: 20px;
        .icon {
          width: 60px;
          color: #fff;
          font-size: 30px;
          line-height: 90px;
          text-align: center;
        }
        .num {
          font-weight: 600;
          font-size: 20px;
          text-indent: 2em;
        }
        .txt {
          text-indent: 2em;
        }
      }
    }
    // .graph {
    //   display: flex;
    //   flex: 1;
    // }
  }

</style>
