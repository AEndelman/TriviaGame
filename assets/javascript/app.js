//sets up game and initial vars
$("#start").click(askQuestion);

//insert inbetween with correct or incorrect and timed... maybe giphy link

$("#triviaName").append("FRUITY TRIVIA GAME!")
$("#timer").hide();

var correct = 0;
var incorrect = 0;
var questionsLeft = 10;
var setSlideshow;
var timerInterval;
var timer = 15;


//Sets up all the questions as an object then within them every question as an object array

var allQuestions = [
    {
        question: "A helicopter is used to dry out this fruit after a rainy day, to prevent it from splitting open...",
        correct: "Cherry",
        incorrect: "Banana",
        incorrecter: "Tomato",
        incorrectest: "Plum",
    }, {
        question: "There is a national _____ reserve, in case supply exceeds demand for this dried berry.",
        correct: "Raisin",
        incorrect: "Goji Berry",
        incorrecter: "Blueberry",
        incorrectest: "Cranberry"
    }, {
        question: "The word for the color orange wasn’t created until 1542, and was a combination of these two names for the fruit.",
        correct: "Naranj and narang",
        incorrect: "Orani and Nange",
        incorrecter: "Onge and Norgj",
        incorrectest: "Nrang and Orge"

    }, {
        question: "Farmer’s pick this fruit before it is ready, then use technology to trick it into ripening before hitting the shelves.",
        correct: "Banana",
        incorrect: "Apples",
        incorrecter: "Avocado",
        incorrectest: "Mango"

    }, {
        question: "In 45 A.D., this fruit was originally called “ida” after the mountain it was grown on.",
        correct: "Raspberry",
        incorrect: "Apricot",
        incorrecter: "Pomegranate",
        incorrectest: "Dragonfruit"

    }, {
        question: "There are over 700 varieties of peaches in the world, but peaches are the most respected and admired in this country.",
        correct: "China",
        incorrect: "Canada",
        incorrecter: "USA",
        incorrectest: "Belgium"

    }, {
        question: "What is the most-consumed fruit in the world?",
        correct: "Mangos",
        incorrect: "Bananas",
        incorrecter: "Nectarines",
        incorrectest: "Tomatoes"

    }, {
        question: "What are the small edible pieces of the pomegranate called?",
        correct: "Arils",
        incorrect: "Pips",
        incorrecter: "Cheeks",
        incorrectest: "Donsils"
    }, {
        question: "Which fruit has the highest oil content?",
        correct: "Olive",
        incorrect: "Avocado",
        incorrecter: "Plum",
        incorrectest: "Lychee"
    }, {
        question: "Every year there are, on average, there are how many banana-related accidents?",
        correct: "300",
        incorrect: "20",
        incorrecter: "7",
        incorrectest: "120"
    }];

function askQuestion() {
    timer = 15;
    clearInterval(setSlideshow);
    clearInterval(timerInterval);
    $("#start").hide();
    $("#triviaName").empty();
    $("#start").empty();
    $("#answerButtons").empty();
    $("#question").empty();
    $("#scoreSheet").empty();
    $("#images").empty();
    $("#timer").show();
    //creates the timer count for question
    runTimeOut();

    //Chooses a random question from the array and assigns it to questionChoice to later be accessed in for loop to create buttons

    var questionChoice = allQuestions[Math.floor(Math.random() * allQuestions.length)];

    //checks to see if question has been asked already, if so then retrieves new question...

    if ('question' in questionChoice) {

        //Pulls the value of the question and assigns it to a variable

        var currentQuestionString = questionChoice.question;

        //pulls value of answer for the giphy (if so chosen)
        var correctAnswerString = questionChoice.correct;

        // removes question from the object after reassigning and puts as header

        $("#question").append(currentQuestionString);
        delete questionChoice.question;

        //Figures the number of possible questions based on the object number and subtracting the question

        var possibleAnswers = (Object.keys(questionChoice).length);

        //redistributes correct and incorrect
        var allButtons = [];

        //create a correct button

        var correctAnswer = questionChoice.correct;
        var correctButton = $("<button>");
        correctButton.addClass("answerButton");
        correctButton.attr("data-result", true);
        correctButton.text(correctAnswer);
        allButtons.push(correctButton);
        $("#answerButtons").append(correctButton);

        //create wrong buttons

        var wrongAnswers = [];
        wrongAnswers.push(questionChoice.incorrect);
        wrongAnswers.push(questionChoice.incorrecter);
        wrongAnswers.push(questionChoice.incorrectest);

        //creates incorrect buttons

        for (i = 0; i < wrongAnswers.length; i++) {
            var wrongButton = $("<button>");
            wrongButton.addClass("answerButton");
            wrongButton.attr("data-result", false);
            wrongButton.text(wrongAnswers[i]);
            allButtons.push(wrongButton);
            $("#answerButtons").append(wrongButton);
        }

        console.log(allButtons);

        //randomizes all buttons for append

        for (j = 0; j < allButtons.length; j++) {
            var buttonChoice = allButtons[Math.floor(Math.random() * allButtons.length)];
            $("#answerButtons").append(buttonChoice);
        }

        // figures if button choice is wrong or right and alerts

        $("button.answerButton").on("click", function () {

            var result = $(this).attr("data-result");

            if (result === "true") {
                delete questionChoice;
                showCorrectResult();

            }

            else if (result === "false") {
                delete questionChoice;
                showIncorrectResult();
            }
        });

    }

    else {
        triviaCont();
    }

}


