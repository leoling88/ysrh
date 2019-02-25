<template>
  <div class="container">
    <div class="step3_cont">
      <div class="sucess_cont cont2">
        <img v-if="formData.resultsType == 1" class="icon_success" src="../../assets/images/yySuccess.png"/>
        <img v-else class="icon_success" src="../../assets/images/yyFail.png"/>
        <div v-if="formData.resultsType == 1">
          <h3>
            <p>提交成功</p>
            <div class="span">记得带齐证明材料哦，点击下方<span>【查看详情】</span>，查看需要
              准备的证明材料。</div>
          </h3>
        </div>
        <!--<h3 v-else>提交失败<span>系统错误，请稍后重新尝试提交申请。</span></h3>-->
      </div>
      <router-link :to="`/bookDetail/${this.$route.query.id}`" class="check_detail_btn">查看详情</router-link>
      <router-link :to="`/?openId=${this.openId}`" class="check_detail_btn2">返回首页</router-link>
    </div>
  </div>
</template>
<script>
  import { Group,XButton,Cell } from "vux";
  import api from "../../api/api.js";
  import { mapState } from "vuex";
  export default {
    components: {Group,XButton,Cell},
    data() {
      return {
        formData:{
          resultsType:1, //返回结果，还没定
        }
      };
    },
    methods: {
    },
    mounted() {
      document.body.style.backgroundColor = '#fff';
    },
    computed: {
      ...mapState([
        'idCard','openId','userId','name'
      ])
    },
    created() {

    },
    destroyed(){
      document.body.style.backgroundColor = '#f5f5f9';
    }
  };
</script>
<style lang="less" scoped>
  .step3_cont{
    width:100%;overflow:hidden;line-height: .5rem;position: relative;background: #fff;
    .sucess_cont{
      width:100%;background:#fff;padding:1.5rem 0 .4rem 0;
      .icon_success{display: block;width:2.02rem;margin:0 auto;}
      h3{width:90%;margin:0 auto;overflow:hidden;line-height: 1rem;font-size: .38rem;}
      h3 p{text-align:center;}
      h3 .span{margin:0 auto;overflow:hidden;display: block;color:#2a333c;font-size: .30rem;line-height: .45rem;font-weight:normal;}
      h3 .span span{color:#0091ff;}
      h3 .failed{font-weight:normal;text-align: left;margin-top:0rem;font-size: .3rem;}
      .submit_failed{color:#FD7E14;}
      h3 em{display: block;color:#0091ff;font-size: .35rem;line-height: .5rem;}
    }
  }
  .check_detail_btn{display:block;width: 6.9rem;height:.88rem;line-height:.88rem;margin:.5rem auto 0 auto; border-radius: .1rem;text-align: center;color:#fff;font-size: .28rem;background: #0091FF;}
  .check_detail_btn2{display:block;width:6.9rem;height:.88rem;line-height:.88rem;margin:.5rem auto 0 auto; border-radius: .1rem;text-align: center;color:#0091FF;font-size: .28rem;border:1px solid  #0091FF;}
</style>
