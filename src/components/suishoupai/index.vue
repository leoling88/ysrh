<template>
    <div class="container" >
      <div class="ul-1" v-if="lists.length > 0">
        <ul>
          <li v-for="item in lists">
            <router-link :to="{path:'/eventdetails/'+ openId +'/' + item.id}">
              <span class="img"><img :src="item.cover" alt="" ></span>
              <h3 class="h3">{{item.eventName}}</h3>
              <div class="bot"><span class="fl">{{item.eventAddress}}</span><span class="fr">{{item.createTime | formatDate }}</span></div>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="mess-1">暂无数据</div>
      <div class="but-1"><router-link :to="{path:'/inputevent/'+ openId +'/' + eventType}"><span class="camera-solid"></span>随手拍</router-link></div>
    </div>
</template>
<script>
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      openId: this.$route.params.openId,
      eventType: this.$route.params.listType,
      page: 1,
      limit: 100,
      lists:[]
    }

  },
  methods: {
    requireDatas(){    //获取事件列表
      api.requireSJlist({
       openId: this.openId,
       eventType: this.eventType,
       page: this.page,
       limit: this.limit        
      }).then((res)=>{
        const _data = res.data
        this.lists = _data.data.data

      });
    },


  },
  computed: {

  },

  mounted() {
    this.requireDatas()
    document.title = this.eventType
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
      return y + '-' + MM + '-' + d  //+ ' ' + h + ':' + m + ':' + s;
    }

  } 
};
</script>
<style lang="less" scoped>
.container {
  width:100%;
  max-width: 7.5rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.ul-1{padding:.2rem .2rem 2rem ;background: #fff;}
.ul-1 li{height:2.6rem;border-bottom:.01rem solid #ccc;padding:.4rem 0;position: relative;}
.ul-1 li a{color:#333;}
.ul-1 li .img{display:block;width:2.5rem;height:1.8rem;position: absolute;margin:.4rem .2rem;top:0;left:0;overflow:hidden;}
.ul-1 li .img img{max-width:100%;min-height:100%;}
.ul-1 li .h3{padding-left:3rem;height:1rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:2;font-size:.3rem;font-weight:500;overflow: hidden; }
.ul-1 .bot{margin-top:.36rem;padding-left:3rem;color:#ccc;font-size:.24rem;overflow:hidden;}
.but-1{position: fixed;width:2.5rem;height:1rem;border-radius:.8rem;color:#fff; text-align:center;background: #2c95f5;box-shadow: 0 0 .5rem .01rem #2c95f5;bottom:.5rem;left:50%;margin-left:-1.25rem;line-height:1rem; text-indent:.45rem}
.but-1 a{color:#fff;}
.camera-solid {
  color: #fff;
  position: absolute;
  margin-top:.4rem;
  margin-left:.5rem;
  left:0;

  width: .4rem;
  height: .3rem;
  border-radius: .04rem;
  border: solid .01rem currentColor;
  background-color: currentColor;
}

.camera-solid:before {
  content: '';
  position: absolute;
  left: .1rem;
  top: .05rem;
  width: .15rem;
  height:.15rem;
  border-radius: .8rem;
  color: #2c95f5;
  border: solid .01rem currentColor;
  background-color: currentColor;
}

.camera-solid:after {
  content: '';
  position: absolute;
  right: .04rem;
  top: -.07rem;
  width:.2rem;
  height: .05rem;
  border-radius: 1px 1px 0 0;
  background-color: currentColor;
}


</style>
