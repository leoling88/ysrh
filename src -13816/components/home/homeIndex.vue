<template>
  <div class="container">
    <!--{{'111'+getcert}}-->
    <!--{{'2222有没有openid'+this.openId}}-->
    <!--{{'3333有没有getmyopenid'+this.getmyopenid}}-->
    <!--{{'3有没有idCard'+this.idCard}}-->
    <!--{{'3有没有name'+this.name}}-->
    <div>
      <v-swiper :swiperLists="imgLists" :swinperView="swinper" @clickView="swiperLink"></v-swiper>
    </div>
    <div class="myCard bg_white">
      <div >
        <!-- v-if="isWeiJingAuth"-->
        <div class="myCard_img fl">
          <img :src="userWX.headPic" alt>
        </div>
        <div class="myCard_name fl" v-if="isWeiJingAuth">{{userWX.name}}</div>
        <div class="myCard_name fl" v-else>{{userWX.nickName}}</div>
      </div>
      <a
        :href="`${urls}#/login?openId=`+openId"
        class="fs34 fr c_blue myCard_but"
        v-if="!isWeiJingAuth"
      >请登录</a>
    </div>
    <div ref="linkBar" class="link_bar_cont fixed_Box" v-if="isWeiJingAuth">
      <router-link
        :to="`/residencePermit?openId=${this.openId}&idCard=${this.idCard}&name=${this.name}`"
      >
        <img src="../../assets/images/juzz.png">居住证
      </router-link>
      <router-link :to="`/social/${this.idCard}`">
        <img src="../../assets/images/sheb.png">社保
      </router-link>
      <router-link to="/hund/login">
        <img src="../../assets/images/gongjj.png">公积金
      </router-link>
      <a href="javascript:void(0);" @click="warning"><img src="../../assets/images/jifenfw.png">积分服务</a>
<!--       <router-link to="/IntegralService">
        <img src="../../assets/images/jifenfw.png">积分服务
      </router-link> -->
    </div>

    <div ref="linkBar" class="link_bar_cont fixed_Box" v-else-if="!isWeiJingAuth">
      <a :href="`${urls}#/login?openId=`+openId">
        <img src="../../assets/images/juzz.png">居住证
      </a>
      <a :href="`${urls}#/login?openId=`+openId">
        <img src="../../assets/images/sheb.png">社保
      </a>
      <a :href="`${urls}#/login?openId=`+openId">
        <img src="../../assets/images/gongjj.png">公积金
      </a>
      <a href="javascript:void(0);" @click="warning"><img src="../../assets/images/jifenfw.png">积分服务</a>
