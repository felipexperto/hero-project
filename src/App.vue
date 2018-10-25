<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="info of infos" style="display:block; border-bottom: solid 1px rgba(0,0,0,.25)"> 
        <p>{{info.name}}</p>
        <p>{{info.description}}</p>
        <p><a :href="info.resourceURI" target="_blank">{{info.modified}}</a></p>
        <p><img :src="info.thumbnail" :alt="info.name"></p>
      </li>
    </ul>
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
  beforeCreate () {

  },
  mounted () { 
    this.axios
      .get('https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=40&apikey='+publicApiKey)
      .then(response => {
        var itens = response.data.data.results;
        for (var item of itens) {
          this.infos.push({
            name: item.name,
            description: item.description,
            resourceURI: item.resourceURI,
            modified: item.modified,
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
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
