<template>
  <div>
    <step :step="3" :tabs="tabs"></step>

    <group class="group">
      <cell title="姓名" :value="desensitization(myname, 1)"></cell>
      <cell title="身份证号" :value="desensitization(myidcard, 2)"></cell>
      <x-input title="联系电话" v-model="formData.phone" :max="11" placeholder="请输入联系电话" placeholder-align="right" text-align="right"></x-input>

    </group>
    <XButton :disabled="isLoading" class="button_box" type="primary" @click.native="goNext">下一步</XButton>

  </div>
</template>
<script>
  import Step from '../common/Step.vue';
  import { Group, Cell, XButton, PopupPicker, Datetime, XInput, XAddress, ChinaAddressV4Data } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  import regExp from '../../script/regExp.js';
  import { mapState } from "vuex";
  export default{
      name: 'bookTime3',
      mixins: [mixins],
      components: {Group, Cell, XButton, Step, PopupPicker, Datetime, XInput, XAddress },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/bookTime2'),
            myidcard:this.$Utils.getLocalStorage("authInfo").idCard,
            myname:this.$Utils.getLocalStorage("authInfo").name,
            formData: {
              phone: '', // 手机号
            },
            isLoading: false,
            tabs: [
              {
                name: "选择区街镇",
                value: "1"
              },
              {
                name: "预约时间",
                value: "2"
              },
              {
                name: "个人信息",
                value: "3"
              }
            ],
          }
      },
      methods: {
        validate () { // 校验表单
          let valid = false;
          let errorMsg = '';
          if (!this.formData.phone) {
            errorMsg = '请输入联系手机号！'
          } else if (!this.$regExp.phone.test(this.formData.phone)) {
            errorMsg = '请输入合法手机号！'
          } else {
            valid = true;
            errorMsg = '';
          }
          return {valid, errorMsg}
        },
        goNext () {
          var validate = this.validate(), params;
          if (!validate.valid) {
            this.$store.commit('SHOWTOAST', validate.errorMsg);
          } else {
            this.saveReservation();
          }
        },
        saveReservation () {  // 保存新增预约信息
          var params = {
            openid: this.$Utils.getLocalStorage("openId"),
            account: this.$Utils.getLocalStorage("authInfo").idCard,
            xzq: this.params.area.value,
            jz: this.params.street.value,
            jddm: this.params.alleyArea.value,
            zhid: this.params.door.value,
            fhid: this.params.room.value,
            timeid: this.params.appoitmentTime.szid,
            type: '1',
            opentype: '1'
          }
          this.isLoading = true;
          api.saveBooktimeMsg(JSON.stringify(params)).then((res) => {
            const data = JSON.parse(res.data.jsonRes[0]);
            if (res.data.success) {
              if (data.ackCode == '1') {
                this.$store.commit('SHOWTOAST', '预约成功！');
                api.reservationSave(params).then((res) => {    //保存登记申请信息到本地服器
//                if (res.data.status == 200) {
//                } else {
//                }
                });
                this.$router.push({ path: '/bookSuccess?id='+data.data.id});
              } else if (data.ackCode == '0') {
                this.$store.commit('SHOWTOAST', data.errorMessage);
              }
            }else{
              this.$store.commit('SHOWTOAST', data.errorMsg);
            }
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
          });
        },
      },
      mounted () {
        this.$store.commit('UPDATE_KEEP_ALIVE', 'bookTime3');
      },
      computed: {
        ...mapState([
          'idCard','openId','userId','name'
        ])
      },

    }
</script>
<style lang="less" scoped>
  .group{background: #fff; margin-bottom: .3rem;}
</style>
