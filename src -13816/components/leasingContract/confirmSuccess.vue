<template>
  <div class="box">
    <div class="content">
      <div class="icon_pic">
        <img src="../../assets/images/icon_success.png">
      </div>
      <div class="bookres">提交成功</div>
      <div class="bookstatus">我们将尽快审核您的资料，感谢您的关注</div>
    </div>
    <div class="btn">
      <XButton class="button_box" type="primary" @click.native="goHome">返回首页</XButton>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from "vux";
import api from "../../api/api.js";
import mixins from "../../mixins/mixins.js";
export default {
  mixins: [mixins],
  components: { Group, Cell, XButton },
  mixins: [mixins],
  data() {
    return {};
  },
  methods: {
    goHome() {
      let openId = window.localStorage.getItem("openId").replace(/\"/g, "");
      // ?idNum='+formData.idCard +'&name='+ formData.name +'&openId='+formData.openId}" style="color:#888;">返回首页</router-link><router-link  :to="{path:'../login?openId='+ formData.openId
      this.$router.push({ path: "/?openId=" + openId});
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
page {
  width: 100%;
  background: #f5f5f9;
}
.box {
  width: 100%;
}
.content {
  width: 100%;
  height: 5.39rem;
  background: #fff;
  padding-top: 0.82rem;
  box-sizing: border-box;
}
.icon_pic {
  width: 1.12rem;
  height: 1.12rem;
  margin: 0 auto;
  overflow: hidden;
}
.icon_pic image {
  width: 100%;
  height: 100%;
}
.bookres {
  margin: 0.35rem auto 0.7rem auto;
  font-family: PingFang-SC-Bold;
  font-size: 0.36rem;
  color: #000;
  text-align: center;
}
.bookstatus,
.booknum {
  text-align: center;
  font-size: 0.28rem;
  color: #000;
  margin: 0.2rem auto;
}
.booknum {
}
.btn {
  width: 90%;
  margin: 0.6rem auto;
}
.btnback,
.divdetail {
  width: 3.3rem;
  height: 0.94rem;
  border-radius: 10px;
  font-size: 34rem;
  display: inline-block;
}
.btnback {
  background-color: #fff;
  border: solid 1px #3389ff;
  color: #258bfa;
  margin: 0 0.15rem 0 0.3rem;
}
.divdetail {
  background: #3389ff;
  color: #fff;
  margin: 0 0.3rem 0 0.15rem;
}
</style>
