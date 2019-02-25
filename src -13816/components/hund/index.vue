<template>
  <div class="section">
    <!-- Logo -->
    <div class="logo">
      <img src="../../assets/images/reserved-funds-logo.jpg" />
    </div>
    <!-- Logo END -->

    <!-- 表单 -->
    <div style="padding:30rpx 0;">
      <div class="checked checked-other">
        <div class="checked-border-bottom" style="display: flex;align-items: center;">
          <span>身份证</span>
          <span class="text-right">{{desensitization(myidcard,2)}}</span>
        </div>
      </div>

      <!-- <div class="checked checked-other">
        <div class="checked-border-bottom no-border" style="display: flex;align-items: center;">
          <span>密码</span>
          <input type="password" v-validate="'required'" name="password" ref="passWord"  placeholder="请输入公积金密码" style="flex-grow:1;text-align:right;" class="text-right" />
        </div>
        <div v-show="errors.has('password')">{{ errors.first('password') }}</div>
      </div> -->
      <div class="checked checked-other">
        <div class="checked-border-bottom no-border" style="display: flex;align-items: center;">
          <span>密码</span>
          <span class="text-right">
            <input type="password" ref="passWord"  placeholder="请输入公积金密码" class="text-right" />
          </span>
        </div>
      </div>
    </div>
    <!-- 表单 END -->

    <!-- 二次登录 -->
    <div class="second-login">
      <div class="button_box" @click="loginCheck">授权验证</div>
    </div>
    <!-- 二次登录 END -->
  </div>
</template>
<script>
import baseUrl from "../../api/config";
import api from "../../api/api";
import { mapState } from "vuex";
import mixins from "../../mixins/mixins.js";
export default {
  mixins: [mixins],
  data() {
    return {
      myidcard:this.$Utils.getLocalStorage("authInfo").idCard
    };
  },
  computed: {
    ...mapState(["userLoginInfo"])
  },
  //创建vue实例后
  created: function() {
    // alert(this.idCard);
    //判断是否已经登录过,先注释掉，会影响左上角返回首页
//    if (this.userLoginInfo) {
//      this.$router.push({ path: "/hund/home" });
//    }
  },
  methods: {
    loginCheck() {
      //密码不能为空
      if (!this.$refs.passWord.value) {
        return this.$store.commit("SHOWTOAST", "密码不能为空");
      }
      // 显示Loading
      this.$vux.loading.show({text: '加载中...'});
      // alert(this.idCard)
      //登录参数
      const userParams = {
        yhhm: this.$Utils.getLocalStorage("authInfo").idCard, //二代身份证号或公积金账号或手机号码
        // yhhm: '441821198911051218', //二代身份证号或公积金账号或手机号码
        yhmm: this.$refs.passWord.value, //用户密码[加密后]
        dllx: 0 //登录类型：0-身份号，1-公积金帐号，3-手机号码,4-刷脸前验证，5-刷脸登陆
      };
      api.userLogin(userParams).then(res => {
        // 隐藏Loading
        this.$vux.loading.hide();
        if (res.data.success) {
          //存储用户公积金登录信息
          this.$store.commit("UPDATE_USER_LOGIN_INFO", {
            capinfoSession: res.data.jsonRes[0].capinfoSession,
            gjjzh: res.data.jsonRes[0].gjjzh,
            zjh: res.data.jsonRes[0].zjh, //身份证账号
            xm: res.data.jsonRes[0].xm, //姓名
            zhzt: res.data.jsonRes[0].zhzt //公积金账号状态：jc缴存，fc封存
          });
          //跳转
          this.$store.commit("SHOWTOAST", "登录成功");
          setTimeout(() => {
            this.$router.push({ path: "/hund/home" });
          }, 3000);
        } else {
          return this.$store.commit("SHOWTOAST", res.data.msg);
        }
        //console.log('用户信息：',this.userLoginInfo)
      });
      //表单校验
      // this.$validator.validateAll().then((res)=>{
      //   console.log('错误：',res);
      //   if(!res){
      //     console.log('密码：',this.$refs.passWord.value);
      //   }
      // });
    },
  },
  //挂载到dom后
  mounted() {}
};
</script>
<style  scoped>
.logo {
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.2rem;
  padding-bottom: 1rem;
}
.logo img {
  width: 70%;
}
.checked {
  padding: 0px 0.3rem;
  background: rgb(255, 255, 255);
  height: auto;
  line-height: 1rem;
}

.checked span {
  font-size: 0.34rem;
}
.checked-other span.text-right {
  flex-grow:4;
  text-align:right;
  margin-right: 0.34rem;
}
.checked-other input {
  width: 90%;
  border: none;
  height: 0.8rem;
  padding-left: 0.34rem;
  text-align:right;
  font-size: 0.34rem;
}
.second-login {
  width: 100%;
  margin: 0 auto;
}
.button_box {
  width: 90%;
  height: 1rem;
  line-height: 1rem;
  margin: 0.6rem auto;
  background-image: linear-gradient(rgb(51, 137, 255), rgb(51, 137, 255)),
    linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255));
  border-radius: 0.1rem;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 0.34rem;
  border: none;
}
</style>

