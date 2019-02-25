<template>
  <div class="box">
    <!-- 租客 :to="{path:'../leasingContract2/step1?openId='+ openId}"-->   
    <router-link class="rent_item" tag="div" to="/leasingContract?type=1">
      <div class="tenants">
        <p class="text-blod">我是承租人</p>
        <span class="text-dec">填写租客信息</span>
      </div>
      <div class="pic1"></div>
    </router-link>
    <!-- 房东 :to="{path:'../leasingContract2/step1zk?openId='+ openId}-->
    <router-link class="rent_item" tag="div" to="/leasingContract?type=2">
      <div class="landlord">
        <p class="text-blod">我是出租人</p>
        <span class="text-dec">填写房东信息</span>
      </div>
      <div class="pic2"></div>
    </router-link>
  </div>
</template>

<script>
import mixins from "../../mixins/mixins.js";
export default {
  mixins: [mixins],
  data() {
    return {
      openId: this.$route.query.openId,
      
    };
  },
  mounted() {
    document.title = "房屋租赁备案";
  },
  methods: {
    // goinputdate() {
    //   this.$router.push({
    //     path: "/leasingContract/missingness",
    //     name: "missingness",
    //     query: {
    //       type: 1
    //     }
    //   });
    // }
  },
  components: {}
};
</script>

<style scoped>
.box {
  padding: 0.4rem 0.3rem;
}
.rent_item {
  width: 6.9rem;
  height: 2.2rem;
  border: 1px solid #eaeaea;
  margin: 0.2rem 0;
  display: flex;
  align-items: center;
}
.tenants,
.landlord,
.pic1,
.pic2 {
  flex: 1;
  text-align: center;
  /* position: relative; */
  line-height: 0.6rem;
}
.text-blod {
  font-size: 0.42rem;
  font-weight: 700;
}
.text-dec {
  font-size: 0.28rem;
  color: #888;
}
.pic1 {
  width: 2rem;
  height: 2rem;
  background: url(../../../static/images/chengzu.png) center center no-repeat;
  background-size: 80%;
}
.pic2 {
  width: 2rem;
  height: 2rem;
  background: url(../../../static/images/fangdong.png) center center no-repeat;
  background-size: 80%;
}
</style>
