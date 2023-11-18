function diceGame() {
  var player1 = Math.random();
  player1 = player1 * 6;
  player1 = Math.floor(player1);
  player1 = player1 + 1;
  console.log(player1);

  var player2 = Math.random();
  player2 = player2 * 6;
  player2 = Math.floor(player2);
  player2 = player2 + 1;
  console.log(player2);

  var img1 = document.getElementsByClassName("img1");
  img1[0].src = "./images/dice" + player1 + ".png";
  var img2 = document.getElementsByClassName("img2");
  img2[0].src = "./images/dice" + player2 + ".png";

  var h1 = document.querySelector("h1");

  if (player1 > player2) {
    h1.innerText = "Winner is Player1";
  } else if (player2 > player1) {
    h1.innerText = "Winner is Player2";
  } else {
    h1.innerText = "Draw";
  }
}

diceGame();
