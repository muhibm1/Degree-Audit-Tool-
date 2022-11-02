/*
* This JavaScript code will be run on the main page. This will be the code that interfaces with the entire program.
* 10/29/2022 - This document will contain all of the prototypes for the main program flow. Some of these functions
*              are called by HTML elements in the main.html. 
*/


// -- Program Objects --
let db_handler = new DBInfo();
//let pdf_parser = new PDFParser();
//let gpa_calc = new GPACalculator();
//let pdf_gen = new PDFGenerator();
//let student = new Student();

// -- Code that runs on page execution.
document.getElementById("main-body").style.opacity = 0.0;
start_page();

// --parseTranscript():--
// This function is called when a transcript is uploaded on form 1.
// Show a loading screen while this process is happening.
// It should auto-populate all of the student information and return to form 1.
function parseTranscript() {
    showLoading();
    // TODO: Parse transcript and populate student
    hideLoading();
}

// --toFromTwo():--
// This function is called when the "next" button on form 1 is pushed.
// It performs the transition to form 2.
function toFormTwo() {
    document.getElementById("formOne").style.display = "none";
    //TODO: Add information to student object.
    //TODO: Add Form Transition, populate fields in form 2
    document.getElementById("formTwo").style.display = "inherit";
}

// --toFormThree():--
// This function is called when the "next" button on form 2 is pushed.
// It performs the transition to form 3.
function toFormThree() {
    document.getElementById("formTwo").style.display = "none";
    //TODO: Add information to student object.
    //TODO: Add Form Transition, populate fields in form 3
    document.getElementById("formThree").style.display = "inherit";
}

// --backToFormOne():--
// Called from hitting the back button on form two. No need to do any more than
// than just updating visibility
function backToFormOne() {
    document.getElementById("formTwo").style.display = "none";
    document.getElementById("formOne").style.display = "inherit";
}

// --backToFormTwo():--
// Called from hitting the back button on form three. No need to do any more than
// than just updating visibility
function backToFormTwo() {
    document.getElementById("formThree").style.display = "none";
    document.getElementById("formTwo").style.display = "inherit";
}

// --submit_student_info():--
// This function is called when the "submit" buttom on form 3 is pushed.
// This calls all the functions to calculate information and generate the PDFs.
// This will transition over to the PDF viewer form of main.html once finished.
function submitStudentInfo() {
    showLoading();
    performCalculations();
    generatePDFs();
    hideLoading();
    //TODO: Transition to PDF Viewer
}

// --performCalculations():--
// This function performs all of the GPA calculations and pushes them to the student object.
// Called when submitting form 3.
function performCalculations() {
    //TODO: Call gpa calculation functions
}

// --generatePDFs():--
// This function calls the PDFGenerator functions to create PDFs from student information.
function generatePDFs() {
    //TODO: Call PDF generation functions
}

// --postDB_pageUpdate():--
// This function is used to update the page, populating form 1 with all of the information retrieved
// from the database. This is called only when all the information is returned from the database.
// Once that happens, then the page shows.
function postDB_pageUpdate() {
    var degreeSelect = document.getElementById("dtrack");
    var iter = 0;
    for(const item in db_handler.getDegreeTracks()){
        var degreeTrackName = db_handler.getDegreeTracks()[iter].name;
        var option = document.createElement("option");
        option.value = (iter+1);
        option.innerHTML = degreeTrackName;
        degreeSelect.appendChild(option);
        iter++;
    }
    var antic_grad_yr = document.getElementById("antigrad_y");
    for(let i = -10; i < 10; i++){
        var year = new Date().getFullYear() + i;
        var option = document.createElement("option");
        option.value = year;
        option.innerHTML = year;
        if(i==0){option.selected = "selected";}
        antic_grad_yr.appendChild(option);
    }
    var antic_grad_yr = document.getElementById("admit_y");
    for(let i = -20; i < 1; i++){
        var year = new Date().getFullYear() + i;
        var option = document.createElement("option");
        option.value = year;
        option.innerHTML = year;
        if(i==-4){option.selected = "selected";}
        antic_grad_yr.appendChild(option);
    }
    var falloption = document.createElement("option");
    falloption.innerHTML = "Fall";
    falloption.value = "F";
    var spoption = document.createElement("option");
    spoption.innerHTML = "Spring";
    spoption.value = "S";
    document.getElementById("admit_s").appendChild(falloption);
    document.getElementById("admit_s").appendChild(spoption);
    var falloption = document.createElement("option");
    falloption.innerHTML = "Fall";
    falloption.value = "F";
    var spoption = document.createElement("option");
    spoption.innerHTML = "Spring";
    spoption.value = "S";
    document.getElementById("antigrad_s").appendChild(falloption);
    document.getElementById("antigrad_s").appendChild(spoption);
}

// --start_page():--
// This function is called on page execution and retrieves information from the database
async function start_page() {
    await requestDegreeTracks(db_handler.getDegreeTracks());
    await requestCourses(db_handler.getCourseList());
    await requestGraduationRequirements(db_handler.getRequirements());
    postDB_pageUpdate();
    hideLoading();
    document.getElementById("main-body").style.opacity = 1.0;
    console.log(db_handler.getCourseList());
    console.log(db_handler.getDegreeTracks());
    console.log(db_handler.getRequirements());
}

// --showLoading():--
// Show the loading wheel
function showLoading() {
    loading = document.getElementById("loading");
    loading.style.zIndex = 1;
    loading.style.opacity = 1.0;
}

// --hideLoading():--
// Hide the loading wheel
function hideLoading() {
    loading = document.getElementById("loading");
    loading.style.zIndex = -2;
    loading.style.opacity = 0.0;
}

// When a transcript is uploaded, get the text from it
document.getElementById("fileupload").addEventListener("change", function(event){
    showLoading();
    var file = event.target.files[0];
    var filereader = new FileReader();
    filereader.onload = async function(){
        const buff8Arr = new Uint8Array(this.result);
        const task = pdfjsLib.getDocument(buff8Arr);
        var returntask = await task.promise.then(function(pdf) { // get all pages text
            var maxPages = pdf.numPages;
            var countPromises = []; // collecting all page promises
            for (var j = 1; j <= maxPages; j++) {
              var page = pdf.getPage(j);
              countPromises.push(page.then(function(page) { // add page promise
                var textContent = page.getTextContent();
                return textContent.then(function(text){ // return content promise
                  return text.items.map(function (s) { return s.str; }).join(''); // value page text 
                });
              }));
            }
            // Wait for all pages and join text
            return Promise.all(countPromises).then(function (texts) {
              return texts.join(' ');
            });
          });
        hideLoading();
        student = parseText(returntask);
    }
    filereader.readAsArrayBuffer(file);
});
