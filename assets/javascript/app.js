//create a timer and have it run down
//insert inbetween with correct or incorrect and timed... maybe giphy link

var correct = 0;
var incorrect = 0;
var questionsLeft = 8;

//Sets up all the questions as an object then within them every question as an object array

var allQuestions = [
    {
        question: "The sky is what color?",
        correct: "Blue",
        incorrect: "Red",
        incorrecter: "Green",
        incorrectest: "Orange",
    }, {
        question: "Which of the following is a fruit?",
        correct: "Banana",
        incorrect: "Gas",
        incorrecter: "Computer",
        incorrectest: "Hair"
    }, {
        question: "How many fingers does a normal human have?",
        correct: "10",
        incorrect: "5",
        incorrecter: "0",
        incorrectest: "Most of them"

    }, {
        question: "All roads lead to?",
        correct: "Rome",
        incorrect: "Roam",
        incorrecter: "Sadness",
        incorrectest: "Yo Mama"

    }, {
        question: "Rinse, Lather, ____?",
        correct: "Repeat",
        incorrect: "Flush",
        incorrecter: "Hold your horses",
        incorrectest: "Who cares?"

    }, {
        question: "What color are lemons?",
        correct: "Yellow(ish)",
        incorrect: "Green(ish)",
        incorrecter: "Purple(ish)",
        incorrectest: "Brown"

    }, {
        question: "In what year did America first reach the moon?",
        correct: "1969",
        incorrect: "1971",
        incorrecter: "500",
        incorrectest: "2090"

    }, {
        question: "2+2 equals?",
        correct: "4",
        incorrect: "22",
        incorrecter: "5",
        incorrectest: "0"
    }];

console.log(allQuestions);
askQuestion();

function askQuestion() {

    $("#answerButtons").empty();
    $("#question").empty();

    //Chooses a random question from the array and assigns it to questionChoice to later be accessed in for loop to create buttons

    var questionChoice = allQuestions[Math.floor(Math.random() * allQuestions.length)];

    console.log(questionChoice);

    //checks to see if question has been asked already, if so then retrieves new question...

    if ('question' in questionChoice) {

        //Pulls the value of the question and assigns it to a variable

        var currentQuestionString = questionChoice.question;
        console.log(currentQuestionString);

        // removes question from the object after reassigning and puts as header

        $("#question").append(currentQuestionString);

        delete questionChoice.question;
        console.log(questionChoice);

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

        console.log(correctAnswer);
        console.log(wrongAnswers);

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
            console.log(buttonChoice);
        }

        // figures if button choice is wrong or right and alerts

        $("button.answerButton").on("click", function () {

            var result = $(this).attr("data-result");
            console.log(result);

            if (result === "true") {
                alert("Correct!");
                correct++;
                console.log(correct);
                questionsLeft--;
                delete questionChoice;
                triviaCont();

            }

            else if (result === "false") {
                alert("Wrong!");
                incorrect++;
                console.log(incorrect);
                questionsLeft--;
                delete questionChoice;
                triviaCont();
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

    else {
        $("#answerButtons").empty();
        $("#question").empty();

        document.write("Game Over! Correct: " + correct + " and Incorrect: " +incorrect);
    }

    //should be slideshow loop then next question or if no questions left game over score...
}