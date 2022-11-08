/*
*  Admin page JavaScript file
*  Used to interact with the database to pull the Username/Password for the system and compare.
*  If the username and password are matching, it pulls all the data from the database and populates fields
*  Also allows adding of data to the database as wanted or needed.
*/

hideLoading();
document.getElementById("adminPage").style.display = "none";
var db_i = new DBInfo();
var log_st = -1;

function attemptSignIn(){
    return new Promise(function(resolve, reject){
        let uname = document.getElementById("userID").value;
        let pass = document.getElementById("password").value;
        const xhttp = new XMLHttpRequest();
            xhttp.onload = function(){
                if(xhttp.responseText == "0_"){
                    log_st = 0;
                    resolve();
                }else{
                    log_st = 1;
                    document.getElementById("err_msg").innerHTML = "Failed to sign in, please try again";
                    resolve();
                }
            }
            xhttp.open("GET", "php_pages/signin.php?u="+uname+"&p="+pass);
            xhttp.send();
    });
}

async function submitLoginCred() {
    showLoading();
    await attemptSignIn();
    if(log_st == 0){
        proceed();
    }else{
        hideLoading();
    }
}

async function proceed() {
    showLoading();
    retrieveData();
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

async function retrieveData() {
    await requestDegreeTracks(db_i.getDegreeTracks());
    await new Promise(r => setTimeout(r, 200));
    for(var i = 0; i < db_i.getDegreeTracks().length; i++){
        var newRow = document.getElementById("degreesTable").insertRow();
        var idCell = newRow.insertCell();
        var nameCell = newRow.insertCell();
        var levelCell = newRow.insertCell();
        var reqCell = newRow.insertCell();
        idCell.innerHTML = db_i.getDegreeTracks()[i]['id'];
        nameCell.innerHTML = db_i.getDegreeTracks()[i]['name'];
        var levelCoursesList = db_i.getDegreeTracks()[i]['level_courses'];
        for(var j = 0; j < levelCoursesList.length; j++){
            levelCell.innerHTML += levelCoursesList[j];
            if(j < levelCoursesList.length-1){
                levelCell.innerHTML += ", ";
            }
        }
        var reqCoursesList = db_i.getDegreeTracks()[i]['req_courses'];
        for(var j = 0; j < reqCoursesList.length; j++){
            reqCell.innerHTML += reqCoursesList[j];
            if(j < reqCoursesList.length-1){
                reqCell.innerHTML += ", ";
            }
        }
        var edit_del_cell = newRow.insertCell();
        var edit_btn = document.createElement("button");
        edit_btn.className = "adminTableButton";
        edit_btn.id = i;
        edit_btn.innerHTML = "🖉";
        edit_btn.addEventListener("click", function() { showEditDegreeWindow(this.id); });
        var del_btn = document.createElement("button");
        del_btn.className = "adminTableButton";
        del_btn.id = i;
        del_btn.innerHTML = "🗑";
        del_btn.addEventListener("click", function() { showDeleteDegreeWindow(this.id); });
        edit_del_cell.appendChild(edit_btn);
        edit_del_cell.appendChild(del_btn);
    }
    document.getElementById("addDegree_id").innerHTML=(db_i.getDegreeTracks().length+1);
    await requestCourses(db_i.getCourseList());
    for(var i = 0; i < db_i.getCourseList().length; i++){
        var courseID = db_i.getCourseList()[i]['courseID'];
        var courseName = db_i.getCourseList()[i]['name'];
        var newRow = document.getElementById("coursesTable").insertRow();
        var courseIDCell = newRow.insertCell();
        var courseNameCell = newRow.insertCell();
        courseIDCell.innerHTML = courseID;
        courseNameCell.innerHTML = courseName;
        var edit_del_cell = newRow.insertCell();
        var edit_btn = document.createElement("button");
        edit_btn.className = "adminTableButton";
        edit_btn.id = i;
        edit_btn.innerHTML = "🖉";
        edit_btn.addEventListener("click", function() { showEditCourseWindow(this.id); });
        var del_btn = document.createElement("button");
        del_btn.className = "adminTableButton";
        del_btn.id = i;
        del_btn.innerHTML = "🗑";
        del_btn.addEventListener("click", function() { showDeleteCourseWindow(this.id); });
        edit_del_cell.appendChild(edit_btn);
        edit_del_cell.appendChild(del_btn);

    }
    await requestGraduationRequirements(db_i.getRequirements());
    for(var i = 0; i < db_i.getRequirements().length; i++){
        var newRow = document.getElementById("requirementsTable").insertRow();
        var nameCell = newRow.insertCell();
        var gpaCell = newRow.insertCell();
        var editCell = newRow.insertCell();
        nameCell.innerHTML = db_i.getRequirements()[i]['requirement_name'];
        gpaCell.innerHTML = db_i.getRequirements()[i]['requirement_gpa'];
        var edit_btn = document.createElement("button");
        edit_btn.className = "adminTableButton";
        edit_btn.id = i;
        edit_btn.innerHTML = "🖉";
        edit_btn.addEventListener("click", function() { showEditRequirementWindow(this.id); });
        editCell.appendChild(edit_btn);
    }
    hideLoading();
    document.getElementById("signin_form").style.display = "none";
    document.getElementById("adminPage").style.display = "inherit";
}

function clearTables(){
    db_i.resetDBInfo();
    //Courses
    var courseTable = document.getElementById("coursesTable");
    courseTable.innerHTML = "";
    var headerRow = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.innerHTML = "Course ID";
    var head2 = document.createElement("th");
    head2.innerHTML = "Course Name";
    var head3 = document.createElement("th");
    head3.innerHTML = "Edit/Delete";
    headerRow.appendChild(head1);
    headerRow.appendChild(head2);
    headerRow.appendChild(head3);
    courseTable.appendChild(headerRow);
    //Degrees
    var degreeTable = document.getElementById("degreesTable");
    degreeTable.innerHTML = "";
    var headerRow = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.innerHTML = "Degree Track ID";
    var head2 = document.createElement("th");
    head2.innerHTML = "Degree Track Name";
    var head3 = document.createElement("th");
    head3.innerHTML = "Level Courses";
    var head4 = document.createElement("th");
    head4.innerHTML = "Required Courses";
    var head5 = document.createElement("th");
    head5.innerHTML = "Edit/Delete";
    headerRow.appendChild(head1);
    headerRow.appendChild(head2);    
    headerRow.appendChild(head3);    
    headerRow.appendChild(head4);  
    headerRow.appendChild(head5);  
    degreeTable.appendChild(headerRow);
    //Requirements
    var reqTable = document.getElementById("requirementsTable");
    reqTable.innerHTML = "";
    var headerRow = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.innerHTML = "Short Description";
    var head2 = document.createElement("th");
    head2.innerHTML = "GPA";
    var head3 = document.createElement("th");
    head3.innerHTML = "Edit";
    headerRow.appendChild(head1);
    headerRow.appendChild(head2);
    headerRow.appendChild(head3);
    courseTable.appendChild(headerRow);
}

/*************************************************************
 *  Functions for showing/hiding the possible admin windows. *
 *  Will also populate with information on case of edit.     *
 *************************************************************/

function showAddCourseWindow(){
    document.getElementById("addCourseWindow").style.opacity = 1.0;
    document.getElementById("addCourseWindow").style.zIndex = 2;
}

function removeAddCourseWindow(){
    document.getElementById("addCourseWindow").style.opacity = 0.0;
    document.getElementById("addCourseWindow").style.zIndex = -2;
}

function showAddDegreeWindow(){
    document.getElementById("addDegreeWindow").style.opacity = 1.0;
    document.getElementById("addDegreeWindow").style.zIndex = 2;
}

function removeAddDegreeWindow(){
    document.getElementById("addDegreeWindow").style.opacity = 0.0;
    document.getElementById("addDegreeWindow").style.zIndex = -2;
}

function showEditCourseWindow(id){
    document.getElementById("editCourseWindow").style.opacity = 1.0;
    document.getElementById("editCourseWindow").style.zIndex = 2;
    document.getElementById("editCourse_idField").value = db_i.getCourseList()[id]['courseID'];
    document.getElementById("editCourse_nameField").value = db_i.getCourseList()[id]['name'];
}

function removeEditCourseWindow(){
    document.getElementById("editCourseWindow").style.opacity = 0.0;
    document.getElementById("editCourseWindow").style.zIndex = -2;
}

function showEditDegreeWindow(id){
    document.getElementById("editDegreeWindow").style.opacity = 1.0;
    document.getElementById("editDegreeWindow").style.zIndex = 2;
    document.getElementById("editDegree_idField").value = db_i.getDegreeTracks()[id]['id'];
    document.getElementById("editDegree_nameField").value = db_i.getDegreeTracks()[id]['name'];
    document.getElementById("editDegree_levelField").value = db_i.getDegreeTracks()[id]['level_courses'];
    document.getElementById("editDegree_reqField").value = db_i.getDegreeTracks()[id]['req_courses'];
}

function removeEditDegreeWindow(){
    document.getElementById("editDegreeWindow").style.opacity = 0.0;
    document.getElementById("editDegreeWindow").style.zIndex = -2;
}

function showDeleteCourseWindow(id){
    document.getElementById("deleteCourseWindow").style.opacity = 1.0;
    document.getElementById("deleteCourseWindow").style.zIndex = 2;
    document.getElementById("deleteCourse_text").innerHTML = "Are you sure you want to delete " + db_i.getCourseList()[id]['courseID'] +
        ", " + db_i.getCourseList()[id]['name'] + "?";
    document.getElementById("deleteCourse_ref").innerHTML = db_i.getCourseList()[id]['courseID'];
}

function removeDeleteCourseWindow(){
    document.getElementById("deleteCourseWindow").style.opacity = 0.0;
    document.getElementById("deleteCourseWindow").style.zIndex = -2;
}

function showDeleteDegreeWindow(id){
    document.getElementById("deleteDegreeWindow").style.opacity = 1.0;
    document.getElementById("deleteDegreeWindow").style.zIndex = 2;
    document.getElementById("deleteDegree_text").innerHTML = "Are you sure you want to delete " + db_i.getDegreeTracks()[id]['name'] + "?";
    document.getElementById("deleteDegree_ref").innerHTML = db_i.getDegreeTracks()[id]['id'];
}

function removeDeleteDegreeWindow(){
    document.getElementById("deleteDegreeWindow").style.opacity = 0.0;
    document.getElementById("deleteDegreeWindow").style.zIndex = -2;
}

function showEditRequirementWindow(id){
    document.getElementById("editRequirementWindow").style.opacity = 1.0;
    document.getElementById("editRequirementWindow").style.zIndex = 2;
    document.getElementById("editRequirement_nameField").value = db_i.getRequirements()[id]['requirement_name'];
    document.getElementById("editRequirement_gpaField").value = db_i.getRequirements()[id]['requirement_gpa'];
    document.getElementById("editRequirement_ref").innerHTML = id+1;
}

function hideEditRequirementWindow(){
    document.getElementById("editRequirementWindow").style.opacity = 0.0;
    document.getElementById("editRequirementWindow").style.zIndex = -2;
}

/*************************************************************
 *  Functions for adding, editing, or deleting information   *
 *  in the database. Yeah it's a lot of code ;u;             *
 *************************************************************/

async function addCourse(){
    showLoading();
    var courseID = document.getElementById("addCourse_idField").value;
    var courseName = document.getElementById("addCourse_nameField").value;
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            removeAddCourseWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/addcourse.php?id="+courseID+"&n="+courseName);
        xhttp.send();
    });
}
async function removeCourse(){
    showLoading();
    var courseID = document.getElementById("deleteCourse_ref").innerHTML;
    console.log(courseID);
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            removeDeleteCourseWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/removecourse.php?id="+courseID);
        xhttp.send();
    });
}
async function editCourse(){
    showLoading();
    var courseID = document.getElementById("editCourse_idField").value;
    var courseName = document.getElementById("editCourse_nameField").value;
    console.log(courseID);
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            removeDeleteCourseWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/editcourse.php?id="+courseID+"&n="+courseName);
        xhttp.send();
    });
}

