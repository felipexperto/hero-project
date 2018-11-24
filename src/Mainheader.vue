<template>
  <div id="main-header">
    <div class="topbar">
        <div class="logo">Hero Project</div>
    </div>
    <div class="banner">
      <Searchform />
      <div class="overlay"></div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>
  import Searchform from './Searchform.vue';

  export default {
    name: 'main-header',
    data () {
      return {
        
      }
    },
    methods: {

    },
    computed: {

    },
    components: {
      Searchform
    },
    beforeCreate () {

    },
    mounted () { 

    }
  }
</script>

<style lang="scss">

  // variables
  $white: rgb(255,255,255);
  $red-darker: rgb(205, 49, 27);

  #main-header {
    color: #fff;

    .topbar {
      background-color: #fff;
      padding: 1rem 2rem;
      position: relative;
      width: 100%;
      z-index: 2;

      &:before {
        background-color: #fff;
        bottom: 0;
        box-shadow: 0px 10px 12px 0px rgba(170, 30, 10, 1);
        content: " ";
        display: block;
        height: 10px;
        left: 0;
        position: absolute;
        width: 100%;
        z-index: 2;
      }

      .logo {
        color: $red-darker;
        font-size: 1.25rem;
        font-weight: 900;
        text-align: center;
        text-transform: uppercase;
        width: 100%;
      }
    }

    .banner {
      padding-top: 25%;
      position: relative;
      width: 100%;
    
     .overlay,
     .bg {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }

      .overlay {
        background-color: rgba($red-darker, .9);
        z-index: 1;
      }

      .bg {
        background-image: url("assets/img/banner-marvel-studio.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }

  }





</style>
