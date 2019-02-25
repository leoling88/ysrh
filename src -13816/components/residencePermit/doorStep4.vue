<template>
  <div>
    <step :step="4"></step>

    <group class="group">
      <popup-picker title="职业" :data="JZYList" v-model="formData.JZY" :columns="1" placeholder="请选择" show-name class="date_time" @on-change="JZYChange"></popup-picker>
      <template v-if="hasUnit">
        <cell class="long_cell" title="单位名称" :value="formData.dwmc ? formData.dwmc : '请输入单位名称'" :class="[formData.dwmc ? '' : 'dwmc']" @click.native="goSearch"></cell>
        <cell class="long_cell" v-if="formData.dwmc" title="单位地址" :value="formData.dwdz" @click.native="goSearch"></cell>
        <cell v-if="formData.dwmc" title="企业编号" :value="formData.qybh" @click.native="goSearch"></cell>
      </template>
      <popup-picker title="婚姻状况" :data="HYZKList" v-model="formData.HYZK" :columns="1" placeholder="请选择" show-name class="date_time" @on-change="HYZKChange"></popup-picker>
    </group>

    <group class="group" v-if="formData.HYZK.toString() == 2">
      <x-input title="配偶姓名" v-model="formData.spouseName" :max="20" placeholder="请输入配偶姓名" placeholder-align="right" text-align="right"></x-input>
      <x-input title="配偶身份证" v-model="formData.spouseIdCard" :max="20" placeholder="请输入配偶身份证" placeholder-align="right" text-align="right"></x-input>

    </group>

    <XButton class="button_box" type="primary" @click.native="goNext">下一步</XButton>

  </div>
