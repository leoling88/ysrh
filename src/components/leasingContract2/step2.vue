<template>
  <div v-if="formData.hRecord.renter">
    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>申请人信息</span>
        <span></span>
      </p>
      <div class="lesing_bg">
        <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{formData.hRecord.renter}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>证件号码</span>
          <span>{{formData.hRecord.rentNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>性别</span>
          <span class="right_size_color">{{formData.hRecord.sex==1?'男':'女'}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>手机号码</span>
          <span>{{formData.hRecord.phone}}</span>
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
        <span>房屋信息</span>
        <span @click="gotoAmend" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg">
        <!-- <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{formData.renter}}</span>
        </div> -->
        <div class="one_content flexAuto">
          <span>租赁合同编号</span>
          <span>{{formData.hRecord.agreeNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁用途</span>
          <span class="right_size_color">{{formData.hRecord.purpose}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租金</span>
          <span>{{formData.hRecord.rentPrice}} 元/月</span>
        </div>
        <div class="one_content flexAuto">
          <span>面积</span>
          <span>{{formData.hRecord.houseArea}}㎡</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁开始时间</span>
          <span>{{formData.hRecord.limitTimeStart | formatDatetwo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁结束时间</span>
          <span>{{formData.hRecord.limitTimeEnd | formatDatetwo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>现居住地址</span>
          <span>越秀区</span>
        </div>
        <div class="one_content flexAuto">
          <span>街镇</span>
          <span>{{formData.hRecord.streetNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>街道巷</span>
          <span>{{formData.hRecord.streetLaneNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>门牌号</span>
          <span>{{formData.hRecord.doorNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>详址/房号</span>
          <span>{{formData.hRecord.roomNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>房产证权号</span>
          <span>{{formData.hRecord.certificate}}</span>
        </div>
      </div>
    </div>

    <div class="lesing_one" v-if="formData.hRecordHirers.length > 0">
      <p class="text_color flexAuto">
        <span>承租人信息</span>
        <span></span>
      </p>
      <div class="lesing_bg" v-for="item in formData.hRecordHirers" >
        <div class="one_content flexAuto" >
          <span>姓名</span>
          <span>{{item.realName}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>证件号码</span>
          <span>{{item.idCard}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>性别</span>
          <span class="right_size_color">{{item.sex==1?'男':'女'}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>手机号码</span>
          <span>{{item.phone}}</span>
        </div>
      </div>
    </div>


    <!-- 申请 -->
    <div  class="btn_style_tow"  v-if="recordstatus != 1 && recordstatus != 2">
      <div>
        <div class="warn-1">*请确认好信息是否正确无误，提交后不能再进行修改</div>
        <button class="btn_tow" @click="alertShow"  v-if="recordstatus == 3">重新提交</button>
        <button class="btn_tow" @click="alertShow"  v-else>提交</button>
        
      </div>

      
    </div>

    <!--弹框-->
    <v-alert v-model="alertVal.show"  @confirm="jumpconfirmSuccess">
      <span slot='title' v-text="alertVal.title"></span>
      <div slot='content'>
          请确认好信息是否正确无误，提交后不能再进行修改
      </div>
    </v-alert>
    <!--弹框end-->



  </div>
</template>

<script>
import Step from "../common/Step.vue";
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
import utils from "../../script/utils";
import alerts from '@/components/common/Alert'

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
      alertVal:{      //提示框
        show: false,
        title: '重要提示',
      },        
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
    Step,
    'v-alert':alerts
  },
  methods: {
    alertShow(){
      this.alertVal.show = true

    },
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
      this.$router.push("/leasingContract2/step1?id="+  this.formData.hRecord.id +"&openId=" +  this.formData.hRecord.createId);
    },

    requireData(){
      api.queryLeaseRecord({id:this.id}).then(res=>{
        this.formData = res.data
        // this.getdataback(this.id)
        let imgs = res.data.hRecord.cardPhoto;
        let oimgs = imgs.split(",");// 在每个逗号(,)处进行分解  ["abc", "abcd", "aaa"]
        this.imgDatds = oimgs
        console.log(this.imgDatds)
        this.getpurpose(res.data.hRecord)
      })
    },
    getpurpose(formData){
     let itemCode= formData.streetNo+','+formData.streetLaneNo+','+formData.doorNo+','+formData.roomNo
     api.areaDetail({itemCode:itemCode}).then(res=>{
       for(let i=0;i<res.data.data.length;i++){
         if(res.data.data[i].level == 4){
           formData.streetNo = res.data.data[i].name
         }else if(res.data.data[i].level == 5){
           formData.streetLaneNo = res.data.data[i].name
         }else if(res.data.data[i].level == 6){
           formData.doorNo = res.data.data[i].name
         }else if(res.data.data[i].level == 7){
           formData.roomNo = res.data.data[i].name
         }
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
.warn-1{padding:.2rem;color:red;}
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
