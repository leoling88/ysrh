<template>
  <div class="newsDJ">
    <div class="news2-lists">
      <ul v-if="newsData.lists.length > 0">
        <li v-for="(item, index) in newsData.lists">
          <div class="text">
            <router-link :to="{path:'../../article2/'+ openId +'/'+ listType +'/' +item.id}">
              <h2>{{item.eventDesc}}</h2>
              <span class="img"><img :src="item.partyDevelopCover" alt=""></span>
              <span class="title">{{item.partyDevelopName}}</span>
              <span class="con">时间 : {{item.partyDevelopStartTime | formatDate}} 至  {{item.partyDevelopEndTime | formatDate}}</span></span>
              <span class="con">地点 : {{item.partyDevelopAddress}}</span>
            </router-link>
            <div v-if="item.effective == '0'">
              <span class="but"  v-if="item.sign == '1'">已报名</span>
              <span class="but col-blue" v-else @click="clickApply(item.id, item.partyDevelopName, item.partyDevelopAddress, item.partyDevelopStartTime)">我要报名</span>
            </div>
            <div v-else-if="item.effective == '-1'">
              <span class="but"  >活动已结束</span>
            </div>
            <div v-else-if="item.effective == '1'">
              <span class="but"  >活动即将开始</span>
            </div>
          </div>

        </li>
      </ul>
      <div v-else class="mess-1">暂无数据</div>
    </div>

    <!--弹框-->
    <v-alert v-model="alertVal.show"  @confirm="submitApply">
      <span slot='title' v-text="alertVal.title"></span>
      <div slot='content'>
          <div>请核对报名资料:</div>
          <div ><span><label>姓名</label>:</span>{{formatDate.name}}</div>
          <div><span><label>身份证</label>:</span>{{formatDate.idCard}}</div>
          <div><span><label>活动名称</label>:</span>{{formatDate.classroomName}}</div>
          <div><span><label>活动时间</label>:</span>{{formatDate.classTime | formatDate}}</span></div>
          <div><span><label>活动地点</label>:</span>{{formatDate.classAdderss}}</div>
          <div><span><label>手机号码</label>:</span><input type="tel" maxlength="11" v-model="formatDate.phone" ref="phone" class="input-1" placeholder="请输入手机号" ></div>
      </div>
    </v-alert>
    <!--弹框end-->

  </div>
</template>
<script>
import api from "../../api/api.js";
import alerts from '@/components/common/Alert'
import mixins from "../../mixins/mixins.js";

