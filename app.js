var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require("request");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var requestURL = "http://localhost:3078";
var fs = require('fs');


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


/*app.get("/getAllPlayersList", (req, res, next) => {
   debugger;
   console.log("Inside getAllPlayers");
  
    
    try {
        console.log("entering try block");
         fs.readFile('./players.json', (err, data) => {
           if (err) throw err;
             try{
                players = JSON.parse(data);
              }
              catch(er){
                console.log("catched the log ");
                return res.sendStatus(500).json(err);
              }
          });
      }
      catch (err) {
      console.log("entering catch block");
      //console.log(err);
      res.send("Server Error")
      console.log("leaving catch block");
}

    console.log(players);
    res.send(players);
     
});*/

app.get("/getAllPlayersList", (req, res, next) => {
     debugger;
     let players = "";
     console.log("Inside getAllPlayers");
        var exists = fs.existsSync("./players.json");
        if(exists == true){
           fs.readFile('./players.json', (err, data) => {
             if (err) throw err;
               try{
                  players = JSON.parse(data);
                  console.log(players);
                  //res.send(players);
                  res.status(200).json({result: players });
                }
                catch(er){
                  console.log("catched the log " + er);
                  res.status(400).json({error: 'Internal error'});
                }
            });
       }
       else{
            res.json({status: exists}); 
       }
    
  });

app.post("/saveTeamDetails", (req, res, next) => {
   debugger;
   console.log("Inside saveTeamDetails");
   var query1=req.body.Players_List;
   var query2=req.body.User_Id;
   console.log(query1);
   console.log(query2);
   var data = JSON.stringify(query1);
   //var stream = fs.createWriteStream(query2+".json");
	/*  stream.once('open', function(fd) {
	  stream.write(data);
	  stream.end();
	});*/
  fs.writeFile(query2+'.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
	 res.send(true);
      
});


app.get("/checkUserTeamExist/:User_Id", (req, res, next) => {
  let playersData = "";
     User_Id = req.params.User_Id;
     console.log(User_Id);
     var exists = fs.existsSync(User_Id+".json");
     console.log(exists);
     if(exists == true){
        fs.readFile(User_Id+'.json','utf8', (err, data) => {
             if (err) throw err;
               try{
                   playersData = data;
                    console.log("Complete Players List "+playersData);
                    // resp.writeHead(404);
                     res.status(200).json({result: JSON.parse(playersData) });
                  //players = JSON.stringify(players);
                }
                catch(er){
                  console.log("catched the log " + er);
                  res.status(400).json({error: 'Internal error'});
                }
            });
        console.log("Players list "+ playersData);
         // res.json({status: exists});  
     }
     else{ res.json({status: exists});  }
     
      
  });  

  app.get("/deleteFile/:User_Id", (req, res, next) => {
    User_Id = req.params.User_Id;
    console.log(User_Id);
    fs.unlink(User_Id+'.json',function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
        res.status(200).json({message: "File deleted successfully" });
   }); 
  });   

app.get("/*", (req, res, next) => {
  	console.log("First get method"); 
    res.sendFile(path.join(__dirname, 'dist/CricketTeamSelection/index.html'));
 });

var port = process.env.PORT || 3077
app.listen(port,()=>{
	console.log("App is listening to -->"+ port);
});