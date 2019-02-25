import baseUrl from './config';
import axios from 'axios';
import qs from 'qs';
var xhr = axios;
axios.defaults.baseURL = baseUrl;

export default {

  /**社保查询接口 */
  /**个人信息查询 */
  findPersonalBasicInfo(params) {
    return xhr.get(`https://zwt.createt.cn/gzGovTong/mobile/shebao/findPersonalBasicInfo?aac147=${params.idCard}`);
  },
  /**缴费状态查询
   * personalNo: 社保号
   *  idCard: 身份证
   *  type: 业务类型，1.养老 2.农转居  3.失业保险 4.工伤保险 5.生育保险
   */
  personalPaymentStatus(params) {
    https://zwt.createt.cn/gzGovTong/mobile/shebao/personalPaymentStatus
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/shebao/personalPaymentStatus', {
      params: {
        personalNo: params.personalNo,
        idCard: params.idCard,
        type: params.type
      }
    })
  },
  /*
   *  个人缴费历史查询（城镇职工/农转居）
   *  params {Object} 参数对象
   *  aac001: 个人编号(必填)
   *  aae140: 险种类型 1.养老 2.农转居  3.失业保险 4.工伤保险 5.生育保险；险种参数为空，返回的是全部险种
   *  aae003s: 起始年月
   *  aae003d: 结束年月
   * */
  personalContribution(params) {
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/shebao/personalContribution', {
      params: {
        aac001: params.aac001,
        aae140: params.aae140,
        aae003s: params.aae003s,
        aae003d: params.aae003d
      }
    })
  },

  /*
   *  医疗缴费历史历史查询（城镇职工/农转居）
   *  params {Object} 参数对象
   *  aac001: 个人编号(必填)
   *  aae030: 起始年月
   *  aae031: 结束年月
   * */
  findMedicalPayHistory(params) {
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/shebao/findMedicalPayHistory', {
      params: {
        aae031: params.aae031,
        aae030: params.aae030,
        aac001: params.aac001
      }
    })
  },

  /**公积金查询接口 */
  /**个人登录 */
  fundLogin(yhhm, yhmm, dllx) {

    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/af/userLogin?yhhm=' + yhhm + '&yhmm=' + yhmm + '&dllx=' + dllx);
    // return xhr.post('http://192.168.7.40/gzGovTong/mobile/af/userLogin?yhhm=' + yhhm + '&yhmm=' + yhmm + '&dllx=' + dllx);

    // return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/af/userLogin', {
    //   params: {
    //     yhhm: params.yhhm,
    //     yhmm: params.yhmm,
    //     dllx: params.dllx
    //   }
    // })

    // return xhr.post(`https://zwt.createt.cn/gzGovTong/mobile/af/userLogin?jsonStr=${JSON.stringify(params)}`);

  },
  myAccumulationFund(params) {
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/af/userDeposit', {
      params: {
        zjh: params.zjh,
        gjjzh: params.gjjzh,
        capinfoSession: params.capinfoSession
      }
    })
  },
  /**
   字典查询  城市
   */
  queryDictionaryList(params) {
    return xhr.post('https://zlwkt.fingjuan.com/lsweix/api/wechatApi/queryDictionaryList', {
      params: {
        openid: params.openid,
        opentype: '2',
        typeCode: params.typeCode,
        account: params.account
      }
    })
  },
  /*查询居住证信息
   * params:{object}
   * zjhm:证件号码
   * xm:姓名
   * openid:openid
   * opentype: 1 支付宝  2微信
   */
  jzzCardInfo(params) {
    return xhr.post("https://zwt.createt.cn/gzGovTong/mobile/laisuiJzzCardInfo", qs.stringify({
      zjhm: params.zjhm,
      xm: params.xm,
      openid: params.openid,
      opentype: '2'
    }))
  },
  /*
   * 查询卡信息接口
   * params {Object} 参数对象
   * userId: 用户标识
   * idCard: 身份证号
   * cardType: 社会保障卡-1 住房公积金-2  驾驶证-3  行驶证-4  居住证-9
   */
  cardInfo(params) {
    return xhr.get('http://zwt.createt.cn/gzGovTong/mobile/userCard/cardInfo', {
      // return xhr.get('/mobile/userCard/cardInfoUserId', {
      params: {
        userId: params.userId,
        cardType: params.cardType,
        idCard: params.idCard,
        name: params.name,
        openType: 1
      }
    })
  },
  /*
   *  请求行政区字典数据
   *  params {Object} 参数对象
   *  openid：支付宝id
   *  opentype: 1,支付宝应用, 2,来穗小程序
   *  wxsqn: 微信授权码
   * typeCode: 字典编码类型
   * */
  queryDictionaryList(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/queryDictionaryList', qs.stringify({
      openid: params.openid,
      opentype: '2',
      typeCodes: params.typeCodes || 'XZQ,ZZDXZ',
      account: params.account
    }))
  },
  /*
   * 请求街道字典数据
   * params {Object} 参数对象
   * openid：支付宝id
   * opentype: 1,支付宝应用, 2,来穗小程序
   * wxsqn: 微信授权码
   * typeCode: 字典编码类型
   * */
  getStreetData(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryJzdmPage', qs.stringify({
      openid: params.openid,
      opentype: 1,
      xzq: params.xzq || params.code,
      itemName: params.itemName,
      account: params.account,
      pageSize: 500
    }));
  },
  /*
   *  请求街道巷字典数据
   *  params {Object} 参数对象
   *  openid：支付宝id
   *  opentype: 1,支付宝应用, 2,来穗小程序
   *  wxsqn: 微信授权码
   * typeCode: 字典编码类型
   */
  getStreetxData(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryJddmPage', qs.stringify({
      openid: params.openid,
      opentype: 1,
      itemName: '',
      jz: params.jz || params.code,
      account: params.account,
      pageSize: 50
    }))
  },
  /*
   * 请求门牌号字典数据
   * params {Object} 参数对象
   * openid：支付宝id
   * opentype: 1,支付宝应用, 2,来穗小程序
   * wxsqn: 微信授权码
   * typeCode: 字典编码类型
   */
  getDoorInfo(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryFwxxzPage', qs.stringify({
      openid: params.openid,
      opentype: 1,
      jddm: params.jddm || params.code,
      itemName: params.itemName,
      account: params.account,
      pageSize: 500
    }))
  },
  /*
   *  请求详址/房号字典数据
   *  params {Object} 参数对象
   *  openid：支付宝id
   *  opentype: 1,支付宝应用, 2,来穗小程序
   *  wxsqn: 微信授权码
   * typeCode: 字典编码类型
   * */
  getRoomNum(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryFwxxfhPage', qs.stringify({
      openid: params.openid,
      opentype: 1,
      dy: params.dy,
      zhid: params.zhid || params.code,
      account: params.account,
      pageSize: 500
    }))
  },
  /*
   *  公积金登录
   *  yhhm：登录号码，二代身份证号或公积金账号或手机号码
   *  yhmm: 用户密码
   *  dllx：登录类型
   * */
  userLogin(params) {
    return axios.post('https://zwt.createt.cn/gzGovTong/mobile/af/userLogin', qs.stringify({
      // return axios.post('/mobile/af/userLogin', qs.stringify({
      yhhm: params.yhhm,
      yhmm: params.yhmm,
      dllx: params.dllx
    }))
  },
  /*
     *  个人缴存信息查询
     *  params {Object} 参数对象
     *  zjh: 身份证
     *  gjjzh: 公积金账号
     *  capinfoSession: 业务登录码
     * */
  userDeposit(params) {
    // return axios.get('/mobile/af/userDeposit', {
    return axios.get('https://zwt.createt.cn/gzGovTong/mobile/af/userDeposit', {
      params: {
        gjjzh: params.gjjzh,
        zjh: params.zjh,
        capinfoSession: params.capinfoSession,
      }
    });
  },
  /*
    *  个人缴存明细
    *  params {Object} 参数对象
    *  gjjzh: 公积金账号
    *  hjnf: 汇缴年份如2018
    *  capinfoSession: 业务登录码
    *  pageno: 起始页
    *  pagesize: 默认页数
  * */
  userDetails(params) {
    // return axios.get('/mobile/af/userDetails', {
    return axios.get('https://zwt.createt.cn/gzGovTong/mobile/af/userDetails', {
      params: {
        gjjzh: params.gjjzh,
        hjnf: params.hjnf,
        capinfoSession: params.capinfoSession,
        pageno: params.pageno,
        pagesize: params.pagesize,
      }
    });
  },
  /*
    *  个人缴存信息查询
    *  params {Object} 参数对象
    *  zjh: 身份证
    *  gjjzh: 公积金账号
    *  capinfoSession: 业务登录码
  * */
  userDeposit(params) {
    // return axios.get('/mobile/af/userDeposit', {
    return axios.get('https://zwt.createt.cn/gzGovTong/mobile/af/userDeposit', {
      params: {
        gjjzh: params.gjjzh,
        zjh: params.zjh,
        capinfoSession: params.capinfoSession,
      }
    })
  },
  /*
  *  缴存信息保存到后台
* */
  gongSave(params) {
    return axios.post('/wxInterface/wxUserDeposit/save', qs.stringify(params))
  },

  /*
    *  刷脸
    *  params {Object} 参数对象
    *  fullName: 姓名
    *  idNum: 身份证
    *  foreBackUrl: 跳转链接
    *  openId
  * */
  weiJingAuth(params) {
    return axios.get('/wxInterface/miniProgram/getCertToken.do', {
      params: {
        fullName: params.fullName,
        idNum: params.idNum,
        foreBackUrl: params.foreBackUrl,
        openId: params.openId,
      }
    })
  },
  /*
      *  刷脸超时接口
      *  params {Object} 参数对象
      *  certToken
    * */
  validateCertToken(params) {
    return axios.get('/wxInterface/miniProgram/validateCertToken.do', {
      params: {
        certToken: params.certToken
      }
    })
  },
  getOpenIdFromCache(params) {
    return axios.get('/wxInterface/miniProgram/getOpenIdFromCache.do', {
      params: {
        certToken: params.certToken
      }
    })
  },
  /*
  *身份证机、手机号登录
  ** @param openId
     * @param account
     * @param password

  */

  loginLaisui(params) {
    return axios.post('/wxInterface/miniProgram/loginLaisui.do', qs.stringify({
      openId: params.openId,
      account: params.account,
      password: params.password
    }))
  },

  /*
   *  查询最近七天上门核实设置
   *  params {Object}
   *  openid: 支付宝id
   *  jz: 街镇代码
   *  yyrq: 预约日期（YYYY-MM-DD）必须大于当天，只能预约七天范围内的
   * */
  querySmhsszList(params) {
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/laisuiQuerySmhsszList.do', {
      params: {
        openid: params.openid,
        opentype: '2',
        jz: params.jz,
        yyrq: params.yyrq,
        account: params.account
      }
    })
  },
  /*
   *  查询最近七天窗口预约时间
   *  params {Object}
   *  openid: 支付宝id
   *  jz: 街镇代码
   *  yyrq: 预约日期（YYYY-MM-DD）必须大于当天，只能预约七天范围内的
   * */
  laisuiQueryYyszList(params) {
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryYyszList.do', {
      params: {
        openid: params.openid,
        opentype: '2',
        jz: params.jz,
        yyrq: params.yyrq,
        account: params.account
      }
    })
  },
  /**
   新增保存居住登记
   *params:params {Object} 参数对象
   *openid:支付宝id
   *opentype:支付宝1
   *jzcslx:房屋类型
   *xm:姓名
   *zjhm:身份证号
   *xb:性别
   *csrqStr:出生日期
   *mz:民族
   *lxdh:联系电话
   *whcd:文化程度
   *hyzk:婚姻状况   婚姻状况为已婚时必须填配偶姓名和身份证号
   *poxm:配偶姓名
   *posfzhm:配偶身份证号码
   *zzmm:政治面貌
   *jzfs:居住方式
   *zzsy:居住事由
   *xzq:行政区代码
   *xzqDict:行政区名称
   *jz:街镇代码
   *jzDict:街镇名称
   *jddm:街路巷代码
   *jddmDict:街路巷名称
   *zhid:门牌号代码
   *zhidDict:门牌号名称
   *fhid:房号代码
   *fhidDict:房号名称
   *hjx:户籍市
   *hjxz:户籍详址
   *zfczr:是否承租人
   *lbsrqStr:来本市日期
   *hkszdlx:户口类型
   *checktime:上门核实时间
   *checktimeid:上门核实时间id
   *zy:职业
   dwmc :单位名称
   dwdz:单位地址
   qybh:企业编号
   *saveRegistration */
  saveliveInfo(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/laisuiSaveRegistration', qs.stringify({ jsonStr: params }))
  },
  /*
   *  查询企业单位信息
   *  params {Object}
   *  openid: 支付宝id
   *  dwmc: 单位名称 支持模糊查询
   *  currentPage: 当前页 如果为空或不是正整数，默认为1
   * */
  queryCompanyList(params) {
    return xhr.get('https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryDwxxPage', {
      params: {
        openid: params.openid,
        opentype: 1,
        dwmc: params.dwmc,
        account: params.account,
        pageSize: 50,
        currentPage: params.currentPage
      }
    })
  },
  /*
   *  保存新增预约信息
   *  params {Object}
   *  openid: 支付宝id
   opentype:1 支付宝 2 微信
   *xzp:行政区
   timeid:时间主键
   type:预约类型 1 窗口办理 4居住证申领  5居住证签注预约
   *  jz: 街镇代码
   *ldryid：来穗人员业务id  4 居住证申领和预约 5 居住证签注
   *jzzid:居住证业务id  预约类型为4.居住证申领预约和 5.居住证签注预约时为必填
   *slyy:受理原因
   Type=4:
   Slyy=1：首次申领
   Slyy=2：遗失补领
   Slyy=3：损坏换领
   Type=5：
   Slyy=5：居住证签注
   Slyy=6：居住证地址变更
   Slyy=60：居住证签注和地址变更
   *
   */
  saveBooktimeMsg(params) {
    return xhr.post('https://zwt.createt.cn/gzGovTong/mobile/laisuiSaveReservation', qs.stringify({ jsonStr: params }));
  },
  /**
   * 查询单个来穗人员信息
   * params:{object}
   * jzhm：证件号码
   * xm:姓名
   * openid:openid
   * opentype:1
   */
  laisuiQueryLdryDetail(params) {
    return xhr.post("https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryLdryDetail", qs.stringify({
      openid: params.openid,
      opentype: '2',
      zjhm: params.zjhm,
      xm: params.xm
    }))
  },
  /*通过姓名、证件号码、房屋套ID、受理级别、受理原因,判断是否可以办理居住证信息
   * params:{object}
   * zjhm:证件号码
   * xm:姓名
   * fhid:房屋套编号
   * sljb: 受理级别 1:制证 2：擦写  r㘝为空或不为1就默认擦写
   * openid:openid
   * opentype: 1 支付宝  2微信
   * slyy:受理原因 Slyy=1：首次申领
   * Slyy=2：遗失补领
   * Slyy=3：损坏换领
   * Slyy=5：居住证签注
   * Slyy=6：居住证地址变更
   * Slyy=60：居住证签注和地址变更
   */
  queryJzzCheck(params) {
    return xhr.post("https://zwt.createt.cn/gzGovTong/mobile/laisuiQueryJzzCheck", qs.stringify({
      zjhm: params.zjhm,
      xm: params.xm,
      fhid: params.fhid,
      sljb: params.sljb,
      openid: params.openid,
      opentype: '2',
      slyy: params.slyy
    }))
  },
  /*融合课堂资讯列表
     *openId(String) 人员微信id
     * @param course course实体各属性,若无特殊查询条件可不传任何参数,忽略此参数
     * @param page(Interger) 当前第几页
     * @param limit(Interger) 每页几条
     * @return 返回json格式如下 ,各字段名称请匹配字段前括号内中文
   */
  queryRHKT(params) {
    return xhr.post("/wxInterface/course/getCourseList.do", qs.stringify({
      openId: params.openId,
      page: params.page,
      limit: params.limit,
      auditStatus: 1

    }))
  },
  /*融合课堂详情
     * @param openId 微信用户id
     * @param courseId
   */
  queryRHKTArt(params) {
    return xhr.post("/wxInterface/course/getCourseDetail.do", qs.stringify({
      openId: params.openId,
      courseId: params.courseId,

    }))
  },
  /*党建活动资讯列表
    * @param openId(String) 人员微信id
     * @param partyDevelop partyDevelop实体各属性,若无特殊查询条件可不传任何参数,忽略此参数
     * @param page(Interger) 当前第几页
     * @param limit(Interger) 每页几条
     * @return 返回json格式如下 ,各字段名称请匹配字段前括号内中文
   */
  queryDJHD(params) {
    return xhr.post("/wxInterface/partyDevelop/getPartyDevelopList.do", qs.stringify({
      openId: params.openId,
      page: params.page,
      limit: params.limit,
      auditStatus: 1

    }))
  },
  /*融合活动资讯列表
    * @param openId(String) 人员微信id
     * @param partyDevelop partyDevelop实体各属性,若无特殊查询条件可不传任何参数,忽略此参数
     * @param page(Interger) 当前第几页
     * @param limit(Interger) 每页几条
     * @return 返回json格式如下 ,各字段名称请匹配字段前括号内中文
   */
  queryRHHD(params) {
    return xhr.post("/wxInterface/activity/getActivityList.do", qs.stringify({
      openId: params.openId,
      page: params.page,
      limit: params.limit,
      auditStatus: 1


    }))
  },
  /*最新资讯
   *pageSize:10
   *pageNum:1
   */
  queryNEWSHot(params) {
    return xhr.post("/wxInterface/information/getInformationList.do", qs.stringify({
      pageSize: params.pageSize,
      pageNum: params.pageNum,

    }))
  },
  /*资讯详情
   *informationId:资讯ID
   *openId:用户openId
  */
  queryNEWSArt(params) {
    return xhr.post("/wxInterface/information/getInformationById.do", qs.stringify({
      informationId: params.informationId,
      openId: params.openId

    }))
  },
  /*资讯详情点赞
   *informationId:资讯ID
   *openId:用户openId
  */
  clickZan(params) {
    return xhr.post("/wxInterface/information/userLikeInformation.do", qs.stringify({
      informationId: params.informationId,
      openId: params.openId

    }))
  },
  /*活动详情点赞
   *informationId:资讯ID
   *openId:用户openId
  */
  clickZanHD(params) {
    return xhr.post("/wxInterface/partyDevelop/partyDevelopLike.do", qs.stringify({
      partyDevelopId: params.partyDevelopId,
      openId: params.openId

    }))
  },

  /*活动阅读统计
   *id:资讯ID
  */
  trafficStatisticsDJ(params) {
    return xhr.post("/wxInterface//partyDevelop/statsPartyDevelop.do", qs.stringify({
      id: params.id,
    }))
  },

  /*党建活动详情
   *informationId:资讯ID
   *openId:用户openId
  */
  queryDjHdArt(params) {
    return xhr.post("/wxInterface/partyDevelop/getPartyDevelopDetail.do", qs.stringify({
      partyDevelopId: params.partyDevelopId,
      openId: params.openId

    }))
  },

  /*融合活动详情
   *informationId:资讯ID
   *openId:用户openId
  */
  queryRhHdArt(params) {
    return xhr.post("/wxInterface/activity/getactivityDetail.do", qs.stringify({
      activityId: params.activityId,
      openId: params.openId

    }))
  },

  /*资讯详情
   *informationId:资讯ID
   *openId:用户openId
  */
  queryNEWSArt(params) {
    return xhr.post("/wxInterface/information/getInformationById.do", qs.stringify({
      informationId: params.informationId,
      openId: params.openId

    }))
  },
  /*党建活动报名
   * @param openId 微信用户id
   * @param partyDevelopId 党建活动id
  */
  DJApply(params) {
    return xhr.post("/wxInterface/partyDevelop/signForPartyDevelop.do", qs.stringify({
      partyDevelopId: params.partyDevelopId,
      openId: params.openId,
      phone: params.phone

    }))
  },
  /*融合活动报名
   * @param openId 微信用户id
   * @param partyDevelopId 融合活动id
  */
  RHApply(params) {
    return xhr.post("/wxInterface/activity/signForactivity.do", qs.stringify({
      activityId: params.activityId,
      openId: params.openId,
      phone: params.phone

    }))
  },
  /*资讯类目
   * @param openId 微信用户id
   * @param partyDevelopId 党建活动id
  */
  requireNewsTab(params) {
    return xhr.post("/wxInterface/information/getInformationSeggust.do", qs.stringify({
    }))
  },
  /*资讯分类展示列表
    *  seggustId:类目ID
    *  pageNum:页数默认为1
    *  pageSize:条数默认为10
  */
  requireNewsTabLists(params) {
    return xhr.post("/wxInterface/information/getSeggustInformationList.do", qs.stringify({
      seggustId: params.seggustId,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }))
  },
  /*首页轮播
   *pageSize:10
   *pageNum:1
  */
  requireIndexsSwiper(params) {
    return xhr.post("/wxInterface/information/getTopInformationList.do", qs.stringify({
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    }))
  },
  /*资讯首页轮播
   *pageSize:10
   *pageNum:1
  */
  requireNewsSwiper(params) {
    return xhr.post("/wxInterface/informationBanner/getBannerList.do", qs.stringify({
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    }))
  },
  /*资查询演员信息
   * @param openId
  */
  requireDYmsg(params) {
    return xhr.post("/wxInterface/partyDevelop/getMemberMsg.do", qs.stringify({
      openId: params.openId,
    }))
  },

  /*查询事件列表
     * @param openId
     * @param event 实体各查询属性,如无特殊需求可不填写
     * @param page 当前第几页
     * @param limit 每页多少条
     * @return
  */
  requireSJlist(params) {
    return xhr.post("/wxInterface/event/getEventList.do", qs.stringify({
      openId: params.openId,
      eventType: params.eventType,
      page: params.page,
      limit: params.limit
    }))
  },

  /*创建事件
     * @param event各属性,
     * 填写以下属性:eventName(事件名称)
     *  eventDesc(事件描述)
     *  eventPicture(事件照片url,请通过接口上传获取url)
     *  eventType(事件类型1社区安全隐患 2社区门禁保修 3社区可以人员 4社区报警)
     *  eventAddress(事件地址)
     * @param openId 微信用户id
  */
  reportSJ(params) {
    return xhr.post("/wxInterface/event/saveEvent.do", qs.stringify({
      openId: params.openId,
      eventName: params.eventName,   //事件名称
      eventDesc: params.eventDesc,    //事件描述
      eventPicture: params.eventPicture,  //事件照片
      eventType: params.eventType,    //事件类型1社区安全隐患 2社区门禁保修
      eventAddress: params.eventAddress,    //事件类型1社区安全隐患 2社区门禁保修
      // addressArea: params.area.name,//行政区
      // addressAreaKey: params.area.value,//行政区编码
      addressStreet: params.street.name,//街道
      addressLane: params.alleyArea.name,// 路巷
      // addressStreetKey: params.street.value,//街道编码
      // addressLaneKey: params.alleyArea.value,// 路巷编码
    }))
  },
  /*创建事件-删除已上传图片
     * @param event各属性,
     * 填写以下属性:eventName(事件名称)
     *  eventDesc(事件描述)
     *  eventPicture(事件照片url,请通过接口上传获取url)
     *  eventType(事件类型1社区安全隐患 2社区门禁保修 3社区可以人员 4社区报警)
     *  eventAddress(事件地址)
     * @param openId 微信用户id
  */
  delPic(imgId) {
    return xhr.post(`/wxInterface/sysFile/deleteFile.do?title="${imgId}`)
    //
  },
  /*
   *  获取短信验证码接口
   *  openid:
   *  phone: 手机号
   * */
  sendMessage(params) {
    return xhr.post('/wxInterface/miniProgram/sendMessage.do', qs.stringify({
      openId: params.openId,
      phone: params.phone
    }))
  },
  /*
   *  退出登录
   *  openid:
   * */
  logOut(params) {
    return xhr.post('/wxInterface/miniProgram/logOut.do', qs.stringify({
      openId: params.openId,
    }))
  },
  /*
   *  找回密码
     * @param openId
     * @param checkCode
     * @param newPassword
     * @param mobile
   * */
  retrievalPW(params) {
    return xhr.post('/wxInterface/miniProgram/findPassword.do', qs.stringify({
      openId: params.openId,
      checkCode: params.checkCode,
      newPassword: params.newPassword,
      mobile: params.mobile
    }))
  },
  /*
   *  修改密码
     * @param openId
     * @param checkCode
     * @param newPassword
     * @param mobile
   * */
  changePW(params) {
    return xhr.post('/wxInterface/miniProgram/updatePassword.do', qs.stringify({
      openId: params.openId,
      oldPassword: params.oldPassword,
      newPassword: params.newPassword
    }))
  },
  /*
   * @param openId
   * @param name 姓名
   * @param identity 身份证号码
   * @param phone 手机
   * @param checkCode 验证码
   * @param password 密码
   * */
  saveUser(params) {
    return xhr.post('/wxInterface/miniProgram/registLaisui.do', qs.stringify({
      openId: params.openId,
      name: params.name,
      identity: params.identity,
      phone: params.phone,
      checkCode: params.checkCode,
      password: params.password,
    }))
  },
  /**
 * 事件图片上传
 *
 *  */
  setUpPicSSP(params) {
    return xhr.post('/wxInterface/sysFile/saveBase64Img.do', qs.stringify({
      imgStr: params.imgStr
    }))
  },

  /*
   * @param openId
   * @return
openid  用户的唯一标识
nickname  用户昵称
sex 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
province  用户个人资料填写的省份
city  普通用户个人资料填写的城市
country 国家，如中国为CN
headimgurl  用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
privilege 用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
unionid 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。m password 密码
   * */
  getWXdUser(params) {
    return axios.post('/wxInterface/wxUser/checkUser.do', qs.stringify({
      openId: params.openId,
    }))
  },
  /*
   *  判断是否在来穗注册过
   *  openid: 支付宝id

   * */
  checkUser(params) {
    return xhr.post('/wxInterface/miniProgram/checkLaisuiRegistStatus.do', qs.stringify({
      openId: params.openId,
      identity: params.identity,
    }))
  },
  /*
   *  保存社会基本信息
 * @param  idCard(身份证) status(参保状态)
 * @param  personalNo(个人编号)
 * @param  companyName(最后参保单位名称)
 * @param  beginPayDate(参保开始日期)
 * @param  endPayDate(最后参保年月)
 * @param  yearSpan(按月缴费年限)
 * @param  totalAmount(缴费总金额)
   * */
  saveSBMsg(params) {
    return xhr.post('/wxInterface/socialSecurity/saveSocialSecurityInfomation.do', qs.stringify(params))
  },

  /*
  * 接口名称:上门预约保存居住证登记信息到越秀后台
  */
  saveResidencePermit(params) {
    return xhr.post('/wxInterface/residencePermit/saveResidencePermit.do', qs.stringify(params))
  },
  /*
 * 接口名称:预约窗口保存居住证登记信息到越秀后台
 */
  reservationSave(params) {
    return xhr.post('/wxInterface/residencePermitReservation/save.do', qs.stringify(params))
  },
  /*
* 请求图南居住证通用接口
*/
  tunansendPost(params) {
    return xhr.post('/wxInterface/residencePermit/sendPost.do', qs.stringify({
      paramJson: params.paramJson,
      url: params.url
    }))
  },
  /*
  *事件详情
  *id:文章ID
  */
  getEventArt(params) {
    return xhr.post('/wxInterface/event/getEventById.do', qs.stringify({
      id: params.id,
    }))
  },
  /**房屋租赁备案接口 */
  /** 查询房屋备案列表
   *openId:微信openId
   *
  */
  recordList(params) {
    return xhr.post('/wxInterface/hRecord/recordList.do', qs.stringify({
      openId: params.openId
    }))
  },
  /**
   * 撤销租赁备案
   * hrId：房屋备案主键
   */
  dataRevoke(params) {
    return xhr.post('/wxInterface/hRecord/dataRevoke.do', qs.stringify({
      hrId: params.hrId
    }))
  },
  /**wxUser
   *获取承租人或者出租人的信息
   * openId：微信openId
   */
  wxUser(params) {
    return xhr.post('/wxInterface/hRecord/wxUser.do', qs.stringify({
      openId: params.openId
    }))
  },
  /**
   *加载房屋用途数据字典
   *
   */
  purpose() {
    return xhr.post('/wxInterface/hRecord/purpose.do')
  },
  /**
   * 地区接口(4-7级)
   * level 层级 4-7
   * code 父类code  越秀 ：440104
  */
  area(params) {
    return xhr.post('/wxInterface/hRecord/area.do', qs.stringify({
      level: params.level,
      typeCode: params.typeCode
    }))
  },
  /**数据回显
   * hrId：房屋备案主键
   *databack接口 返回增加两个参数：
timeStaStr  开始时间 格式 yyyy-MM-dd
timeEndStr  开始时间 格式 yyyy-MM-dd
   */
  databack(params) {
    return xhr.post('/wxInterface/hRecord/databack.do', qs.stringify({
      hrId: params.hrId
    }))
  },
  /**
* 租赁备案保存
*
* wxUser */
  doSave(params) {
    return xhr.post(
      // {
      //   headers: {
      //     " Content-Type": "application/x-www-form-urlencoded"
      //   }
      // },
      '/wxInterface/hRecord/doSave.do',
      {
        id: params.id,//有id就是跟新 没有就是新增
        agreeNo: params.agreeNo, //合同编号
        houseAddress: params.houseAddress, //地址
        houseArea: params.houseArea, //面积
        purpose: params.purpose[0], //用途
        limitTimeStart: params.limitTimeStart, //租赁开始时间
        limitTimeEnd: params.limitTimeEnd, //租赁结束时间
        renter: params.renter, //出租人名称
        rentNo: params.rentNo, //出租人证件号码
        sex: params.sex, //性别
        phone: params.phone, //电话
        applicantType: params.applicantType, //申请人类型 1:承租人 2：出租人
        streetNo: params.streetNo[0], //街镇
        streetLaneNo: params.streetLaneNo[0], //街道巷
        doorNo: params.doorNo[0], //门牌号
        roomNo: params.roomNo[0], //房号
        certificate: params.certificate, //房产证权号
        rentPrice: params.rentPrice, //租金
        hrecordHirers: params.hrecordHirers, //承租人信息
      }
    )
  },
  /**
 * 租赁备案图片上传
 *
 * uploadFile */
  uploadFile(params) {
    return xhr.post('/wxInterface/hRecord/uploadFile.do', qs.stringify({
      pId: params.pId,
      fileType: params.fileType,
      file: params.file
    }))
  },
  /**
  * 租赁备案图片上传
  *
  *
  * uploadFile */
  fileUrl(params) {
    return xhr.post('/wxInterface/hRecord/fileUrl.do', qs.stringify({
      fId: params.fId
    }))
  },
  /**
   * 租赁备案图片替换
   *
   *
   * uploadFile */
  fileReplace(params) {
    return xhr.post('/wxInterface/hRecord/fileReplace.do', qs.stringify({
      pId: params.pId,
      fileType: params.fileType,
      file: params.file,
      fId: params.fId
    }))
  },

  /**
   * 租赁备案图片上传
   *
   *
   * uploadFile */
  deleteFile(params) {
    return xhr.post('/wxInterface/hRecord/deleteFile.do', qs.stringify({
      fId: params.fId
    }))
  },

  /**
   * 检查租赁合同编码
   *
   *
   * uploadFile */
  checkPactNum(params) {
    return xhr.post('/wxInterface/hRecord/checkAgreeNo', qs.stringify({
       agreeNo: params.agreeNo,
       id:params.id,
    }))
  },

  /**
  * 租赁提交
  *
  *
  * uploadFile */
  hrecordSub(params) {
    return xhr.post('/wxInterface/hRecord/hrecordSub.do', qs.stringify({
      hrId: params.hrId
    }))
  },
  /**
   * 租赁提交
   *
   *
   * uploadFile */
  areaDetail(params) {
    return xhr.post('/wxInterface/hRecord/areaDetail.do', qs.stringify({
      itemCode: params.itemCode
    }))
  },
  /*
   *居住证登记用户反馈
   **/
  feedbackSubmit(params) {
    return axios.post('/wxInterface/helpFeedback/feedBack.do', qs.stringify({
      title: params.title,
      defaultOpinion: params.defaultOpinion,
      personalOpinion: params.personalOpinion,
      openId: params.openId
    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
  },
  /*
   *居住证登记用户反馈上传图片
   **/

  setUpPicHELP(params) {    //
    return axios.post('/wxInterface/helpFeedback/uploadFbPic.do', qs.stringify({
      openId: params.openId,
      file: params.file,

    }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
  },

  /*
   *居住证登记用户反馈删除图片
   **/
  delUpPic(fid) {
    return axios.post(`/wxInterface/helpFeedback/delPic.do?fId=${fid}`);
  },

  /*
  * 住证登记用户个人反馈历史
   */
  requireMyQ(params) {
    return axios.post('/wxInterface/helpFeedback/feedBackList.do', qs.stringify({
      page: params.page,
      size: params.size,
      openId: params.openId,
    })
    )
  },
  /*
  * 住证登记用户个人反馈问题详情
   */
  myQArticle(comGUID) {
    return axios.post(`/wxInterface/helpFeedback/feedBackdetail.do?comGUID=${comGUID}`);

  },

  /*
  * 住证登记常见问题
   */
  requireQ(params) {
    return axios.post('/wxInterface/helpFeedback/helplist.do', qs.stringify({
      page: params.page,
      size: params.size,
    })
    )
  },
  /*
  * 住证登记用户热门问题详情
   */
  hotArticle(comGUID) {
    return axios.post(`/wxInterface/helpFeedback/helpdetail.do?comGUID=${comGUID}`);
  },
  /**用户标签接口 */

  /**
   * 个人中心默认标签展示
   * @param {*} openId
   */
  indexTitle(openId) {
    return axios.get(`/recommend/indexTitle.do?openId=${openId}`);
  },
  /**
   *单个用户全部标签接口
   *@param {*} openId
   */
  userTitle(openId) {
    return axios.get(`/recommend/userTitle.do?openId=${openId}`);
  },
  /**
   *本接口用于用户登陆时给其打上相应标签
   * @param {*} openId
   */
  saveLoginTitle(openId) {
    return axios.get(`/recommend/saveLoginTitle.do?openId=${openId}`);
  },
  /**
   * 本接口用于用户在页面的操作行为进行打标,当用户点击相应tab时,请求此接口
   * @param {
   * openId:微信唯一id
   * id:页面tab项id
   * }
   */
  saveUserBehaviourTitle(openId, id) {
    return axios.get(`/recommend/saveLoginTitle.do?openId=${openId}&id=${id}`);
  },
  /**
   * 资讯埋点打标接口
   * openId  微信id
   * id  文章id
   * type 必填 1:浏览 2:点赞 3:报名
   */
  saveUserInformationTitle(openId, id, type) {
    return axios.get(`/recommend/saveUserInformationTitle.do?openId=${openId}&id=${id}&type=${type}`);
  },
  /**
   * 融合活动埋点打标接口
   * 资讯埋点打标接口
   * openId  微信id
   * id  文章id
   * type 必填 1:浏览 2:点赞 3:报名
   */
  saveUserActivityTitle(openId, id, type) {
    return axios.get(`/recommend/saveUserActivityTitle.do?openId=${openId}&id=${id}&type=${type}`);
  },
  /**
  * 党建活动埋点打标接口
  * 资讯埋点打标接口
  * openId  微信id
  * id  文章id
  * type 必填 1:浏览 2:点赞 3:报名
  */
  saveUserPartyDevelopTitle(openId, id, type) {
    return axios.get(`/recommend/saveUserPartyDevelopTitle.do?openId=${openId}&id=${id}&type=${type}`);
  },
  /**
   * 融合学堂埋点打标接口
   * 本接口用于公众号,用户浏览融合学堂(课程)时,根据行为进行打标
   * openId  微信id
   * id  课程id
   * type 必填 1:浏览 2:点赞 3:报名
   */
  saveUserCourseTitle(openId, id, type) {
    return axios.get(`/recommend/saveUserCourseTitle.do?openId=${openId}&id=${id}&type=${type}`);
  },
  /**
   * 个性化推荐接口
   * 根据不同用户推荐不同的资讯,融合活动,党建活动,资讯,课程和业务类型
   * params{
   * openId:必填 微信唯一Iid
   * page:可选 分页
   * size 可选 每页大小
   *  返回推荐项类型1:资讯 2:融合活动 3:党建活动 4:融合学堂 5:业务
   * }
   */
  privateRecommend(openId, page, size) {
    return axios.get(`/recommend/privateRecommend.do?openId=${openId}&page=${page}&size=${size}`);
  }
}





