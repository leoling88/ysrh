<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">越秀区登峰街开展防火灭火安全知识培训，快快来学习！</div>
      <group class="new_info">
        <cell title="登封街来穗中心">
          <span slot="inline-desc" class="dzTime">
            <span>2018-10-14</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p class="txtIndent">为提高来穗人员防火、灭火和自我保护的能力，增强安全防火意识，10月9日上午，广州市来穗局、越秀区来穗局、登峰街来穗中心和广州市广仁来穗人员服务中心在登峰文化活动中心开展广州市来穗人员融合大学堂——出租屋消防安全培训讲座，近百名来穗人员参与了培训。</p>
        <img src="../../assets/images/details/jiedao31.jpg" alt="">
        <p class="fw_b">一、深入学习防火、逃生知识</p>
        <img src="../../assets/images/details/jiedao32.jpg" alt="">
        <p class="txtIndent">培训分为理论讲解和模拟体验两个环节。在理论讲解环节，老师首先结合近年来发生的火灾案例，以视频、图片及文字相结合的形式生动地阐述了增强防火意识的重要性，同时从“防火”、“灭火”、“逃生”、“自救”四个方面详细地介绍了火灾的形成过程和自救逃生方法，提升来穗人员在突发事件中的自救应变能力。</p>
        <p class="fw_b">二、切身体验灭火过程</p>
        <p class="txtIndent">在模拟体验的环节中，老师先给来穗人员讲解了火灾现场应急方法，介绍了灭火器的使用方法和动作要领，强调面对火灾一定要沉着、冷静，采取合适的灭火措施。</p>
        <img src="../../assets/images/details/jiedao33.jpg" alt="">
        <img src="../../assets/images/details/jiedao34.jpg" alt="">
        <img src="../../assets/images/details/jiedao35.jpg" alt="">
        <p class="txtIndent">来穗人员认真听完后，还亲自体验了现场灭火过程。面对燃烧的大火，他们并没有畏惧，沉着地按照老师讲解操作：拔去灭火器保险销，手握喷嘴，对准火焰根部，将灭火器上部手柄压下，左右扫射直至火焰熄灭。大家在老师的指导下，基本掌握了使用灭火器、灭火毯的技巧。</p>
        <img src="../../assets/images/details/jiedao36.jpg" alt="">
        <img src="../../assets/images/details/jiedao37.jpg" alt="">
        <p class="txtIndent">此次培训通过深入浅出的理论教学和情景体验，为来穗人员搭建了消防学习与体验平台，向广大来穗人员传达了安全理念和应急处理方式，培训效果显著。</p>
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
