<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">越秀区各街道开展消防安全联动行动，加强来穗人员安全意识</div>
      <group class="new_info">
        <cell title="越秀区来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-4-25</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p class="txtIndent">为进一步创建更加干净整洁平安有序城市环境，增强来穗人员消防安全意识和防火逃生技能，上周，越秀区各街道开展联动行动，如消防讲座、消防检查以及消防演习等等。</p>
        <p class="txtIndent">为了给辖内来穗人员提供安全的居住环境，近日，人民街来穗中心联合街派出所、安监等职能部门，对辖区内存在严重消防隐患挂牌重点整治单位进行消防安全检查。</p>
        <img src="../../assets/images/details/jiedao21.jpg" alt="">
        <p class="txtIndent">早前，位于靖海门社区的南华园4号由于货物堆放过高、阳台堆放杂物，为辖内来穗人员带来严重的消防安全隐患，经过前期的督促整改，此次检查发现木板间隔、住人、煮食、仓储等“三合一”消防隐患问题已得到有效整改。</p>
        <img src="../../assets/images/details/jiedao22.jpg" alt="">
        <p class="txtIndent">随后，人民街出管中心和公安派出所联合开展出租屋巡查，针对出租屋内存在的隐患问题，现场对承租人发出整改告知书，责令承租双方限期整改，保障更加干净整洁平安有序的居住环境。此外，工作人员还现场对房屋业主展开宣传教育，要求房屋业主承诺整改措施，对屋内电线陈旧老化问题进行整改和装修，为来穗人员营造平安出租屋环境。</p>
        <p class="txtIndent">为进一步加强辖内来穗人员消防安全意识,北京街来穗人员和出租屋服务管理中心联合消防整治办、派出所、安监中队联同平安广州志愿服务总队于4月19日上午在流水井社区举行消防安全演练宣传活动。</p>
        <img src="../../assets/images/details/jiedao23.jpg" alt="">
        <p class="txtIndent">活动中，工作人员不仅讲解日常家庭内消防安全需要注意的事项，还通过现场实操演练环节，对逃生绳结、消防水带接驳和灭火毡等常规消防设备的使用方法进行示范操作。</p>
        <img src="../../assets/images/details/jiedao24.jpg" alt="">
        <p class="txtIndent">同时现场邀请来穗人员和居民群众切身体验消防面具和消防员装备。通过平安广州志愿服务教官专业的讲解、生动的演示、耐心的实操，不仅有效提高了来穗人员和居民群众火灾预防和自我保护意识，还增强了消防安全素质和防火逃生能力,现场取得了良好的效果。</p>
        <p class="txtIndent">为进一步丰富来穗人员融和课堂内容，提高来穗人员、社区管理员消防安全意识，普及消防知识，4月16日下午，光塔街来穗人员和出租屋服务管理中心组织消防安全知识宣传教育，40多位来穗人员、社区管理员和辖内物业公司代表参加了培训。</p>
        <img src="../../assets/images/details/jiedao25.jpg" alt="">
        <p class="txtIndent">课堂由消安防火宣传中心宣传部谢教官讲授，谢教官为大家讲解了各类火灾情形的应对方法、应急逃生以及注意事项，并现场演练灭火器，防毒面具等各类消防器材的使用方法，通过培训和实操进一步提高来穗人员、管理员防患意识和消防安全知识与技能，增强火灾处置能力。此次培训对做好出租屋消防安全工作、明确出租人和承租人等安全责任和义务、减少出租屋消防安全隐患等具有重要意义。</p>
        <img src="../../assets/images/details/jiedao26.jpg" alt="">
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
