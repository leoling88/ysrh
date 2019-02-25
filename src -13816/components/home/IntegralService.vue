<template>
  <div class="container">
    <div class="zhotop">
      <div class="zhotop1">实际得分</div>
      <div class="zhotop2">{{allfen}}</div>
      <div class="zhotop3">您的积分已超过{{baifenb}}%的用户</div>
    </div>
    <div class="bg_white">
      <cell title="我的得分详情" :is-link="true">
      </cell>
    </div>
    <group class="modelGroup"  title="推荐以下服务提升您的积分">
      <cell title="献血预约" :is-link="true" inline-desc="每次献血加2分，最多可加12分">
        <span slot="icon" class="xinpIcon"><img src="../../assets/images/xianxue.png" alt=""></span>
      </cell>
      <cell title="义工招聘" :is-link="true" inline-desc="做义工每次加2分，最多可加6分">
        <span slot="icon" class="xinpIcon"><img src="../../assets/images/yigong.png" alt=""></span>
      </cell>
      <cell title="职业资格证书" :is-link="true" inline-desc="考取职级资格证书最多可加18分">
        <span slot="icon" class="xinpIcon"><img src="../../assets/images/zhiye.png" alt=""></span>
      </cell>
    </group>
    <group class="modelGroup"  title="积分制服务">
      <cell title="积分制入户" :is-link="true"></cell>
      <cell title="积分制入学" :is-link="true"></cell>
      <cell title="积分制申请公租房" :is-link="true"></cell>
    </group>
    <group class="modelGroup mb100"  title="积分申请">
      <cell title="积分制注册" :is-link="true"></cell>
      <cell title="积分模拟计算" :is-link="true"></cell>
      <cell title="积分申请" :is-link="true"></cell>
      <cell title="积分调整" :is-link="true"></cell>
    </group>
  </div>
</template>
<script>
  import { Group, Cell} from 'vux';
  import api from '../../api/api.js';
  export default{
        components: {Group, Cell},
        data () {
            return {
              allfen:'',
              baifenb:''
            }
        },
        methods: {
        },
      mounted () {
        this.baifenb = Math.floor(Math.random()*20 + 30);//取随机数
        this.allfen = Math.floor(Math.random()*10 + 150);//取随机数
        }

    }
</script>
<style lang="less" scoped>
  .zhotop{
    background:url("../../assets/images/jfservice.png") no-repeat;background-size:cover;width:100%;text-align:center;color:#fff;padding:.30rem 0 .46rem;height:3.84rem;margin-bottom:.28rem;
    .zhotop1{font-size:.34rem;}
    .zhotop2{font-size:1.60rem;font-weight: bold;line-height:normal;}
    .zhotop3{font-size:.26rem;}
  }
</style>
<style>
  .modelGroup .weui-cells{background-color:#fff !important;}
  .modelGroup .xinpIcon img{width:.64rem;vertical-align:middle;}
  .modelGroup .vux-label{font-size:.34rem !important;color:#000 !important;}
  .modelGroup .vux-label-desc{font-size:.28rem !important;color:#888 !important;}
</style>
