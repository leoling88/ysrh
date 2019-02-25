<template>
  <div class="picker_cont">

    <!--因为2.9.2版本的popup-picker组件的disabled为true时，右侧的箭头隐藏了，所以用了这个div-->
    <div class="mask_layout" v-show="disabled" @click="maskHanlder"></div>

    <popup-picker
    v-model="value"
    :title="title"
    :columns="1"
    :data="dataList"
    @on-change="onChange"
    :placeholder="placeholder"
    show-name></popup-picker>

  </div>
</template>
<script>
  import { PopupPicker} from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import { mapState } from 'vuex';
  export default {
    mixins: [mixins],
    components: {PopupPicker},
    props: {
      myid: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '行政区'
      },
      placeholder: {
        type: String,
        default: '请选择行政区'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      apiMethod: {  // 当前数据请求接口
        type: String,
        default: ''
      },
      code: { // 下一级数据请求参数
        type: String,
        default: ''
      }
    },
    data () {
      return {
        value: [],
        dataList: []
      }
    },
    watch: {
      code: function (val, oldVal) { // 通过监控code的变化来请求下一级数据
        this.value = [];
        this.dataList = [];
        if (val) this.getData();
      }
    },
    methods: {
      onChange (value) {
         this.dataList.find((item) => {
             if (item.value == value.toString()) {
               return this.$emit('onChange', item);
             }
         });
      },
      getData () { // 获取数据
        api[this.apiMethod]({
          openid: this.$Utils.getLocalStorage("openId"),
//          openid:this.myid,
          account: this.idCard,
          code: this.code
        }).then((res) => {
          const data = res.data.jsonRes ? JSON.parse(res.data.jsonRes[0]) : res.data.obj;
          if (res.data.success) {
            switch (this.apiMethod) {
              case 'queryDictionaryList':
                if (this.code && this.code.length > 8) { // 房屋类型
                  this.filterData(data.ZZDXZ);
                } else { // 行政区
                  this.filterData(data.XZQ);
                }
                break;
              case 'getDoorInfo':  // 门牌号
                this.filterData(data.dataList, 2);
                break;
              case 'getRoomNum':  // 房号
                this.filterData(data.dataList, 3);
                break;
              default:  // 街镇，街道巷
                this.filterData(data.dataList);
                break;
            }
          }

        });
      },
      filterData(srcData, type = 1){  // 数据过滤
        let temp = [];
        if (srcData.length == 0) return;
        if (type == 1) {
          srcData.forEach((item) => {
            temp.push({
              name: item.itemName,
              value: item.itemCode
            })
          });
        } else if (type == 2) {
          srcData.forEach((item) => {
            temp.push({
              name: item.mph,
              value: item.zhid
            })
          });
        } else if (type == 3) {
          srcData.forEach((item) => {
            temp.push({
              name: item.dy,
              value: item.fhid
            })
          });
        }
        this.dataList = temp;
      },
      maskHanlder () {
        this.$store.commit('SHOWTOAST', '请先选择上一级');
      }
    },
    mounted () {
      if (this.code) this.getData();
      console.log('myid',this.myid)
    }
  }
</script>
<style scoped lang="less">
  .picker_cont{
    width: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;

    .mask_layout{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
      width: 100%;
      height: 44px;
    }

  }
  /*.vux-cell-box12313 {*/
    /*width: 100%;*/
    /*height: .98rem;*/
    /*padding: 0 .20rem;*/
    /*border-bottom:1px solid #e6e6e6;*/
    /*box-sizing: border-box;*/
    /*background-size: .20rem .36rem;*/
    /*background-repeat: no-repeat;*/
    /*background-position: 7.00rem .26rem;*/
    /*background-image: url('data:image/svg+xml;charset=utf-8,<svg width="16" height="26" viewBox="0 0 16 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="UI-KIT_基础元件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="9.9基础元件" transform="translate(-5809.000000, -8482.000000)" fill="#C7C7CC"><polygon id="Disclosure-Indicator" points="5811 8482 5809 8484 5820.5 8495 5809 8506 5811 8508 5825 8495"></polygon></g></g></svg>');*/
  /*}*/
  /*.picker_cont.noborder{*/
    /*border:none;*/
  /*}*/
  /*.picker_cont.disabled view{*/
    /*color: #BBBBBB;*/
  /*}*/
  /*.picker_cont view{*/
    /*flex: 1;*/
    /*line-height:.98rem;*/
    /*font-size: .34rem;*/
  /*}*/
  /*.picker_cont view:last-of-type{*/
    /*text-align: right;*/
    /*padding-right: .35rem;*/
  /*}*/
  /*.picker_cont .placeholder{*/
    /*color: #BBBBBB;*/
  /*}*/
</style>

<style>
  /*.vux-cell-box .weui-cell__ft{display: none;}*/
  /*.vux-cell-box .vux-popup-picker-value{color: #000;}*/
</style>
