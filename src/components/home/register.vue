<template>
    <div class="template_container">
      <div class="longin_cont">

        <dl class="logo_box">
          <dt><img src="../../assets/images/laisui_logo.png"/></dt>
          <dd>越秀区来穗人员服务管理局</dd>
        </dl>

        <!--注册-->
        <x-input v-model="formData.name" title="姓　名" placeholder="请输入姓名" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.name" ref="name"></x-input>
        <x-input v-model="formData.idCard" title="身份证" placeholder="请输入身份证" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.idCard" ref="cardID"  ></x-input>
        <x-input v-model="formData.phone" title="手机号码" placeholder="请输入手机号码" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.phone" ref="phone" :max="11"></x-input>
        <x-input v-model="formData.password" title="设置密码" placeholder="请输输入密码" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.password" ref="password"></x-input>
        <x-input v-model="formData.password1" title="确认密码" placeholder="请再次输输入密码" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.password1" ref="password1"></x-input>
        <x-input v-model="formData.identifyingCode" type="tel" title="短信验证码" placeholder="请输入验证码" :show-clear="true" :required="true" class="last_input" ref="identifyingCode">
          <input type="button" slot="right" class="identify_btn" :value="identify.text" :disabled="identify.disabled" @click="getIdentifyCode">  
        </x-input>
        <p class="tips" v-show="isShowTips">温馨提示：<span>验证码十分钟内有效！</span></p>
        <x-button class="submit_btn" type="default" :show-loading="submitBtn.disabled" :disabled="submitBtn.disabled" @click.native="register">{{submitBtn.text}}</x-button>
        <div class="under_line"><router-link :to="{path:'../?idNum='+formData.idCard +'&name='+ formData.name +'&openId='+formData.openId}" style="color:#888;">返回首页</router-link><router-link  :to="{path:'../login?openId='+ formData.openId }">已有账号，登录</router-link></div>
      </div>

    </div>
