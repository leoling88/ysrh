<template>
  <div class="box">
    <div class="labelbox">
      <div class="userpic">
        <img :src="headPic" class="img">
        <ul class="tagbox baseTitle">
          <!-- 红色 -->
          <li class="tag" v-for="(item,index) in baseTitle" :key="index">{{item}}</li>
        </ul>
        <ul class="tagbox activityTitle">
          <li class="tag" v-for="(item,index) in activityTitle" :key="item">{{item}}</li>
        </ul>
        <ul class="tagbox courseTitle">
          <li class="tag" v-for="(item,index) in courseTitle" :key="item">{{item}}</li>
        </ul>
        <ul class="tagbox informationTitle">
          <li class="tag" v-for="(item,index) in informationTitle" :key="item">{{item}}</li>
        </ul>
        <ul class="tagbox partyDevelopTitle">
          <li class="tag" v-for="(item,index) in partyDevelopTitle" :key="item">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="service-title" v-if="serverList">相关服务推荐</div>
    <div class="service-bus" v-if="serverList">
      <group v-for="(item,index) in serverList" :key="index">
        <div @click="linkactive(item.type,item.id)">
          <cell class="modelTitle modelTitle_my" :title="item.name" :is-link="true"></cell>
        </div>
      </group>
    </div>
  </div>
</template>


