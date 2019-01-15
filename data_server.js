var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var villainlist = [ "Bones", "Gato", "Manny", "Mr.Modern", "Regal", "The Boss", "Comic Hans", "Harry","Mickey","Pixie","Spock","The Magician" ];



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
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:user_data});
});

app.get('/login', function(request, response){
  var user_data={
      name: request.query.user_name,
      password: request.query.user_password
  };

//this data is being saved console.log("This is data password" + user_data.password);
//this data is being saved console.log("This is data username" + user_data.name);


  /* console log isn't being reached? */
  //console.log("This is userdata" + user_data);


  response.status(200);
  response.setHeader('Content-Type', 'text/html');


  var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0];
  console.log(nameadd + "Name" + typeof(nameadd));
  var file = nameadd.join(",");
  //var vill = [];




//this returns a string  console.log("List of initial villains" + vill2 +  "Datatype" + typeof(vill2));
//this returns a string  console.log("List of users" + file +  "Datatype" + typeof(file));

  //console.log("Fileprint" + file);

  /*
  var k = fs.readFileSync('data/users.csv', 'utf8');
  if(k.length<=0){
    var c = ['test', 0, 0, 0, 0, 0, 0, 0, 0];
    fs.writeFileSync('data/users.csv', c, 'utf8');
    for(var i=0; i<villainlist.length;i++){
      var c = [villainlist[i], 0, 0 ,0 ,0 ,0 ,0,0];
      vill.push(c);
    //  console.log("hi" + vill[i]);
    }
    var vill2= vill.join();
  }*/

  fs.writeFileSync('data/users.csv', file, 'utf8');
  //fs.writeFileSync('data/villains.csv', vill2, 'utf8');
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
var user_data = {
  name: request.param.user,
  weapon: request.query.weapon,
}
console.log(user_data.weapon + "weapon");
console.log(user_data.name + "name");
var villain_data = {
  villain: request.query.villain,
  weapon: "paper"
}


//  console.log("userdata2" + user_data);
  //console.log("vildata" + villain_data);
  //write to the CSV what we need to add
  var index;
  var index2;
  var user_info = [];
  var villain_info = [];
  var winner;

  var users_file = fs.readFileSync('data/users.csv', 'utf8');
  var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
//  console.log("userfiletype" + typeof(users_file)); //this is a string
  //console.log("villainfiletype" + typeof(villains_file)); //this is a string
//  console.log("file1" + users_file);
//  console.log("file2"+ villains_file);
  var rows = users_file.split('\n');
  var rows2= villains_file.split('\n');






//  var rows = (users_file.split('\n'));
  //console.log("rows" + rows);
//  var rows2 = ((villains_file).split('\n'));



  console.log("This is rows" + rows);
  console.log("This is rows2" + rows2);
  console.log("rowtype1" + typeof(rows)); //this is recognized as an object
  console.log("rowtype2" + typeof(rows2)); //this is recognized as an objectß

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


//move turn it into an array and parse
for(var i=0; i<rows.length; i++){
  user_info.push(rows[i].trim().split(","));
  console.log("userinfo" + user_info[i]);
//  console.log("user_info" + user_info); this code is reached
}
for(var i=0; i<rows2.length;i++){
  villain_info.push(rows2[i].trim().split(","));
  console.log("vilinfo" + villain_info[i]);
  //console.log("Villain_info" + villain_info); this code is reached
}

for(var i=0; i<user_info.length; i++){
  //this needs to work
  console.log("running user loop");
  console.log("arrayname" + user_info[i]);
  console.log("inputname" + user_data.name);
  if(String(user_info[i]) == String(user_data.name)){
    index = i;
    console.log(index + "this is 1stindex");
    break;
  }
}

for(var i=0;i<villain_info.length;i++){
  console.log("running villain loop");
  console.log("arraynamevil" + villain_info[i]);
  console.log("inputnamevil" + villain_data.name);
  if(String(villain_info[i]) == String(villain_data.name)){
    index2 = i;
    console.log(index2 + "this is index");
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
      console.log("Winner determined" + winner);
    }
    if(user_data.weapon=="paper" && villain_data.weapon=="paper"){
      user_info[index+4] = (user_info[index+4] + 1);
      user_info[index+5] = (user_info[index+5] + 1);
      villain_info[index2+4] = (villain_info[index2+4] + 1);
      villain_info[index2+5] = (villain_info[index2+5] + 1);
      winner = "Tie";
      console.log("Winner determined" + winner);
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
      console.log("Winner determined" + winner);
    }
    if(user_data.weapon=="paper" && villain_data.weapon=="rock"){
      user_info[index+2] = (user_info[index+2] + 1);
      user_info[index+5] = (user_info[index+5] + 1);
      villain_info[index2+3] = (villain_info[index2+3] + 1);
      villain_info[index2+7] = (villain_info[index2+7] + 1);
      winner = user_info[index];
      console.log("Winner determined" + winner);
    }
    if(user_data.weapon=="scissors" && villain_data.weapon=="rock"){
      user_info[index+3] = (user_info[index+3] + 1);
      user_info[index+6] = (user_info[index+6] + 1);
      villain_info[index2+2] = (villain_info[index2+2] + 1);
      villain_info[index2+7] = (villain_info[index2+7] + 1);
      winner = villain_info[index2];
      console.log("Winner determined" + winner);
    }

    if(user_data.weapon=="rock" && villain_data.weapon=="scissors"){
      user_info[index+2] = (user_info[index+2] + 1);
      user_info[index+7] = (user_info[index+7] + 1);
      villain_info[index2+3] = (villain_info[index2+3] + 1);
      villain_info[index2+6] = (villain_info[index2+6] + 1);
      winner = user_info[index];
      console.log("Winner determined" + winner);
    }
    if(user_data.weapon=="paper" && villain_data.weapon=="scissors"){
      user_info[index+3] = (user_info[index+3] + 1);
      user_info[index+5] = (user_info[index+5] + 1);
      villain_info[index2+2] = (villain_info[index2+2] + 1);
      villain_info[index2+6] = (villain_info[index2+6] + 1);
      winner = villain_info[index2];
      console.log("Winner determined" + winner);
    }
    if(user_data.weapon=="scissors" && villain_data.weapon=="scissors"){
      user_info[index+4] = (user_info[index+4] + 1);
      user_info[index+6] = (user_info[index+6] + 1);
      villain_info[index2+4] = (villain_info[index2+4] + 1);
      villain_info[index2+6] = (villain_info[index2+6] + 1);
      winner = "Tie";
      console.log("Winner determined" + winner);
    }

    var initjoin = user_info.join(",");
    var viljoin = villain_info.join(",");
    var rowjoin = Array.from(initjoin).join("\n");
    var vilrow = Array.from(viljoin).join("\n");
    console.log("rowjoin"+ initjoin);
    console.log("viljoin" + viljoin);
    console.log("winner" + winner);
    //var users_file = fs.writeFileSync('data/users.csv', rowjoin, 'utf8');
    //var villains_file = fs.writeFileSync('data/villains.csv',vilrow, 'utf8');
    //console.log("users_file" + users_file );
    //console.log("villains_file" + villains_file);

    console.log("user_data" + JSON.stringify(user_data));
    console.log("villain_data" + JSON.stringify(villain_data));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.send(JSON.stringify(user_data));
    response.send(JSON.stringify(villain_data));
    response.render('results',{winner:winner, users:user_data, villains:villain_data});

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
