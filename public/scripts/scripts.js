
//need a button Event Listener
/*
var name_button = document.getElementById("enter_name_button");
name_button.addEventListener("click", function(){

});
*/


/*

var player_name = localStorage.getItem("player_name");
var player_move;
var comp_move;
var feedback_div = document.getElementById("feedback");
var reset_button = document.getElementById("reset");
var play_again_button= document.getElementById("play_again_button");


//var player_name=localStorage.getItem("player_name");
/*
var throw_choice;
var comp_choice;
var comp_text;
var win_count;
var lose_count;
var game_count;
var player_rock=localStorage.getItem("player_rock")
var player_paper=localStorage.getItem("player_paper");
var player_scissors=localStorage.getItem("player_scissors");
*/

/*

class new_player{
  constructor(){
   this["Name"] = player_name;
   this["Games_Played"] = 0;
   this["Total_Wins"] = 0;
   this["Total_Losses"] = 0;
   this["Win_Loss_Ratio"] = 0;
   this["Rock_Played"] = 0;
   this["Paper_Played"] = 0;
   this["Scissors_Played"] = 0;
 }
}

updateName();
throwChoice();

reset_button.addEventListener("click", function(){
  console.log("Reset Is In Action");
  localStorage.clear();
  changeVisibility("game_results", "visible");
  updateName();
  throwChoice();
  //addResetCode
  //changeTheReset + NameSaving in LocalStorage
});

play_again_button.addEventListener("click",function(){
  changeVisibility("game_results", "visible");
  changeVisibility("throw_choice", "hidden");
  console.log("Play Again Has Been Clicked");

  //addPlayAgainCode
});
/*reset_button.addEventListener.("click", function(){
  //add Reset Button Code
});




play_again

*/

