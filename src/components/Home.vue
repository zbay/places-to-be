<template>
  <div class="Home">
    <router-link to="/about">What is this?</router-link>
    <destination-form></destination-form>
  </div>
</template>

<script>
import DestinationForm from './DestinationForm'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users: [{firstname: 'Sebastian', lastname: 'Eschweiler'},
        {firstname: 'Bill', lastname: 'Smith'},
        {firstname: 'John', lastname: 'Porter'}],
      input_val: ''
    }
  },
  components: {
    DestinationForm
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
