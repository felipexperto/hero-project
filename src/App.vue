<template>
  <div id="app">
    <Mainheader />
    <section id="section-character-info" class="list-section" v-show="infos.length > 0">
      <h1>Detalhes do personagem</h1>
      <ul class="list-characters">
        <li v-for="info of infos" class="item"> 
          <div class="">
            <div class="list-wr-thumbnail" :style="{ backgroundImage: 'url(' + info.thumbnail + ')' }"></div>
          </div>
          <div class="">
            <h2 class="list-name">{{info.name}}</h2>
            <div class="list-lastmodified">
                Atualizado em: {{info.modified}}
            </div>
            <h4 class="list-description">{{info.description}}</h4>
          </div>
        </li>
      </ul>
    </section>
    <section class="list-section" v-show="infos.length == 0">
      <div class="empty-state">
        <img src="./assets/img/search-emptystate.svg" alt="">
        <h2>
          Hmm...
        </h2>
        <h3>
          Ainda não recebemos nenhum sinal<br>
          do universo Marvel. Faça uma busca.
        </h3>
      </div>
    </section>
    <Chatbox />
  </div>
</template>

<script>
  import { bus } from './main';
  import Mainheader from './Mainheader.vue';
  import Chatbox from './Chatbox.vue';

  export default {
    name: 'app',
    props: ['publicApiKey'],
    data () {
      return {
        infos: []
      }
    },
    components: {
      Mainheader,
      Chatbox
    },
    created() {

      var _self = this;

      bus.$on('sendCharacterData', function(obj) {
        
        _self.infos = [];
        _self.infos.push({
          description: obj.description, 
          modified: obj.modified, 
          name: obj.name, 
          thumbnail: obj.thumbnail
        });

      });
    }
  }
</script>

<style lang="scss">
  #app {
    background-color: #fff;
    color: #000;
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .list-section {
    margin: 0 auto;
    max-width: 1170px;
    padding: 40px 0;

    h1, h2, h3 {
      color: rgba(0,0,0,.7);
    }

    h1 {
      
      font-weight: 900;
      margin-left: 1.5rem;
      text-transform: uppercase;
    }

    h2 {
      font-weight: 800;
      margin-top: 0;
      margin-bottom: .15rem;
    }

    h3 {
      font-weight: 800;
      margin-top: 0;
      margin-bottom: 0;
    }

    h4 {
      color: rgba(0,0,0,.9);
      font-weight: normal;
      line-height: 1.6em;
      margin-bottom: 0;
    }

    .empty-state {
      color: rgba(0,0,0,.7);
      text-align: center;

      h3 {
        font-size: 18px;
        font-weight: 400;
        line-height: 1.4em;
      }

      img {
        max-width: 100%;
        width: 300px;
      }
    }

  }

  .list-characters {
    list-style-type: none;
    padding: 0;

    .item {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin: 1rem 0;
      padding: 1rem;

      > div {
        padding: .5rem .5rem;
      }

      > div:nth-child(1) {
        min-width: 150px;
      }

    }

    .list-wr-thumbnail {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 1.5rem;
      box-shadow: 0px 28px 28px -16px rgba(0, 0, 0, 0.3), 0 12px 13px -7px rgba(0, 0, 0, 0.22);
      height: 0;
      max-width: 100%;
      padding-top: 100%;
      width: 150px;
    }

    a {
      color: #42b983;
      text-decoration: none;
    }

    .list-lastmodified {
      font-size: .8rem;
    }

  }
</style>
