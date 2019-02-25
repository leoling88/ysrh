<template>
  <div>
    <step :step="3" :tabs="tabs"></step>
    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>出租人信息</span>
        <span></span>
      </p>
      <div class="lesing_bg">
        <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{formData.renter}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>证件号码</span>
          <span>{{formData.rentNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>性别</span>
          <span class="right_size_color">{{formData.sex==1?'男':'女'}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>手机号码</span>
          <span>{{formData.phone}}</span>
        </div>
      </div>
    </div>

    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>房屋信息</span>
        <span @click="jumpMissingesss" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg">
        <!-- <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{formData.renter}}</span>
        </div> -->
        <div class="one_content flexAuto">
          <span>租赁合同编号</span>
          <span>{{formData.agreeNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁用途</span>
          <span class="right_size_color">{{formData.purpose}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租金</span>
          <span>{{formData.rentPrice}} 元/月</span>
        </div>
        <div class="one_content flexAuto">
          <span>面积</span>
          <span>{{formData.houseArea}}㎡</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁开始时间</span>
          <span>{{formData.timeStaStr}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>租赁结束时间</span>
          <span>{{formData.timeEndStr}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>现居住地址</span>
          <span>越秀区</span>
        </div>
        <div class="one_content flexAuto">
          <span>街镇</span>
          <span>{{formData.streetNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>街道巷</span>
          <span>{{formData.streetLaneNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>门牌号</span>
          <span>{{formData.doorNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>祥址/房号</span>
          <span>{{formData.roomNo}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>房产证权号</span>
          <span>{{formData.certificate}}</span>
        </div>
      </div>
    </div>

    <div class="lesing_one">
      <p class="text_color flexAuto">
        <span>承租人信息</span>
        <span @click="jumpMissingesss" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg" v-for="(item,index) in listData" :key="index">
        <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{item.realName}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>证件号码</span>
          <span>{{item.idCard}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>性别</span>
          <span class="right_size_color">{{item.sex ==1? '男':'女'}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>手机号码</span>
          <span>{{item.phone}}</span>
        </div>
      </div>
    </div>
    <div class="lesing_one" v-if="upImg.img1.length != 0">
      <p class="text_color flexAuto">
        <span>租赁合同照片</span>
        <span @click="jumpLesingPhotos" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg">
        <div class="one_content felxStart Lease_photo">
          <img :src="item.src" alt v-for="(item,index) in upImg.img1" :key="index">
        </div>
      </div>
    </div>
    <div class="lesing_one" v-if="upImg.img2.length != 0">
      <p class="text_color flexAuto">
        <span>房产证照片</span>
        <span @click="jumpLesingPhotos" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg">
        <div class="one_content felxStart Lease_photo">
          <img :src="item.src" alt v-for="(item,index) in upImg.img2" :key="index">
        </div>
      </div>
    </div>
    <div class="lesing_one" v-if="upImg.img3.length != 0">
      <p class="text_color flexAuto">
        <span>出租人身份证正反面</span>
        <span @click="jumpLesingPhotos" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg">
        <div class="one_content felxStart Lease_photo">
          <img :src="item.src" alt v-for="(item,index) in upImg.img3" :key="index">

        </div>
      </div>
    </div>
    <div class="lesing_one">
      <p class="text_color flexAuto" v-if="upImg.img4.length != 0">
        <span>承租人身份证正反面</span>
        <span @click="jumpLesingPhotos" v-if="recordstatus != 1 && recordstatus != 2">修改</span>
      </p>
      <div class="lesing_bg">
        <div class="one_content felxStart Lease_photo">
          <img :src="item.src" alt v-for="(item,index) in upImg.img4" :key="index">
        </div>
      </div>
    </div>
    <!-- 申请 -->
    <div  class="btn_style_tow" v-if="recordstatus != 1 && recordstatus != 2">
      <!-- <button class="btn_tow" @click="jumpconfirmSuccess">提交</button> -->
      <button class="btn_tow" @click="jumpconfirmSuccess" v-if="oneClickCheck">提交</button>
      <button class="btn_tow_one" v-else>提交</button>
    </div>
  </div>
</template>

<script>
import Step from "../common/Step.vue";
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
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
      fileId:"",
      upImg:{
        img1:[],
        img2:[],
        img3:[],
        img4:[]
      },
      formData:{},
      listData:[],
      oneClickCheck:true,//只能请求一次的判断
      recordstatus:""
    };
  },
  mounted() {
    if(this.$route.query.recordstatus){
      this.recordstatus = this.$route.query.recordstatus
    }
    console.log(this.recordstatus,"22223----")
    document.title = "房屋租赁备案";
    this.getInfoData()
  },
  components: {
    Step
  },
  methods: {
    jumpconfirmSuccess(){
      this.oneClickCheck = false
      api.hrecordSub({hrId:this.formData.id}).then(res=>{
        if(res.data.status == "200"){
          this.$store.commit('GET_KEEP_FROMID','')
          this.$router.push('/leasingContract/confirmSuccess')
          this.oneClickCheck = true
        }
      })
    },
    getInfoData() {
      // let openId = window.localStorage.getItem('openId')
      this.fileId = this.$route.query.id;
      api.databack({ hrId: this.$route.query.id }).then(res => {
        if (res.data.data) {
          api.purpose().then(reslove=>{
            console.log(reslove.data.data,'2222')
            let fileData = res.data.data.file;
          for (let i = 0; i < fileData.length; i++) {
            this.ifShowResloute(
              fileData[i].fileType,
              fileData[i].fId,
              fileData[i].fileUrl
            );
          }
          this.formData=res.data.data.hRecord
          this.listData=res.data.data.hirer
          this.getpurpose(this.formData)
            for(let i = 0; i <reslove.data.data.length;i++){
              if(res.data.data.hRecord.purpose == reslove.data.data[i].value){
                this.formData.purpose=reslove.data.data[i].name
              }
            }
          })

        }
      });
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
    ifShowResloute(type, fId, src) {
      if (type == "1") {
        return this.upImg.img1.push({ src: src, fId: fId });
      } else if (type == "2") {
        return this.upImg.img2.push({ src: src, fId: fId });
      } else if (type == "3") {
        return this.upImg.img3.push({ src: src, fId: fId });
      } else if (type == "4") {
        return this.upImg.img4.push({ src: src, fId: fId });
      }
    },
    jumpMissingesss(){
      this.$router.push('/leasingContract/missingness?id='+this.formData.id)
    },
    jumpLesingPhotos(){
      this.$router.push('/leasingContract/leasingPhotos?id=' + this.formData.id)
    }
  },
};
</script>

<style scope>
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
}
.flexAuto {
  display: flex;
  justify-content: space-between;
}
</style>
