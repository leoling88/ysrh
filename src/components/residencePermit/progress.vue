<template>
  <div class="container">
    <div>
      <!--预约窗口进度查询-->
      <div class="progress" v-if="professTypeOne.length">
        <div class="detailTitle">
          <span>预约窗口办理（居住登记）</span>
          <router-link to="/guide">业务指引</router-link>
        </div>
        <div class="detailOther c_commonRed">预约成功后，预约人因故不能按时履约的，请务必至少提前3小时取消预约，否则按违约处理，违约次数达到2次后，将无法进行下一次预约。</div>
        <div class="progress-con">
          <div v-for="item in professTypeOne" class="detailAll">
            <router-link :to="`/bookDetail/${item.id}`" class="detailCon">
              <div class="conInfor">
                <div class="span1">预约时间：</div>
                <div class="span2">{{item.rq}}   {{item.sj}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">预约地址：</div>
                <div class="span2">{{item.dz}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">当前状态：</div>
                <div class="span2 proColorred">{{item.czlx}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">联系电话：</div>
                <div class="span2">{{item.lxdh}}</div>
              </div>
            </router-link>
            <div v-if="item.czlx === '未处理'" class="cancelYy" @click="cancelYydj(item.id)">取消预约</div>
          </div>
        </div>
        <!--<div class="noData" v-if="!professTypeOne.length">暂无预约窗口办理</div>-->
      </div>
      <!--预约上门审核进度查询-->
      <div class="progress" v-if="professTypeSmsh.length">
        <div class="detailTitle">
          <span>预约上门审核（居住登记）</span>
          <router-link to="/guide">业务指引</router-link>
        </div>
        <div class="detailOther c_commonRed">预约成功后，预约人因故不能按时履约的，请务必至少提前3小时取消预约，否则按违约处理，违约次数达到2次后，将无法进行下一次预约。</div>
        <div class="progress-con">
          <div v-for="item in professTypeSmsh" class="detailAll">
            <router-link :to="`/doorDetail/${item.id}`" class="detailCon">
              <div class="conInfor">
                <div class="span1">姓名：</div>
                <div class="span2">{{item.xm}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">身份证号：</div>
                <div class="span2">{{item.zjhm}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">当前状态：</div>
                <div class="span2 proColorred">{{item.zt_dict}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">居住地址：</div>
                <div class="span2">广州市{{item.jz}}{{item.lsryJzdz}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">申请时间：</div>
                <div class="span2">{{item.cjsj}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">预约时间：</div>
                <div class="span2">{{item.smhcsj}}</div>
              </div>
            </router-link>
            <div v-if="item.zt_dict === '审核中'" class="cancelYy" @click="cancelGodoor(item.id)">取消预约</div>
          </div>
        </div>
        <!--<div class="noData" v-if="!professTypeSmsh.length">暂无预约上门审核</div>-->
      </div>
      <!--居住证申领预约进度查询-->
      <div class="progress" v-if="professTypeFour.length">
        <div class="detailTitle">
          <span>居住证申领预约</span>
        </div>
        <div class="detailOther c_commonRed">预约成功后，预约人因故不能按时履约的，请务必至少提前3小时取消预约，否则按违约处理，违约次数达到2次后，将无法进行下一次预约。</div>
        <div class="progress-con">
          <div v-for="item in professTypeFour" class="detailAll">
            <router-link :to="`/bookDetail/${item.id}`" class="detailCon">
              <div class="conInfor">
                <div class="span1">预约时间：</div>
                <div class="span2">{{item.rq}}   {{item.sj}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">预约地址：</div>
                <div class="span2">{{item.dz}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">当前状态：</div>
                <div class="span2 proColorred">{{item.czlx}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">联系电话：</div>
                <div class="span2">{{item.lxdh}}</div>
              </div>
            </router-link>
            <div v-if="item.czlx === '未处理'" class="cancelYy" @click="cancelYydj(item.id)">取消预约</div>
          </div>
        </div>
        <!--<div class="noData" v-if="!professTypeFour.length">暂无居住证申领预约</div>-->
      </div>
      <!--居住证签注预约进度查询-->
      <div class="progress" v-if="professTypeFive.length">
        <div class="detailTitle">
          <span>居住证签注预约</span>
        </div>
        <div class="detailOther c_commonRed">预约成功后，预约人因故不能按时履约的，请务必至少提前3小时取消预约，否则按违约处理，违约次数达到2次后，将无法进行下一次预约。</div>
        <div class="progress-con">
          <div v-for="item in professTypeFive" class="detailAll">
            <router-link :to="`/bookDetail/${item.id}`" class="detailCon">
              <div class="conInfor">
                <div class="span1">预约时间：</div>
                <div class="span2">{{item.rq}}   {{item.sj}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">预约地址：</div>
                <div class="span2">{{item.dz}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">当前状态：</div>
                <div class="span2 proColorred">{{item.czlx}}</div>
              </div>
              <div class="conInfor">
                <div class="span1">联系电话：</div>
                <div class="span2">{{item.lxdh}}</div>
              </div>
            </router-link>
            <div v-if="item.czlx === '未处理'" class="cancelYy" @click="cancelYydj(item.id)">取消预约</div>
          </div>
        </div>
        <!--<div class="noData" v-if="!professTypeFive.length">暂无居住证签注预约</div>-->
      </div>
    </div>
    <!--<div class="noData" v-if="getDatano">暂无居住证签注预约</div>-->
    <div class="noData" v-if="!professTypeOne.length && !professTypeSmsh.length && !professTypeFour.length && !professTypeFive.length">暂无居住证签注预约</div>
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
        professTypeOne:[],//窗口进度
        professTypeSmsh:[],//上门审核进度
        professTypeFour:[],//居住证申领预约
        professTypeFive:[],//居住证签注预约
        noDatack:true,
        noDatasm:true,
        getDatano:false,
      };
    },
    methods: {
      tunansendPost(){ //查询用户的预约信息
        let jsonStr = {
          openid:this.$Utils.getLocalStorage("openId"),
          opentype:'1',
          wxsqn:this.$Utils.getLocalStorage("openId")
        }
        api.tunansendPost({
          paramJson: JSON.stringify(jsonStr),
          url:'http://121.8.227.39/lsweix/api/wechatApi/queryMyRegist'
        }).then((res) => {
          const lists = res.data.dataList
          if (res.data.ackCode == 1) {
            if(res.data.dataList.length>0){
              this.noDatack = false
            }else{
              this.noDatack = true
            }
            for(var i = 0;i<lists.length;i++){
              if(lists[i].type == '1'){
                this.professTypeOne.push(lists[i])
              }else if(lists[i].type == '4'){
                this.professTypeFour.push(lists[i])
              }else if(lists[i].type == '5'){
                this.professTypeFive.push(lists[i])
              }
            }
          } else {
            this.noDatack = true
            this.$store.commit('SHOWTOAST', res.data.errorMessage);
          }
        });
      },
      queryLdryYw(){ //查询流动人员居住登记信息
        let jsonStr = {
          openid:this.$Utils.getLocalStorage("openId"),
          opentype:'1',
          wxsqn:this.$Utils.getLocalStorage("openId")
        }
        api.tunansendPost({
          paramJson: JSON.stringify(jsonStr),
          url:'http://121.8.227.39/lsweix/api/wechatApi/queryLdryYw'
        }).then((res) => {
          if (res.data.ackCode == 1) {
           this.professTypeSmsh = res.data.dataList
            if(res.data.dataList.length>0){
             this.noDatasm=false;
            }else{
              this.noDatasm=true;
            }
          } else {
            this.noDatasm=true;
            this.$store.commit('SHOWTOAST', res.data.errorMessage);
          }
        });
      },
      cancelGodoor(val){ //取消上门核实预约
        let jsonStr = {
          openid:this.$Utils.getLocalStorage("openId"),
          opentype:'1',
          yyid:val
        }
        this.$store.commit('UPDATE_LOADING', true);
        api.tunansendPost({
          paramJson: JSON.stringify(jsonStr),
          url:'http://121.8.227.39/lsweix/api/wechatApi/cancelSmhsyy'
        }).then((res) => {
          this.$store.commit('UPDATE_LOADING', false);
          if (res.data.ackCode == 1) {
            this.$store.commit('SHOWTOAST', '已成功取消');
            this.queryLdryYw();
          } else {
            this.$store.commit('SHOWTOAST', res.data.errorMessage);
          }
        }).catch((res) => {
          this.$store.commit('UPDATE_LOADING', false);
          this.$store.commit('SHOWTOAST', '系统异常');
        });
      },
      cancelYydj(val){ //取消其他预约
        let jsonStr = {
          openid:this.$Utils.getLocalStorage("openId"),
          opentype:'1',
          yyid:val
        }
        this.$store.commit('UPDATE_LOADING', true);
        api.tunansendPost({
          paramJson: JSON.stringify(jsonStr),
          url:'http://121.8.227.39/lsweix/api/wechatApi/cancelYydj'
        }).then((res) => {
          this.$store.commit('UPDATE_LOADING', false);
          if (res.data.ackCode == 1) {
            this.$store.commit('SHOWTOAST', '已成功取消');
            this.tunansendPost();
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
    watch:{
      getDatano(){
        if(!this.noDatasm && !this.noDatack){
          return true
        }
      }
    },
    mounted() {
      this.tunansendPost();
      this.queryLdryYw();
      console.log('33',this.getDatano)
    },
    created() {

    },
    destroyed(){

    }
  };
</script>
<style lang="less" scoped>
  .progress{margin-bottom:.3rem;}
  .progress-con{background:#fff;}
  .detailTitle{background:#0091ff;color:#fff;line-height:.90rem;font-size:.34rem;padding:0 .3rem;}
  .detailTitle a{color:#fff;float:right;}
  .detailAll{position:relative;}
  .detailCon{padding:.3rem;display:block;border-bottom:1px solid #e6e6e6;}
  .cancelYy{position:absolute;left:5.7rem;top:1.5rem;width:1.5rem;line-height:.75rem;text-align:center;color:#fff;background:#0091ff;border-radius:.1rem;z-index:2;font-size:.28rem;}
  .detailCon .conInfor{margin-bottom:.2rem;overflow:hidden;}
  .detailCon .conInfor>div{float:left;}
  .detailCon .conInfor .span1{text-align:right;width:1.6rem;display: inline-block;color:#999;}
  .detailCon .conInfor .span2{width:3.8rem;color:#333;}
  .detailOther{padding:.3rem;border-bottom:1px dashed #ccc;text-indent:2em;font-weight:bold;}
  .noData{text-align:center;color:#999;margin-top:.3rem;}
  .detailCon .conInfor .proColorred{color:#e4393c;}
</style>