/*
function updateName(){
  var name_button = document.getElementById("confirm_name");
  player_name = localStorage.getItem("player_name");




  console.log("This is a test for the player:" + player_name);
    name_button.addEventListener("click", function(){
      var nameinput = document.getElementById("name_input").value;
        if(!nameinput){
            changeVisibility("feedback", "hidden");
            feedback.innerHTML = "You have failed to enter a name!";
            feedback.classList.add("negative");
            feedback.classList.remove("positive");
            //have to go look at feedback
          }
          else {
            localStorage.setItem("player_name", nameinput);
            console.log("This is a test for the player:" + player_name);
            changeVisibility("enter_name", "visible");
            changeVisibility("throw_choice", "hidden");
            player_name = localStorage.getItem('player_name');
            console.log("iiiiiii"+player_name);

            changeContent("game_header", "Please play the Game "+ player_name+ "!");
            changeVisibility("feedback", "hidden");
            feedback.innerHTML = "Name successfully saved!";
            feedback.classList.add("positive");
            feedback.classList.remove("negative");
        }
    });

    if(!player_name){
    changeVisibility("enter_name", "hidden");
    console.log("Name not entered yet!");
    feedback.innerHTML = "Please enter your name!";
    feedback.classList.add("negative");
    feedback.classList.remove("positive");
    }
  else{
    changeContent("game_header", "Play the Game "+ player_name+ "!");
    changeVisibility("enter_name", "visible");
    changeVisibility("throw_choice", "hidden");
    }
  }

function throwChoice(){
    var throw_button = document.getElementById("confirm_choice");
    var throw_chosen = document.getElementById("choices");
    var winner_text = document.getElementById("winner");
    var player_text =document.getElementById("player");
    var comp_text= document.getElementById("comp");
    var winner;
    var playerint;
    var compint;
    var player = JSON.parse(localStorage.getItem('player'));
    var comp = JSON.parse(localStorage.getItem('comp'));

    if(!player){
      player = new new_player();
      console.log("User Player updated");
    }
    if(!comp){
      comp= new new_player();
      console.log("Computer Player updated");
    }
    console.log("**Computer Player updated: "+player);

    throw_button.addEventListener("click",function(){
      player_move = throw_chosen.options[throw_chosen.selectedIndex].value;
      console.log(player_move + "This is player move");


      if(player_move == "0"){
  //     changeVisibility("feedback", "hidden");
       feedback.innerHTML = "Please make a move!";
       feedback.classList.add("negative");
       feedback.classList.remove("positive");
       console.log(feedback.innerHTML + "this has been reached");
      }

      else{
        comp_move = Math.floor(Math.random() * 3)+1;
        console.log(comp_move + "This is comp move");
        player["Games_Played"] +=1;
        comp["Games_Played"] += 1;
        console.log("Games Played Player Changed" + player["Games_Played"]);
        console.log("Games Played Computer Changed" + comp["Games_Played"]);
      //  changeVisibility("feedback", "hidden");
        feedback.innerHTML = "Successfully threw choice";
        feedback.classList.add("positive");
        feedback.classList.remove("negative");

        if(player_move == "rock"){
          player["Rock_Played"]+=1;
          console.log("Rock Played" + player["Rock_Played"]);
          $("#player_image").attr("src", "images/rockcomp.png");
          playerint = 1;

        }
        else if(player_move == "scissors"){
          player["Scissors_Played"]+=1;
            $("#player_image").attr("src", "images/scissorscomp.png");
            playerint = 3;
             console.log("Scissors Played" + player["Scissors_Played"]);

        }
        else{
          player["Paper_Played"]+=1;
          $("#player_image").attr("src", "images/papercomp.jpeg");
          playerint = 2;
          console.log("Paper Played"+ player["Paper_Played"]);
        }

        console.log("This is player int" + playerint);

        if(comp_move == 1){
          comp["Rock_Played"]+=1;
          $("#comp_image").attr("src", "images/BowserRock.jpg");
          compint = 1;
          console.log("Rock Played" + comp["Rock_Played"]);
        }
        else if(comp_move == 3){
          comp["Scissors_Played"]+=1;
          $("#comp_image").attr("src", "images/BowserScissors.jpg");
          compint = 3;
          console.log("Scissors Played" + comp["Scissors_Played"]);

        }
        else{
          comp["Paper_Played"]+=1;
          $("#comp_image").attr("src", "images/BowserPaper.jpg");
          compint = 2;
          console.log("Paper Played" + comp["Paper_Played"]);
        }
        console.log("This is Comp Int" + compint);

        if(playerint == compint){
          winner = "Tie";
          console.log("tie");
        }
        //3 scissors 1 rock 2 paper
        else if(playerint == 1 && compint == 3 || playerint > compint ){
          winner = player_name;
          console.log("This is a test for player name" + winner);
          player["Total_Wins"] +=1;
          comp["Total_Losses"] +=1;
          console.log("Player Wins: This has been counted");
        }
        else{
          winner = "Computer";
          comp["Total_Wins"] +=1;
          player["Total_Losses"] +=1;
          console.log("Comp Win: This has been counted");
        }

        player["Win Loss Ratio"] = player["Total_Wins"]/player["Total_Losses"];
        comp["Win Loss Ratio"] = comp["Total_Wins"]/comp["Total_Losses"];
        console.log("Ratios have been changed");


        changeVisibility("game_results", "hidden");
        changeVisibility("throw_choice", "visible");
        winner_text.innerHTML = "The winner is "+winner+ "!";
        if(playerint == 1){
          player_text.innerHTML = "You threw rock!";
        }
        else if(playerint == 2){
          player_text.innerHTML = "You threw paper!";
        }
        else{
          player_text.innerHTML = "You threw scissors!";
        }

        if(compint == 1){
          comp_text.innerHTML = "The computer threw rock!";
        }
        else if(compint == 2){
          comp_text.innerHTML = "The computer threw paper!";
        }
        else{
          comp_text.innerHTML = "The computer threw scissors!";
        }

        localStorage.setItem("player", JSON.stringify(player));
        localStorage.setItem("comp", JSON.stringify(comp));
        //player_text.innerHTML = "You threw "+player_move+ "!";
      //  comp_text.innerHTML = "The computer threw "+comp_move+ "!";

    }

    });
  }

//change MakeToggable --> toggleVisibility;
function toggleVisibility(button_element, div_element) {
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}

function changeVisibility(element, state) {
  if (state == "visible") {
    document.getElementById(element).classList.remove("visible");
    document.getElementById(element).classList.add("hidden");
  } else {
    document.getElementById(element).classList.remove("hidden");
    document.getElementById(element).classList.add("visible");
  }

  console.log("This has happened for" + element);
}

function changeContent(element, content){
  document.getElementById(element).textContent = content;
}



/*
have to get: function reset() {
*/






/*
var player_name = localStorage.getItem("player_name");
var OpponentThrow;
var PlayerThrow;
var gamesPlayed;
var gamesWon;
var gamesLost;
var playerRock;
var playerScissors;
var playerPaper;
var compRock;
var compScissors;
var compPaper;
*/


/*
if(!player_name){
  showOrNot(document.getElementById("enter_name"), true);
}else {
  updateNames(player_name);
  showOrNot(document.getElementById("throw_choice"), true);
}

///////////////////Event Listions//////////////////
toggleVisibility(document.getElementById("show_rules_button"), document.getElementById("rules"));
toggleVisibility(document.getElementById("show_stats_button"), document.getElementById("stats"));

document.getElementById("enter_name_button").addEventListener("click", function(){
  var p_name=document.getElementById("enter_name_input").value;
  localStorage.setItem("player_name",p_name);
  showOrNot(document.getElementById("enter_name"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  updateNames(p_name);
});

///////////////////Helper function//////////////////
function updateNames(name){
  var name_spots=document.getElementsByClassName("game_header");
  for(var i=0; i<name_spots.length;i++){
    console.log(name_spots[i]);
    name_spots[i].innerHTML = name;
  }
}

function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }else if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
    }
}

function toggleVisibility(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}
*/
