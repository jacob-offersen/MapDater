// mapDateEstimation.js


const gQuestionStrBeginning = "Question: ";
const gEstimatedYearStrBeginning = "Estimated Range: ";

const questionElementId = 'question'
const estimatedYearElementId = 'estimatedYears'

var range = {
    "upper": new Date().getFullYear(),
    "lower": 1900
};

var currentQuestion;
var currentQuestionIndex;
var estimationFinished;
var noMoreQuestion;

function pageLoaded() {
    currentQuestionIndex = -1;
    estimationFinished = false;
    noMoreQuestion = false;
    outputNextQuestion();
    outputCurrentEstimate();
}

function handleButtonClick(choice) {
    // Update and display new estimated range
    if (estimationFinished == false) {
        updateRange(choice);
    }

    // Fetch and display next question
    if (estimationFinished == false) {
        outputNextQuestion();
    }
}

function updateRange(choice) {
    // The goal of this estimate is to lower the upper limit as much as possible 
    // and increase the lower limit as mich as possible. This will reduce the range as much as possible.
    switch (choice) {
        case 'yes':
            // Check if the lower limit can be increased
            if (currentQuestion.lower != "" && currentQuestion.lower > range.lower) {
                range.lower = currentQuestion.lower;
            }
            // Check if the upper limit can be decreased
            if (currentQuestion.upper != "" && currentQuestion.upper < range.upper) {
                range.upper = currentQuestion.upper;
            }
            break;
        case 'no':
            // If the question does not have an upper range that means it is true to this present day
            // That means the range is within the time of the question.
            if (currentQuestion.upper != "" && range.upper > currentQuestion.lower) {
                range.upper = currentQuestion.lower;
            }
            // If the question does not have a lower range that means it was true before 1900 but is no more
            // That means the range is within the time of the question
            if (currentQuestion.lower != "" && range.lower < currentQuestion.upper) {
                range.lower = currentQuestion.upper;
            }
            break;
        case 'dontknow':
            break;
        default:
            break;
    }

    if (range.lower > range.upper) {
        // If the upper limit is lower than the lower limit, something is wrong. End the estimation
        writeToQuestionField("Invalid range. Restart the date estimation.");
        estimationFinished = true;

    } else if (range.lower == range.upper) {
        // If the limits are the same the range as reached a single year. End the estimation
        writeToEstimateField(range.lower);
        estimationFinished = true;
    } else {
        // The estimation can be improved keep going
        outputCurrentEstimate();
    }
}

function getNextQuestion() {
    question = []
    currentQuestionIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex != questions.length) {
        // Extract the new question
        question = questions[currentQuestionIndex]
    } else {
        // There are no more questions
        noMoreQuestion = true;
    }
    return question;
}

function outputNextQuestion() {
    // Get next question
    const question = getNextQuestion();
    currentQuestion = {
        question: question[questionIndex],
        lower: question[lowerIndex],
        upper: question[upperIndex]
    };
    if (false == noMoreQuestion) {
        // Display new question
        writeToQuestionField(gQuestionStrBeginning + currentQuestion.question);
    } else {
        // There are no more questions to ask. The estimation cannot be further improved. End the estimation.
        writeToQuestionField("No more questions. Estimation cannot be improved.");
        estimationFinished = true;
    }
}

function outputCurrentEstimate() {
    writeToEstimateField(gEstimatedYearStrBeginning + range.lower + "-" + range.upper);
}

function writeToEstimateField(string) {
    const estimatedYearsOutput = document.getElementById(estimatedYearElementId);
    estimatedYearsOutput.textContent = string
}

function writeToQuestionField(string) {
    const questionOutput = document.getElementById(questionElementId);
    questionOutput.textContent = string;
}