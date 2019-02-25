import { mapState } from 'vuex';
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'userId', 'idCard', 'name', 'openid'
    ])
  },
  methods: {
    desensitization(str, type) { //数据脱敏
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
        case 2: //身份证、军官证、护照脱敏
          return `${str.substring(0, 1)}****************${str.substring(str.length - 1)}`;
          break;
        case 3: //社保卡、医保卡、公积金、居住证
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
        case 6://公司名称过长
          return `${str.substring(0, 10)}...`;
          break;
        case 7://其他
          return `${str.substring(0, 1)}*${str.substring(str.length - 1)}`;
          break;
      }
    },
    //获取url传递的参数，如：xxx.html?username=peter&id=1
    getUrlParam() {
      let name, value;
      let str = location.href; //取得整个地址栏
      let num = str.indexOf("?");
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

      let arr = str.split("&"); //各个参数放到数组里
      let objArr = {};
      for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          objArr[name] = value
        }
      }
      return objArr;
    }
  },
  mounted() {
    document.title = this.$route.meta.title;
  }
}
