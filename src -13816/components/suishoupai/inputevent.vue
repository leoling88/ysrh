<template>
  <div class="QA">
  <div class="box-1">
    <div class="select-1-c">
      <label for="" class="label">事件名称</label>
      <input type="text" class="input" placeholder="输入事项名称" v-model="formDatas.eventName" >
    </div>
  </div>
  
  <div class="box-1">
    <div class="select-1-c">
      <label for="" class="label">事件类型</label>
      <div class="value">{{formDatas.eventType}}</div>    
    </div>

  </div>
  <h2 class="h2">事件地点</h2>
  <div class="box-1 bor-top-1 bor-botttom-1" >
    <div class="select-1-c" style="border:none;">
      <label for="" class="label">行政区</label>
      <div class="value">越秀区</div>        
    </div>
    <CustomPicker title="街镇" placeholder="请选择街镇" @onChange="streetChange" apiMethod="getStreetData" :code="formDatas.area.value" ></CustomPicker>

    <CustomPicker title="街道巷" placeholder="请选择街道巷" @onChange="alleyAreaChange" apiMethod="getStreetxData" :disabled="!formDatas.area.value || !formDatas.street.value" :code="formDatas.street.value" ></CustomPicker>

    <div class="select-1-c" style="border-top:.01rem solid #ccc;">
      <label for="" class="label">事件地点 <span class="pin-icon"></span></label>
      <input type="text" class="input" placeholder="输入事项地点" v-model="formDatas.doors" >    
    </div>
  </div>
  <h2 class="h2">事件详细</h2>
  <div class="box-1 bor-top-1 bor-botttom-1" >
    <textarea maxlength="240" v-model="formDatas.eventDesc" @input="descArea" placeholder="请输入10个字以上的描述"></textarea>
    <p><font v-bind:class="{fontRed:formDatas.len >= 240}">{{formDatas.len}}</font>/240</p>
  </div>
  <h2 class="h2">请提供相关图片<span class="right">选中{{upImg.img1.length}}/4</span></h2>
  <div class="box-2">
    <form enctype="multipart/form-data">
      <div  ref="file_up">
            <div class="upload_img" v-for="(item,index) of upImg.img1"> 
              <img :src="item.src"> 
              <span class="del" @click="fileDel(1, index, item.src)"><b></b></span>
            </div> 
      </div>
    </form>
    
    <input @change="fileChange($event, 1)" type="file" id="upload_file" v-if="upImg.img1.length < 4"  class="del-but" multiple/> 

    <span  v-if="this.upImg.img1.length < 4" class="but plus icon" ></span>   
    </div> 


    <div class="but-1" @click="submitSJ">提交</div>

  </div>
</template>
<script>
import api from "../../api/api";
import mixins from "../../mixins/mixins.js";
  import utils from '../../script/utils.js';
import CustomPicker from '../common/CustomPicker.vue';
import {PopupPicker} from 'vux';

