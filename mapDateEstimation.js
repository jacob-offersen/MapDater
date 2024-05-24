// mapDateEstimation.js


const gQuestionStrBeginning = "Question: ";
const gEstimatedYearStrBeginning = "Estimated Range: ";

const questionElementId = 'question'
const estimatedYearElementId = 'estimatedYears'

var range = {
    "upper": 3000,
    "lower": 0
};

var currentQuestion;
var currentQuestionIndex;

function pageLoaded() {
    const questionOutput = document.getElementById(questionElementId);
    const estimatedYearsOutput = document.getElementById(estimatedYearElementId);
    currentQuestionIndex = 0;
    currentQuestion = getNextQuestion();
    questionOutput.textContent = gQuestionStrBeginning + currentQuestion.question;
    estimatedYearsOutput.textContent = gEstimatedYearStrBeginning;
}

function updateRange(choice) {

    switch (choice) {
        case 'yes':
            if (currentQuestion.lower != "" && currentQuestion.lower > range.lower) {
                range.lower = currentQuestion.lower;
            }
            if (currentQuestion.upper != "" && currentQuestion.upper < range.upper) {
                range.upper = currentQuestion.upper;
            }
            break;
        case 'no':
            break;
        case 'dontknow':
            break;
        default:
            break;
    }

    outputCurrentEstimate();
}


function outputCurrentEstimate() {
    const estimatedYearsOutput = document.getElementById(estimatedYearElementId);
    estimatedYearsOutput.textContent = gEstimatedYearStrBeginning + range.lower + "-" + range.upper;
}

function getNextQuestion() {
    currentQuestionIndex = currentQuestionIndex + 1;
    return questions[currentQuestionIndex];
}

function outputNextQuestion() {
    const questionOutput = document.getElementById(questionElementId);
    currentQuestion = getNextQuestion();
    questionOutput.textContent = gQuestionStrBeginning + currentQuestion.question;
}

function handleButtonClick(choice) {
    updateRange(choice);
    outputNextQuestion();
}