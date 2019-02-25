<template>
  <div>
    <step :step="3"></step>
<!--{{this.name}}-->
    <!--{{this.idCard}}-->
    <group class="group">
      <!--<cell title="姓名" :value="desensitization(name, 1)"></cell>-->
      <!--<cell title="身份证号" :value="desensitization(idCard, 2)"></cell>-->
      <cell title="姓名">{{this.$Utils.getLocalStorage("authInfo").name}}</cell>
      <cell title="身份证号">{{this.$Utils.getLocalStorage("authInfo").idCard}}</cell>
      <popup-picker title="民族" :data="nationList" v-model="formData.nation" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>
      <x-address title="户籍地" v-model="formData.household" :list="addressData" placeholder="请选择户籍地" class="date_time"></x-address>
      <x-input title="户籍详细地址" v-model="formData.householdDetail" placeholder="请输入户籍详细地址" placeholder-align="right" text-align="right"></x-input>
      <x-input title="联系电话" v-model="formData.phone" :max="11" placeholder="请输入联系电话" placeholder-align="right" text-align="right"></x-input>

    </group>

    <group class="group">
      <popup-picker title="户口类型" :data="userTypeList" v-model="formData.userType" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>
      <popup-picker title="文化程度" :data="cultureList" v-model="formData.culture" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>
      <popup-picker title="政治面貌" :data="polityLis" v-model="formData.polity" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>
      <datetime class="date_time" v-model="formData.comDate" placeholder="请选择日期" start-date="1949-01-01" :end-date="endDate" title="来本市日期"></datetime>
      <popup-picker title="居住事由" :data="ZZSYList" v-model="formData.ZZSY" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>
      <popup-picker title="居住方式" :data="JZFSList" v-model="formData.JZFS" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>
      <popup-picker title="是否承租人" :data="SFList" v-model="formData.SF" :columns="1" placeholder="请选择" show-name class="date_time"></popup-picker>

    </group>

    <XButton class="button_box" type="primary" @click.native="goNext">下一步</XButton>



  </div>
</template>
<script>
  import Step from '../common/Step.vue';
  import { Group, Cell, XButton, PopupPicker, Datetime, XInput, XAddress, ChinaAddressV4Data } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  import regExp from '../../script/regExp.js';
  export default{
      name: 'doorStep3',
      mixins: [mixins],
      components: {Group, Cell, XButton, Step, PopupPicker, Datetime, XInput, XAddress },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/doorStep2'),
            endDate: this.$Utils.getDay(0),
            formData: {
              nation: [],  // 民族
              household: [], // 户籍地省市区
              householdDetail: '',  // 户籍详细地址
              phone: '', // 手机号
              userType: [], // 户口类型
              culture: [],  // 文化程度
              polity: [],  // 政治面貌
              comDate: '', // 来本市日期
              ZZSY: [],  // 居住事由
              JZFS: [], // 居住方式
              SF: [] // 是否承租人
            },
            addressData: ChinaAddressV4Data,
            nationList: [],
            userTypeList: [],
            cultureList: [],
            polityLis: [],
            ZZSYList: [],
            JZFSList: [],
            SFList: [],
          }
      },
      methods: {
        validate () { // 校验表单
          let valid = false;
          let errorMsg = '';
          if (this.formData.nation.length == 0) {
            errorMsg = '请选择民族！'
          } else if (this.formData.household.length == 0) {
            errorMsg = '请选择户籍地！'
          } else if (!this.formData.householdDetail) {
            errorMsg = '请输入户籍详细地址！'
          } else if (!this.formData.phone) {
            errorMsg = '请输入联系手机号！'
          } else if (!this.$regExp.phone.test(this.formData.phone)) {
            errorMsg = '请输入合法手机号！'
          } else if (this.formData.userType.length == 0) {
            errorMsg = '请选择户口类型！'
          } else if (this.formData.culture.length == 0) {
            errorMsg = '请选择文化程度！'
          } else if (this.formData.polity.length == 0) {
            errorMsg = '请选择政治面貌！'
          } else if (this.formData.comDate.length == 0) {
            errorMsg = '请选择来本市日期！'
          } else if (this.formData.ZZSY.length == 0) {
            errorMsg = '请选择居住事由！'
          } else if (this.formData.JZFS.length == 0) {
            errorMsg = '请选择居住方式！'
          } else if (this.formData.SF.length == 0) {
            errorMsg = '请选择是否承租人！'
          } else {
            valid = true;
            errorMsg = '';
          }
          return {valid, errorMsg}
        },
//        goNext () {
//          this.$Utils.setLocalStorage('doorStep3', Object.assign(this.params, this.formData));
//          var validate = this.validate(), params;
//          if (!validate.valid) {
//            this.$store.commit('SHOWTOAST', validate.errorMsg);
//          } else {
//            this.$router.push({ path: '/doorStep4',query: {name: this.$route.query.name,idCard: this.$route.query.idCard,userId:this.$route.query.userId}});
//
//          }
//        },
        goNext () {
          var validate = this.validate(), params;
          if (!validate.valid) {
            this.$store.commit('SHOWTOAST', validate.errorMsg);
          } else {
            this.$router.push({ path: '/doorStep4',query: {name: this.$route.query.name,idCard: this.$route.query.idCard,userId:this.$route.query.userId}});
            this.$Utils.setLocalStorage('/doorStep3', Object.assign(this.params, this.formData));
          }
        },
        queryDictionaryList() { // 获取数字字典
          api.queryDictionaryList({
            openid: this.userId,
            typeCodes: 'XZQ,XB,MZ,WHCD,ZZMM,HKXZ,HYZK,SF,JZFS,ZZDXZ,ZZSY,JZY',
            account: this.idCard
          }).then((res) => {
            const data = res.data.obj;
            if (res.data.success) {
              this.nationList = this.filerData(data.MZ);
              this.userTypeList = this.filerData(data.HKXZ);
              this.cultureList = this.filerData(data.WHCD);
              this.polityLis = this.filerData(data.ZZMM);
              this.ZZSYList = this.filerData(data.ZZSY);
              this.JZFSList = this.filerData(data.JZFS);
              this.SFList = this.filerData(data.SF);
            }
          });
        },
        filerData(srcData){
          let toData = []
          if(srcData instanceof Array && toData instanceof Array){
              srcData.forEach(item => {
                toData.push({
                  name: item.itemName,
                  value: item.itemCode
                })
              });
          }
          return toData;
        }
      },
      activated () {
        this.$store.commit('UPDATE_KEEP_ALIVE', -1); // 清除上一个页面的缓存
        this.$Utils.removeLocalStorage('/companySearch');  // 清除公司信息缓存
      },
      mounted () {
        console.log(this.params)
        this.queryDictionaryList();
        this.$store.commit('UPDATE_KEEP_ALIVE', 'doorStep3');
      }

    }
</script>
<style lang="less" scoped>
  .group{background: #fff; margin-bottom: .3rem;}
</style>
