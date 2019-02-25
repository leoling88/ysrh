<template>
  <div class="container">
    <div class="error" v-if="message.show"><img src="../../assets/images/error_404.png" alt=""></div>
    <div class="bg_white newsBody mar-bot20" v-else>
      <div class="con-1">
       <label for="" class="label">名称</label>
       <p>{{article.eventName}}</p>
      </div> 
      <div class="con-1">
       <label for="" class="label">类型</label>
       <p>{{article.eventType}}</p>
      </div>
      <div class="con-1">
       <label for="" class="label">时间</label>
       <p>{{article.createTime | formatDate}} </p>
      </div>  
      <div class="con-1">
       <label for="" class="label">地址</label>
       <p>{{article.eventAddress}}</p>
      </div> 
      <div>                     
      <div class="con-1">
       <label for="" class="label">详情</label>
       <p>{{article.eventDesc}}</p>
      </div>
        <p v-for="item in article.eventPicture"> <img :src="item" alt=""></p>
      </div>            
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
          this.article = res.data
          let imgs = res.data.eventPicture;
          let oimgs = imgs.split(",");// 在每个逗号(,)处进行分解  ["abc", "abcd", "aaa"]
          this.article.eventPicture = oimgs
          document.title = this.article.eventType
        })
      },       



    },
    created () {
    },
    mounted(){
      this.queryArtData()

    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }

    }     
  }
</script>
<style lang="less" scoped>
.but-1{position: fixed;width:2.5rem;height:1rem;border-radius:.8rem;color:#fff; text-align:center;background: #2c95f5;box-shadow: 0 0 .5rem .01rem #2c95f5;bottom:.5rem;left:50%;margin-left:-1.25rem;line-height:1rem; }
.but-1 a{color:#fff;}
.con-1{display: flex;display: -webkit-flex; /* Safari */;border-bottom:.02rem solid #f1f1f1;padding:.25rem 0;}
.con-1 .label{min-width:1.2rem;padding-right:.1rem;font-weight: bold;}
</style>
