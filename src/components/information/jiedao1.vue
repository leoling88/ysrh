<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">越秀区流花街全力守卫来穗人员居住安全</div>
      <group class="new_info">
        <cell title="流花街来穗中心">
          <span slot="inline-desc" class="dzTime">
            <span>2018-9-28</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p class="txtIndent">为营造共建共治共享社会治理格局，越秀区流花街始终把来穗人员的居住安全放在首位，通过严整治、勤演练、强宣传，守卫辖区一方来穗人员居住安全。今年1-8月份，流花街共出动工作人员1400余人次，检查出租屋21820间次，发现隐患4892个，发出各类整改告知书5327份，整改隐患4554个，整改率达93.1%。</p>
        <img src="../../assets/images/details/jiedao11.jpg" alt="">
        <p class="fw_b">全面排查信息，推进安全隐患整治。</p>
        <p class="txtIndent">在全面核查登记来穗人员和出租屋信息的基础上，流花街制定隐患明细清单，一律限期整改，专人落实复查，强化“住改仓（商、托）”、“群租房”、“二合一”、“三合一”、“三小”场所及各类安全生产消防隐患的消防安全整治力度。围绕禁毒防毒和扫黑除恶专项斗争对出租屋屋主（代理人）和承租人进行宣传教育，消除各类安全隐患，提升服务管理水平。</p>
        <img src="../../assets/images/details/jiedao12.jpg" alt="">
        <img src="../../assets/images/details/jiedao13.jpg" alt="">
        <p class="fw_b">严抓消防演练，提升安全防范水平。</p>
        <p class="txtIndent">定期邀请辖内武警部队专业人员，为流花街来穗人员和出租屋服务管理中心全体管理员进行消防培训，通过专业消防知识理论学习、防毒面具穿戴和灭火器实操训练，切实提高了出租屋管理员的消防意识和应急处置能力，确保出租屋场所发生火情时能够及时得到控制，提高险情应对能力。</p>
        <img src="../../assets/images/details/jiedao14.jpg" alt="">
        <p class="fw_b">强化安全教育，共创幸福平安社区。</p>
        <p class="txtIndent">针对出租屋业主对房屋租赁管理条例及相关法律法规认知程度浅，日常安全隐患督促整改不到位的实际情况，流花街开展安全法纪教育活动，采取“以训代罚”手段，聘请社区驻点律师为出租屋业主讲解有关法规和条例，提升广大出租屋业主依法租赁和共同维护出租屋环境安全和谐的能力。</p>
        <img src="../../assets/images/details/jiedao15.jpg" alt="">
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
