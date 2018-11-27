window.onload = function() {
  //Hides all questions in the beginning:
  $(".fromatob")
    .children()
    .hide();
  $(".clubscene")
    .children()
    .hide();
  $(".funfacts")
    .children()
    .hide();
  $(".eatingdrinking")
    .children()
    .hide();
  $(".districtcliches")
    .children()
    .hide();

  //FORTUNE WHEEL

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");

  var categories = [];
  categories.push({
    id: "berlinclubscene",
    x: 0,
    y: (Math.PI * 2) / 5,
    color: "#498870"
  });
  categories.push({
    id: "fromatob",
    x: (Math.PI * 2) / 5,
    y: (2 * (Math.PI * 2)) / 5,
    color: "#704988"
  });
  categories.push({
    id: "eatingdrinking",
    x: (2 * (Math.PI * 2)) / 5,
    y: (3 * (Math.PI * 2)) / 5,
    color: "#498088"
  });
  categories.push({
    id: "kiezclichees",
    x: (3 * (Math.PI * 2)) / 5,
    y: (4 * (Math.PI * 2)) / 5,
    color: "#504988"
  });
  categories.push({
    id: "funfacts",
    x: (4 * (Math.PI * 2)) / 5,
    y: (5 * (Math.PI * 2)) / 5,
    color: "#884980"
  });

  var wheel = {
    draw: function() {
      for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, category.x, category.y);
        ctx.fillStyle = category.color;
        ctx.fill();
      }
    }
  };

  wheel.draw();

  //Writes Category Text on Canvas

  var text = {
    draw: function() {
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate((36 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("Berlin Clubscene", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("From A to B", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("Eating & Drinking", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("District Clichées", 40, 10);

      ctx.rotate((72 * Math.PI) / 180);
      ctx.font = '28px "Dosis", serif';
      ctx.fillStyle = "white";
      ctx.fillText("Fun Facts", 40, 10);

      ctx.restore();
    }
  };
  text.draw();

  //Spins Wheel

  var x = 10;
  var random;
  var totalRotation = 0;

  function rotate() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.translate(250, 250);
    ctx.rotate(Math.PI / x);
    totalRotation += Math.PI / x;
    ctx.translate(-250, -250);
    wheel.draw();
    text.draw();
    if (x <= random) {
      window.requestAnimationFrame(rotate);
      x += 0.2;
    } else {
      selectCategory();
    }
  }

  //Selects the category

  var selectedCategory;
  var randomIndex;

  function selectCategory() {
    var remainderRotation = totalRotation % (Math.PI * 2);
    console.log(remainderRotation);
    var sector = Math.PI * 2 - remainderRotation - Math.PI / 2;
    categories.forEach(function(cat) {
      console.log(cat.id, cat.x, cat.y);
    });
    if (sector < 0) {
      sector = Math.PI * 2 + sector;
    }
    console.log(sector);
    console.log("------");
    categories.forEach(function(cat) {
      if (sector > cat.x && sector < cat.y) {
        console.log(cat.id);
        selectedCategory = cat.id;
      }
    });

    if (
      selectedCategory === "fromatob" &&
      $(".fromatob.notyetprinted").length > 0
    ) {
      randomIndex = Math.floor(
        Math.random() * $(".fromatob.notyetprinted").length
      );
      selectedCategory = $($(".fromatob.notyetprinted")[randomIndex]);
      printCategory();
    } else if (
      selectedCategory === "berlinclubscene" &&
      $(".clubscene.notyetprinted").length > 0
    ) {
      randomIndex = Math.floor(
        Math.random() * $(".berlinclubscene.notyetprinted").length
      );
      selectedCategory = $($(".clubscene.notyetprinted")[randomIndex]);
      printCategory();
    } else if (
      selectedCategory === "eatingdrinking" &&
      $(".eatingdrinking.notyetprinted").length > 0
    ) {
      randomIndex = Math.floor(
        Math.random() * $(".eatingdrinking.notyetprinted").length
      );
      selectedCategory = $($(".eatingdrinking.notyetprinted")[randomIndex]);
      printCategory();
    } else if (
      selectedCategory === "funfacts" &&
      $(".funfacts.notyetprinted").length > 0
    ) {
      randomIndex = Math.floor(
        Math.random() * $(".funfacts.notyetprinted").length
      );
      selectedCategory = $($(".funfacts.notyetprinted")[randomIndex]);
      printCategory();
    } else if (
      selectedCategory === "kiezclichees" &&
      $(".districtcliches.notyetprinted").length > 0
    ) {
      randomIndex = Math.floor(
        Math.random() * $(".districtcliches.notyetprinted").length
      );
      selectedCategory = $($(".districtcliches.notyetprinted")[randomIndex]);
      printCategory();
    } else {
      alert("There are no questions left in this category. Spin again!");
      $("#spin").prop("disabled", false);
      x = 10;
    }
  }
  //other method: try to only work with remainderrotation for the case fun facts and mini part of district clichees? we know the remainderrotation is smaller than Math.PI*2/5 then it's funfacts and if it is bigger than that and smaller than Math.PI/180 * 90 it is kiezclichees

  //Onclick SPIN button

  $("#spin").click(function() {
    totalRotation = 0;
    var audio = new Audio("audiofile_fair.mp3");
    audio.play();
    random = Math.floor(Math.random() * 70 + 50);
    rotate();
    $("#spin").prop("disabled", true);
  });

  //QUIZ

  //functions

  var index = 0;
  var countDown;

  //Shows the first question of the selected category:
  function printCategory() {
    $("#starttext").hide();

    selectedCategory
      .children()
      .eq(index)
      .show();

    $("#counter").html(6);

    countDown = setInterval(function() {
      if (parseFloat($("#counter").html()) === 0) {
        questionWrong();
      } else {
        $("#counter").html(parseFloat($("#counter").html()) - 1);
      }
    }, 1000);
  }

  var totalScore = 0;

  //Adds a green point to the score bar, makes the question disappear and a new question appear:
  function questionRight() {
    var audio = new Audio("audiofile_wow.mp3");
    totalScore++;
    audio.play();
    $("#points")
      .children()
      .eq(index)
      .addClass("greenpoint");
    selectedCategory
      .children()
      .eq(index)
      .hide();
    roundOver();
    index++;
    selectedCategory
      .children()
      .eq(index)
      .show();
    $("#counter").html(6);
    $("#totalscore").html("Total Score: " + totalScore)
  }

  //Adds a red point to the score bar, makes the question disappear and a new question appear:
  function questionWrong() {
    var audio = new Audio("audiofile_uhoh.mp3");
    audio.play();
    $("#points")
      .children()
      .eq(index)
      .addClass("redpoint");
    selectedCategory
      .children()
      .eq(index)
      .hide();
    roundOver();
    index++;
    selectedCategory
      .children()
      .eq(index)
      .show();
    $("#counter").html(6);
  }

  //Checks if the answer that was clicked is the right answer or the wrong answer:
  $(".answerSet input").click(function() {
    if (
      $(this)
        .parent()
        .hasClass("correct")
    ) {
      questionRight();
    } else {
      questionWrong();
    }
  });

  //Checks if all five questions have been answered and the game is over. Then alerts the final score:
  function roundOver() {

    if (index === 4) {
      clearInterval(countDown);
      window.setTimeout(function() {
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
            "WOW! The round is over. You got " +
              counterGreen +
              " out of 5 questions right. You're a real Berliner!"
          );
        }
        if (counterRed === 1) {
          alert(
            "The round is over. You got " +
              counterGreen +
              " out of 5 questions right. Awesome. "
          );
        }
        if (counterRed === 2) {
          alert(
            "The round is over. You got " +
              counterGreen +
              " out of 5 questions right. Not bad."
          );
        }
        if (counterRed === 3) {
          alert(
            "The round is over. You got " +
              counterGreen +
              " out of 5 questions right. You should try this again."
          );
        }
        if (counterRed === 4) {
          alert(
            "The round is over. You got " +
              counterGreen +
              " out of 5 questions right. You should try this again. "
          );
        }
        if (counterRed === 5) {
          alert(
            "Oh boy. The round is over. You got " +
              counterGreen +
              " out of 5 questions right. Loser!"
          );
        }
        selectedCategory.removeClass("notyetprinted");
        $("#starttext").show();
        $("#spin").prop("disabled", false);
        x = 10;
        for (i = 0; i < points.length; i++) {
          $("#points")
            .children()
            .eq(i)
            .removeClass("greenpoint");
          $("#points")
            .children()
            .eq(i)
            .removeClass("redpoint");
          index = 0;
          ctx.resetTransform();
          wheel.draw();
          text.draw();
        }
        $("#counter").html(" ");
      }, 500);
      // clearInterval(counter);
    }
  }
};
