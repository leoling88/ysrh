<template>
    <div class="alert-1" v-if="alertShow">
      <div class="box">
        <div class="title"><slot name="title" ></slot></div>
        <div class="con">
          <slot name="content"></slot>
        </div>
        <div class="but"><span class="bor-r-1"  @click="closeAlert">取消</span><span class="col-blue" @click="confirmBtn">确定</span></div>
      </div>
      <div class="bg"></div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        alertShow: false,

      };
    },
    props:{
      value: {},
      type: {
        type: String,
        default: 'default'        
      }
    },
    methods: {
      closeAlert () {
        this.alertShow = false;
      },
      clickCancel(){
        this.$emit('cancel');
        this.closeAlert();
      },
      confirmBtn(){
        this.$emit('confirm');
      }
    },
    mounted() {
      this.alertShow = this.value;
    },
    watch:{
      value(newVal, oldVal){
          this.alertShow = newVal;
      },
      alertShow(val) {
          this.$emit('input', val);
      }
    },
  };
</script>
<style lang="less" scoped>
.alert-1 span{padding-right:.2rem;}
.alert-1 .bg{position: fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:.4;z-index:100;}
.alert-1 .box{position: fixed;top:15%;left:50%;width:6rem;;margin-left:-3rem;background:#fff;z-index:101;}
.alert-1 .title{border-bottom:.01rem solid #ccc;padding:.2rem 0;text-align:center;font-size:.36rem;color:#000;}
.alert-1 .con{padding:.3rem;  text-align: justify;}
.alert-1 .con label{width:1.4rem;display:inline-table ;line-height:.2rem;color:#888;}
.alert-1 .con label:after {content: " ";display: inline-table;width: 100%;}
.alert-1 .but{display:flex;border-top:.01rem solid #ccc;}
.alert-1 .but span{display:block;width:50%;padding:.2rem 0;text-align: center;}
.bor-r-1{border-right:.02rem solid #ccc;}
.col-blue{color:#0b95ff;}
.font-1{font-size:.26rem;}
.alert-1 .input-1{width:60%;border:none;padding:.2rem .1rem;font-size:.3rem;text-indent:.1rem;text-align: right;background:#f1f1f1;}
</style>

