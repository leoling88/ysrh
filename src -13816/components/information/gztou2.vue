<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">广州公租房摇号分配结果公布！快看有你没？</div>
      <group class="new_info">
        <cell title="广州市住房和城乡建设委员会">
          <span slot="inline-desc" class="dzTime">
            <span>2018-8-16</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p>广州市2018年来穗务工人员公共租赁住房摇号配租结果公布啦！</p>
        <p><span class="redBlod">769户来穗务工人员获配租公租房！</span></p>
        <img src="../../assets/images/details/gztou21.jpg" alt="">
        <p><span class="redBlod">1170户来穗务工人员参加摇号配租</span></p>
        <p>本次共有1511户来穗务工人员前往受理部门递交了公租房申请。市住房保障办、市来穗人员服务管理局于9月3日至22日在网站公示公租房申请审核通过名单，同时接受异议申诉。</p>
        <p class="txtIndent">公示期间，受理异议申诉68宗，经核查，对其中2户家庭的异议申诉不成立，对66户家庭的异议申诉成立。经公示及复核，最终参加摇号配租的家庭共1170户。</p>
        <p><span class="redBlod">769户来穗务工人员获得配公租房 </span></p>
        <p class="txtIndent">本次推出供应的公租房有17个房源点共1021套，本次来穗务工人员公租房分配按照家庭人口与户型对应原则、配租顺序原则、多房源点选择原则的先后顺序进行系统随机配房，经摇号，769户家庭获配公租房。</p>
        <p class="txtIndent">市住房保障办会同市来穗人员服务管理局自10月17日起，通过网站公告来穗务工人员摇号配租结果。<br>
          http://www.gzcc.gov.cn<br>
          http://lsj.gz.gov.cn<br>
          http://wsbs.gz.gov.cn/gz/gzf/index.jsp</p>

        <p><span class="blue009">温馨提示</span></p>
        <p>（一）获得配租的来穗务工人员家庭可于10月24至31日前往原递交公共租赁住房纸质申请资料的受理点领取签订租赁合同通知书，在通知规定的时间内签订租赁合同。租赁合同将明确公共租赁住房交付入住时间。</p>
        <p>（二）除不可抗力外，获得配租申请人未在规定时间内签订租赁合同的，视同放弃配租资格。</p>
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
