<template>
  <div>
    <div class="box_top" v-if="!isLoading">
      <div class="res_top">
        <span>查询结果</span>
        <span :class="['restext',can == true ? 'bluecolor':'redcolor']">{{can ? '满足办证条件' : '不满足办证条件'}}</span>
      </div>
      <div class="userinfo">
        <div class="msg">
          <div class="title">姓名:</div>
          <div class="info">{{desensitization(myname,1)}}</div>
        </div>
        <div class="msg">
          <div class="title">身份证号:</div>
          <div class="info">{{desensitization(myidcard,2)}}</div>
        </div>
        <div class="msg" v-if="laiSuiData.jwh_dict">
          <div class="title">登记社区:</div>
          <div class="info">{{laiSuiData.jwh_dict}}</div>
        </div>
        <template v-if="!can">
          <div class="msg" v-if="laiSuiData.lxdjts">
            <div class="title">登记天数:</div>
            <div class="info">{{laiSuiData.lxdjts}}天</div>
          </div>
          <div class="msg" v-if="laiSuiData.bzxddts">
            <div class="title">等待天数:</div>
            <div class="info">{{laiSuiData.bzxddts}}天</div>
          </div>
          <div class="msg" v-if="errorMessage">
            <div class="title">提示信息:</div>
            <div class="info redcolor">{{errorMessage}}</div>
          </div>
        </template>
      </div>
    </div>

    <XButton  v-if="!isLoading" :disabled="!can" class="button_box" type="primary" @click.native="goNext">下一步</XButton>

    <div class="textinfo" v-if="!isLoading">
      <div>办证条件说明：</div>
      <div>1、如果已更换居住地，请先进行居住登记，登记成功后，再申请办理居住证。</div>
      <div>2、办理居住证需要准备身份证复印件和合法稳定就业、合法稳定住所、连续就读证明材料之一。</div>
      <div>备注：</div>
      <div>如果已更换居住地，请先<span class="jjdj" onTap="jzdengji">变更居住登记地址</span>，变更成功后，再申领预约办理居住证
    </div>
    </div>
  </div>
