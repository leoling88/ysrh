<template>
  <div>
    <step :step="2" :tabs="tabs"></step>
    <div class="lesing_one">
      <p class="text_color">
        <span>备案证明材料</span>
      </p>
      <div class="lesing_bg">
        <p class="flexAuto">
          <span>租赁合同照片</span>
          <span>{{upImg.img1.length}}/10</span>
        </p>
        <div class="one_content felxStart Lease_photo">
          <!-- v-if="upImg.img1.src" -->
          <div class="is_photos" v-for="(item,index) in upImg.img1" :key="index">
            <!--   -->
            <img :src="item.src" alt class="show_photos">
            <!-- <img src="/static/images/news5.png" alt> -->
            <img
              src="static/images/guanbi.png"
              alt
              class="is_photos_guanbi"
              @click="delectImages(index,item.fId,1)"
            >
            <input
              @change="fileChangeImages($event, 1,index,item.fId)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
          <div class="addPhotos" v-if="upImg.img1.length <10">
            <img src="static/images/add.png" alt>
            <input
              @change="fileChange($event, 1)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
        </div>
      </div>
      <div class="lesing_bg">
        <p class="flexAuto">
          <span>{{type == 2?'房产证照片':'房产证照片(选填)'}}</span>
          <span>{{upImg.img2.length}}/2</span>
        </p>
        <div class="one_content felxStart Lease_photo">
          <!-- v-if="upImg.img1.src" -->
          <div class="is_photos" v-for="(item,index) in upImg.img2" :key="index">
            <!--   -->
            <img :src="item.src" alt class="show_photos">
            <!-- <img src="/static/images/news5.png" alt> -->
            <img
              src="static/images/guanbi.png"
              alt
              class="is_photos_guanbi"
              @click="delectImages(index,item.fId,2)"
            >
            <input
              @change="fileChangeImages($event, 2,index,item.fId)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
          <div class="addPhotos" v-if="upImg.img2.length <2">
            <img src="static/images/add.png" alt>
            <input
              @change="fileChange($event, 2)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
        </div>
      </div>
      <div class="lesing_bg">
        <p class="flexAuto">
          <span>{{type == 2?'出租人身份证正反面':'出租人身份证正反面(选填)'}}</span>
          <span>{{upImg.img3.length}}/2</span>
        </p>
        <div class="one_content felxStart Lease_photo">
          <!-- v-if="upImg.img1.src" -->
          <div class="is_photos" v-for="(item,index) in upImg.img3" :key="index">
            <!--   -->
            <img :src="item.src" alt class="show_photos">
            <!-- <img src="/static/images/news5.png" alt> -->
            <img
              src="static/images/guanbi.png"
              alt
              class="is_photos_guanbi"
              @click="delectImages(index,item.fId,3)"
            >
            <input
              @change="fileChangeImages($event, 3,index,item.fId)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
          <div class="addPhotos" v-if="upImg.img3.length <2">
            <img src="static/images/add.png" alt>
            <input
              @change="fileChange($event, 3)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
        </div>
      </div>
      <div class="lesing_bg">
        <p class="flexAuto">
          <span>{{type == 2?'承租人身份证正反面(选填)':'承租人身份证正反面'}}</span>
          <span>{{upImg.img4.length}}/2</span>
        </p>
        <div class="one_content felxStart Lease_photo">
          <!-- v-if="upImg.img1.src" -->
          <div class="is_photos" v-for="(item,index) in upImg.img4" :key="index">
            <!--   -->
            <img :src="item.src" alt class="show_photos">
            <!-- <img src="/static/images/news5.png" alt> -->
            <img
              src="static/images/guanbi.png"
              alt
              class="is_photos_guanbi"
              @click="delectImages(index,item.fId,4)"
            >
            <input
              @change="fileChangeImages($event, 4,index,item.fId)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
          <div class="addPhotos" v-if="upImg.img4.length <2">
            <img src="static/images/add.png" alt>
            <input
              @change="fileChange($event, 4)"
              type="file"
              id="upload_file"
              class="del-but"
              accept="image/*"
            >
          </div>
        </div>
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
      <!-- 申请 -->
      <div class="btn_style_tow">
        <button class="btn_tow" @click="jumpconfirmSuccess">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "../common/Step.vue";
