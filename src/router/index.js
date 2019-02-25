import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    //首页
    {
      path: '/',
      component: function (resolve) {
        require(['../components/home/homeIndex.vue'], resolve);
      },
      meta: {
        title: '广州市越秀区智能融合服务平台'
      }
    },
    //社保查询
    {
      path: '/social/:idCard',
      component: function (resolve) {
        require(['../components/social/social.vue'], resolve);
      },
      meta: {
        title: '社保查询'
      }
    },
    {
      path: '/paymentdetails/:idCard',
      component: function (resolve) {
        require(['../components/social/paymentdetails.vue'], resolve);
      },
      meta: {
        title: '缴费明细'
      }
    },
    {
      path: '/paymentstatus/:idCard',
      component: function (resolve) {
        require(['../components/social/paymentstatus.vue'], resolve);
      },
      meta: {
        title: '缴费状态'
      }
    },
    //居住证首页
    {
      path: '/residencePermit',
      component: function (resolve) {
        require(['../components/residencePermit/index.vue'], resolve);
      },
      meta: {
        title: '居住证首页'
      }
    },
    //居住登记预约上门
    {
      path: '/doorStep1',
      component: function (resolve) {
        require(['../components/residencePermit/doorStep1.vue'], resolve);
      },
      meta: {
        title: '居住登记预约上门'
      }
    },
    //居住登记预约上门
    {
      path: '/doorStep2',
      component: function (resolve) {
        require(['../components/residencePermit/doorStep2.vue'], resolve);
      },
      meta: {
        title: '居住登记预约上门'
      }
    },
    //居住登记预约上门
    {
      path: '/doorStep3',
      component: function (resolve) {
        require(['../components/residencePermit/doorStep3.vue'], resolve);
      },
      meta: {
        title: '居住登记预约上门'
      }
    },
    //居住登记预约上门
    {
      path: '/doorStep4',
      component: function (resolve) {
        require(['../components/residencePermit/doorStep4.vue'], resolve);
      },
      meta: {
        title: '居住登记预约上门'
      }
    },
    //居住登记预约上门
    {
      path: '/companySearch',
      component: function (resolve) {
        require(['../components/residencePermit/companySearch.vue'], resolve);
      },
      meta: {
        title: '单位名称查询'
      }
    },
    //居住登记预约窗口办理 -- 选择区街镇
    {
      path: '/bookTime1',
      component: function (resolve) {
        require(['../components/residencePermit/bookTime1.vue'], resolve);
      },
      meta: {
        title: '居住登记预约窗口办理'
      }
    },
    //居住登记预约窗口办理 -- 预约时间
    {
      path: '/bookTime2',
      component: function (resolve) {
        require(['../components/residencePermit/bookTime2.vue'], resolve);
      },
      meta: {
        title: '居住登记预约窗口办理'
      }
    },
    //居住登记预约窗口办理 -- 个人信息
    {
      path: '/bookTime3',
      component: function (resolve) {
        require(['../components/residencePermit/bookTime3.vue'], resolve);
      },
      meta: {
        title: '居住登记预约窗口办理'
      }
    },
    //居住登记预约窗口办理 -- 预约成功
    {
      path: '/bookSuccess',
      component: function (resolve) {
        require(['../components/residencePermit/bookSuccess.vue'], resolve);
      },
      meta: {
        title: '居住登记预约窗口办理'
      }
    },
    //居住证申领预约
    {
      path: '/apply',
      component: function (resolve) {
        require(['../components/residencePermit/apply.vue'], resolve);
      },
      meta: {
        title: '居住证申领预约'
      }
    },
    //居住证申领预约 -- 查询结果
    {
      path: '/applySearch',
      component: function (resolve) {
        require(['../components/residencePermit/applySearch.vue'], resolve);
      },
      meta: {
        title: '居住证申领预约'
      }
    },
    //居住证申领预约 -- 预约申领日期时间
    {
      path: '/appointmentStreet',
      component: function (resolve) {
        require(['../components/residencePermit/appointmentStreet.vue'], resolve);
      },
      meta: {
        title: '居住证申领预约'
      }
    },
    //居住证签注预约
    {
      path: '/renew',
      component: function (resolve) {
        require(['../components/residencePermit/renew.vue'], resolve);
      },
      meta: {
        title: '居住证签注预约'
      }
    },
    //公积金查询登录
    {
      path: '/hund/login',
      component: function (resolve) {
        require(['../components/hund/index.vue'], resolve);
      },
      meta: {
        title: '公积金登录'
      }
    },
    //公积金信息
    {
      path: '/hund/home',
      component: function (resolve) {
        require(['../components/hund/hund.vue'], resolve);
      },
      meta: {
        title: '公积金'
      }
    },
    //公积金--缴存明细
    {
      path: '/hund/depositeDetail',
      component: function (resolve) {
        require(['../components/hund/depositeDetail.vue'], resolve);
      },
      meta: {
        title: '缴存明细'
      }
    },
    //公积金--缴存信息
    {
      path: '/hund/depositeInfo',
      component: function (resolve) {
        require(['../components/hund/depositeInfo.vue'], resolve);
      },
      meta: {
        title: '缴存信息'
      }
    },
    //资讯--首页
    {
      path: '/information',
      component: function (resolve) {
        require(['../components/information/index.vue'], resolve);
      },
      meta: {
        title: '资讯'
      }
    },
    //刷脸登录
    {
      path: '/login',
      component: function (resolve) {
        require(['../components/home/login.vue'], resolve);
      },
      meta: {
        title: '登录'
      }
    },
    //我的
    {
      path: '/my',
      component: function (resolve) {
        require(['../components/home/my.vue'], resolve);
      },
      meta: {
        title: '个人中心'
      }
    },
    //积分服务
    {
      path: '/IntegralService',
      component: function (resolve) {
        require(['../components/home/IntegralService.vue'], resolve);
      },
      meta: {
        title: '积分服务'
      }
    },
    //资讯详情
    {
      path: '/newsDetail',
      component: function (resolve) {
        require(['../components/information/newsDetail.vue'], resolve);
      },
      meta: {
        title: '资讯'
      }
    },
    //资讯详情
    {
      path: '/article',
      component: function (resolve) {
        require(['../components/information/article.vue'], resolve);
      },
      meta: {
        title: '资讯'
      }
    },

    //党建详情
    {
      path: '/article2/:openId/:listType/:comId',
      component: function (resolve) {
        require(['../components/information/article2.vue'], resolve);
      },
      meta: {
        title: '活动详情'
      }
    },
    //学堂详情
    {
      path: '/article3/:openId/:listType/:comId',
      component: function (resolve) {
        require(['../components/information/article3.vue'], resolve);
      },
      meta: {
        title: '学堂详情'
      }
    },

     //党建-报名反馈结果面
    {
      path: '/resultApply/:listType/:comId/:name',
      component: function (resolve) {
        require(['../components/information/resultapply.vue'], resolve);
      },
      meta: {
        title: '提交结果'
      }
    },


     //个人中心-提交反馈结果面
    {
      path: '/resultpage/:eventType/:state',
      component: function (resolve) {
        require(['../components/suishoupai/resultpage.vue'], resolve);
      },
      meta: {
        title: '提交结果'
      }
    },

    //视频播放
    {
      path: '/vedio',
      component: function (resolve) {
        require(['../components/information/vedio.vue'], resolve);
      },
      meta: {
        title: '资讯'
      }
    },

    //融合课堂列表1
    {
      path: '/ronghexuetang/:openId/:listType',
      component: function (resolve) {
        require(['../components/information/ronghexuetang.vue'], resolve);
      },
      meta: {
        title: '融合学堂'
      }
    },
    // //融合活动列表1
    {
      path: '/ronghehuodong/:openId/:listType',
      component: function (resolve) {
        require(['../components/information/ronghehuodong.vue'], resolve);
      },
      meta: {
        title: '融合活动'
      }
    },

    //党建列列表1
    {
      path: '/dangjian/:openId/:listType',
      component: function (resolve) {
        require(['../components/information/dangjian.vue'], resolve);
      },
      meta: {
        title: '党建活动'
      }
    },

    //随手拍事件列表
    {
      path: '/suishoupai/:openId/:listType',
      component: function (resolve) {
        require(['../components/suishoupai/index.vue'], resolve);
      },
      meta: {
        title: '事件随手拍'
      }
    },
    //随手拍提交事件
    {
      path: '/inputevent/:openId/:eventType',
      component: function (resolve) {
        require(['../components/suishoupai/inputevent.vue'], resolve);
      },
      meta: {
        title: '提交事件随手拍'
      }
    },

    //随手拍详细
    {
      path: '/eventdetails/:openid/:id',
      component: function (resolve) {
        require(['../components/suishoupai/details.vue'], resolve);
      },
      meta: {
        title: '事项详情'
      }
    },

    //注册
    {
      path: '/register',
      component: function (resolve) {
        require(['../components/home/register.vue'], resolve);
      },
      meta: {
        title: '注册',
      }
    },
     //个人中心-用户管理
    {
      path: '/usercontrol/:openId',
      component: function (resolve) {
        require(['../components/home/usercontrol.vue'], resolve);
      },
      meta: {
        title: '账户管理',
      }
    },
     //个人中心-密码管理
    {
      path: '/password/:openId',
      component: function (resolve) {
        require(['../components/home/password.vue'], resolve);
      },
      meta: {
        title: '密码管理',
      }
    },
    // 房租租赁备案申请  ---旧
    {
      path: '/leasingContract',
      component: function (resolve) {
        require(['../components/leasingContract/index.vue?openId='], resolve)
      },
      meta: {
        title: '房屋租赁备案申请'
      }
    },
    // 备案1
    {
      path: '/leasingContract/restchoose',
      component: function (resolve) {
        require(['../components/leasingContract/restchoose.vue'], resolve)
      },
      meta: {
        title: '备案1'
      }
    },
    // 备案2
    {
      name:'missingness',
      path: '/leasingContract/missingness',
      component: function (resolve) {
        require(['../components/leasingContract/missingness.vue'], resolve)
      },
      meta: {
        title: '备案2'
      }
    },
    // 备案3
    {
      path: '/leasingContract/leasingPhotos',
      component: function (resolve) {
        require(['../components/leasingContract/leasingPhotos.vue'], resolve)
      },
      meta: {
        title: '备案3'
      }
    },
    // 备案4
    {
      path: '/leasingContract/confirm',
      component: function (resolve) {
        require(['../components/leasingContract/confirm.vue'], resolve)
      },
      meta: {
        title: '备案4'
      }
    },
    // 备案成功
    {
      path: '/leasingContract/confirmSuccess',
      component: function (resolve) {
        require(['../components/leasingContract/confirmSuccess.vue'], resolve)
      },
      meta: {
        title: '备案4'
      }
    },
     //  房租赁备案申请  ---旧  end
    // 房东租赁备案申请-step1  ---新20190218
    {
      path: '/leasingContract2/step1',
      component: function (resolve) {
        require(['../components/leasingContract2/step1.vue'], resolve)
      },
      meta: {
        title: '房屋租赁备案申请'
      }
    },
     // 租客租赁备案申请-step1  ---新20190218
    {
      path: '/leasingContract2/step1zk',
      component: function (resolve) {
        require(['../components/leasingContract2/step1zk.vue'], resolve)
      },
      meta: {
        title: '房屋租赁备案申请'
      }
    },   
    // 房租租赁备案申请-step2  ---新20190218
    {
      path: '/leasingContract2/step2',
      component: function (resolve) {
        require(['../components/leasingContract2/step2.vue'], resolve)
      },
      meta: {
        title: '房屋租赁备案申请'
      }
    },
    // 租客租赁备案申请-step2  ---新20190218
    {
      path: '/leasingContract2/step2zk',
      component: function (resolve) {
        require(['../components/leasingContract2/step2zk.vue'], resolve)
      },
      meta: {
        title: '房屋租赁备案申请'
      }
    },

    // 备案成功
    {
      path: '/leasingContract2/confirmSuccess',
      component: function (resolve) {
        require(['../components/leasingContract2/confirmSuccess.vue'], resolve)
      },
      meta: {
        title: '备案4'
      }
    },
    //预约上门结果页
    {
      path: '/doorSuccess',
      component: function (resolve) {
        require(['../components/residencePermit/doorSuccess.vue'], resolve)
      },
      meta: {
        title: '预约上门'
      }
    },
    //上门预约详情
    {
      path: '/doorDetail/:id',
      component: function (resolve) {
        require(['../components/residencePermit/doorDetail.vue'], resolve)
      },
      meta: {
        title: '预约详情'
      }
    },
    //窗口预约详情
    {
      path: '/bookDetail/:id',
      component: function (resolve) {
        require(['../components/residencePermit/bookDetail.vue'], resolve)
      },
      meta: {
        title: '预约详情'
      }
    },
    //进度查询
    {
      path: '/progress',
      component: function (resolve) {
        require(['../components/residencePermit/progress.vue'], resolve)
      },
      meta: {
        title: '进度查询'
      }
    },
    //业务指引
    {
      path: '/guide',
      component: function (resolve) {
        require(['../components/residencePermit/guide.vue'], resolve)
      },
      meta: {
        title: '业务指引'
      }
    },

    //意见反馈
    {
      path: '/feedback/:openid',
      component: function (resolve) {
        require(['../components/help/feedback.vue'], resolve);
      },
      meta: {
        title: '意见反馈',
        showBottom: false
      }
    },
    //我的反馈
    {
      path: '/myQ/:openid',
      component: function (resolve) {
        require(['../components/help/myQ.vue'], resolve);
      },
      meta: {
        title: '我的反馈',
        showBottom: false
      }
    },
    //反馈与帮助
    {
      path: '/help/:openid',
      component: function (resolve) {
        require(['../components/help/index.vue'], resolve);
      },
      meta: {
        title: '意见反馈',
        showBottom: true
      }
    },
    //问题解答
    {
      path: '/article/:comGUID',
      component: function (resolve) {
        require(['../components/help/article.vue'], resolve);
      },
      meta: {
        title: '意见反馈',
        showBottom: true
      }
    },
    //我的问题解答
    {
      path: '/article2/:comGUID',
      component: function (resolve) {
        require(['../components/help/article2.vue'], resolve);
      },
      meta: {
        title: '意见反馈',
        showBottom: false
      }
    },
    //处理成功页面
    {
      path: '/results/:openid',
      component: function (resolve) {
        require(['../components/help/results.vue'], resolve);
      },
      meta: {
        title: '提交结果',
        showBottom: false
      }
    },
    //处理成功页面
    {
      path: '/regulations1',
      component: function (resolve) {
        require(['../components/help/regulations1.vue'], resolve);
      },
      meta: {
        title: '居住证权益',
        showBottom: false
      }
    },
    //我的标签
    {
      path: '/mylabel',
      component: function (resolve) {
        require(['../components/user/mylabel.vue'], resolve);
      },
      meta: {
        title: '标签管理'
      }
    },
    //栏目列表面
    {
      path: '/morelist/:openid',
      component: function (resolve) {
        require(['../components/information/morelist.vue'], resolve);
      },
      meta: {
        title: '标签管理'
      }
    },

  ]
})
