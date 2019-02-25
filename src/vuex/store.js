import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  userId: '',
  idCard: '',
  name: '',
  openId: '',
  loadingShow: false,
  toastShow: false,
  toastMsg:'',
  toastWidth:'auto',
  showTabbar:'',
  showTabbarIndex:'',
  direction: '1', // 页面转场动画方向
  keepAlive: [],  // 保存需要缓存的组件
  messageShow:{
    show: false,
    text:''
  },
  userLoginInfo:null,//公积金登录
  //authInfo:null,//刷脸
  fromId:"",//房屋租赁申请
}

// 定义所需的 mutations
const mutations = {
  GET_KEEP_FROMID(state,data){
    console.log(data,"data-----")
    state.fromId = data
  },
  UPDATE_KEEP_ALIVE(state, data) {
    if (data === -1) {
      if (state.keepAlive.len) state.keepAlive = state.keepAlive.slice(0, -1);
    } else if (data) {
      state.keepAlive.push(data);
    } else {
      state.keepAlive = [];
    }
  },
  //更新公积金用户登录信息
  UPDATE_USER_LOGIN_INFO(state, data) {
    state.userLoginInfo = data;
  },
  //更新用户信息
  UPDATE_USER_INFO(state, data) {
    // state.userInfo = data;
    state.userId = data.userId;
    state.idCard = data.idCard;
    state.name = data.name;
    state.openId = data.openId;// 微信的openid
  },
  //显示公共底部菜单栏
  SHOWTABBAR(state, data) {
    state.showTabbar = true;
    state.showTabbarIndex = data;
  },
  //隐藏公共底部菜单栏
  HIDETABBAR(state) {
    state.showTabbar = false;
  },
  //显示提示框
  SHOWTOAST(state, data) {
    state.toastMsg = data.text||data;
    state.toastWidth  = data.width||'auto';
    state.toastShow = true;
  },
  //清空显示提示框
  CLEARSHOWTOAST(state, data) {
    state.toastShow = data;
  },
  UPDATE_LOADING(state, data) {
    state.loadingShow = data;
  },
  //弹出提示信息
  COM_MEASSAGES_STATUS(state, data1 , data2) {
      state.messageShow.show = data1
      state.messageShow.text = 'ssss'
  },
  UPDATE_DIRECTION(state, data) {
    state.direction = data;
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
