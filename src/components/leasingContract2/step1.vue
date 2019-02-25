<template>
  <div>
    <step :step="1" :tabs="tabs"></step>
    <div class="lesing_one">
      <p class="text_color">出租人信息</p>


      <!-- 申请人信息 -->
      <div class="lesing_bg">
        <div class="two_content flexAuto">        
            <span>姓名</span>
            <span class="right_size_color">{{formData.renter}}</span>
        </div>  
        <div class="two_content flexAuto">
            <span>性别</span>
            <span class="right_size_color">{{formData.sex==1?'男':formData.sex==2?'女':''}}</span>
        </div>      
        <div class="two_content flexAuto">
            <span>身份证号</span>
            <span class="right_size_color">{{formData.rentNo}}</span>
        </div>
        <x-input
          title="手机号码"
          class="rent"
          text-align="right"
          placeholder-align="right"
          placeholder="请填手机号"
          :required="true"
          type="tel"
          :max="11"
          @on-blur="((val) => {blurinput(val,'phone')})"
          :is-type="inputValid.phone"
          ref="phone"
          v-model="formData.phone"
          style="height: .8rem;

    line-height: .8rem;"

        >
        </x-input>



      </div>
    </div>
    <p class="text_color">上传身份证正反面图片</p>
    <div class="box-2">
        <form enctype="multipart/form-data">
          <div  ref="file_up">
                <div class="upload_img" v-for="(item,index) of upImg.img1"> 
                  <img :src="item.src"> 
                  <span class="del" @click="fileDel(1, index, item.src)"><b></b></span>
                </div> 
          </div>
        </form>
        <input @change="fileChange($event, 1)" type="file" id="upload_file" v-if="upImg.img1.length < 2"  class="del-but" multiple/> 
        <span  v-if="this.upImg.img1.length < 2" class="but plus icon" ></span>   
    </div> 



    <div class="lesing_three">
      <p class="text_color">房屋信息</p>
      <group class="group_style">
        <x-input
          title="租赁合同编号"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写租赁合同编号"
          :value="formData.agreeNo"
          :is-type="inputValid.numberd"
          ref="agreeNo"
          :required="true"
          type="number"
          @on-blur="((val) => {blurinput(val,'agreeNo')})"
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
          @on-blur="((val) => {blurinput(val,'rentPrice')})"
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
        <x-input
          title="房产证权号"
          class="rent"
          text-align="right"
          placeholder-align="right"
          type="number"
          :placeholder="placeholderText"
          @on-blur="((val) => {blurinput(val,'certificate')})"
          v-model="formData.certificate"
        ></x-input>
      </group>
    </div>


    <div class="lesing_tow">
      <p class="text_color">承租人信息</p>
      <div class="content_text" v-for="(item,index) in listData" :key="index"  v-if="addPeopleInput">
        <group>
          <x-input
            title="姓名"
            class="rent"
            text-align="right"
            placeholder-align="right"
            placeholder="请填写姓名"
            v-model="item.realName"
            @on-blur="((val) => {listinput(val,index,'realName')})"
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
            @on-change="((val) => {listinput(val,index,'idCard')})"
            v-model="item.idCard"
            :is-type="inputValid.idCard"
            ref="listIdCard"
          ></x-input>
          <div class="two_content flexAuto" style="border-top:.01rem solid  #ccc;">
            <span>性别</span>
            <span class="right_size_color">{{item.sex==1?'男':item.sex==2?'女':''}}</span>
          </div>
          <x-input
            title="手机号码"
            class="rent"
            text-align="right"
            :required="true"
            placeholder-align="right"
            placeholder="请填写手机号码"
            v-model="item.phone"
            @on-blur="((val) => {listinput(val,index,'phone')})"
            type="tel"
            :is-type="inputValid.phone"
            ref="listPhone"
            :max="11"
          ></x-input>
        </group>
        <div class="delhrecor" @click="delhrecor(index)" >删除</div>
      </div>
    </div>
    <div class="add_people" @click="addPeople" >
      <!-- v-if="formData.applicantType==2 && listData.length<10" -->
      <img src="static/images/addcz.png" alt="新增" class="addcz">
      新增承租人
    </div>




    <div class="btn_style_tow">
      <!-- <x-button class="btn_tow" action-type="submit">下一步</x-button> -->
      <button class="btn_tow" @click="checkInput" >下一步</button>
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

    <confirm v-model="showconfirm2" @on-cancel="onCancel2" @on-confirm="jumpLeasingPhotos">
      <p style="text-align:center;">该合同编号已存在，是否继续提交?</p>
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
      id:this.$route.query.id,
      recordstatus:this.$route.query.recordstatus,
      openId: this.$route.query.openId,
      type: null,
      Lessor: { sex: [] },
      purposeList: [], //用途
      street: [], //街镇
      streetmap: [], //街道巷
      houseNr: [], //门牌号
      roomNr: [], //房号
      sexList: [[{ name: "男", value: "1" }, { name: "女", value: "2" }]],
      list121: [[{ name: "越秀区" }]],
      houseAddressName: ["越秀区"],
      listData: [],
      valueData: ["A"],
      vuel: "0",
      isdisabled: true,
      showPositionValue: false,
      toastText: "请填写完整信息",
      position: "middle",
      showconfirm: false,
      showconfirm2: false,
      index: 0, //删除承租人序号
      placeholderText: "",
      oneClickCheck: true, //只能请求一次的判断
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
      isUpPic: true,
      upImg: {
        img1:[],
        file:'',
        fbId:''
      },
      addTenantInput:false,
      formData: {
        openId: this.$route.query.openId,
        agreeNo: "", //合同编号
        houseAddress: ["越秀区"], //地址
        houseArea: "", //面积
        purpose: [], //用途
        limitTimeStart: "", //租赁开始时间
        limitTimeEnd: "", //租赁结束时间
        renter: "", //申请人名称
        rentNo: "", //申请人证件号码
        sex: [], //申请人性别
        phone: "", //申请人电话
        applicantType: "", //申请人类型  1:承租人 2：出租人
        streetNo:[], //街镇
        streetLaneNo: [], //街道巷
        doorNo: [], //门牌号
        roomNo: [], //房号
        certificate: "", //房产证权号
        rentPrice: "", //租金
        cardPhoto:"" //身份证图片
      },
      upImg: {
        img1:[],
        file:'',
        fbId:''
      },
      upImg1:[],
      addPeopleInput:false,
      addMessg: false,     //不验证租客
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
        numberd: val => {
          return {
            valid: this.$regExp.numberd.test(val),
            msg: "请输入文字"
          };
        }
      }

    };
  },
  mounted() {
    document.title = "房屋租赁备案";
    this.requireWXUser(); //获取出租人/承租人信息
    this.getpurpose(); //用途
    this.getarea(4, 440104, this.street); //街镇
    if(this.id){     //如果有id 回显数据
      this.getdataback(this.id)      
    }

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
  methods: {

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
          // res.data.data.hRecord.sex = [res.data.data.hRecord.sex];
          res.data.data.hRecord.purpose = [res.data.data.hRecord.purpose];
          res.data.data.hRecord.roomNo = [
            res.data.data.hRecord.roomNo ? res.data.data.hRecord.roomNo : ""
          ];
          this.Lessor = res.data.data.hRecord;
          this.formData = res.data.data.hRecord;
          this.formData.limitTimeEnd = res.data.data.hRecord.timeEndStr;
          this.formData.limitTimeStart = res.data.data.hRecord.timeStaStr;
          // for (let i = 0; i < res.data.data.hirer.length; i++) {
          //   res.data.data.hirer[i].sex = [res.data.data.hirer[i].sex];
          // }
          this.listData = res.data.data.hirer;
          if(this.listData.length > 0) {
            this.addPeopleInput = true
          }
          let imgs = res.data.data.hRecord.cardPhoto
          console.log(imgs)
          let oimgs = imgs.split(",");
          for(var i = 0; i < oimgs.length; i ++){
            this.upImg.img1.push({'src':oimgs[i]})
          }



        })
        .catch(err => {
          console.log(err, "数据回显err");
        });
    },

    addPeople() {
      //新增承租人
      let iscan = true;
      this.addPeopleInput = true;
      // console.log(this.listData, "承租人列表");
      for (let i = 0; i < this.listData.length; i++) {
        if (
          this.listData[i].realName == "" ||
          this.listData[i].idCard == "" ||
          this.listData[i].sex == "" ||
          this.listData[i].phone == ""
        ) {
          iscan = false;
        }
      }
      if (iscan) {
        this.listData.push({ realName: "", idCard: "", sex:"", phone: "" });
      } else {
        this.showPositionValue = true;
        this.toastText = "请将承租人信息填写完毕";
      }
    },
    delhrecor(e) {
      //删除承租人
      this.index = e;
      this.showconfirm = true;
      this.listData.splice(e, 1);
    },
    requireWXUser() {
      //获取微信用户信息
      if (this.openId) {
        api
          .getWXdUser({
            openId: this.openId
          })
          .then(res => {
            const _data = res.data.wxUsers[0];
            if (res.data.success) {
              this.formData.renter = _data.name;
              this.formData.sex = _data.gender;
              this.formData.rentNo = _data.identity
              this.formData.phone = _data.phone
            }
          });
      }else{
        console.log('非用户')
      }
    },    
    listinput(val, index, element) {
      // this.listData[index].element = val;
      if (element == "idCard") {
        if (this.$refs.listIdCard[index].valid) {
          let string = val.charAt(val.length - 2);
          // string%2 == 0?this.$set(this.listData.sex,index,['2']):this.$set(this.listData.sex,index,['1'])
          string % 2 == 0
            ? (this.listData[index].sex ="2")
            : (this.listData[index].sex = "1");
        }        

      }
    },
    blurinput(val, element) {
      this.formData[element] = val;
      if(element == 'rentNo'){
          let string = val.charAt(val.length - 2);  
          string % 2 == 0
            ? (this.formData.sex = ["2"])
            : (this.formData.sex = ["1"]);
      }
    },
    // formDataSexChange(e) {
    //   this.formData.sex = e;
    // },

    onCancel(e) {
      this.showconfirm = false;
      // console.log(e);
    },
    onCancel2(e) {
      this.showconfirm = false;
      // console.log(e);
    },
    getpurpose() {
      //加载房屋用途数据字典
      api
        .purpose()
        .then(res => {
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

    },
    jumpLeasingPhotos() {
      //下一步
      // this.dataDeal(); //处理数据
      this.oneClickCheck = false;
      let _hirerJson =  JSON.stringify(this.listData);
      api
        .referLeaseRecord({
          openId: this.openId,
          agreeNo: this.formData.agreeNo, //合同编号
          houseAddress: this.formData.houseAddress[0], //地址
          houseArea: this.formData.houseArea, //面积
          purpose: this.formData.purpose[0], //用途
          limitTimeStart: this.formData.limitTimeStart, //租赁开始时间
          limitTimeEnd: this.formData.limitTimeEnd, //租赁结束时间
          renter: this.formData.renter,//申请人名称
          rentNo: this.formData.rentNo, //申请人证件号码
          sex:this.formData.sex, //申请人性别
          phone: this.formData.phone, //申请人电话
          applicantType: this.formData.applicantType, //申请人类型  1:承租人 2：出租人
          streetNo:this.formData.streetNo[0], //街镇
          streetLaneNo: this.formData.streetLaneNo[0], //街道巷
          doorNo: this.formData.doorNo[0], //门牌号
          roomNo: this.formData.roomNo[0], //房号
          certificate: this.formData.certificate, //房产证权号
          rentPrice: this.formData.rentPrice,//租金
          cardPhoto: this.formData.cardPhoto, //身份证
          hirerJson: _hirerJson, //租客  
        })
        .then(res => {
          const _id=res.data.hRecord.id
          this.$router.push("/leasingContract2/step2?id="+ _id);
          this.oneClickCheck = true;
        })
        .catch(err => {
          console.log(err, "错误");
        });
    },
    validate() {
      let listPhone = this.$refs.listPhone;
      let listName = this.$refs.listName;
      let listIdCard = this.$refs.listIdCard;
      const reg=/^1[3456789]\d{9}$/;
      if (!this.formData.phone) {   
        return "请填写手机号";
      }else if (!reg.test(this.formData.phone)) {
        return "请输入有效的手机号码";
      }else if(this.upImg.img1.length < 2){
        return "请上传身份证正反面图片";
      }else if (!this.formData.agreeNo) {
        return "请填写租赁合同编号";
      } else if (this.formData.purpose.length == 0) {
        return "请选择租赁用途";
      } else if (!this.formData.houseArea) {
        return "请填写面积";
      } else if (!this.formData.rentPrice) {
        return "请填写租金";
      } else if (!this.formData.limitTimeStart) {
        return "请选择租赁开始时间";
      } else if (!this.formData.limitTimeEnd) {
        return "请选择租赁结束时间";
      } else if (this.formData.streetNo.length == 0) {
        return "请选择街镇";
      } else if (this.formData.streetLaneNo.length == 0) {
        return "请选择街道巷";
      } else if (this.formData.doorNo.length == 0) {
        return "请选择门牌号";
      } else if (this.formData.roomNo.length == 0) {
        return "请选择房号";
      } else if ( this.listData.length > 0){
        for (let i = 0; i < this.listData.length; i++) {
          if (
            this.listData[i].realName == "" ||
            this.listData[i].idCard == "" ||
            this.listData[i].sex == "" ||
            this.listData[i].phone == ""
          ) {
            return "请将承租人信息填写完毕";
          }else{
            return 1
          }
        }
      }else{
        return 1

      }
    },
    checkInput() {
      // console.log(this.validate(),'这里是返回的数值')3
      let _id
      if(this.$route.query.id){
        _id = this.$route.query.id
      }else{
        _id = null
      }
      if (this.validate() == 1) {
        api.checkPactNum({
         agreeNo: this.formData.agreeNo,
         id:_id,
        }).then(res => {
          if(res.data.differentNum == 0){
            console.log(this.listData)
            this.jumpLeasingPhotos();
          }else if(res.data.differentNum > 0){
            if(this.$route.query.id){  //是否是重新编辑
              this.showconfirm2  = true
            }else{
              this.$store.commit("SHOWTOAST","该合同编号已存在")
            }

          }

        })

      } else {
        this.$store.commit("SHOWTOAST", this.validate());
      }

    },
    fileChange(el, index){
      if(this.isUpPic){
        this.isUpPic = false   //s禁止重复提交
        this.$store.commit('UPDATE_LOADING', true);
        if (!el.target.files[0].size) return; 
        this.fileList(el.target.files, index); 
        el.target.value = ''         
      }

    }, 
    fileList(files, index, el){ 
      // for (let i = 0; i < files.length; i++) { 
        this.fileAdd(files[0], index);     //只传一张图片
      // } 
    }, 
    fileAdd(file, index, el){ 
      //this.submitData.size = this.submitData.size + file.size;//总大小 
      let reader = new FileReader();
      let _this = this
      reader.vue = this; 
      // reader.readAsDataURL(file);
      lrz(file, { width: 1000 }).then(function(rst) { 
        _this.upImg.file = rst.base64;   //rst.file
        if (rst.file.size < 407200) {
            //=======图片上传至服务器
            let _pictures = '';
            api.setUpPicSSP({
              imgStr:_this.upImg.file
            }).then(res => {
              const _odata = res.data
              if(res.data.success) {
                if(index === 1) {
                 _this.upImg.img1.push({'src':_odata.data.src});
                  for(var i = 0; i <  _this.upImg.img1.length; i ++){
                   _pictures += _this.upImg.img1[i].src +','
                  }
                  _pictures = _pictures.substring(0, _pictures.lastIndexOf(','));
                 _this.formData.cardPhoto = _pictures                  
           
                }
                console.log(_this.formData.cardPhoto)
                return _this.$store.commit("SHOWTOAST", '上传成功'); 

              }else{
                return _this.$store.commit("SHOWTOAST", '上传失败');
              }
            })
            _this.$store.commit('UPDATE_LOADING', false);
            _this.isUpPic = true   //解除禁止上传
         //=======图片上传至服务器 end    
           //   
         }else{
            return _this.$store.commit("SHOWTOAST", '图片文件过大');
            _this.isUpPic = true   //解除禁止上传
         }

        return rst;
      }).always(function() {
        // 清空文件上传控件的值
        el.target.value = null;
      });

    }, 
    fileDel(indexo,index, imgId){ 
      let _pictures
      if(indexo === 1){
        this.upImg.img1.splice(index, 1); 
        for(var i = 0; i <  this.upImg.img1.length; i ++){
          _pictures += this.upImg.img1[i].src +','
        }
        _pictures = _pictures.substring(0, _pictures.lastIndexOf(','));
        _pictures = _pictures.replace("undefined","");
        this.formData.cardPhoto = _pictures
      }
        
    },    
  },
  components: {
    Group,
    XInput,
    PopupPicker,
    Calendar,
    XButton,
    Step,
    Toast,
    Confirm,
  },
  computed: {
    ...mapState(["fromId"])
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
.btn_tow_one {
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
.right_size_color{color:#000;}
.two_content{margin:0 .3rem;border-bottom:.01rem solid #ccc;padding:.2rem  0;}
.box-2{padding:.2rem .3rem;background:#fff;overflow:hidden;}
.upload_img{position: relative;}
.upload_img .del{display:block;width:.4rem;height:.4rem;border-radius:50% 0 0 0 ;background:#333;opacity:.8; position: absolute;right:0;bottom:0;color:#fff;line-height:.4rem; text-align: center;font-size:.3rem; line-height:.4rem;}
.upload_img .del b{display:inline-table;height:.06rem;width:70%;background:#fff; position: absolute;right:.05rem;bottom:.15rem;}
.upload_img,.box-2 .but{ float:left;display: block;width:1rem;height:1rem;margin-right:10px;border:.01rem solid #ccc; overflow:hidden;}
.upload_img img{width:100%;height:100%;}
.box-2 .plus{  position: relative;}
.del-but{width:1rem;height:1rem;position:absolute;background:#000;z-index:1000;opacity: 0;}

.plus.icon {
  color: #000;

}

.plus.icon:before {
  content: '';
  position: absolute;
  top:50%;
  left:50%;
  width: .6rem;
  height:.06rem;
  margin:-1.5px auto auto -.3rem;
  background-color: #ccc;

}
.plus.icon:after{content:'';position:absolute;width:.06rem;height:.6rem;margin:-.3rem auto auto -.03rem;background-color:#ccc;top:50%;left:50%;}

</style>