import api from "../../api/api";
import { Toast } from "vux";
import { mapState } from "vuex";
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
      upImg: {
        img1: [],
        img2: [],
        img3: [],
        img4: []
      },
      upImageIndex: 0,
      showPositionValue: false,
      toastText: "图片文件过大",
      position: "middle",
      fileId: "",
      type:""
    };
  },
  computed: {
      ...mapState([
        'fromId'
      ])
    },
  mounted() {
    document.title = "房屋租赁备案";
    this.getInfoData();
  },
  components: {
    Step,
    Toast
  },
  methods: {
    getInfoData() {
      this.upImg.img1 = [];
      this.upImg.img2 = [];
      this.upImg.img3 = [];
      this.upImg.img4 = [];
      this.fileId = this.$route.query.id || this.fromId;
      this.type = this.$route.query.type
      api.databack({ hrId: this.$route.query.id }).then(res => {
        if (res.data.data) {
          let fileData = res.data.data.file;
          for (let i = 0; i < fileData.length; i++) {
            this.ifShowResloute(
              fileData[i].fileType,
              fileData[i].fId,
              fileData[i].fileUrl
            );
          }
        }
      });
    },
    // 成功跳转
    jumpconfirmSuccess() {
      if(this.type == 2){
          if (this.upImg.img1.length != '0') {
            if(this.upImg.img2.length != '0'){
              if(this.upImg.img3.length == '2'){
                  this.$router.push("/leasingContract/confirm?id="+this.$route.query.id);
              }else{
                this.toastText = "请上传出租人身份证正反面";
              this.showPositionValue = true;
              }
            }else{
              this.toastText = "请上传房产证照片";
              this.showPositionValue = true;
            }
          }else{
            this.toastText = "请上传租赁合同照片";
            this.showPositionValue = true;
          }
      }else{
        if (this.upImg.img1.length != '0') {
          if (this.upImg.img4.length == '2') {
            this.$router.push("/leasingContract/confirm?id="+this.$route.query.id);
          } else {
            this.toastText = "请上传承租人身份证正反面";
            this.showPositionValue = true;
          }
      } else {
        this.toastText = "请上传租赁合同照片";
        this.showPositionValue = true;
      }
      }


    },
    // 上传图片1
    fileChange(el, type) {
      this.fileList(el.target.files, type);
      el.target.value = "";
    },
    // 上传图片2
    fileList(files, type) {
      // this.fileAdd(files, index);
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i], type);
      }
    },
    // 上传图片3
    fileAdd(file, type) {
      let _this = this;
      lrz(file, { width: 700 })
        .then(function(rst) {
          console.log(rst, "reseee");
          if (rst.file.size < 307200) {
            api
              .uploadFile({
                pId: _this.fileId,
                fileType: type,
                file: rst.base64
              })
              .then(res => {
                // api.fileUrl({ fId: res.data.data }).then(data => {
                  console.log(res.data.data,'data')
                  _this.ifShowResloute(type, res.data.data.fid,res.data.data.path);
                // });
              });
          } else {
            _this.toastText = "图片文件过大";
            _this.showPositionValue = true;
          }

          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          el.target.value = null;
        });
    },
    // 删除当前图片
    delectImages(index, fId, type) {
      api.deleteFile({ fId: fId }).then(res => {
        if (res.data.msg == "success") {
          if (type == 1) {
            this.upImg.img1.splice(index, 1);
          } else if (type == 2) {
            this.upImg.img2.splice(index, 1);
          } else if (type == 3) {
            this.upImg.img3.splice(index, 1);
          } else if (type == 4) {
            this.upImg.img4.splice(index, 1);
          }
        }
      });
    },
    // 判断逻辑
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
    // 改变当前图片
    fileChangeImages(el, type, index, fId) {
      if (!el.target.files[0].size) return;
      let file = el.target.files[0];
      let _this = this;
      // for (let i = 0; i < files.length; i++) {
      //   this.fileAdd(files[i], index);
      // }
      lrz(file, { width: 700 })
        .then(function(rst) {
          console.log(rst.file.size)
          if (rst.file.size < 307200) {
            api
              .fileReplace({
                pId: _this.fileId,
                fileType: type,
                fId: fId,
                file: rst.base64,
          })
              .then(res => {
                // api.fileUrl({ fId: res.data.data }).then(data => {
                  if (type == 1) {
                    _this.$set(_this.upImg.img1, index, {
                      src: res.data.data.path,
                      fId: res.data.data.fid
                    });
                  } else if (type == 2) {
                    _this.$set(_this.upImg.img2, index, {
                      src: res.data.data.path,
                      fId: res.data.data.fid
                    });
                  } else if (type == 3) {
                    _this.$set(_this.upImg.img3, index, {
                      src: res.data.data.path,
                      fId: res.data.data.fid
                    });
            } else if (type == 4) {
                    _this.$set(_this.upImg.img4, index, {
                      src: res.data.data.path,
                      fId: res.data.data.fid
                    });
                  }
                  // _this.ifShowResloute(type, res.data.data, data.data.data);
                // });
              });
          } else {
            _this.toastText = "图片文件过大";
            _this.showPositionValue = true;
          }
          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          el.target.value = null;
        });
    }
  }
};
</script>

<style scoped>

.is_photos {
  position: relative;
  width: 2rem;
  height: 2rem;
  margin-right: 0.3rem;
  margin-bottom: 0.4rem;
}
.is_photos .is_photos_guanbi {
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0;
  top: -12px;
  right: -14px;
  z-index: 6;
}
.is_photos input {
  position: absolute;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 1.6rem;
  height: 1.6rem;
}
.is_photos img {
}
.addPhotos {
  position: relative;
  width: 2rem;
  height: 2rem;
  border: 1px solid #ccc;
  margin-left: 0.2rem;
}
.one_content .addPhotos img {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.addPhotos input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 2rem;
  height: 2rem;
  z-index: 5;
}
.btn_style_tow {
  width: 100%;
  text-align: center;
  margin: 0.3rem 0;
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
.show_photos {
  width: 2rem;
  height: 2rem;
  margin-right: 0.3rem;
}
.felxStart {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.lesing_one {
  background: rgba(245, 245, 245, 1);
  color: #888888;
  height: 100%;
}
.one_content {
  padding: 0.1rem 0.3rem;
}
.text_color {
  padding: 0.2rem 0.3rem;
}
.text_color span:last-child {
  color: #588bb1;
}
.lesing_bg {
  background: #fff;
  padding: 0.2rem 0 0.3rem;
  margin-bottom: 0.2rem;
}
.flexAuto {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.3rem;
}
</style>
