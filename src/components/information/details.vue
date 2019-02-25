<template>
  <div class="container">
    <div class="error" v-if="message.show"><img src="../../assets/images/error_404.png" alt=""></div>
    <div class="bg_white newsBody mar-bot20" v-else>
      <div class="con-1">
       <label for="">详情</label><p>fdsfdsffdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsfdsfdsfdsdsfdsdsdsfds</p>
    </div>
      类型 时间 地址

      ssss
    </div>
  </div>
</template>
<script>
  import {Group,Cell} from "vux";
  import api from '../../api/api';
  import mixins from "../../mixins/mixins.js";
  export default {
    components: {Group,Cell},
    mixins: [mixins],
    data() {
      return {
        openId: this.$route.params.openid,
        eventId: this.$route.params.id,
        article:[],
        message:{
          show:false,
          text:''
        }

      }
    },
    methods:{

      queryArtData(){    //获取资讯列表

        api.getEventArt({
          id:this.eventId,
        }).then((res)=>{
            this.article = _data.data

        })
      },       



    },
    created () {
    },
    mounted(){
      this.queryArtData()
    }
  }
</script>
<style lang="less" scoped>
.but-1{position: fixed;width:2.5rem;height:1rem;border-radius:.8rem;color:#fff; text-align:center;background: #2c95f5;box-shadow: 0 0 .5rem .01rem #2c95f5;bottom:.5rem;left:50%;margin-left:-1.25rem;line-height:1rem; }
.but-1 a{color:#fff;}
.con-1{display: flex;}
</style>
