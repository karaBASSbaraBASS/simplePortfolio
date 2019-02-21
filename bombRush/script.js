document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

var bombs_var = 1;

var bombing = true;

function spawn_bombs (){
  if (bombing == true) {
    for (var i = 0; i < bombs_var; i++){
      newBomb=document.createElement("div");
      newBomb.setAttribute("class","bombs");
      newBomb.textContent="✪";
      newBomb.style.left=Math.round(Math.random(screen.width,0)*screen.width) + "px";
      // create bombs in all screen length //
      newBomb.setAttribute("onclick","this.remove(); score.textContent=parseInt(score.textContent)+1;");
      // first of all score is a TEXT content, but we ned to do som math with it. To solve  convert it to INT.
      document.body.appendChild(newBomb);
    }
  }
}

spawn_bombs ();

function bombs_remove() {
  
    for (var i = 0; i < document.getElementsByClassName("bombs").length; i++){
      bombs[i].remove();
      bombs_remove();
    }
}

function show_die_message(){
newMessage=document.createElement("div");
  newMessage.id="die_message"
  newMessage.innerHTML="<center>Game Over!<br>Score "+score.textContent+"</center>";
  newMessage.setAttribute("onclick","location.reload();")
  document.body.appendChild(newMessage);
}

function movement() {
  setTimeout(function(){
    bombs = document.getElementsByClassName("bombs");
    for (var i = 0; i < bombs.length; i++){
      var bomb_y = bombs[i].style.top.split("px")[0];
      bomb_y -= -1;
      bombs[i].style.top = bomb_y + "px";
        if (bomb_y > screen.height) {
          bombs[i].remove();
          health.textContent -= 1;
        }
    }
    if (bomb_y > screen.height) {
      bombs_var += 1;
      spawn_bombs();
    }
    if (!bombs [0]) {
      bombs_var += 1;
      spawn_bombs();  
    }
    
    if (document.getElementById("health")) {
      if (health.textContent <= 0) {
        bombing == false;
        bombs_remove();
        document.body.style.backgroundColor="red";
        show_die_message();
        if (document.getElementById("health")) {
          health.remove()
          };
        if (document.getElementById("score")) {
          score.remove()
          };
      }
    }
    movement();
  },0)
}

movement ();
