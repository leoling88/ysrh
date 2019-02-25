<template>
  <div class="newsRH">

    <video-player :options="playerOptions"></video-player>
    <div class="title-1">最新课堂</div>
    <div class="news-lists" v-show="tabHover == 0">
      <ul v-if="newsData.lists1.length > 0">
        <li v-for="(item, index) in newsData.lists1">
          <router-link
            :to="{path:'../../article3/'+ openId +'/'+ listType +'/' +item.id+'?photo='+item.courseCover}"
          >
            <img :src="item.courseCover">
            <div class="text">
              <h2>{{item.courseName}}</h2>
              <span class="time">课程类型：{{item.courseType}}</span><br/>
              <span class="time">课程目标：{{item.courseSubTitle}}</span>
           </div>
          </router-link>
        </li>
      </ul>
      <div v-else class="mess-1">暂无数据</div>
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
    </div>-->
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api.js";
import mixins from "../../mixins/mixins.js";
import { videoPlayer } from "vue-video-player";
export default {
  components: { Group, Cell, videoPlayer },
  mixins: [mixins],

  data() {
    return {
      openId: this.$route.params.openId,
      listType: this.$route.params.listType,
      tabHover: "0",
      newsData: {
        tab: ["融合学堂", "融合活动"],
        lists1: [],
        lists2: []
      },
      playerOptions: {
        //  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "https://pic.ibaotu.com/17/83/98/61N888piCf8d.mp4" //你的m3u8地址（必填）
          }
        ],
        poster: '', //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //  controlBar: {
        //   timeDivider: true,
        //   durationDisplay: true,
        //   remainingTimeDisplay: false,
        //   fullscreenToggle: true //全屏按钮
        //  }}
      }
    };
  },
  methods: {
    clickTab(index) {
      this.tabHover = index;
      if (index == 0) {
        this.listType = 0;
        if (this.newsData.lists1.length < 1) this.queryData();
      } else if (index == 1) {
        this.listType = 1;
        if (this.newsData.lists2.length < 1) this.queryData();
      }
    },
    queryData() {
      //获取数据
      if (this.listType === "rh01") {
        this.tabHover = 0;
        api
          .queryRHKT({
            openId: this.openId,
            page: 1,
            limit: 100
          })
          .then(res => {
            console.log(res.data.data.data)
            this.newsData.lists1 = res.data.data.data;
            this.playerOptions.poster = this.newsData.lists1[0].courseCover
          });
      } else if (this.listType === "rh02") {
        this.tabHover = 1;
        api
          .queryRHHD({
            openId: this.openId,
            page: 1,
            limit: 100
          })
          .then(res => {
            this.newsData.lists2 = res.data.data.data;
            console.log("融合活动:" + this.newsData.lists2);
          });
      }
    },
    verifyDyDatas() {
      // 查询党员信息
      api
        .requireDYmsg({
          openId: this.openId
        })
        .then(res => {});
    }
  },
  mounted() {
    // this.verifyDyDatas()
    window.location = window.location;
    this.offsetHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight; //浏览器高度
  },
  created() {
    this.queryData();
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d; //+ ' ' + h + ':' + m + ':' + s;
    }
  }
};
</script>
<style>
  .video-js .vjs-big-play-button{
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
<style lang="less" scoped>
.newsRH {
}
.video {
  width: 100%;
}
.newsRH .title {
  border-bottom: 0.01rem solid #ccc;
  padding: 0.2rem 0 0;
  overflow: hidden;
  background: #fff;
}
.newsRH .title span {
  display: block;
  width: 50%;
  float: left;
  padding: 0 0 0.3rem;
  text-align: center;
  color: #000;
}
.newsRH .title span.hover {
  border-bottom: 0.05rem solid #0b95ff;
}
.news-lists {
}
.news-lists {
  margin-bottom: 1rem;
  padding: 0 0.2rem;
  background: #fff;
}
.news-lists li {
  height: 2rem;
  position: relative;
  border-bottom: 0.02rem solid #f1f1f1;
  padding: 0.2rem 0.2rem 0.2rem 2.5rem;
}
.news-lists li img {
  display: block;
  width: 2rem;
  height: 1.6rem;
  position: absolute;
  left: 0.2rem;
}
.news-lists li .text {
  position: relative;
  line-height:.35rem;
}
.news-lists li a {
  display: block;
  width: 100%;
  color: #333;
}
.news-lists li h2 {
  font-size: 0.3rem;
  height: .8rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  line-height:.4rem;
  margin-bottom:.1rem;
}
.news-lists li .text .but {
  position: absolute;
  right: 0;
  top: 20%;
}
.col-blue {
  color: #0b95ff;
}
.news-lists li .text .time {
  font-size: 0.26rem;
  color: #888;
}
.title-1 {
  padding: 0.2rem;
  background: #fff;
}
</style>
