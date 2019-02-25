<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">2018最新越秀通讯录+办事指南！人手一份，一定用得上！</div>
      <group class="new_info">
        <cell title="越秀区来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-11-5</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p>生活必备的“越秀通讯录”包含维权投诉、证件办理、紧急求助、疾病就医、交通出行等方方面面</p>
        <img src="../../assets/images/details/yuexiu21.jpg" alt="">
        <img src="../../assets/images/details/yuexiu22.jpg" alt="">
        <img src="../../assets/images/details/yuexiu23.jpg" alt="">
        <img src="../../assets/images/details/yuexiu24.jpg" alt="">
        <img src="../../assets/images/details/yuexiu25.jpg" alt="">
        <img src="../../assets/images/details/yuexiu26.jpg" alt="">
        <img src="../../assets/images/details/yuexiu27.jpg" alt="">
        <img src="../../assets/images/details/yuexiu28.jpg" alt="">
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
