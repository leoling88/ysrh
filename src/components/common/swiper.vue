<template>
	<div class="swipe-wrap" :style="{'width':swinperView.width + 'px'}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" ref="back" >
		<div class="swipe-box" :style="{'width':swinperView.ulWidth + 'px','transform': 'translate3d('+swinperView.left +'px, 0, 0)'}">
			<div class="lists">
				<ul >
					<li v-for="(item, index) in swiperLists" :style="{'width':swinperView.width + 'px'}" @click="clickView(item.id)" ><img :src="item.headUrl" alt="" /></li> <!-- @click.stop="clickView(index)">-->
				</ul>
			</div>
		</div>
		<div class="title" v-show="swinperView.titleShow"><span class="icon-video"></span>{{swinperView.title}}</div>
		<div class="page">
			<div class="page-view">
				<span v-for="(item, index) in swiperLists" @click="clickSwinper(index)">
				</span>
			</div>
			<i :style="{'transform': 'translate3d('+swinperView.hover +'rem, 0, 0)'}"></i>
		</div>
	</div>

</template>
<script>
	let num = 0         //初始化游标
	let direction = 0        //初始滚动方向   0：向右  1：向左
	let Mdirection = ''        //初始滚动方向手势 0：向右  1：向左
	let swinperW
	let pageX 
	let page
	export default {
		name:'v-swiper',
		data () {
			return {
			}
		},
		props: {
			swiperLists: Array,
			swinperView: Object
		},
		computed: {
		},
		mounted(){

			this.swinperShow()
		    this.touch = {}
		},			
		methods: {
	        swinperShow () {

				let _this = this
				let direction = 0
				// this.swinperView.title = _this.swiperLists[0].title
				this.timer=setInterval(function(){
					swinperW = _this.swinperView.viewX          //视图偏移位置
					pageX = _this.swinperView.pageX             //游标偏移位置
					_this.swinperView.width = swinperW
					page = _this.swiperLists.length  
					_this.swinperView.ulWidth = page * swinperW

					           //列表长度
					if(direction == 0 ) {
						// console.log(num + '===' + page)
						if(num < (page - 1)){
							num ++
						}else {
							direction = 1
						}

					}else if( direction == 1 ){
						if (num > 0){
							num --
						}else {
							direction = 0
						}
					}
					_this.swinperView.left = '-'+num * swinperW
					_this.swinperView.hover = num * pageX					
					// console.log('num=' + num + "pageX=" +pageX + 'page=' +page)
					_this.swinperView.title = _this.swiperLists[num].title							
				},5000);
				//swinper.left
	        },
	        clickSwinper (index) {
	        	direction = 0
	        	num = index
				this.swinperView.left = '-'+num * swinperW
				this.swinperView.hover = num * pageX							
				this.swinperView.title = this.swiperLists[index].title		
	        },
	        clickView(id) {
	        	this.swinperView.clickValue = id
	            this.$emit('clickView');
	        },
		    touchStart(e) {
				const touch = e.touches[0]
				this.touch.startX = touch.pageX
				//this.touch.startY = touch.pageY
		    },
		    touchMove(e) {
				const touch = e.touches[0]
				const deltaX = touch.pageX - this.touch.startX
		      //const deltaY = touch.pageY - this.touch.startY
		      // if (Math.abs(deltaY) > Math.abs(deltaX)) {
		      //   return
		      // }
		      if (deltaX > 100) {
		      	Mdirection = 1
		      	direction = 1
		      }else if (deltaX < -100){
		      	Mdirection = 0
		      	direction = 0
		      }
		    },
		    touchEnd() {
				if(Mdirection == 0 ) {
					if(num < (page - 1)){
						num ++
					}
					this.swinperView.left = '-'+num * swinperW
					this.swinperView.hover = num * pageX
					Mdirection = null
				}else if( Mdirection == 1 ){
					if (num > 0){
						num --
					}
					this.swinperView.left = '-'+num * swinperW
					this.swinperView.hover = num * pageX
					Mdirection = null							
				}
				this.swinperView.title = this.swiperLists[num].title						
		    }
		},
		watch: {
            'swinperView.viewX':function(oldval, val){
            	if(oldval != val) {
					swinperW =  this.swinperView.viewX
					this.swinperView.width = swinperW
					this.swinperView.ulWidth = page * swinperW
					this.swinperView.hover = num * pageX
            	}
            },
		}
	}	
</script>
<style scoped>
.swipe-wrap{
	width:100%;
	height:4rem;
	position: relative;
	overflow:hidden;
	
	
}
.swipe-box{width:100%;position:absolute;top:0;left:0;transition: transform .38s ease-in-out,visibility .38s,-webkit-transform .38s ease-in-out;}
.swipe-box .lists li{float:left; height:4rem;background:url(../../assets/images/banner1.jpg) no-repeat;background-size:100% 100%;}
.swipe-box .lists li img{width:100%;height:100%;}

.swipe-wrap .title{position:absolute;width:100%;height:.8rem;line-height:.8rem;bottom:0;left:0; z-index:30;color:#fff;text-indent:.3em;background:#000;opacity:.6;z-index:100;}
.swipe-wrap .page{position:absolute;bottom:.2rem;right:.2rem;padding:0 .01rem; z-index:101;}
.swipe-wrap .page span{display:block;float:left;width:.08rem;height:.08rem;margin:0 .08rem 0 0;border-radius:50%;background:#fff;}
.swipe-wrap .page span:last-child{margin:0;}
.swipe-wrap .page i{ display:block; width:.09rem;height:.09rem;border-radius:50%;background:#67ff01; position:absolute;top:.01rem;left:.02rem;transition: transform .38s ease-in-out,visibility .38s,-webkit-transform .38s ease-in-out;}
.swipe-wrap .page-view{border-radius:3rem;padding:.01rem .02rem;overflow:hidden}
.icon-video{display:none;}
#video .icon-video{display:block;float:left;width:.5rem;height:.8rem;background:url(../../assets/images/icon_video.png) no-repeat center center;background-size:.4rem .3rem;}
</style>