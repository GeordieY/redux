if(document.title==="P,R,S - Game"){
    document.getElementById("hurryUP").innerHTML="Play the Game";
    document.getElementById("referee").src='/images/ref/three.svg';
    setTimeout(function(){
      document.getElementById("referee").src='/images/ref/two.svg';}, 1000);

    setTimeout(function(){
      document.getElementById("referee").src='/images/ref/one.svg';}, 2000);

    setTimeout(function(){
      document.getElementById("referee").src='/images/ref/fairy_dust.svg';}, 3000);

    setTimeout(function(){
      document.getElementById("referee").src='/images/ref/watch.svg';
      document.getElementById("hurry?").innerHTML="Play the Game; Hurry!";}, 8000);

}
