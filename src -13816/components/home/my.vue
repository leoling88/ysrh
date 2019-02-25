<template>
  <div class="container">
    <div>
      <div class="mytop">
        <div class="head">
          <img :src="userWX.headPic" alt>
        </div>
        <div class="msg" v-if="logState">
          <span class="s1">{{userWX.name}}</span>
        </div>
        <div class="msg" v-else>
          <span class="but-login" @click="linshiClick(0)">未登录</span>
        </div>
      </div>

      <div class="bg_white mt30" style="color:#ccc">
        <cell
          class="modelTitle modelTitle_my"
          title="标签管理"
          value
          :is-link="true"
          style="text-indent:.3rem;"
          @click.native="linshiClick(6)"
        >
          <!-- @click.native="linshiClick(18)" -->
          <span slot="icon" class="icon-bookmark"></span>
          <span slot="value" class="value-slot" style="margin-top:10px;">查看全部</span>
        </cell>
          <ul class="taglist" v-if="taglist" @click="linshiClick(6)">
            <li class="tag" v-for="item in taglist" :key="item">{{item}}</li>
          </ul>
        <!--<div v-if="!name" class="tag-0"><strong v-for="item in myData.tag">{{item}}</strong></div>-->
        <!--         <div v-if="name" class="tag-0">
          <strong>80后女士</strong>
          <strong>潮州户口</strong>
          <strong>水瓶座</strong>
          <strong v-if="lastBiao">社保缴纳累计6年</strong>
        </div>-->
        <cell
          class="modelTitle modelTitle_my"
          title="消息通知"
          value=" "
          :is-link="true"
          @click.native="warning"
        >
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/xiaoxi.png" alt>
          </span>
        </cell>
        <cell class="modelTitle modelTitle_my" title="我的历程" value="" :is-link="true" @click.native="warning">
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/lichen.png" alt>
          </span>
        </cell>

        <cell
          class="modelTitle modelTitle_my"
          title="意见反馈"
          :is-link="true"
          @click.native="linshiClick(2)"
        >
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/yijian.png" alt>
          </span>
        </cell>
      </div>
      <div class="bg_white mt30">
        <cell
          class="modelTitle modelTitle_my"
          title="帐户管理"
          :is-link="true"
          @click.native="linshiClick(5)"
        >
          <span slot="icon" class="xinpIcon">
            <img src="../../assets/images/icon_user.png" alt>
          </span>
        </cell>
      </div>
      <div class="endLogin" v-if="logState" @click="logOutUsert">退出登录</div>
    </div>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api.js";
