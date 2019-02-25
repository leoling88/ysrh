<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">不管你来自何方，都可以在越秀一展才华！ | 2018年金雁文化艺术决赛</div>
      <group class="new_info">
        <cell title="越秀区来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-11-13</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p class="txtIndent">哈尔滨、河南、安徽……博士生、上班族、老师…… 二十多、三十多、四十多岁……他们来自五湖四海，从事着各种行业，有着不同的年龄，因为对文化艺术的喜爱，在金雁舞台上相遇。</p>
        <img src="../../assets/images/details/lubo11.png" alt="">
        <p class="txtIndent">11月6日，由越秀区来穗局、文广新局、大东街道办事处主办，大东街文化站承办，越秀区音乐家协会、越秀区曲艺家协会协办的“金雁展风采·唱响新时代”2018年金雁文化艺术节在大东街文化站正式拉开帷幕。经过“金雁之声”歌手大赛与金雁综艺大赛两天的初赛选拔，28组选手从中脱颖而出，并在11月9日下午的决赛中进行最后角逐。</p>
        <img src="../../assets/images/details/lubo12.png" alt="">
        <img src="../../assets/images/details/lubo13.png" alt="">
        <img src="../../assets/images/details/lubo14.png" alt="">
        <img src="../../assets/images/details/lubo15.png" alt="">
        <img src="../../assets/images/details/lubo16.png" alt="">
        <img src="../../assets/images/details/lubo17.png" alt="">
        <img src="../../assets/images/details/lubo18.png" alt="">
        <p class="txtIndent">老家在哈尔滨的郝一锋现在是华南理工大学的一名博士生，这是他第一次参加“金雁之声”歌手大赛，在决赛中以一曲《贝加尔湖畔》收获了热烈的掌声。他告诉小e，自己小时候学过钢琴，但没受过专业声乐训练，唱歌纯属兴趣爱好，也是因为偶尔一次唱K，得到朋友的建议才开始去参加歌唱比赛，也因此打开了唱歌的圈子，并利用比赛提升歌唱技巧。“每比赛一次，技巧就更精进一点。”而对于生活了7、8年的广州，他认为这是一个包容的城市，基层群众文化也很繁荣。“在老家那边像这种区街级的比赛很少。”</p>
        <img src="../../assets/images/details/lubo19.png" alt="">
        <p class="txtIndent">来自安徽的李小庆是金雁文化艺术节的老面孔，决赛上单枪匹马上阵演绎了一段《拜师》。他告诉小e，家里祖辈、父辈、同辈都从事着跟黄梅戏相关的事业，所以自己也是自己从小就学习黄梅戏。</p>
        <p class="txtIndent">“黄梅戏是我国五大剧种之一，最大的特点就是通俗易懂，如果说京剧是美声，越剧是民歌，那么黄梅戏就是流行歌。”</p>
        <p class="txtIndent">虽然现在是一名普通的上班族，但李小庆自觉肩负传承黄梅戏的责任，近年来他上过了大大小小的舞台，不管是金雁还是央视，他都希望通过自己的努力，并借助这些平台让更多人听到黄梅戏，喜欢上黄梅戏，从而让黄梅戏得以传承下来。</p>
        <img src="../../assets/images/details/lubo20.png" alt="">
        <p class="txtIndent">作为一个基层文化艺术展示平台，金雁舞台汇聚了才华横溢的“金雁”们，也汇聚了强大的评委阵容，为了能够听到评委的针对性点评指导，参赛歌手们在比完赛后也不舍离去，一直等到了比赛全程结束。</p>
        <img src="../../assets/images/details/lubo21.png" alt="">
        <p>据了解，金雁文化艺术节颁奖典礼将于11月22日在小云雀剧场举行。此外，进入决赛的12强歌手将有机会获得专家的一对一指导，优秀歌手和优秀综艺节目亦将有机会选送至广府达人秀。</p>
        <img src="../../assets/images/details/lubo22.png" alt="">
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
