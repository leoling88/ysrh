<template>
  <div class="container marBot-1">
    <div class="error" v-if="message.show">
      <img src="../../assets/images/error_404.png" alt>
    </div>
    <div class="bg_white newsBody" v-else>
      <div class="news_title">{{article.title}}</div>
      <group class="new_info">
        <cell :title="article.sourceName">
          <!--<span slot="icon" class="xinpIcon"><img src="../../assets/images/xqlogo.png" alt=""></span>-->
          <span slot="inline-desc" class="dzTime">
            <span>{{article.createTime}}</span>
            <!--<span class="dzimg"><img src="../../assets/images/xqdz.png" alt=""></span>-->
            <!--<span>2862</span>-->
          </span>
        </cell>
      </group>
      <div class="news_cont" v-html="article.content"></div>
      <div class="newsBton">
        <a href="javascript:;" @click="thumbsUp">
          <img v-if="article.userLikeStatus == 1" src="../../assets/images/zan1.png" alt>
          <img v-else src="../../assets/images/zan.png" alt>
          <span>{{article.likeCount}}</span>
        </a>
        <!--         <a href="javascript:;">
          <img src="../../assets/images/zhuanfa.png" alt="">
          <span @click="getScript">转发</span>
        </a>-->
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
export default {
  components: { Group, Cell },
  mixins: [mixins],
  data() {
    return {
      openId: this.$route.query.openId,
      informationId: this.$route.query.id,
      article: [],
      message: {
        show: false,
        text: ""
      }
    };
  },
  methods: {
    thumbsUp() {//点赞
      api
        .clickZan({
          informationId: this.informationId,
          openId: this.openId
        })
        .then(res => {
          const _data = res.data;
          if (_data.status == 200) {
            if (this.article.userLikeStatus == 0) {
              this.article.userLikeStatus = true;
              this.article.likeCount = this.article.likeCount + 1;
            } else if (this.article.userLikeStatus == 1) {
              this.article.userLikeStatus = false;
              this.article.likeCount = this.article.likeCount - 1;
            }
          }
        });
        this.getsaveUserInformationTitle(this.openId,this.informationId,2);
    },
    queryArtData() {
      //获取资讯列表
      api
        .queryNEWSArt({
          informationId: this.informationId,
          openId: this.openId
        })
        .then(res => {
          const _data = res.data;
          if (_data.status == 200) {
            this.article = _data.data;
            console.log(this.article);
          } else {
            this.message.show = true;
            this.message.text = _data.msg;
          }
        });
    },
    getScript() {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
          dataType: "script",
          cache: true
        })
          .done(function() {
            resolve(window.wx);
          })
          .fail(function(error) {
            reject(error);
          });
      });
    },
    getsaveUserInformationTitle(openId, id, type) {
      //资讯打标
      api
        .saveUserInformationTitle(openId, id, type)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  },
  created() {},
  mounted() {
    this.queryArtData();
    this.getsaveUserInformationTitle(this.openId,this.informationId,1);
  }
};
</script>
<style lang="less" scoped>
.marBot-1 {
  margin-bottom: 1rem;
}
</style>
