<template>
  <form class="form-search">
    <h1>Encontre seus heróis preferidos da Marvel</h1>
    <div class="input-group">
      <input 
        type="text"   
        class="search-input"
        placeholder="Procure pelo nome de um herói ou heroína"
        v-on:keyup="changeValue"
        v-on:blur="showSearchRecomendations = true"
        >
      <input 
        :title="tippyTitle"
        type="button" 
        class="search-submit icon-lupa" 
        value="Pesquisar"
        v-on:click="changeValue"
        v-on:blur="showSearchRecomendations = false"
        v-tippy="{
            animation: 'scale',
            arrow: true,
            arrowType: 'round',
            duration: 500,
            delay: 100,
            size: 'large'
        }"
        >
    </div>
    <div class="input-group-result" v-if="showSearchRecomendations">
      <table>
        <thead>
          <tr>
            <th colspan="2">Pesquisas relacionadas:</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="item in infos" 
            v-on:click="showResult($event)"
            :data-description="item.description"
            :data-modified="item.modified"
            :data-name="item.name"
            :data-thumbnail="item.thumbnail"
            >
            <td>
              <img :src="item.thumbnail">
            </td>
            <td>{{item.name}}</td>
          </tr>
          <tr v-html="this.templates">
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>

<script>

  export default {
    name: 'Searchform',
    data () {
      return {
        infos: [],
        searchIconEl: null,
        searchWords: '',
        showSearchRecomendations: false,
        templates: '',
        tippyTitle: ''
      }
    },
    mounted () {
      this.searchIconEl = document.querySelector('.search-submit');
    },
    methods: {
      showResult: function($event) {
        this.$emit('clicked', 'someValue');
        console.dir($event);
        // console.dir($event.target);
        // console.log os valores do personagem clicado
        // fechar recomendacoes apos clique
        // passar os valores para o componente pai (app)
      },
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
      },
      getValue: function() {
        this.searchWords = document.querySelector('.search-input').value; 
      },
      showAlert: function() {
        this.searchIconEl.classList.remove('icon-lupa');
        this.searchIconEl.classList.remove('icon-loader');
        this.searchIconEl.classList.add('icon-alert');
        this.tippyTitle = 'Insira 3 letras ou mais para realizar a busca';
      },
      showLoading: function() {
        this.searchIconEl.classList.remove('icon-lupa');
        this.searchIconEl.classList.remove('icon-alert');
        this.searchIconEl.classList.add('icon-loader');
        this.tippyTitle = '';
      },
      showDefaultState: function() {
        this.searchIconEl.classList.remove('icon-loader');
        this.searchIconEl.classList.add('icon-lupa');
      },
      showNoResults: function() {
        this.templates = `
            <td colspan="2" class="search-noresults">
              <strong>😭 Nenhum resultado encontrado. Por favor, tente novamente.</strong>
            </td>
            <td></td>
          `;
        this.showSearchRecomendations = true;
      },
      showError: function(error) {
        this.templates = `
            <td colspan="2" class="search-error">
              <strong>😰 Oops! Ocorreu um erro:</strong><br/> ${error}
            </td>
            <td></td>
          `;
        this.showSearchRecomendations = true;
      },
      changeValue: function(e) {
        e.preventDefault();

        this.getValue();

        if (this.searchWords.length < 3) {
          this.showAlert();
          return;
        }
        this.doSearch();
      },
      doSearch: function() {

        let _self = this,
            s = {
                  prefix : 'https://gateway.marvel.com:443/v1/public/characters',
                  nameStartsWith : 'nameStartsWith='+this.searchWords,
                  order  : 'orderBy=name',
                  limit  : 'limit=99'
                };

        _self.showLoading();

        this.axios
          .get(s.prefix + '?' + s.nameStartsWith + '&' + s.order + '&' + s.limit + '&' + 'apikey='+publicApiKey)
          .then(response => {

            _self.infos = [];
            _self.templates = '';

            var itens = response.data.data.results;

            if (itens.length == 0) _self.showNoResults();

            for (var item of itens) {
              _self.infos.push({
                name: item.name,
                description: _self.formatDescription(item.description),
                resourceURI: item.resourceURI,
                modified: _self.formatLastModifiedDate(item.modified),
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension
              });
            }

            _self.showSearchRecomendations = true;

          })
        .catch(error => {
          _self.showError(error);
        }).then(function () {
          _self.showDefaultState();
        });

      }
    }
  }
</script>

<style lang="scss">

  #main-header {
    h1 {
      font-weight: 400;
      font-size: 1.75rem;
    }
  }

  .form-search {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    margin: auto;
    text-align: center;
    width: 600px;
    max-width: 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;

    .input-group {
      position: relative;
    }

    .search-input,
    .search-submit,
    .input-group-result {
      border: 0;
      border-radius: 4px;
    }
    .search-input {
      background-color: #fff;
      padding: 1rem 2rem;
      width: 100%;
    }
    .search-submit {
      background-color: transparent;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 90%;
      cursor: pointer;
      margin-right: .5rem;
      opacity: .5;
      overflow: hidden;
      padding: 1rem 1rem;
      position: absolute;
      right: 0;
      text-indent: -9999em;
      top: 0;
      transition: all .25s ease-out;
    }
    .search-submit.icon-lupa {
      background-image: url('assets/img/icon-search.svg');
    }
    .search-submit.icon-lupa:hover {
      background-image: url('assets/img/icon-search-hover.svg');
      background-size: 100%;
      opacity: 1;
    }
    .search-submit.icon-alert {
      background-image: url('assets/img/icon-alert.svg');
    }
    .search-submit.icon-alert:hover {
      background-size: 100%;
      opacity: 1;
    }
    .search-submit.icon-loader {
      animation-iteration-count: infinite;
      animation-name: spin;
      animation-duration: .5s;
      background-image: url('assets/img/icon-loader.svg');
    }

    .search-input,
    .input-group-result {
      box-shadow: 0px 3px 3px rgba(0,0,0,.15);
    }

    .search-error {
      line-height:1.6em;
    }

    .input-group-result {
      background-color: #fff;
      box-shadow: 0px 3px 3px rgba(0,0,0,.15);
      color: rgba(0,0,0,.8);
      max-height: 300px;
      overflow-x: hidden;
      overflow-y: scroll;
      text-align: left;
      transform: translateY(-5px);

      &::-webkit-scrollbar {
          width: 12px;
      }

      &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px; 
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      tbody tr {

        &:hover {
          background-color: #eee;
          cursor: pointer;
        }
      }

      td {
        padding: .5rem .25rem;

        &:nth-child(1) {
          padding-left: 2rem;
          width:40px
        }
        &:nth-child(2) {
          padding-right: 2rem;
        }

      }

      th {
        &:nth-child(1) {
          font-weight: normal;
          font-size: 1rem;
          padding: 1rem 2rem;
        }
      }

      img {
        border-radius: 100em; 
        height:40px; 
        margin-right: .5rem;
        width:40px
      }
    }
  }

    
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }



</style>
