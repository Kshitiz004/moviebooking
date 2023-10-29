var express = require("express"),
  http = require("http"),
  fs = require("fs"),
  path = require("path"),
  cors = require("cors");  
  require("dotenv").config();


  bodyParser = require("body-parser");



// Running on posrt 9000
const PORT = process.env.PORT ||8085;


var app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); 

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  

// app.get("/movie", findAllMovies);
// app.get('',findOne);

// app.get('/genres',function(req,res){
//     res.send("All Genres Data in JSON format from Mongo DB")
// })

// app.get('/artists',function(req,res){
//     res.send("All Artists Data in JSON format from Mongo DB")
// })
// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to Upgrad Movie booking application development.",
//   });
// });

require("./routes/movie.routes")(app);
require("./routes/artist.routes")(app);
require("./routes/genre.routes")(app);
require("./routes/user.routes")(app)

app.listen(PORT, function () {
  console.log("express has started on port ", PORT);
});