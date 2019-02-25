<template>
  <div class="newsRH">
    <div class="title">
      <span v-for="(item, index) in newsData.tab" :class="{'hover':tabHover==index}" @click="clickTab(index)">{{item}}</span>
    </div>
    <video src="https://pic.ibaotu.com/17/83/98/61N888piCf8d.mp4" controls="controls" class="video">
your browser does not support the video tag
</video>
    <div class="title-1">最新课堂</div>
    <div class="news-lists" v-show="tabHover == 0">
      <ul>
        <li v-for="(item, index) in newsData.lists1">
          <router-link :to="{path:'my/'+ item.id}">
            <img :src="item.courseCover"/>
          </router-link>
          <div class="text">
            <h2>{{item.courseAttachName}}</h2>
            <span class="time">演讲人：</span>
            <span class="time">内容：</span>
          </div>

        </li>
      </ul>
     
    </div>
<!--     <div class="news-lists" v-show="tabHover == 1">
      <ul>
        <li v-for="(item, index) in newsData.lists2">
          <router-link :to="{path:'my/'+ item.id}">
            <img :src="item.activityCover"/>
          </router-link>
          <div class="text"><h2>{{item.activityName}}</h2>
            <span class="time">{{item.createTime | formatDate}}</span></span>
            <span class="but col-blue" v-if="!item.sing">我要报名</span>
            <span class="but" v-else>已报名</span>
          </div>

        </li>
      </ul>     
    </div> -->
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api.js";
import mixins from "../../mixins/mixins.js";
export default {
  components: { Group, Cell },
  mixins: [mixins],

  data() {
    return {
      openId:this.$route.params.openId,
      listType:this.$route.params.listType,
      tabHover:'0',
      newsData:{
        tab:['融合学堂','融合活动'],
        lists1:[],
        lists2:[]
      }
    };
  },
  methods: {
    clickTab(index){
      this.tabHover = index
      if(index == 0){
        this.listType = 0
        if(this.newsData.lists1.length < 1)  this.queryData()
      }
      else if(index == 1) {
        this.listType = 1
        if(this.newsData.lists2.length < 1)  this.queryData()
      }
    },
    queryData(){      //获取数据
      if(this.listType === 'rh01'){
        this.tabHover = 0
        api.queryRHKT({
          openId:this.openId,
          page:1,
          limit:100
        }).then((res)=>{
          this.newsData.lists1 = res.data.data.data
          console.log('融合课堂:' +this.newsData.lists)

        });
      }else if(this.listType === 'rh02'){
        this.tabHover = 1
        api.queryRHHD({
          openId:this.openId,
          page:1,
          limit:100
        }).then((res)=>{
          this.newsData.lists2 = res.data.data.data
          console.log('融合活动:' +this.newsData.lists2)

        });

        
      }
    },
    verifyDyDatas(){    // 查询党员信息
        api.requireDYmsg({
          openId:this.openId,
        }).then((res)=>{


        });
    }  

  },
  mounted() {
    // this.verifyDyDatas()
    this.offsetHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度

  },
  created() {
    this.queryData()
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
      return y + '-' + MM + '-' + d  //+ ' ' + h + ':' + m + ':' + s;
    }

  }  
};
</script>
<style lang="less" scoped>
.newsRH{}
.video{width:100%;}
.newsRH .title{border-bottom:.01rem solid #ccc;padding:.2rem 0 0;overflow:hidden;background:#fff}
.newsRH .title span{display: block;width:50%;float:left;padding:0 0 .3rem; text-align: center;color:#000;}
.newsRH .title span.hover{border-bottom:.05rem solid #0b95ff;}
.news-lists{}
.news-lists{margin-bottom:1rem;padding:0 .2rem;background:#fff;}
.news-lists li{height:2rem;position: relative;border-bottom:.02rem solid #f1f1f1;padding:.2rem .2rem .2rem 2.5rem;}
.news-lists li img{display:block;width:2rem;height:1.6rem; position: absolute;left:.2rem;}
.news-lists li .text{ position:relative; }
.news-lists li a{display:block;width:100%;height:auto;}
.news-lists li  h2{font-size:.3rem;height:1rem;font-weight:500;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:2; display: -webkit-box;}
.news-lists li .text .but{ position:absolute;right:0;top:20%; }
.col-blue{color:#0b95ff;}
.news-lists li .text .time{font-size:.26rem;color:#888;}
.title-1{padding:.2rem;background:#fff;}

</style>