<!--       <a :href="`${urls}#/login?openId=`+openId">
        <img src="../../assets/images/jifenfw.png">积分服务
      </a> -->
    </div>
    <div class="model">
      <div class="modelTitle">
      <router-link :to="{path:'../information?openId='+ openId}">
        <cell title="越秀融合" value="根据你的关注为你推荐" link="/information/index">
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/indicon/yxrh.png" alt>
          </span>
        </cell>
      </router-link>
      </div>
      <div class="indexNews" v-for="item in indexNews">
        <div class="news">
          <router-link :to="{path:'../article?openId='+ openId +'&id='+ item.id}">
            <div class="newsCon">
              <div class="newsTitle">
                <span
                  class="newsTitle_icon"
                  v-if="item.labelName"
                  :style="{'background':item.color}"
                >{{item.labelName}}</span>
                {{item.title}}
              </div>
              <div class="newsTime">{{item.sourceName}} {{item.updateTime | ellipsis}}</div>
            </div>
            <div class="newsImg">
              <img :src="item.headUrl">
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="model">
      <div class="modelTitle" >
        <cell title="融合服务" value="提供3项服务" :is-link="true"  @click.native="gotoList('1')">
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/indicon/rhfw.png" alt>
          </span>
        </cell>
      </div>
      <ul class="modelList">
        <li @click="linshiClick('rh01')">融合学堂</li>
        <li @click="linshiClick('rh02')">融合活动</li>
        <li @click="linshiClick('dj01')">党建活动</li>
        <!--         <li><a href="javascript:;" @click="linshiClick(3)">活动报名</a></li>
        -->
      </ul>
    </div>
    <!--
    <div class="model">
      <div class="modelTitle" v-if="isWeiJingAuth">
        <cell title="社区服务" value="提供4项服务" :is-link="true">
          <span slot="icon" class="xinpIcon"><img src="../../assets/images/indicon/sqfw.png" alt=""></span>
        </cell>
      </div>

      <div class="modelTitle" v-else-if="!isWeiJingAuth">
        <a :href="`${urls}#/login`">
        <cell title="社区服务" value="提供4项服务" :is-link="false">
          <span slot="icon" class="xinpIcon"><img src="../../assets/images/indicon/sqfw.png" alt=""></span>
        </cell>
        </a>
      </div>
      <ul class="modelList">
        <li><a href="javascript:;" @click="linshiClick(4)">门禁卡开卡</a></li>
        <li><a href="javascript:;" @click="linshiClick(5)">门禁卡续费</a></li>
        <li><a href="javascript:;" @click="linshiClick(6)">门禁卡管理</a></li>
        <li><a href="javascript:;" @click="linshiClick(21)">房屋租赁备案</a></li>
      </ul>
    </div>
    -->
    <div class="model">
      <div class="modelTitle">
        <cell title="事件随手拍" value="提供6项服务" :is-link="true" @click.native="gotoList('2')">
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/indicon/sjssp.png" alt>
          </span>
        </cell>
      </div>
      <ul class="modelList">
        <!--1:安全隐患 ;2: 社区事件; 3:可疑人员;4:社区报警:5:社区环境;6:门禁报修;7:问题答疑;8:意见收集;9:结果反馈-->
        <li @click="clickSuiShouPai('社区环境')">社区环境</li>
        <li @click="clickSuiShouPai('安全隐患')">安全隐患</li>
        <li @click="clickSuiShouPai('社区事件')">社区事件</li>
        <li @click="clickSuiShouPai('社区报警')">社区报警</li>

      </ul>
    </div>
    <div class="model">
      <div class="modelTitle">
        <cell title="居住业务" value="提供2项服务" :is-link="true"  @click.native="gotoList('3')">
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/indicon/jzyw.png" alt>
          </span>
        </cell>
      </div>
      <ul class="modelList">
        <li v-if="isWeiJingAuth">
          <router-link
        :to="`/residencePermit?getmyopenid=${this.openId}&idCard=${this.idCard}&name=${this.name}`"
      >居住证</router-link>
        </li>
        <li v-else-if="!isWeiJingAuth">
          <a :href="`${urls}#/login?openId=`+openId">居住证</a>
        </li>
        <li>
          <div @click="jumpLeasingContract">房屋租赁备案</div>
        </li>
        <!--         <li><a href="javascript:;" @click="linshiClick(22)">积分自评计算器</a></li>
        -->
      </ul>
    </div>
    <div class="model">
      <div class="modelTitle">
        <cell title="社保" value="提供2项服务" :is-link="true"  @click.native="gotoList('4')">
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/indicon/sb.png" alt>
          </span>
        </cell>
      </div>
      <ul class="modelList">
        <li @click="linshiClick('sb01')">缴费状态</li>
        <li @click="linshiClick('sb02')">缴费明细</li>

      </ul>
    </div>
    <div class="model mb200">
      <div class="modelTitle">
<!--         <router-link to="/hund/login">
 -->          <cell title="公积金" value="提供2项服务" :is-link="true"  @click.native="gotoList('5')">
            <span slot="icon" class="xinpIcon">
              <img src="../../assets/images/indicon/gjj.png" alt>
            </span>
          </cell>
