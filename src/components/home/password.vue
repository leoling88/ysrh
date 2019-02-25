<template>
  <div class="container">
    <div class="password-1" v-if="type == '1'">
        <x-input v-model="formData.phone" title="手机号码" placeholder="请输入手机号码" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.phone" ref="phone" :max="11"></x-input>
        <x-input v-model="formData.password" title="设置密码" placeholder="请输入密码" :show-clear="true" placeholder-align="right" type="password" text-align="right" :required="true" :is-type="inputValid.password" ref="password"></x-input>
        <x-input v-model="formData.password1" title="确认密码" placeholder="请再次输入密码" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.password1" ref="password1" type="password"></x-input>
        <x-input v-model="formData.identifyingCode" type="tel" title="短信验证码" placeholder="请输入验证码" :show-clear="true" :required="true" class="last_input" ref="identifyingCode">
          <input type="button" slot="right" class="identify_btn" :value="identify.text" :disabled="identify.disabled" @click="getIdentifyCode">  
        </x-input>
    </div>
    <div class="password-1" v-else-if="type == '2'">
      <x-input v-model="formData.oldpassword" title="旧密码" placeholder="请输入旧密码" :show-clear="true" placeholder-align="right" type="password" text-align="right" :required="true" :is-type="inputValid.password" ref="password"></x-input>
      <x-input v-model="formData.password" title="设置新密码" placeholder="请输入新密码" :show-clear="true" placeholder-align="right" type="password" text-align="right" :required="true" :is-type="inputValid.password" ref="password"></x-input>
      <x-input v-model="formData.password1" title="确认新密码" placeholder="请再次输入新密码" :show-clear="true" placeholder-align="right" text-align="right" :required="true" :is-type="inputValid.password1" ref="password1" type="password"></x-input>      
    </div>
    <div class="but-1" @click="savePassword">确认提交</div>
  </div>
</template>
<script>
import { XInput,XButton} from "vux";
import api from "../../api/api.js";
import mixins from "../../mixins/mixins.js";
import utils from '../../script/utils';
export default {
  components: {XInput,XButton},
  mixins: [mixins],
  data() {
    return {
      type:this.$route.query.type,
      identify: {
        disabled: false,
        text: '发送验证码',
        downTime: 60
      },
      formData: {
        openId: this.$route.params.openId,
        name: this.$route.query.name,
        idCard:this.$route.query.idCard,
        phone:'',
        identifyingCode:'',
        password:'',
        oldpassword:'',
        checkCode:''
      },
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

    };
  },
  methods: {
    validate () { // 校验表单
      let valid = false;
      let errorMsg = '';
      if(this.type == 1){
        if (!this.formData.phone ) {
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
      }else if(this.type == 2){
        if (!this.formData.oldpassword) {
          errorMsg = '请输入旧密码！'
        }else if (!this.formData.password) {
          errorMsg = '请输入新密码！'
        } else if (!this.$regExp.password.test(this.formData.password)) {
          errorMsg = '密码必须是8-16字母或数字'
        } else if (!this.formData.password1) {
          errorMsg = '请再次输入新密码'
        } else if (this.formData.password1 != this.formData.password) {
          errorMsg = '两次输入的密码不一致'
        } else {
          valid = true
          errorMsg = ''
        }         
      }

      return {valid, errorMsg}
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
    },
    // checkAllInput () {  // input验证

    //   this.isFirst = false
    //   this.$refs.phone.validate()
    //   this.$refs.identifyingCode.validate()
    // },    
    savePassword () { // 提交
      const validate = this.validate()
      if (!validate.valid) {
        this.$store.commit('SHOWTOAST', validate.errorMsg);
      } else {
        this.submitDatas()
      }
    },
    submitDatas(){
      if(this.type == 1){
        api.retrievalPW({
          openId:this.formData.openId,
          checkCode:this.formData.identifyingCode,
          newPassword:this.formData.password,
          mobile:this.formData.phone

        }).then((res) => {
          if(res.data.ackCode == '1'){
            this.$store.commit('SHOWTOAST', '修改成功');
            this.$router.push({path:'/login?openId='+this.formData.openId});
          }else{
            this.$store.commit('SHOWTOAST', res.data.errorMessage);
          }          

        }).catch((res) => {
        })
      }else if(this.type == 2){
        api.changePW({
          openId:this.formData.openId,
          oldPassword:this.formData.oldpassword,
          newPassword:this.formData.password
        }).then((res) => {
          if(res.data.ackCode == '1'){
            this.$store.commit('SHOWTOAST', '修改成功');
            this.$router.push({path:'/login?openId='+this.formData.openId});
          }else{
            this.$store.commit('SHOWTOAST', res.data.errorMessage);
          }
        }).catch((res) => {
        })
      }
    }
  },
  mounted() {},
  created() {
  }
};
</script>
<style lang="less" scoped>
.password-1{padding:.2rem;background:#fff;}
.password-1 p{border-bottom:.02rem solid #f1f1f1;padding:.2rem 0;}
.password-1 .text1{float:right;width:75%;height:.5rem;border:none;}
.password-1 .text2{float:right;width:30%;height:.5rem;border:none;}

.but-1 {
  display: block;
  background: #0091ff;
  text-align: center;
  height: 0.96rem;
  line-height: 0.96rem;
  color: #fff;
  width: 6.9rem;
  margin: 0.72rem auto 2rem;
}

</style>
