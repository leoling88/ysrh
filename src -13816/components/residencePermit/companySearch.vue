<template>
  <div style="min-width: 7.5rem;">
    <!--{{this.name}}-->
    <!--{{this.idCard}}-->
    <!-- 搜索框 -->
    <div class="searchBar">
      <x-input class="input_bar" @on-change="keywordChange" placeholder="请输入单位名称" v-model="keyWord" :show-clear="true">
        <img slot="label" class="searchIcon" src='../../assets/images/icon_search.png'/>
      </x-input>
      <span v-if="keyWord" class="cancel_sea search_btn" @click="goSearchCompany">搜索</span>
      <span v-else class="cancel_sea" @click="goBack">取消</span>
    </div>

    <scroller  v-show="companyList.length > 0" lock-x :use-pullup="true"  @on-pullup-loading="infinite" :pullup-config="pullupConfig" ref="wrapper">
      <div class="scroller_cont" style="padding-top: 1.2rem">
        <!-- 结果列表 -->
        <div v-for="item in companyList" @click="selectedItem(item)" class="company_list">
          <span>{{item.dwmc}}</span>
          <icon v-if="qybh == item.qybh" type="success-no-circle" class="icon"></icon>
        </div>
      </div>
    </scroller>

    <div v-show="companyList.length <= 0" class="no_data">暂无数据</div>


  </div>
</template>
<script>
  import { Group, Cell, XButton, Icon, XInput, Scroller, LoadMore } from 'vux';
  import api from '../../api/api.js';
  import mixins from '../../mixins/mixins.js';
  import utils from '../../script/utils';
  export default{
      mixins: [mixins],
      components: {Group, Cell, XButton, Icon, XInput, Scroller, LoadMore  },
      data () {
          return {
            dwmc: '', // 单位名称
            dwdz: '',  // 单位地址
            qybh: '',  // 企业编号
            keyWord: '', // 单位名称关键字
            company: '',
            isLoading: false,
            companyList: [],
            currentPage: 1,  // 当前页
            totalPage: 0, // 分页总页数
            pullupConfig:{
              content: '正在努力加载...',
              pullUpHeight: 30,
              height: 40,
              autoRefresh: false,
              downContent: '松手加载更多',
              upContent: '加载更多',
              loadingContent: '正在努力加载...',
              clsPrefix: 'xs-plugin-pullup-'
            },
          }
      },
      methods: {
        keywordChange (value) {  // 搜索关键变更
          this.$refs.wrapper.enablePullup();
        },
        infinite() { // 上拉加载
          this.currentPage ++;
          if (this.totalPage >= this.currentPage) this.queryCompanyList();
        },
        goSearchCompany () {  // 搜索按钮
          this.currentPage = 1;
          this.totalPage = 0;
          this.companyList = [];
          this.$refs.wrapper.reset({top: 0});
          this.queryCompanyList();
        },
        queryCompanyList() {  // 搜索公司名称
          this.isLoading = false;
          api.queryCompanyList({
            openid: this.$Utils.getLocalStorage("openId"),
            dwmc: this.keyWord,
            account: this.$Utils.getLocalStorage("authInfo").idCard,
            currentPage: this.currentPage
          }).then((res) => {
            const data = JSON.parse(res.data.jsonRes[0]);
            if (data.ackCode == 1 && data.dataList.length > 0) {
              this.totalPage = Math.ceil(data.page.count/data.page.pageSize);
              this.companyList = this.companyList.concat(data.dataList);
              this.$refs.wrapper.donePullup();
              this.$refs.wrapper.reset();
              if (this.totalPage <= this.currentPage) this.$refs.wrapper.disablePullup();
            } else {
              this.$refs.wrapper.disablePullup();
            }
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
            this.$refs.wrapper.donePullup();
            this.$refs.wrapper.disablePullup();
          });
        },
        selectedItem (item) {  // 选择
//          this.dwmc = item.dwmc; // 单位名称
//          this.dwdz = item.dwdz;  // 单位地址
//          this.qybh = item.qybh;  // 企业编号
          this.$Utils.setLocalStorage('/companySearch', item);
          this.$router.go(-1);
//          this.goBack();
        },
        goBack () {
          this.$router.push({ path: '/doorStep4', query: { dwmc: this.dwmc, dwdz: this.dwdz, qybh: this.qybh }});

        }
      },
      mounted () {

      }

    }
</script>
<style lang="less" scoped>
  .searchBar {
    position: fixed;
    top: 0;
    left:0;
    z-index: 999999;
    min-width: 7.5rem;
    overflow: hidden;
    background: #f0f0f0;
    display: flex;
    .searchIcon {
      display: inline-block;
      width: .32rem;
      height: .32rem;
      margin: 0 .20rem 0 .20rem;
    }
    .input_bar {
      font-size: .34rem;
      vertical-align: middle;
      background: #f0f0f0;
      border: none;
      flex: 7;
    }

    .cancel_sea {
      font-size: .34rem;
      color: #999;
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search_btn{
      color: #1590E9;
    }

  }

  /* 列表 */
  .company_list {
    width:100%;
    padding: 0 .30rem;
    background: #fff;
    line-height: 1.00rem;
    position: relative;
    display: flex;
  }
  .company_list::before{
    content: '';
    display: block;
    width:6.90rem;
    height: 1px;
    background: #ddd;
    position: absolute;
    left: .30rem;
    bottom: 0;
    transform: scale(1, .5);
  }
  .company_list:last-of-type::before{display: none}
  .company_list text{
    font-size: .34rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width: 85%;
  }
  .company_list .icon{
    color: #1590E9;
    position: absolute;
    right:.35rem;
    top: .15rem;
  }

  .no_data {
    width: 100%;
    height: 6rem;
    line-height: 6rem;
    text-align: center;
    color: #666;
  }
</style>
