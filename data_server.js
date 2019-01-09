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
  /* console log isn't being reached? */
  //console.log("This is userdata" + user_data);


  response.status(200);
  response.setHeader('Content-Type', 'text/html');


  var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0];
  var file = nameadd.join();
  //console.log("Fileprint" + file);
  fs.writeFileSync('data/users.csv', file, 'utf8');


  response.render('game', {user:user_data});
});

/*
app.get('/game',function(request,response)){
  var user_data={
      name: request.query.user_name,
      password: request.query.user_password
  };

  console.log("This is userdata" + user_data);
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('/:user/results', {user:user_data})
}
*/

app.get('/:user/results', function(request, response){

//error at the splitting of the CSV.

  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };
  var villain_data={
    name: request.query.villain,
    
  };




//  console.log("userdata2" + user_data);
  //console.log("vildata" + villain_data);
  //write to the CSV what we need to add
  var index;
  var index2;
  var user_info;
  var villain_info;
  var winner;
  var users_file = fs.readFileSync('data/users.csv', 'utf8');
  var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
  console.log("file1" + users_file);
  console.log("file2"+ villains_file);
  var rows = users_file.split("\n");
  //console.log("rows" + rows);
  var rows2 = (villains_file).split("\n");


    for(var i = 0; i<(rows.length)-1; i++){
      user_info = rows[i].split(",");
    }
    //split array by commas


    for(var i=0; i<user_info.length; i++){
      if(user_info[i] == user_data.name){
        index = i;
        break;
    }
  }
    for(var i=0; i<rows2.length-1;i++){
      villain_info = rows2[i].split(",");
    }
    for(var i=0;i<villain_info.length;i++){
      if(villain_info[i] == villain_data.name){
        index2 = i;
        break;
      }
    }
    //takes user info of the specific row, increments Games Played, then it increments either the Games Won, Lost, Tied

//+1 = games played, +2=win, +3=loss, +4=tie, +5=paper, +6=scissors, +7=rock this is what each index does

    user_info[index+1] = (user_info[index+1] + 1);
    villain_info[index2+1] = (villain_info[index2+1] + 1);
    if(user_data.weapon=="rock" && villain_data.weapon=="paper"){
      user_info[index+3] = (user_info[index+3] + 1);
      user_info[index+7] = (user_info[index+7] + 1);
      villain_info[index2+2] = (villain_info[index2+2] + 1);
      villain_info[index2+5] = (villain_info[index2+5] + 1);
      winner = villain_info[index2];
    }
    if(user_data.weapon=="paper" && villain_data.weapon=="paper"){
      user_info[index+4] = (user_info[index+4] + 1);
      user_info[index+5] = (user_info[index+5] + 1);
      villain_info[index2+4] = (villain_info[index2+4] + 1);
      villain_info[index2+5] = (villain_info[index2+5] + 1);
      winner = "Tie";
    }
    if(user_data.weapon=="scissors" && villain_data.weapon=="paper"){
      user_info[index+2] = (user_info[index+2] + 1);
      user_info[index+6] = (user_info[index+6] + 1);
      villain_info[index2+3] = (villain_info[index2+3] + 1);
      villain_info[index2+5] = (villain_info[index2+5] + 1);
      winner = user_info[index];
    }
    if(user_data.weapon=="rock" && villain_data.weapon=="rock"){
      user_info[index+4] = (user_info[index+4] + 1);
      user_info[index+7] = (user_info[index+7] + 1);
      villain_info[index2+4] = (villain_info[index2+4] + 1);
      villain_info[index2+7] = (villain_info[index2+7] + 1);
      winner = "Tie";
    }
    if(user_data.weapon=="paper" && villain_data.weapon=="rock"){
      user_info[index+2] = (user_info[index+2] + 1);
      user_info[index+5] = (user_info[index+5] + 1);
      villain_info[index2+3] = (villain_info[index2+3] + 1);
      villain_info[index2+7] = (villain_info[index2+7] + 1);
      winner = user_info[index];
    }
    if(user_data.weapon=="scissors" && villain_data.weapon=="rock"){
      user_info[index+3] = (user_info[index+3] + 1);
      user_info[index+6] = (user_info[index+6] + 1);
      villain_info[index2+2] = (villain_info[index2+2] + 1);
      villain_info[index2+7] = (villain_info[index2+7] + 1);
      winner = villain_info[index2];
    }

    if(user_data.weapon=="rock" && villain_data.weapon=="scissors"){
      user_info[index+2] = (user_info[index+2] + 1);
      user_info[index+7] = (user_info[index+7] + 1);
      villain_info[index2+3] = (villain_info[index2+3] + 1);
      villain_info[index2+6] = (villain_info[index2+6] + 1);
      winner = user_info[index];
    }
    if(user_data.weapon=="paper" && villain_data.weapon=="scissors"){
      user_info[index+3] = (user_info[index+3] + 1);
      user_info[index+5] = (user_info[index+5] + 1);
      villain_info[index2+2] = (villain_info[index2+2] + 1);
      villain_info[index2+6] = (villain_info[index2+6] + 1);
      winner = villain_info[index2];
    }
    if(user_data.weapon=="scissors" && villain_data.weapon=="scissors"){
      user_info[index+4] = (user_info[index+4] + 1);
      user_info[index+6] = (user_info[index+6] + 1);
      villain_info[index2+4] = (villain_info[index2+4] + 1);
      villain_info[index2+6] = (villain_info[index2+6] + 1);
      winner = "Tie";
    }
    var initjoin = user_info.join(",");
    var viljoin = villain_info.join(",");
    var rowjoin = Array.from(initjoin).join("\n");
    var vilrow = Array.from(viljoin).join("\n");
    var users_file = fs.writeFileSync('data/users.csv', rowjoin, 'utf8');
    var villains_file = fs.writeFileSync('data/villains.csv',vilrow, 'utf8');
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.send(JSON.stringify(user_data));
    response.send(JSON.stringify(villain_data));
    response.render('results',{winner:winner, users:user_data, villains:villain_data});

});

app.get('/rules', function(request, response){
  //load the csv
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/:user/stats', function(request, response){
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
    user["Games_Tied"] = user_info[4];
    user["Paper Played"] = user_info[5];
    user["Scissors Played"] = user_info[6];
    user["Rock Played"] = user_info[7];
    user_data.push(user);
  }

  console.log(user_data);

  var villains_file = fs.readFileSync('data/villains.csv','utf8');
  console.log(villains_file);
  //parse the csv
  var rows2 = villains_file.split("\n");
  console.log(rows2);
  var villains_data=[];
  for(var i = 0; i<rows2.length-1; i++){
    var villain_info = rows2[i].split(",");
    console.log(villain_info);
    var villain = [];
    villain["Name"] = villain_info[0];
    villain["Games_Played"] = villain_info[1];
    villain["Games_Won"] = villain_info[2];
    villain["Games_Lost"] = villain_info[3];
    villain["Games_Tied"] = villain_info[4];
    villain["Paper Played"] = villain_info[5];
    villain["Scissors Played"] = villain_info[6];
    villain["Rock Played"] = villain_info[7];
    villains_data.push(villain);
  }
  console.log(villains_data);


  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('stats', {user: user_data, villain:villain_data});
});

app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('about');
});
