<template>
   <div>
    <h3>What do you want to do?</h3>
    <hr />
    <form>
        <div class="form-group">
            <ul id="destinationList">
                <li v-for="(destination, index) in destinations">
                    <label>Destination {{index+1}}</label>
                    <br />
                    <div class="container">
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-2">
                                <input type="radio" :name="'Destination' + index" value="restaurants" v-model="destination.kind"/>
                                <label class="nested">Sit down and eat</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio":name="'Destination' + index" value="active" v-model="destination.kind"/>
                                <label class="nested">Be active</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" :name="'Destination' + index" value="arts" v-model="destination.kind"/>
                                <label class="nested">Be entertained</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" :name="'Destination' + index" value="nightlife" v-model="destination.kind"/>
                                <label class="nested">Go out and drink</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" :name="'Destination' + index" value="" v-model="destination.kind"/>
                                <label class="nested">LOL sO rAnDoM!</label>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                    </div>
                </li>
            </ul>
            <button v-if="destinations.length <= 10" v-on:click="addDestination()">Add Destination</button>
            <button v-if="destinations.length >= 2" v-on:click="removeDestination()">Remove Destination</button>
        </div>
        <div class="form-group">
            <label>City</label>
            <br />
            <input type="text" name="City" v-model="city" v-validate="'required|min:2'"/>
        </div>
        <div class="form-group">
            <label>Search Radius (miles)</label>
            <br />
            <input type="text" name="Radius" v-model="radius" v-validate="'required|numeric|min_value:0|max_value:25'"/>
        </div>
        <div class="help" v-show="errors.has('City')">{{ errors.first('City') }}</div>
        <div class="help" v-show="errors.has('Radius')">{{ errors.first('Radius') }}</div>
        <div class="help" v-show="this.errorMessage">No data was retrieved from Yelp. Please try again.</div>
        <button v-on:click="search()">Find Places to Go</button>
    </form>
    <hr />
    <results-list v-if="searchresults" v-bind:searchresults="searchresults"></results-list>
    </div>
</template>   

<script>
import ResultsList from './ResultsList'
var axios = require("axios");

export default {
  name: 'search-find',
  
  data () {
    return {
      city: 'Washington, DC',
      radius: '25',
      destinations: [{'kind': 'restaurants'}],
      destinationTypes: ['restaurants', 'active', 'arts', 'nightlife', ''],
      errorMessage: null,
      searchresults: null
    }
  },
  
  components: {
    ResultsList
  },
  
  methods: {
    search: function () {
        event.preventDefault()
        axios({
            method: 'post',
            url: '/search',
            data: {
                city: this.city,
                radius: this.radius,
                destinations: this.destinations,
                queryTypes: this.requestedDestinationTypes()
            }
        }).then((data) => {
            this.errorMessage = null;
            this.searchresults = data.data;
            console.log(JSON.stringify(this.searchresults));
        }).catch((err) => {
            this.searchresults = null;
            this.errorMessage = err;
        });
    },
    
    addDestination: function() {
        event.preventDefault() // prevents form from being submitted
        this.destinations.push({'kind': 'restaurants'})
    },
    
    removeDestination: function() {
        event.preventDefault() // prevents form from being submitted
        this.destinations.pop()
    },
    
    requestedDestinationTypes(){ // returns each unique destination type (non-redundant)
        var kinds = []
        for(var i = 0; i < this.destinations.length; i++){
            if(kinds.indexOf(this.destinations[i].kind) === -1){
                kinds.push(this.destinations[i].kind)
            }
        }
        return kinds;
    }
  }
}
</script>

<style scoped>
.nested {
  font-weight: normal;
  margin-left: 3px;
}
#destinationList{
    list-style-type:none;
    padding:0;
}

.help{
    color:red;
    font-weight:bold;
    padding:10px;
}

</style>