import mixins from "../../mixins/mixins.js";
import utils from "../../script/utils";
export default {
  components: { Group, Cell },
  mixins: [mixins],
  data() {
    return {
      lastBiao: false,
      logState: false,
      openId: this.$route.query.openId,
      userWX: [],
      taglist: {} //个人标签
    };
  },
  methods: {
    warning(){
      return this.$store.commit("SHOWTOAST", '服务暂未开通');          
    },

    getindexTitle(openId) {
      //获取标签
      api
        .indexTitle(openId)
        .then(res => {
          this.taglist = res.data.data;
        })
        .catch(err => {});
    },
    userControl() {
      this.$router.push({ path: "/usercontrol/" + this.openId });
    },
    linshiClick(index) {
      if (this.logState) {
        //是否已登录
        if (index === 5)
          this.$router.push({ path: "/usercontrol/" + this.openId });
        else if (index === 2)
          this.$router.push({ path: "/help/" + this.openId });
        else if (index == 6) this.$router.push({ path: "/mylabel" });
      } else {
        this.$router.push({ path: "/login?openId=" + this.openId });
      }
    },
    requireWXUser() {
      //获取微信用户信息
      let certToken = this.$Utils.getLocalStorage("certToken");
      if (certToken) {
        this.logState = true;
      } else {
        this.logState = false;
      }
      if (this.openId) {
        api
          .getWXdUser({
            openId: this.openId
          })
          .then(res => {
            const _data = res.data.wxUsers[0];
            let _odata;
            if (res.data.success) {
              this.userWX = _data;
            }
          });
      }
    },
    logOutUsert() {
      api
        .logOut({
          openId: this.openId
        })
        .then(res => {
          if (res.data.status == 200) {
            this.$Utils.moveLocalStorage("certToken");
            this.$router.push({ path: "/login?openId=" + this.openId });
          }
        });
    }
  },
  mounted() {
    let certToken = this.$Utils.getLocalStorage("certToken");
    if (certToken) {
      console.log(certToken, "已经登录了");
      this.getindexTitle(this.openId);
    } else {
      console.log(certToken, "没登录");
    }
  },
  created() {
    if (!this.openId) {
      this.openId = this.$Utils.getLocalStorage("openId");
    }
    this.requireWXUser();
    //判断最后一个标签是否出现
    console.log(this.$Utils.getLocalStorage("showBqian"));
    if (this.$Utils.getLocalStorage("showBqian")) {
      this.lastBiao = true;
    } else {
      this.lastBiao = false;
    }
  }
};
</script>
<style lang="less" scoped>
.mytop {
  height: 4rem;
  background: #fff;
  color: #fff !important;
  overflow: hidden;
  text-align: center;
}
.mytop .head {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.8rem auto 0;
  border: 0.01rem solid #ccc;
  border-radius: 50%;
  overflow: hidden;
}
.mytop .head img {
  width: 100%;
  height: 100%;
}
.endLogin {
  display: block;
  background: #fff;
  text-align: center;
  height: 0.96rem;
  line-height: 0.96rem;
  color: #0091ff;
  width: 6.9rem;
  margin: 0.72rem auto 2rem;
}
.mytop .log {
  width: 1.6rem;
  margin: 0.5rem auto;
  border-radius: 0.05rem;
  border: 0.01rem solid #ccc;
  padding: 0.03rem 0;
  font-size: 0.28rem;
  color: #000;
  text-align: center;
}
.mytop .msg {
  margin: 0.2rem auto 0;
}
.mytop .msg span {
  display: block;
  text-align: center;
}
.mytop .msg .s1 {
  font-size: 0.4rem;
  color: #000;
}
.mytop .msg .s2 {
  font-size: 0.24rem;
  color: #ccc;
}
.icon-bookmark {
  color: #000;
  position: absolute;
  margin-top: -6px;
  margin-left: -13px;
  width: 17px;
  height: 17px;
  border-radius: 1px 1px 0 0;
  border-top: solid 1px currentColor;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
}
.icon-bookmark:before {
  content: "";
  position: absolute;
  top: 9px;
  left: 2px;
  width: 10px;
  height: 10px;
  border-top: solid 1px currentColor;
  border-left: solid 1px currentColor;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.tag-0 {
  padding: 0 0.35rem 0.2rem;
}
.tag-0 strong {
  display: inline-table;
  margin-right: 0.1rem;
  border: 1px solid red;
  padding: 0.05rem 0.15rem;
  color: red;
  border-radius: 3px;
  font-size: 0.24rem;
  font-weight: normal;
}
.tag-0 strong:nth-of-type(4) {
  color: #88ccff;
  border-color: #88ccff;
}
div.modelTitle .weui-cell__ft {
  margin-top: -10px !important;
}
.taglist {
  overflow: hidden;
  margin: 0rem 0.3rem 0rem 0.3rem;
}
.taglist li {
  float: left;
  padding: 0.1rem;
  border: 1px solid #ff6b6b;
  margin: 0.15rem 0.16rem;
  font-size: 0.3rem;
  color: #ff6b6b;
  border-radius: 2px;
}
.taglist li.tag:first-child {
  color: #ff6b6b;
  border-color: #ff6b6b;
  margin-left: 0;
}
.mytop .msg .but-login {
  display: inline-table;
  margin-top: 0.2rem;
  border: 0.02 solid #fff;
  border-radius: 0.1rem;
  padding: 0.06rem 0.3rem;
  background: #0091ff;
}
</style>
