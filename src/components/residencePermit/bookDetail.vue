<template>
  <div class="container">
    <div class="doorDetail">
      <div class="detailTitle">预约信息</div>
      <div class="detailCon">
        <div class="conInfor">
          <div class="span1">预约号：</div>
          <div class="span2">{{myYyDetail.yyh}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">预约人：</div>
          <div class="span2">{{myYyDetail.xm}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">预约时间：</div>
          <div class="span2">{{myYyDetail.szrq}}  {{myYyDetail.kssj}}-{{myYyDetail.jssj}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">预约社区：</div>
          <div class="span2">{{myYyDetail.standName}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">预约状态：</div>
          <div class="span2">{{myYyDetail.czlx_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">单位地址：</div>
          <div class="span2">{{myYyDetail.standAddress}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">单位电话：</div>
          <div class="span2">{{myYyDetail.standPhone}}</div>
        </div>
      </div>
      <div class="detailOther c_commonRed">
        <p>证明材料：</p>
        <p>1.身份证明（有一项即可）</p>
        <p>a.身份证</p>
        <p>b.其他有效身份证明</p>
        <p>2.居住地址证明（有一项即可）</p>
        <p>a.房屋租赁合同</p>
        <p>b.房屋产权证</p>
        <p>c.购房合同</p>
        <p>d.用人单位/学校/房屋出租人出具的住宿证明</p>
        <p>e.借住手续证明</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { Group,XButton,Cell } from "vux";
  import api from "../../api/api.js";
  import { mapState } from "vuex";
  import mixins from '../../mixins/mixins.js';
  export default {
    mixins: [mixins],
    components: {Group,XButton,Cell},
    data() {
      return {
        myYyDetail:{},
      };
    },
    methods: {
      queryMyYyDetail(){ //查询预约窗口办理详情
        let jsonStr = {
          id:this.$route.params.id,
          openid:this.$Utils.getLocalStorage("openId"),
          opentype:'1',
          wxsqn:this.$Utils.getLocalStorage("openId")
        }
        this.$store.commit('UPDATE_LOADING', true);
        api.tunansendPost({
          paramJson: JSON.stringify(jsonStr),
          url:'http://121.8.227.39/lsweix/api/wechatApi/queryMyYyDetail'
        }).then((res) => {
          this.$store.commit('UPDATE_LOADING', false);
          if (res.data.ackCode == 1) {
            this.myYyDetail = res.data.data
          } else {
            this.$store.commit('SHOWTOAST', '系统异常');
          }
        }).catch((res) => {
          this.$store.commit('UPDATE_LOADING', false);
          this.$store.commit('SHOWTOAST', '系统异常');
        });
      },
    },
    computed: {
      ...mapState([
        'idCard','openId','userId','name'
      ])
    },
    mounted() {
      this.queryMyYyDetail();
      console.log('222',this.name)
    },
    created() {

    },
    destroyed(){

    }
  };
</script>
<style lang="less" scoped>
  .doorDetail{margin:.5rem .5rem;background:#fff;}
  .detailTitle{background:#0091ff;color:#fff;line-height:.90rem;text-align:center;font-size:.36rem;}
  .detailCon{padding:.3rem;}
  .detailCon .conInfor{margin-bottom:.2rem;overflow:hidden;}
  .detailCon .conInfor>div{float:left;}
  .detailCon .conInfor .span1{text-align:right;width:1.6rem;display: inline-block;}
  .detailCon .conInfor .span2{width:3.8rem;}
  .detailOther{padding:.3rem;border-top:1px dashed #ccc;border-bottom:1px dashed #ccc;}
</style>
