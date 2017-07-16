<template>
  <div class="Home">
    <router-link to="/about">What is this?</router-link>
    <search-find></search-find>
  </div>
</template>

<script>
import SearchFind from './SearchFind'

export default {

  name: 'home',
  data () {
    return {
    }
  },
  components: {
    SearchFind
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