</template>
<script>
  import { Group, Cell, XButton, Icon  } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  export default{
      name: 'applySearch',
      mixins: [mixins],
      components: { Group, Cell, XButton, Icon  },
      data () {
          return {
            params: this.$Utils.getLocalStorage('/apply'),
            laiSuiData: {},  // 来穗人员信息
            can: '',  //  是否满足办证条件
            errorMessage: '', //提示信息
            isLoading: true,
            myname:'',
            myidcard:''
          }
      },
      methods: {
        setTitle(slyy) {  // 设置标题
          if (slyy > 3) {
            this.$route.meta.title = '居住证签注';
          } else {
            this.$route.meta.title = '居住证申领';
          }
        },
        laisuiQueryLdryDetail() { // 查询单个来穗人员的登记信息
          api.laisuiQueryLdryDetail({
            openid: this.$Utils.getLocalStorage("openId"),
            zjhm: this.$Utils.getLocalStorage("authInfo").idCard,
            xm: this.$Utils.getLocalStorage("authInfo").name
          }).then((res) => {
            const data = JSON.parse(res.data.jsonRes[0]);
            this.isLoading = false;
            if (data.ackCode == '1') {
              if (!data.data && typeof (data.data) != "undefined" && data.data != 0) {//不满足办证条件 data=null
                this.can = false;
                this.errorMessage = '您还没有居住证';
              } else {
                this.can = false;
                this.laiSuiData = data.data;
                // 是否登记天数满183天
                if (Number(data.data.lxdjts) >= 183) {
                  this.queryJzzCheck();
                } else {
                  this.errorMessage = '您的居住登记的信息还未满180天';
                }
              }
            } else {
              this.$store.commit('SHOWTOAST', res.errorMessage);
            }
          }).catch((res) => {
            this.isLoading = false;
          });
        },
        queryJzzCheck() { // 判断是否满足办证条件
          api.queryJzzCheck({
            openid: this.$Utils.getLocalStorage("openId"),
            zjhm: this.myidcard,
            xm: this.myname,
            fhid: this.laiSuiData.fhid,
            sljb: this.params.sljb,
            slyy: this.params.slyy
          }).then((res) => {
            const data = JSON.parse(res.data.jsonRes[0]);
            console.log('判断是否满足办证条件', data)
            if (data.ackCode == 1 && data.message != ''){
              this.can = false;
              this.errorMessage = data.errorMessage;
            }else if (data.ackCode == 1) {  // 满足办证条件
              this.can = true;
              this.jzzid = data.data.id;
              this.jzzCardInfo();
            } else {
              this.can = false;
              this.errorMessage = data.errorMessage;
            }
          })
        },
        jzzCardInfo () { // 查询居住证信息
          api.jzzCardInfo({
            zjhm: this.$Utils.getLocalStorage("authInfo").idCard,
            xm: this.$Utils.getLocalStorage("authInfo").name,
            openid: this.$Utils.getLocalStorage("openId")
          }).then((res) => {
            const data = JSON.parse(res.data.jsonRes[0]);
            console.log('查询居住证信息', data);
            this.isLoading = false;
            if (data.ackCode == 1 && Object.keys(data.data).length  > 0) {
              let endDate = new Date(data.data.jzzyxjzrq).getTime();  // 居住证有效期
              let currDate = Date.parse(new Date());  // 当前时间
              if ( endDate < currDate ) {
                this.can = true;
                this.errorMessage = '';
              } else {
                this.can = false;
                this.errorMessage = '您的居住证还在有效期内';
              }
              this.laiSuiData = data.data;
            } else {
              this.can = false;
              this.errorMessage = '您还没有居住证';
            }
          }).catch((res) => {
            this.isLoading = false;
          });
        },
        goNext() {  //  下一步
          this.$router.push({ path: '/appointmentStreet'});
          this.$Utils.setLocalStorage('/applySearch', Object.assign(this.params, this.laiSuiData));
        },
      },
      activated () {
        this.$store.commit('UPDATE_KEEP_ALIVE', -1); // 清除上一个页面的缓存
      },
      mounted () {
        this.$store.commit('UPDATE_KEEP_ALIVE', 'applySearch');  // 缓存此组件
        this.myname = this.$Utils.getLocalStorage("authInfo").name;
        this.myidcard = this.$Utils.getLocalStorage("authInfo").idCard;
      },
      created () {
        this.laisuiQueryLdryDetail();
//        if (this.params.sljb == 1) {
//          this.laisuiQueryLdryDetail();
//        } else {
//          this.jzzCardInfo();
//        }
        this.setTitle(this.params.slyy);
      }

    }
</script>
<style lang="less" scoped>
  .box_top{
    width: 6.90rem;
    height: auto;
    background: #fff;
    border:0.01rem solid  #ccc;
    margin: .30rem .28rem;
    overflow:hidden;
  }
  .res_top{
    height: .88rem;
    border-bottom: 0.01rem solid #ccc;
    line-height: .88rem;
    font-size: .28rem;
    padding: 0 .20rem;
    box-sizing:border-box;
  }
  .restext{
    float: right;
  }

  .userinfo{
    padding: .30rem .20rem;
    box-sizing: border-box;
  }
  .msg{
    display: flex;
    margin: .14rem 0;
  }
  .title,.info{
    font-size: .28rem;
    flex: 1;
    color: #888
  }
  .info{
    color: #000;
    text-align: right;
  }
  .textinfo{
    padding: 0 .30rem;
    box-sizing: border-box;
    margin: .46rem 0 0 0;
    font-size: .26rem;
    color: #888;
    line-height: .40rem;
    text-align: justify;
  }
  .textinfo:after {
    display: inline-block;
    width: 100%;
    content: '';
  }
  .jjdj{
    color: #3389ff;
    text-decoration: underline;
  }
  .hide{
    display: none;
  }
  .show{
    display: block;
  }
  .redcolor{
    color: #f4333c;
  }
  .bluecolor{
    color: #3389ff;
  }
</style>
