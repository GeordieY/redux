stats();

function stats(){
var playerobject = JSON.parse(localStorage.getItem("player"));
var compobject = JSON.parse(localStorage.getItem("comp"));
console.log(playerobject["Games_Played"]);
console.log(compobject["Games_Played"]);
console.log(playerobject["Total_Losses"]);
console.log("Name" + playerobject["Name"]);
console.log(playerobject);
console.log(compobject);

document.getElementById("game_count").innerHTML = "Games Played:  " + playerobject["Games_Played"];
document.getElementById("win_count").innerHTML = "You have won   " + playerobject["Total_Wins"] + " games";
document.getElementById("loss_count").innerHTML = "You have lost  " + playerobject["Total_Losses"] + " games";
document.getElementById("comp_game_count").innerHTML = "The Opponent's Games Played:   " + compobject["Games_Played"];
document.getElementById("comp_win_count").innerHTML = "The Opponent's has won   " + compobject["Total_Wins"] + " games";
document.getElementById("comp_loss_count").innerHTML = "The Opponent's has lost   " + compobject["Total_Wins"] + " games";





  var player_rock = (((playerobject["Rock_Played"])/(playerobject["Games_Played"])) *100).toFixed(2);
  var player_paper = (((playerobject["Paper_Played"])/(playerobject["Games_Played"]))*100).toFixed(2);
  var player_scissors = (((playerobject["Scissors_Played"]/playerobject["Games_Played"]))*100).toFixed(2);

  var comp_rock = (((compobject["Rock_Played"]/playerobject["Games_Played"])*100)).toFixed(2);
  var comp_paper = (((compobject["Paper_Played"]/playerobject["Games_Played"])*100)).toFixed(2);
  var comp_scissors = (((compobject["Scissors_Played"]/playerobject["Games_Played"])*100)).toFixed(2)

  document.getElementById("player_stats").innerHTML = "Rock: "+player_rock+"% Paper: "+player_paper+"% Scissors: "+player_scissors+"%";
 document.getElementById("comp_stats").innerHTML = "Rock: "+comp_rock+"% Paper: "+comp_paper+"% Scissors: "+comp_scissors+"%";
}
/*naming conventions in stats.html and scripts.js
<p id="game_count">Games Played: 0</p>
<p id="win_count">Your Games Won: 0</p>
<p id="win_loss">Your Win/Loss Record: 0/0</p>
<p id="player_stats">The Opponent's Stats: Rock: 0%, Paper: 0%, Scissors: 0%</p>
<p id="comp_game_count">The Opponent's Games Played: 0</p>
<p id="comp_win_count">The Opponent's Games Won: 0</p>
<p id="comp_win_loss">The Opponent's Win/Loss: 0/0</p>
<p id="comp_stats">The Opponent's Stats: Rock: 0%, Paper: 0%, Scissors: 0%</p>

*/

/*
Class New_Player{
  constructor(){
  this["Games Played"] = 0;
   this["Total Wins"] = 0;
   this["Total Losses"] = 0;
   this["Win Loss Ratio"] = 0;
   this["Rock Played"] = 0;
   this["Paper Played"] = 0;
   this["Scissors Played"] = 0;
 }
}
*/
