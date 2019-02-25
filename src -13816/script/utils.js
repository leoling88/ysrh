/*
 * 基础正则表达式封装
 * 基础工具类封装
3
 * */

export default{

  install(Vue){
    Vue.prototype.$regExp={//正则表达式
      name: /^([\u4E00-\u9FFF]|[a-zA-Z]){2,11}$/, // 包含中文的姓名正则
      kong: /\S/, //非空
      fixedPhone: /^0\d{2,3}-\d{7,8}(-\d{1,6})?|1[34578]\d{9}$/, // 包括固定电话和手机号
      phone:/^1[34578]\d{9}$/,// 手机号
      number:/^[0-9]*$/,//只能是数字x
      numberd:/^\d+(\.\d+)?$/,//只能是数字和小数点
      amount : /^([+-]?)((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/, // 金额 开头只可为正号或者负号,也可以没有符号,小数点前可以输入任意位数的数字,小数点后只能输入两位数字.
      amountPlus:/^((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/,  //只为正数的金额 ,其他跟amountReg一样
      date : /(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/, // 日期
      area : /^[A-Za-z0-9\u4e00-\u9fa5]+$/, //文本域：10-200个汉字或字母
      email:/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,//邮箱号码
      rate:/^((\d+\.?\d*)|(\d*\.\d+))\%$/,  //百分比
      password:/^[\x21-\x7E]{8,16}$/,  //密码,8-16字母或数字
      phoneEmail:/^[1]{1}[0-9]{10}$|(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,  //匹配手机邮箱
      banknum:/^(\d{16}|\d{18}|\d{19}|\d{20}|\d{21})$/,  //银行卡
      chinaName: /^[\u4e00-\u9fa5]+$/, //汉字校验
      cardID:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, //身份证格式验证
    };

    // 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.format = function (fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      return fmt;
    };

    //工具类
    Vue.prototype.$Utils={
    /*
     * 设置缓存
     * */
      setLocalStorage (key, value) {
        localStorage.setItem(key, JSON.stringify(value))
      },

      /*
       * 获取缓存
       * */
      getLocalStorage (key) {
        return JSON.parse(localStorage.getItem(key))
      },

      /*
       * 删除某个缓存
       * */
      removeLocalStorage (key) {
        localStorage.removeItem(key);
      },

      /*
       * 清除所有缓存
       * */
      clearLocalStorage () {
        localStorage.clear();
      },

      /*
       * 清除缓存
       * */
      moveLocalStorage (key) {
        return localStorage.removeItem(key)
      },

      /*
       * 说明：通过身份证号码获取出生年月日
       * idCard：{string} 身份证号码
       * */
      getBirthdayFromIdCard (idCard) {
        var idCard = idCard + ''
        var birthday = "";
        if(idCard != null && idCard != ""){
          if(idCard.length == 15){
            birthday = "19"+idCard.substr(6,6);
          } else if(idCard.length == 18){
            birthday = idCard.substr(6,8);
          }
          birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        }

        return birthday;
      },

      /*
       *说明：设置cookie方法
       *key：对象  val：对象的值   time：过去时间（天）
       * */
      setCookie(key,val,time){
        if(time){
          var date=new Date(); //获取当前时间
          var expiresDays=time;  //将date设置为n天以后的时间
          date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
          document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
        }else{
          document.cookie=key+"="+val;
        }
      },

      /*
       *说明：获取cookie方法
       *key：对象
       * */
      getCookie(key){
        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
          var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
          if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
            tips=arr[1];   //将cookie的值赋给变量tips
            break;   //终止for循环遍历
          }
        }
        return tips;
      },

      /*
       *说明：删除cookie方法
       *key：对象
       * */
      deleteCookie(key){ //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime()-10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
      },

      //数据脱敏
      desensitization(str, type) {
        if (!str) {
          return;
        }
        switch (type) {
          case 1://姓名脱敏
            if (str.length >= 4) {
              return `**${str.substring(2)}`;
            } else {
              return `*${str.substring(1)}`;
            }
            break;
          case 2://身份证、军官证、护照脱敏
            return `${str.substring(0, 1)}****************${str.substring(str.length - 1)}`;
            break;
          case 3://社保卡、医保卡、公积金、居住证
            if (str.length % 3 == 0) {
              return `${str.substring(0, str.length * (1 / 3))}******${str.substring(str.length - str.length * (1 / 3))}`;
            } else {
              return `${str.substring(0, str.length / 3 + 1)}******${str.substring(str.length - str.length / 3)}`;
            }
            break;
          case 4://银行卡
            return `${str.substring(0, 6)}****************${str.substring(str.length - 4)}`;
            break;
          case 5://手机号
            return `${str.substring(0, 3)}******${str.substring(str.length - 2)}`;
            break;
          case 6://其他
            return `${str.substring(0, 1)}*${str.substring(str.length - 1)}`;
            break;
        }
      },
      /*
       * 获取日期
       * day {Number} 小于0：之前，为0：当前，大于0：之后
       */
      getDay (day) {
        let today = new Date();
        let targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
        let tYear = today.getFullYear();
        let tMonth = today.getMonth().toString().length == 1 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        let tDate = today.getDate().toString().length == 1 ? '0' + today.getDate() : today.getDate();
        return tYear + '-' + tMonth + '-' + tDate;
      },
      /*
       * 根据身份证获取出生日期、性别
       * idCard {String} 身份证编号
       */
      getIdCardInfo (idCard) {
        let gender='', birthDay;
        var cardIdd = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (cardIdd.test(idCard)) {
          if (idCard.length == 18) {
            gender = idCard.substring(16, 17) % 2 ? '1' : '2';
            birthDay = `${idCard.slice(6, 10)}-${idCard.slice(10,12)}-${idCard.slice(12,14)}`;
          } else if (idCard.length == 15) {
            gender = idCard.substring(14) % 2 ? '1' : '2';
            birthDay = `19${idCard.slice(7,9)}-${idCard.slice(9,11)}-${idCard.slice(11,13)}`;
          }
          return {gender, birthDay}
        }
      },

    }
  }
}





