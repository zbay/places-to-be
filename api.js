const express = require("express");
const yelp = require('yelp-fusion');
const jsonQuery = require("json-query");
require('dotenv').config(); // access process.env variables

const clientId = process.env.YELP_CLIENT_ID;
const clientSecret = process.env.YELP_CLIENT_SECRET;

const app = express();

module.exports = function Routes(app){

    app.post("/search", function process(req, res){ // process search requests
        const requestData = req.body;
        
        let promise = new Promise((fulfill, reject) => {
            let searchRequests = [];
            
            let searchRadius = requestData.radius * 1609.344; // convert radius from miles to meters
            if(searchRadius > 40000){ // yelp only accepts up to 40000 meters
                searchRadius = 40000;
            }
            searchRadius = Math.floor(searchRadius); // yelp API only accepts integers for distance
        
            for(let i = 0; i < requestData.queryTypes.length; i++){ // create a search request for each necessary category
                searchRequests[i] = {
                location: requestData.city,
                radius: searchRadius, 
                categories: requestData.queryTypes[i]
                }
                if(searchRequests.length === requestData.queryTypes.length){ // verify that all searchRequests have been generated before sending them along
                    fulfill(searchRequests);
                }
            }
            }).then((searchRequests) => {
                yelp.accessToken(clientId, clientSecret).then(response => { // get a yelp token
                    const client = yelp.client(response.jsonBody.access_token); // establish a client using the token
                    let randomDestinations = []; // array of destination objects
                    let destNames = []; // array of destination names only, to easily prevent redundancy
                    let count = 0;
            
                    for(let i = 0; i < searchRequests.length; i++){ // for each destination type...
                        client.search(searchRequests[i]).then(response => { // ...search for that destination type
                            let results = response.jsonBody.businesses;
                            deleteRedundant(destNames, results); // delete redundant destinations from other categories
                            console.log(results);
                            
                            for(let j = 0; j < requestData.destinations.length; j++){ // for each requested destination...
                                if(searchRequests[i].categories === requestData.destinations[j].kind){ //...if the destination's type matches that of the outer loop...
                                    let randomResult = randomDestination(requestData, results); //...pick random destination
                                    deleteResult(randomResult.name, results); // delete the chosen destination from further consideration (avoid redundancy)
                                    console.log(results.length);
                                    randomDestinations[j] = randomResult; 
                                    destNames.push(randomResult.name);
                                    count++;
                                    if(count === requestData.destinations.length){ // if the random array has been fully populated, return results
                                        return randomDestinations;
                                    }
                                }
                            }
                        
                        }).then(results => {
                            console.log(results);
                            return JSON.stringify(results);
                        }).catch(e => {
                            console.log(e);
                        });
                    }
                }).catch(e => {
                    console.log(e);
                });
            }).then(results => {
                res.json(results); // send the results to the client  
            })
            .catch((error) => {
                console.error(error);
            });
    });
    
    function randomDestination(request, results){
        let count = 0;
            if(results.length == 0){ // if no results in that category were retrieved, send back placeholder data
                return {
                    name: "Not found! Try again",
                    loc: "N/A",
                    image_url: "N/A",
                    url: "N/A",
                    phone: "N/A"
                };
            }
            else{
                let randomDestination = results[Math.floor((Math.random() * results.length))];  // extract a random destination from the category
                //console.log(randomDestination);
                return {
                    name: randomDestination.name || "Unnamed", 
                    loc: randomDestination["location"].display_address.join(", ") || "Varies",
                    image_url: randomDestination.image_url || "N/A",
                    url: randomDestination.url || "N/A",
                    phone: randomDestination.phone || "N/A"
                };
            }
    }
    
    function deleteResult(name, results){ // helper to delete a chosen result, to prevent redundancy
        for(let i = 0; i < results.length; i++){
            if(name === results[i].name){
                results.splice(i, 1);
                break;
            }
        }
    }
    
    function deleteRedundant(alreadySelected, results){ // deletes redundant destinations previously chosen from other categories
        for(let i = 0; i < alreadySelected.length; i++){
            if(alreadySelected[i]){
             deleteResult(alreadySelected[i], results);   
            }
        }
    }
    }