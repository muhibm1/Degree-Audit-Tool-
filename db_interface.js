
class DBInfo {
    constructor(){
        this.courses = [];
        // Courses are in the form [{couseID:"CSXXXX", name:"COURSENAME"}, {couseID:"CSXXXX", name:"COURSENAME"}, ...]
        this.degrees = [];
        // Degree tracks are in the form[
        // {id:INT, name:"TRACKNAME", level_courses:["CSXXXX", "CSXXXX", ...], req_courses:["CSXXXX", "CSXXXX", ...]},
        // {id:INT, name:"TRACKNAME", level_courses:["CSXXXX", "CSXXXX", ...], req_courses:["CSXXXX", "CSXXXX", ...]},
        // ...
        // ]
        this.requirements = [];
        // Requirements are in the form [
        // {requirement_name:"Base GPA Requirement", requirement_gpa:"3.190"},
        // {requirement_name:"Extra Elective Needed", requirement_gpa:"3.000"}, 
        // ]
    }

    getCourseList(){
        return this.courses;
    }

    getDegreeTracks(){
        return this.degrees;
    }

    getRequirements(){
        return this.requirements;
    }
}

function requestCourses(courses){
    return new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            c_arr = JSON.parse(xhttp.responseText);
            for(item in c_arr){
                courses.push(c_arr[item]);
            }
            resolve();
        }
        xhttp.onerror = function(){
            reject();
        }
        xhttp.open("GET", "reqcourses.php");
        xhttp.send();
    });
}

function requestDegreeTracks(degrees){
    return new Promise(function(resolve, reject){
        let fetching = true;
        let id = 0;
        var retrievals = 0;
        while (fetching){
            id += 1;
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function(){
                if(xhttp.responseText == "DONE"){
                    degrees.sort(function(a, b){return a.id - b.id});
                    resolve();
                }else{
                    let JSON_obj = JSON.parse(xhttp.responseText);
                    degrees.push(JSON_obj);
                    degrees.sort(function(a, b){return a.id - b.id});
                    retrievals += 1;
                }
            }
            xhttp.open("GET", "reqtracks.php?s="+id);
            xhttp.send();
            if(id >= 30){
                fetching = false;
            }
        }
    });
}

function requestGraduationRequirements(requirements){
    return new Promise(function(resolve, reject){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            c_arr = JSON.parse(xhttp.responseText);
            for(item in c_arr){
                requirements.push(c_arr[item]);
            }
            resolve();
        }
        xhttp.onerror = function(){
            reject();
        }
        xhttp.open("GET", "reqrequirements.php");
        xhttp.send();
    });
}