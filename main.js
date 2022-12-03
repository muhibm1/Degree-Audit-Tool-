/*
* This JavaScript code will be run on the main page. This will be the code that interfaces with the entire program.
* 10/29/2022 - This document will contain all of the prototypes for the main program flow. Some of these functions
*              are called by HTML elements in the main.html. 
*/


// -- Program Objects --
let db_handler = new DBInfo();
let gpa_calc = new GPA_Calculator();
let audit_gen = new Audit_Report();
let degree_gen = new Degree_Plan();
let student = new Student("--", "--", "--", "--");

// -- Code that runs on page execution.
document.getElementById("main-body").style.opacity = 0.0;
start_page();

// --toFromTwo():--
// This function is called when the "next" button on form 1 is pushed.
// It performs the transition to form 2.
function toFormTwo() {
    document.getElementById("formOne").style.display = "none";
    student.setName(document.getElementById("sname").value);
    student.setSID(document.getElementById("sid").value);
    student.setDegreeTrackID(document.getElementById("dtrack").value);
    student.setAdmittedSemester(document.getElementById("admit_y").value + document.getElementById("admit_s").value);
    student.setAnticipatedGraduation(document.getElementById("antigrad_y").value + document.getElementById("antigrad_s").value);
    populateFormTwo();
    document.getElementById("formTwo").style.display = "inherit";
}

function populateFormTwo(){
    let degree = db_handler.getDegreeTracks()[student.getDegreeTrackID()-1];
    let level_courses = degree['level_courses'];
    let core_courses = degree['req_courses'];
    level_courses.forEach(courseID => {
        let list_item = document.createElement('p');
        list_item.innerHTML = courseID;
        list_item.classList.add("drag_item");
        list_item.draggable = "true";
        document.getElementById("student_level_container").append(student.getLevelCoursesTaken());
        console.log(student.getLevelCoursesTaken());
        document.getElementById("degree_level_container").append(list_item);
        add_drag_evt(list_item);
    });
    core_courses.forEach(courseID => {
        let list_item = document.createElement('p');
        list_item.innerHTML = courseID;
        list_item.classList.add("drag_item");
        list_item.draggable = "true";
        document.getElementById("student_required_container").append(student.getCoreCoursesTaken());
        //console.log(student.getCoreCoursesTaken());
        document.getElementById("degree_required_container").append(list_item);
        add_drag_evt(list_item);
    });
    addDropEvt(document.getElementById("student_level_container"));
    addDropEvt(document.getElementById("student_required_container"));
    addDropEvt(document.getElementById("degree_level_container"));
    addDropEvt(document.getElementById("degree_required_container"));
    event.preventDefault();
}

function add_drag_evt(p){
    p.addEventListener('dragstart', function(){
        p.classList.add('dragging');
        p.id = "dragging";
    });
    p.addEventListener('dragend', function(){
        p.classList.remove('dragging');
        p.id="";
    });
}

function addDropEvt(container){
    container.addEventListener("dragover", function(event){
        let item = document.getElementById("dragging");
        container.appendChild(item);
    });
}

function entryKeyPress(event, parent, input){
    if (event.key === "Enter") {
        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = "CSXXXX";
        newInput.id = "elective_courseEntry";
        newInput.className = "courseEntry";
        newInput.autocomplete = "off";
        newInput.addEventListener("keydown", function(event){ entryKeyPress(event, parent, newInput); });
        parent.appendChild(newInput);
        newInput.focus();
    }
    if (event.key === "Backspace") {
        if(input.value == "" && parent.childNodes.length > 3){
            parent.removeChild(input);
            parent.lastElementChild.focus();
            event.preventDefault();
        }
    }
}

// --toFormThree():--
// This function is called when the "next" button on form 2 is pushed.
// It performs the transition to form 3.
function toFormThree() {
    document.getElementById("formTwo").style.display = "none";
    for (const node of document.getElementById("student_level_container").children){
        var courseID = node.innerHTML;
        student.addLevelCourseTaken(courseID);
        student.addLevelCourseGrade(0.000);
        student.addLevelCourseAttribute(0);
        student.addCourseTaken(courseID);
        student.addCourseGrade(0.000);
        student.addCourseAttribute(0);
    }
    for (const node of document.getElementById("student_required_container").children){
        var courseID = node.innerHTML;
        student.addCoreCourseTaken(courseID);
        student.addCoreCourseGrade(0.000);
        student.addCoreCourseAttribute(0);
        student.addCourseTaken(courseID);
        student.addCourseGrade(0.000);
        student.addCourseAttribute(0);
    }
    for (const node of document.getElementById("elective_entry").children){
        if(node.value != ""){
            var courseID = node.value;
            student.addElectiveCourseTaken(courseID);
            student.addElectiveCourseGrade(0.000);
            student.addElectiveCourseTaken(0);
            student.addCourseTaken(courseID);
            student.addCourseGrade(0.000);
            student.addCourseAttribute(0);
        }
    }
    for (const node of document.getElementById("other_entry").children){
        if(node.value != ""){
            var courseID = node.value;
            student.addCourseTaken(courseID);
            student.addCourseGrade(0.000);
            student.addCourseAttribute(0);
        }
    }
    populateFormThree();
    document.getElementById("formThree").style.display = "inherit";
}

