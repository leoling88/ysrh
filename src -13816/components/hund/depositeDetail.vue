<template>
    <div class="section">
    <!-- 筛选 -->
    <div class="pay-screen">
        <div class="pay-screen-txt">筛选</div>
        <div class="pay-screen-times">
            <div data-time='0' class="pay-time pay-start-time">
              <datetime class="date-time" @on-change="getTmpImput" v-model="startTime" format="YYYY"></datetime>
            </div>
          </div>
          <div class="pay-screen-times2"></div>
    </div>
    <!-- 筛选 END-->

    <!-- 缴存明细 -->
    <div class="pay-li">
      <!-- 缴存明细信息 -->
      <div class="pay-info">
        <div class="pay-i-title">
          <div class="pay-i-common">业务类型</div>
          <div class="pay-i-common">汇缴年月</div>
          <div class="pay-i-common">记账日期</div>
          <div class="pay-i-common">发生金额</div>
        </div>

        <div class="pay-i-content">
          <!-- Li -->
          <div class="pay-i-c-li" v-for="(item, index) in socialSecurity" :key="index">
            <div class="pay-i-common">{{item.ywlxms}}</div>
            <div class="pay-i-common">{{item.ywrq}}</div>
            <div class="pay-i-common">{{item.hjny}}</div>
            <div class="pay-i-common">￥{{item.fse}}</div>
          </div>
          <!-- Li END -->
        </div>
      </div>
      <!-- 缴存明细信息 END -->
    </div>
    <!-- 缴存明细 END -->
  </div>

</template>

<script>
import baseUrl from "../../api/config";
import api from "../../api/api";
import { mapState } from "vuex";
import { Datetime } from 'vux'
import mixins from "../../mixins/mixins.js";
export default {
  components: {
    Datetime
  },
  mixins: [mixins],
  data() {
    return {
      startTime:'2018',//缴存年份
      socialSecurity:null,//缴存列表
    };
  },
  computed: {
    ...mapState(["userLoginInfo"])
  },
  created() {
    //判断是否已经登录过,先注释掉，会影响左上角返回首页
//    if(!this.userLoginInfo){
//      this.$router.push({path: '/hund/login'});
//      return false;
//    }
    this.getUserDetails(this.startTime);
  },
  methods: {
    //获取缴存明细
    getUserDetails(startTime) {
      // 显示Loading
      this.$vux.loading.show({text: '加载中...'});
      //参数
      let params = {
        gjjzh: this.userLoginInfo.gjjzh,
        hjnf: startTime,
        capinfoSession: this.userLoginInfo.capinfoSession,
        pageno: 1,
        pagesize: 20
      };
      api.userDetails(params).then(res => {
        // 隐藏Loading
        this.$vux.loading.hide();
        if (res.data.success) {
          res.data.jsonRes.forEach((item, index) => {
            if (item.hjny !== " ") {
              item.hjny = item.hjny ? item.hjny.substring(0, 4) + "-" + item.hjny.substring(4, 6):'';
            } else {
              item.hjny = "-";
            }
            if (item.ywrq !== " ") {
              item.ywrq = item.ywrq ? (item.ywrq.substring(0, 4) + "-" +
                item.ywrq.substring(4, 6) +
                "-" +
                item.ywrq.substring(6)):'';
            } else {
              item.ywrq = "-";
            }
          });
          //缴存列表
          this.socialSecurity=res.data.jsonRes;
        }
      });
    },
    //刷选年份
    getTmpImput () {
      //this.startTime = this.appointment;
      this.getUserDetails(this.startTime);
      //console.log('选择年份：',this.appointment)
    }
  },
  mounted () {

  },
};
</script>
 <style scoped>
/* 筛选 */
.pay-screen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.8rem;
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px #dddddd;
  margin-bottom: 1px;
}
.pay-screen > .pay-screen-txt {
  flex-grow: 1;
  justify-content: space-around;
  font-size: .40rem;
  margin-left: .2rem;
  text-align: center;
}
.pay-screen > .pay-screen-times {
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  margin-right: .4rem;
  position: relative;
}
.pay-screen > .pay-screen-times2 {
  flex-grow: 4;
}
.pay-screen > .pay-screen-times > .pay-time {
  padding: 0 .2rem;
  flex-grow: 1;
  justify-content: space-around;
  height: .8rem;
  line-height: .8rem;
  border-radius: .2rem;
  border: solid 1px #cccccc;
  cursor: pointer;
  color: #bbbbbb;
  width: .2rem;
  text-align: center;
}
/* 筛选 END */

/* 社保信息 */
.pay-li {
  margin-bottom: .8rem;
}
.pay-title {
  font-size: 34px;
  color: #000000;
  padding: 29px;
  background-color: #ffffff;
  font-weight: bold;
}
.pay-info {
  background-color: #ffffff;
  padding: 0 .4rem;
}
.pay-info .pay-i-title {
  display: flex;
  justify-content: space-between;
  height: .9rem;
  line-height: .9rem;
  border-bottom: solid 1px #dddddd;
}
.pay-info .pay-i-content .pay-i-c-li {
  display: flex;
  justify-content: space-between;
  height: .9rem;
  line-height: .9rem;
}
.pay-info .pay-i-content .pay-i-c-li .pay-i-common {
  color: #888888;
  font-size: .24rem;
}
.pay-info .pay-i-common {
  flex-grow: 1px;
  width: 25%;
  text-align: center;
}

/* 社保信息 END*/

/*时间控件样式*/
.date-time{
  width: 100%;
}
.weui-cell{
  padding: 0;
  padding-right: 10px;
}
/*时间控件样式 END*/
</style>

