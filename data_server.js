var express = require('express');
var fs = require('fs');
var assert = require('assert');
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
//  console.log("Has reached");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:user_data});
});

app.get('/login', function(request, response){
//  console.log("Has reached login");
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
/*
for(var i=0; i<rows.length; i++){
  console.log("done");
  user_info.push(rows[i].trim().split(","));
}
*/

for(var i=0; i<rows.length;i++){
  user_info.push(rows[i].trim().split(",")); //this generates the double array
}

for(var i=0; i<user_info.length;i++){
  if(String(user_info[i][0]) == username && String(user_info[i][8]) == password){
        response.status(200);
        response.setHeader('Content-Type','text/html');
        response.render('game', {user:user_data});
      }
  else if(String(user_info[i][0]) == username && String(user_info[i][8])!= password){
    var userf_data = {
      failure: 4
    };
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('index', {user:userf_data});
    }
  else if(String(user_info[i][0])!=username){
      if(i<user_info.length-1){
        continue;
      }
      else{
        c = true;
        break;
      }
    }
  }
if(c==true){
  for(var i=0; i<user_info.length-1; i++){
    var c = (user_info[i].toString()) + "\n";
    //console.log("C" + c);
    userstring += c
    //console.log("userstring" + userstring);
  }

  var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0, user_data.password];
  var file = nameadd.join(",");
  file += "\n";
  userstring += file;
  //console.log("finalwrite" + userstring);
  fs.writeFileSync('data/users.csv', userstring, 'utf8');
  //console.log("New account created");
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('game', {user:user_data});
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
var vilwep = String(villain_data.weapon);
var userwep = String(user_data.weapon);
var villname = villain_data.name;
//console.log("Vilwep" + vilwep);
//console.log("Userwep" + userwep);
//console.log("Villanme" + villname);
villain_data.weapon = villainthrow(villname,userwep,vilwep);

console.log("Final weapon" + vilwep + typeof(vilwep));
console.log("Userwep" + userwep + typeof(vilwep));
//console.log("User weapon" + user_data.weapon);

var c = "Rock";
var k = "Paper";
var d = "Scissors";

console.log("Rock vs Paper" + c.localeCompare(k));
console.log("Rock vs Scissors" + c.localeCompare(d));
console.log("Rock vs Rock" + c.localeCompare(c));

console.log("Paper vs Paper" + k.localeCompare(k));
console.log("Paper vs Scissors" + k.localeCompare(d));
console.log("Paper vs Rock" + k.localeCompare(c));

console.log("Scissors vs Paper" + d.localeCompare(k));
console.log("Scissors vs Scissors" + d.localeCompare(d));
console.log("Scissors vs Rock" + d.localeCompare(c));






var compare = vilwep.localeCompare(userwep);
if(vilwep =="Rock" && userwep=="Paper"){
  compare = 1
}
else if(vilwep =="Rock" && userwep=="Scissors"){
  compare = -1;
}

else if(vilwep =="Paper" && (userwep=="Scissors" || userwep=="Rock")){
  compare = -1;
}
else if(vilwep == "Scissors" && (userwep =="Paper" || userwep == "Rock")){
  compare = 1;
}
else{
  compare = 0;
}



//Some villains with throw strategies had to be hardcoded in
  if(villname == "The Boss"){
    if(userwep == "Paper"){
    compare = 1;
    }
    else if(userwep == "Scissors"){
    compare = -1;
    }
    else {
    compare = -1;
    }
  }

  if(villname == "Comic Hans"){
    if(userwep == "Paper"){
    compare = 1;
    }
    else if(userwep == "Scissors"){
    compare = -1;
    }
    else if(userwep == "Rock"){
    compare = 1;
    }
  }

  if(villname == "Manny"){
    villain_data.weapon = "Paper";
    if(userwep == "Paper"){
    compare = 0;
    }
    else{
    compare = -1;
    }
  }

  if(villname == "Regal"){
    villain_data.weapon = "Rock";
    if(userwep == "Rock"){
    compare = 0;
    }
    else if(userwep == "Paper"){
      compare = 1;
    }
    else{
      compare = -1;
    }
  }

  if(villname == "Manny"){
    villain_data.weapon = "Paper";
    if(userwep == "Paper"){
    compare = 0;
    }
    else{
    compare = -1;
    }
  }

  if(villname == "Mickey"){
    villain_data.weapon == "Scissors";
    if(userwep =="Scissors"){
      compare = 0;
    }
    else{
      compare = 1;
    }
  }





/*
hard code


*/




console.log("comparedvalue" + compare);
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
    if(compare==-1 && String(villain_data.weapon)=="Paper"){
      console.log("Userwep" + userwep);
      if(userwep=="Rock"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner= villain_info[index2][0];
      }

      else if(userwep=="Scissors"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner=user_info[index][0];
      }
      console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Paper"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner = "Tie";
    //  console.log("Winner determined" + winner);
    }
    /*
    if(compare==-1 && villain_data.weapon=="Paper"){
      if(user_data.weapon=="Scissors"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner=user_info[index][0];
    }
    */
      //console.log("Winner determined" + winner);
  //  }
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
    if(compare==1 && String(villain_data.weapon)=="Scissors"){
      console.log("Tested with Comic Hans");
      if(userwep=="Rock"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner= user_info[index][0];
      console.log("Winner determined" + winner);
      }
      else {
        user_info[index][3] = changeIndexValue(user_info[index][3]);
        user_info[index][5] = changeIndexValue(user_info[index][5]);
        villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
        villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
        winner = villain_info[index2][0];
        console.log("Winner determined" + winner);
      }
    }
    /*
    if(compare==1 && villain_data.weapon=="Scissors"){
      if(user_data.weapon == "Paper"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner = villain_info[index2][0];
      console.log("Winner determined" + winner);
      }
    }
    */
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
//console.log("results" + userstring);

for(var i=0; i<villain_info.length-1;i++){
  var c = (villain_info[i].toString());
  var k = "\n";
  villainstring += (c+k);
}
//console.log("results" + villainstring);
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
  //console.log("userfilestat" + users_file);
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

/*
for(var i=villain_data.length-1; i>0; i--){
  var k = villain_data[i].total_games;
  console.log("Games");
  var c= villain_data[i-1].total_games;
  console.log("Games");
  if(c==0){
    var temp = villain_data[i-1];
    villain_data[i-1] = villain_data[i]
    villain_data[i] = temp;
  }

}
*/





for(var i=villain_data.length-1; i>0; i--){
  if(villain_data[i].wins > villain_data[i-1].wins){
  //  console.log("Greater");
    var temp = villain_data[i-1];
    villain_data[i-1] = villain_data[i]
    villain_data[i] = temp;
  }
  //console.log("vil 1 win" + villain_data[i].wins);
  //console.log("vil 2 win" + villain_data[i-1].wins);
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
//  console.log("villainchosen" + villain + "   userthrow" + userchoice + " vilthrow" + villainschoice);
  //var q = [userchoice,villainschoice];
  var index;
//  console.log("villainsthrowsarray" + villainsthrowsarray);
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
        //console.log("Attempt Rock" + choice);

      }
      else if(userchoice == "Paper"){
        choice = "Scissors";
      //  console.log("Attempt Paper" + choice);

      }
      else if(userchoice == "Scissors"){
        choice = "Rock";
        //console.log("Attempt Scissors" + choice);
      }
    }


  //Comic Hans: Always Loses
    else if(villain == "Comic Hans"){
      console.log("userchoiceboss" + userchoice);
      if(userchoice == "Rock"){
        choice = "Scissors";
        console.log("Choicehappened" + choice);

      }
      else if(userchoice == "Paper"){
        choice = "Rock";
        console.log("Choicehappened" + choice);

      }
      else{
        choice = "Paper";
        console.log("Choicehappened" + choice);

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
        console.log("Throw array" + villainsthrowarray[i]);
        console.log("Throw array name" + villainsthrowarray[i][0]);
        if(villainsthrowsarray[i][0] == villain){
          //console.log(villains)
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
    console.log("Throw array" + villainsthrowsarray)
  }
    //console.log("final return vil" + choice);
    return choice;
}

function randomThrow(){
  var throwoptions = ["Rock", "Paper", "Scissors"];
  return throwoptions[(3*Math.random())|0];
}
