<template>
  <div :class="['loading',show ? 'show' : '']">
    <div class="loader-inner"><slot name="text" ></slot></div>

  </div>

</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'v-messages',
    components: {
    },
    props: {
      show: {
        type: Boolean
      }
    },
    computed: {

    }
  };
</script>
<style scoped>
  .loading{position: fixed;  top: -100%; left: 0;  right: 0;  z-index: 9999999;  width: 100%;  height: 100%;opacity: 0;}
  .loading.show {top:0;opacity: 1;}
  .loader-inner{background:#000;transition: all .5s ease; transform: translateY(-100%);transform: translateY(50%);opacity:0;position:absolute;left:50%;padding:.2rem;}
  .loading.show .loader-inner{width:4.5rem;margin-top:45% ;margin-left:-2.27rem;border-radius:.1rem; transition: all .5s ease; transform: translateY(-100%);transform: translateY(50%);opacity:.6;color:#fff; text-align: center;font-size:.34rem;}


</style>
