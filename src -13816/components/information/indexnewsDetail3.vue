<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">以服务促管理、管理服务相融合，新建的人民街来穗人员综合管理服务站能给你这些服务</div>
      <group class="new_info">
        <cell title="人民街来穗中心">
          <span slot="inline-desc" class="dzTime">
            <span>2018-6-4</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p class="txtIndent">广州，一座包容且开放的多元化城市。地处那繁华城区中心的越秀区人民街，云集了各类专业市场和优质医疗资源，吸引了五湖四海的来穗人员就此生活，他们可能是批发市场的老板和打工仔，或是医院的护工、运输货物的小哥……</p>
        <img src="../../assets/images/details/index31.jpg" alt="">
        <p>越秀区率先建设来穗人员综合服务站</p>
        <p class="txtIndent">人民街来穗人员综合服务站坐落于大新路257号，通过搭建专业化、个性化、优质化服务平台，开设“夫妻房”驿站、“希望”课堂、“小候鸟”乐园、“星愿”空间、“融合大讲堂”等项目，为来穗人员提供多元化融合服务。</p>
        <img src="../../assets/images/details/index32.jpg" alt="">
        <p class="txtIndent">在这里，能为来穗人员提供内容丰富、形式多样的特色服务，发掘和动员有能力有热心的机团单位和各方人士参与到来穗人员的服务管理工作中，让居住在人民街辖内的来穗人员产生认同感和归属感。</p>
        <p class="txtIndent">每年寒、暑两个假期都会有一群“候鸟”纷纷飞到广州，以解留守儿童对父母的思念之情，夫妻两地分居的相思之情，空巢老人对子女的牵挂之情。如何维护好“一家团聚”这份中国传统家庭的温暖，成为越秀区提升来穗人员服务管理工作的重心。</p>
        <img src="../../assets/images/details/index33.jpg" alt="">
        <p class="txtIndent">人民街来穗中心充分发掘和利用辖内资源优势，邀请在辖内经营三家连锁公寓酒店的广州维福顿酒店管理有限公司，共同参与共建共治共享社会治理格局。该公司在旗下经营的公寓中，每年拿出1000间/夜的客房（相当一年30万的企业利润），无偿提供给人民街的来穗人员家庭团聚。</p>
        <img src="../../assets/images/details/index34.jpg" alt="">
        <p class="txtIndent">“我也是一名来穗务工人员，当年我也是只身来广州创业，从创业初期的艰辛到今天的成功，我深深体会到离家在外创业的艰辛和不易，我也愿意为社会承担起这份责任，在我成功后回馈社会，让其他来穗务工人员也能感受到温暖”。——广州维福顿酒店管理有限公司总经理胡兆军</p>
        <img src="../../assets/images/details/index35.jpg" alt="">
        <p class="txtIndent">在德兴苑做保安的唐先生，来穗已经有4年的时间，他的太太和11岁的儿子目前在罗定生活，和家人分居两地。获得“夫妻房”免费入住公寓酒店券以后，唐先生说，“很开心有了更多家庭团聚的机会，在广州也能感受到家的温暖，等儿子放暑假的时候邀请他们到广州，有一个好一点的地方住，玩得更开心。”</p>
        <p>来穗儿童：“小候鸟”乐园让小候鸟们尽情放飞自己</p>
        <p class="txtIndent">随着暑假的到来，不少留守儿童已经成为“小候鸟”，正在奔赴广州的路上。然而，当他们来到广州之后，不少来穗人员想带孩子们到广州市众多的主题公园或乐园游玩，但由于路途远、门票价格高让很多来穗家庭却望而止步。</p>
        <img src="../../assets/images/details/index36.jpg" alt="">
        <img src="../../assets/images/details/index37.jpg" alt="">
        <p class="txtIndent">为此，人民街来穗中心携手越秀区儿童公园，为辖内小候鸟提供免费游乐券。价值虽然不高，但是能够让小候鸟在越秀欢度假期，尽情放飞自己，是人民街来穗中心对来穗人员子女的关爱。</p>
        <p>来穗家庭：“希望”课堂给孩子有一个美好的未来</p>
        <p class="txtIndent">打造“希望”课堂，给孩子有一个美好的未来。在来穗人员家庭中，为了生计忙于工作的来穗人员容易忽略或者无法为孩子提供更好的教育。对此，人民街来穗中心获得广州市仁者教育培训中心的大力支持，培训中心将在每个学期的辅导班中提供三个学员名额，免费对人民街来穗务工困难家庭的子女进行精准辅导。</p>
        <img src="../../assets/images/details/index38.jpg" alt="">
        <p class="txtIndent">“我希望通过设立希望课堂，让他们在良好学习习惯的养成、健康人格的培育、学习水平的提高等综合能力得到提升。努力学习让知识改变命运，在未来的日子里能够为家庭、为父母撑起一片蓝天，让他们看到未来的希望”。——广州市仁者教育培训中心唐秀珍女士</p>
        <p>来穗家庭：“星愿”空间一次次欢聚、放松身心的机会</p>
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
