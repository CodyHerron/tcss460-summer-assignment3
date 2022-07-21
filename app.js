var express = require("express");
var app = express();



// define a route using a callback function that will be invoked 
// when the user makes a HTTP request to the root of the folder (URL) 
// display some information about the REST Service 
app.get('/', function (req, res) { 
    res.status(200); 
    console.log("a request has been processed in / (root) "); 
});

//calculate body mass index for determining health
//weight in kg
//height in meters
//http://someaddress/bmi/{weight}/{height}
app.get("/bmi/:weight/:height", function(req, res) {
    const weight = parseInt(req.params.weight);
    const height = parseInt(req.params.height);
    if(isNaN(weight) || isNaN(height)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const bmi = weight/(Math.pow(height,2));
    console.log("/bmi/weight/height   request is made...");
    res.json({bmi: bmi});
});

//calculate body fat for determining health
//http://someaddress/bodyfat/{age}/{bmi}
app.get("/bodyfat/:age/:bmi", function(req, res) {
    const bmi = parseInt(req.params.bmi);
    const age = parseInt(req.params.age);
    if(isNaN(age) || isNaN(bmi)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const bodyfat = (1.20 * bmi) + (0.23 * age) - 16.2;
    console.log("/bodyfat/age/bmi   request is made...");
    res.json({bodyfat: bodyfat});
});

//calculate BMR (Basal Metabolic Rate) for determining health
//weight in kg
//height in m
//http://someaddress/bmr/{age}/{weight}/{height}
app.get("/bmr/:age/:weight/:height", function(req, res) {
    const age = parseInt(req.params.age);
    const weight = parseInt(req.params.weight);
    const height = parseInt(req.params.height)/100;
    if(isNaN(age) || isNaN(weight) || isNaN(height)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const bmr = 13.397(weight) + 4.799(height) - 5.677(age) + 88.362;
    console.log("/bmr/age/weight/height   request is made...");
    res.json({bmr: bmr});
});

//calculate daily calorie intake for determining health
//weight in kg
//height in m
//http://someaddress/calories/{age}/{weight}/{height}
app.get("/calories/:age/:weight/:height", function(req, res) {
    const age = parseInt(req.params.age);
    const weight = parseInt(req.params.weight);
    const height = parseInt(req.params.height)/100;
    if(isNaN(age) || isNaN(weight) || isNaN(height)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const dailycal = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    console.log("/calories/age/weight/height   request is made...");
    res.json({dailyCal: dailycal});
});

// enable a port to listen to incoming HTTP requests 
app.listen(3000, function () { 
    console.log("API version 1.0.0 is running on port 3000"); 
}); 