</template>
<script>
  import { Group,XInput,XButton, Cell} from 'vux'
  import api from '../../api/api'
  export default {
    components: { Group,XInput,XButton, Cell},
    data() {
      return {
        isShowTips: false,
        submitBtn: {
          disabled: false,
          text: '注 册',
        },
        identify: {
          disabled: false,
          text: '发送验证码',
          downTime: 60
        },
        formData: {
          openId: this.$route.query.openId,
          name: this.$route.query.name,
          idCard:this.$route.query.idCard,
          phone:'',
          identifyingCode:'',
          password:'',
        },
        isFirst: true, // 是否是第一次选择或输入
        inputValid: {
          name: (val) => {
            if (this.isFirst) return {valid: true}
            return {
              valid: this.$regExp.name.test(val),
              msg: '姓名不合法！'
            }
          },
          idNo: (val) => {
            if (this.isFirst) return {valid: true}
            return {
              valid: this.$regExp.cardID.test(val),
              msg: '身份证号不合法！'
            }
          },
          phone: (val) => {
            if (this.isFirst) return {valid: true}
            return {
              valid: this.$regExp.phone.test(val),
              msg: '手号码不合法！'
            }
          },
          passWord: (val) => {
            if (this.isFirst) return {valid: true}
            return {
              valid: this.$regExp.password.test(val),
              msg: '密码为8-16字母或数字！'
            }
          },
          passWord1: (val) => {
            if (this.isFirst) return {valid: true}
            return {
              valid: this.$regExp.password.test(val),
              msg: '密码为8-16字母或数字！'
            }
          }          
        }
      }
    },

    methods: {

      register () { // 注册提交
        const validate = this.validate()
        this.checkAllInput()
        if (!validate.valid) {
          this.$store.commit('SHOWTOAST', validate.errorMsg);
        } else {
          this.saveUser()
        }
      },
      saveUser () { // 注册接口
        api.saveUser({
          openId:this.formData.openId,
          name:this.formData.name,
          identity:this.formData.idCard,
          phone:this.formData.phone,
          checkCode:this.formData.identifyingCode,
          password:this.formData.password,
        }).then((res) => {
          const _this = this
          if(res.data.success == 1){
            return this.$store.commit("SHOWTOAST", "注册成功");
            this.$router.push({path:'/login'});
            // 
            // 
            // 
          }else{
            return this.$store.commit("SHOWTOAST", res.data.msg);
          }
          // const data = JSON.parse(res.data.jsonRes[0])
          // console.log('222',Number(data.ackCode));
          // if (Number(data.ackCode) == 1) { // 注册成功后自动登录
          // } else {
          // }
        });
      },
      validate () { // 校验表单
        let valid = false;
        let errorMsg = '';
        if (!this.formData.phone) {
          errorMsg = '请输入手机号！'
        } else if (!this.$regExp.phone.test(this.formData.phone)) {
          errorMsg = '手机号不合法！'
        } else if (!this.formData.password) {
          errorMsg = '请输入密码！'
        } else if (!this.$regExp.password.test(this.formData.password)) {
          errorMsg = '密码必须是8-16字母或数字'
        } else if (!this.formData.password1) {
          errorMsg = '请再次输入密码'
        } else if (this.formData.password1 != this.formData.password) {
          errorMsg = '两次输入的密码不一致'
        } else if (!this.formData.identifyingCode) {
          errorMsg = '请输入验证码！'
        } else {
          valid = true
          errorMsg = ''
        }
        return {valid, errorMsg}
      },
      checkAllInput () {  // input验证

        this.isFirst = false
        this.$refs.phone.validate()
        this.$refs.identifyingCode.validate()
      },
      getIdentifyCode () { // 获取短信验证码
        if (!this.$regExp.phone.test(this.formData.phone)) {
          this.$store.commit('SHOWTOAST', '请输入正确手机号再获取验证码！');
        } else {
          this.identify.disabled = true
          api.sendMessage({
            openId: this.formData.openId,
            phone: this.formData.phone
          }).then((res) => {
            const data = res.data
            if (data.ackCode == 1) {
              let countDownTime = 60
              let timer = setInterval(() => {
                countDownTime --
                if (countDownTime !== 0) {
                  this.identify.text = `${countDownTime}秒后再获取`
                } else {
                  this.identify = {
                    disabled: false,
                    text: '获取验证码'
                  }
                  clearInterval(timer)
                }
              }, 1000);
              this.isShowTips = true
            } else {
              this.identify.disabled = false
              this.$store.commit('SHOWTOAST', data.errorMessage);
            }
          }).catch((res) => {
            this.identify = {
              disabled: false,
              text: '获取验证码'
            }
          })
        }
      }
    },
    mounted(){

    }
  }
</script>
<style scoped lang="less">
  .longin_cont{width:100%;overflow: hidden;margin: 0 auto;}
  .logo_box{
    width:6rem;margin:0 auto;overflow: hidden;
    dt{text-align: center;padding-top:.6rem;
      img{width:2.2rem;height:2.2rem;}
    }
    dd{text-align: center;font-size: .35rem;height: 1.5rem;line-height: 1rem;}
  }
  .submit_btn{width:6.9rem;height:.96rem;margin:1rem auto 0 auto;text-align: center;line-height: .96rem;color:#fff;font-size: .32rem;background: #448AFF;border-radius: .1rem;border:none;}
  .long_btn{margin-top: .6rem;}
  .last_input:after{content: " ";position: absolute;bottom: 0;width:100%;height: 1px;border-top: 1px solid #D9D9D9;  color: #D9D9D9;transform: scaleY(0.5);left: 15px;display: inline-block;}
  .under_line{width:6.9rem;margin:0 auto;height:1rem;line-height: 1rem;font-size: .3rem;
    a:first-of-type{float: left;}
    a:last-of-type{float: right;color:#228AE6;}
  }
  .tips{width:6.9rem;margin:0 auto;height: .6rem;line-height: .8rem;font-size: .28rem;
    span{color:red;}
  }
  .identify_btn{display: inline-block;height:100%;width:1.8rem;text-align: right;color:#228AE6;border: none;border-left:1px solid #eee;background: none;}
  .submit_btn2{width:6.9rem;height:.96rem;margin:.5rem auto 0 auto;text-align: center;line-height: .96rem;color:#fff;font-size: .32rem;border:.02rem solid #000;color:#000;border-radius: .1rem;}

</style>
