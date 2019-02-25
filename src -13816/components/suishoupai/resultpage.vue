<template>
  <div class="container">
    <div  v-if="datas.type0==='succeed'">
      <img src="../../assets/images/icon_success.png" alt="" class="result-1-img">
      <div class="result-1-text" v-if="datas.type1==='1'">
        <h3>上报成功</h3>
        <p>我们将在第一时间处理,感谢您的关注</p>
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
        eventType: this.$route.params.eventType,
        datas:{
          type0:'succeed',
          type1:'1'
        }
      }
    },
    methods: {
      goBack(){
        this.$router.push({path:'/suishoupai/' + this.openId  +'/'+this.eventType});
      }
    },
    created () {
    },
    mounted(){
      document.title = this.eventType

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
</style>
