/*
*  Admin page JavaScript file
*  Used to interact with the database to pull the Username/Password for the system and compare.
*  If the username and password are matching, it pulls all the data from the database and populates fields
*  Also allows adding of data to the database as wanted or needed.
*/

hideLoading();
document.getElementById("adminPage").style.display = "none";

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
            xhttp.open("GET", "signin.php?u="+uname+"&p="+pass);
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
    var db_i = new DBInfo();
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
            levelCell.innerHTML += levelCoursesList[j] + " ";
        }
        var reqCoursesList = db_i.getDegreeTracks()[i]['req_courses'];
        for(var j = 0; j < reqCoursesList.length; j++){
            reqCell.innerHTML += reqCoursesList[j] + " ";
        }
    }
    await requestCourses(db_i.getCourseList());
    for(var i = 0; i < db_i.getCourseList().length; i++){
        var newRow = document.getElementById("coursesTable").insertRow();
        var courseIDCell = newRow.insertCell();
        var courseNameCell = newRow.insertCell();
        courseIDCell.innerHTML = db_i.getCourseList()[i]['courseID'];
        courseNameCell.innerHTML = db_i.getCourseList()[i]['name'];
    }
    await requestGraduationRequirements(db_i.getRequirements());
    for(var i = 0; i < db_i.getRequirements().length; i++){
        var newRow = document.getElementById("requirementsTable").insertRow();
        var nameCell = newRow.insertCell();
        var gpaCell = newRow.insertCell();
        nameCell.innerHTML = db_i.getRequirements()[i]['requirement_name'];
        gpaCell.innerHTML = db_i.getRequirements()[i]['requirement_gpa'];
    }
    hideLoading();
    document.getElementById("signin_form").style.display = "none";
    document.getElementById("adminPage").style.display = "inherit";
}

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