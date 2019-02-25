<template>
  <div class="bg_white">
    <div id="login-content">
      <div class="banner">
        <img src="../../../static/images/login.png">
      </div>
      <div class="form_cont">
        <ul class="tabs_cont">
          <li :class="loginType == 1 ? 'on' : ''" @click="changeLoginType(1)">刷脸</li>
          <li :class="loginType == 2 ? 'on' : ''" @click="changeLoginType(2)">身份证号</li>
          <li :class="loginType == 3 ? 'on' : ''" @click="changeLoginType(3)">手机号</li>
        </ul>
        <ul class="tab_item">
          <li>
            <img v-show="loginType == 1" src="../../../static/images/icon_idCard.jpg">
            <img v-show="loginType == 3" src="../../../static/images/icon_phone.jpg">
            <img v-show="loginType == 2" src="../../../static/images/icon_idCard.jpg">

            <input
              v-if="loginType == 3"
              type="tel"
              id="user"
              v-model="phone"
              ref="phones"
              class="flex-auto"
              :placeholder="placeholder"
              :maxlength="lastItem.inputLen"
            >
            <input
              type="tel"
              id="user"
              v-model="idCard"
              ref="idCards"
              class="flex-auto"
              :placeholder="placeholder"
              :maxlength="lastItem.inputLen"
              v-else
            >
          </li>
          <li>
            <img
              v-show="loginType == 3 || loginType == 2"
              src="../../../static/images/icon_password.jpg"
            >
            <img v-show="loginType == 1" src="../../../static/images/icon_user.jpg">
            <input
              v-if="loginType == 1"
              type="text"
              v-model="names"
              ref="userNames"
              id="password"
              class="flex-auto"
              :placeholder="lastItem.placeholder"
              maxlength="18"
            >
            <input
              v-else
              type="password"
              v-model="password"
              ref="passwords"
              id="password"
              class="flex-auto"
              :placeholder="lastItem.placeholder"
              maxlength="18"
            >
          </li>
        </ul>
      </div>

      <div class="login-next" @click="loginIn">登 录</div>
      <div>
        <ul class="flex otherC">
          <li v-if="loginType != 1" @click="findbackPW">忘记密码</li>
          <li class="line" v-if="loginType != 1">|</li>
          <li class="register" @click="goRegister">注册账号</li>
        </ul>
      </div>
      <div class="company text-center">技术支持：创能科技</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import baseUrl from "../../api/config";