function populateFormThree(){
    var c_id = 0;
    for(const course in student.getCoursesTaken()){
        var newRow = document.getElementById("form3-table").insertRow();
        var IDCell = newRow.insertCell();
        var courseID = student.getCoursesTaken()[c_id];
        IDCell.innerHTML = courseID;
        var gradeCell = newRow.insertCell();
        grade_sel = addGradeSelector(c_id);
        gradeCell.append(grade_sel);
        var attrCell = newRow.insertCell();
        attr_sel = addAttributeSelector(c_id);
        attrCell.append(attr_sel);
        var semCell = newRow.insertCell();
        sem_y_sel = addSemesterYRSelector(c_id);
        semCell.append(sem_y_sel);
        sem_sm_sel = addSemesterSMSelector(c_id);
        semCell.append(sem_sm_sel);
        c_id += 1;
    }
}

function addGradeSelector(id){
    var grade_selector = document.createElement("select");
    grade_selector.className = "form3_selector";
    grade_selector.id = id;
    var A = document.createElement("option");
    A.innerHTML = "A";
    A.value = 4.000;
    var Am = document.createElement("option");
    Am.innerHTML = "A-";
    Am.value = 3.670;
    var Bp = document.createElement("option");
    Bp.innerHTML = "B+";
    Bp.value = 3.330;
    var B = document.createElement("option");
    B.innerHTML = "B";
    B.value = 3.000;
    var Bm = document.createElement("option");
    Bm.innerHTML = "B-";
    Bm.value = 2.670;
    var Cp = document.createElement("option");
    Cp.innerHTML = "C+";
    Cp.value = 2.330;
    var C = document.createElement("option");
    C.innerHTML = "C";
    C.value = 2.000;
    var F = document.createElement("option");
    F.innerHTML = "F";
    F.value = 0.000;
    var I = document.createElement("option");
    I.innerHTML = "I";
    I.value = -1.000;
    var P = document.createElement("option");
    P.innerHTML = "P";
    P.value = -2.000;
    grade_selector.append(A); grade_selector.append(Am); grade_selector.append(Bp); grade_selector.append(B); grade_selector.append(Bm);
    grade_selector.append(Cp); grade_selector.append(C); grade_selector.append(F); grade_selector.append(I); grade_selector.append(P);
    return grade_selector;
}

function addAttributeSelector(id){
    var att_selector = document.createElement("select");
    att_selector.className = "form3_selector";
    att_selector.id = id;
    var n = document.createElement("option");
    n.innerHTML = "None";
    n.value = 0;
    var w = document.createElement("option");
    w.innerHTML = "Waived";
    w.value = 1;
    var t = document.createElement("option");
    t.innerHTML = "Transfered";
    t.value = 2;
    att_selector.append(n); att_selector.append(w); att_selector.append(t); 
    return att_selector;
}

function addSemesterYRSelector(id){
    var yr_sel = document.createElement("select");
    yr_sel.className = "form3_sem_sel";
    yr_sel.id = id;
    for(let i = -20; i < 1; i++){
        var year = new Date().getFullYear() + i;
        var option = document.createElement("option");
        option.value = year;
        option.innerHTML = year;
        if(i==-4){option.selected = "selected";}
        yr_sel.appendChild(option);
    }
    return yr_sel;
}

function addSemesterSMSelector(id){
    var yr_sel = document.createElement("select");
    yr_sel.className = "form3_sem_sel";
    yr_sel.id = id;
    var sp = document.createElement("option");
    sp.innerHTML = "Spring";
    sp.value = "SP";
    var su = document.createElement("option");
    su.innerHTML = "Summer";
    su.value = "SM";
    var f = document.createElement("option");
    f.innerHTML = "Fall";
    f.value = "F";
    yr_sel.append(sp); yr_sel.append(su); yr_sel.append(f);
    return yr_sel;
}

