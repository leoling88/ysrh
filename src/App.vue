<template>
  <div id="app">
    <transition :name="`slide-${direction == 1 ? 'in' : 'out'}`">
      <!--发现组件做了缓存之后，组件在切换时动画效果更佳，这里做动态缓存-->
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>

    </transition>
    <toast v-model="toastShow" type="text" :time="2000" :width="toastWidth" is-show-mask :text="toastMsg" position="middle" @on-hide="onHide"></toast>
    <Loading :show="loadingShow"></Loading>
    <Messages :show="messageShow.show"><span slot='text' v-text="messageShow.text"></span>
</Messages>
    <navbar></navbar>
  </div>
</template>

<script>
  import Loading  from './components/common/Loading.vue'
  import Messages  from './components/common/Messages.vue'
  import { mapState } from 'vuex';
  import { Toast} from 'vux'
  import api from './api/api'
  import navbar  from '@/components/common/navbar.vue'

  export default {
    components: {Loading,Toast,Messages,navbar},

    data() {
      return {
        isRouterAlive:true
      };
    },
    // provide(){
    //   return{
    //     reload:this.reload
    //   }
    // },
    computed: {
      ...mapState([
        'loadingShow','toastShow','toastMsg','toastWidth','direction','messageShow','keepAlive'
      ])
    },
    watch: {

    },
    methods: {
      onHide () {
        this.$store.commit('CLEARSHOWTOAST', false);
      },
//      getDictionary(){ // 在空闲的时候获取所有的字典，优化页面加载速度
//        api.queryDictionaryList().then(res => {
//          if(res.data.success) {
//            const data = res.data.obj;
//            this.$Utils.setLocalStorage('XB', this.filerData(data.XB)); // 性别
//            this.$Utils.setLocalStorage('MZ', this.filerData(data.MZ)); // 民族
//            this.$Utils.setLocalStorage('HKXZ', this.filerData(data.HKXZ)); // 户口类型
//            this.$Utils.setLocalStorage('ZZMM', this.filerData(data.ZZMM)); // 政治面貌
//            this.$Utils.setLocalStorage('WHCD', this.filerData(data.WHCD)); // 文化程度
//            this.$Utils.setLocalStorage('HYZK', this.filerData(data.HYZK)); // 婚姻状况
//            this.$Utils.setLocalStorage('JZFS', this.filerData(data.JZFS)); // 居住方式
//            this.$Utils.setLocalStorage('ZZSY', this.filerData(data.ZZSY)); // 居住事由
//            this.$Utils.setLocalStorage('ZZDXZ', this.filerData(data.ZZDXZ)); // 房屋类型
//            this.$Utils.setLocalStorage('SF', this.filerData(data.SF)); // 是否承租人
//            this.$Utils.setLocalStorage('JZY', this.filerData(data.JZY)); // 职业
//            this.$Utils.setLocalStorage('hasDictionaryList', true); // 职业
//          }
//        });
//
//        api.getEmploymentStatus().then(res => { // 就业情况
//          if(res.data.success) {
//            const data = res.data.obj;
//            this.$Utils.setLocalStorage('JYQK', this.filerData(data, 2));
//          }
//        });
//
//        api.getRelation().then(res => { // 与填表人关系
//          if(res.data.success) {
//            const data = res.data.obj;
//            this.$Utils.setLocalStorage('GX', this.filerData(data, 2));
//          }
//        });
//      },
      filerData(srcData, type = 1){ // 筛选数据字典, type: 1,来穗字典，2，本地字典
        let toData = []
        if(srcData instanceof Array && toData instanceof Array){
          if (type == 1) {
            srcData.forEach(item => {
              toData.push({
                value: item.itemName ? item.itemName : item.mph,
                key: item.itemCode ? item.itemCode : item.zhid
              })
            });
          } else {
            srcData.forEach(irem => {
              toData.push({
                value: irem.description,
                key: irem.subtype
              })
            });
          }
        }
        return toData;
      },
      // reload(){
      //   this.isRouterAlive = false;
      //   this.$nextTick(function(){
      //     this.isRouterAlive = true;
      //   })
      // }



    },
    created() {
//      if (!this.$Utils.getLocalStorage('hasDictionaryList')) this.getDictionary();
    },
    mounted(){
      // this.$router.beforeEach((to, from, next) => {
      //   this.$store.commit('UPDATE_LOADING', true);
      //   next()
      // });
      // this.$router.afterEach((to) => {
      //   this.$store.commit('UPDATE_LOADING', false);
      // });
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app{width:100%;height:100%;}

.slide-in-enter-active,.slide-in-leave-active,.slide-out-enter-active,.slide-out-leave-active{
  will-change: transform;
  transition: all 250ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

// 页面从左侧滑入
.slide-in-enter{
  transform: translate3d(100%,0,0);
}
.slide-in-leave-to{
  transform: translate3d(-100%,0,0);
}

// 页面从右侧滑入
.slide-out-enter{
  transform: translate3d(-100%,0,0);
}
.slide-out-leave-to{
  transform: translate3d(100%,0,0);
}

//时间插件确定按钮颜色修改
 .dp-header .dp-item.dp-right{color:#1F67D0 !important;}
.weui-input{color:#333 !important;}

.weui-cell__ft{color:#333 !important;}

</style>
