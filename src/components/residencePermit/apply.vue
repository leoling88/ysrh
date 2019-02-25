<template>
  <div class="box">
    <div class="title">请选择居住证申领类型</div>

    <div class="list_box">
      <div class="list" v-for="item in list" @click="check(item.type)">
        <div>{{item.name}}</div>
        <icon v-if="item.type == formData.slyy" type="success-no-circle"  class="icon"></icon>
      </div>
    </div>

    <div class="text">
      <div class="explain">申领条件说明</div>
      <div class="text_contaitn">
        <div>1、在广州市已办理有效的居住登记及居住证。</div>
        <div>2、居住证持有人在居住地连续居住的，应当在居住每满去年之日前1个月内，持本人居民身份证、居住证和居住地址、就
业、就读等证明材料之一，到居住地的镇、街道（或社区）流动人口服务管理机构办理签注手续。</div>
        <div>备注</div>
        <div>如果已更换居住地，请先变更居住登记地址，变更成功后，再进行居住证签注预约。</div>
      </div>
    </div>

    <XButton class="button_box" type="primary" @click.native="goNext">下一步</XButton>

  </div>
</template>
<script>
  import { Group, Cell, XButton, Icon  } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  export default{
      name: 'apply',
      mixins: [mixins],
      components: { Group, Cell, XButton, Icon  },
      data () {
          return {
            list: [
              { name: "首次申领", type: '1' },
              { name: "遗失补领", type: '2' },
              { name: "损坏换领", type: '3' }
            ],
            formData: { // 表单数据
              slyy: '',  //受理原因
              sljb: '1', // 受理级别
              type: '4'
            }
          }
      },
      methods: {
        check(type) { // 类型选择
          this.formData.slyy = type;
        },
        goNext() {
          if (this.formData.slyy != '') {
            this.$router.push({ path: '/applySearch'});
            this.$Utils.setLocalStorage('/apply', this.formData);
          } else {
            this.$store.commit('SHOWTOAST', '请选择居住证申领类型');
          }
        }
      },
      activated () {
        this.$store.commit('UPDATE_KEEP_ALIVE', -1); // 清除上一个页面的缓存
      },
      mounted () {
        this.$store.commit('UPDATE_KEEP_ALIVE', 'apply');  // 缓存此组件
      }

    }
</script>
<style lang="less" scoped>
.box{
  width: 7.5rem;
  overflow: hidden;
  margin: 0 auto;
}
.title{
  margin: 0.3rem 0 0 .3rem;
  font-size: .34rem;
  color: #000;

}
.list_box{
  background: #fff;
  margin: .30rem auto;
  padding: 0 .30rem;
  box-sizing: border-box;
}
.list{
  width: 100%;
  height: .90rem;
  line-height: .90rem;
  font-size: .34rem;
  margin: 0.05rem 0;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.list .icon{
  color: #1590E9;
  position: absolute;
  right: .1rem;
  top: .1rem;
}
.list:last-of-type{
  border-color:transparent;
}
.explain,.text{
  font-size: .26rem;
  line-height: .48rem;
  padding: 0 .30rem;
  box-sizing: border-box;
}
.explain{
  padding: 0;
  font-weight: bold;
  color: #888888;
  font-size: .26rem;
}
.icon_chedk{
  float: right;
  margin: -.70rem .15rem 0 0;
}
.text_contaitn{
  text-align: justify;
  color: #888888;
}
</style>
