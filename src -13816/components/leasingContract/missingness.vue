<template>
  <div>
    <step :step="1" :tabs="tabs"></step>
    <div class="lesing_one">
      <p class="text_color">出租人信息</p>
      <!-- 租客备案需要填写房东信息 -->
      <group class="group_style" v-if="formData.applicantType==1">
        <x-input
          title="姓名"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写出租人姓名"
          v-model="formData.renter"
          :required="true"
          :is-type="inputValid.name"
          ref="name"
        ></x-input>
        <x-input
          title="证件号码"
          text-align="right"
          type="number"
          placeholder-align="right"
          placeholder="请填写出租人证件号码(选填)"
          v-model="formData.rentNo"
          ref="idCard"
        ></x-input>
        <!-- :required="true" -->
        <!-- :is-type="inputValid.idCard" -->
        <!-- <x-input
          title="性别"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写出租人性别"
          v-model="formData.sex"
          :required="true"
        ></x-input>-->
        <popup-picker
          title="性别"
          :data="sexList"
          placeholder="请选择性别"
          v-model="formData.sex"
          value-text-align="right"
          @on-change="formDataSexChange"
          show-name
        ></popup-picker>
        <!-- @on-change="purposechange" -->
        <!--  -->
        <x-input
          title="手机号码"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写出租人手机号码"
          v-model="formData.phone"
          :required="true"
          type="number"
          :is-type="inputValid.phone"
          ref="phone"
          :max="11"
        ></x-input>
      </group>
      <!-- 房东备案显示房东信息 -->
      <div class="lesing_bg" v-else>
        <div class="one_content flexAuto">
          <span>姓名</span>
          <span>{{formData.id?Lessor.renter:Lessor.realName}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>证件号码</span>
          <span>{{formData.id?Lessor.rentNo:Lessor.idCard}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>性别</span>
          <span class="right_size_color">{{Lessor.sex==1?'男':Lessor.sex==2?'女':''}}</span>
        </div>
        <div class="one_content flexAuto">
          <span>手机号码</span>
          <span class="right_size_color">{{Lessor.phone}}</span>
        </div>
      </div>
    </div>
    <div class="lesing_three">
      <p class="text_color">房屋信息</p>
      <group class="group_style">
        <x-input
          title="租赁合同编号"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写租赁合同编号"
          v-model="formData.agreeNo"
          :is-type="inputValid.numberd"
          ref="agreeNo"
          :required="true"
          type="number"
          style="height: .8rem;
    line-height: .8rem;"
        ></x-input>
        <popup-picker
          title="租赁用途"
          :data="purposeList"
          placeholder="请选择租赁用途"
          v-model="formData.purpose"
          value-text-align="right"
          @on-change="purposechange"
          show-name
        ></popup-picker>
        <x-input
          title="面积"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写面积"
          :required="true"
          :is-type="inputValid.numberd"
          ref="houseArea"
          type="number"
          v-model="formData.houseArea"
          style="height: .8rem;
    line-height: .8rem;"
        >
        <span slot="right-full-height">㎡</span>
        </x-input>
        <x-input
          title="租金"
          class="rent"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写租金"
          :required="true"
          type="number"
          :is-type="inputValid.numberd"
          ref="rentPrice"
          v-model="formData.rentPrice"
          style="height: .8rem;
    line-height: .8rem;"
        >
          <span slot="right-full-height">元/月</span>
        </x-input>
        <calendar
          title="租赁开始时间："
          placeholder="请选择租赁开始时间"
          placeholder-align="right"
          text-align="right"
          v-model="formData.limitTimeStart"
          style="border-color:transparent;text-algin:right;"
        ></calendar>
        <calendar
          title="租赁结束时间："
          placeholder="请选择租赁结束时间"
          v-model="formData.limitTimeEnd"
          style="border-color:transparent;"
        ></calendar>
        <popup-picker
          title="现居住地址"
          placeholder="请选择居住地址"
          :data="list121"
          v-model="houseAddressName"
          value-text-align="right"
          disabled
        ></popup-picker>
                  <!-- v-model="formData.houseAddress" -->
        <popup-picker
          title="街镇"
          placeholder="请选择街镇"
          :data="street"
          v-model="formData.streetNo"
          value-text-align="right"
          show-name
          @on-change="selecStreet"
        ></popup-picker>
        <popup-picker
          title="街道巷"
          placeholder="请选择街道巷"
          :data="streetmap"
          v-model="formData.streetLaneNo"
          value-text-align="right"
          show-name
          @on-change="selecStreetmap"
        ></popup-picker>
        <popup-picker
          title="门牌号"
          placeholder="请选择门牌号"
          :data="houseNr"
          v-model="formData.doorNo"
          value-text-align="right"
          show-name
          @on-change="selecDoorNo"
        ></popup-picker>
        <popup-picker
          title="房号"
          placeholder="请选择房号"
          :data="roomNr"
          v-model="formData.roomNo"
          value-text-align="right"
          show-name
          @on-change="selecRoomNr"
        ></popup-picker>
        <!-- <x-input
          title="门牌号"
          class="rent"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写门牌号"
          v-model="formData.doorNo"
        ></x-input>
        <x-input
          title="祥址/房号"
          class="rent"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写详址/房号"
          v-model="formData.roomNo"
        ></x-input>-->
        <x-input
          title="房产证权号"
          class="rent"
          text-align="right"
          placeholder-align="right"
          type="number"
          :placeholder="placeholderText"
          v-model="formData.certificate"
        ></x-input>
      </group>
    </div>
    <div class="lesing_tow">
      <p class="text_color">承租人信息</p>
      <div class="content_text" v-for="(item,index) in listData" :key="index">
        <group>
          <x-input
            title="姓名"
            class="rent"
            text-align="right"
            placeholder-align="right"
            placeholder="请填写姓名"
            v-model="item.realName"
            :required="true"
            :is-type="inputValid.name"
            ref="listName"
          ></x-input>
          <x-input
            title="证件号码"
            class="rent"
            text-align="right"
            placeholder-align="right"
            :required="true"
            placeholder="请填写证件号码"
            v-model="item.idCard"
            :is-type="inputValid.idCard"
            ref="listIdCard"
          ></x-input>
          <!-- <div class="one_content flexAuto" v-if="formData.applicantType==1">
            <span>性别</span>
            <span class="right_size_color">{{item.sex==1?'男':item.sex==2?'女':''}}</span>
          </div>-->
          <popup-picker
            title="性别"
            :data="sexList"
            :required="true"
            placeholder="请选择性别"
            v-model="item.sex"
            value-text-align="right"
            show-name
          ></popup-picker>
          <!-- <x-input               :disabled="isdisabled"
            title="性别"
            class="rent"
            text-align="right"
            placeholder-align="right"
            placeholder="请填写性别"
            v-model="item.sex"
            :disabled="isdisabled"
          ></x-input>-->
          <x-input
            title="手机号码"
            class="rent"
            text-align="right"
            :required="true"
            placeholder-align="right"
            placeholder="请填写手机号码"
            v-model="item.phone"
            type="number"
            :is-type="inputValid.phone"
            :max="11"
            ref="listPhone"
          ></x-input>
        </group>
        <div class="delhrecor" @click="delhrecor(index)" v-if="listData.length>1">删除</div>
      </div>
    </div>
    <div class="add_people" @click="addPeople">
      <!-- v-if="formData.applicantType==2 && listData.length<10" -->
      <img src="static/images/addcz.png" alt="新增" class="addcz">
      新增承租人
    </div>
    <div class="btn_style_tow">
      <!-- <x-button class="btn_tow" action-type="submit">下一步</x-button> -->
      <button class="btn_tow" @click="checkInput" v-if="oneClickCheck">下一步</button>
      <button class="btn_tow_one" v-else>下一步</button>
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="1000"
      is-show-mask
      :text="toastText"
      :position="position"
      width="80%"
    ></toast>
    <confirm v-model="showconfirm" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;">确定删除此承租人吗?</p>
    </confirm>
  </div>
</template>

<script>
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
import { mapState } from "vuex";
import Step from "../common/Step.vue";
import axios from "axios";
import {
  Group,
  XInput,
  PopupPicker,
  Calendar,
  XButton,
  Toast,
  Confirm
} from "vux";
import { debug } from "util";
export default {
  name: "missingness",
  mixins: [mixins],
  data() {
    return {
      type: null,
      id: null,
      Lessor: { sex: [] },
      purposeList: [], //用途
      street: [], //街镇
      streetmap: [], //街道巷
      houseNr: [], //门牌号
      roomNr: [], //房号
      sexList: [[{ name: "男", value: "1" }, { name: "女", value: "2" }]],
      list121: [[{ name: "越秀区" }]],
      houseAddressName:['越秀区'],
      listData: [{ realName: "", idCard: "", sex: [], phone: "" }],
      valueData: ["A"],
      vuel: "0",
      isdisabled: true,
      showPositionValue: false,
      toastText: "请填写完整信息",
      position: "middle",
      showconfirm: false,
      index: 0, //删除承租人序号
      placeholderText:"",
      oneClickCheck:true,//只能请求一次的判断
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
      formData: {
        agreeNo: "", //合同编号
        houseAddress: ["越秀区"], //地址
        houseArea: "", //面积
        purpose: [], //用途
        limitTimeStart: "", //租赁开始时间
        limitTimeEnd: "", //租赁结束时间
        renter: "", //出租人名称
        rentNo: "", //出租人证件号码
        sex: [], //性别
        phone: "", //电话
        applicantType: "", //申请人类型  1:承租人 2：出租人
        streetNo: [], //街镇
        streetLaneNo: [], //街道巷
        doorNo: [], //门牌号
        roomNo: [], //房号
        certificate: "", //房产证权号
        rentPrice: "", //租金
        hrecordHirers: [{ realName: "", idCard: "", sex: "", phone: "" }] //承租人信息
      },
      inputValid: {
        idCard: val => {
          return {
            valid: this.$regExp.cardID.test(val),
            msg: "证件号码不合法！"
          };
        },
        name: val => {
          return {
            valid: this.$regExp.chinaName.test(val),
            msg: "名字不合法！"
          };
        },
        phone: val => {
          return {
            valid: this.$regExp.phone.test(val),
            msg: "手机不合法！"
          };
        },
        numberd: val=>{
          return {
            valid: this.$regExp.numberd.test(val),
            msg: "请输入文字"
          };
        }
      }
      // inputValid(value) {
      //   contract: val => {
      //     if (val.length > 0) return { valid: true };
      //     // return {
      //     //   valid: this.$regExp.phone.test(val),
      //     //   msg: "手号码不合法！"
      //     // };
      //   };
      // }
    };
  },
  mounted() {
    document.title = "房屋租赁备案";
    console.log(this.$route.query.Type ,'2222')
    this.getwxUser(); //获取出租人/承租人信息
    this.getpurpose(); //用途
    this.getarea(4, 440104, this.street); //街镇

    if (this.$route.query.Type) {
      //获取角色参数
      this.formData.applicantType = this.$route.query.Type; //修改资料类型 1租客  2房东
      // this.type = this.$route.query.Type; //新增填写资料类型 1租客  2房东
      this.formData.applicantType == 2
        ? (this.isdisabled = false)
        : (this.isdisabled = true);
      this.$route.query.Type== 1?this.placeholderText='请填写房产证权号(选填)':this.placeholderText='请填写房产证权号'
    }
    if (this.$route.query.id) {
      //地址栏有带id  修改信息 需要回显
      //修改信息
      this.formData.id = this.$route.query.id;
      this.getdataback(this.$route.query.id); //请求回显数据
    }else if(this.fromId){
      this.formData.id = this.fromId;
      this.getdataback(this.fromId);
    }

  },
  methods: {
    formDataSexChange(e) {
      this.formData.sex = e;
    },
    addPeople() {
      //新增承租人
      let iscan = true;
      // console.log(this.listData, "承租人列表");
      for (let i = 0; i < this.listData.length; i++) {
        if (
          this.listData[i].realName == "" ||
          this.listData[i].idCard == "" ||
          this.listData[i].sex.length == 0 ||
          this.listData[i].phone == ""
        ) {
          iscan = false;
        }
      }
      if (iscan) {
        this.listData.push({ realName: "", idCard: "", sex: [], phone: "" });
      } else {
        this.showPositionValue = true;
        this.toastText = "请将承租人信息填写完毕";
      }
    },
    delhrecor(e) {
      //删除承租人
      this.index = e;
      this.showconfirm = true;
      // this.listData.splice(e, 1);
    },
    onCancel(e) {
      this.showconfirm = false;
      // console.log(e);
    },
    onConfirm(e) {
      //确认删除承租人
      this.listData.splice(this.index, 1);
    },
    getwxUser() {
      //获取承租人或者出租人的信息
      //this.$Utils.getLocalStorage("openId")  "o1kf80b2zfxcwhASkmsKrFlRhnm4"
      let openId = window.localStorage.getItem('openId')

      api
        .wxUser({ openId: openId.replace(/\"/g, "")})
        .then(res => {
             console.log('获取承租人信息')
          //   renter: "nidy", //出租人名称
          // rentNo: "4508206266651", //出租人证件号码
          if (this.formData.applicantType == 1) {
            //承租人
            res.data.data.sex = [res.data.data.sex];
            this.listData = [res.data.data];
          } else if (this.formData.applicantType == 2) {
            //出租人 房东
            this.Lessor = res.data.data;
            this.formData.renter = res.data.data.realName;
            this.formData.rentNo = res.data.data.idCard;
            this.formData.sex = res.data.data.sex;
            this.formData.phone = res.data.data.phone;
          }
        })
        .catch(err => {
          console.log(err, "错误");
        });
    },
    getdataback(id) {
      //数据回显接口
      api
        .databack({ hrId: id })
        .then(res => {
          res.data.data.hRecord.streetNo = [res.data.data.hRecord.streetNo];
          res.data.data.hRecord.streetLaneNo = [
            res.data.data.hRecord.streetLaneNo
          ];
          res.data.data.hRecord.doorNo = [res.data.data.hRecord.doorNo];
          res.data.data.hRecord.sex = [res.data.data.hRecord.sex];
          res.data.data.hRecord.purpose = [res.data.data.hRecord.purpose];
          res.data.data.hRecord.roomNo = [
            res.data.data.hRecord.roomNo ? res.data.data.hRecord.roomNo : ""
          ];
          this.Lessor = res.data.data.hRecord;
          this.formData = res.data.data.hRecord;
          this.formData.limitTimeEnd = res.data.data.hRecord.timeEndStr;
          this.formData.limitTimeStart = res.data.data.hRecord.timeStaStr;
          for (let i = 0; i < res.data.data.hirer.length; i++) {
            res.data.data.hirer[i].sex = [res.data.data.hirer[i].sex];
          }
          this.listData = res.data.data.hirer;
        })
        .catch(err => {
          console.log(err, "数据回显err");
        });
    },
    getpurpose() {
      //加载房屋用途数据字典
      api
        .purpose()
        .then(res => {
          console.log(res, "res");
          this.purposeList.push(res.data.data);
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    purposechange(e) {
      //房屋用途选择
      this.formData.purpose = e;
    },
    getarea(level, code, data) {
      //获取地区接口
      api
        .area({ level: level, typeCode: code })
        .then(res => {
          data.push(
            res.data.data.map(item => {
              return {
                value: item.code,
                code: item.code,
                name: item.name
              };
            })
          );
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    /*
     * 获取某个元素下标
     *       arrays  : 传入的数组
     *       obj     : 需要获取下标的元素
     */
    getSubscript(arrays, obj) {
      //获取数组下标
      let i = arrays[0].length;
      while (i--) {
        if (arrays[0][i].value == obj) {
          return i;
        }
      }
      return false;
    },
    selecStreet(e) {
      //街镇选择
      this.formData.streetNo = e;
      this.streetmap = [];
      this.houseNr = [];
      this.roomNr = [];
      this.getarea(5, e[0], this.streetmap);
    },
    selecStreetmap(e) {
      //街道巷选择
      this.formData.streetLaneNo = e;
      // console.log(this.formData.streetNo, "街镇");
      this.houseNr = [];
      this.roomNr = [];
      this.getarea(6, e[0], this.houseNr);
    },
    selecDoorNo(e) {
      //门牌号选择
      this.formData.doorNo = e;
      // console.log(this.formData.streetNo, "街镇");
      this.roomNr = [];
      this.getarea(7, e[0], this.roomNr);
    },
    selecRoomNr(e) {
      //房号选择
      this.formData.roomNo = e;
    },
    dataDeal() {
      //提交前数据处理
      this.formData.hrecordHirers = this.listData;
      // 地址拼接
      //  console.log(this.houseAddressName[0],"houseAddress[0]")
      this.formData.houseAddress =
        this.houseAddressName[0] +
          this.street[0][this.getSubscript(this.street, this.formData.streetNo)]
            .name +
          this.streetmap[0][
            this.getSubscript(this.streetmap, this.formData.streetLaneNo)
          ].name +
          this.houseNr[0][this.getSubscript(this.houseNr, this.formData.doorNo)]
            .name +
          this.roomNr[0][this.getSubscript(this.roomNr, this.formData.roomNo)]
            .name;

      console.log(this.formData.houseAddress, "formData");
      // 角色区分：租客需要填房东信息 房东需要填写租客信息
      if (this.formData.applicantType == "1") {
        // 承租人  需要填房东信息
        // 房东性别转换
        if (this.formData.sex[0] == 1) {
          this.formData.sex = ["1"];
        } else {
          this.formData.sex = ["2"];
        }
      } else {
        //房东信息 出租人  需要填写租客信息
        // 承租人性别转换
        for (let i = 0; i < this.formData.hrecordHirers.length; i++) {
          if (this.formData.hrecordHirers[i].sex[0] == 1) {
            //承租人信息
            this.formData.hrecordHirers[i].sex = ["1"];
          } else {
            this.formData.hrecordHirers[i].sex = ["2"];
          }
        }
      }
    },
    jumpLeasingPhotos() {
      //下一步
      this.dataDeal(); //处理数据
      this.oneClickCheck = false
      api
        .doSave(this.formData)
        .then(res => {
          let id = this.formData.id || res.data.data; //有id就是修改 没有就是新增
          // this.$Utils.setLocalStorage('FromId',id)
          this.$store.commit('GET_KEEP_FROMID',id)
          //返回房屋备案主键id
          this.$router.push(
            "/leasingContract/leasingPhotos?id=" +
              id +
              "&type=" +
              this.formData.applicantType
          );
          this.oneClickCheck = true
        })
        .catch(err => {
          console.log(err, "错误");
        });
    },
    checkInput() {
      //校验
      let listPhone = this.$refs.listPhone;
      let listName = this.$refs.listName;
      let listIdCard = this.$refs.listIdCard;
      let rentPrice = this.$refs.rentPrice.valid;
      let houseArea = this.$refs.houseArea.valid;
      let agreeNo = this.$refs.agreeNo.valid;
      let allCheckData = true;
      for (let i in this.formData) {
        if (this.formData[i] == "") {
          if (i != "rentNo") {
            if(this.$route.query.Type== 1){
              if(i !="certificate"){
                 allCheckData = false;
              }
            }else allCheckData = false;
          }
        }
      }
      for (let i = 0; i < this.listData.length; i++) {
        if (
          this.listData[i].sex.length == "0" ||
          !listPhone[i].valid ||
          !listName[i].valid ||
          !listIdCard[i].valid
        ) {
          allCheckData = false;
        }
      }
      if (this.$refs.phone) {
        let sex = this.formData.sex;
        let name = this.$refs.name.valid;
        let phone = this.$refs.phone.valid;
        if (sex && name && phone && allCheckData && rentPrice && houseArea && agreeNo) {
          this.jumpLeasingPhotos();
        } else {
          this.showPositionValue = true;
          this.toastText = "请填写完整信息";
        }
      } else {
        if (allCheckData && rentPrice && houseArea && agreeNo) {
          this.jumpLeasingPhotos();
        } else {
          this.showPositionValue = true;
          this.toastText = "请填写完整信息";
        }
      }
    }
  },
  components: {
    Group,
    XInput,
    PopupPicker,
    Calendar,
    XButton,
    Step,
    Toast,
    Confirm
  },
  computed: {
      ...mapState([
        'fromId'
      ])
    }
};
</script>
<style>
.weui-cell > .vux-cell-primary > .vux-popup-picker-select {
  padding-left: 1rem;
}
.vux-popup-picker-select > .vux-popup-picker-placeholder {
  color: #ccc;
}
.weui-cell__ft .vux-x-input-right-full {
  height: 0.5rem;
  line-height: 0.5rem;
}
.weui-cell__ft {
  display: flex;
}
</style>
<style scoped>
div.tabs_cont {
  width: 100%;
}
.content_text {
  background: #fff;
  margin-bottom: 0.2rem;
}
.lesing_three {
}
.group_style {
  margin-top: 0.2rem;
  background: #fff;
}
.defcustom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  color: #7c7c7c;
  font-size: 0.22rem;
  background: #fff;
}
.tab_bar {
  text-align: center;
}
.tab_bar_roundl {
  border-radius: 50%;
  background: #d2d2d2;
  color: #fff;
  width: 0.5rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  margin: 0 auto 0.1rem;
}
.line_box {
  width: 1.6rem;
  height: 2px;
  background: #ced7de;
  margin-bottom: 0.5rem;
}
.old_line {
  display: inline-block;
  width: 50%;
  height: 2px;
  background: #008dee;
  margin-bottom: 0.5rem;
}
.achieve {
  background: #008dee;
  color: #fff;
}
/*  */
.lesing_one {
  background: rgba(245, 245, 245, 1);
  color: #888888;
}
.lesing_tow {
  background: rgba(245, 245, 245, 1);
}
.lesing_content {
  background: rgba(245, 245, 245, 1);
  color: #888888;
  height: 100%;
  position: relative;
}
.one_content {
  padding: 0.1rem 0.3rem;
}
.text_color {
  padding: 0.2rem 0.3rem;
  color: #888888;
  background: rgba(245, 245, 245, 1);
}
.rent .weui-input {
}
.lesing_bg {
  background: #fff;
  padding: 0.2rem 0 0.3rem;
}
.flexAuto {
  display: flex;
  justify-content: space-between;
}
.add_people {
  background: #fff;
  margin-top: 0.2rem;
  padding: 0.2rem;
}
.btn_style_tow {
  margin: 0.3rem 0;
  width: 100%;
  text-align: center;
}
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
.btn_tow {
  border-radius: 0.1rem;
  font-size: 0.3rem;
  width: 90%;
  height: 1rem;
  background: #0091ff;
  outline: none;
  border: 1px solid #fff;
  color: #fff;
  display: inline-block;
  line-height: 1rem;
}
.delhrecor {
  margin: 0 0.3rem;
  padding: 0.2rem 0;
  box-szing: border-box;
  text-align: center;
  border-top: 1px solid #ebebeb;
}
.addcz {
  width: 0.36rem;
  height: 0.36rem;
  vertical-align: middle;
}
</style>