export default {
  components:{
    'v-alert':alerts
  },
  mixins: [mixins],
  data() {
    return {
      openId:this.$route.params.openId,
      listType:this.$route.params.listType,
      newsData:{
        lists:[]
      },
      formatDate:{
        name:'',
        idCard:'',
        classroomId:'',
        classroomName:'',
        classTime:'',
        classAdderss:'',
        partyDevelopId:'',
        phone:''

      },
      alertShow:false,
      isWeiJingAuth:true,
      loadState:0,
      listPage:'',    //总页面
      listPageNum:1,   //当前页面
      pageLimit:12,    //每页显示数
      alertVal:{      //提示框
        show: false,
        title: '重要提示',

      }

    }
  },

  methods: {

  alertClose(){    //关闭窗口
    this.alertShow = false
  },
  clickTab(index){
    this.tabHover = index
  },
  queryData(){         //获取列表
    if(this.listType =='dj01'){
      api.queryDJHD({
        openId:this.openId,
        page:this.listPageNum,
        limit:this.pageLimit
      }).then((res)=>{
        if(this.loadState == 0){
         this.newsData.lists = res.data.data.data
         this.listPage = Math.ceil(res.data.data.count/2)
         this.loadState = 1
         this.listPageNum ++
         console.log(this.loadState)

        }else if(this.loadState == 1 && this.listPageNum < this.listPage){
         this.newsData.lists.push(res.data.data.data)
         console.log(this.newsData.lists)

         this.listPageNum ++

        }

      });
    }
  },
  submitApply(){    //点击报名
    if (!this.formatDate.phone) {
      this.err.msg ='请输入手机号！'
      this.$store.commit('SHOWTOAST', '请输入手机号！');
    } else if (!this.$regExp.phone.test(this.formatDate.phone)) {
      this.$store.commit('SHOWTOAST', '手机号不合法！');
    }else{
      this.getUserPartyDevelopTitle(this.openId,this.formatDate.classroomId,3);
      api.DJApply({
        openId:this.openId,
        partyDevelopId:this.formatDate.classroomId,
        phone: this.formatDate.phone
      }).then((res)=>{
        if(res.data.status == 200){
          this.$router.push({path:'/resultApply/' + this.listType+ '/' + this.formatDate.classroomId + '/' + this.formatDate.classroomName  +'?status=pass&openId='+this.openId });
        }else{
          alert(res.data.msg)
        }
      });
    }
  },
  clickApply(comId, comName, comAdrress, comTime){   //点报名
    if(!this.isWeiJingAuth){
      this.$router.push({path:'/login?openId='+this.openId});
    }else{
      this.alertVal.show = true
      this.formatDate.classroomId = comId
      this.formatDate.classroomName = comName
      this.formatDate.classAdderss = comAdrress
      this.formatDate.classTime = comTime
    }

  },
  getUserPartyDevelopTitle(openId,id,type){//党建活动报名打标签
    api.saveUserPartyDevelopTitle(openId,id,type).then(res=>{
      console.log(res,'res')
    }).catch(err=>{
      cocnsole.log(err,'err')
    })
  }
},
  mounted() {
    this.openId=this.$route.params.openId
  },
  created() {
    this.queryData()

    //获取idCard用户身份证以及姓名
    let authInfo = this.$Utils.getLocalStorage("authInfo");
    //获取cert_token
    let certToken = this.$Utils.getLocalStorage("certToken");
    let _openid = this.$Utils.getLocalStorage('openId')
    if(!this.$route.query.openId){
      this.openId = _openid
      this.formatDate.name = authInfo.name
      this.formatDate.idCard = authInfo.idCard
    }

    this.$Utils.setLocalStorage('openId',this.openId);
    this.getcert = certToken;

    //存储用户OpenId信息
    if (this.$route.query.openId) {
      //存储openId
      this.$Utils.setLocalStorage('openId',this.$route.query.openId);
      this.$store.commit("UPDATE_USER_INFO", {
        openid: this.$route.query.openId,
        userId: this.$route.query.openId
      });
    } else if (this.getUrlParam().ret_code == "0") {
      this.isWeiJingAuth = true;
      this.$store.commit("UPDATE_USER_INFO", {
        idCard: authInfo.idCard,
        name: authInfo.name
      });
    }else if (this.$route.query.mark) {
      console.log('444',this.$route.query.mark)

      this.isWeiJingAuth = true;
      this.$store.commit("UPDATE_USER_INFO", {
        idCard: authInfo.idCard,
        name: authInfo.name
      });
    }
    //判断刷脸是否失效
    if(certToken){
      api.validateCertToken({certToken:certToken}).then((res)=>{
        if(!res.data.effective){
          this.isWeiJingAuth = false;
          //清除身份证、姓名、cert_token值
          this.$Utils.moveLocalStorage("authInfo");
          this.$Utils.moveLocalStorage("certToken");
        } else {
          this.isWeiJingAuth = true;
          this.$store.commit("UPDATE_USER_INFO", {
            idCard: res.data.idNum,
            name: res.data.fullName
          });
        }
      });
    }
    //获取openid之后，链接是否有身份证、姓名参数，有则不是第一次刷脸，否则是第一次刷脸
    if(this.$route.query.idNum){
      // alert(this.$route.query.name)
       this.$Utils.setLocalStorage('authUserInfo',{
        idCard:this.$route.query.idNum,
        name:this.$route.query.name,
      });
    } else {
      //清除身份证、姓名
       this.$Utils.moveLocalStorage("authUserInfo");
    }


  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }

  }
};
</script>
<style lang="less" scoped>
.newsDJ{}

.news2-lists{}
.news2-lists{margin-bottom:1rem;}
.news2-lists li .img{display:block;width:100%;min-height:2rem;background:#f1f1f1;}
.news2-lists li img{display:block;width:100%;border-radius:.2rem}
.news2-lists li {width:100%;margin-bottom:.2rem;padding:.2rem;background:#fff;}
.news2-lists li .text{ position:relative; }
.news2-lists li a{display:block;width:100%;height:auto;}
.news2-lists li  h2{font-size:.32rem;padding:.2rem 0 .05rem 0;font-weight:500;overflow:hidden;}
.news2-lists li .text .but{display: block;margin:.2rem 0 0;border-top:.01rem solid #ccc;padding-top:.2rem;text-align: center;color:#888;}
.news2-lists li .text .time{font-size:.26rem;color:#888;}
.news2-lists li .text .title{display:block;padding:.2rem 0 .1rem;font-size:.3rem;color:#000;}
.news2-lists li .text .con{display:block;font-size:.25rem;color:#888;}
.news2-lists li .text .col-blue{color:#0b95ff;}



</style>
