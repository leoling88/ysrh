<template>
  <div>
    <ul class="footer" v-show="routeShow">
      <li :class="footerType == 1 ? 'now' : ''" >
        <router-link :to="{path:'/?openId='+ LinkOpenid }">
          <img v-show="footerType == 1" src="../../assets/images/indexicon1.png" alt="">
          <img v-show="footerType != 1" src="../../assets/images/indexicon.png" alt="">
          <p>首页</p>
        </router-link>
      </li>
      <li :class="footerType == 2 ? 'now' : ''" >
        <router-link :to="{path:'../information?openId='+ LinkOpenid }">
          <img v-show="footerType == 2" src="../../assets/images/zxicon1.png" alt="">
          <img v-show="footerType != 2" src="../../assets/images/zxicon.png" alt="">
          <p>资讯</p>
        </router-link>
      </li>
      <li :class="footerType == 3 ? 'now' : ''" >
        <router-link  :to="{path:'../my?openId='+ LinkOpenid}" >
          <img v-show="footerType == 3" src="../../assets/images/myicon1.png" alt="">
          <img v-show="footerType != 3" src="../../assets/images/myicon.png" alt="">
          <p>我的</p>
        </router-link>
      </li>
    </ul>

  </div>

</template>
<script>
  export default {

    data() {
      return {
        footerType: '',
        routeShow:true,
        LinkOpenid:''
      };
    },
    methods: {
      clickFtype(type) {
        this.footerType = type;
      }


    },
    mounted() {
      this.LinkOpenid = this.$Utils.getLocalStorage('openId')


    },
    watch: {
      '$route'(to, from){
        if(to.path == '/' || to.path == '/my' || to.path == '/information' || to.path == '/article'){
          this.routeShow = true;
        }else{
          this.routeShow = false;
        }
        if(to.path == '/'){
          this.footerType = 1
        }else if(to.path == '/information' || to.path == '/article'){
          this.footerType = 2
        }else if(to.path == '/my'){
          this.footerType = 3
        }
      }
    }
  };
</script>
<style scoped>
</style>

