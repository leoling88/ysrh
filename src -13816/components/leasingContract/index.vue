<template>
  <div class="lesing_content">
    <div v-if="recordList.length>0">
      <div v-for="(item,index) in recordList" :key="index">
        <div class="lesing_one" @click="viewDetail(item.recordstatus,item.id,item.applicantType)">
          <p class="text_color">备案记录0{{index+1}}</p>
          <div class="lesing_bg">
            <div class="one_content flexAuto">
              <span>申请日期</span>
              <span class="one_content_right_color">{{item.applicationDate}}</span>
            </div>
            <div class="one_content flexAuto">
              <span>备案地址</span>
              <span class="one_content_right_color">{{item.houseAddress}}</span>
            </div>
            <div class="one_content flexAuto">
              <span>备案状态</span>
              <span
                class="right_size_color"
              >{{item.recordstatus=='0'?"未提交":item.recordstatus=='1'?"审核中":item.recordstatus=='2'?"已备案":"已撤销"}}</span>
              <!--  0.未提交 资料填写    1.审核中 提交页    2.已备案  提交页    3.已撤销 资料填写 -->
            </div>
            <!-- 撤销 -->
            <div class="btn_style" v-if="item.recordstatus=='1'">
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
      <button class="btn_tow" @click="jumpRestchoose">房屋租赁备案申请</button>
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
      footerType: "1",
      recordList: [],
      openId: "",
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
      let num = 1;
      if (this.recordList.length > 0) {
        console.log(this.recordList);
        for (let i = 0; i < this.recordList.length; i++) {
          console.log(this.recordList[i]);
          if (this.recordList[i].recordstatus == 0) {
            num = 0;
          }
        }
        this.getRecordStatus(num);
      } else {
        this.$store.commit("GET_KEEP_FROMID", "");
        this.$router.push("/leasingContract/restchoose");
      }
    },
    getRecordList() {
      //获取房屋备案列表 this.openId 'on7gH53PTNfxYqy4irP6qr3f13qE'
      api
        .recordList({ openId: this.openId })
        .then(res => {
          if (res.data.status == 200) {
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
          this.$router.push("/leasingContract/restchoose");
          break;
      }
    },
    viewDetail(recordstatus, id, Type) {
      //点击列表带房屋id跳转
      console.log(recordstatus, id);
      if (recordstatus == 0 || recordstatus == 3) {
        this.$router.push(
          "/leasingContract/missingness?id=" + id + "&Type=" + Type
        );
      } else if (recordstatus == 1 || recordstatus == 2) {
        this.$router.push(
          "/leasingContract/confirm?id=" + id + "&recordstatus=" + recordstatus
        );
      }
    },
    delhrecor(index, id) {
      //删除承租人
      console.log(index, id);
      this.index = index;
      this.id = id;
      this.showconfirm = true;
      // this.listData.splice(e, 1);
    },
    onCancel(e) {
      this.showconfirm = false;
      // console.log(e);
    },
    onConfirm(e) {
      //确认删除承租人
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
      // this.recordList.splice(this.index, 1);
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  margin: 0.3rem 0;
}
.norerecord {
  padding: 2rem 0.3rem;
  font-size: 0.26rem;
  text-align: center;
}
</style>
