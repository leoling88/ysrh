<template>
  <div class="container marBot-1">
    <div v-if="listStyle == 1">
      <div class="list-title1">
        <img src="../../assets/images/indicon/rhfw.png" class="icon">
        <router-link :to="`/login?openId=`+openId" v-if="myisWeiJingAuth==0">请登录</router-link>
        <b v-if="myisWeiJingAuth==1">欢迎使用融合活动业务</b>
      </div>
      <div class="list-1">
        <div class="list-1-1"  @click="linshiClick('rh01')">融合学堂 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="linshiClick('rh02')">融合活动 <i class="icon-jt"></i></div>
        <div class="list-1-1" @click="linshiClick('dj01')">党建活动 <i class="icon-jt"></i></div>
      </div>
    </div>
    <div v-if="listStyle == 2">
      <div class="list-title1">
        <img src="../../assets/images/indicon/sjssp.png" class="icon">
        <router-link :to="`/login?openId=`+openId" v-if="myisWeiJingAuth==0">请登录</router-link>
        <b v-if="myisWeiJingAuth==1">欢迎使用事件随手拍业务</b>
      </div>
      <div class="list-1">
        <div class="list-1-1"  @click="clickSuiShouPai('社区环境')">社区环境 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="clickSuiShouPai('安全隐患')">安全隐患 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="clickSuiShouPai('社区报警')">社区报警 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="clickSuiShouPai('可疑人员')">可疑人员 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="clickSuiShouPai('意见收集')">意见收集 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="clickSuiShouPai('结果反馈')">结果反馈 <i class="icon-jt"></i></div>
      </div>
    </div>
    <div v-if="listStyle == 3">
      <div class="list-title1">
        <img src="../../assets/images/indicon/jzyw.png"  class="icon">
        <router-link :to="`/login?openId=`+openId" v-if="myisWeiJingAuth==0">请登录</router-link>
        <b v-if="myisWeiJingAuth==1">欢迎使用居住业务</b>
      </div>
      <div class="list-1">
        <div class="list-1-1 listmorea" v-if="myisWeiJingAuth==1"><router-link :to="`/residencePermit?openId=${this.openId}&idCard=${this.idCard}&name=${this.name}`"
      >居住证</router-link><i class="icon-jt"></i></div>
        <div class="list-1-1 listmorea" v-if="myisWeiJingAuth==0"><router-link :to="`/login?openId=`+openId"
        >居住证</router-link><i class="icon-jt"></i></div>
        <div class="list-1-1" @click="jumpLeasingContract">房屋租赁备案 <i class="icon-jt"></i></div>
      </div>
    </div>
    <div v-if="listStyle == 4">
      <div class="list-title1">
        <img src="../../assets/images/indicon/sb.png" class="icon">
        <router-link :to="`/login?openId=`+openId" v-if="myisWeiJingAuth==0">请登录</router-link>
        <b v-if="myisWeiJingAuth==1">欢迎使用社保业务</b>
      </div>
      <div class="list-1">
        <div class="list-1-1"   @click="linshiClick('sb01')">缴费状态 <i class="icon-jt"></i></div>
        <div class="list-1-1"  @click="linshiClick('sb02')">缴费明细 <i class="icon-jt"></i></div>
      </div>
    </div>
    <div v-if="listStyle == 5">
      <div class="list-title1">
        <img src="../../assets/images/indicon/gjj.png"  class="icon">
        <router-link :to="`/login?openId=`+openId" v-if="myisWeiJingAuth==0">请登录</router-link>
        <b v-if="myisWeiJingAuth==1">欢迎使用公积金业务</b>
      </div>
      <div class="list-1" v-if="myisWeiJingAuth==1">
        <div class="list-1-1 listmorea" ><router-link to="/hund/login">缴费状态</router-link> <i class="icon-jt"></i></div>
        <div class="list-1-1 listmorea"><router-link to="/hund/login">缴费明细</router-link> <i class="icon-jt"></i></div>
      </div>
      <div class="list-1" v-if="myisWeiJingAuth==0">
        <div class="list-1-1 listmorea" ><router-link :to="`/login?openId=`+openId">缴费状态</router-link> <i class="icon-jt"></i></div>
        <div class="list-1-1 listmorea"><router-link :to="`/login?openId=`+openId">缴费明细</router-link> <i class="icon-jt"></i></div>
      </div>
    </div>

  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