var xhr;
export default {
  components: {PopupPicker, CustomPicker},
  mixins: [mixins],
  data() {
    return {
      isSubmitDatas:  true,
      isUpPic: true,

      openId: this.$route.params.openId,
      formDatas:{
        openId: this.$route.params.openId,     //非重复有事的
    		eventName:'',   //事件名称
    		eventDesc:'',    //事件描述
    		eventPicture:'',  //事件照片
    		eventType: this.$route.params.eventType,    //事件类型：(1社区安全隐患 2社区事件3社区可疑人员 4社区报警 5社区环境）
        eventTypeName:'',//事件类型名
    		eventAddress:'',   //事件地址
        area:{
          name:'越秀区',
          value:'440104'
        },  // 行政区
        street: '',  // 街镇
        alleyArea: '', // 街道巷
        doors:'',//详细地址



        len: 0
      },
      upImg: {
        img1:[],
        file:'',
        fbId:''
      },
      upImg1:[],

      
    }

  },
  methods: {

    areaChange (data) { // 行政区
      this.formDatas.area = data;
      this.formDatas.eventDesc.street = '';
      this.formDatas.eventDesc.alleyArea = '';

    },
    streetChange (data) { // 街镇
      this.formDatas.street = data;
      this.formDatas.alleyArea = '';
    },
    alleyAreaChange (data) { // 街道巷
      this.formDatas.alleyArea = data;
    },

    submitSJ(){    //获提交事件
      this.formDatas.eventAddress = this.formDatas.area.name + this.formDatas.street.name +  this.formDatas.doors
    	if(this.validation() &&  this.isSubmitDatas){
	      api.reportSJ(this.formDatas).then((res)=>{
          this.isSubmitDatas = false
	      	const _data = res.data
          if(_data.status == 200){
            this.$router.push({path:'/resultpage/' + this.formDatas.eventType +'/1/?openId='+this.openId  });
          }else{
            this.isSubmitDatas = true
            return this.$store.commit("SHOWTOAST", '提交不成功,请重新提交');
          }
	      });    		
    	}

    },

    //计算已输入字符
    descArea(){
      let textVal = this.formDatas.eventDesc.length;
      this.formDatas.len = textVal;
    },

    validation () {
    let _text
    if(this.formDatas.eventName.length > 3){
      if (!this.formDatas.area.value) {
        _text = '请选择行政区！'
        return this.$store.commit("SHOWTOAST", _text); 
        return false         
      } else if (!this.formDatas.street.value) {
        _text = '请选择街镇！'
        return this.$store.commit("SHOWTOAST", _text); 
        return false             
      } else if(!this.formDatas.alleyArea.value) {
        _text = '请选择街道巷！'
        return this.$store.commit("SHOWTOAST", _text); 
        return false             
      }else if(this.formDatas.eventAddress < 3){
        _text = '事件地点不能少于3个字符！'
        return this.$store.commit("SHOWTOAST", _text); 
        return false  
      }else if(this.formDatas.eventDesc.length < 10){
        _text = '详细问题与意见不能少于10个字!'
        return this.$store.commit("SHOWTOAST", _text); 
        return false   
      }else if(this.upImg.img1.length < 1){
        _text = '至少上传一张图片资料!'
        return this.$store.commit("SHOWTOAST", _text); 
        return false   
      }else{
        return true
      }


    }else{
      _text = '事件名称不能少于3个字符'
      return this.$store.commit("SHOWTOAST", _text); 
      return false 
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
                 _this.formDatas.eventPicture = _pictures                  
           
                }

              return _this.$store.commit("SHOWTOAST", '上传成功'); 
              
              }else{
                return _this.$store.commit("SHOWTOAST", '上传失败');

              }
              
            }).catch(() => {
              return _this.$store.commit("SHOWTOAST", '上传失败');
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
      api.delPic(imgId).then(res => {     //删除已上传图片
        if(res.data.success) {
          this.$store.commit('UPDATE_LOADING', false);
          if(indexo === 1){
            this.upImg.img1.splice(index, 1); 
            for(var i = 0; i <  this.upImg.img1.length; i ++){
              _pictures += this.upImg.img1[i].src +','
            }
            _pictures = _pictures.substring(0, _pictures.lastIndexOf(','));
            _pictures = _pictures.replace("undefined","");
            this.formDatas.eventPicture = _pictures
          }
          return this.$store.commit("SHOWTOAST", '删除成功');          

        }
      }).catch(() => {
        console.log()

      })        
    },
    /* 2019.1.29 旧方法
    requeryEventTypes(){
      if(this.formDatas.eventType === '5') this.formDatas.eventTypeName = '社区环境'
      else if(this.formDatas.eventType === '1') this.formDatas.eventTypeName = '安全隐患'
      else if(this.formDatas.eventType === '2') this.formDatas.eventTypeName = '社区事件'
      else if(this.formDatas.eventType === '3') this.formDatas.eventTypeName = '可疑人员'
      else if(this.formDatas.eventType === '4') this.formDatas.eventTypeName = '社区报警'
      else if(this.formDatas.eventType === '6') this.formDatas.eventTypeName = '问题答疑'
      else if(this.formDatas.eventType === '7') this.formDatas.eventTypeName = '意见收集'
      else if(this.formDatas.eventType === '8') this.formDatas.eventTypeName = '结果反馈'

    }
  */

  },
  computed: {

  },

  mounted() {
    document.title = this.formDatas.eventType
  },
 
};
</script>
<style lang="less" scoped>
.container {
  width:100%;
  max-width: 7.5rem;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.QA .h2{margin:.2rem .3rem;font-size:.3rem;color:#666;font-weight: 100;background:none;}
.QA .h2 .right{float:right;margin-top:.05rem;font-size:.2rem;line-height:.3rem;}
.ul-1{border-top:.01rem solid #ccc;border-bottom:.01rem solid #ccc;padding:0 .3rem;font-size:.3rem;background:#fff;}
.ul-1 li{padding:.2rem 0;border-bottom:.01rem solid #ccc; position: relative;list-style:none;}
.ul-1 li span{display:block;float:left;width:20px;height:20px;margin-top:.03rem;border:.01rem solid #ccc;border-radius:52%; position:relative;margin-right:.2rem;overflow:hidden;}
.ul-1 li span i{display:none;}
.ul-1 li.on span{border:.01rem solid #108ee9;background: #108ee9;}
.ul-1 li.on span i{display:block;color:#fff;position:absolute;width:10px;height:6px;border-bottom:solid 1px currentColor;border-left:solid 1px currentColor;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:50%;left:50%;margin:-6px auto auto -6px;}
.ul-1 li:last-child{border:none;}
.box-1{background:#fff;}
.box-1 p{font-size:.24rem; text-align: right;color:#ccc;}
.fontRed{color:red;}
textarea{width:96%;height:2rem;margin:.2rem 2% 0;border:none;font-size:.3rem;}
::-webkit-input-placeholder {
    color: #999;
}

.box-2{border-top:.01rem solid #ccc;border-bottom:.01rem solid #ccc;padding:.2rem .3rem;background:#fff;overflow:hidden;}
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
.box-1 .text{width:100%;height:.5rem;margin:0 0 .2rem;border:none;font-size:.3rem;}
.plus.icon:after{content:'';position:absolute;width:.06rem;height:.6rem;margin:-.3rem auto auto -.03rem;background-color:#ccc;top:50%;left:50%;}
.but-1{width:5rem;border-radius:.2rem;margin:1rem auto;padding:.2rem 0;text-align:center;color:#fff;background:#2c93f4;}
.bor-top-1{border-top:.01rem solid #ccc;}
.bor-botttom-1{border-bottom:.01rem solid #ccc;}

</style>
