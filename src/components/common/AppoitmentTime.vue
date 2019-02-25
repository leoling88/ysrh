<template>
    <group class="unit_cont">
      <template v-for="item in timeList">
        <cell :title="`${item.times}　剩余 ${item.less}个`" @click.native="checkTime(item)" class="cell">
          <icon v-if="item.szid == value.szid" class="icon" type="success-no-circle"></icon>
        </cell>
      </template>

      <!--<div class="timeList_no" v-if="timeList.length == 0">暂无名额哦，请您预约别的时间吧</div>-->
      <div class="timeList_no" v-if="timeListtype">暂无名额哦，请您预约别的时间吧</div>
    </group>
</template>
<script>
  import { Group, Cell, Icon } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils.js';
  import { mapState } from "vuex";
  export default {
    mixins: [mixins],
    components: {Group, Cell, Icon},
    props: {
      appoitmentDate: {
        type: String,
        default: ''
      },
      streeCode: {  // 街镇代码
        type: String,
        default: ''
      },
      apiMethod: {  // 数据接口
        type: String,
        default: 'querySmhsszList'
      }
    },
    data () {
      return {
        value: '',
        timeListtype:false,
        timeList: []
      }
    },
    watch: {
      appoitmentDate: function (val) { // 通过监测日期，请求相应日期的数据
        this.timeList = [];
        this.value = '';
        if (val) {
          this.querySmhsszList();
          this.$emit('change', this.value);
        }
      }
    },
    methods: {
      checkTime (value) {
        this.$emit('change', value);
        this.value = value;
      },
      querySmhsszList() {  // 获取最近七天上门核实时间
        api[this.apiMethod]({
          openid: this.$Utils.getLocalStorage("openId"),
//          openid:this.openId,
          jz: this.streeCode,
          yyrq: this.appoitmentDate,
          account: this.$Utils.getLocalStorage("authInfo").idCard,
        }).then((res) => {
          const data = JSON.parse(res.data.jsonRes[0]);
          if (res.data.success && data.ackCode == 1) {
            if (data.dataList.length == 0) {
              this.$store.commit('SHOWTOAST', '暂无名额哦，请您预约别的时间吧!');
              this.timeListtype = true;
            } else {
              this.timeListtype = false;
              this.filterData(data.dataList);
            }
          } else {
            this.$store.commit('SHOWTOAST', '只能预约最近七天以内');
            this.timeList = [];
          }
        });
      },
      filterData(srcData) {
        let temp = [];
        srcData.forEach((item) => {
          temp.push({
            szid: item.szid,
            times: item.kjsj + '-'+ item.jssj,
            less: item.yyzdz - item.dqyyz
          });
        });
        this.timeList = temp;
      },
    },
    computed: {
      ...mapState([
        'idCard','openId','userId','name'
      ])
    },
  }
</script>
<style scoped lang="less">
  .unit_cont{
    width: 100%;
    margin-top: .3rem;
    background: #fff;
    overflow: hidden;
    justify-content: space-around;
  }
  .cell{
    position: relative;
    .icon{
      position: absolute;
      right: .8rem;
      top: .16rem;
      color:#3389FF;
      width: .1rem;
    }
  }
  .timeList_no{text-align:center;color:#888;padding:.3rem 0;}


</style>
