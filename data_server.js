var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

var port = 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/login', function(request, response){
  var user_data={
      name: request.query.user_name,
      password: request.query.user_password
  };

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('game', {user:user_data});
});

app.get('/:user/results', function(request, response){
  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };

  var villain_data={
    name: request.query.villain,
    weapon: request.query.weapon

  }

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.send(JSON.stringify(user_data));
  response.send(JSON.stringify(villain_data));
  response.render('results',{user:user_data, villain:villain_data});

  //write to the CSV what we need to add
  var index;
  var user_info;
  var users_file = fs.readFileSync('data/users.csv');
  var rows = users_file.split("\n");
  var user_data = [];
    for(var i = 0; i<rows.length-1; i++){
      user_info = rows[i].split(",");
    }
    for(var i=0; i<user_info.length; i++){
      if(user_info[i] == request.params.user){
        index = i;
        break;
    }
    user_info[i+1] = (user_info[i+1] + 1);

    //determine winner within dataserver


  //i dont know if this is the most efficient but you find the user and then increment all their stats.
  //keep going
  //  user_info[i+1] =
  //  user_info[i+2] =
  //  user_info[i+3] =
    }


//fs.writeFile('data/users.csv','utf8', function(){

//  });

//  fs.writeFile('data/villains.csv','utf8',function(){

  //});

});

app.get('/rules', function(request, response){
  //load the csv



  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/stats', function(request, response){
  var users_file = fs.readFileSync('data/users.csv','utf8');
  console.log(users_file);
  //parse the csv
  var rows = users_file.split("\n");
  console.log(rows);
  var user_data=[];
  for(var i = 0; i<rows.length-1; i++){
    var user_info = rows[i].split(",");
    console.log(user_info);
    var user = [];
    user["Name"] = user_info[0];
    user["Games_Played"] = user_info[1];
    user["Games_Won"] = user_info[2];
    user["Games_Lost"] = user_info[3];
    user_data.push(user);
  }
  console.log(user_data);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats', (users:user_data));
});

app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});
