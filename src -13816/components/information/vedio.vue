<template>
  <div class="container">
    <div>
      <iframe class="video_iframe" style="z-index:1;" src="http://v.qq.com/iframe/player.html?vid=x0765dvcrzy&amp;auto=0" allowfullscreen="" frameborder="0" ></iframe>
    </div>
  </div>
</template>
<script>
  import mixins from "../../mixins/mixins.js";
  export default {
    components: {},
    mixins: [mixins],
    data() {
      return {
      }
    },
    methods: {
    },
    created () {
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
  .video_iframe{width:7.5rem;height:3.4rem;position:absolute;top:50%;margin-top:-1.7rem;}
  .tvp_poster_img{background-size:cover !important;}
</style>