export default {
  components: { Group, Cell },
  mixins: [mixins],
  data() {
    return {
      openId: this.$route.params.openid,
      listStyle: this.$route.query.listStyle,
      title:'',
      article: [],
      myisWeiJingAuth:this.$route.query.myisWeiJingAuth,//0:未登录，1:已登录
    };
  },
  methods: {
    clickSuiShouPai(index) {
      if(this.myisWeiJingAuth==1){
        this.$router.push({ path: "/suishoupai/" + this.openId + "/" + index });
      }else{
        this.$router.push({ path: "/login?openId=" + this.openId });
      }
    },
    linshiClick(comId) {
      if(this.myisWeiJingAuth==1){
        if (comId === "rh01") {
          this.$router.push({
            path: "/ronghexuetang/" + this.openId + "/rh01"
          });
        } else if (comId === "rh02") {
          this.$router.push({
            path: "/ronghehuodong/" + this.openId + "/rh02"
          });
        } else if (comId === "dj01") {
          this.$router.push({ path: "/dangjian/" + this.openId + "/dj01" });
        } else if (comId === "sb01") {
          if (this.idCard) {
            this.$router.push({ path: "/paymentdetails/" + this.idCard });
          }
        } else if (comId === "sb02") {
          if (this.idCard) {
            this.$router.push({ path: "/paymentstatus/" + this.idCard });
          }
        }
      }else{
        this.$router.push({ path: "/login?openId=" + this.openId });
      }

    },
    jumpLeasingContract() {
      this.getsaveUserBehaviourTitle(this.openId, 34); //房屋备案
      if(this.myisWeiJingAuth==1){
        this.$router.push({ path: "/leasingContract?openId=" + this.openId });
      }else{
        this.$router.push({ path: "/login?openId=" + this.openId });
      }

    },
    getsaveUserBehaviourTitle(openId, id) {
      console.log(this.openId, "openid");
      api.saveUserBehaviourTitle(openId, id).then(res => {
          console.log(res, "res");
        })
        .catch(err => {
          console.log(err, "错误");
        });
    },

  },
  created() {

  },
  mounted() {
    console.log(this.myisWeiJingAuth)
    let title
    if(this.listStyle == 1) title = '融合活动'
    else if(this.listStyle == 2) title = '事件随手拍'
    else if(this.listStyle == 3) title = '居住业务'
    else if(this.listStyle == 4) title = '社保'
    else if(this.listStyle == 5) title = '公积金'
    document.title = title
  }
};
</script>
<style lang="less" scoped>
.list-title1{padding:.2rem .4rem;color:#000;background:#fff;overflow:hidden;}
.list-title1 .icon{width:.5rem;float:left;margin-top:.15rem;margin-right:.2rem;}
.list-title1 b,.list-title1 a{font-size:.34rem; line-height:.8rem;font-weight: 100;color:#888;}
.list-title1 p{padding-left:.7rem;font-size:.24rem;color:#888;}
.list-1{margin-top:.2rem;padding:.2rem;background:#fff;}
.list-1-1{position: relative;border-bottom:.01rem solid #ccc;padding:.2rem;}
.list-1-1:last-child{border:none;}
.list-1-1 a{color:#000;}
.marBot-1 {
  margin-bottom: 1rem;
}

.icon-jt{color:#ccc;position:absolute;right:.3rem;margin-top:-.08rem;top:50%;width:.16rem;height:.16rem;border-bottom:solid 2px currentColor;border-left:solid 2px currentColor;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}
  .listmorea a{display:block;}
</style>