<!--         </router-link>
 -->      </div>
      <!--<div class="modelTitle" v-else-if="!isWeiJingAuth">-->
        <!--<a :href="`${urls}#/login?openId=`+openId">-->
          <!--<cell title="公积金" value="提供2项服务" :is-link="false">-->
            <!--<span slot="icon" class="xinpIcon">-->
              <!--<img src="../../assets/images/indicon/gjj.png" alt>-->
            <!--</span>-->
          <!--</cell>-->
        <!--</a>-->
      <!--</div>-->
      <ul class="modelList">
        <li @click="marktag(51)">
          <router-link to="/hund/login">缴费状态</router-link>
        </li>
        <li @click="marktag(52)">
          <router-link to="/hund/login">缴费明细</router-link>
        </li>
        <!--
        <li><a href="javascript:;">还款计划查询</a></li>
        <li><a href="javascript:;">公积金提取申请</a></li>
        <li><a href="javascript:;">贷款还款明细</a></li>
        -->
      </ul>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Swiper } from "vux";
import baseUrl from "../../api/config";
import api from "../../api/api";
import { mapState } from "vuex";
import mixins from "../../mixins/mixins.js";
import utils from "../../script/utils";
import swipers from "@/components/common/swiper";

export default {
  components: { Group, Cell, "v-swiper": swipers },
  mixins: [mixins],

  data() {
    return {
      // openId: this.$route.query.openId,
      // idCard: this.$route.query.idNum,
      // name: this.$route.query.name,
      indexNews: [],
      isWeiJingAuth: false,
      myisWeiJingAuth:'',
      getmyopenid: "",
      getcert: "",
      urls: "",
      userWX: {}, //微信用户信息
      swinper: {
        //轮播
        left: 0,
        width: "",
        ulWidth: "",
        length: "",
        page: "",
        title: "",
        titleShow: false,
        about: "",
        aboutShow: true,
        hover: "",
        viewX: document.body.clientWidth,
        pageX: 0.17,
        clickValue: ""
      },
      imgLists: []
    };
  },
  computed: {
    ...mapState([
      'idCard','openId','userId','name'
    ])
  },
  mounted() {
    this.requireSwiper();
    this.queryNewsDatas();
    const _this = this;
    window.onresize = function temp() {
      _this.swinper.viewX = document.body.clientWidth;
      console.log("父组件发生变化===>" + _this.swinper.viewX);
    };
  },
  methods: {
    warning(){
      return this.$store.commit("SHOWTOAST", '服务暂未开通');
    },
    gotoList(index){
//      if (this.checkLogin()) {
//        this.$router.push({ path: "/morelist/" + this.openId + "/?listStyle=" + index});
//      }
        this.$router.push({ path: "/morelist/" + this.openId + "/?listStyle=" + index + '&myisWeiJingAuth='+this.myisWeiJingAuth});
    },
    jumpLeasingContract() {
      if (this.checkLogin()) {
        this.getsaveUserBehaviourTitle(this.openId, 34); //房屋备案
        this.$router.push({ path: "/leasingContract?openId=" + this.openId });
      }
    },
    checkLogin() {
      if (!this.isWeiJingAuth) {
        this.$router.push({ path: "/login?openId=" + this.openId });
      } else {
        return true;
      }
    },
    clickSuiShouPai(index) {
      if (this.checkLogin()) {
        this.$router.push({ path: "/suishoupai/" + this.openId + "/" + index });
        if (index == 5) {
          //社区环境
          this.getsaveUserBehaviourTitle(this.openId, 21); //社区环境
        } else if (index == 1) {
          this.getsaveUserBehaviourTitle(this.openId, 22); //安全隐患
        } else if (index == 2) {
          this.getsaveUserBehaviourTitle(this.openId, 23); //社区事件
        } else if (index == 4) {
          this.getsaveUserBehaviourTitle(this.openId, 24); //社区报警
        }
      }
    },
    linshiClick(comId) {
      //点栏目点击
      if (!this.isWeiJingAuth) {
        this.$router.push({ path: "/login?openId=" + this.openId });
      } else {
        if (comId === "rh01") {
          this.getsaveUserBehaviourTitle(this.openId, 11); //融合学堂
          this.$router.push({
            path: "/ronghexuetang/" + this.openId + "/rh01"
          });
        } else if (comId === "rh02") {
          this.getsaveUserBehaviourTitle(this.openId, 12); //融合活动
          this.$router.push({
            path: "/ronghehuodong/" + this.openId + "/rh02"
          });
        } else if (comId === "dj01") {
          this.getsaveUserBehaviourTitle(this.openId, 13); //党建活动
          this.$router.push({ path: "/dangjian/" + this.openId + "/dj01" });
        } else if (comId === "ssp01")
          this.$router.push({ path: "/suishoupai/" + this.openId + "/ssp01" });
        // else if(comId === 'ssp02')  this.$router.push({path:'/suishoupai/'+ this.openId +'/1'})
        else if (comId === "ssp03")
          this.$router.push({ path: "/suishoupai/" + this.openId + "/ssp03" });
        else if (comId === "ssp04")
          this.$router.push({ path: "/suishoupai/" + this.openId + "/ssp04" });
        else if (comId === "sb01") {
          if (this.idCard) {
            this.getsaveUserBehaviourTitle(this.openId, 41); //缴费状态
            this.$router.push({ path: "/paymentdetails/" + this.idCard });
          }
        } else if (comId === "sb02") {
          if (this.idCard) {
            this.getsaveUserBehaviourTitle(this.openId, 42); //缴费状态
            this.$router.push({ path: "/paymentstatus/" + this.idCard });
          }
        }
      }
    },
    requireWXUser() {
      //获取微信用户信息
      if (this.openId) {
        api.getWXdUser({
            openId: this.openId
          }).then(res => {
            const _data = res.data.wxUsers[0];
            if (res.data.success) {
              this.userWX = _data;
              // this.isWeiJingAuth = true
            }
        });
      }
    },

    swiperLink() {
      const id = this.swinper.clickValue;
      this.$router.push({ path: "../article/?openId=" + this.openId + "&id=" + id });
    },
    queryNewsDatas() {
      //获取资讯列表
      api.queryNEWSHot({
          pageSize: 3,
          pageNum: 1
        })
        .then(res => {
          const _data = res.data;
          this.indexNews = _data.data;
        });
    },

    requireSwiper() {
      //轮播
      api.requireIndexsSwiper({
          pageSize: 5,
          pageNum: 1
        })
        .then(res => {
          const _data = res.data;
          let _odata;
          if (_data.status == 200) {
            this.imgLists = _data.data;
            console.log(this.imgLists);
          }
        });
    },
    getsaveUserBehaviourTitle(openId, id) {
      console.log(this.openId, "openid");
      api.saveUserBehaviourTitle(openId, id).then(res => {
          console.log(res, "res");
        })
        .catch(err => {
          console.log(err, "错误");
        });
    },
    marktag(id) {
      if (this.checkLogin()) {
        this.getsaveUserBehaviourTitle(this.openId, id);
      }
    }
  },
  created() {
    console.log('1',this.openId)
    //获取idCard用户身份证以及姓名
    let authInfo = this.$Utils.getLocalStorage("authInfo");
    //获取cert_token
    let certToken = this.$Utils.getLocalStorage("certToken");


    this.getcert = certToken;
    if (this.$route.query.openId) {   //URL是否带有 openId
      //存储openId
      this.$Utils.setLocalStorage("openId", this.$route.query.openId);
      this.$store.commit("UPDATE_USER_INFO", {
        openId: this.$route.query.openId,
        userId: this.$route.query.openId
      });
    } else if (this.getUrlParam().ret_code == "0") {
      //获取openId接口避免首次刷脸成功后url上未带openId
      console.log(22)
      api.getOpenIdFromCache({certToken:certToken}).then((res)=>{
        if(res.data.success){
          this.$store.commit("UPDATE_USER_INFO", {
            openId: res.data.openId,
            userId: res.data.openId,
            idCard: authInfo.idCard,
            name: authInfo.name
          });
          this.requireWXUser();
        } else {
        }
      });
       this.isWeiJingAuth = true;
      this.myisWeiJingAuth = 1;
     } else if (this.$route.query.mark) {
       this.isWeiJingAuth = true;
      this.myisWeiJingAuth = 1;
       this.$store.commit("UPDATE_USER_INFO", {
         idCard: authInfo.idCard,
         name: authInfo.name
       });
     }
    //判断刷脸是否失效
    if (certToken) {
      api.validateCertToken({ certToken: certToken }).then(res => {
        if (!res.data.effective) {
          this.isWeiJingAuth = false;
          this.myisWeiJingAuth = 0;
          //清除身份证、姓名、cert_token值
          this.$Utils.moveLocalStorage("authInfo");
          this.$Utils.moveLocalStorage("certToken");
        } else {
          this.isWeiJingAuth = true;
          this.myisWeiJingAuth = 1;
          this.$store.commit("UPDATE_USER_INFO", {
            idCard: res.data.idNum,
            name: res.data.fullName,
            openId: this.$route.query.openId,
            userId: this.$route.query.openId
          });
        }

      });
    }
    //获取openId之后，链接是否有身份证、姓名参数，有则不是第一次刷脸，否则是第一次刷脸
    if (this.$route.query.idNum) {
      // alert(this.$route.query.name)
      this.$Utils.setLocalStorage("authUserInfo", {
        idCard: this.$route.query.idNum,
        name: this.$route.query.name
      });
    } else {
      //清除身份证、姓名
      this.$Utils.moveLocalStorage("authUserInfo");
    }

  },
  mounted() {

    this.queryNewsDatas();
    this.requireWXUser();
    const _this = this;
    this.requireSwiper();
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10);
      }
      return value;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  max-width: 7.5rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.link_bar_cont {
  width: 100%;
  height: 1.87rem;
  overflow: hidden;
  background: #fff;
  a {
    display: inline-block;
    float: left;
    width: 24.8%;
    height: 100%;
    line-height: 2.95rem;
    text-align: center;
    font-size: 0.26rem;
    color: #353535;
    position: relative;
    font-weight: bold;
    img {
      width: 1.2rem;
      height: 1.2rem;
      position: absolute;
      left: 50%;
      top: 0.07rem;
      margin-left: -0.61rem;
    }
  }
}
.modelTitle {
  border-bottom: 1px solid #e6e6e6;
}
.model {
  background: #fff;
  overflow: hidden;
  margin-top: 0.3rem;
}
.modelList {
  overflow: hidden;
  margin-top: 0.2rem;
}
.modelList li {
  float: left;
  width: 50%;
  line-height: 0.64rem;
  padding-left: 0.3rem;
  margin-bottom: 0.3rem;
}
.modelList li a {
  font-size: 0.3rem;
  color: #353535;
}
.modelList li:nth-of-type(2n + 1) {
  border-right: 1px solid #e6e6e6;
}

.modelTitle {
  border-bottom: 1px solid #e6e6e6;
}
.model {
  background: #fff;
  overflow: hidden;
  margin-top: 0.3rem;
}
.modelList {
  overflow: hidden;
  margin-top: 0.2rem;
}
.modelList li {
  float: left;
  width: 50%;
  line-height: 0.64rem;
  padding-left: 0.3rem;
  margin-bottom: 0.3rem;
}
.modelList li a {
  font-size: 0.3rem;
  color: #353535;
}
.modelList li:nth-of-type(2n + 1) {
  border-right: 1px solid #e6e6e6;
}

.modelTitle .vux-label {
  font-size: 0.36rem !important;
  font-weight: bold;
  color: #000;
}
.modelTitle .weui-cell__ft {
  color: #b2b2b2 !important;
  font-size: 0.28rem;
}
.modelTitle .weui-cell {
  padding: 0.21rem 0.3rem 0.1rem;
}
.modelTitle .xinpIcon img {
  width: 0.32rem;
  vertical-align: middle;
  margin-right: 0.14rem;
}
/*.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
  height: auto !important;
}*/
.indexNews .news {
  border-bottom: none;
}
</style>
