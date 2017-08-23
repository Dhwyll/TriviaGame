// Trivia Game Javascript



$(document).ready(function(){

	// Set up the question array

	var questionList = [
		{
			question: "The first thing Doctor said to Rose was:",
			answer0: ["Run!", "correct"],
			answer1: ["Fantastic!", "incorrect"],
			answer2: ["Autons!", "incorrect"],
			answer3: ["Hello!", "incorrect"],
			wrong: "assets/images/angels.gif",
			right: "assets/images/allonsy.gif"
		},
		{
			question: "Which TV show is not broadcast from Satellite Five?",
			answer0: ["Eastenders", "correct"],
			answer1: ["What Not to Wear", "incorrect"],
			answer2: ["The Weakest Link", "incorrect"],
			answer3: ["Big Brother", "incorrect"],
			wrong: "assets/images/dalek.gif",
			right: "assets/images/baker.gif"
		},
		{
			question: "What was the name of the restaurant run by the Clockwork Droids?",
			answer0: ["Mancini", "correct"],
			answer1: ["Codardo's", "incorrect"],
			answer2: ["Nando's", "incorrect"],
			answer3: ["Bella", "incorrect"],
			wrong: "assets/images/donotwant.gif",
			right: "assets/images/cheers.gif"
		},
		{
			question: "What rank did Danny Pink have when he was in the Army?",
			answer0: ["Sergeant", "correct"],
			answer1: ["Major", "incorrect"],
			answer2: ["Lieutenant", "incorrect"],
			answer3: ["Private", "incorrect"],
			wrong: "assets/images/forgive.gif",
			right: "assets/images/fantastic.gif"
		},
		{
			question: "What circuit is broken in the Tardis, leaving it stuck as a Police Box?",
			answer0: ["Chameleon", "correct"],
			answer1: ["Protean", "incorrect"],
			answer2: ["Changeling", "incorrect"],
			answer3: ["Cloaking", "incorrect"],
			wrong: "assets/images/shake.gif",
			right: "assets/images/santa.gif"
		},
		{
			question: "How many times has the Doctor been married?",
			answer0: ["Three", "correct"],
			answer1: ["One", "incorrect"],
			answer2: ["Two", "incorrect"],
			answer3: ["Four", "incorrect"],
			wrong: "assets/images/nope.gif",
			right: "assets/images/smile.gif"
		},
		{
			question: "Where does Donna Noble work?",
			answer0: ["H.C. Clements", "correct"],
			answer1: ["H.C. Clemmons", "incorrect"],
			answer2: ["H.A. Carmens", "incorrect"],
			answer3: ["H.D. Callwins", "incorrect"],
			wrong: "assets/images/squee.gif",
			right: "assets/images/brilliant.gif"
		},
	]

	


	
	// These four set the hover actions for the answers
	
	$("#answerText-0").hover(function(){
		$("#answerText-0").addClass('active');
	},function(){
		$("#answerText-0").removeClass('active');
	});

	$("#answerText-1").hover(function(){
		$("#answerText-1").addClass('active');
	},function(){
		$("#answerText-1").removeClass('active');
	});

	$("#answerText-2").hover(function(){
		$("#answerText-2").addClass('active');
	},function(){
		$("#answerText-2").removeClass('active');
	});

	$("#answerText-3").hover(function(){
		$("#answerText-3").addClass('active');
	},function(){
		$("#answerText-3").removeClass('active');
	});



	var totalQuestions = Object.keys(questionList).length;								// Total number of quesions

	
	function startGame() {
		
		var currQuestionNum = 0;															// Which question are we on?
		var numCorrect = 0;																	// Number of correct answers
		var numWrong = 0;																	// Number of wrong answers
		var notAnswered = 0;																// Number of unanswered questions
		var questionOrder = [];																// Question Order array
		var i = 0, j = 0, q = 0;															// Counter variables i and j
		
		var answerOrder = [];
		
		
		while (i < questionList.length) {													// While we still need to fill out the question order
			j = Math.floor(Math.random() * questionList.length);							// Generate a random number between 0 and questionList.length - 1;
			if (questionOrder.indexOf(j) === -1) {											// If that random number is not in the questionOrder array,
				questionOrder.push(j);														// Push it onto the end
				i++;																		// Increment i
			}
		}

		//  Set answerTime counter to 30.
		var answerLength = 10;
		var answerTime = answerLength;

		//  Variable that will hold our interval ID when we execute
		//  the "run" function
		var intervalID;
	
		function runTimer() {
			stopTimer();
			intervalID = setInterval(decrement, 1000);
		}
	
		function stopTimer() {

			clearInterval(intervalID);											// Clear the interval
			$("#timeLeft").html(answerLength + " seconds left");								// Reset the timer display
		}

	
		//  The decrement function.
		function decrement() {

			//  Decrease answerTime by one.
			answerTime--;
		
			//  Once answerTime hits zero...
			if (answerTime === 0) {

				//  ...run the stop function.
				stopTimer();													// Kill the timer
				notAnswered++;													// Increment number Unanswered Questions
				$("#timeLeft").html(answerLength + " seconds left");			// Reset the seconds display
				answerWrong();
				
			}
			//  Otherwise, display the time remaining
				else if (answerTime === 1) {
					$("#timeLeft").html(answerTime + " second left");
				}
					else {
						$("#timeLeft").html(answerTime + " seconds left");
					}

		
		}


		
		function giveQuestion() {
			if (currQuestionNum < totalQuestions) {
				currQuestionQuestion = questionList[questionOrder[currQuestionNum]].question;			// Get the question from the question list that matches the
																										// question order of the current question number
				$("#questionText").html(currQuestionQuestion);											// Display the current question's Question

				randomizeAnswers();																		// Randomize the answer order
				answerOrder.forEach(grabAnswer)															// And display the answers
				answerTime = answerLength;
				stopTimer();
				runTimer();
			}
		}

		function randomizeAnswers() {
			var i = 0, j = 0;
			answerOrder = [];																			// Clear Answer Order Array
			
			while (i < 4) {
				j = Math.floor(Math.random() * 4);
				if (answerOrder.indexOf(j) === -1) {
					answerOrder.push(j);
					i++;
				}
			}
		}
		
		function grabAnswer(answerNum, index) {
			
			var thisAnswer = questionList[questionOrder[currQuestionNum]]["answer"+answerNum][0];				// Get this question's answer based off its order
			var thisAnswerTrue = questionList[questionOrder[currQuestionNum]]["answer"+answerNum][1];			// Get this question's truth based off its order
			$("#answerText-"+index).html(thisAnswer);															// Set the answer in the right slot
			if ( $("#answerText-" + index).hasClass("correct")) {												// If class includes correct
				$("#answerText-" + index).removeClass("correct");												// Clear the correct class
			}
				else {																							// Otherwise
					$("#answerText-" + index).removeClass("incorrect");											// Clear the incorrect class
				}
			$("#answerText-" + index).addClass(thisAnswerTrue);													// Add the answer's truth value to the class list
		}
		
		function endGame() {
			stopTimer();																						// Just in case you end on a timeout
			$("#timeLeft").css("display","none");																// Hide Time Left section
			$("#gameSection").css("display", "none");															// Hide the Question Section
			$("#gameOver").css("display", "block");																// Show Game Over
			$("#secondLine").html("Correct Answers: " + numCorrect);											// How many right
			$("#thirdLine").html("Incorrect Answers: " + numWrong);												// How many wrong
			$("#fourthLine").html("Unanswered Questions: " + notAnswered);										// How many unanswered
			$("#fifthLine").click(function() {																	// Restart Game
				currQuestionNum = 0;
				startGame();
			});
		}
		
		function answerRight() {
			numCorrect++;																				// Increment Number of Correct answers
			$("#gameSection").css("display", "none");													// Hide the Game Section
			$("#correctAnswer").css("display","block");													// Display the Correct Answer Section
			$("#correctAnswerText").html("Correct!");													// Set the Correct Answer to "Correct!"
			$("#correctAnswerImage").attr("src", questionList[questionOrder[currQuestionNum]].right);	// Set the Correct Answer Image
			setTimeout(function() {																		// Wait...
				$("#correctAnswer").css("display", "none");													// Hide the Correct Answer Section
				$("#gameSection").css("display", "block");													// Display the Game Section
				currQuestionNum++;																			// Increment the current Question Number
				if (currQuestionNum === totalQuestions) {													// If out of questions
					endGame();																				// Do the end game thing
				}
					else {																					// Otherwise
						giveQuestion();																		// Give the next question
					}
			}, 3000);																					// ...after three seconds pass

		}
		
		function answerWrong() {
			$("#gameSection").css("display", "none");																				// Hide the Game Section
				$("#correctAnswer").css("display","block");																			// Display the Correct Answer Section
				$("#correctAnswerText").html("The correct answer is " + questionList[questionOrder[currQuestionNum]].answer0[0]);	// Set the Correct Answer
				$("#correctAnswerImage").attr("src", questionList[questionOrder[currQuestionNum]].wrong);							// Set the Correct Answer Image
				setTimeout(function(){																						// Wait...
					$("#correctAnswer").css("display", "none");																	// Hide the Correct Answer Section
					$("#gameSection").css("display", "block");																	// Display the Game Section
					currQuestionNum++;																							// Increment the current Question Number
					if (currQuestionNum === totalQuestions) {																	// If out of questions
						endGame();																								// Do the end game thing
					}
						else {																									// Otherwise
							giveQuestion();																						// Give the next question
						}
			}, 3000);																										// ...after three seconds pass
		}
		
		
		// The running of the game
		
		$("#clickToStart").css("display", "none");					// Hide Click to Start
		$("#triviaTitle").css("display", "block");					// Display Title
		$("#timeLeft").css("display","block");						// Display Time Left section
		$("#gameSection").css("display", "block");					// Display Game Section
		$("#gameOver").css("display", "none");						// Hide Game Over
		
		giveQuestion();

		$("#answerText-0").on("click", function() {
			if ( $("#answerText-0").hasClass("correct")) {										// If the first answer is marked as correct
				answerRight();
			}
				else {
					numWrong++;																	// Increment Number of Wrong answers here so that timeout doesn't trigger
					answerWrong();
				}
		});

		$("#answerText-1").on("click", function() {
			if ( $("#answerText-1").hasClass("correct")) {										// If the second answer is marked as correct
				answerRight();
			}
				else {
					numWrong++;																	// Increment Number of Wrong answers here so that timeout doesn't trigger
					answerWrong();
				}
		});

		$("#answerText-2").on("click", function() {
			if ( $("#answerText-2").hasClass("correct")) {
				answerRight();
			}
				else {
					numWrong++;																	// Increment Number of Wrong answers here so that timeout doesn't trigger
					answerWrong();
				}
		});

		$("#answerText-3").on("click", function() {
			if ( $("#answerText-3").hasClass("correct")) {
				answerRight();
			}
				else {
					numWrong++;																	// Increment Number of Wrong answers here so that timeout doesn't trigger
					answerWrong();
				}
		});

		
	}

	
	$("#clickToStart").click(function() {
		startGame();
	});
	
// Prep the game

$("#clickToStart").css("display", "block");						// Display Click to Start
$("#triviaTitle").css("display", "none");						// Hide Title
$("#gameOver").css("display", "none");							// Hide Game Over
$("#correctAnswer").css("display", "none");						// Hide Title
$("#gameSection").css("display", "none");						// Hide Game Section


});