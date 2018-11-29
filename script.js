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
  $(".funfacts")
    .children()
    .hide();

    $("#starttext")
    .children().eq(1)
    .hide();
    $("#starttext")
    .children().eq(2)
    .hide();
    $("#starttext")
    .children().eq(3)
    .hide();
    $("#starttext")
    .children().eq(4)
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
      ctx.fillText("Kiez Clichées", 40, 10);

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

  var index = 0;
  var countDown;
  var noOfRounds = 0;

  //Shows the first question of the selected category:
  function printCategory() {
    noOfRounds+=1;
    // $("#starttext").hide();
    $("#starttext").children().hide();

    selectedCategory
      .children()
      .eq(index)
      .show();

    $("#counter").html(10);

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
    $("#counter").html(10);
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
    $("#counter").html(10);
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

        
        if (noOfRounds === 5 && totalScore === 25) {
          alert(
            "WOW! The game is over. You got " +
              totalScore +
              " out of 25 questions right. You're a real Berliner!"
          );
        }
        else if (noOfRounds === 5 && totalScore < 25 && totalScore > 17) {
          alert(
            "The game is over. You got " +
              totalScore +
              " out of 25 questions right. Awesome!"
          );
        }
        else if (noOfRounds === 5 && totalScore < 18 && totalScore > 10) {
          alert(
            "The game is over. You got " +
              totalScore +
              " out of 25 questions right. Oh boy, you should really try this again..."
          );
        }
        else if (noOfRounds === 5 && totalScore < 11) {
          alert(
            "The game is over. You got " +
              totalScore +
              " out of 25 questions right. Quite a fail."
          );
        }
        else{
        selectedCategory.removeClass("notyetprinted");
        $("#starttext").children().eq(noOfRounds).show();
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
      }
      }, 1500);
    }
  }
};