function fillStudentInfo_form3(){
    const data_table = document.getElementById("form3-table");
    const tableRows = data_table.rows.length;
    for(var i = 1; i < tableRows; i++){
        var currRow = data_table.rows.item(i).cells;
        var courseID = currRow.item(0).innerHTML;
        var courseGrade = currRow.item(1).children[0].value;
        var courseAtt = currRow.item(2).children[0].value;
        var sem_item = currRow.item(3).children;
        var sem_yr = sem_item[0].value;
        var sem_sem = sem_item[1].value;
        var semesterTaken = sem_yr+sem_sem;
        if(courseGrade == -2){
            courseGrade = 0.000;
            courseAtt = 3;
        }
        if(courseGrade == -1){
            courseGrade = 0.000;
        }
        for(var j = 0; j < student.getCoursesTaken().length; j++){
            if(student.getCoursesTaken()[j] == courseID){
                student.setCourseGrade(j, courseGrade);
                student.setCourseAttribute(j, courseAtt);
                student.setCourseSemester(j, semesterTaken);
            }
        }
        for(var j = 0; j < student.getLevelCoursesTaken().length; j++){
            if(student.getLevelCoursesTaken()[j] == courseID){
                student.setLevelCourseGrade(j, courseGrade);
                student.setLevelCourseAttribute(j, courseAtt);
            }
        }
        for(var j = 0; j < student.getCoreCoursesTaken().length; j++){
            if(student.getCoreCoursesTaken()[j] == courseID){
                student.setCoreCourseGrade(j, courseGrade);
                student.setCoreCourseAttribute(j, courseAtt);
            }
        }
        for(var j = 0; j < student.getElectiveCoursesTaken().length; j++){
            if(student.getElectiveCoursesTaken()[j] == courseID){
                student.setElectiveCourseGrade(j, courseGrade);
                student.setElectiveCourseAttribute(j, courseAtt);
            }
        }
    }
}


// --backToFormOne():--
// Called from hitting the back button on form two. No need to do any more than
// than just updating visibility
function backToFormOne() {
    document.getElementById("formTwo").style.display = "none";
    document.getElementById("formOne").style.display = "inherit";
   location.reload(toFormTwo);
}

// --backToFormTwo():--
// Called from hitting the back button on form three. No need to do any more than
// than just updating visibility
function backToFormTwo() {
    document.getElementById("formThree").style.display = "none";
    document.getElementById("formTwo").style.display = "inherit";
    location.reload(toFormThree);
}

// --submit_student_info():--
// This function is called when the "submit" buttom on form 3 is pushed.
// This calls all the functions to calculate information and generate the PDFs.
// This will transition over to the PDF viewer form of main.html once finished.
function submitStudentInfo() {
    showLoading();
    fillStudentInfo_form3();
    performCalculations();
    //console.log(student);
    generatePDFs();
    hideLoading();
    //TODO: Transition to PDF Viewer
}

// --performCalculations():--
// This function performs all of the GPA calculations and pushes them to the student object.
// Called when submitting form 3.
function performCalculations() {
    student.setCoreGPA(gpa_calc.calculate_core_GPA(
        student.getCoreCoursesTaken(), student.getCoreCourseGrades(), student.getCoreCourseAttributes()));
    student.setElectiveGPA(gpa_calc.calculate_elective_GPA(
        student.getElectiveCoursesTaken(), student.getElectiveCourseGrades(), student.getElectiveCourseAttributes()));
    student.setTotalGPA(gpa_calc.calculate_total_GPA(
        student.getCoursesTaken(), student.getCourseGrades(), student.getCourseAttributes()));
    var total_core_req = db_handler.getDegreeTracks()[student.getDegreeTrackID() - 1]['req_courses'];
    gpa_calc.incomplete_requirements(total_core_req, student.getCoreCoursesTaken(), student.getCoreCourseAttributes(), student.getCoreCourseGrades());
}

// --generatePDFs():--
// This function calls the PDFGenerator functions to create PDFs from student information.
function generatePDFs() {
    degree_gen.degreePlan_generatePDF(student);
    audit_gen.audit_generatePDF(student, gpa_calc);
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
        student = parseText(returntask);
        console.log(student);
        document.getElementById("sname").value=student.getName();
        document.getElementById("sid").value=student.getSID();
        /*The two lines below are not working becuase the main.html has "admit_y" and "admit_sem"
         where as in student,js and transcriptparser.js, both those functions are getting parsed together as a singular string*/
        document.getElementById("admit_y").value=student.getAdmittedSemester();
        document.getElementById("antigrad_y").value=student.getAnticipatedGraduation();
        //REGEX code to exctract number from string "=str.match(/(\d+)/)";
        hideLoading();
    }
    filereader.readAsArrayBuffer(file);
});
