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
  console.log("Name" + user_data.name);
  console.log("Password" + user_data.password);

//adding a user at login: now just automatically
var data = [user_data.name, user_data.password];
var datastorage = [];
var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0];
var file = nameadd.join(",");
fs.writeFileSync('data/users.csv', file, 'utf8');
console.log(fs.readFileSync('data/users.csv','utf8'));
response.status(200);
response.setHeader('Content-Type', 'text/html');
response.render('game', {user:user_data});
});

app.get('/:user/results', function(request, response){

//error at the splitting of the CSV.
var user_data = {
  name: request.params.user,
  weapon: request.query.weapons
}
/*Need to run a function to input villain strategies
*/
var villain_data = {
  name: request.query.villains,
  weapon: "Paper"
}
  var vilwep = villain_data.weapon;
  var userwep = user_data.weapon;
  var compare = vilwep.localeCompare(userwep);
  console.log(compare);

  var index;
  var index2;
  var user_info = [];
  var villain_info = [];
  var winner;
  var users_file = fs.readFileSync('data/users.csv', 'utf8');
  var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
  var rows = users_file.split('\n');
  var rows2= villains_file.split('\n');
//move turn it into an array and parse
for(var i=0; i<rows.length; i++){
  user_info.push(rows[i].trim().split(","));
  console.log("user_info" + user_info);
}
for(var i=0; i<rows2.length;i++){
  villain_info.push(rows2[i].trim().split(","));
  console.log("villain_info" + villain_info);
}
for(var i=0; i<user_info.length; i++){
  if(String(user_info[i][0]) == String(user_data.name)){
    index = i;
    break;
    console.log("This is index" + index)
  }
}
for(var i=0;i<villain_info.length;i++){
  if(String(villain_info[i][0]) == String(villain_data.name)){
    index2 = i;
    break;
    console.log("This is index2" index2);
  }
}
    changeIndexValue(user_info[index][1]);
    changeIndexValue(villain_info[index2][1]);
    console.log("game user played" + user_info[index][1]);
    if(compare==-1 && String(villain_data.weapon)==="Paper"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner= villain_info[index2][0];
      console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Paper"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner = "Tie";
      console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Paper"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner=user_info[index][0];
      console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Rock"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner = "Tie";
      console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Rock"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner= user_info[index][0];
      console.log("Winner determined" + winner);
    }
    if(compare==-1 && villain_data.weapon=="Rock"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner= villain_info[index2][0];
      console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Scissors"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner= user_info[index][0];
      console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Scissors"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner = villain_info[index2][0];
      console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Scissors"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner = "Tie";
      console.log("Winner determined" + winner);
    }
  var winner_data = {
    winner: winner
  }
  var userstring;
  var villainstring;
  for(var i=0; i<user_info.length;i++){
    for(var k=0; k<user_info[i].length;k++){
      userstring += (user_info[i][k] + ",");
      console.log("String check" + user_info[i][k]);
    }
    if(i!=user_info.length-1){
      userstring +="\n"
    //  console.log("Repieced USer String" + userstring);
    }
   }

   //var users_file = fs.writeFileSync('data/users.csv', userstring, 'utf8');
   for(var i=0; i<villain_info.length;i++){
     for(var k=0; k<villain_info[i].length;k++){
        villainstring += (villain_info[i][k] + ",");
        console.log("String check" + villain_info[i][k]);
     }
     if(i!=villain_info.length-1){
       villainstring += "\n";
     }
  console.log("user String" + userstring);
  console.log("villain String" + villainstring);

  //  var villains_file = fs.writeFileSync('data/villains.csv', villainstring, 'utf8');
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('results',{user:user_data, villain:villain_data, winner:winner_data});
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

function changeIndexValue(element){
  element = (parseInt(element) + 1);
  return element;
}







//cut code:
//  var rows = (users_file.split('\n'));
//console.log("rows" + rows);
//  var rows2 = ((villains_file).split('\n'));
 //console.log("This is rows" + rows);
///console.log("This is rows2" + rows2);
//console.log("rowtype1" + typeof(rows)); //this is recognized as an object
//console.log("rowtype2" + typeof(rows2)); //this is recognized as an objectß
  /*
  next time Georde if we Meet with Gohde and also to think about as we do project
  01/10/19
  1) Why is rows and rows2 recognized as object
    need to be array --> parsed --> data changed
  2) Must add a sort option by size in terms of each time the data is checked in the stats
  3) Right now I regenerate villains.csv every time a new user logs in. Is that a problem for now? Can change later. Need to include parsing of csvs to see
    This may be due to gitignore with the things changing a lot. I will recheck later
  4) After this -->
    1) need to get data transferred between CSV and server. If that is done,
    2) Check Login and update stats based on Login. Need to work on communicating logins and logouts. Next bigger step to save password. Might have to create another separate array
    3) Create non-uniform distributions for villains
    4) For game/results --> create loading pages with hands and images. Use ejs to determine.
    5) Make sure stats is loading results properly.
    6) Re-format CSS if time permits
  */
  //unused array code
  /*for(var i=0; i<rows.length-1;i++){
  console.log("rowtype1" + typeof(rows[i])); //this is recognized as an object
  }
  /*for(var i=0; i<rows2.length-1; i++){
  console.log("rowtype2" + typeof(rows2)); //this is recognized as an objectß
  }
  */
  /*
  for(var i=0; i<rows.length-1; i++){
    user_info.push((rows[i].toString()).split(","));
  }
  */
  /*
  for(var i=0; i<5;i++){
    console.log("User info search" + user_info[i]);
  }
  */

  //console.log("User array" + user_info.length + "User arra");
  /*
  for(var i = 0; i<(rows.length)-1; i++){
      user_info = rows[i].split(",");
    }
    */

    //split array by commas


  /*
  for(var i=0; i<rows2.length-1; i++){
    villain_info.push((rows2[i].toString()).split(","));
  }


  //  console.log("villain_info test" + villain_info[3]);

    for(var i=0; i<rows2.length-1;i++){
      villain_info = rows2[i].split(",");
    }
  */

  // This is to test the array and each individual parts
  /*
   for(var i=0; i<user_info.length;i++){
      for(var k=0; k<user_info[i].length;k++){
      console.log("User Data" + user_info[i][k]);
      }
    }
    for(var i=0; i<villain_info.length;i++){
      for(var k=0; k<villain_info[i].length;k++){
      console.log("Vil Data" + villain_info[i][k]);
      }
    }
    */

    /*
    for(var i=0; i<rows.length; i++){
      datastorage.push(rows[i].trim().split(","));
    }
    //console.log("log" + datastorage);

    if(datastorage.includes(user_data.name)){
        boolean = true;
    }
    else{
        boolean=false;
    }

    if(boolean=false){
      fs.writeFileSync('data/userinfo.csv', data.join(","), 'utf8');
      var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0];
      var file = nameadd.join(",");
      fs.writeFileSync('data/users.csv', file, 'utf8');
      response.render('game', {user:user_data, error:error});
    }



    /*
    else{
      var namecheck;
      for(var i=0; i<datastorage.length;i++){
        if(datastorage[i][0] == user_data.name){
          namecheck = i;
          break;
        }
        else{
          continue;
        }
      }

      if(user_data.password == String(datastorage[namecheck][1])){
          response.render('game', {user:user_data, error:error});
        }

        else{
          error = {
            error:'error'
          }
          response.render('index', {error:error});
        }
    }
    */
