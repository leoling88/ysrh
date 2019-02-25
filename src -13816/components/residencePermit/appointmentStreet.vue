<template>
  <div class="box">
    <div class="govinfo">
      <div class="street">{{params.jz_dict}}</div>
      <!-- <div class="phone">电话:<span>{{phone}}</span></div>
      <div class="address">地址:<span>{{streetAddress}}</span></div> -->
      <div class="explain">
        <div class="text_info">如果已更换居住地址请选择居住登记或带齐证件到居住地址所在社区居住登记，并办理居住证。</div>
        <XButton class="register" type="default" @click.native="register"> 居住登记 </XButton>
      </div>
    </div>
    <!-- 时间选择 -->
    <Group class="cont_box">
    <datetime
      class="date_time"
      v-model="appoitmentDate"
      @on-change="dateChange"
      placeholder="请选择上门核实的日期"
      :start-date="startDate"
      :end-date="endDate"
      title="上门核实日期"></datetime>
    </Group>

    <AppoitmentTime :appoitmentDate="appoitmentDate" :streeCode="params.jz" @change="checkTime"  apiMethod="laisuiQueryYyszList"></AppoitmentTime>

    <!--<AppoitmentTime :appoitmentDate="appoitmentDate" streeCode="440104016" @change="checkTime"  apiMethod="laisuiQueryYyszList"></AppoitmentTime>-->

    <XButton class="button_box" type="primary" @click.native="bookenter">确定预约</XButton>

  </div>
</template>
<script>
  import { Group, Cell, XButton, Icon, Datetime } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  import AppoitmentTime from '../common/AppoitmentTime.vue';
  export default{
      name: 'appointmentStreet',
      mixins: [mixins],
      components: { Group, Cell, XButton, Icon, AppoitmentTime, Datetime },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/applySearch'),
            startDate: utils.getDay(1), // 上门核实最小开始时间
            endDate: utils.getDay(7),
            appoitmentDate: '',  // 核实日期
            appoitmentTime: '', // 核实时间
          }
      },
      methods: {
        dateChange (value) {  // 日期选择
          this.appoitmentDate = value;
        },
        checkTime (value) { // 时间选择
          this.appoitmentTime = value;
        },
        validate () { // 校验表单
          let valid = false;
          let errorMsg = '';
          if (!this.appoitmentDate) {
            errorMsg = '请选择预约日期！'
          } else if (!this.appoitmentTime) {
            errorMsg = '请选择预约时间！'
          } else {
            valid = true;
            errorMsg = '';
          }
          return {valid, errorMsg}
        },
        bookenter() {
          //校验表单
          var validate = this.validate();
          if (!validate.valid) {
            this.$store.commit('SHOWTOAST', validate.errorMsg);
            return false;
          }
          //确定预约
          var params = {
            opentype: '2',
            openid: this.userId,
            account: this.idCard,
            timeid: this.appoitmentTime.szid,
            xzq: this.params.xzq,
            jz: this.params.jz,
            jddm: this.params.jddm,
            zhid: this.params.zhid,
            fhid: this.params.fhid,
            type: this.params.type,
            ldryid: this.params.id,
            jzzid: this.params.id,
            slyy: this.params.slyy
          }
          api.saveBooktimeMsg(JSON.stringify(params)).then((res) => {
            const data = JSON.parse(res.data.jsonRes[0]);
            if (data.ackCode == 1) {
              this.$store.commit('SHOWTOAST', '已成功预约');
              setTimeout(() => {this.$router.push({ path: '/residencePermit'});}, 2000);
            } else {
              this.$store.commit('SHOWTOAST', data.errorMessage);
            }
          })
        },
        register () {
          this.$router.push({ path: '/residencePermit'});
        }
      },
      mounted () {
        this.$store.commit('UPDATE_KEEP_ALIVE', 'appointmentStreet');  // 缓存此组件
      }

    }
</script>
<style lang="less" scoped>
  .box{
    width:7.5rem;
    overflow: hidden;
    margin: auto;
  }
  .govinfo{
    margin: auto;
    background: #fff;
    overflow: hidden;
    margin: auto;
  }
  .street{
    width: 6.9rem;
    font-size: .34rem;
    color: #000;
    margin: .34rem auto .24rem auto;
  }
  .explain{
    width: 6.9rem;
    margin: auto;
    margin-top: .20rem;
  }
  .text_info{
    width: 5.13rem;
    font-size: .24rem;
    color: #2a2a2a;
    line-height: .40rem;
    float: left;
    padding-bottom: .20rem;
  }
  .register{
    width: 1.60rem;
    height: .72rem;
    border: 0.01rem solid #258bfa;
    color: #258bfa;
    font-size: .28rem;
    border-radius: .10rem;
    line-height: .72rem;
    float: right;
  }
  .cont_box{
    background: #fff;
    margin-top: .3rem;
  }
</style>
