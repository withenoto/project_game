window.onload = function() {
  //FORTUNE WHEEL

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");

  var radius = 250

  //Draws first Triangle
  ctx.beginPath();
  ctx.moveTo(250,250);
  ctx.arc(250,250,250,0,(Math.PI*2)/5);
  ctx.fillStyle = "lightgreen";
  ctx.fill();

  //Draws second Triangle

  ctx.beginPath();
  ctx.moveTo(250,250);
  ctx.arc(250,250,250,(Math.PI*2)/5,2*(Math.PI*2)/5);
  ctx.fillStyle = "darkblue";
  ctx.fill();

  //Draws third Triangle
  ctx.beginPath();
  ctx.moveTo(250,250);
  ctx.arc(250,250,250,2*(Math.PI*2)/5,3*(Math.PI*2)/5);
  ctx.fillStyle = "orange";
  ctx.fill();

  //Draws fourth Triangle
  ctx.beginPath();
  ctx.moveTo(250,250);
  ctx.arc(250,250,250,3*(Math.PI*2)/5,4*(Math.PI*2)/5);
  ctx.fillStyle = "red";
  ctx.fill();

  //Draws fifth Triangle
  ctx.beginPath();
  ctx.moveTo(250,250);
  ctx.arc(250,250,250,4*(Math.PI*2)/5,5*(Math.PI*2)/5);
  ctx.fillStyle = "purple";
  ctx.fill();

  //Writes Category Text on Canvas
  ctx.save();
  ctx.translate(250,250)
  ctx.rotate (36*Math.PI/180);
  ctx.font = '30px "Dosis", serif';
  ctx.fillStyle = "white";
  ctx.fillText("Berlin Clubscene", 40, 10);

  ctx.rotate (72*Math.PI/180);
  ctx.font = '30px "Dosis", serif';
  ctx.fillStyle = "white";
  ctx.fillText("From A to B", 40, 10);

  ctx.rotate (72*Math.PI/180);
  ctx.font = '30px "Dosis", serif';
  ctx.fillStyle = "white";
  ctx.fillText("Eating & Drinking", 40, 10);

  ctx.rotate (72*Math.PI/180);
  ctx.font = '30px "Dosis", serif';
  ctx.fillStyle = "white";
  ctx.fillText("District Clichées", 40, 10);

  ctx.rotate (72*Math.PI/180);
  ctx.font = '30px "Dosis", serif';
  ctx.fillStyle = "white";
  ctx.fillText("Fun Facts", 40, 10);

  ctx.restore();

  //QUIZ
  //functions

  //Hides all questions in the beginning:
  $("#fromatob").children().hide();
  $("#clubscene").children().hide();
  $("#funfacts").children().hide();
  $("#eatingdrinking").children().hide();
  $("#districtcliches").children().hide();

  var index = 0;

  //Shows the first question of the category #fromatob:
  function printFromatob() {
    $("#fromatob").children().eq(index).show();
  }

  //Adds a green point to the score bar, makes the question disappear and a new question appear:
  function questionRight() {
    $("#points").children().eq(index).addClass("greenpoint");
    $("#fromatob").children().eq(index).hide();
    gameOver();
    index++;
    $("#fromatob").children().eq(index).show();
  }

  //Adds a red point to the score bar, makes the question disappear and a new question appear:
  function questionWrong() {
    $("#points").children().eq(index).addClass("redpoint");
    $("#fromatob").children().eq(index).hide();
    gameOver();
    index++;
    $("#fromatob").children().eq(index).show();
  }

  //Checks if the answer that was clicked is the right answer or the wrong answer:
  $(".answerSet input").click(function() {
    if (
      $(this).parent().hasClass("correct")
    ) {
      // console.log("Correct");
      questionRight();
    } else {
      // console.log("Wrong");
      questionWrong();
    }
  });

  //Checks if all five questions have been answered and the game is over. Then alerts the final score:
  function gameOver() {
    if (index === 4) {

      window.setTimeout(function (){

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
        alert(
          "WOW! The game is over. You got " +
            counterGreen +
            " out of 5 questions right. You're a real Berliner!"
        );
      }
      if (counterRed === 1) {
        alert(
          "The game is over. You got " +
            counterGreen +
            " out of 5 questions right. Awesome. "
        );
      }
      if (counterRed === 2) {
        alert(
          "The game is over. You got " +
            counterGreen +
            " out of 5 questions right. Not bad."
        );
      }
      if (counterRed === 3) {
        alert(
          "The game is over. You got " +
            counterGreen +
            " out of 5 questions right. You should try this again."
        );
      }
      if (counterRed === 4) {
        alert(
          "The game is over. You got " +
            counterGreen +
            " out of 5 questions right. You should try this again. "
        );
      }
      if (counterRed === 5) {
        alert(
          "Oh boy. The game is over. You got " +
            counterGreen +
            " out of 5 questions right. Loser!"
        );
      }

    },1000)
    }
  }
};
