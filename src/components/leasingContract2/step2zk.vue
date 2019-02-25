<template>
  <div>
    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>申请人信息</span>
        <span @click="gotoAmend" v-if="recordstatus != 1 && recordstatus != 2">修改</span>

      </p>
      <div class="lesing_bg">
        <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{formData.hRecordHirer.realName}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>性别</span>
          <span class="right_size_color">{{formData.hRecordHirer.sex==1?'男':'女'}}</span>
        </div>        
        <div class="one_content flexAuto">
          <span>身份号码</span>
          <span>{{formData.hRecordHirer.idCard}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>学历</span>
          <span>{{formData.hRecordHirer.education}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁备案号</span>
          <span>{{formData.hRecordHirer.hrId}}</span>
        </div>        
        <div class="one_content flexAuto">
          <span>手机号码</span>
          <span>{{formData.hRecordHirer.phone}}</span>
        </div>
      </div>
    </div>
    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>证件图片</span>
      </p>
      <div class="one_content flexAuto imgcon">
        <span v-for="item in imgDatds"><img :src="item" alt=""></span>
      </div>

    </div>
    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>承租房屋信息</span>
        <span></span>
      </p>
      <div class="lesing_bg">
        <div class="one_content flexAuto">
          <span>房屋租金</span>
          <span>{{formData.hRecord.rentPrice}}元</span>
        </div> 
        <div class="one_content flexAuto">
          <span>房屋面积</span>
          <span>{{formData.hRecord.houseArea}}平米</span>
        </div> 
        <div class="one_content flexAuto">
          <span>租赁时间</span>
          <span>{{formData.hRecord.limitTimeStart | formatDatetwo}}至{{formData.hRecord.limitTimeEnd | formatDatetwo}}</span>
        </div>                 
        <div class="one_content flexAuto">
          <span>房屋地址</span>
          <span>{{formData.hRecord.houseAddress}}{{formData.hRecord.streetNo}}{{formData.hRecord.streetLaneNo}}{{formData.hRecord.roomNo}}</span>
        </div>        
        <div class="one_content flexAuto">
          <span>屋主姓名</span>
          <span>{{formData.hRecord.renter}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>屋主性别</span>
          <span class="right_size_color">{{formData.hRecord.sex==1?'男':'女'}}</span>
        </div>        
        <div class="one_content flexAuto">
          <span>屋主身份号码</span>
          <span>{{formData.hRecord.rentNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁备案号</span>
          <span>{{formData.hRecord.agreeNo}}</span>
        </div>        
        <div class="one_content flexAuto">
          <span>屋主手机号码</span>
          <span>{{formData.hRecord.phone}}</span>
        </div>
      </div>
    </div>



    <!-- 申请 -->
    <div  class="btn_style_tow" v-if="recordstatus != 1 && recordstatus != 2" style="margin-bottom:1rem;">
      <!-- <button class="btn_tow" @click="jumpconfirmSuccess">提交</button> -->
      <button class="btn_tow" @click="jumpconfirmSuccess" >提交</button>
    </div>
  </div>
</template>

<script>
import Step from "../common/Step.vue";
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
import utils from "../../script/utils";

export default {
  mixins: [mixins],
  data() {
    return {
      tabs: [
        {
          name: "基本信息",
          value: "1"
        },
        {
          name: "上传材料",
          value: "2"
        },
        {
          name: "核对信息",
          value: "3"
        }
      ],
      oneClickCheck:true,
      recordstatus:this.$route.query.recordstatus,
      id:this.$route.query.id,
      formData:{},
      imgDatds:{},
    }
  },
  mounted() {
    this.requireData()
    document.title = "房屋租赁备案";
  //获取cert_token
    let certToken = this.$Utils.getLocalStorage("certToken");
    //判断是否登是否过期  
    if (certToken) {
      api.validateCertToken({ certToken: certToken }).then(res => {
        if (!res.data.effective) {   //登录过期
          this.$router.push({ path: "/login?openId=" + this.openId });
        }
      });
    }else{
          this.$router.push({ path: "/login?openId=" + this.openId });
    }

  },
  components: {
    Step
  },
  methods: {


    jumpconfirmSuccess(){
      this.oneClickCheck = false
      api.hrecordSub({hrId:this.id}).then(res=>{
        if(res.data.status == "200"){
          this.$store.commit('GET_KEEP_FROMID','')
          this.oneClickCheck = true
          this.$router.push({
            path: "/leasingContract2/confirmSuccess" 
          });
        }
      })
    },
    gotoAmend(){   //返回修改
      this.$router.push("/leasingContract2/step1zk?id="+  this.formData.hRecordHirer.id +"&openId=" +  this.formData.hRecord.createId);
    },

    requireData(){
      api.queryLeaseRecordZK({id:this.id}).then(res=>{
        this.formData = res.data
        let imgs = res.data.hRecordHirer.photo;
        let oimgs = imgs.split(",");// 在每个逗号(,)处进行分解  ["abc", "abcd", "aaa"]
        this.imgDatds = oimgs
        console.log(this.imgDatds)
      })
    },
    jumpconfirmSuccess(){
      api.setLeaseRecordZK({id:this.id}).then(res=>{
        if(res.data.status == "200"){
          this.$router.push({
            path: "/leasingContract2/confirmSuccess" 
          });


        }
      })
    },




    
  },
  filters: {
      formatDatetwo: function (time) {
          var re = /-?\d+/;
          var m = re.exec(time);
          var d = new Date(parseInt(m[0]));
          var o = {
              "M+": d.getMonth() + 1, //month
              "d+": d.getDate(),    //day
              "h+": d.getHours(),   //hour
              "m+": d.getMinutes(), //minute
              "s+": d.getSeconds(), //second
              "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
              "S": d.getMilliseconds() //millisecond
          }
          var format = "yyyy-MM-dd";
          if (/(y+)/.test(format)) {
              format = format.replace(RegExp.$1,(d.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
              if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
              }
          }
          return format;
      }
  } 

};
</script>

<style scope>

.imgcon img{width:100%;}
.btn_tow_one{
    border-radius: 0.1rem;
  font-size: 0.3rem;
  width: 90%;
  height: 1rem;
  background: #ccc;
  outline: none;
  border: 1px solid #fff;
  color: #fff;
  display: inline-block;
  line-height: 1rem;
}
.btn_style_tow{
  width: 100%;
  text-align: center;
  margin: .3rem 0;
}
.btn_tow {
  border-radius: 0.1rem;
  font-size: 0.3rem;
  width: 90%;
  height: 1rem;
  background: #0091ff;
  outline: none;
  border: 1px solid #fff;
  color: #fff;
}
.Lease_photo img {
  width: 2rem;
  height: 2rem;
  margin-right: 0.3rem;
}
.felxStart {
  display: flex;
  justify-content: flex-start;
  flex-wrap:wrap;
  }
.lesing_one {
  background: rgba(245, 245, 245, 1);
  color: #888888;
  height: 100%;
}
.one_content {
  padding: 0.1rem 0.3rem;
}
.one_content img{
  margin-bottom: .3rem;
}
.text_color {
  padding: 0.2rem 0.3rem;
}
.text_color span:last-child{
  color: #588BB1;
}
.lesing_bg {
  background: #fff;
  padding: 0.2rem 0 0.3rem;
  border-bottom:.01rem solid #ccc;
}
.flexAuto {
  display: flex;
  justify-content: space-between;
}
.imgcon{display:block;padding-top:.2rem;background:#fff;}
</style>
