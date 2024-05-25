let regions = []

function createRegion(name)
{   
    // Put a line above the region section
    document.body.appendChild(document.createElement("hr"));
    
    // Region title
    const title = document.createElement("p");
    title.innerHTML = "Region: " + name;
    document.body.appendChild(title);

    // Make the question element and attach to html body
    const questionElementId = "question_" + name;
    const question = document.createElement("p");
    question.innerHTML = "Question";
    question.id = questionElementId;
    document.body.appendChild(question);

    // Make "yes" button, add behavior and add to html body
    const yesButton = document.createElement("button");
    yesButton.innerHTML = "Yes";
    yesButton.addEventListener("click", () => handleButtonClick(name, "yes"));
    document.body.appendChild(yesButton);
    
    // Make "no" button, add behavior and add to html body
    const noButton = document.createElement("button");
    noButton.innerHTML = "No";
    noButton.addEventListener("click", () => handleButtonClick(name, "no"));
    document.body.appendChild(noButton);
    
    // Make "dont know" button, add behavior and add to html body
    const dontknowButton = document.createElement("button");
    dontknowButton.innerHTML = "Don't know";
    dontknowButton.addEventListener("click", () => handleButtonClick(name, "dontknow"));
    document.body.appendChild(dontknowButton);


    // Add all the elements to a list for later reference
    regions.push({region: name, questionElementId:questionElementId});
}