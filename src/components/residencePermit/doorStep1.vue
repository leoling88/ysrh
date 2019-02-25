<template>
  <div class="cont_box">
    <step :step="1"></step>
    <!--{{'555有没有openid'+this.openId}}-->
    <!--{{'3有没有idcard'+this.idCard}}-->
    <group>
      <CustomPicker title="行政区" @onChange="areaChange" apiMethod="queryDictionaryList" :disabled="false" code="XZQ"></CustomPicker>

      <CustomPicker title="街镇" placeholder="请选择街镇" @onChange="streetChange" apiMethod="getStreetData" :disabled="!formData.area.value" :code="formData.area.value" :myid="myuserid"></CustomPicker>

      <CustomPicker title="街道巷" placeholder="请选择街道巷" @onChange="alleyAreaChange" apiMethod="getStreetxData" :disabled="!formData.area.value || !formData.street.value" :code="formData.street.value" :myid="myuserid"></CustomPicker>

      <CustomPicker title="门牌号" placeholder="请选择门牌号" @onChange="doorChange" apiMethod="getDoorInfo" :disabled="!formData.area.value || !formData.street.value || !formData.alleyArea.value" :code="formData.alleyArea.value" :myid="myuserid"></CustomPicker>

      <CustomPicker title="详址/房号" placeholder="请选择房号" @onChange="roomChange" :disabled="!formData.area.value || !formData.street.value || !formData.alleyArea.value" :code="formData.door.value" apiMethod="getRoomNum" :myid="myuserid"></CustomPicker>

      <CustomPicker title="房屋类型" placeholder="请选择房屋类型" @onChange="houseTypeChange" :disabled="!formData.area.value || !formData.street.value || !formData.alleyArea.value || !formData.door.value || !formData.room.value" :code="formData.room.value" apiMethod="queryDictionaryList" :myid="myuserid"></CustomPicker>

    </group>
    <XButton class="button_box" type="primary" @click.native="goNext">下一步</XButton>



  </div>
</template>
<script>
  import Step from '../common/Step.vue';
  import CustomPicker from '../common/CustomPicker.vue';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  import { XButton, Group, PopupPicker } from 'vux'
  export default{
      name: 'doorStep1',
      mixins: [mixins],
      components: {Step, CustomPicker, XButton, Group, PopupPicker},
      data () {
          return {
            myuserid:this.$route.query.userId,
            value1: [],
            list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
            formData: {
              area: '',  // 行政区
              street: '',  // 街镇
              alleyArea: '', // 街道巷
              door: '', // 门牌号
              room: '', // 房号号
              houseType: '', // 房屋类型
            }
          }
      },
      methods: {
        areaChange (data) { // 行政区
          this.formData.area = data;
          this.formData.street = '';
          this.formData.alleyArea = '';
          this.formData.door = '';
          this.formData.room = '';
          this.formData.houseType = '';
        },
        streetChange (data) { // 街镇
          this.formData.street = data;
          this.formData.alleyArea = '';
          this.formData.door = '';
          this.formData.room = '';
          this.formData.houseType = '';
        },
        alleyAreaChange (data) { // 街道巷
          this.formData.alleyArea = data;
          this.formData.door = '';
          this.formData.room = '';
          this.formData.houseType = '';
        },
        doorChange (data) {
          this.formData.door = data;
          this.formData.room = '';
          this.formData.houseType = '';
        },
        roomChange (data) {
          this.formData.room = data;
          this.formData.houseType = '';
        },
        houseTypeChange (data) {
          this.formData.houseType = data;
        },
        validate () { // 校验表单
          let valid = false;
          let errorMsg = '';
          if (!this.formData.area.value) {
            errorMsg = '请选择行政区！'
          } else if (!this.formData.street.value) {
            errorMsg = '请选择街镇！'
          } else if (!this.formData.alleyArea.value) {
            errorMsg = '请选择街道巷！'
          } else if (!this.formData.door.value) {
            errorMsg = '请选择门牌号！'
          } else if (!this.formData.room.value) {
            errorMsg = '请选择详址/房号！'
          } else if (!this.formData.houseType.value) {
            errorMsg = '请选择房屋类型！'
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
            this.$router.push({ path: '/doorStep2',query: {name: this.$route.query.name,idCard: this.$route.query.idCard,userId:this.$route.query.userId}});
            this.$Utils.setLocalStorage('/doorStep1', this.formData);
          }
        },
      },
      activated () {
        this.$store.commit('UPDATE_KEEP_ALIVE', -1); // 清除上一个页面的缓存
      },
      mounted () {
        // 缓存此组件
        this.$store.commit('UPDATE_KEEP_ALIVE', 'doorStep1');
        //存储openid
//        this.$Utils.setLocalStorage('openId',this.$route.query.userId);
//        this.$store.commit("UPDATE_USER_INFO", {
//          openid: this.$route.query.userId,
//          userId: this.$route.query.userId
//        });
//        this.$store.commit("UPDATE_USER_INFO", {
//          idCard: this.$route.query.idCard,
//          name: this.$route.query.name
//        });
      }
    }
</script>
<style lang="less" scoped>
  .cont_box {
    min-width: 7.5rem;
    overflow: hidden;
  }
</style>
