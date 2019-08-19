var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require("request");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var requestURL = "http://localhost:3078";
var fs = require('fs');
let players = "";

app.use('/', express.static(path.join(__dirname, 'dist/CricketTeamSelection')));

/*app.get("/getAllPlayersList", (req, res, next) => {
   debugger;
   console.log("Inside getAllPlayersList");
   request.get(requestURL+"/getAllPlayers", (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      console.dir("getAllPlayersList Result");
      console.log(JSON.parse(body));
      console.dir("getAllPlayersList respObj");
      var respObj = JSON.parse(body); 
      res.send(respObj);
    });     
});*/


app.get("/getAllPlayersList", (req, res, next) => {
   debugger;
   console.log("Inside getAllPlayers");
   fs.readFile('./players.json', (err, data) => {
	console.log("path not found")
    if (err) throw err;
    players = JSON.parse(data);
    console.log(players);
    res.send(players);
  });   
});

app.post("/saveTeamDetails", (req, res, next) => {
   debugger;
   console.log("Inside saveTeamDetails");
   var query1=req.body.Players_List;
   var query2=req.body.User_Id;
   console.log(query1);
   console.log(query2);
   var data = JSON.stringify(query1);
   var stream = fs.createWriteStream(query2);
	  stream.once('open', function(fd) {
	  stream.write(data);
	  stream.end();
	});
	 res.send(true);
      
});

app.get("/*", (req, res, next) => {
  	console.log("First get method"); 
    res.sendFile(path.join(__dirname, 'dist/CricketTeamSelection/index.html'));
 });

var port = process.env.PORT || 3077
app.listen(port,()=>{
	console.log("App is listening to -->"+ port);
});