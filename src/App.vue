<template>
  <div id="app">
    <section class="list-section">
      <h1>{{ msg }}</h1>
      <ul class="list-characters">
        <li v-for="info of infos" class="item"> 
          <div class="">
            <div class="list-wr-thumbnail" :style="{ backgroundImage: 'url(' + info.thumbnail + ')' }"></div>
          </div>
          <div class="">
            <h2 class="list-name">{{info.name}}</h2>
            <div class="list-lastmodified">
                Atualizado em: <a :href="info.resourceURI" target="_blank">{{info.modified}}</a>
            </div>
            <h4 class="list-description">{{info.description}}</h4>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'app',
    props: ['publicApiKey'],
    data () {
      return {
        msg: 'Lista de personagens',
        infos: []
      }
    },
    methods: {
      formatDescription: function (description) {
        if(description == '') return description = "Descrição indisponível";
        return description;
      },
      formatLastModifiedDate: function(date) {
        let fullDate = date.split('T')[0],
            fullDatePortuguese = fullDate.split('-').reverse().join().replace(/,/g, "/"),
            fullHour = date.split('T')[1],
            hour = fullHour.split('-')[0],
            timezone = fullHour.split('-')[1];

        return fullDatePortuguese + ' ' + hour;
      }
    },
    beforeCreate () {

    },
    mounted () { 
      // search string
      let s = {
        prefix : 'https://gateway.marvel.com:443/v1/public/characters',
        nameStartsWith : 'nameStartsWith=spi',
        order  : 'orderBy=name',
        limit  : 'limit=99'
      }
      this.axios
        .get(s.prefix + '?' + s.nameStartsWith + '&' + s.order + '&' + s.limit + '&' + 'apikey='+publicApiKey)
        .then(response => {
          var itens = response.data.data.results;
          for (var item of itens) {
            this.infos.push({
              name: item.name,
              description: this.formatDescription(item.description),
              resourceURI: item.resourceURI,
              modified: this.formatLastModifiedDate(item.modified),
              thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension
            });
          }
        })
         .catch(error => {
            console.log(error);
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

    h1 {
      color: rgba(0,0,0,.7);
      font-weight: 900;
      margin-left: 1.5rem;
      text-transform: uppercase;
    }

    h2 {
      color: rgba(0,0,0,.7);
      font-weight: 800;
      margin-top: 0;
      margin-bottom: .15rem;
    }

    h4 {
      color: rgba(0,0,0,.9);
      font-weight: normal;
      line-height: 1.6em;
      margin-bottom: 0;
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