import api from "../../api/api";
import utils from "../../script/utils";
export default {
  data: function() {
    return {
      loginType: 1,
      urls: "http://yxrh.createt.cn:8091/dist/index.html",
      // urls:'http://192.168.7.44:8083/#/'
      idCard: "", //身份证
      names: "", //姓名
      openId: this.$route.query.openId,
      password: ""
    };
  },
  computed: {
    placeholder: function() {
      if (this.loginType == 1 || this.loginType == 2) {
        return "请输入您的身份证号";
      } else {
        return "请输入您的手机号";
      }
    },
    accountReg: function() {
      // 账号正则
      if (this.loginType == 3) {
        // 手机号正则表达式
        return /^1(3|4|5|7|8)\d{9}$/;
      } else {
        // 身份证号正则表达式
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      }
    },
    lastItem: function() {
      // 密码，用户名正则
      let oInputLen = "18";
      if (this.loginType == 3) oInputLen = "11";
      else oInputLen = "18";
      if (this.loginType == 3 || this.loginType == 2) {
        // 密码

        return {
          reg: /^[0-9a-zA-Z]{8,16}$/,
          placeholder: "请输入您的密码",
          inputLen: oInputLen
        };
      } else {
        // 用户名
        return {
          reg: /^([\u4E00-\u9FFF]|[a-zA-Z]){2,11}$/,
          placeholder: "请输入您的姓名",
          inputLen: oInputLen
        };
      }
    }
  },
  methods: {
    changeLoginType(type) {
      this.loginType = type;
    },

    loginIn() {
      // 刷脸
      if (this.loginType == 1) {
        if (!this.$refs.idCards.value) {
          return this.$store.commit("SHOWTOAST", "身份证不能为空");
        } else if (!this.$refs.userNames.value) {
          return this.$store.commit("SHOWTOAST", "姓名不能为空");
        } else if (!this.accountReg.test(this.$refs.idCards.value)) {
          return this.$store.commit("SHOWTOAST", "身份证格式不符合");
        }

        //刷脸
        let params = {
          fullName: this.$refs.userNames.value,
          idNum: this.$refs.idCards.value,
          foreBackUrl: this.urls,
          openId: this.$Utils.getLocalStorage("openId")
          // openId:'oUziL03o_GUjnfXfccx2vs5dpBZE'
        };
        api
          .checkUser({
            //检查是否已在来穗注册
            openId: this.$Utils.getLocalStorage("openId"),
            identity: this.$refs.idCards.value
          })
          .then(res => {
            if (res.data.status == 5000) {    //检测到未测试
              this.goRegister()
            } else {
              api.weiJingAuth(params).then(res => {
                if (JSON.parse(res.data).ret_code == 0) {
                   this.getsaveLoginTitle(this.$Utils.getLocalStorage("openId"));//登录成功打标签
                  //存储刷脸身份证、姓名
                  this.$Utils.setLocalStorage("authInfo", {
                    idCard: this.$refs.idCards.value,
                    name: this.$refs.userNames.value
                  });
                  //存储cert_token
                  this.$Utils.setLocalStorage(
                    "certToken",
                    JSON.parse(res.data).cert_token
                  );
                  location.href = `https://rz.weijing.gov.cn/fama/auth?cert_token=${
                    JSON.parse(res.data).cert_token
                  }`;
                } else {
                  return this.$store.commit(
                    "SHOWTOAST",
                    JSON.parse(res.data).error_msg
                  );
                }
              });
            }
          });
      }
      // 不刷脸
      else {
        let _account;
        let _password = this.$refs.passwords.value;
        if (this.loginType == 2) {
          if (!this.$refs.idCards.value) {
            return this.$store.commit("SHOWTOAST", "身份证不能为空");
          } else if (!this.$refs.passwords.value) {
            return this.$store.commit("SHOWTOAST", "密码不能为空");
          } else if (!this.accountReg.test(this.$refs.idCards.value)) {
            return this.$store.commit("SHOWTOAST", "身份证格式不符合");
          }
          _account = this.$refs.idCards.value;
        } else if (this.loginType == 3) {
          if (!this.$refs.phones.value) {
            return this.$store.commit("SHOWTOAST", "手机号码不能为空");
          } else if (!this.$refs.passwords.value) {
            return this.$store.commit("SHOWTOAST", "密码不能为空");
          } else if (!this.accountReg.test(this.$refs.phones.value)) {
            return this.$store.commit("SHOWTOAST", "手机号码格式不符合");
          }
          _account = this.$refs.phones.value;
        }
        api
          .loginLaisui({
            openId: this.openId,
            account: _account,
            password: _password
          })
          .then(res => {
            const _data = res.data.data;
            if (res.data.ackCode == 1) {
              this.getsaveLoginTitle(this.openId);//登录成功打标签
              this.$Utils.setLocalStorage("certToken", res.data.certToken);
              //存储刷脸身份证、姓名
              this.$Utils.setLocalStorage("authInfo", {
                idCard: _data.idnumber,
                name: _data.name
              });
              this.$router.push({
                path:
                  "/?idNum=" +
                  _data.idnumber +
                  "&name=" +
                  _data.name +
                  "&openId=" +
                  this.openId
              });
            } else {
              return this.$store.commit("SHOWTOAST", "账号或密码不正确");
            }
          });
      }
    },
    getsaveLoginTitle(openId) {//登录打标签
      api.saveLoginTitle(openId).then(res => {});
    },
    findbackPW(){    //修改密码
      this.$router.push({path:'/password/' + this.openId + '?type=1'});
    },
    goRegister(){
     this.$router.push({path:"/register/?name=" + this.names + "&idCard=" + this.idCard + "&openId=" + this.openId});
    }
  },
  created() {
    document.title = "登录";
    //获取第二次刷脸的身份证、姓名
    let authUserInfo = this.$Utils.getLocalStorage("authUserInfo");
    if (authUserInfo) {
      (this.idCard = authUserInfo.idCard), (this.names = authUserInfo.name);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.wrapper {
  width: 83.3%;
  margin: 0 auto;
}
.banner {
  overflow: hidden;
}
.banner img {
  width: 100%;
}

.form-item {
  width: 6rem;
  height: 0.88rem;
  overflow: hidden;
  border: 1px solid #e1e4e6;
  border-radius: 0.44rem;
  margin: 0.39rem auto 0 auto;
  position: relative;
}
.form-item label {
  width: 26%;
  float: left;
  display: inline-block;
  text-align: center;
  font-size: 0.28rem;
  line-height: 0.88rem;
}
.form-item input {
  display: block;
  width: 68%;
  height: 0.88rem;
  float: right;
  font-size: 0.3rem;
  color: #a1abb6;
  border: none;
}
a,
a:hover,
a:active,
a:focus,
a:visited {
  color: #2c3e50;
}
.login-next {
  display: block;
  margin: 0.66rem 0.3rem;
  text-align: center;
  height: 0.97rem;
  line-height: 0.97rem;
  color: #fff;
  background: #0091ff;
  border-radius: 0.48rem;
  font-size: 0.34rem;
}
.loginText {
  font-size: 0.3rem;
}
.loginText span {
  color: #51cf66;
}

.dialog_cont .weui-dialog {
  max-width: 6rem;
  width: 6rem;
}
.dialog_cont .weui-dialog__bd {
  padding: 0 0.2rem 0.5rem 0.2rem;
  font-size: 0.3rem;
  line-height: 1.5;
  text-align: left;
}

.liveSumit.weui-btn_disabled.weui-btn_primary {
  background-color: #999;
}

.form_cont {
  overflow: hidden;
  border-radius: 0.16rem;
  padding-bottom: 0.39rem;
  margin: 0 0.3rem;
  position: relative;
  top: -0.9rem;
}
.tabs_cont {
  width: 100%;
  overflow: hidden;
}
.tabs_cont li {
  height: 0.8rem;
  line-height: 0.8rem;
  width: 33.3%;
  float: left;
  text-align: center;
  font-size: 0.3rem;
  color: #4a5560;
  padding-top: 0;
}
.tabs_cont li:first-of-type {
  border: none;
}
.tabs_cont li.on {
  border-bottom: 1px solid #0091ff;
  color: #0091ff;
}
.tab_item {
  margin: 0 auto;
  overflow: hidden;
  margin-top: 0.8rem;
}
.tab_item li {
  height: 0.88rem;
  overflow: hidden;
  border: 1px solid #e1e4e6;
  border-radius: 0.44rem;
  margin-top: 0.39rem;
}
.tab_item li input {
  display: inline-block;
  width: 80%;
  height: 0.88rem;
  float: right;
  font-size: 0.3rem;
  color: #a1abb6;
  border: none;
  outline: none;
}
.tab_item li img {
  display: inline-block;
  width: 0.36rem;
  height: 0.36rem;
  margin: 12px 0 0 6%;
  float: left;
}

.login-wrapper {
  background: #fff;
  /*margin:0 1rem 0;*/
  position: relative;
  box-sizing: border-box;
  padding-top: 1rem;
}
a.show-password {
  flex: 0 0 3.5rem;
  height: 2rem;
  line-height: 2rem;
  border: 0.1rem solid #797979;
  text-align: center;
  border-radius: 0.4rem;
}
.otherC {
  display: flex;
  justify-content: center;
  margin: 1.07rem 0 0.67rem 0;
}
.otherC li {
  font-size: 0.3rem;
}
.otherC li.register {
  color: #0091ff;
}
.otherC li.line {
  color: #d7dbd8;
  margin: 0 0.21rem;
}
.company {
  width: 100%;
  overflow: hidden;
  color: #d9dee3;
  font-size: 0.28rem;
  text-align: center;
  padding-bottom: 0.3rem;
}
</style>
