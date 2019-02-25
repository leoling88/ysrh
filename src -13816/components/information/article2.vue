<template>
  <div class="container">
    <div class="error" v-if="message.show"><img src="../../assets/images/error_404.png" alt=""></div>
    <div class="bg_white newsBody mar-bot20" v-else>
        <div class="news_title">{{article.title}}</div>
        <div class="news_cont" v-html="article.html"></div>
        <div class="newsBton">
          <a href="javascript:;" class="fl" v-if="listType == 'dj01'">阅读量:{{article.read}}</a>
          <a href="javascript:;"  @click="clickZan" class="fr" v-if="listType == 'dj01'">
            <img v-if="article.like" src="../../assets/images/zan1.png" alt="">
            <img v-else src="../../assets/images/zan.png" alt="">
            <span>{{article.likeNum}}</span>
          </a>
          <div  v-if="article.effective == '0'" >
            <span class="but-1" v-if="article.sign == '0'" @click="clickApply">我要报名</span>
            <span  class="but-2" v-else>已报名</span>
          </div>
          <div class="but-2"   v-if="article.effective == '-1'">活动已结束</div>
          <div class="but-2"  v-if="article.effective == '1'">活动即将开始</div>
        </div>
    </div>

    <!--弹框-->
    <v-alert v-model="alertVal.show"  @confirm="submitApply">
      <span slot='title' v-text="alertVal.title"></span>
      <div slot='content'>
          <div>请核对报名资料:</div>
          <div class="font-1"><span><label>姓名</label>:</span>{{formatDate.name}}</div>
          <div class="font-1"><span><label>身份证</label>:</span>{{formatDate.idCard}}</div>
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
  import api from '../../api/api';
  import alerts from '@/components/common/Alert'

  export default {
    components:{
      'v-alert':alerts
    },
    data() {
      return {
        openId: this.$route.params.openId,
        comId: this.$route.params.comId,
        listType:this.$route.params.listType,

        article:{
          title:'',
          html:'',
          read:'',
          effective:'',
          sign:'',
          like:'',
          likeNum:'',
          id:'',
          adderss:''


        },
        message:{
          show:false,
          text:''
        },
        alertShow:false,
        isWeiJingAuth:true,
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
        alertVal:{      //提示框
          show: false,
          title: '重要提示',
        },
      }
    },
    methods:{
      alertClose(){    //关闭窗口
        this.alertShow = false
      },
      clickZan (){
        if(this.listType === 'dj01'){  //党建点赞
            api.clickZanHD({
              partyDevelopId:this.comId,
              openId:this.openId,
            }).then((res)=>{
              const _data = res.data
              if(_data.status == 200){
                if(_data.msg == 1)  this.article.like = true
                else if(_data.msg == 0) this.article.like = false
                this.article.likeNum = _data.data

              }

            })
            this.getUserPartyDevelopTitle(this.openId,this.comId,2);//党建活动点赞打标签
        }


      },
      queryArtData(){    //获取活动详情
        if(this.listType == 'dj01'){    //获取党建活动详情
          api.queryDjHdArt({
            openId:this.openId,
            partyDevelopId:this.comId,
          }).then((res)=>{
            const _data = res.data.data
            this.article.title = _data.partyDevelop.partyDevelopName
            this.article.html = _data.partyDevelop.partyDevelopDesc
            this.article.read = _data.partyDevelop.read
            this.article.effective = _data.partyDevelop.effective
            this.article.sign = _data.partyDevelop.sign
            this.article.like = _data.like
            this.article.likeNum = _data.likeNum
            this.article.id = _data.partyDevelop.id
            this.article.adderss =  _data.partyDevelop.partyDevelopAddress
            this.article.time =  _data.partyDevelop.partyDevelopStartTime

          })
        }else if(this.listType == 'rh02'){   //获取融合活动详情
          api.queryRhHdArt({
            openId:this.openId,
            activityId:this.comId,
          }).then((res)=>{
            const _data = res.data.data
            this.article.title = _data.activityName
            this.article.html = _data.activityDesc
            this.article.read = _data.read
            this.article.effective = _data.effective
            this.article.id = _data.id
            this.article.adderss =  _data.activityAddress
            this.article.time =  _data.activityStartTime
            this.article.sign = _data.sign
            // this.article.like = _data.like
            // this.article.likeNum = _data.likeNum

          })
        }

      },
      trafficStatistics(){
        if(this.listType === 'dj01'){      //党建阅读量
          api.trafficStatisticsDJ({
            id:this.comId,
          }).then((res)=>{
              // this.article = res.data.data

          })
        }

      },
      clickApply(){   //点报名
        if(!this.isWeiJingAuth){
          this.$router.push({path:'/login?openId='+this.openId});
        }else{
          this.alertVal.show = true
          this.formatDate.classroomId = this.article.id
          this.formatDate.classroomName = this.article.title
          this.formatDate.classAdderss = this.article.adderss
          this.formatDate.classTime = this.article.time

        }
      },
      submitApply(){    //点击报名
        if (!this.formatDate.phone) {
          this.$store.commit('SHOWTOAST', '请输入手机号！');
        } else if (!this.$regExp.phone.test(this.formatDate.phone)) {
          this.$store.commit('SHOWTOAST', '手机号不合法！');
        }else{
          if(this.listType == 'dj01'){    //建党活动报告
            api.DJApply({
              openId:this.openId,
              partyDevelopId:this.comId,
              phone: this.formatDate.phone
            }).then((res)=>{
              if(res.data.status == 200){
              this.$router.push({path:'/resultApply/' + this.listType+ '/' + this.formatDate.classroomId + '/' + this.formatDate.classroomName  +'?status=pass&openId='+this.openId });
              }else{
                alert(res.data.msg)
              }

            });
             this.getUserPartyDevelopTitle(this.openId,this.comId,3);//党建活动报名打标签
          }else if(this.listType == 'rh02'){   //融合活动报告
            api.RHApply({
              openId:this.openId,
              activityId:this.comId,
              phone: this.formatDate.phone
            }).then((res)=>{
              if(res.data.status == 200){
                this.$router.push({path:'/resultApply/' + this.listType+ '/' + this.formatDate.classroomId + '/' + this.formatDate.classroomName  +'?status=pass&openId='+this.openId });
              }else{
                alert(res.data.msg)
              }

            });
            this.getUserActivityTitle(this.openId,this.comId,3);//融合活动报名打标签
          }
        }

      },
    getUserActivityTitle(openId,id,type){//融合活动打标签
    api.saveUserActivityTitle(openId,id,type).tnen(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
      },
        getUserPartyDevelopTitle(openId,id,type){//党建活动报名打标签
    api.saveUserPartyDevelopTitle(openId,id,type).then(res=>{
      console.log(res,'res')
    }).catch(err=>{
      cocnsole.log(err,'err')
    })
  }
    },
    created () {
      this.queryArtData()
      this.trafficStatistics()
      //获取idCard用户身份证以及姓名
      let authInfo = this.$Utils.getLocalStorage("authInfo");
      //获取cert_token
      let certToken = this.$Utils.getLocalStorage("certToken");
      let _openid = this.$Utils.getLocalStorage('openId')
      if(!this.$route.params.openId){
        this.openId = _openid
      }
      this.formatDate.name = authInfo.name
      this.formatDate.idCard = authInfo.idCard  
      //存储用户OpenId信息
      if (this.$route.params.openId) {
        //存储openId
        this.$Utils.setLocalStorage('openId',this.$route.params.openId);
        this.$store.commit("UPDATE_USER_INFO", {
          openid: this.$route.params.openId,
          userId: this.$route.params.openId
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
    mounted(){
      if(this.listType=='dj01'){//党建活动
        this.getUserPartyDevelopTitle(this.openId,this.comId,1)
      }else if(this.listType=='rh02'){//融合
      this.getUserActivityTitle(this.openId,this.comId,1)
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
  }
</script>
<style lang="less" scoped>
.news_title{margin-bottom:.5rem;}
.but-1{position: fixed;width:2.5rem;height:1rem;border-radius:.8rem;color:#fff; text-align:center;background: #2c95f5;box-shadow: 0 0 .5rem .01rem #2c95f5;bottom:.5rem;left:50%;margin-left:-1.25rem;line-height:1rem; }
.but-1 a{color:#fff;}
.but-2{position: fixed;width:2.5rem;height:1rem;border-radius:.8rem;color:#fff; text-align:center;background: #888;box-shadow: 0 0 .5rem .01rem #ccc;bottom:.5rem;left:50%;margin-left:-1.25rem;line-height:1rem; }
.but-2 a{color:#fff;}

</style>
