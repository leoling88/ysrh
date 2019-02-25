<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">来穗人员积分制服务申办指南</div>
      <group class="new_info">
        <cell title="广州市来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-6-28</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <img src="../../assets/images/details/detail1.jpg" alt="">
        <img src="../../assets/images/details/detail2.jpg" alt="">
        <img src="../../assets/images/details/detail3.jpg" alt="">
        <img src="../../assets/images/details/detail4.jpg" alt="">
        <img src="../../assets/images/details/detail5.jpg" alt="">
        <img src="../../assets/images/details/detail6.jpg" alt="">
        <img src="../../assets/images/details/detail7.jpg" alt="">
        <img src="../../assets/images/details/detail8.jpg" alt="">
        <img src="../../assets/images/details/detail9.jpg" alt="">
        <img src="../../assets/images/details/detail10.jpg" alt="">
        <img class="mb100" src="../../assets/images/details/detail11.jpg" alt="">
      </div>
      <div class="newsBton">
        <a href="javascript:;" class="firstBtn" @click="thumbsUp">
          <img v-if="zanShow" src="../../assets/images/zan1.png" alt="">
          <img v-if="!zanShow" src="../../assets/images/zan.png" alt="">
          <span>{{zannum}}</span>
        </a>
        <a href="javascript:;">
          <img src="../../assets/images/zhuanfa.png" alt="">
          <span>转发</span>
        </a>
      </div>
    </div>
    <group class="mb100"  title="相关服务推荐">
      <cell class="bg_white" title="积分制入户" link="IntegralService"></cell>
      <cell class="bg_white" title="积分制入学" :is-link="true"></cell>
      <cell class="bg_white" title="积分制申请公租房" :is-link="true"></cell>
    </group>
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
        zannum:326,
        zanShow:false,
      }
    },
    methods: {
      thumbsUp (){
        this.zanShow = true;
        this.zannum = this.zannum + 1
      }
    },
    created () {
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
</style>
