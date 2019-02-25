<template>
  <div class="tabs_cont">
    <template v-for="(item, index) in tabs">
      <div :class="['item', step >= (index + 1) ? 'active' : '']" :key="index">
        <div class="number">{{index + 1}}</div>
        <div class="text">{{item.name}}</div>
      </div>

    </template>

    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      step: {
        type: [Number],
        default: 1
      },
      tabs: {
        type: Array,
        default: () => [
          {
            name: "居住信息",
            value: "1"
          },
          {
            name: "审核时间",
            value: "2"
          },
          {
            name: "个人信息",
            value: "3"
          },
          {
            name: "其他信息",
            value: "4"
          }
        ]
      }
    },
    data () {
      return {
        currentTab: 0
      }
    },
  }
</script>
<style scoped lang="less">
  .tabs_cont{
    width:7.50rem;
    padding: 0 .30rem;
    background: #fff;
    overflow: hidden;
    margin: 0 auto .3rem auto;
    display: flex;
    justify-content: space-around;
  }
  .tabs_cont .item {
    flex: 1;
    padding: .40rem 0 .30rem 0;
    overflow: hidden;
    box-sizing: border-box;
    line-height:.92rem;
    text-align: center;
    font-size: .32rem;
    color: #888;
    font-family: PingFang-SC-Medium;
    position: relative;
  }

  .tabs_cont .item::before{
    content: "";
    display: block;
    width: 25%;
    height: 0.03rem;
    background-color: #ced7de;
    position: absolute;
    left: 0;
    top: .65rem;
    z-index: 20;
  }
  .tabs_cont .item::after{
    content: "";
    display: block;
    width: 25%;
    height: 0.03rem;
    background-color: #ced7de;
    position: absolute;
    right: 0;
    top: .65rem;
    z-index: 20;
  }
  .tabs_cont .item:first-of-type::before,
  .tabs_cont .item:last-of-type::after{display: none;}

  .tabs_cont .item .number{
    width: .48rem;
    height: .48rem;
    margin: 0 auto;
    overflow: hidden;
    line-height: .48rem;
    border-radius: 10.00rem;
    background-color: #d2d2d2;
    text-align: center;
    font-size: .26rem;
    color: #ffffff;
  }
  .tabs_cont .item .text{
    margin-top: .12rem;
    line-height: .48rem;
    text-align: center;
    font-size: .26rem;
    color: #888;
  }


  .tabs_cont .item.active{
    color: #3389ff;
  }

  .tabs_cont .item.active .number{
    background-color: #108ee9;
  }
  .tabs_cont .item.active .text{
    color:#108ee9;
  }
  .tabs_cont .item.active::before,
  .tabs_cont .item.active::after{
    background-color: #108ee9;
  }

  .tags_cont{
    width:6.90rem;
    overflow: hidden;
    margin: .30rem auto .13rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .tags_cont navigator{
    width: 2.20rem;
    height: .96rem;
    margin-bottom:.13rem;
    background: green;
    line-height:.96rem;
    box-sizing: border-box;
    background-color: #ffffff;
    border: solid 1px #e5e5e5;
    color: #000;
    font-size: .28rem;
    text-align: center;
  }

</style>
