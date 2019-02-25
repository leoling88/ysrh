<template>
    <div class="container" >

        <div id="video">
          <v-swiper :swiperLists = "imgLists" :swinperView="swinper" @clickView="swiperLink"></v-swiper>
        </div>
        <div class="mb200">
          <div>
            <tab bar-active-color="#0091FF" active-color="#0091FF" :line-width=2>
              <span v-for="(item, index) in tab" v-if="index < 4"  class="tab-list">
                <tab-item :selected="index == 0" @on-item-click="onItemClick">{{item.firstClass}}</tab-item >                
              </span>

            </tab>
            <div>
              <div v-show="tabitemIndex == 0" class="tabList">
                <div class="news" v-for="item in lists.list1">
                  <router-link :to="{path:'../article?openId='+ openId +'&id='+ item.id}">
                    <div class="newsCon">
                      <div class="newsTitle">{{item.title}}</div>
                      <div class="newsTime">{{item.sourceName}} {{item.updateTime | ellipsis}}</div>
                    </div>
                    <div class="newsImg"><img :src="item.headUrl"/></div>
                  </router-link>
                </div>
                <div v-if="lists.list1.length < 1" class="mess-1">暂无数据！</div>
              </div>
              <div v-show="tabitemIndex == 1" class="tabList">
                <div class="news" v-for="item in lists.list2">
                  <router-link :to="{path:'../article?openId='+ openId +'&id='+ item.id}">
                    <div class="newsCon">
                      <div class="newsTitle">{{item.title}}</div>
                      <div class="newsTime">{{item.sourceName}} {{item.updateTime | ellipsis}}</div>
                    </div>
                    <div class="newsImg"><img :src="item.headUrl"/></div>
                  </router-link>
                </div>
                <div v-if="lists.list2.length < 1" class="mess-1">暂无数据！</div>
              </div>
              <div v-show="tabitemIndex == 2" class="tabList">
                <div class="news" v-for="item in lists.list3">
                  <router-link :to="{path:'../article?openId='+ openId +'&id='+ item.id}">
                    <div class="newsCon">
                      <div class="newsTitle">{{item.title}}</div>
                      <div class="newsTime">{{item.sourceName}} {{item.updateTime | ellipsis}}</div>
                    </div>
                    <div class="newsImg"><img :src="item.headUrl"/></div>
                  </router-link>
                </div>
                <div v-if="lists.list3.length < 1" class="mess-1">暂无数据！</div>
              </div>              
              <div v-show="tabitemIndex == 3" class="tabList">
                <div class="news" v-for="item in lists.list4">
                  <router-link :to="{path:'../article?openId='+ openId +'&id='+ item.id}">
                    <div class="newsCon">
                      <div class="newsTitle">{{item.title}}</div>
                      <div class="newsTime">{{item.sourceName}} {{item.updateTime | ellipsis}}</div>
                    </div>
                    <div class="newsImg"><img :src="item.headUrl"/></div>
                  </router-link>
                </div>
                <div v-if="lists.list4.length < 1" class="mess-1">暂无数据！</div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import {Tab, TabItem, Search, Swiper} from 'vux';
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
import { videoPlayer } from 'vue-video-player';
import navbar  from '@/components/common/navbar.vue'
import swipers from '@/components/common/swiper'
export default {
  components: {Tab, TabItem, Search, 'v-swiper':swipers, videoPlayer,navbar},
  mixins: [mixins],
  props: {
    openidvalue: Object,
    /*swipers*/
    swiperLists: Array,
    swinperView: Object,
  },
  data() {
    return {
      tabitemIndex:'0',
      openId: this.$route.query.openId,
      swinper:{     //轮播
        left:0,
        width:'',
        ulWidth:'',
        length:'',
        page:'',
        title:'',
        titleShow: true,
        about:'',
        aboutShow: true,
        hover:'',
        viewX: document.body.clientWidth,
        pageX:.17,
        clickValue:'',
      },
      imgLists:[],
      tab:[],
      lists:{
        list1:[],
        list2:[],
        list3:[],
        list4:[],
      },
      seggustId: '',
      sizeNum: 50,
      page1:1,
      page2:1,
      page3:1,
      page4:1,      
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          title:"标题",
          src: "" //url地址
        }],
        titleShow:true,
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }


    };
  },
  methods: {
    swiperLink() {
      const id = this.swinper.clickValue
      window.location.href = id
    },


    requireTabDatas(){    //获取资讯分类
      api.requireNewsTab().then((res)=>{
        const _data = res.data
        if(_data.status == 200){
          this.tab = _data.data
          this.requireListDatas(0, this.tab[0].id)
        }
      });
    },
    requireSwiper(){
      api.requireNewsSwiper({
         pageSize: 100, 
         pageNum: 1,         
      }).then((res)=>{
        const _data = res.data
        let _odata
        if(_data.status == 200){
          // this.swiperList = _data.data
          for(var i = 0; i < _data.data.length; i ++){
            this.imgLists.push({
              'headUrl': _data.data[i].imageUrl,
              'title':  _data.data[i].name,
              'id': _data.data[i].videoUrl
            })
          console.log( this.imgLists)

        }

        }
      });
    },
    requireListDatas(index, id){
      let _pageNum 
      if( index == 0) _pageNum = this.page1
      else if( index == 1) _pageNum = this.page2
      else if( index == 2) _pageNum = this.page3
      else if( index == 3) _pageNum = this.page4
      api.requireNewsTabLists({
        seggustId: id,
        pageNum: _pageNum,
        pageSize: this.sizeNum        
      }).then((res)=>{
        const _data = res.data
        if(_data.status == 200){
          if(index == 0) this.lists.list1 = _data.data
          else if (index == 1) this.lists.list2 = _data.data
          else if (index == 2) this.lists.list3 = _data.data
          else if (index == 3) this.lists.list4 = _data.data
        }else{

        }
      });

    },
    onItemClick (index){
      this.tabitemIndex = index;
      if(index == 0 && this.lists.list1.length < 1 || index == 1 && this.lists.list2.length < 1  || index == 2 && this.lists.list3.length < 1 || index == 3 && this.lists.list4.length < 1){
        this.requireListDatas(index, this.tab[index].id)
      }


    },
    yxdetailClick(index) {
      this.$router.push({path:'/yuexiu1/' + index});
    },
    rhdetailClick(index) {
      this.$router.push({path:'/ronghe1/' + index});
    },
    onPlayerPlay(player) {
      this.playerOptions.titleShow = false
    },
    onPlayerPause(player){
    this.playerOptions.titleShow = true

    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },

  mounted() {
    
    this.requireTabDatas()
    this.requireSwiper()
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length >10) {
        return value.slice(0,10) 
      }
      return value
    }

  }

};
</script>
<style lang="less" scoped>
.container {
  width:100%;
  max-width: 7.5rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.video-1{position: relative;overflow:hidden;}
.video-title{width:100%; position: absolute;z-index:200; color:#fff;bottom:0;left:0;padding:.2rem 0;text-indent:.2rem;background:#000;opacity:.8;}
.mess-1{ padding:.5rem 0;text-align:center;color:#888; }
.animation-bot-out{
-webkit-animation:fadeOutDown 1s .2s ease both;
-moz-animation:fadeOutDown 1s .2s ease both;}
@-webkit-keyframes fadeOutDown{
0%{opacity:1;
-webkit-transform:translateY(0)}
100%{opacity:0;
-webkit-transform:translateY(200px)}
}
@-moz-keyframes fadeOutDown{
0%{opacity:1;
-moz-transform:translateY(0)}
100%{opacity:0;
-moz-transform:translateY(200px)}
}
.video-js .vjs-big-play-button{}
.vux-tab-container .tab-list{display: block;width:25%;}
</style>
