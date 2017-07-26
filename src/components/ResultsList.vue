<template>
    <div>
        <h3>Here's a plan!</h3>
        <ol id="resultsList">
            <li v-for="(destination, index) in searchresults" class="container">
                <div class="row inside-li">
                    <div class="col-lg-4">
                        <a v-bind:href="destination.url" class="title">{{destination.name}}</a>
                        <br />
                        {{destination.loc}}
                        <br />
                        {{destination.phone}}
                    </div>
                    <div class="col-lg-8">
                        <img class="destImg" v-bind:src="destination.image_url"/>
                    </div>
                </div>
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
 }
 }
</script>

<style scoped>
.destImg{
    min-height:150px;
    min-width:150px;
    max-height:250px;
    max-width:250px;
    margin-bottom:15px;
    border: 5px groove white;
    border-radius: 3px;
}

#resultsList{
    padding:0;
    margin-left:10%;
    margin-right:10%;
}

li{
    border: 10px solid #D80032;;
    border-radius: 10px;
    margin: 7px;
    /* lightgray from 0 to 10px, white from 10 to 20px */
background: repeating-linear-gradient(
  45deg,
  lightgray,
  lightgray 10px,
  white 10px,
  white 20px
);
}

.inside-li{
    color:black;
}

.col-lg-4{
    border-right: 5px solid black;
    height:100%;
}

.title{
font-size:30px;
}

</style>