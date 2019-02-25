<template>
  <div>
  <div class="section_top">
    <div class="card_cont">
      <div class="card_header">
        <div class="card_title">公积金</div>
      </div>
      <div class="card_info_cont">
        <div class="item">
          <span>缴纳人员：</span>{{desensitization(userLoginInfo.xm,1)}}
        </div>
        <!-- <div class="item">
          <span>缴纳人员：</span>******
        </div> -->
        <div class="item">
          <span>账户状态：</span>{{userLoginInfo.zhzt == 'jc'?'缴存':'封存'}}
        </div>
        <!-- <div class="item">
          <span>账户状态：</span>******
        </div> -->
        <div class="item">
          <span>公积金号：</span>{{desensitization(userLoginInfo.gjjzh,3)}}
        </div>
        <!-- <div class="item">
          <span>公积金号：</span>******
        </div> -->
        <div class="item">
          <span>所属单位：</span>{{desensitization(dwmc,6)}}
        </div>
        <!-- <div class="item">
          <span>所属单位：</span>******
        </div> -->
      </div>
    </div>
    <div class="card_state">
      <div class="item">
        <span>个人账户余额</span>
        <span class="text-red">￥{{grye}}</span>
      </div>
      <div class="item">
        <span>末次缴存金额</span>
        <span class="text-bule">￥{{jcje}}</span>
      </div>
    </div>
  </div>
  <div class="link_cont">
    <router-link to="/hund/depositeDetail" class="navigator">缴存明细</router-link>
    <router-link to="/hund/depositeInfo" class="navigator no-border">缴存信息</router-link>
<!--     <a class="navigator navigator-hr" @click="noOpen" href="#">前台提取预约</a>
    <a class="navigator" @click="noOpen" href="#">公积金在线提取</a>
    <a class="navigator no-border" @click="noOpen" href="#">贷款计算器</a> -->
  </div>
  <div class="back-index">
    <router-link to="/" class="card_title card_title_right">返回首页</router-link>
  </div>
  </div>
</template>
<script>
import baseUrl from "../../api/config";
import api from "../../api/api";
import { mapState } from "vuex";
import mixins from "../../mixins/mixins.js";
import { setTimeout } from "timers";
export default {
  mixins: [mixins],
  data() {
    return {
      dwmc: null, //所属单位
      grye: null, //个人余额
      jcje: null //末次缴存金额
    };
  },
  computed: {
    ...mapState(["userLoginInfo"])
  },
  created() {
    //判断是否已经登录过,先注释掉，会影响左上角返回首页
//    if (!this.userLoginInfo) {
//      this.$router.push({ path: "/hund/login" });
//      return false;
//    }
    this.userDeposit();
  },
  methods: {
    //公积金个人缴存信息查询
    userDeposit() {
      // 显示Loading
      this.$vux.loading.show({ text: "加载中..." });
      let _this = this;
      //参数
      let params = {
        gjjzh: this.userLoginInfo.gjjzh, //公积金号
        zjh: this.userLoginInfo.zjh, //身份证
        capinfoSession: this.userLoginInfo.capinfoSession
      };
      api.userDeposit(params).then(res => {
        // 隐藏Loading
        this.$vux.loading.hide();
        if (res.data.success) {
          this.dwmc = res.data.jsonRes[0].dwmc; //所属单位
          this.grye = res.data.jsonRes[0].ye; //个人余额
          this.jcje =
            Number(res.data.jsonRes[0].grjce) +
            Number(res.data.jsonRes[0].dwjce); //末次缴存金额
        }
      });
      setTimeout(() => {
        // 隐藏Loading
        this.$vux.loading.hide();
      }, 10000);
    },
    //暂未开通
    noOpen() {
      return this.$store.commit("SHOWTOAST", "暂未开通");
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.section_top {
  overflow: hidden;
}
.section_top {
  background: #fff;
  overflow: hidden;
  padding-bottom: 0.6rem;
}
.card_cont {
  background-image: url(../../assets/images/public_foundation_bg.jpg);
  background-size: 100% 100%;
  margin: 0.4rem;
  color: #fff;
}
.card_header {
  line-height: 0.9rem;
  overflow: hidden;
  margin-left: 0.8rem;
  height: 0.7rem;
}
.card_cont .card_title {
  font-size: 0.34rem;
  float: left;
}
.back-index .card_title_right {
  display: block;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  background-color: rgb(51, 137, 255);
  color: #fff;
  font-size: 0.34rem;
  border-radius: 0.2rem;
  margin-bottom: 0.6rem;
  margin-top:0.1rem;
}
.card_cont .card_eye {
  width: 0.36rem;
  height: 0.24rem;
  margin-top: 0.32rem;
  float: left;
}
.card_cont .add_card {
  width: 0.42rem;
  height: 0.27rem;
  margin-top: 0.32rem;
  float: right;
}

.card_info_cont {
  overflow: hidden;
  margin-left: 0.2rem;
}
.card_info_cont .item {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  margin: 0.1rem 0;
  font-size: 0.3rem;
  overflow: hidden;
}
.card_info_cont .item span {
  font-size: 0.3rem;
  color: rgba(255, 255, 255, 0.5);
  margin-right: 0.2rem;
}

.card_state {
  width: 100%;
  padding-top: 0.3rem;
  overflow: hidden;
  display: flex;
}
.card_state .item {
  width: 50%;
  text-align: center;
  color: #353535;
  font-size: 0.3rem;
}
.card_state .item:first-of-type .tips {
  font-size: 0.3rem;
  color: #f4333c;
}
.card_state .item:last-of-type .state {
  font-size: 0.3rem;
  color: #3389ff;
}

.card_state .item:first-of-type {
  border-right: 0.02rem solid #e6e6e6;
}
.card_state .item span:first-of-type {
  padding-bottom: 0.3rem;
}
.card_state .item span {
  display: block;
  font-size: 0.3rem;
  color: #353535;
}
.card_state .item text:first-of-type {
  margin: 0.1rem 0;
}

.pay_btn {
  width: 6.9rem;
  overflow: hidden;
  margin: 0.4rem 0.15rem 0 0.15rem;
  font-size: 34px;
  background-image: linear-gradient(#3389ff, #3389ff),
    linear-gradient(#3389ff, #3389ff);
  border-radius: 0.2rem;
}

.link_cont {
  margin-top: 0.2rem;
  padding: 0.3rem 0;
}
.link_cont .freeState {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 16px;
}
.link_cont .navigator {
  display: block;
  color: #000;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  padding: 0px 5%;
  border-bottom: 0.02rem solid rgb(221, 221, 221);
  // background-size: 0.1rem 0.16rem;
  background-repeat: no-repeat;
  background-position: 95% 50%;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg width="10" height="16" viewBox="0 0 16 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="UI-KIT_基础元件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="9.9基础元件" transform="translate(-5809.000000, -8482.000000)" fill="#C7C7CC"><polygon id="Disclosure-Indicator" points="5811 8482 5809 8484 5820.5 8495 5809 8506 5811 8508 5825 8495"></polygon></g></g></svg>');
}
.navigator-hr {
  margin-top: 0.3rem;
}
</style>

