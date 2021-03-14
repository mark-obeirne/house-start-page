const express = require("express");
const fetch = require("node-fetch")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Starting at ${port}`));
app.use(express.static("public"));

// Set up server to accept incoming requests as JSON
app.use(express.json({limit: "1mb"}));

// Setting up POST request
app.post("/api", (request, response) => {
    console.log(request.body);
    // response.end() - Necessary to do something to complete it
    response.json({
        status: "Success",
        latitude: request.body.lat,
        longitude: request.body.long
    })
})

// Set up endpoint to get lat, long data and fetch weather data from API
app.get("/weather/:latlong", async (request, response) => {
    try {
        const [lat, long] = [...request.params.latlong.split(",")];
        const api_key = process.env.API_KEY;

        const fetchResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`);
        const json = await fetchResponse.json();
        return response.json(json);
    } catch (err) {
        console.log("Error encountered");
        console.log(err)
    }
})