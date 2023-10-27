const express = require("express")

const app = express();



app.get("/movies", (req, res) => {
    res.send("All Movies Data in JSON format from Mongo DB");
})
app.get("/genres", (req, res) => {
    res.send("All Genres Data in JSON format from Mongo DB");
})
app.get("/artists", (req, res) => {
    res.send("All Artists Data in JSON format from Mongo DB");
})

app.listen(9000, () => {
    console.log("Listening on port 9000");
})