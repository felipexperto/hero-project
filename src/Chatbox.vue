<template>
  <div id="chat-box">
    <div class="chatbox-container">
      <a class="chatbox-icon">
        <i v-on:click="chatboxOpenClose" ref=""></i>
      </a>
      <div class="chatbox-window">
        <div class="chatbox-window__header">
          <img class="chatbox-window__photo" 
             src="./assets/img/profile-80.jpg" 
             alt="">
          <div class="chatbox-window__text">
            <p>Olá! Tudo bem? 👋</p>
            <p>Meu nome é Felipe e sou o criador desse projeto.</p> 
            <p>Ele é opensource e você pode encontrá-lo no <strong><a href="https://github.com/felipexperto/hero-project" title="Github, Hero Project por Felipe Marciano" target="_blank">Github</a></strong>.</p> 
          </div>
        </div>
        <!-- <div class="chatbox-window__footer">
          <a href="#" target="_blank" title="Quero conversar agora">Quero conversar agora</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chat-box',
    data() {
      return { 
        chatboxIcon: null,
        chatboxWindow: null
      }
    },
    mounted() {
      this.chatboxIcon   = document.querySelector('#chat-box .chatbox-icon i');
      this.chatboxWindow = document.querySelector('#chat-box .chatbox-window');
    },
    methods: {
      chatboxOpenClose: function(e) {
        this.chatboxIcon.classList.toggle("is-active");
        this.chatboxWindow.classList.toggle("is-active");
      }
    }
  }
</script>

<style lang="scss">


  @keyframes chatbox-spin {
      0% {
        background-image: url("assets/img/chatbox-icon-open.svg");
        opacity: 1;
        transform: rotate(0deg);
      }
      50% {
        opacity: 0;
      }
      100% {
        background-image: url("assets/img/chatbox-icon-close.svg");
        opacity: 1;
        transform: rotate(360deg);
      }
    }
    @keyframes chatbox-spin-close {
      0% {
        background-image: url("assets/img/chatbox-icon-close.svg");
        opacity: 1;
        transform: rotate(360deg);
      }
      50% {
        opacity: 0;
      }
      100% {
        background-image: url("assets/img/chatbox-icon-open.svg");
        opacity: 1;
        transform: rotate(0deg);
      }
    }

    .chatbox-icon i {
      animation-name: chatbox-spin-close;
      animation-iteration-count: 1;
      animation-duration: .75s;
      background-image: url("assets/img/chatbox-icon-open.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      display: block;
    }
    .chatbox-icon i.is-active {
      animation-name: chatbox-spin;
      background-image: url("assets/img/chatbox-icon-close.svg");
    }
    .chatbox-container {
      background-color: #00f;
      color: #444;
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 20;
    }
    .chatbox-container * {
      box-sizing: border-box;
    }
    .chatbox-container a {
      text-decoration: none;
    }
    .chatbox-container p {
      margin: 0;
      padding: 0;
    }
    .chatbox-icon,
    .chatbox-icon i {
      border-radius: 10em;
      height: 52px;
      width: 52px;
    }
    .chatbox-icon {
      background-color: #009d00;
      bottom: 0;
      cursor: pointer;
      position: absolute;
      right: 0;
    }
    .chatbox-window {
      background-color: #fff;
      border-radius: 8px;
      bottom: 64px;
      height: auto;
      max-height: 0;
      overflow: hidden;
      position: absolute;
      right:0;
      transition: all .5s ease-in;
      width: 280px;
    }
    .chatbox-window.is-active {
      box-shadow: 0px 0px 10px 5px rgba(0,0,0,.15);
      max-height: 200px;
    }
    .chatbox-window__photo {
      border-radius: 10em;
      display: inline-block;
      height: 48px;
      vertical-align: top;
      width: 48px;
    }
    .chatbox-window__text {
      display: inline-block;
      padding-left: 5%; 
      width: calc(94% - 48px);

      & p:nth-child(1) {
        margin-bottom: 10px;
      }

      & p:not(:nth-child(1)) {
        font-size: .8rem;
        line-height: 1.5em;
      }
    }
    .chatbox-window__header {
      padding: 16px;
    }
    .chatbox-window__footer {
      border-top: solid 1px rgba(0,0,0,.15);
      text-align: center;
    }
    .chatbox-window__footer a {
      color: #009d00;
      display: inline-block;
      font-size: 1.1em;
      font-weight: 900;
      padding: 16px;
      transition: all .25s ease;
      width: 100%;
    }
    .chatbox-window__footer a:focus,
    .chatbox-window__footer a:hover {
      transform: scale(1.05);
    }











</style>
