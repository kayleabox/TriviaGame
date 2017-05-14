window.onload = function(){
  stopwatch.start();
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var running = false;
//  Our stopwatch object.
var stopwatch = {

  time: 15,

  reset: function() {

    stopwatch.time = 15;
    //  TODO: Change the "display" div to "00:00."
    $("#display").html(stopwatch.timeConverter(stopwatch.time));

  },

  start: function() {

    if (!running){
      //  TODO: Use setInterval to start the count here.
      intervalId = setInterval(stopwatch.count, 1000);
      running = true;
    }
  },
  stop: function() {
    running = false;

    //  TODO: Use clearInterval to stop the count here.
      clearInterval(intervalId);

  },

  count: function() {
    if(stopwatch.time > 0){
      stopwatch.time--;

      var currentTime = stopwatch.timeConverter(stopwatch.time);

      $("#display").html(currentTime);
    }
    else{
      stopwatch.stop();
      stopwatch.time = 0;
      timeUp = true;
      //if player runs out of time
      if (timeUp && counter<numQuestions){
        counter++;
        numIncorrect++;
        //display a time's up message
        $("#getAnswer").css("visibility", 'hidden');
        $("#answerCheck").html("<h2>Time's up!</h2>");
        showNewQuestion();
        timeUp = false;
      }        
      else if (currentQuestion == undefined){
        stopwatch.time = 0;
      }
    }
  },

  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

    var numCorrect= 0;
    var numIncorrect= 0;

  	//get a question 
  	//make a function to select questions
    var questions = slavicCreatures;
    console.log(questions);
  	var numQuestions = questions.length;
    var counter = 0;

  	//save userAnswer
  	var userAnswer;
    //var submit = false;
    //function for submit button
    var currentQuestion= undefined; 
    var correctAnswer= undefined; 
    
    $(document).on("click","#playAgain",function(){
      $("#answerCheck").html("");
      counter = 0;
      numIncorrect = 0;
      numCorrect = 0;
      $("#getAnswer").html('<input id="userAnswer" type="text"></input>'+
        '<button id="submit" type="submit">submit</button>'+
        '<div id="display>00:15</div>');
      showNewQuestion();
      //stopwatch.reset();
      //stopwatch.start();
      $("#playAgain").remove();


    });

    function selectQuestion(){
      if (counter < numQuestions){
        currentQuestion= questions[counter][1];
        console.log(currentQuestion);
        correctAnswer= questions[counter][0].toLowerCase().replace(/\s+/g, '');
        //correctAnswer= correctAnswer.replace(/\s+/g, '');
        console.log(correctAnswer);
      }
      else{
        currentQuestion = undefined;
        correctAnswer = undefined;
      } 
    };
    
    
    selectQuestion();
    //display a question
    $("#displayQuestion").append('<p>'+ currentQuestion +'</p>');
    $("#hint").html('<img style="width:150px;" src="assets/images/slavicCreatures/'+ correctAnswer+ '.jpg">');
     
    function showNewQuestion(){
      setTimeout(function(){
        $("#getAnswer").css("visibility", "visible");
        userAnswer = undefined;
        $("#answerCheck").empty();
        selectQuestion()
        if(currentQuestion !== undefined ){
          $("#displayQuestion").html("<p>"+ currentQuestion +"</p");
          $("#userAnswer").val("");
          image = correctAnswer.toLowerCase();
          $("#hint").html('<img style="width:150px;" src="assets/images/slavicCreatures/'+ image.replace(/\s+/g, '')+ '.jpg">');
          stopwatch.reset();
          stopwatch.start();
        }
      else if (currentQuestion === undefined)
        {
          stopwatch.stop();
          $("#getAnswer").empty();
          $("#displayQuestion").empty();
          $("#display").empty();
          $("#hint").empty();
          console.log("no more questions");
          $("#answerCheck").html('<p>correct: ' +numCorrect+ '</p>' + 
            '<p>incorrect: ' +numIncorrect+ '</p>');
          $("#buttons").html('<button id="playAgain">Play Again</button>');
        }
      }, 2000);
    };


    var timeUp = false; 

  $(document).on("click", "#submit", function(){

    if (userAnswer === undefined){
      userAnswer = $("#userAnswer").val().toLowerCase().replace(/\s+/g, '');
      //userAnswer = userAnswer.toLowerCase().replace(/\s+/g, '');
    }    

  if(userAnswer !== undefined && currentQuestion !== undefined ){   
  	//check to see if userAnswer is correct
  	if(userAnswer == correctAnswer){
      counter++;
      numCorrect++;
  		//if userAnswer is correct show a congratulatory message
      $("#getAnswer").css("visibility", 'hidden');
  		$("#answerCheck").html('<h2>Way to go! You got it right!</h2>');
  	  	//use setTimeout() to wait a few seconds and display the next question
        showNewQuestion();
  	}
  	  //else if userAnswer is incorrect
    else if (userAnswer !== correctAnswer){
        counter++;
        numIncorrect++;
        //tell the player they selected the wrong option and then display the correct answer. 
        $("#getAnswer").css("visibility", 'hidden');        
        $("#answerCheck").html('<h2>Oh no! That is not the answer!</h2>');
        $("#answerCheck").append('<p>'+ correctAnswer +'</p>');
          //use setTimeout() to wait a few seconds and display the next question
          showNewQuestion();
          //stopwatch.reset();
          //stopwatch.start();
    }
    else{
        //On the final screen, display the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page
        console.log("no more questions!");
        console.log("correct= " + numCorrect);
        console.log("incorrect= " + numIncorrect);
    }
  }

}); //end of .on("click")  
