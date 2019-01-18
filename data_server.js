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
  var user_data = {};
  var error = {
    error: 'blank'
  }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:user_data});
});

app.get('/login', function(request, response){
  var user_data={
      name: request.query.user_name,
      password: request.query.user_password
  };
  username = user_data.name;
  password = user_data.password;

//console.log("Name" + user_data.name);
//console.log("Password" + user_data.password);
//adding a user at login: now just automatically
//var data = [user_data.name, user_data.password];
//var datastorage = [];
var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0, user_data.password];
var file = nameadd.join(",");
file += "\n";
fs.writeFileSync('data/users.csv', file, 'utf8');
response.status(200);
response.setHeader('Content-Type', 'text/html');
response.render('game', {user:user_data});
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
    changeIndexValue(user_info[index][1]);
    changeIndexValue(villain_info[index2][1]);
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
// <<<<<<< HEAD

/*
for(var i=0; i<user_info.length-1;i++){
  //console.log("Info" + user_info[i] + "Type" + typeof(user_info[i]));
  for(var k=0; k<user_info[i].length; k++){
    //console.log("Info2" + user_info[i][k] + "Other" + typeof(user_info[i][k]));
    if(k!==user_info[i].length-1){
      var c = ",";
      var info = user_info[i][k];
      var l = info + c;
      userstring += l;
    }
    else{
     var info = user_info[i][k];
     var q = "\n";
     var l = info + q;
     userstring += l;
    }
  }
}

for(var i=0; i<villain_info.length-1;i++){
  //console.log("Info" + villain_info[i] + "Type" + typeof(villain_info[i]));
  for(var k=0; k<villain_info[i].length; k++){
    if(k!==villain_info[i].length-1){
      var c = ",";
      var info = villain_info[i][k];
      var l = info + c;
      villainstring += l;
    }
    else{
     var info = user_info[i][k];
     var q = "\n";
     var l = info + q;
     villainstring += l;
    }
  //  console.log("Info2" + villain_info[i][k] + "Other" + typeof(villain_info[i][k]));
  }
}
*/
console.log("userstring" + userstring);
console.log("villainstring" + villainstring);

/*
for(var i=0; i<user_info.length-1;i++){
  //console.log(user_info.length);
  for(var k=0;k<user_info[i].length;k++){
    if(k!=user_info[i].length-1){
      console.log(k);
      userstring += (user_info[i][k] + ",");
    }
    else{
      if(i!=user_info.length-1){
      userstring += (user_info[i][k] + "\n");
      }
    }
  }
}

for(var i=0; i<villain_info.length-1;i++){
  for(var k=0;k<villain_info[i].length;k++){
    if(k!=villain_info[i].length-1){
      villainstring += villain_info[i][k] + ",";
    }
    else{
      if(i!=user_info.length-1){
        userstring += (user_info[i][k] + "\n");
      }
    }
  }
}
var users_file = fs.writeFileSync('data/users.csv', userstring, 'utf8');
var villains_file = fs.writeFileSync('data/villains.csv', villainstring, 'utf8');
*/
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
  //console.log("File" + users_file);
  //parse the csv
  var rows = users_file.trim().split("\n");
  //console.log(rows);
  var user_data=[];
  var data = [];
  for(var i = 0; i<rows.length; i++){
    var user_info = rows[i].trim().split(",");
  //  console.log("Info" + user_info);
    /*
      for(var k=0;k<user_info.length;k++){
      //  console.log(user_info[k]);
      }
      */
    //console.log("User Info I " + user_info[i]);
  //  console.log("User Info I" + user_info[i][user_info[i].length]);
    var user = [];
    user["Name"] = user_info[0];
  //  console.log(user["Name"]);
  //  console.log("Name" + user["Name"]);
    //console.log(user["Name"]);
    user["Games_Played"] = parseInt(user_info[1]);
  //  console.log("Games_Played" + user["Games_Played"]);
    user["Games_Won"] = parseInt(user_info[2]);
//    console.log("Games_Won" + user["Games_Won"]);
    user["Games_Lost"] = parseInt(user_info[3]);
  //  console.log("Games_Lost" + user["Games_Lost"]);
    user["Games_Tied"] = parseInt(user_info[4]);
//    console.log("Games_Tied"+ user["Games_Tied"]);
    user["Paper_Played"] = parseInt(user_info[5]);
    //console.log("Paper_Played"+ user["Paper_Played"]);
    user["Scissors_Played"] = parseInt(user_info[6]);
  //  console.log("Scissors_Played"+ user["Scissors_Played"]);
    user["Rock_Played"] = parseInt(user_info[7]);
    //console.log("Rock_Played" + (user["Rock_Played"]);
    user["Password"] = (user_info[8])
  //console.log("Password" + user["Password"]);
    user_data.push(user);
  }


  //console.log(user_data);
  var villains_file = fs.readFileSync('data/villains.csv','utf8');
  //console.log("Vil file" + villains_file);
  var rows2 = villains_file.trim().split("\n");
  //console.log("Vil rows" + rows2);
  var villains_data=[];
  for(var i = 0; i<rows2.length; i++){
    var villain_info = rows2[i].trim().split(",");
    //console.log("vil info" + villain_info);
      for(var k=0; k<villain_info.length;k++){
        console.log("vilinfok" + villain_info[k]);
      }
    //console.log("Check" + villain_info[i][0]);
    var villain = [];
    //console.log("1st step" + villain);
    villain["Name"] = villain_info[0];
    console.log("Name" + villain["Name"]);
    villain["Games_Played"] = parseInt(villain_info[1]);
    console.log("Games_Played" + villain["Games_Played"]);
    villain["Games_Won"] = parseInt(villain_info[2]);
      console.log("Games_Won" + villain["Games_Won"]);
    villain["Games_Lost"] = parseInt(villain_info[3]);
    console.log("Games_Lost" + villain["Games_Lost"]);
    villain["Games_Tied"] = parseInt(villain_info[4]);
    console.log("Games_Tied"+ villain["Games_Tied"]);
    villain["Paper_Played"] = parseInt(villain_info[5]);
    console.log("Paper_Played"+ villain["Paper_Played"]);
    villain["Scissors_Played"] = parseInt(villain_info[6]);
    console.log("Scissors_Played"+ villain["Scissors_Played"]);
    villain["Rock_Played"] = parseInt(villain_info[7]);
    console.log("Rock_Played"+ villain["Rock_Played"]);
  //  console.log("1st step" + villain);
    villains_data.push(villain);
    console.log("Arraycheck" + villains_data[i]);
  }
/*
var temp;
var temp2;

  for(var i=1;i<villains_data.length;i++){
    if(villains_data[i]["Games_Won"] > villains_data[i-1]["Games_Won"]){
        temp = villains_data[i];
        villains_data[i] = villains_data[i-1];
        villains_data[i-1] = temp;
      }
  }

  for(var i=1;i<user_data.length;i++){
    if(user_data[i]["Games_Won"] > user_data[i-1]["Games_Won"]){
      temp2 = user_data[i];
      user_data[i] = user_data[i-1];
      user_data[i-1] = temp2;
    }
}
*/
console.log("user data final" + user_data);
console.log("villain data final" + villains_data);
  data["player"] = user_data;
  data["villain"] = villains_data;
  //console.log(villains_data);
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
    else if(villain == "Regal"){
      choice = villainschoice
    }

  //The Boss: Always Wins
    else if(villain == "The Boss"){
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
  //Comic Hans: Always Loses
    else if(villain == "Comic Hans"){
      if(userchoice == "Rock"){
        choice = "Scissors";

      }
      if(userchoice == "Paper"){
        choice = "Paper";

      }
      else{
        choice = "Rock";

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

    else if(villain == "Mickey"){
      choice = villainschoice;
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
