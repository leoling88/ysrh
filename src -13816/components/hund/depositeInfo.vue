<template>
    <div class="section">
    <!-- 余额 -->
    <!-- <div class="balance">
      <div class="userName">
        <span>郑志龙</span>
      </div>
      < 余额信息 ->
      <div class="balance-info">
        <div class="balance-i-text">
          <span>个人账户余额</span>
          <span class="text-red">500998</span>
        </div>
        <div class="balance-i-text">
          <span>月缴存金额</span>
          <span class="text-blue">499</span>
        </div>
      </div>
      <! 余额信息 END>
    </div> -->
    <!-- 余额 END -->
    <!-- 繳存信息 -->
    <div class="pay-li pay-li-old">
        <div class="pay-li-title">缴存信息</div>
      <div class="pay-info">
        <div class="pay-i-content">
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">月缴存基数：</div>
            <div class="pay-i-common">{{userDepositDatas.grjcjs}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">个人月缴存金额（元）：</div>
            <div class="pay-i-common pay-i-red">￥{{userDepositDatas.grjce}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">缴存比例：</div>
            <div class="pay-i-common">{{userDepositDatas.grjcbl*100}}%</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">单位月缴存金额（元）：</div>
            <div class="pay-i-common pay-i-red">￥{{userDepositDatas.dwjce}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">缴存比例：</div>
            <div class="pay-i-common">{{userDepositDatas.dwjcbl*100}}%</div>
          </div>
          <!-- Li END -->
        </div>
      </div>
    </div>
    <!-- 繳存信息 END -->
    <!-- 账号信息 -->
    <div class="pay-li">
        <div class="pay-li-title">账号信息</div>
      <div class="pay-info">
        <div class="pay-i-content">
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">公积金账号：</div>
            <div class="pay-i-common">{{desensitization(userDepositDatas.gjjzh,3)}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">单位登记号：</div>
            <div class="pay-i-common">{{userDepositDatas.dwdjh}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">单位名称：</div>
            <div class="pay-i-common">{{userDepositDatas.dwmc}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">个人编号：</div>
            <div class="pay-i-common">{{userDepositDatas.grbh}}</div>
          </div>
          <!-- Li END -->
          <!-- Li -->
          <div class="pay-i-c-li">
            <div class="pay-i-common">账号状态：</div>
            <div class="pay-i-common">{{userDepositDatas.zhztms}}</div>
          </div>
          <!-- Li END -->
        </div>
      </div>
    </div>

    <!-- 账号信息 END -->
  </div>
</template>
<script>
import baseUrl from "../../api/config";
import api from "../../api/api";
import { mapState } from "vuex";
import mixins from "../../mixins/mixins.js";
export default {
  mixins: [mixins],
  data() {
    return {
      userDepositDatas:{
        grjcjs:'',
        grjce:'',
        grjcbl:'',
        dwjce:'',
        dwjcbl:'',
        gjjzh:'',
        dwdjh:'',
        dwmc:'',
        grbh:'',
        zhztms:''
      },
    };
  },
  computed: {
    ...mapState(["userLoginInfo"])
  },
  created() {
    //判断是否已经登录过,先注释掉，会影响左上角返回首页
//    if(!this.userLoginInfo){
//      this.$router.push({path: '/hund/login'});
//      return false;
//    }
    this.userDeposit();
  },
  methods: {
    userDeposit(){
      // 显示Loading
      this.$vux.loading.show({text: '加载中...'});
      //参数
        let params = {
          gjjzh: this.userLoginInfo.gjjzh,//公积金号
          zjh: this.userLoginInfo.zjh,//身份证
          capinfoSession: this.userLoginInfo.capinfoSession,
        };
        api.userDeposit(params).then((res) => {
          // 隐藏Loading
          this.$vux.loading.hide();
          if (res.data.success) {
            this.userDepositDatas=res.data.jsonRes[0];
            var allObj = Object.assign({openId:this.$Utils.getLocalStorage("openId")},res.data.jsonRes[0]);
            api.gongSave(allObj).then((res) => { //缴存信息保存到越秀后台
              if (res.data.status == 200) {
              }
            });
          }
        });
    },
  }
};
</script>
<style scoped>
/* 余额 */
.balance {
  padding: 20px 0;
  margin-bottom: 20px;
  height: 4rem;
  background: #ffffff;
  border-bottom: solid 1px #cccccc;
}
.balance .userName {
  height: 1rem;
  line-height: 1rem;
  margin-left: 1rem;
  padding: .2rem 0;
}
.balance .userName span {
  font-size: .36rem;
}

.balance .balance-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.balance .balance-info .balance-i-text {
  flex-grow: 1;
  height: 2rem;
}
.balance .balance-info .balance-i-text:nth-of-type(1) {
  border-right: 1px solid #e6e6e6;
}
.balance .balance-info span {
  display: block;
  width: 100%;
  text-align: center;
  color: #353535;
  font-size: 15px;
  height: .8rem;
  line-height: .8rem;
  margin: .1rem 0;
}
.balance .balance-info .text-red {
  color: #f4333c;
  font-size: .36rem;
}

.balance .balance-info .text-blue {
  color: #3389ff;
  font-size: .36rem;
}
/* 繳存信息 */
.pay-li {
  margin-bottom: .8rem;
}
.pay-title {
  font-size: .3rem;
  color: #353535;
  margin-top: .5rem;
}
.pay-info {
  height: 5rem;
  background-color: #ffffff;
  border: solid 1px #cccccc;
}
.pay-info .pay-i-title {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: .9rem;
  line-height: .9rem;
  border-bottom: solid 1px #cccccc;
}
.pay-info .pay-i-title .pay-i-t-status {
  color: #000000;
  font-size: .36rem;
}
.pay-info .pay-i-title .pay-i-t-normal {
  color: #3389ff;
  font-size: .36rem;
}

.pay-info .pay-i-content {
  padding: 0 .4rem;
}
.pay-info .pay-i-content .pay-i-c-li {
  display: flex;
  justify-content: space-between;
  padding: .2rem 0;
}
.pay-info .pay-i-content .pay-i-c-li .pay-i-common {
  color: #888888;
  font-size: .36rem;
}
.pay-info .pay-i-content .pay-i-c-li .pay-i-red {
  color: #f4333c;
}

.pay-info .pay-i-common {
  flex-grow: 1px;
}
.pay-li-title{
    padding: .4rem;
    color: #888888;
    font-size: .4rem;
}
.pay-li-old{
    margin-bottom: 0;
}
</style>
