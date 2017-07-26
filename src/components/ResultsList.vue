<template>
    <div>
        <h3>Here's a plan!</h3>
        <ol id="resultsList">
            <li v-for="(destination, index) in searchresults" class="container">
                <div class="row inside-li">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5 left-column">
                        <a v-bind:href="destination.url" class="title">{{destination.name}}</a>
                        <br />
                        {{destination.loc}}
                        <br />
                        {{destination.phone}}
                        <br />
                        <span v-for="star in destination.rating">&#9733;</span>
                        <br />
                        {{destination.reviews}}
                        <br /><br />
                        <button v-on:click="swapOut(destination.category, index)">Want something else?</button>
                    </div>
                    <div class="col-lg-1"></div>
                    <div class="col-lg-4 right-column">
                        <img class="destImg" v-bind:src="destination.image_url"/>
                    </div>
                    <div class="col-lg-1"></div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
var axios = require("axios");

export default {
  name: 'results-list',
  data () {
    return {
        destNames: []
    }
  },
  
  props: ['searchresults', 'city', 'radius'],
  
 methods: {
    swapOut: function(category, index){
        //send out request to swap a destination for another one in the same category
        event.preventDefault();
        console.log(this.city);
        console.log(JSON.stringify(this.searchresults));
        axios({
            method: 'post',
            url: '/swap',
            data: {
                city: this.city,
                radius: this.radius,
                otherDests: this.getNames(),
                category: category
            }
        }).then((data) => {
            this.$set(this.searchresults, index, data.data || this.searchresults[index]);
            this.destNames.push(data.data.name);
        }).catch((err) => {
            alert(err);
        });
    },
    getNames: function(){
        if(this.destNames.length == 0){
            let count = 0;
            for(let i= 0; i < this.searchresults.length; i++){
                this.destNames.push(this.searchresults[i].name);
                count++;
                if(count === this.searchresults.length){
                    return this.destNames;
                }
            }
        }
        else{
            return this.destNames;
        }
    }
 }
 }
</script>

<style scoped>
.destImg{
    min-height:60%;
    min-width:40%;
    max-height:300px;
    max-width:95%;
    margin-bottom:15px;
    border: 5px groove white;
    border-radius: 3px;
    margin-left:auto;
    margin-right:auto;
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

.left-column{
    margin-top:2%;
    margin-bottom:5%;
    margin-left:3%;
    margin-right:3%;
    height:100%;
    border: 3px solid black;
    background-color:white;
    padding-bottom: 5px;
}

.title{
font-size:27px;
text-decoration:underline;
}

</style>