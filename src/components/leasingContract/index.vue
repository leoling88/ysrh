<template>
  <div class="lesing_content">
    <div v-if="recordList.length>0" style="margin-bottom:2rem;">
      <!--房东-->
      <div v-for="(item,index) in recordList" :key="index" v-if="type == 2">
        <div class="lesing_one" @click="viewDetail(item.recordStatus,item.id,item.applicantType)">
          <p class="text_color">备案记录0{{index+1}}</p>
          <div class="lesing_bg">
            <div class="one_content flexAuto">
              <span>申请日期</span>
              <span class="one_content_right_color">{{item.createTime | formatDatetwo}}</span>
            </div>
            <div class="one_content flexAuto">
              <span>备案地址</span>
              <span class="one_content_right_color">越秀区 {{item.houseAddress}}</span>
            </div>
            <div class="one_content flexAuto">
              <span>备案状态</span>
              <span
                class="right_size_color"
              >{{item.recordStatus=='0'?"未提交":item.recordStatus=='1'?"审核中":item.recordStatus=='2'?"已备案":"已撤销"}}</span>
              <!--  0.未提交 资料填写    1.审核中 提交页    2.已备案  提交页    3.已撤销 资料填写 -->
            </div>
            <!-- 撤销 -->
            <div class="btn_style" v-if="item.recordStatus=='1'">
              <button class="btn_one" @click.stop="delhrecor(index,item.id)">撤销申请</button>
            </div>
          </div>
        </div>
      </div>
      <!--租客-->

      <div v-for="(item,index) in recordList" :key="index" v-if="type == 1">
        <div class="lesing_one" @click="viewDetail(item.auditStatus,item.id,item.applicantType)">
          <p class="text_color">备案记录0{{index+1}}</p>
          <div class="lesing_bg">
            <div class="one_content flexAuto">
              <span>申请日期</span>
              <span class="one_content_right_color">{{item.createTime | formatDatetwo}}</span>
            </div>
            <div class="one_content flexAuto">
              <span>备案地址</span>
              <span class="one_content_right_color">越秀区 {{item.addressDetail}}</span>
            </div>

            <div class="one_content flexAuto">
              <span>备案状态</span>
              <span
                class="right_size_color"
              >{{item.auditStatus=='0'?"未提交":item.auditStatus=='1'?"审核中":item.auditStatus=='2'?"已备案":"已撤销"}}</span>
              <!--  0.未提交 资料填写    1.审核中 提交页    2.已备案  提交页    3.已撤销 资料填写 -->
            </div>
            <!-- 撤销 -->
            <div class="btn_style" v-if="item.auditStatus=='1'">
              <button class="btn_one" @click.stop="delhrecor(index,item.id)">撤销申请</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 备案 1-->



      <!-- 申请 -->
    </div>
    <div v-else class="norerecord">您还没有提交备案申请记录</div>
    <div class="btn_style_tow" :class="[recordList.length>0?'':'nodatamargin']">
      <button class="btn_tow" @click="jumpRestchoose">{{butText}}</button>
    </div>
    <confirm v-model="showconfirm" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;">确定撤销申请吗?</p>
    </confirm>
  </div>
</template>

