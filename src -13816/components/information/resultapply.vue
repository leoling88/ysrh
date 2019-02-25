<template>
  <div class="container">

    <div  v-if="status ==='pass'">
      <img src="../../assets/images/icon_success.png" alt="" class="result-1-img">
      <div class="result-1-text">
        <h3>报名成功</h3>
        <div class="pad-1">活动名称：<span @click="clickLink" class="col-blue">{{name}}</span></div>
        <p>请准时出席活动,如有疑问请联系主办方</p>
      </div>
    </div>
    <div class="but-1 marT-30" @click="goBack">返回</div>

    

  </div>
</template>
<script>
  import mixins from "../../mixins/mixins.js";
  export default {
    components: {},
    mixins: [mixins],
    data() {
      return {
        openId: this.$route.query.openId,
        status: this.$route.query.status,
        id: this.$route.params.comId,
        name: this.$route.params.name,
        listType:this.$route.params.listType,


      }
    },
    methods: {

      clickLink(){
        this.$router.push({path:'/article2/' + this.openId +'/'+this.listType +'/'+this.id});
      },

      goBack(){
         this.$router.go(-1);
      }
    },
    created () {
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
.result-1-img{display:block;width:1.5rem;margin:1rem auto .5rem;}
.result-1-text{text-align:center;margin-top:.5rem;}
.result-1-text h3{margin-bottom:.2rem;font-size:.36rem;}
.result-1-text p{font-size:.26rem;color:#888;}
.but-1{margin:0 .3rem;border-radius:.1rem;padding:.2rem 0;color:#fff; text-align: center;background:#308AFF;}
.marT-30{margin-top:1rem;}
.pad-1{padding:.1rem .2rem;}
.col-blue{color:#308AFF;}
</style>
