<template>
    <div class="imgshow" v-if="imgBoxShow" >
      <div  :style="{'width':imgBoxDatas.width + 'px','height':imgBoxDatas.height +'px'}" class="bg" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" >{{imgBoxDatas.left}}</div>
      <!---->


    </div>
</template>
<script>
  export default {
    data() {
      return {
        imgBoxShow:true,
        minWidth: document.body.clientWidth,
        imgBoxDatas:{
          width:'100',
          height:'200',
          top:'',
          left:''
        },
        touch:{
          isStart:false,
          startX:'',
          startY:'',
          initX:'',
          initY:''


        }
        

      };
    },
    props:{
      imgView: Object

    },
    methods: {
      touchStart(e) {
        let touch1 = e.touches[0]
        this.touch.startX1 = touch1.pageX
        this.touch.startY1 = touch1.pageY
        this.touch.initX = e.target.offsetLeft;
        this.touch.initY = e.target.offsetTop;

alert(e.touches.length )
        if( e.touches.length > 1){
          this.imgBoxDatas.isStart = true

          

          

        }else{
          this.imgBoxDatas.isStart = false
          this.imgBoxDatas.left = ""
        }

      },
      touchMove(e) {
         e.preventDefault();
        
        const touch1 = e.touches[0]
        this.touch.deltaX1 = touch1.pageX
        this.touch.deltaY1 = touch1.pageY
        let _x1 = Math.round(this.touch.startX1)
        let _x2 = Math.round(this.touch.deltaX1)
        let _y1 = Math.round(this.touch.startX1)
        let _y2 = Math.round(this.touch.deltaY1)
        if(this.imgBoxDatas.isStart){   
          if(Math.abs(_x1) > Math.abs(_x2)){
            this.imgBoxDatas.width = this.imgBoxDatas.width + (Math.abs(_x1) - Math.abs(_x2))


          }    
        }


    


      },
      touchEnd(e) {
        e.touches = []
        this.imgBoxDatas.isStart = false

         



      }
    },
    mounted() {
      this.minWidth = document.body.clientWidth
    },
    watch:{

    },
  };
</script>
<style lang="less" scoped>
.bg{background:#ccc}
.imgshow{width:100%;height:100%;position:fixed;top:0;left:0;z-index:2000;background:#000;}
</style>

