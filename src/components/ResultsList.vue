<template>
    <div>
        <h3>Here's your plan!</h3>
        <ol>
            <li v-for="(destination, index) in searchresults">
            {{destination.name}}
            </li>
        </ol>
    </div>
</template>

<script>
export default {
  name: 'results-list',
  data () {
    return {
        destinations: null,
    }
  },
  
  props: ['searchresults'],
  
 methods: {
 test: function() {
    console.log("testingggg....");
    console.log(this.searchResults);
 }
 }
 }
</script>

<style>
</style>