async function addDegreeTrack(){
    showLoading();
    var degreeID = document.getElementById("addDegree_id").innerHTML;
    var degreeName = document.getElementById("addDegree_nameField").value;
    var levelCrs = document.getElementById("addDegree_levelField").value;
    var reqCrs = document.getElementById("addDegree_reqField").value;
    levelCrs = levelCrs.replaceAll(" ", "");
    reqCrs = reqCrs.replaceAll(" ", "");
    var levels_arr = levelCrs.split(",");
    var levels_arr_str = "";
    for(let i = 0; i < levels_arr.length; i++){
        if(levels_arr[i].length != 6){
            console.log("Format of List Error: Must be in format CSXXXX,CSXXXX,.....");
            return;
        }
        levels_arr_str += levels_arr[i];
        if(i < levels_arr.length-1){ levels_arr_str += ","; }
    }
    var req_arr = reqCrs.split(",");
    var req_arr_str = "";
    for(let i = 0; i < req_arr.length; i++){
        if(req_arr[i].length != 6){
            console.log("Format of List Error: Must be in format CSXXXX,CSXXXX,.....");
            return;
        }
        req_arr_str += req_arr[i];
        if(i < req_arr.length-1){ req_arr_str += ","; }
    }
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            removeAddDegreeWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/adddegreetrack.php?id="+degreeID+"&n="+degreeName+"&lvl="+levels_arr_str+"&req="+req_arr_str);
        xhttp.send();
    });
}
async function removeDegreeTrack(){
    showLoading();
    var degreeID = document.getElementById("deleteDegree_ref").innerHTML;
    console.log(degreeID);
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            removeDeleteDegreeWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/removedegreetrack.php?id="+degreeID);
        xhttp.send();
    });
}
async function editDegreeTrack(){
    showLoading();
    var degreeID = document.getElementById("editDegree_idField").innerHTML;
    var degreeName = document.getElementById("editDegree_nameField").value;
    var levelCrs = document.getElementById("editDegree_levelField").value;
    var reqCrs = document.getElementById("editDegree_reqField").value;
    levelCrs = levelCrs.replaceAll(" ", "");
    reqCrs = reqCrs.replaceAll(" ", "");
    var levels_arr = levelCrs.split(",");
    var levels_arr_str = "";
    for(let i = 0; i < levels_arr.length; i++){
        if(levels_arr[i].length != 6){
            console.log("Format of List Error: Must be in format CSXXXX,CSXXXX,.....");
            return;
        }
        levels_arr_str += levels_arr[i];
        if(i < levels_arr.length-1){ levels_arr_str += ","; }
    }
    var req_arr = reqCrs.split(",");
    var req_arr_str = "";
    for(let i = 0; i < req_arr.length; i++){
        if(req_arr[i].length != 6){
            console.log("Format of List Error: Must be in format CSXXXX,CSXXXX,.....");
            return;
        }
        req_arr_str += req_arr[i];
        if(i < req_arr.length-1){ req_arr_str += ","; }
    }
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            removeDeleteDegreeWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/editdegreetrack.php?id="+degreeID+"&n="+degreeName+"&lvl="+levels_arr_str+"&req="+req_arr_str);
        xhttp.send();
    });
}

async function editRequirement(){
    showLoading();
    var refName = document.getElementById("editRequirement_nameField").value;
    var refGPA = document.getElementById("editRequirement_gpaField").value;
    await new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = async function(){
            console.log(xhttp.responseText);
            await new Promise(r => setTimeout(r, 200));
            hideEditRequirementWindow();
            clearTables();
            await new Promise(r => setTimeout(r, 200));
            retrieveData();
            hideLoading();
            resolve();
        }
        xhttp.onerror = function(){
            hideLoading();
            reject();
        }
        xhttp.open("GET", "php_pages/editrequirement.php?n="+refName+"&gpa="+refGPA);
        xhttp.send();
    });
}