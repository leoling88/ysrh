<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">沿着习总书记指引的道路 第四届越秀文化发展咨询委员会扬帆起航</div>
      <group class="new_info">
        <cell title="越秀区文学艺术界联合会">
          <span slot="inline-desc" class="dzTime">
            <span>2018-8-2</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <img src="../../assets/images/details/lubo31.jpg" alt="">
        <img src="../../assets/images/details/lubo32.jpg" alt="">
        <p class="txtIndent">10月31日下午，“第四届广州市越秀文化发展咨询委员会聘任仪式暨文化发展咨询座谈会”在越秀区政府大楼二楼多功能会议厅举行。越秀区四套班子领导王焕清、苏佩、黄仰辉、钟俊鸣出席了会议。区委办、区政府办等17个相关职能部门主要负责人参加了会议。</p>
        <p class="txtIndent">会议由郭环常委主持。李世通副书记代表区委、区政府宣读了聘任决定。区领导向第四届广州市越秀文化发展咨询委员会委员、名誉委员颁发了聘书。</p>
        <p class="txtIndent">咨询委员会办公室秘书长、区文联主席莫振山代表咨询委员会办公室向大会汇报了第三届咨询委员会工作情况。三年来，咨询委员会共举办4次座谈、2次讲座，完成3项调研项目，推出越秀文化系列丛书2本，征询意见建议超过100条。</p>
        <p class="txtIndent">新一届咨询委员会共聘任20位咨询委员和11位名誉委员，委员有（以姓氏笔划为序）门德来、叶春生、汤国华、许钦松、许鸿飞、李江帆、李志坚、李明华、陈玉环、陈泽泓、陈春声、金城、赵健、顾涧清、倪惠英、郭谦、黄淼章、龚伯洪、梁桂全、董帜强，名誉委员有（以姓氏笔划为序）方土、方治齐、方锦龙、卢延光、冯丹峰、李权时、李醒韬、连登、岑桑、张磊、陈中秋共11名，聘期为三年。他们分别是文化、艺术、经济、文史、设计、文化产业、社会科学研究、城市规划等方面的专家学者。</p>
        <p class="txtIndent">会上，越秀区领导与咨询委员会的专家们围绕贯彻落实习近平总书记视察广东重要讲话精神，结合越秀推进文化强区建设，加强广州历史文化的保护利用，不断增强国家中心城市核心区的文化辐射力和影响力，让城市留下记忆，让人们记住乡愁的主题开展研讨。</p>
        <p class="txtIndent">专家们表示，文化传承是此次习近平总书记在广东考察的重要内容之一，越秀区作为广州古代近现代城市中轴线的所在地，在历史、文化、商贸、宗教、建筑等方面具有鲜明的特点，结合越秀实际，突出地方特色，注重文明传承，就要把传统和现代的价值挖掘出来，利用越秀有大量文化产业人才，重点发展文化产业核心层，结合习总书记提出的“城市规划和建设要高度重视历史文化保护，不急功近利，不大拆大建”的指示，越秀区可以在各历史文物建筑周边，用好政策杠杆，用好旧建筑，千方百计地打造青年人群喜爱的茶吧、啡吧、小书店、小吃、小潮品等的“文化休闲复合业态群落”……会上，苏佩区长等区领导积极与专家互动，气氛热烈。</p>
        <p class="txtIndent">苏区认为，这个会开得非常及时，贯彻落实习近平总书记视察广东重要讲话精神，我们是行动最迅速，层次最高的文化界的座谈会。她非常感谢专家们的建言，也希望专家们能带着他们的工作室、他们的文化项目落户越秀，为加快建设广州“中央文化商务区、创新发展先行区、品质城市示范区”，推动越秀经济、社会、文化发展发挥更大作用。</p>
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
