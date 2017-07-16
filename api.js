const express = require("express");
const yelp = require('yelp-fusion');
const jsonQuery = require("json-query");
require('dotenv').config(); // access process.env variables

const clientId = process.env.YELP_CLIENT_ID;
const clientSecret = process.env.YELP_CLIENT_SECRET;

const app = express();

module.exports = function Routes(app){

    app.post("/search", function(req, res){
        const data = req.body;
        let searchRequests = [];
        let randomResults = [];
        let searchRadius = data.radius * 1609.344; // convert radius from miles to meters
        if(searchRadius > 40000){ // yelp only accepts up to 40000 meters
            searchRadius = 40000;
        }
        
        for(let i = 0; i < data.queryTypes.length; i++){ // create a search request for each necessary category
            searchRequests[i] = {
            location: data.city,
            radius: searchRadius, 
            categories: data.queryTypes[i]
        }
        }
    
        yelp.accessToken(clientId, clientSecret).then(response => {
            const client = yelp.client(response.jsonBody.access_token);
            
            for(let i = 0; i < searchRequests.length; i++){
                client.search(searchRequests[i]).then(response => {
                    console.log(searchRequests[i].categories);
                    const results = response.jsonBody.businesses;
                    // fix randomResults so it takes the number of destinations needed for a given category
                    randomResults[i] = processResults(data, results);
                    //res.json(processResults(data, results));
                }).catch(e => {
                    console.log(e);
                });
            }
        }).catch(e => {
            console.log(e);
        });
    });
    
    function processResults(request, results){
        let dataPromise = new Promise(function(resolve, reject){
        let finalResults = {
            destinations: [] 
        };
        let count = 0;
        for(let i = 0; i < request.destinations.length; i++){
            if(results.length == 0){ // if no results in that category were retrieved
                finalResults.destinations[i] = {
                    name: "Not found! Try again",
                    loc: "N/A",
                    image_url: "N/A",
                    url: "N/A",
                    phone: "N/A"
                };
            }
            else{
                let randomDestination = results[Math.floor((Math.random() * results.length))];  
                //console.log(randomDestination);
                finalResults.destinations[i] = {
                    name: randomDestination.name, 
                    loc: randomDestination["location"].display_address.join(", ") || "Varies",
                    image_url: randomDestination.image_url || "N/A",
                    url: randomDestination.url || "N/A",
                    phone: randomDestination.phone || "N/A"
                };
            }
            count++;
            if(count === request.destinations.length){
                resolve(finalResults);
            }
        }
        }).then(function(results){
            console.log(JSON.stringify(results));
            return results;
        }, function(err){
            console.log(err);
            return {error: "Unspecified error!"};
        });
    }
    }