</template>
<script>
  import Step from '../common/Step.vue';
  import { Group, Cell, PopupPicker, XInput, XButton } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  import regExp from '../../script/regExp.js';
  export default{
      name: 'doorStep4',
      mixins: [mixins],
      components: { Group, Cell, Step, PopupPicker, XInput, XButton },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/doorStep3'),
            formData: {
              JZY: [],  // 职业
              HYZK: [], // 婚姻状况
              spouseName: '',  // 配偶姓名
              spouseIdCard: '', // 配偶身份证
              dwmc: '', // 单位名称
              dwdz: '',  // 单位地址
              qybh: '',  // 企业编号
            },
            JZYList: [],
            HYZKList: [],
            hasUnit: true
          }
      },
      methods: {
        JZYChange(value){  // 职业
          let code = value.toString();
          if (code == 36 || code == 37 || code == 39 || code == 42 || code == 51) {
              this.hasUnit = false;
          } else {
            this.hasUnit = true;
          }
        },
        HYZKChange(value){  // 婚姻状况
          this.formData.HYZK = value;
          this.formData.spouseName = '';
          this.formData.spouseIdCard = '';
        },
        validate () { // 校验表单
          let valid = false;
          let errorMsg = '';
          if (this.formData.JZY.length == 0) {
            errorMsg = '请选择职业！'
          } else if (!this.formData.dwmc) {
            errorMsg = '请选择单位名称！'
          } else if (this.formData.HYZK.length == 0) {
            errorMsg = '请选择婚姻状况！'
          } else if (this.formData.HYZK[0] == 2 && this.formData.spouseName) {
            errorMsg = '请输入配偶姓名！'
          } else if (this.formData.HYZK[0] == 2 && !regExp.name.test(this.formData.spouseName)) {
            errorMsg = '请输入合法配偶姓名！'
          } else if (this.formData.HYZK[0] == 2 && !this.formData.spouseIdCard) {
            errorMsg = '请输入配偶身份证号！'
          } else if (this.formData.HYZK[0] == 2 && !regExp.idCard.test(this.formData.spouseIdCard)) {
            errorMsg = '请输入合法身份证号！'
          } else {
            valid = true;
            errorMsg = '';
          }
          return {valid, errorMsg}
        },
        queryDictionaryList() { // 获取数字字典
          api.queryDictionaryList({
            openid: this.userId,
            typeCodes: 'JZY,HYZK',
            account: this.idCard
          }).then((res) => {
            const data = res.data.obj;
            if (res.data.success) {
              this.JZYList = this.filerData(data.JZY);
              this.HYZKList = this.filerData(data.HYZK);
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
        },
        goNext(){
          var validate = this.validate(), params;
          if (!validate.valid) {
            this.$store.commit('SHOWTOAST', validate.errorMsg);
          } else {
            params = {
              openid: this.$Utils.getLocalStorage("openId"),  //支付宝id
              opentype:'1',  //支付宝1
              xm: this.$Utils.getLocalStorage("authInfo").name,  //姓名
              zjhm: this.$Utils.getLocalStorage("authInfo").idCard,  //身份证号
              xb: this.$Utils.getIdCardInfo(this.$Utils.getLocalStorage("authInfo").idCard).gender,  //性别
              csrqStr: this.$Utils.getIdCardInfo(this.$Utils.getLocalStorage("authInfo").idCard).birthDay,  //出生日期
//              xb: '2',  //性别
//              csrqStr: '1991-9-20',  //出生日期

              mz: this.params.nation[0],  //民族
              lxdh: this.params.phone,  //联系电话
              whcd: this.params.culture[0],  //文化程度
              zzmm: this.params.polity[0],  //政治面貌
              jzfs: this.params.JZFS[0],  //居住方式
              zzsy: this.params.ZZSY[0],  //居住事由

              xzq: this.params.area.value,  //行政区代码
              xzqDict: this.params.area.name,  //行政区名称
              jz: this.params.street.value,  //街镇代码
              jzDict: this.params.street.name,  //街镇名称
              jddm: this.params.alleyArea.value,  //街路巷代码
              jddmDict: this.params.alleyArea.name,  //街路巷名称
              zhid: this.params.door.value,  //门牌号代码
              zhidDict: this.params.door.name,  //门牌号名称
              fhid: this.params.room.value,  //房号代码
              fhidDict: this.params.room.name,  //房号名称
              jzcslx: this.params.houseType.value,  //房屋类型

              hjx: this.params.household[0],  //户籍市
              hjxz: this.params.householdDetail,  //户籍详址
              sfczr: this.params.SF[0],  //是否承租人
              lbsrqStr: this.params.comDate,  //来本市日期

              hkszdlx: this.params.userType[0],  //户口类型
              checktime: this.params.appoitmentTime.times,  //上门核实时间
              checktimeid: this.params.appoitmentTime.szid,  //上门核实时间id

              zy: this.formData.JZY[0],  //职业
              dwmc: this.formData.dwmc,  //单位名称
              dwdz: this.formData.dwdz,  //单位地址
              qybh: this.formData.qybh,  //企业编号
              hyzk: this.formData.HYZK[0],  //婚姻状况
              poxm: this.formData.spouseName,  //配偶姓名
              posfzhm: this.formData.spouseIdCard,  //配偶身份证号码
            }
            console.log('paramsparamsparamsparams',params);
            this.saveliveInfo(JSON.stringify(params));
          }
        },
        saveliveInfo (params) {
          api.saveliveInfo(params).then((res) => {
            const data= JSON.parse(res.data.jsonRes[0]);
            if (res.data.success) {
              if (data.ackCode == 1){
                this.$router.push({ path: '/doorSuccess?id='+data.data.id});
                this.$store.commit('SHOWTOAST', '预约成功！');
                api.saveResidencePermit(data.data).then((res) => {    //保存登记申请信息到本地服器
                  if (res.data.status == 200) {
                  } else {
                  }
                });

              }
              if (data.ackCode == 0) this.$store.commit('SHOWTOAST', data.errorMessage);
            } else {
              this.$store.commit('SHOWTOAST', data.errorMsg);
            }
          });
        },
        goSearch () { // 单位名称选择
          this.$router.push({ path: '/companySearch'});
        },
        getUnit (Unit) {  // 获取单位信息
          if (Unit) {
            this.formData.dwmc = Unit.dwmc; // 单位名称
            this.formData.dwdz = Unit.dwdz;  // 单位地址
            this.formData.qybh = Unit.qybh;  // 企业编号
          }
        }
      },
      activated () {
        this.getUnit(this.$Utils.getLocalStorage('/companySearch'));
      },
      mounted () {
        console.log(this.params)
        this.queryDictionaryList();
        this.getUnit(this.$Utils.getLocalStorage('/companySearch'));
        this.$store.commit('UPDATE_KEEP_ALIVE', 'doorStep4');

        //存储openid
//        this.$Utils.setLocalStorage('openId',this.$route.query.userId);
//        this.$store.commit("UPDATE_USER_INFO", {
//          openid: this.$route.query.userId,
//          userId: this.$route.query.userId
//        });
        //存储身份证和姓名
//        this.$Utils.setLocalStorage('authUserInfo',{
//          idCard:this.$route.query.idCard,
//          name:this.$route.query.name
//        });
      }

    }
</script>
<style lang="less" scoped>
  .group{background: #fff; margin-bottom: .3rem;}

</style>
