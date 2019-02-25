<template>
  <div>
    <step :step="2"></step>

    <Group class="cont_box">
      <cell title="街道办" :value="params.area.name + params.street.name"></cell>
      <datetime
        class="date_time"
        v-model="formData.appoitmentDate"
        @on-change="dateChange"
        placeholder="请选择上门核实的日期"
        :start-date="startDate"
        :end-date="endDate"
        title="上门核实日期"></datetime>
    </Group>

    <AppoitmentTime  title="时间" :appoitmentDate="formData.appoitmentDate" :streeCode="params.street.value" @change="checkTime"></AppoitmentTime>



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
      name: 'doorStep2',
      mixins: [mixins],
      components: {Group, Cell, XButton, Step, Datetime, AppoitmentTime },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/doorStep1'),
            startDate: this.$Utils.getDay(1), // 上门核实最小开始时间
            endDate: this.$Utils.getDay(7),
            formData: {
              appoitmentDate: '',  // 核实日期
              appoitmentTime: '', // 核实时间
            }
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
          }
          else {
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
            this.$Utils.setLocalStorage('/doorStep2', Object.assign(this.params, this.formData));
            this.$router.push({ path: '/doorStep3',query: {name: this.$route.query.name,idCard: this.$route.query.idCard,userId:this.$route.query.userId}});

          }
        },
        dateChange (value) {  // 日期选择
          console.log(value)
          this.formData.appoitmentDate = value;
        },
        checkTime (value) { // 时间选择
          this.formData.appoitmentTime = value;
        }
      },
      activated () {
        this.params=this.$Utils.getLocalStorage('/doorStep1'),

        this.$store.commit('UPDATE_KEEP_ALIVE', -1); // 清除上一个页面的缓存
      },
      mounted () {
        console.log(this.params)
        this.$store.commit('UPDATE_KEEP_ALIVE', 'doorStep2');
      }

    }
</script>
<style lang="less" scoped>
  .cont_box{
    background: #fff;
  }
</style>
