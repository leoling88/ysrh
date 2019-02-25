<template>
  <div class="container">
    <div class="guide">
      <div class="guideTitle">居住登记业务指引</div>
      <p>一、在广州市居住半年，符合有合法稳定就业、合法稳定住所、连续就读条件之一的来穗流动人口，可以依规定在居住地镇、街道流动人口服务管理机构申领居住证。 </p>
      <p>申办人需提交以下材料： </p>
      <p>①本人居民身份证。</p>
      <p>②本人相片（居住证相片回执），或者工作人员通过居民身份证读取芯片相片信息。 </p>
      <p>③居住登记回执（在旅馆业住宿已办理旅馆业住宿登记除外）。</p>
      <p>④提交居住地住址、就业、就读等证明材料之一。</p>
      <p class="c_commonRed">证明材料须准确表述居住证申办人的姓名、公民身份号码、在穗居住地址、在穗居住（或就业、就读）半年以上等方面的情况。 </p>
      <p>居住地住址证明包括：房屋租赁合同、房屋产权证明文件、购房合同或者房屋出租人、用人单位、就读学校、宾馆旅店出具的住宿证明等，或者屋主与借住人签订的借住手续证明。 </p>
      <p>就业证明包括：工商营业执照、劳动合同、用人单位出具的劳动关系证明或者其他能够证明有合法稳定就业的材料等。 </p>
      <p>就读证明包括：学生证、就读学校出具的其他能够证明连续就读的材料等。 </p>
      <p>二、在广州市范围内，有下列情形之一的，填写《广州市来穗流动人口居住登记/居住证申领表》，在“信息系统”办理居住登记后，即可申办居住证。 </p>
      <p>①在宾馆旅店等旅馆业住宿（或租赁式经营单位）的，凭宾馆旅馆出具的住宿证明能核定办证人住宿登记已满半年的，由旅馆业属地公安派出所通过旅馆业住宿登记系统进行核实，情况属实并盖章的。 </p>
      <p>②在学校就读的，凭学生证或就读学校出具的证明核定连续就读已满半年的。 </p>
      <p>③自购房的，凭《房地产权证》登记日期或购房合同签订日期核定已满半年的。 </p>
      <p>④持有效广州市人才绿卡的，一般不需办理居住证，但依申请可直接办理居住登记和居住证。</p>
    </div>
  </div>
</template>
<script>
  import { Group,XButton,Cell } from "vux";
  import api from "../../api/api.js";
  import mixins from '../../mixins/mixins.js';
  export default {
    mixins: [mixins],
    components: {Group,XButton,Cell},
    data() {
      return {
      };
    },
    methods: {
    },
    mounted() {
      document.body.style.backgroundColor = '#fff';
    },
    created() {

    },
    destroyed(){
      document.body.style.backgroundColor = '#f5f5f9';
    }
  };
</script>
<style lang="less" scoped>
  .guide{padding:.3rem;}
  .guideTitle{font-size:.32rem;font-weight:bold;text-indent:2em;}
  .guide p{font-size:.28rem;line-height:.56rem;text-indent:2em;}
</style>
