// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router/index'
import App from './App'
import './assets/css/style.css'//自定义页面样式
import './assets/css/yxcom.css'//自定义页面样式
import store from './vuex/store'
import VideoPlayer from 'vue-video-player'
import lrz from 'lrz' 
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
//表单校验
import VeeValidate,{ Validator } from 'vee-validate'
//表单校验--国际化
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
     zh_CN
  }
});

//配置表单提示信息
const dict = {
  custom: {
    password: {
      required: '密码不能为空'
    }
  }
};

Validator.localize('zh_CN', dict);
import utils from './script/utils'//配置基础工具类
Vue.use(utils);

// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
// import Carousel3d from 'vue-carousel-3d';
// Vue.use(Carousel3d);


//Loading...
import  { LoadingPlugin } from 'vux';
Vue.use(LoadingPlugin);

FastClick.attach(document.body);

Vue.prototype.$bus = new Vue({});//两个组件传递参数全局属性

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', 1)
    } else {
      store.commit('UPDATE_DIRECTION', -1)
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', 1)
  }

  next()
});
