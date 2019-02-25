<template>
  <div>
    <step :step="2" :tabs="tabs"></step>

    <Group class="cont_box">
      <cell title="街道办" :value="params.area.name + params.street.name"></cell>
      <datetime
        class="date_time"
        v-model="formData.appoitmentDate"
        @on-change="dateChange"
        placeholder="请选择上门核实的日期"
        :start-date="startDate"
        :end-date="endDate"
        apiMethod="laisuiQueryYyszList"
        title="上门核实日期"></datetime>
    </Group>

    <AppoitmentTime :appoitmentDate="formData.appoitmentDate" :streeCode="params.street.value" @change="checkTime"></AppoitmentTime>



    <XButton class="button_box" type="primary" @click.native="goNext">下一步</XButton>



  </div>
</template>
<script>
  import Step from '../common/Step.vue';
  import AppoitmentTime from '../common/AppoitmentTime.vue';
  import { Group, Cell, XButton, Datetime } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  export default{
      name: 'bookTime2',
      mixins: [mixins],
      components: {Group, Cell, XButton, Step, Datetime, AppoitmentTime },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/bookTime1'),
            startDate: this.$Utils.getDay(1), // 上门核实最小开始时间
            endDate: this.$Utils.getDay(7),
            formData: {
              appoitmentDate: '',  // 核实日期
              appoitmentTime: '', // 核实时间
            },
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
            ]
          }
      },
      methods: {
        validate () { // 校验表单
          let valid = false;
          let errorMsg = '';
          if (!this.formData.appoitmentDate) {
            errorMsg = '请选择核实日期！'
          } else if (!this.formData.appoitmentTime) {
            errorMsg = '请选择预约时间！'
          } else {
            valid = true;
            errorMsg = '';
          }
          return {valid, errorMsg}
        },
        goNext() {
          var validate = this.validate(), params;
          if (!validate.valid) {
            this.$store.commit('SHOWTOAST', validate.errorMsg);
          } else {
            this.$router.push({ path: '/bookTime3'});
            this.$Utils.setLocalStorage('/bookTime2', Object.assign(this.params, this.formData));
          }
        },
        dateChange (value) {  // 日期选择
          this.formData.appoitmentDate = value;
        },
        checkTime (value) { // 时间选择
          this.formData.appoitmentTime = value;
        },
      },
      activated () {
        this.$store.commit('UPDATE_KEEP_ALIVE', -1);  // 清除上一个页面的缓存
      },
      mounted () {
        this.$store.commit('UPDATE_KEEP_ALIVE', 'bookTime2');
      },
    watch:{
      '$route'(to,from){
        if(to.path == '/bookTime2'){ //更新缓存，预防回退页面，页面内容不及时刷新
          var oldAreaName = this.params.area.name + this.params.street.name
          this.params = this.$Utils.getLocalStorage('/bookTime1')
          var newAreaName = this.params.area.name + this.params.street.name
          if(oldAreaName == newAreaName){
          }else{
            this.formData.appoitmentDate = ''
          }

        }
      }
    }

    }
</script>
<style lang="less" scoped>
  .cont_box{
    background: #fff;
  }
</style>
