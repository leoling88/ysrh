<template>

  <div class="sroll-wrap news-wrap"  res="myScroll"  :style="{height: myScrollH + 'px'}" @touchstart="touchStart($event)"  @touchmove="touchMove($event)"   @touchend="touchEnd($event)" >
    <div class="sroll-more" v-if="loadreFresh">下拉刷新数据</div>
    <div class="sroll-wrap-box news-list-hot srcoll-show" >
      <slot name="lists"></slot>
    </div>

    <div v-if="loadMore" class="sroll-more">上拉加载更多数据</div>
    <div v-if="loadIn" class="sroll-load-style" ><img :src="LoadIcon" alt=""> 努力加载中...</div>
    <div v-if="loadOff" class="sroll-more">没有更多数据</div>

    
  </div>
</template>

<script>

//var w = document.documentElement.clientWidth || document.body.clientWidth;
var v_h = document.documentElement.clientHeight || document.body.clientHeight;
//var w = document.documentElement.scrollWidth || document.body.scrollWidth;
var b_h = document.documentElement.scrollHeight || document.body.scrollHeight;
import loadIcon from '../../assets/images/juzz.png' //'@/assets/load.gif'
export default {
  name: 'myScroll',
  props: {
    myScrollH: Object
  },  
  data () {
    return {
      newsHot:[],
      pageX:0,
      pageY:0,
      myScroll:null,
      scrollTop:0,
      aspect: 0,  //1向上，2向下
      myScrollH:0,     //可视框高度
      myViewH:0,
      loadMore: true,
      loadIn:false,
      pageNum:false,
      loadOff:false,
      loadreFresh:false,
      LoadIcon:loadIcon
    }
  },
  created:function(){
  },
  methods: {
   /*=====跨域======= */


    touchStart(e){ //触摸事件
        this.pageX = e.targetTouches[0].pageX
        this.pageY = e.targetTouches[0].pageY
        // console.log("X:" + this.pageX +"||" +"Y:" + this.pageY)
        this.handleScroll()
         
    },
    touchMove(e){ //触摸滑动事件
        //console.log("滚动条位置:" + this.scrollPosition)
        if(e.targetTouches[0].pageY > this.pageY){ //向下滑动
          this.loadreFresh = true
          if(this.scrollTop == 0 && e.targetTouches[0].pageY - this.pageY > 80){
            this.aspect = 2
            this.viewShow = false


            // console.log("下拉刷新")            
          }
          // console.log("向下滑动")   
         
        }else if( this.pageY - e.targetTouches[0].pageY > 80){ //向上滑动
          if((this.myScrollH + this.scrollTop + 50) > this.myViewH){   
            this.aspect = 1
          }
          //console.log("向上滑动" + (this.pageY - e.targetTouches[0].pageY) )
        }
    },
    touchEnd(e){
      if(this.aspect == 1){
        if(this.pageNum == true){  //追加数据
            this.loadMore = false    //隐藏"加载更多"提示
            this.loadIn = true    //显示"加载中..."提示
            this.aspect = 0

            this.$http({
              method:'get',
              baseURL: '',        //baseURL: '/api'
              url:'static/goodsdata.json'     //'static/goodsdata.json'
            }).then((res) => {
              for(var i = 0; i < res.data.listshot2.length; i ++){
                this.newsHot.push(res.data.listshot2[i])
                this.loadIn = false      //隐藏"加载中..."提示
                this.loadMore = true     //显示"加载更多"提示
                this.pageNum = false     //是否有更多数据加载
              }
            }).catch(function(err){
              console.log(err)
            })

        }else{
          this.pageNum = false
          this.loadMore = false
          this.loadOff = true
          this.aspect = 0

        }        
      }else if(this.aspect == 2){
        this.HelloAxios()
        this.pageNum = false
        this.loadMore = false
        this.loadOff = false
        this.aspect = 0        
      }
      this.loadreFresh = false
    },
    handleScroll () {
      let offsetTop = document.querySelector('.sroll-wrap').scrollTop
      let scrollHeight = document.querySelector('.sroll-wrap').scrollHeight
      this.myViewH = scrollHeight
      this.scrollTop = offsetTop
      console.log(this.myScrollH + "==" + this.scrollTop + "==" + this.myViewH)

    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
    mounted: function (){
      this.myScrollH = window.screen.availHeight

      //window.addEventListener('scroll', this.handleScroll)


  }




}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.news-wrap{width:100%;max-width:20rem;margin:1rem auto;}
.news-list-hot .type-1{position: relative;height:3rem;border-bottom:1px solid #ccc;padding:.5rem;}
.news-list-hot .type-1 .img{display:block;width:5rem;height:3rem;position: absolute;top:.5rem;left:.5rem;}
.news-list-hot .type-1 .img img{width:100%;height:100%;}
.news-list-hot .type-1 h2{height:2.2rem;font-size:.8rem;color:#000;overflow:hidden; 
text-overflow:ellipsis;
display:-webkit-box; 
-webkit-box-orient:vertical;
-webkit-line-clamp:2;}
.news-list-hot .type-2{position: relative;border-bottom:1px solid #ccc;padding:.5rem;}
.news-list-hot .type-2 .img{display:block;width:100%;margin:.5rem 0 ; position:relative; text-align: center;}
.news-list-hot .type-2 .img img{width:33%;display:inline-block;margin-right:.5%;}
.news-list-hot .type-2 .img img:last-child{margin-right:0;}
.news-list-hot .type-2 h2{font-size:.8rem;color:#000;overflow:hidden; }


.news-list-hot .type-1 h2,.news-list-hot .type-1 .about{display:block;padding-left:5.5rem;}
.news-list-hot .about{color:#999;overflow:hidden; 
text-overflow:ellipsis;
display:-webkit-box; 
-webkit-box-orient:vertical;
-webkit-line-clamp:1; }

.sroll-wrap{width:100%;overflow-y:auto;-webkit-overflow-scrolling: touch;position: relative;}

.sroll-more{padding:.5rem;font-size:.7rem;color:#666; text-align:center;background:#eee;}
.sroll-load-style{width:8rem;position:fixed;left:50%;bottom:0;border-radius:.25rem;margin-left:-4rem;padding:.5rem;font-size:.7rem;color:#666; text-align:center;vertical-align: middle; background:#eee;}


</style>