<script>
import { Group, Cell } from "vux";
import mixins from "../../mixins/mixins.js";
import api from "../../api/api.js";
import defaultheadPic from '../../assets/images/icon_user_header.png'
export default {
  name: "mylabel",
  mixins: [mixins],
  data() {
    return {
      openId: window.localStorage.getItem("openId"),
      headPic:defaultheadPic,
      baseTitle:[], //基础数据
      activityTitle:[], //融合活动
      courseTitle:[], //融合课堂
      informationTitle:[], //资讯
      partyDevelopTitle:[], //党建
      tagList: [],
      serverList: [] //推荐服务列表
    };
  },
  mounted() {
    let openId = window.localStorage.getItem("openId");
    this.getuserTitle(openId);
    this.getprivateRecommend(window.localStorage.getItem("openId"), 1, 10);
  },
  methods: {
    // this.$Utils.getLocalStorage("openId")
    getuserTitle(openId) {
      console.log(openId, "openId");
      api
        .userTitle(openId.replace(/\"/g, ""))
        .then(res => {
          console.log(res, "个人标签");
          this.baseTitle = res.data.data.baseTitle;
          this.activityTitle = res.data.data.activityTitle;
          this.courseTitle = res.data.data.courseTitle;
          this.informationTitle = res.data.data.informationTitle;
          this.partyDevelopTitle = res.data.data.partyDevelopTitle;
          if (this.baseTitle.length > 5) {
            this.baseTitle.length = 5;
          }
          if (this.activityTitle.length > 5) {
            this.activityTitle.length = 5;
          }
          if (this.courseTitle.length > 3) {
            this.courseTitle.length = 3;
          }
          if (this.informationTitle.length > 3) {
            this.informationTitle.length = 3;
          }
          if (this.partyDevelopTitle.length > 2) {
            this.partyDevelopTitle.length = 2;
          }
          this.headPic =
            res.data.data.headPic ||
            this.headPic;
        })
        .catch(err => {
          console.log(err, "获取标签失败");
        });
    },
    getprivateRecommend(openId, page, size) {
      //获取个性化推荐 *  返回推荐项类型1:资讯 2:融合活动 3:党建活动 4:融合学堂 5:业务
      api
        .privateRecommend(openId, page, size)
        .then(res => {
          this.serverList = res.data.data;
          console.log(this.serverList, "res");
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    linkactive(type, id) {
      //个性推荐跳转 1:资讯 2:融合活动 3:党建活动 4:融合学堂 5:业务
      switch (type) {
        case "1":
          this.$router.push(`../article?openId=${this.openId}&id=${id}`);
          braek;
        case "2":
          this.$router.push(`../article2/${this.openId}/rh02/${id}`);
          break;
        case "3":
          this.$router.push(`../article2/${this.openId}/dj01/${id}`);
          break;
        case "4":
          this.$router.push(`/ronghexuetang/${this.openId}/rh01`);
          break;
        case "5":
          // this.$router.push(`../article2/${this.openId}/dj01/${id}`);
          break;
        default:
          break;
      }
      // console.log(type, id, "跳转");
    }
  },
  components: { Group, Cell }
};
</script>

<style scope>
.box {
  background: #f5f5f5;
  height: auto;
}
.labelbox {
  height: 6.6rem;
  background: #fff;
  /* position: relative; */
  overflow: hidden;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
}
.userpic {
  position: relative;
  width: 100%;
  height: 3.28rem;
  /* background: pink; */
  border-radius: 50%;
  /* top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto; */
}
.userpic .img{display:block;width:3.28rem;margin:auto;}
.userpic img {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  vertical-align: middle;
}
.service-title {
  margin: 0.3rem;
  font-size: 0.28rem;
  color: #888;
}
.service-bus {
  background: #fff;
}
.tagbox {
  position: absolute;
  top: -1rem;
  width: 100%;
  height:6rem;
}
.tagbox li {
  position: absolute;
  padding: 0.08rem 0.1rem;
  border-radius: 2px 2px 12px 2px;
  font-size: 0.28rem;
  display: inline;
}
.baseTitle li:nth-child(1) {
  top: 0;
  left: 1rem;
}
.baseTitle li:nth-child(2) {
  top: .8rem;
  left:.3rem;
}
.baseTitle li:nth-child(3) {
  top:5rem;
  left:1rem;
}
.baseTitle li:nth-child(4) {
  top: 0rem;
  right: 1rem;
}
.baseTitle li:nth-child(5) {
  top: 0.4rem;
  right:.5rem;
}
.baseTitle li:nth-child(6) {
  top: 1rem;
  left: 0.2rem;
}
.baseTitle li:nth-child(7) {
  top: 1rem;
  right: 0rem;
}
.baseTitle li:nth-child(8) {
  top: 5rem;
  right: 0rem;
}
.baseTitle li:nth-child(9) {
  top: 5.2rem;
  right:1.6rem;
}
.baseTitle li:nth-child(10) {
  top: 5.5rem;
  right: 0rem;
}
.baseTitle li:nth-child(11) {
  top: 2rem;
  right: -2rem;
}
.baseTitle li:nth-child(12) {
  top: 2.8rem;
  right: -2rem;
}
.activityTitle li:nth-child(1) {
  top: 4.3rem;
  left: .1rem;
}
.activityTitle li:nth-child(2) {
  top: 2rem;
  left:.3rem;
}
.activityTitle li:nth-child(3) {
  top: 2.7rem;
  left: .08rem;
}
.activityTitle li:nth-child(4) {
  top: .8rem;
  right: 1.8rem;
}
.activityTitle li:nth-child(5) {
  top: 2rem;
  right:0rem;
}
.courseTitle li:nth-child(1) {
  top: 4.3rem;
  right: 2.5rem;
}
.courseTitle li:nth-child(2) {
  top: 5rem;
  right: 2rem;
}
.courseTitle li:nth-child(3) {
  top: 4rem;
  right:.4rem;
}
.courseTitle li:nth-child(4) {
  top: 1rem;
  right: 0.1rem;
}
.courseTitle li:nth-child(5) {
  top: 3rem;
  right: 1rem;
}
.informationTitle li:nth-child(1) {
  top: 3.6rem;
  left:.2rem;
}
.informationTitle li:nth-child(2) {
  top: 2.8rem;
  left:1.4rem;
}
.informationTitle li:nth-child(3) {
  top: 1rem;
  left: 1.3rem;
}
.partyDevelopTitle li:nth-child(1) {
  max-width:1.8rem;
  top: -.5rem;
  left: 3.2rem;
}
.partyDevelopTitle li:nth-child(2) {
  top: 2rem;
  right: .5rem;
}
.partyDevelopTitle li:nth-child(3) {
  top: 4.7rem;
  right:.2rem;
}
.baseTitle li {
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
}
.activityTitle li {
  border: 1px solid #3dabff;
  color: #3dabff;
}
.courseTitle li {
  border: 1px solid #00cc88;
  color: #00cc88;
}
.informationTitle li {
  border: 1px solid aqua;
  color: aqua;
}
.partyDevelopTitle li {
  border: 1px solid pink;
  color: pink;
}
</style>
