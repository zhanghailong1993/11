<template>
  <div class="content" >
    <div class="container">
      <div class="panel panel-default" v-for="(building,index) in buildings">
        <div class="panel-heading"><h3 class="panel-title text-center">{{ building.name }}</h3></div>
        <div class="panel-body">
          <ul class="list-group col-lg-3 col-md-3 col-xs-3">
            <li class="list-group-item text-center">计划开始</li>
            <li class="list-group-item text-center">{{ building.start_date | change}}</li>
          </ul>
          <ul class="list-group col-lg-3 col-md-3 col-xs-3">
            <li class="list-group-item text-center">计划完成</li>
            <li class="list-group-item text-center">{{ building.end_date | change }}</li>
          </ul>
          <ul class="list-group col-lg-3 col-md-3 col-xs-3">
            <li class="list-group-item text-center">计划工期</li>
            <li class="list-group-item text-center">{{ building.total_duration }}天</li>
          </ul>
          <ul class="list-group col-lg-3 col-md-3 col-xs-3">
            <li class="list-group-item text-center">已经施工</li>
            <li class="list-group-item text-center">{{ building.total_elapsed }}天</li>
          </ul>
        </div>
        <div class="panel-footer">
          <div class="jC">
            <div class="row">
              <h6 class="col-xs-2 col-md-2 col-sm-2 text-muted">实际进度</h6>
              <span class="col-xs-10 col-md-10 col-sm-10 text-primary">{{ building.real_progress |cal }}%</span>
            </div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" :style="{width:sum(index)+'%'}">
                <span class="sr-only">15% Complete</span>
              </div>
              <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="16" aria-valuemin="0" aria-valuemax="100" :style="{width:sum1(index)+'%'}">
                <span class="sr-only">1% Complete</span>
              </div>
            </div>
            <div class="row">
              <h6 class="col-xs-2 col-md-2 col-sm-2 text-muted">计划进度</h6>
              <span class="col-xs-10 col-md-10 col-sm-10">{{ building.plan_progress | cal }}%</span>
            </div>
            <div>
            </div>
          </div>
          <div class="cap">
            <h5 class="text-center text-muted">显示分部工程进度</h5>
            <span class="glyphicon glyphicon-chevron-down text-center btn" @click="showDetail(index)"></span>
          </div>
        </div>
        <div class="section" v-show="options[index - 1].showDetail1">
          <h4 class="text-center text-muted">分部工程</h4>
          <ul class="content">
            <li v-for="(part,index1) in building.parts">
              <p class="text-center"> 基础工程</p>
              <div class="clearfix">
                <ul class="list-group col-lg-3 col-md-3 col-xs-3">
                  <li class="list-group-item text-center">计划开始</li>
                  <li class="list-group-item text-center">{{ part.start_date | change }}</li>
                </ul>
                <ul class="list-group col-lg-3 col-md-3 col-xs-3">
                  <li class="list-group-item text-center">计划完成</li>
                  <li class="list-group-item text-center">{{ part.end_date | change }}</li>
                </ul>
                <ul class="list-group col-lg-3 col-md-3 col-xs-3">
                  <li class="list-group-item text-center">计划工期</li>
                  <li class="list-group-item text-center">{{ part.total_duration }}天</li>
                </ul>
                <ul class="list-group col-lg-3 col-md-3 col-xs-3">
                  <li class="list-group-item text-center">已经施工</li>
                  <li class="list-group-item text-center">{{ part.total_elapsed }}天</li>
                </ul>
              </div>
              <div class="jC">
                <div class="row">
                  <h6 class="col-xs-10 col-md-10 col-sm-10 text-muted">实际进度</h6>
                  <span class="col-xs-2 col-md-2 col-sm-2 text-primary">{{ part.real_progress | cal}}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :style="{width:deta(index,index1)+'%'}">
                    <span class="sr-only">{{ part.real_progress }}% Complete</span>
                  </div>
                  <div class="progress-bar progress-bar-info" :style="{width:sum2(index,index1)+'%'}"> <span class="sr-only">6% Complete (warning)</span> </div>
                </div>
                <div class="row">
                  <h6 class="col-xs-10 col-md-10 col-sm-10 text-muted">计划进度</h6>
                  <span class="col-xs-2 col-md-2 col-sm-2">{{ part.plan_progress | cal}}%</span>
                </div>
                <div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: ['db'],
  data () {
    let buildings = this.db.buildings
    return {
      buildings: buildings,
      showDetail1: false,
      options: [
        {showDetail1: false},
        {showDetail1: false},
        {showDetail1: false}
      ]
    }
  },
  methods: {
    sum: function (index) {
      return Math.floor(parseFloat(this.db.buildings[index].plan_progress) * 100)
    },
    deta: function (index, index1) {
      return Math.floor(parseFloat(this.db.buildings[index].parts[index1].plan_progress) * 100)
    },
    sum1: function (index) {
      return Math.round(parseFloat(this.db.buildings[index].real_progress) * 100) - Math.floor(parseFloat(this.db.buildings[index].plan_progress) * 100)
    },
    sum2: function (index, index1) {
      return Math.abs(Math.ceil(parseFloat(this.db.buildings[index].parts[index1].real_progress) * 100) - Math.round(parseFloat(this.db.buildings[index].parts[index1].plan_progress) * 100))
    },
    showDetail: function (value) {
      if (this.options[value - 1].showDetail1 === true) {
        this.options[value - 1].showDetail1 = false
      } else {
        for (let i = 0; i < this.options.length; i++) {
          this.options[i].showDetail1 = false
        }
        this.options[value - 1].showDetail1 = true
      }
    }
  }
}
</script>
<style>
  .content{
    padding-left: 0px
  }
</style>
