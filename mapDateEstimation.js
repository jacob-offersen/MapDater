// mapDateEstimation.js


const gQuestionStrBeginning = "Question: ";
const gEstimatedYearStrBeginning = "Estimated Range: ";
const estimatedYearElementId = 'estimatedYears'

var range = {
    "upper": new Date().getFullYear(),
    "lower": 1850
};

var currentQuestions = {};
var currentQuestionIndex = {};
var estimationFinished = {};
var moreQuestion = {};

function pageLoaded() {
    loadRegions();
    outputCurrentEstimate();
}

function loadRegions()
{
    questions.forEach((regionQuestions) => {
        const region = regionQuestions.region;
        // Create HTML elements for region
        createRegion(region);
        // Initialize question index and status
        currentQuestionIndex[region] = -1;
        estimationFinished[region] = false;
        moreQuestion[region] = true;
        outputNextQuestion(region);
    });
}

function handleButtonClick(region, choice) {
    // Update and display new estimated range
    if (isEstimationFinished(region) == false) {
        updateRange(region, choice);
    }

    // Fetch and display next question
    if (isEstimationFinished(region) == false) {
        outputNextQuestion(region);
    }
}

function updateRange(region, choice) {
    const currentQuestion = getCurrentQuestion(region);
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
            // If there is both an upper and lower limit it is unknown which side to choose => do nothing
            if (currentQuestion.upper != "" && currentQuestion.lower != "") {
                break;
            }
            // If the question does not have an upper range that means it is true to this present day
            // That means the range is within the time of the question.
            if (currentQuestion.upper == "" && range.upper > currentQuestion.lower) {
                range.upper = currentQuestion.lower;
            }
            // If the question does not have a lower range that means it was true before 1900 but is no more
            // That means the range is within the time of the question
            if (currentQuestion.lower == "" && range.lower < currentQuestion.upper) {
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
        writeToQuestionField(region, "Invalid range. Restart the date estimation.");
        finishEstimation(region);

    } else if (range.lower == range.upper) {
        // If the limits are the same the range as reached a single year. End the estimation
        writeToEstimateField(range.lower);
        finishEstimation(region);

    } else {
        // The estimation can be improved keep going
        outputCurrentEstimate();
    }
}

function getCurrentQuestion(region)
{
    return currentQuestions[region]; 
}

function getNextQuestion(region) {
    let question = []
    currentQuestionIndex[region] = currentQuestionIndex[region] + 1;
    const regionQuestions = getQuestionsForRegion(region);
    if (currentQuestionIndex[region] != regionQuestions.length) {
        // Extract the new question
        question = regionQuestions[currentQuestionIndex[region]];
    } else {
        // There are no more questions
        setNoMoreQuestions(region);
    }
    return question;
}

function getQuestionsForRegion(region)
{
    let returnQuestions;
    questions.forEach((regionQuestions) => {
        if(region == regionQuestions.region)
            {
                returnQuestions = regionQuestions.questions;
            }
    });
    return returnQuestions;
}

function outputNextQuestion(region) {
    // Get next question
    const question = getNextQuestion(region);
    currentQuestions[region] = {
        question: question[questionIndex],
        lower: question[lowerIndex],
        upper: question[upperIndex]
    };
    if (isMoreQuestionsAvailable(region)) {
        // Display new question
        writeToQuestionField(region, gQuestionStrBeginning + currentQuestions[region].question);
    } else {
        // There are no more questions to ask. The estimation cannot be further improved. End the estimation.
        writeToQuestionField(region, "No more questions.");
        finishEstimation(region);
    }
}

function setNoMoreQuestions(region)
{
    moreQuestion[region] = false;
}

function isMoreQuestionsAvailable(region)
{
    return moreQuestion[region];
}

function finishEstimation(region)
{
    estimationFinished[region] = true;
}

function isEstimationFinished(region)
{
    return estimationFinished[region];
}

function outputCurrentEstimate() {
    writeToEstimateField(gEstimatedYearStrBeginning + range.lower + "-" + range.upper);
}

function writeToEstimateField(string) {
    const estimatedYearsOutput = document.getElementById(estimatedYearElementId);
    estimatedYearsOutput.textContent = string
}

function writeToQuestionField(region, string) {
    regions.forEach((regionElement) => {
        if(region == regionElement.region)
            {
                const questionOutput = document.getElementById(regionElement.questionElementId);
                questionOutput.textContent = string;
                return;
            }
    });
}