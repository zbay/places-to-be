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
                                <input type="radio" value="Restaurant" v-model="destination.type"/>
                                <label class="nested">Sit down and eat</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" value="Active" v-model="destination.type"/>
                                <label class="nested">Be active</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" value="Arts" v-model="destination.type"/>
                                <label class="nested">Be entertained</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" value="Nightlife" v-model="destination.type"/>
                                <label class="nested">Go out and drink</label>
                            </div>
                            <div class="col-md-2">
                                <input type="radio" value="Miscellaneous" v-model="destination.type"/>
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
            <label>Location</label>
            <br />
            <input type="text" name="Location" v-model="location" v-validate="'required|min:2'"/>
        </div>
        <div class="form-group">
            <label>Search Radius (miles)</label>
            <br />
            <input type="text" name="Radius" v-model="radius" v-validate="'required|numeric|min_value:0'"/>
        </div>
        <div class="help" v-show="errors.has('Location')">{{ errors.first('Location') }}</div>
        <div class="help" v-show="errors.has('Radius')">{{ errors.first('Radius') }}</div>
        <button v-on:click="sendUp()">Find Places to Go</button>
    </form>
    </div>
</template>   

<script>

export default {
  name: 'destination-form',
  data () {
    return {
      location: 'Washington, DC',
      radius: '25',
      destinations: [{'type': 'Restaurant'}],
      destinationTypes: ['Restaurant', 'Active', 'Arts', 'Nightlife', 'Miscellaneous']
    }
  },
  methods: {
    sendUp: function () {
        
    },
    addDestination: function() {
        event.preventDefault() // prevents form from being submitted
        this.destinations.push({'type': 'Restaurant'})
    },
    removeDestination: function() {
        event.preventDefault() // prevents form from being submitted
        this.destinations.pop()
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
