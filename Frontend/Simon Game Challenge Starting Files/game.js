var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var randomChosenColour;

var isStarted = false;
var level = 0;

$(document).keydown(function (e) {
  // console.log(e.originalEvent.key);
  if (!isStarted) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    isStarted = true;
  }
});
function startOver(){
  level = 0;
  gamePattern = [];
  isStarted = false;
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        },1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// next sequence function

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  //   console.log(randomNumber);
  randomChosenColour = buttonColours[randomNumber];
  //   console.log(randomChosenColour);

  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);

  console.log(gamePattern);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).click(function () {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  });
}

