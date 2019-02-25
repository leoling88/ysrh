<template>
    <div
        class="swipe-wrap"
        :style="{'width':swinperView.width + 'px'}"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchMove"
        ref="back"
      >
    <div class="swipe-box"
         :style="{'width':swinperView.ulWidth + 'px','transform': 'translate3d('+swinperView.left +'px, 0, 0)'}">
      <div class="lists">
        <ul>
          <!-- @click="clickView(item.id)" -->
          <li v-for="(item, index) in swiperLists"
              :style="{'width':swinperView.width + 'px'}"
              :key="index">
            <video-player :options="playerOptionsArr[index]"
                          @play="onPlayerPlay($event)"
                          @pause="onPlayerPause($event)"
                          @ended="onPlayerEnded($event)"></video-player>
          </li>
          <!-- @click.stop="clickView(index)">-->
        </ul>
      </div>
    </div>
    <div class="title"
         v-show="swinperView.titleShow"
         v-if="isRoll">

      <span class="icon-video"></span>
      {{swinperView.title}}
    </div>
    <div class="page"
         v-if="isRoll">
      <div class="page-view">
        <span v-for="(item, index) in swiperLists"
              @click="clickSwinper(index)"></span>
      </div>
      <i :style="{'transform': 'translate3d('+swinperView.hover +'rem, 0, 0)'}"></i>
    </div>

  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import api from "../../api/api";
let num = 0; //初始化游标
let direction = 0; //初始滚动方向   0：向右  1：向左
let Mdirection = ""; //初始滚动方向手势 0：向右  1：向左
let swinperW;
let pageX;
let page;
export default {
  name: "v-swiper",
  data() {
    return {
      headUrl: "",
      timeStart: true,
      isRoll: true,
      pagBar: true,
      playerOptionsArr: []
    };
  },
  props: {
    swiperLists: Array,
    swinperView: Object
  },
  components: {
    videoPlayer
  },
  computed: {},
  computed: {},
  mounted() {
    this.swinperShow();
    this.touch = {};
  },
  methods: {
    onPlayerPlay(player) {
      this.isRoll = false;
      this.pagBar = false;
    },
    onPlayerPause(player) {},
    onPlayerEnded(player) {
      this.isRoll = true;
      this.pagBar = true;
    },
    // 添加轮播停止事件
    clickStopPlay() {
      // alert('2222')
      console.log(2222);
    },
    swinperShow() {
      let _this = this;
      let direction = 0;
      // this.swinperView.title = _this.swiperLists[0].title
      this.timer = setInterval(function() {
        swinperW = _this.swinperView.viewX; //视图偏移位置
        pageX = _this.swinperView.pageX; //游标偏移位置
        _this.swinperView.width = swinperW;
        page = _this.swiperLists.length;
        _this.swinperView.ulWidth = page * swinperW;

        if (_this.isRoll) {
          //列表长度
          if (direction == 0) {
            // console.log(num + '===' + page)
            if (num < page - 1) {
              num++;
            } else {
              direction = 1;
            }
          } else if (direction == 1) {
            if (num > 0) {
              num--;
            } else {
              direction = 0;
            }
          }
          _this.swinperView.left = "-" + num * swinperW;
          _this.swinperView.hover = num * pageX;
          // console.log('num=' + num + "pageX=" +pageX + 'page=' +page)
          _this.swinperView.title = _this.swiperLists[num].title;
        }
      }, 4000);
      //swinper.left
    },
    clickSwinper(index) {
      direction = 0;
      num = index;
      this.swinperView.left = "-" + num * swinperW;
      this.swinperView.hover = num * pageX;
      this.swinperView.title = this.swiperLists[index].title;
    },
    clickView(id) {
      this.swinperView.clickValue = id;
      this.$emit("clickView");
    },
    touchStart(e) {
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      //this.touch.startY = touch.pageY
    },
    touchMove(e) {
      if(this.isRoll){
        const touch = e.touches[0];
        const deltaX = touch.pageX - this.touch.startX;
        //const deltaY = touch.pageY - this.touch.startY
        // if (Math.abs(deltaY) > Math.abs(deltaX)) {
        //   return
        // }
        if (deltaX > 100) {
          Mdirection = 1;
          direction = 1;
        } else if (deltaX < -100) {
          Mdirection = 0;
          direction = 0;
        }        
      }

    },
    touchEnd() {
      if (Mdirection == 0) {
        if (num < page - 1) {
          num++;
        }
        this.swinperView.left = "-" + num * swinperW;
        this.swinperView.hover = num * pageX;
        Mdirection = null;
      } else if (Mdirection == 1) {
        if (num > 0) {
          num--;
        }
        this.swinperView.left = "-" + num * swinperW;
        this.swinperView.hover = num * pageX;
        Mdirection = null;
      }
      this.swinperView.title = this.swiperLists[num].title;
    }
  },
  watch: {
    "swinperView.viewX": function(oldval, val) {
      if (oldval != val) {
        swinperW = this.swinperView.viewX;
        this.swinperView.width = swinperW;
        this.swinperView.ulWidth = page * swinperW;
        this.swinperView.hover = num * pageX;
      }
    },
    swiperLists: function(oldVal, newVal) {
      console.log(newVal, "2");
      this.headUrl = newVal.headUrl;
      newVal.map((val, key) => {
        this.playerOptionsArr.push({
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
              src: val.id //你的m3u8地址（必填）
            }
          ],
          poster: val.headUrl, //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        });
      });
    }
  }
};
</script> 
<style scoped>
.swipe-wrap {
  width: 100%;
  height: 4rem;
  position: relative;
  overflow: hidden;
  background: url(../../assets/images/banner1.jpg) no-repeat;
}
.swipe-wrap video {
  width: 100%;
  height: 100%;
}
.swipe-box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.38s ease-in-out, visibility 0.38s,
    -webkit-transform 0.38s ease-in-out;
}
.swipe-box .lists li {
  width: 100%;
  float: left;
  height: 4rem;
  background: url(../../assets/images/banner1.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.swipe-box .lists li img {
  width: 100%;
  height: 100%;
}

.swipe-wrap .title {
  position: absolute;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  bottom: 0;
  left: 0;
  z-index: 30;
  color: #fff;
  text-indent: 0.3em;
  background: #000;
  opacity: 0.6;
  z-index: 100;
}
.swipe-wrap .page {
  position: absolute;
  bottom: 0.2rem;
  right: 0.2rem;
  padding: 0 0.01rem;
  z-index: 101;
}
.swipe-wrap .page span {
  display: block;
  float: left;
  width: 0.08rem;
  height: 0.08rem;
  margin: 0 0.08rem 0 0;
  border-radius: 50%;
  background: #fff;
}
.swipe-wrap .page span:last-child {
  margin: 0;
}
.swipe-wrap .page i {
  display: block;
  width: 0.09rem;
  height: 0.09rem;
  border-radius: 50%;
  background: #67ff01;
  position: absolute;
  top: 0.01rem;
  left: 0.02rem;
  transition: transform 0.38s ease-in-out, visibility 0.38s,
    -webkit-transform 0.38s ease-in-out;
}
.swipe-wrap .page-view {
  border-radius: 3rem;
  padding: 0.01rem 0.02rem;
  overflow: hidden;
}
.icon-video {
  display: none;
}
#video .icon-video {
  display: block;
  float: left;
  width: 0.5rem;
  height: 0.8rem;
  background: url(../../assets/images/icon_video.png) no-repeat center center;
  background-size: 0.4rem 0.3rem;
}
</style>