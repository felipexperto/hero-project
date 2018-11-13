<template>
  <form class="form">
    <h1>Encontre seus heróis preferidos da Marvel</h1>
    <div class="input-group">
      <input 
        type="text"   
        class="search-input"
        placeholder="Procure pelo nome de um héroi ou heroína"
        v-on:keyup="doSearch"
        >
      <input type="submit" class="search-submit" value="Pesquisar">
    </div>
    <div class="input-group-result">
      <table>
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
      changeValue: function(e) {
        // console.log(e.target.value);
        return e.target.value;
      },
      doSearch: function(e) {
        let searchValue = this.changeValue(e);
        if (searchValue.length < 3) return;

        // search string
        let s = {
          prefix : 'https://gateway.marvel.com:443/v1/public/characters',
          nameStartsWith : 'nameStartsWith='+searchValue,
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
          })
        .catch(error => {
          console.log(error);
        });


        
      }
    }
  }
</script>

<style lang="scss">

  #main-header {


   
      .form {
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

        h1 {
          font-weight: 400;
          font-size: 1.75rem;
        }

        .input-group {
          position: relative;
        }

        .search-input,
        .search-submit {
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

        .input-group-result {

          img {
            border-radius: 100em; 
            height:40px; 
            width:40px;
          }
        }
      }

    
  }
</style>
