<template>
  <div class="container">
    <div class="bg_white newsBody">
      <div class="news_title">@来穗人员，越秀这些医院可以手机刷医保！详细操作方法</div>
      <group class="new_info">
        <cell title="越秀区来穗人员服务管理局">
          <span slot="inline-desc" class="dzTime">
            <span>2018-10-14</span>
          </span>
        </cell>
      </group>
      <div class="news_cont">
        <p>滴~刷医保！看病忘了带社保卡怎么办？不要慌！可以用手机刷医保！</p>
        <img src="../../assets/images/details/yuexiu31.jpg" alt="">
        <p class="txtIndent">目前，越秀区已有多家定点医疗机构上线医保互联网移动支付服务包括了基层医疗机构、专科医院快看看在不在你家附近！</p>
        <p><span class="redBlod">越秀区定点医疗机构名单</span></p>
        <p>广东省人民医院<br>
          地址：越秀区中山二路106号<br><br>
          广东省中医院<br>
          地址：越秀区大德路111号<br><br>
          广东省中医院二沙岛分院<br>
          地址：越秀区二沙岛大通路261号<br><br>
          中山大学中山眼科中心<br>
          地址：越秀区先烈南路54号<br><br>
          中山大学附属第一医院<br>
          地址：越秀区中山二路58号<br><br>
          中山大学肿瘤防治中心<br>
          地址：越秀区东风东路651号<br><br>
          广州市儿童医院<br>
          地址：越秀区人民中路318号<br><br>
          广州市妇婴医院<br>
          地址：越秀区人民中路402号<br><br>
          广东省中医院下塘门诊部<br>
          地址：越秀区麓景西路上塘街13巷9号</p>
        <img src="../../assets/images/details/yuexiu32.jpg" alt="">
        <p class="fw_b">可以使用第三方支付</p>
        <p>如果就医的医疗机构可通过微信公众号、支付宝生活号提供相关服务，那么参保人在支付医保个账的时候，除了可以选择通过银联通道进行结算，还能选择常用的微信或支付宝等第三方支付机构，完成医保统筹记账和医保个人账户余额支付。</p>
        <p class="fw_b">身份验证</p>
        <p>为了保障账户安全，参保人在首次使用时需根据APP或微信等页面指引完成实名认证及绑定社保卡等手续，在实名认证环节你除了可以选择通过验证本人的社保卡进行身份校验外，还能选择名下任一绑定了手机号码的关联社保卡服务银行账户（关联银行需为广州市光大银行、农业银行、广州银行、建设银行、工商银行、广发银行、中国银行、交通银行、招商银行、广州农商银行等10家社保卡服务银行）。
        </p>
        <img src="../../assets/images/details/yuexiu33.jpg" alt="">
        <p>接下来城乡居民医保权益单在线查询、医保业务办理提醒、线上门诊选点等
 便民功能将陆续为广大市民提供 一起期待吧~</p>
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
