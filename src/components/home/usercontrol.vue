<template>
  <div class="container">
    <div>

      <div class="bg_white">
          <cell   title="头像" > <img :src="userWX.headPic" alt="" class="head-img"></cell>
          <cell  class="modelTitle modelTitle_my" title="姓名" :value="userWX.name" ></cell>
          <cell  class="modelTitle modelTitle_my" title="性别" :value="sex"></cell>
          <cell  class="modelTitle modelTitle_my" title="证明号码" :value="userWX.identity | hideMiddle"></cell>
          <cell  class="modelTitle modelTitle_my" title="手机号码" :value="userWX.phone"></cell>
      </div>
      <div class="bg_white mt30">
        <cell  class="modelTitle modelTitle_my" title="修改密码" :is-link="true"  @click.native="changePW">
        </cell>

      </div>
<!--       <div class="endLogin" v-if="logState" @click="endLogins">退出登录</div>
 -->    </div>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api.js";
import mixins from "../../mixins/mixins.js";
import utils from '../../script/utils';
export default {
  components: { Group, Cell },
  mixins: [mixins],
  data() {
    return {
      openId: this.$route.params.openId,
      userWX:[],
      sex:''

    };
  },
  methods: {
    requireWXUser(){    //获取微信用户信息
      if(this.openId){
        api.getWXdUser({
           openId: this.openId    
        }).then((res)=>{
          const _data = res.data.wxUsers[0]
          if(res.data.success){
            this.userWX = _data
            let sex = ''
            if(_data.gender == 1) this.sex  = '男'
            else this.sex  = '女'
          }
        });        
      }
    },
    changePW(){    //修改密码
      this.$router.push({path:'/password/' + this.openId + '?type=2'});
    }
  },
  mounted() {},
  created() {
    if(!this.openId){
      this.openId = this.$Utils.getLocalStorage('openId');
    }
    this.requireWXUser()
  },
  filters: {
    hideMiddle(val) {
      return `${val.substring(0,6)}********${val.substring(val.length-2)}`
    },
  }
};
</script>
<style lang="less" scoped>
.head-img{width:1rem;height:1rem;border-radius:50%;}
</style>
