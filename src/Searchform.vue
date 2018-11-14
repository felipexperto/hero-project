<template>
  <form class="form-search">
    <h1>Encontre seus heróis preferidos da Marvel</h1>
    <div class="input-group">
      <input 
        type="text"   
        class="search-input"
        placeholder="Procure pelo nome de um héroi ou heroína"
        v-on:keyup="changeValue"
        v-on:blur="showSearchRecomendations = false"
        >
      <input 
        type="button" 
        class="search-submit" 
        value="Pesquisar"
        v-on:click="changeValue"
        v-on:blur="showSearchRecomendations = false"
        >
    </div>
    <div class="input-group-result" v-if="showSearchRecomendations">
      <table>
        <thead>
          <tr>
            <th colspan="2">Pesquisar relacionadas:</th>
          </tr>
        </thead>
        <tbody v-html="this.templates">
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
        searchWords: '',
        showSearchRecomendations: false,
        infos: [],
        templates: ''
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
      },
      getValue: function() {
        this.searchWords = document.querySelector('.search-input').value; 
      },
      changeValue: function(e) {
        e.preventDefault();
        this.getValue();
        this.doSearch();
      },
      doSearch: function() {
        if (this.searchWords.length < 3) return;

        // adicionar loader,
        // substituindo o icone de lupa por uma rodinha
        // desabilitando o click para outra busca

        // search string
        let s = {
          prefix : 'https://gateway.marvel.com:443/v1/public/characters',
          nameStartsWith : 'nameStartsWith='+this.searchWords,
          order  : 'orderBy=name',
          limit  : 'limit=99'
        }
        this.axios
          .get(s.prefix + '?' + s.nameStartsWith + '&' + s.order + '&' + s.limit + '&' + 'apikey='+publicApiKey)
          .then(response => {
            this.infos = [];
            this.templates = '';
            var itens = response.data.data.results;
            for (var item of itens) {
              this.infos.push({
                name: item.name,
                description: this.formatDescription(item.description),
                resourceURI: item.resourceURI,
                modified: this.formatLastModifiedDate(item.modified),
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                template: `
                          <tr>
                            <td>
                              <img src="${item.thumbnail.path}.${item.thumbnail.extension}">
                            </td>
                            <td>${item.name}</td>
                          </tr>`
              });
            }
            for (var html of this.infos) {
              this.templates += html.template;
            }
            this.showSearchRecomendations = true;

            // remover loader,
            // substituindo o icone de rodinha pela lupa
            // habilitando o click para outra busca

          })
        .catch(error => {
          console.log(error);

          // tratar erros com mensagem em tela
          // notificando usuario de possíveis problemas

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
      background-image: url('assets/img/icon-search.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 75%;
      cursor: pointer;
      opacity: .5;
      overflow: hidden;
      padding: 1rem 1.5rem;
      position: absolute;
      right: 0;
      text-indent: -9999em;
      top: 0;
      transition: all .25s ease-out;
    }
    .search-submit:hover {
      background-image: url('assets/img/icon-search-hover.svg');
      background-size: 100%;
      opacity: 1;
    }

    .search-input,
    .input-group-result {
      box-shadow: 0px 3px 3px rgba(0,0,0,.15);
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

    

</style>
