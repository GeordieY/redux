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

var username;
var password;
var villainsthrowsarray = ["The Magician", "Rock"];

app.get('/', function(request, response){
  var user_data = {
    failure:0
  };
  console.log("Has reached");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:user_data});
});

app.get('/login', function(request, response){
  console.log("Has reached login");
  var user_data={
      name: request.query.user_name,
      password: request.query.user_password
  };
  username = user_data.name;
  password = user_data.password;
  //login = request.query.user_login;

//console.log("Name" + user_data.name);
//console.log("pswrd" + user_data.password);
//adding a user at login: now just automatically
//var data = [user_data.name, user_data.password];
//var datastorage = [];
var c=false;

var users_file = fs.readFileSync('data/users.csv', 'utf8');
var rows = users_file.split('\n');
var user_info = [];
var userstring = "";
for(var i=0; i<rows.length; i++){
  console.log("done");
  user_info.push(rows[i].trim().split(","));
}

for(var i=0; i<user_info.length; i++){

  if(String(user_info[i][0]) == String(user_data.name)){
    if(String(user_info[i][8]) == String(user_data.password)){
      console.log(users_file);
      console.log("Login to previous account successful");
      c=true;
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('game', {user:user_data});
    }
    //if username is not the same
    else{
      console.log("Reached");
      //if password doesn't match user don't use it
      var userf_data = {
        failure: 4
      }
      c=true;
      console.log("failure");
      console.log("failure");
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('index', {user:userf_data});

      //load response
    }
  }

  else if(String(user_info[i][0]!= String(user_data.name))){
    console.log("Reached");
    if(i!=user_info.length-1){
      var c = user_info[i].toString();
      var k = "\n";
      userstring += (c+k);
      continue;
    }

    else{
      if(c=="false"){
      var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0, user_data.password];
      var file = nameadd.join(",");
      file += "\n";
      userstring += file;
      fs.writeFileSync('data/users.csv', userstring, 'utf8');
      console.log("New account created");
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('game', {user:user_data});
      }
    }
  }
}

});

app.get('/:user/results', function(request, response){
var user_data = {
  name: request.params.user,
  weapon: request.query.weapons
}
var k = randomThrow();
var villain_data = {
  name: request.query.villains,
  weapon: k
}
var vilwep = villain_data.weapon;
var userwep = user_data.weapon;
var villname = villain_data.name;
console.log("Vilwep" + vilwep);
console.log("Userwep" + userwep);
console.log("Villanme" + villname);
villain_data.weapon = villainthrow(villname,userwep,vilwep);
var compare = vilwep.localeCompare(userwep);
var index;
var index2;
var user_info = [];
var villain_info = [];
var winner;
var users_file = fs.readFileSync('data/users.csv', 'utf8');
var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
var rows = users_file.split('\n');
var rows2= villains_file.split('\n');
//var c = true;

for(var i=0; i<rows.length; i++){
  user_info.push(rows[i].trim().split(","));
}
for(var i=0; i<rows2.length;i++){
  villain_info.push(rows2[i].trim().split(","));
}
for(var i=0; i<user_info.length; i++){
  if(String(user_info[i][0]) == String(user_data.name)){
    index = i;
    break;
  }
}
for(var i=0;i<villain_info.length;i++){
  if(String(villain_info[i][0]) == String(villain_data.name)){
    index2 = i;
    break;
  }
}


    user_info[index][1] = changeIndexValue(user_info[index][1]);
    villain_info[index2][1] = changeIndexValue(villain_info[index2][1]);
    //console.log("game user played" + user_info[index][1]);
    if(compare==-1 && String(villain_data.weapon)==="Paper"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner= villain_info[index2][0];
    //  console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Paper"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner = "Tie";
    //  console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Paper"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner=user_info[index][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Rock"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner = "Tie";
      //console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Rock"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner= user_info[index][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==-1 && villain_data.weapon=="Rock"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner= villain_info[index2][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Scissors"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner= user_info[index][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Scissors"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner = villain_info[index2][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Scissors"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner = "Tie";
      //console.log("Winner determined" + winner);
    }

  var winner_data = {
    winner: winner
  }
var userstring = "";
var villainstring = "";

for(var i=0;i<user_info.length-1;i++){
  var c = (user_info[i].toString());
  var k = "\n";
  userstring += (c+k);
}

for(var i=0; i<villain_info.length-1;i++){
  var c = (villain_info[i].toString());
  var k = "\n";
  villainstring += (c+k);
}
var users_file = fs.writeFileSync('data/users.csv', userstring, 'utf8');
var villains_file = fs.writeFileSync('data/villains.csv', villainstring, 'utf8');

    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('results',{user:user_data, villain:villain_data, winner:winner_data});
});

app.get('/playagain',function(request,response){
  var user_data = {
    name: username,
    password: password
  }
  response.status(200);
  response.setHeader('Content-Type','text/html');
  response.render('game', {user:user_data});
});

app.get('/rules', function(request, response){
  //load the csv
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('rules');
});

/*
  Must do these:
    1) Get Stats to Populate and WORK
    2) Insert photos into Results.ejs
    3) insert photos into game.EJS
    4) Get a Login-Logout Function working
    5) Check CSS issue on result.s

*/

