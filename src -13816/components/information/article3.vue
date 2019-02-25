<template>
  <div class="container">
    <div class="error" v-if="message.show">
      <img src="../../assets/images/error_404.png" alt>
    </div>
    <div v-else class="xuetang-1">
       <video-player
      :options="playerOptions"
    ></video-player>
      <!-- <video
        :src="article.courseAttachPath"
        ref="videoPlay"
        reload="metadata"
        :poster="photo"
        controls="controls"
        class="video"
      >our browser does not support the video tag</video> -->
      <!-- <img :src="photo" alt class="images"> -->
      <div class="title">
        <span>课程简介</span>
      </div>
      <div class="about">
        <p class="font-1 pad-bot-1">{{article.courseName}}</p>
        <p class="p1">
          <label>课程类型：</label>
          {{article.courseType}}
        </p>
        <p class="p1">
          <label>课程目标：</label>
          {{article.courseSubTitle}}
        </p>
        <p class="p1">
          <label>课程时间：</label>
          {{article.courseStartTime | formatDate}} - {{article.courseEndTime | formatDate}}
        </p>
      </div>
      <div v-html="article.courseDesc" class="con"></div>
    </div>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
import { videoPlayer } from 'vue-video-player';
export default {
  components: { Group, Cell ,videoPlayer},
  mixins: [mixins],
  data() {
    return {
      openId: this.$route.params.openId,
      courseId: this.$route.params.comId,
      listType: this.$route.params.listType,
      photo: this.$route.query.photo,
      article: [],
      message: {
        show: false,
        text: ""
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
        poster: this.$route.query.photo, //你的封面地址
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
    queryArtData() {
      //获取活动详情
      api
        .queryRHKTArt({
          openId: this.openId,
          courseId: this.courseId
        })
        .then(res => {
          this.article = res.data.data;
          this.playerOptions.sources[0].src =this.article.courseAttachPath
        });
    },
    trafficStatistics() {
      api
        .trafficStatisticsDJ({
          id: this.courseId
        })
        .then(res => {
          this.article = res.data.data;
        });
    },
    getUserCourseTitle(openId, id, type) {
      //融合学堂浏览打标签
      api
        .saveUserCourseTitle(openId, id, type)
        .then(res => {
          console.log(res, "res");
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  },
  created() {
    this.queryArtData();
  },
  mounted() {
    this.trafficStatistics();
    this.getUserCourseTitle(this.openId, this.courseId, 1);
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
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
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

.images {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  width: 100%;
  height: 4.2rem;
}
.video {
  width: 100%;
}
.container {
  background: #fff;
}
.xuetang-1 {
  margin-bottom: 2rem;
}
.xuetang-1 .title {
  border-bottom: 0.01rem solid #ccc;
  padding: 0.2rem 0;
  font-weight: bold;
  background: #fff;
}
.xuetang-1 .title span {
  border-left: 0.1rem solid #2c95f5;
  padding-left: 0.2rem;
  font-size: 0.34rem;
  color: #000;
}
.xuetang-1 .about {
  border-bottom: 0.01rem solid #ccc;
  padding: 0.3rem;
  font-size: 0.28rem;
  background: #f1f1f1;
}
.xuetang-1 .about .p1 {
  padding: 0.1rem 0;
  color: #666;
  font-size: 0.26rem;
}
.xuetang-1 .about label {
  color: #ccc;
}
.xuetang-1 .con {
  padding: 0.3rem;
}
.xuetang-1 .con img {
  max-width: 100%;
  margin: 0 auto;
}
.but-1 {
  position: fixed;
  width: 2.5rem;
  height: 1rem;
  border-radius: 0.8rem;
  color: #fff;
  text-align: center;
  background: #2c95f5;
  box-shadow: 0 0 0.5rem 0.01rem #2c95f5;
  bottom: 0.5rem;
  left: 50%;
  margin-left: -1.25rem;
  line-height: 1rem;
}
.but-1 a {
  color: #fff;
}
.pad-bot-1 {
  padding-bottom: 0.2rem;
}
.font-1 {
  font-size: 0.3rem;
  color: #000;
}
</style>
