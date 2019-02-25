<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">来穗人员进入“大积分”新时代，越秀区扎实推进积分制服务管理工作</div>
      <group class="new_info">
        <cell title="越秀区来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-7-5</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p><span class="redBlod">2018年7月1日,《广州市来穗人员积分制服务管理规定（试行）》及实施细则正式实施，来穗人员迎来“大积分”时代。</span></p>
        <p class="txtIndent">越秀区来穗局坚持以人民为中心，以需求导向、服务优先、精准施策、区街联动全面开启来穗人员积分制服务管理工作，扎实推进来穗人员基本公共服务覆盖面，争当营造共建共治共享社会治理格局排头兵。</p>
        <p><span class="redBlod">统筹协调，统一思想</span></p>
        <img src="../../assets/images/details/gztou31.jpg" alt="">
        <p class="txtIndent">越秀区来穗人员服务管理工作领导小组下设积分制专项工作小组，由分管区领导任组长，16个职能部门和18个街道为成员单位，统筹协调积分制服务管理各项工作。专项工作小组建立联络员制度，定期召开工作会议，压实成员职责，形成区级合力，确保积分制各项工作按时保质顺利完成。</p>
        <p><span class="redBlod">细化分工，责任到人</span></p>
        <img src="../../assets/images/details/gztou32.jpg" alt="">
        <p class="txtIndent">制定《越秀区来穗人员积分制服务管理工作实施方案》，明确任务分工、职责范围和时间节点，各职能部门主动加强与市主管部门对接，明确积分认定的审核标准及操作步骤；各街道均设置2个服务窗口、设立咨询热线，指定专人负责前台咨询、网上预审、收件受理、资格初审等工作。</p>
        <p><span class="redBlod">需求导向，精准服务</span></p>
        <img src="../../assets/images/details/gztou33.jpg" alt="">
        <p class="txtIndent">每周利用微信公众号详解积分制政策细则，解答热点问题；依托来穗人员融合学堂举办积分制政策专题解读，邀请专业人士为来穗人员讲政策、消疑惑、解要点；印制一批积分制宣传海报、申办指南，制作积分制系列宣传展架，同步要求各街来穗中心通过入户巡查、前台设点、社区活动等形式向来穗人员广泛宣传积分制政策，营造良好氛围。</p>
        <p><span class="redBlod">统一标准，强化保障</span></p>
        <img src="../../assets/images/details/gztou34.jpg" alt="">
        <p class="txtIndent">每统一收件标准、评分标准、审核标准，确保积分制工作公平、公正、公开。建立积分制业务交流群，及时交流疑难杂症。成立督导巡查小组，对各街道积分制工作情况进行全面巡查，并定期通报巡查督导情况，与绩效考核挂钩，有效提高工作人员主动性和积极性。</p>
        <p><span class="redBlod">加强培训，提升素质</span></p>
        <img src="../../assets/images/details/gztou35.jpg" alt="">
        <p class="txtIndent">积极组织积分制工作人员参加市级培训班，认真学习实施细则、申请条件、积分指标、排名规则、申办流程等内容。为巩固学习成果，举办区级审核指引培训班，从工作流程、申请材料、审核步骤、审核要求四个方面，帮助工作人员进一步提高思想认识，加深政策文件理解，增强业务能力。本周越秀区已经组织全区大部分街道出管员开展政策宣讲培训，确保每一位出管员对积分制政策能说清、能讲透、能指引。</p>
        <img src="../../assets/images/details/gztou36.jpg" alt="">
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