app.get('/stats', function(request, response){
  var users_file = fs.readFileSync('data/users.csv','utf8');
  var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
  var rows = users_file.split('\n');
  var rows2 = villains_file.split('\n');

  var user_data = [];
  var villain_data = [];
  for(var i=0;i<rows.length;i++){
    var userdata = rows[i].trim().split(",");
    //console.log("Important" + userdata);
    var user = {};
    user["name"] = userdata[0];
    user["total_games"] = parseInt(userdata[1]);
    user["wins"] = parseInt(userdata[2]);
    user["losses"] = parseInt(userdata[3]);
    user["ties"] = parseInt(userdata[4]);
    user["paper"] = parseInt(userdata[5]);
    user["scissors"] = parseInt(userdata[6]);
    user["rock"] = parseInt(userdata[7]);
    user["pswrd"] = userdata[8];
    //console.log(user);
    user_data.push(user);
    //console.log("Data" + user_data)
  }

  for(var i=1;i<rows2.length-1;i++){
    var villaindata = rows2[i].trim().split(",");
    var villain= {};
    //console.log("important" + villaindata);
    villain["name"] = villaindata[0];
    //console.log("Check" + villain["Name"] + typeof(villain["Name"]));
    villain["total_games"] = parseInt(villaindata[1]);
    //console.log(villain["total_games"] + typeof(villain["total_games"]));
    villain["wins"] = parseInt(villaindata[2]);
    villain["losses"] = parseInt(villaindata[3]);
    villain["ties"] = parseInt(villaindata[4]);
    villain["paper"] = parseInt(villaindata[5]);
    villain["scissors"] = parseInt(villaindata[6]);
    villain["rock"] = parseInt(villaindata[7]);
    villain_data.push(villain);
  //  console.log(villain);
  //  console.log("Data2" + villain_data);
  }

  var data = {};
  data["player"] = user_data;
  data["villain"] = villain_data;
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('stats', {user: data});
});

app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('about');
});



function changeIndexValue(element){
  element = (parseInt(element) + 1);
  //console.log("Called");
  return element;
}



function villainthrow(villain,userchoice,villainschoice){
  var random = (10 * Math.random());
  var choice;
  //var q = [userchoice,villainschoice];
  var index;
  console.log("villainsthrowsarray" + villainsthrowsarray);
  //var throw = randomThrow();
//Throws Whatever Random Choice Distribution
    if(villain == "Bones"){
      choice = villainschoice;
    }
//Always Throws Paper
    else if(villain == "Manny"){
      choice = "Paper";
    }
//Random Percentage Distribution
    else if(villain == "Gato"){
      if(random>7){
        choice = villainschoice;

      }
      else if(random<7 && random>5){
        if(userchoice == "Rock"){
          choice = "Scissors";

        }
        if(userchoice == "Paper"){
          choice = "Rock";

        }
        else{
          choice = "Paper";

        }
      }
      else if(random<5 && random>3){
        choice = userchoice;

      }
      else{
        if(userchoice == "Rock"){
          choice = "Paper";

        }
        if(userchoice == "Paper"){
          choice = "Rock";

        }
        else{
          choice = "Scissors";

        }
      }
    }
//Random Percentage Distribution
    else if(villain == "Mr.Modern"){
      if(random<3){
        choice = villainschoice;

      }
      else if(random<7 && random>5){
        choice = "Rock"
      }
      else if(random>5 && random<7){
        if(userchoice == "Rock"){
          choice = "Paper";

        }
        if(userchoice == "Paper"){
          choice = "Rock";

        }
        else{
          choice = "Scissors";

        }
      }
      else{
        choice = userchoice;
      }
    }
//Always throw Rock
    else if(villain == "Regal"){
      choice = "Rock";
    }


  //The Boss: Always Wins
    else if(villain == "The Boss"){
      if(userchoice == "Rock"){
        choice = "Paper";

      }
      if(userchoice == "Paper"){
        choice = "Scissors";

      }
      else{
        choice = "Rock";
      }
    }
  //Comic Hans: Always Loses
    else if(villain == "Comic Hans"){
      if(userchoice == "Rock"){
        choice = "Scissors";

      }
      if(userchoice == "Paper"){
        choice = "Rock";

      }
      else{
        choice = "Paper";

      }
    }
//throws depending on what last villain chose
    else if(villain == "Harry"){
      if(villainsthrowsarray[villainsthrowsarray.length-1][1]=="undefined"){
        choice = "Rock";
      }
      else if(villainsthrowsarray[villainsthrowsarray.length-1][1]!=="Paper"){
        choice = "Scissors";
      }
      else if(villainsthrowsarray[villainsthrowsarray.length-1][1]!=="Scissors"){
        choice = "Paper";
      }
      else{
        choice = "Rock";
      }
    }

//Always throw Scissors
    else if(villain == "Mickey"){
      choice = "Scissors";
    }

    else if(villain == "Pixie"){
      choice = villainschoice;
    }
    else if(villain == "Spock"){
      choice = villainschoice;
    }
//Never Throws the Same Thing Twice
    else if(villain == "The Magician"){
      for(var i=villainsthrowsarray.length-1; i>=0; i--){
        if(villainsthrowsarray[i][0] == villain){
          index == i;
          break;
        }
        else{
          continue;
        }
      }

      if(villainsthrowsarray[villainsthrowsarray.length-1][1]=="undefined"){
        choice = "Rock";
      }
      else if(villainsthrowsarray[villainsthrowsarray.length-1][1]!=="Paper"){
        choice = "Rock";
      }
      else if(villainsthrowsarray[villainsthrowsarray.length-1][1]!=="Scissors"){
        choice = "Paper";
      }
      else{
        choice = "Scissors";
      }

    }
  if(choice!=""){
    villainsthrowsarray.push([villain,choice]);
  }
    return choice;
}

function randomThrow(){
  var throwoptions = ["Rock", "Paper", "Scissors"];
  return throwoptions[(3*Math.random())|0];
}