// function to call score screen then another question if still questions or end game

function triviaCont() {
    if (questionsLeft > 0) {
        askQuestion();
    }

    else if (questionsLeft == 0) {
        gameOver();
        console.log(questionsLeft);
    }

    //should be slideshow loop then next question or if no questions left game over score...
}

function timeOut() {
    clearInterval(timerInterval);
    delete questionChoice;
    showIncorrectResult();
}

function showCorrectResult() {
    $("#answerButtons").empty();
    $("#question").empty();
    $("#timer").hide();
    getGiphy();
    correct++;
    questionsLeft--;
    $("#triviaName").append("CORRECT")
    console.log(questionsLeft);

    //checks if game over or repeat

    if (questionsLeft > 0) {
        //  (append scoresheet to show applause and scoresheet)
        clearInterval(setSlideshow);
        clearInterval(timerInterval);
        setSlideshow = setInterval(askQuestion, 4000);
    }

    else if (questionsLeft == 0) {
        gameOver();
    }

}

function showIncorrectResult() {
    $("#answerButtons").empty();
    $("#question").empty();
    $("#timer").hide();
    getGiphy();
    questionsLeft--;
    incorrect++;
    $("#triviaName").append("INCORRECT")
    console.log(questionsLeft);


    if (questionsLeft > 0) {
        //  (append scoresheet to show boo and scoresheet)
        clearInterval(setSlideshow);
        clearInterval(timerInterval);
        setSlideshow = setInterval(askQuestion, 4000);

    }

    else if (questionsLeft == 0) {
        $("#images").empty();
        $("#images").hide();
        gameOver();
    }

}

//creates giphy for correct answer

function getGiphy() {

var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=fruits";

// Perfoming an AJAX GET request to our queryURL
$.ajax({
  url: queryURL,
  method: "GET"
})

// After the data from the AJAX request comes back
  .then(function(response) {

  // Saving the image_original_url property
    var imageUrl = response.data.image_original_url;

    // Creating and storing an image tag
    var fruitImage = $("<img>");

    // Setting the catImage src attribute to imageUrl
    fruitImage.attr("src", imageUrl);
    fruitImage.attr("alt", "fruit image");

    // Prepending the catImage to the images div
    $("#images").prepend(fruitImage);
  });

}

function runTimeOut () {
    clearInterval(timerInterval);
    timerInterval = setInterval(decrement, 1000);
};

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    timer--;

    //  Show the number in the #timer tag.
    $("#timer").text("00:" + timer );
    console.log(timer);


    //  Once number hits zero...
    if (timer === 0) {

        //  ...run the stop function.
        clearInterval(setSlideshow);
        clearInterval(timerInterval);
        timeOut();

    };
};

function gameOver() {
    clearInterval(setSlideshow);
    clearInterval(timerInterval);
    $("#triviaName").empty();
    $("#answerButtons").empty();
    $("#question").empty();
    $("#timer").show();
    $("#triviaName").append("Results")
    $("#question").append("Correct:  " + correct +  "<br>" + " Incorrect: " + incorrect);
    $("#timer").text("Refresh To Play Again!")

}