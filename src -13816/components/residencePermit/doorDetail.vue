<template>
  <div class="container">
    <div class="doorDetail">
      <div class="detailTitle">预约信息</div>
      <div class="detailCon">
        <div class="conInfor">
          <div class="span1">预约号：</div>
          <div class="span2">{{ldryYwDetail.yyh}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">当前状态：</div>
          <div class="span2">{{ldryYwDetail.zt_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">提交时间：</div>
          <div class="span2">{{ldryYwDetail.cjsj}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">办理单位：</div>
          <div class="span2">{{ldryYwDetail.jz}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">单位电话：</div>
          <div class="span2">{{ldryYwDetail.jzdh}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">单位地址：</div>
          <div class="span2">{{ldryYwDetail.jzdz}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">上门核查时间：</div>
          <div class="span2">{{ldryYwDetail.smhcsj}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">居住地址：</div>
          <div class="span2">广州市{{ldryYwDetail.lsryJzdz}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">姓名：</div>
          <div class="span2">{{ldryYwDetail.xm}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">性别：</div>
          <div class="span2">{{ldryYwDetail.xb_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">身份证号：</div>
          <div class="span2">{{ldryYwDetail.zjhm}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">户籍地址：</div>
          <div class="span2">{{ldryYwDetail.hjxz}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">民族：</div>
          <div class="span2">{{ldryYwDetail.mz_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">出生日期：</div>
          <div class="span2">{{ldryYwDetail.csrq}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">户口类型：</div>
          <div class="span2">{{ldryYwDetail.hkszdlx_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">职业：</div>
          <div class="span2">{{ldryYwDetail.zy_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">联系方式：</div>
          <div class="span2">{{ldryYwDetail.lxdh}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">工作单位：</div>
          <div class="span2">{{ldryYwDetail.dwmc}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">单位地址：</div>
          <div class="span2">{{ldryYwDetail.dwdz}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">居住方式：</div>
          <div class="span2">{{ldryYwDetail.jzfs_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">居住事由：</div>
          <div class="span2">{{ldryYwDetail.zzsy_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">文化程度：</div>
          <div class="span2">{{ldryYwDetail.whcd_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">政治面貌：</div>
          <div class="span2">{{ldryYwDetail.zzmm_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">来本市日期：</div>
          <div class="span2">{{ldryYwDetail.lbsrq}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">是否承租人：</div>
          <div class="span2">{{ldryYwDetail.sfczr == '0' ? '否' : '是'}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">房屋类型：</div>
          <div class="span2">{{ldryYwDetail.fwlx_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">婚姻状况：</div>
          <div class="span2">{{ldryYwDetail.hyzk_dict}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">配偶姓名：</div>
          <div class="span2">{{ldryYwDetail.poxm}}</div>
        </div>
        <div class="conInfor">
          <div class="span1">配偶身份证：</div>
          <div class="span2">{{ldryYwDetail.posfzhm}}</div>
        </div>
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
        ldryYwDetail:{}
      };
    },
    methods: {
      queryLdryYwDetail(){ //查询预约窗口办理详情
        let jsonStr = {
          id:this.$route.params.id,
          openid:this.$Utils.getLocalStorage("openId"),
          opentype:'1',
          wxsqn:this.$Utils.getLocalStorage("openId")
        }
        this.$store.commit('UPDATE_LOADING', true);
        api.tunansendPost({
          paramJson: JSON.stringify(jsonStr),
          url:'http://121.8.227.39/lsweix/api/wechatApi/queryLdryYwDetail'
        }).then((res) => {
          this.$store.commit('UPDATE_LOADING', false);
          if (res.data.ackCode == 1) {
            this.ldryYwDetail = res.data.data
          } else {
            this.$store.commit('SHOWTOAST', res.data.errorMessage);
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
      this.queryLdryYwDetail();
    },
    created() {

    },
    destroyed(){

    }
  };
</script>
<style lang="less" scoped>
  .doorDetail{margin:.3rem .3rem;background:#fff;}
  .detailTitle{background:#0091ff;color:#fff;line-height:.90rem;text-align:center;font-size:.36rem;}
  .detailCon{padding:.3rem;}
  .detailCon .conInfor{margin-bottom:.2rem;overflow:hidden;}
  .detailCon .conInfor>div{float:left;}
  .detailCon .conInfor .span1{text-align:right;width:2.3rem;display: inline-block;}
  .detailCon .conInfor .span2{width:4rem;}
  .detailOther{padding:.3rem;border-top:1px dashed #ccc;border-bottom:1px dashed #ccc;}
</style>
