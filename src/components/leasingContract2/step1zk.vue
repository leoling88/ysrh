<template>
  <div>
    <div class="lesing_one">
      <p class="text_color">租房人信息</p>


      <!-- 申请人信息 -->
      <div class="lesing_bg">
        <div class="two_content flexAuto">        
            <span>姓名</span>
            <span class="right_size_color">{{formData.realName}}</span>
        </div>  
        <div class="two_content flexAuto">
            <span>性别</span>
            <span class="right_size_color">{{formData.sex==1?'男':formData.sex==2?'女':''}}</span>
        </div>      
        <div class="two_content flexAuto">
            <span>身份证号</span>
            <span class="right_size_color">{{formData.idCard}}</span>
        </div>
        <group>
          <popup-picker title="文化程度" :data="cultureList" v-model="culture"  @on-show="onShow" @on-hide="onHide" placeholder="请选择学历" ></popup-picker>
        </group>
        <x-input
          title="租赁备案号"
          text-align="right"
          placeholder-align="right"
          placeholder="请填写房东提供备案号"
          v-model="formData.hrId"
          :is-type="inputValid.numberd"
          ref="agreeNo"
          :required="true"
          type="number"
          @on-blur="((val) => {blurinput(val,'agreeNo')})"
          style="height: .8rem;
    line-height: .8rem;"
        ></x-input>
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



   

    <div class="btn_style_tow">
      <button class="btn_tow" @click="jumpLeasingPhotos" >下一步</button>
    </div>




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
  Confirm,
} from "vux";
import { debug } from "util";
export default {
  name: "missingness",
  mixins: [mixins],
  data() {
    return {
      cultureList:[['小学以下','小学','初中','中专\职校','高中','大专','本科','本科+学士','硕士','博士']],  // 文化程度字典
      culture:[],// 文化程度
      id:this.$route.query.id,
      openId: this.$route.query.openId,
      isdisabled: true,
      showPositionValue: false,
      toastText: "请填写完整信息",
      placeholderText: "",
      isUpPic: true,
      upImg1:[],
      formData:{
        openId: this.$route.query.openId,
        renter:"",
        sex:"",
        phone:"",
        idCard:"",
        photo:"",
        education:"",
        hrId:"",
        educationId:""

      },
      upImg: {
        img1:[],
        file:'',
        fbId:''
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
    this.requireWXUser()
    // this.queryDictionaryList()
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
    if(this.id){     //如果有id 回显数据
      this.requireData()
    }      
  },
  methods: {
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },

    requireData(){      //数据回显
      api.queryLeaseRecordZK({id:this.id}).then(res=>{
        this.formData = res.data.hRecordHirer
        this.culture = [res.data.hRecordHirer.education]
        let imgs = res.data.hRecordHirer.photo;
        let oimgs = imgs.split(",");
        for(var i = 0; i < oimgs.length; i ++){
          this.upImg.img1.push({'src':oimgs[i]})
        }
      })
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
              this.formData.realName = _data.name;
              this.formData.sex = _data.gender;
              this.formData.idCard = _data.identity
              this.formData.phone = _data.phone
            }
          });
      }else{
        console.log('非用户')
      }
    }, 
    validate() {
      const reg=/^1[3456789]\d{9}$/;
      if(this.formData.realName == ""){
        return "姓名无法获取";
      } else if(this.formData.idCard  == "") {   
        return "身份证无法获取";
      } else if(!this.formData.education) {
        return "请填写学历";
      } else if(!this.formData.hrId) {
        return "请填写房东提供备案号";
      } else if(!this.formData.phone) {   
        return "请填写手机号";
      } else if (!reg.test(this.formData.phone)) {
        return "请输入有效的手机号码";
      } else if(this.upImg.img1.length < 2){
        return "请上传身份证正反面图片";
      } else {
        return 1

      }
    },
   
    jumpLeasingPhotos() {
      //下一步
      // this.dataDeal(); //处理数据
      this.formData.education = this.culture.toString()
      if (this.validate() == 1) {
        api.queryLeaseRecord({id:this.formData.hrId}).then(res=>{ //检查房屋租赁备案号是否顾虑在
          if(res.data.success){
            api
              .referRenting({
                openId: this.$route.query.openId,
                realName:this.formData.realName,
                sex:this.formData.sex,
                phone:this.formData.phone,
                idCard:this.formData.idCard,
                photo:this.formData.photo,
                education:this.formData.education,
                hrId:this.formData.hrId
              })
              .then(res => {
                if(res.data.success){
                  const _id=res.data.hRecordHirer.id
                  this.$router.push("/leasingContract2/step2zk?id="+ _id + "&recordstatus=" );
                }
              })
              .catch(err => {
                console.log(err, "错误");
              });            
          }else{
            this.$store.commit(
              "SHOWTOAST",
              "房屋租赁备案不存在"
            );
    
          }
        })

      }else{
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
                 _this.formData.photo = _pictures
                 console.log(_this.upImg.img1)                  
           
                }
   
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
      //this.submitData.size = this.submitData.size - this.submitData.img[index].file.size;//总大小 
      this.$store.commit('UPDATE_LOADING', true);
      if(indexo === 1){
        this.upImg.img1.splice(index, 1); 
        for(var i = 0; i <  this.upImg.img1.length; i ++){
          _pictures += this.upImg.img1[i].src +','
        }
        _pictures = _pictures.substring(0, _pictures.lastIndexOf(','));
        _pictures = _pictures.replace("undefined","");
        this.formData.cardPhoto = _pictures
        this.$store.commit('UPDATE_LOADING', false);
      }


      // api.delPic(imgId).then(res => {     //删除已上传图片
      //   if(res.data.success) {
      //     this.$store.commit('UPDATE_LOADING', false);
      //     if(indexo === 1){
      //       this.upImg.img1.splice(index, 1); 
      //       for(var i = 0; i <  this.upImg.img1.length; i ++){
      //         _pictures += this.upImg.img1[i].src +','
      //       }
      //       _pictures = _pictures.substring(0, _pictures.lastIndexOf(','));
      //       _pictures = _pictures.replace("undefined","");
      //       this.formData.photo = _pictures
      //     }
      //     console.log(this.formData.photo)
      //     return this.$store.commit("SHOWTOAST", '删除成功');          

      //   }
      // }).catch(() => {
      //   console.log()

      // })        
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
