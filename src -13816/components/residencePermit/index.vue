<template>
  <div>
     <!--{{'3有没有openid'+this.openId}}-->
    <!--{{'4有没有openid'+this.$Utils.getLocalStorage("openId")}}-->
    <!--{{'3有没有getmyopenid'+this.$route.query.getmyopenid}}-->
    <!--{{this.idCard}}-->
    <!--{{'3有没有name'+this.$Utils.getLocalStorage("authInfo").name}}-->

  <div class="section_top">
    <div class="card_cont">
      <div class="card_header">
        <div class="card_title">居住证</div>
      </div>
      <div class="card_info_cont">
        <div class="item">
          <span>持卡人员：</span>
          <span class="xinghao">{{name2}}</span>
        </div>

        <div class="item">
          <span>状态：</span>
          <span v-if='hasCard=="1"'>未办理</span>
          <span v-else-if='hasCard=="2"'>已办理</span>
          <span v-else>已过期</span>
        </div>

        <div class="item">
          <span>证有效期：</span>
          <span class="xinghao">{{hasCard == '2' || hasCard == '3' ? date : '暂无数据'}}</span>
        </div>

        <div class="item">
          <span>居住地址：</span>
          <span class="xinghao">{{hasCard == '2' || hasCard == '3' ? address : '暂无数据'}}</span>
        </div>

      </div>
    </div>
  </div>
  <!-- 居住业务相关信息 -->
    <group style="margin-top: .3rem;background: #fff;">
      <cell title="居住登记预约上门" :link="`/doorStep1?openId=${this.openId}&name=${this.name}&idCard=${this.idCard}`" :is-link="true"></cell>
      <cell title="居住登记预约窗口办理" :link="`/bookTime1?openId=${this.openId}`" :is-link="true"></cell>
      <cell title="居住证申领预约" link="/apply" :is-link="true"></cell>
      <cell title="居住证签注预约" link="/renew" :is-link="true"></cell>
      <cell title="进度查询" link="/progress" :is-link="true"></cell>
    </group>

  </div>
</template>
<script>
  import { Group, Cell } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils';
  import { mapState } from "vuex";
  export default{
        mixins: [mixins],
        components: {Group, Cell},
        data () {
            return {
              hasCard: '1',  // 1:未办理,2:已办理,3:已过期
              date: '', //有效日期
              address: '',  //地址
              xm:'',
              name2:''
            }
        },
        methods: {
          jzzCardInfo () { // 查询居住证信息
            api.jzzCardInfo({
              zjhm: this.$Utils.getLocalStorage("authInfo").idCard,
              xm: this.$Utils.getLocalStorage("authInfo").name,
              openid: this.$Utils.getLocalStorage("openId"),
            }).then((res) => {
              const data = JSON.parse(res.data.jsonRes[0]);
              this.isLoading = false;
              if (data.ackCode == 1 && Object.keys(data.data).length  > 0) {
                let endDate = new Date(data.data.jzzyxjzrq).getTime(); // 居住证有效期截止日期
                let currDate = Date.parse(new Date());  // 当前时间
                if ( endDate < currDate ) {
                  this.hasCard = '3';
                } else {
                  this.hasCard = '2';
                }
                this.date = data.data.jzzyxqsrq + ' ~ ' + data.data.jzzyxjzrq; //居住证有效期
                this.address = data.data.xzq_dict + data.data.jz_dict + data.data.jddm_dict;
              } else if(Object.keys(data.data).length == 0) {
                this.hasCard = '1';
              }else if(data.ackCode == 0){
                this.$store.commit('SHOWTOAST', '居住证查询失败');
              }
            }).catch((res) => {
              this.$store.commit('SHOWTOAST', '系统异常');
            });
          },
        },
    computed: {
      ...mapState([
        'idCard','openId','userId','name'
      ])
    },
    created () {
    },
      mounted () {
        this.$Utils.setLocalStorage('showBqian','111');
        this.jzzCardInfo();
        this.name2 = this.$Utils.getLocalStorage("authInfo").name;
        this.$store.commit('UPDATE_KEEP_ALIVE', '');  // 清空所有居住证相关组件的缓存
      }

    }
</script>
<style lang="less" scoped>
  .section_top{
    overflow: hidden;
  }
  .section_top{
    background: #fff;
    overflow: hidden;

  }
  .card_cont{
    width: 6.90rem;
    height:3.10rem;
    background: url(../../assets/images/residence_permit_bg.jpg);
    background-size: 6.90rem 3.10rem;
    margin:.31rem .30rem;
    color:#fff;
  }
  .card_header{
    width: 5.75rem;
    line-height: .90rem;
    overflow: hidden;
    margin-left: .90rem;
  }
  .card_cont .card_title{
    width: 1.98rem;
    font-size: .34rem;
    float:left;
  }
  .card_cont .card_eye{
    width: .36rem;
    height:.24rem;
    margin-top: .32rem;
    float:left;
  }
  .card_cont .add_card{
    width: .42rem;
    height:.27rem;
    margin-top: .32rem;
    float:right;
  }

  .card_info_cont{
    width: 6rem;
    overflow: hidden;
    margin-left: .55rem;
  }
  .card_info_cont .item{
    width:100%;
    line-height: .44rem;
    display: flex;
  }
  .card_info_cont .item span:first-of-type{
    display: block;
    width: 1.5rem;
    /*flex: 2;*/
    font-size: .26rem;
    color: rgba(255, 255, 255, 0.5);
    margin-right: .15rem;
  }
  .card_info_cont .item span:last-of-type{
    flex: 5;
    font-size: .30rem;
    color: #fff;
  }

  .card_state{
    width:100%;
    padding-top: .20rem;
    overflow: hidden;
    display: flex;
  }
  .card_state .item{
    width: 50%;
    span-align: center;
  }
  .card_state .item:first-of-type .tips{
    font-size: .26rem;
    color: #b2b2b2;
  }
  .card_state .item:last-of-type .state{
    font-size: .34rem;
    color: #3389ff;
  }

  .card_state .item:first-of-type{
    border-right:1px solid #e6e6e6;
  }
  .card_state .item span:first-of-type{
    padding-bottom: .37rem;
  }
  .card_state .item span{
    display: block;
    font-size: .27rem;
    color: #353535;
  }
  .card_state .item span:first-of-type{margin: 0.05rem 0;}

  .pay_btn{
    width: 6.90rem;
    overflow: hidden;
    margin:.82rem .30rem 0 .30rem;
    font-size: .34rem;
    background-image: linear-gradient(#3389ff, #3389ff),
    linear-gradient(#3389ff, #3389ff);
    border-radius: .10rem;
  }

  .link_cont{
    margin-top:.17rem;
    border:none;
    a{
      display: block;
    }
  }

  .link_cont .freeState{
    width: .30rem;
    height:.30rem;
    margin-right: .16rem;
  }
  .btn{
    width: .690rem;
    height: .94rem;
    span-align: center;
    line-height: .94rem;
    overflow: hidden;
    font-size: .34rem;
    border-radius: .10rem;
    margin:0 auto;
  }
  .btn.empower{
    margin: .82rem auto .30rem auto;
    background-image: linear-gradient(#258bfa, #258bfa),
    linear-gradient(#258bfa, #258bfa);
  }
  .nocard{
    background: #ddd;
    border: none;
  }
  .btn.give_up{
    background-color: #ffffff;
    border: solid 0.01rem #258bfa;
    color: #258bfa;
  }
  .disabled{
    margin-bottom:.25rem;
  }
  .xinghao{
    line-height: .46rem;
  }
</style>
