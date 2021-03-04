const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
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