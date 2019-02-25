<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">服务走前列，越秀区举办积分制服务管理审核指引培训班</div>
      <group class="new_info">
        <cell title="越秀区来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-6-28</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p class="txtIndent">6月28日，越秀区来穗人员服务管理局举办2018年越秀区积分制服务管理审核指引培训班，区来穗局、全区18个街道积分制服务管理窗口业务骨干共63人参与了培训。</p>
        <img src="../../assets/images/details/index21.jpg" alt="">
        <p class="txtIndent">本次培训内容主要从政策解读、工作流程、积分指标体系、申请材料、审核要求五个方面，详细介绍了2018年7月1日正式实施的《广州市来穗人员积分制服务管理规定（试行）》及实施细则，细致解读来穗人员积分制的申请条件、时间、地点、可享受权益和公共服务，剖析积分指标体系、排名规则、申办步骤等内容。越秀区来穗人员综合服务中心黄主任现场演示系统使用流程，讲解了申请人材料审核标准和注意事项。培训班还设置了现场释疑解惑互动环节，帮助学员们增强政策理解能力，提升业务水平。</p>
        <img src="../../assets/images/details/index22.jpg" alt="">
        <p>下一步，越秀区来穗局将组织业务骨干深入一线开展政策宣讲，构建“区—街—社区”三级常态化积分制政策宣讲机制，在全区来穗人员融合学堂全面铺开积分制政策解读，印制一批宣传海报和折页单张，广泛形成良好宣传氛围，营造共建共治共享良好社会治理格局。</p>
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
  import api from '../../api/api'
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
