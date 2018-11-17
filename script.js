window.onload = function() {
  //FORTUNE WHEEL

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 500, 500);

  //QUIZ
  //functions

  $("#fromatob").children().hide();
  $("#clubscene").children().hide();

  var index = 0;

  function printFromatob() {
    $("#fromatob").children().eq(index).show();
  }

  function questionRight() {
    $("#points").children().eq(index).addClass("greenpoint");
    $("#fromatob").children().eq(index).hide();
    gameOver();
    index++;
    $("#fromatob").children().eq(index).show();
  }

  function questionWrong() {
    $("#points").children().eq(index).addClass("redpoint");
    $("#fromatob").children().eq(index).hide();
    gameOver();
    index++;
    $("#fromatob").children().eq(index).show();
  }

  $(".answerSet input").click(function() {
    if (
      $(this).parent().hasClass("correct")
    ) {
      console.log("Correct");
      questionRight();
    } else {
      console.log("Wrong");
      questionWrong();
    }
  });

  function gameOver() {
    //has to be i === 4 if we have 5 questions ready
    if (index === 1) {
      var counterRed = 0;
      var counterGreen = 0;
      var points = $(".points");
      for (i = 0; i < points.length; i++) {
        if (points.eq(i).hasClass("redpoint")) {
          counterRed += 1;
        }
        if (points.eq(i).hasClass("greenpoint")) {
          counterGreen += 1;
        }
      }
      if (counterRed === 0) {
        alert("The game is over. You got " + counterGreen + " out of 5 questions right. Are you a Berliner?!"
        );
      }
      if (counterRed === 1) {
        alert("The game is over. You got " + counterGreen + " out of 5 questions right. Awesome. "
        );
      }
      if (counterRed === 2) {
        alert(
          "The game is over. You got " + counterGreen + " out of 5 questions right. Not bad."
        );
      }
      if (counterRed === 3) {
        alert(
          "The game is over. You got " + counterGreen + " out of 5 questions right. You should try this again."
        );
      }
      if (counterRed === 4) {
        alert(
          "The game is over. You got " + counterGreen + " out of 5 questions right. You should try this again. "
        );
      }
      if (counterRed === 5) {
        alert(
          "The game is over. You got " + counterGreen + " out of 5 questions right. You're a loser."
        );
      }
    }
  }
};
