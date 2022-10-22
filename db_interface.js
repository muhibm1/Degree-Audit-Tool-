
class DBInfo {
    constructor(){
        this.courses = [];
        this.degrees = [];
        this.err_code = 0;
    }

    getCourseList(){
        return this.courses;
    }

    getDegreeTracks(){
        return this.degrees;
    }

    setErrCode(code) {
        this.err_code = code;
    }

    getErrCode(){
        return this.err_code;
    }

    getErrStr(){
        var str = "";
        switch (err_code) {
            case 0: str = "None"; break;
            case 1: str = "Connection Timeout"; break;
            case 2: str = "Unable to read from Database"; break;
        }
        return str;
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
    /*const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        c_arr = JSON.parse(xhttp.responseText);
        for(item in c_arr){
            courses.push(c_arr[item]);
        }
        console.log(JSON.parse(xhttp.responseText));
        console.log(courses);
        Req_ST += 1;
    }
    xhttp.open("GET", "reqcourses.php");
    xhttp.send();*/
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
    /*let fetching = true;
    let id = 1;
    while (fetching){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            if(xhttp.responseText == "DONE"){
                fetching = false;
            }else{
                console.log(xhttp.responseText);
                let JSON_obj = JSON.parse(xhttp.responseText);
                console.log(JSON_obj);
                degrees.push(JSON_obj);
                Req_ST += 1;
            }
        }
        xhttp.open("GET", "reqtracks.php?s="+id);
        xhttp.send();
        id += 1;
        if(id >= 50){
            fetching = false;
        }
    }*/
}

class DegreeTrack {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.level_courses = [];
        this.required_courses = [];
    }

    getTrackID() {
        return this.id;
    }

    getTrackName() {
        return this.name;
    }

    getLevelCourses() {
        return this.level_courses;
    }

    getRequiredCourses() {
        return this.required_courses;
    }

    addLevelCourse(course) {
        this.level_courses.push(course);
    }

    addRequiredCourse(course) {
        this.required_courses.push(course);
    }
}

class Course {
    constructor(courseID, name){
        this.courseID = courseID;
        this.name = name;
    }

    getName(){
        return this.name;
    }

    getCourseID(){
        return this.courseID;
    }
}