<script>
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
import { Confirm } from "vux";
export default {
  mixins: [mixins],
  data() {
    return {
      butText:"房东房屋租赁备案申请",
      footerType: "1",
      recordList: [],
      type: this.$route.query.type,    //用户类型：1.房客，2.房东
      openId: this.$route.query.openId,
      showconfirm: false,
      linknext: false,
      index: "",
      id: ""
    };
  },
  components: { Confirm },
  created() {
    let openId = window.localStorage.getItem("openId");
    this.openId = this.$route.query.openId || openId.replace(/\"/g, "");
  },
  mounted() {
    document.title = "房屋租赁备案";
    this.getRecordList();
    console.log(this.openId);
  },
  methods: {
    jumpRestchoose() {
      // recordList
      if(this.type == 2){
        this.butText = "房东租赁备案申请"
        let num = 1;
        if (this.recordList) {
          console.log(this.recordList);
          for (let i = 0; i < this.recordList.length; i++) {
            console.log(this.recordList[i]);
            if (this.recordList[i].recordStatus == 0) {
              num = 0;
            }
          }
          this.getRecordStatus(num);
        } else {
          this.$router.push({  
            path: "/leasingContract2/step1?openId="+ this.openId
          });
        }

      }else if(this.type == 1){
        this.butText = "租客租赁备案申请"
        let num = 1;
        if (this.recordList) {
          for (let i = 0; i < this.recordList.length; i++) {
            if (this.recordList[i].auditStatus == 0) {
              num = 0;
            }
          }
          this.getRecordStatus(num);
        } else {
          this.$router.push({
            path: "/leasingContract2/step1zk?openId="+ this.openId
          });
        }

      }



    },
    getRecordList() {
      if(this.type == 2){
        this.butText = "房东房屋租赁备案申请"
        //房东获取房屋备案列表 this.openId
        api
          .recordListNew({
            openId: this.openId,
            page: '1',
            limit: '100'

          })
          .then(res => {
            if (res.data.code == 0) {
              //有值
              this.recordList = res.data.data;
            } else {
              this.recordList = [];
            }
            console.log(res, "列表");
          })
          .catch(err => {
            console.log(err, "错误");
          });        
        }else if(this.type == 1){
          this.butText = "租客房屋租赁备案申请"
          //租客获取房屋备案列表 this.openId
          api
            .recordListNewZK({
              openId: this.openId,
              page: '1',
              limit: '100'

            })
            .then(res => {
              if (res.data.code == 0) {
                //有值
                this.recordList = res.data.data;
              } else {
                this.recordList = [];
              }
              console.log(res, "列表");
            })
            .catch(err => {
              console.log(err, "错误");
            }); 
        }

    },
    getRecordStatus(status) {
      switch (status) {
        case 0:
          this.$store.commit(
            "SHOWTOAST",
            "您还有未提交的备案申请,请先提交后再申请!"
          );
          console.log("不能跳转");
          break;
        default:
          console.log("能跳转");
          this.$store.commit("GET_KEEP_FROMID", "");
          if(this.type == 2){
            this.$router.push({  
              path: "/leasingContract2/step1?openId="+ this.openId
            });            
          }else if(this.type == 1){
            this.$router.push({  
              path: "/leasingContract2/step1zk?openId="+ this.openId
            });    
          }




          break;
      }
    },
    viewDetail(recordstatus, id, Type) {
      //点击列表带房屋id跳转
      if(this.type == 2){
        this.$router.push("/leasingContract2/step2?id="+ id +"&recordstatus=" + recordstatus);

      }else if(this.type == 1){
        this.$router.push("/leasingContract2/step2zk?id="+ id +"&recordstatus=" + recordstatus);
      }
    },
    delhrecor(index, id) {
      //删除承租人
      console.log(index, id);
      this.index = index;
      this.id = id;
      this.showconfirm = true;
      this.listData.splice(e, 1);
    },
    onCancel(e) {
      this.showconfirm = false;
      // console.log(e);
    },
    onConfirm(e) {
      
      if(this.type == 2){  //确认删除出租人
        api
          .dataRevoke({ hrId: this.id })
          .then(res => {
            // console.log(res,'撤销成功')
            this.$store.commit("SHOWTOAST", "撤销成功!");
            this.getRecordList();
          })
          .catch(err => {
            this.$store.commit("SHOWTOAST", "撤销失败!");
            // console.log(err,'撤销失败')
          });
          this.recordList.splice(this.index, 1);        
      }else if(this.type == 1){   //确认删除承租人
        api
          .dataRevokeZK({ hrId: this.id })
          .then(res => {
            // console.log(res,'撤销成功')
            this.$store.commit("SHOWTOAST", "撤销成功!");
            this.getRecordList();
          })
          .catch(err => {
            this.$store.commit("SHOWTOAST", "撤销失败!");
            // console.log(err,'撤销失败')
          });
          this.recordList.splice(this.index, 1);
      }

    }
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
<style>
body {
  height: 100%;
}
html {
  height: 100%;
}
</style>

<style scoped>
.lesing_content {
  background: rgba(245, 245, 245, 1);
  color: #888888;
  height: 100%;
  position: relative;
}
.one_content {
  padding: 0.1rem 0.3rem;
}
.one_content_right_color {
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
}
.right_size_color {
  color: #0091ff;
}
.text_color {
  padding: 0.2rem 0.3rem;
}
.lesing_bg {
  background: #fff;
  padding: 0.2rem 0 0.3rem;
}
.flexAuto {
  display: flex;
  justify-content: space-between;
}
.btn_style {
  text-align: center;
  margin-top: 0.2rem;
}
.btn_style_tow {
  /* position: absolute;
  bottom: 0.3rem; */
  margin: 0.3rem 0;
  width: 100%;
  text-align: center;
}
.nodatamargin {
  margin-top: 5rem;
}
.btn_one {
  border-radius: 0.1rem;
  font-size: 0.3rem;
  width: 90%;
  height: 1rem;
  background: #fff;
  outline: none;
  border: 1px solid #0091ff;
  color: #0091ff;
}
.btn_tow {
  border-radius: 0.1rem;
  font-size: 0.34rem;
  width: 90%;
  height: 1rem;
  background: #0091ff;
  outline: none;
  border: 1px solid #fff;
  color: #fff;
  position: fixed;
  bottom:.5rem;
  left:5%;
}
.norerecord {
  padding: 2rem 0.3rem;
  font-size: 0.26rem;
  text-align: center;
}
</style>
