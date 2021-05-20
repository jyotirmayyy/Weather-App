//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set('view engine', 'ejs');//Place this line of code below express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true })); //For req.body.cityName


app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server started running on port 3000");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/kanye", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res)
{
    let cityName = req.body.cityName;
    let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=3c6398acf0105933ccb43e63d0fd8b18";
    https.get(weatherUrl, function(response)
    {
        console.log(response.statusCode);
        if(response.statusCode === 200)
        {
            response.on("data", function(data)
            {
                let weatherData = JSON.parse(data);
                let temp = weatherData.main.temp;
                let desc = weatherData.weather[0].description;
                let icon = weatherData.weather[0].icon;
                let iconImg = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

                res.render("final", {cityNameFinal: cityName, cityTemperature: temp, cityDescription: desc, weatherIconImg: iconImg});
            });
        }
        else
        {
            res.render("fail");
        }
    });
});

app.post("/kanye", function(req, res)
{
    let kanyeUrl = "https://api.kanye.rest/";
    https.get(kanyeUrl, function(response)
    {
        console.log(response.statusCode);
        response.on("data", function(data)
        {
            let quoteDate = JSON.parse(data);
            let  quote = quoteDate.quote;

            res.render("quoteFinal", {kanyeQuote: quote});
        });
    });
});

    app.post("/home", function(req, res){
    res.redirect("/");
});