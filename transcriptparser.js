
function parseText(rawText){
    //rawText - The text that comes from the transcript, shown on the main page when a transcript is uploaded.

    /*
    * Goal: Take the text and parse it into an instance of a student object. The student object will then be returned
    * from this function. You are given the text as the variable "rawText", it is a String.
    * To be the most successful for this part: make sure you create variables similar to what is seen in the "student.js"
    * file and be able to parse that information out from the text in some manner. Then, make sure you follow the constructor
    * and the getters/setters found in the "student.js" file.
    */
    
    
   function thesis(rawText) {
  newText = rawText.split(":");
  //console.log(newText);
  
  for(i=0;i < newText.length;i++){
    if(newText[i].includes("Thesis")){
      this.thesis = true;
    }
    else{
      this.thesis = false;
    }
  }
}

function seThesis(thesis){ 
  this.thesis = thesis;
}

function getThesis(){
  return this.thesis;
}




function courseSemesters(rawText) {
  newText = rawText.split(":");
  //console.log(newText);
  this.semesters = [];


  for(i=0;i < newText.length;i++){
    if(newText[i].includes("Beginning of Graduate Record")){
      var path = String(newText[i]);
      const pattern = /^ \d+-\d+-\d+Beginning of Graduate Record(\d+) (\w{0,6})/
      const match = path.match(pattern);
      if(match[2].includes("Fall")){
        match[2] = "Fall";
        singleSemester = match[1] + match[2];
        this.semesters.push(singleSemester);
      }
      if(match[2].includes("Spring")){
        match[2] = "Spring";
        singleSemester = match[1] + match[2];
        this.semesters.push(singleSemester);
      }
      
    }

    if(newText[i].includes("Good Standing")){
      var path = String(newText[i]);
      const pattern = /^ Good Standing(\d+) (\w{0,6})/
      const match = path.match(pattern);
      if(match[2].includes("Fall")){
        match[2] = "Fall";
        singleSemester2 = match[1] + match[2];
        this.semesters.push(singleSemester2);
      }
      if(match[2].includes("Spring")){
        match[2] = "Spring";
        singleSemester2 = match[1] + match[2];
        this.semesters.push(singleSemester2);
      }
      
    }
  }
  setCourseSemesters(this.semesters);
} 
function setCourseSemesters(semesters){ 
  this.semesters = semesters;
}

function getCourseSemesters(){
  return this.semesters;
}



function admittedSem(rawText) {
  newText = rawText.split("-");
  //console.log(newText);


  for(i=0;i < newText.length;i++){
    if(newText[i].includes("Beginning of Graduate Record")){
      var path = String(newText[i]);
      const pattern = /^\d+Beginning of Graduate Record(\d+) (\w{0,4})/
      const match = path.match(pattern);
      this.admittedSemester = match[1] + match[2];
      setAdmittedSemester(this.admittedSemester);
    }
  }
} 
function setAdmittedSemester(admittedSemester){ 
  this.admittedSemester = admittedSemester;
}

function getAdmittedSemester(){
  return this.admittedSemester;
}







function studentName(rawText) {
  //rawText = rawText.replace(/^\uFEFF/, '')
  newText = rawText.split("-");
  //console.log(newText);


  for(i=0;i < newText.length;i++){
    if(newText[i].includes("Name:")){
      var path = String(newText[i]);
      const pattern = /^DallasName: (\w+) (\w\D+)/
      const match = path.match(pattern);
      this.name = match[1] +" "+ match[2];
      //console.log(match[1], match[2]);
      setName(this.name);
      
    }
  }
}




function studentID(rawText) {
  newText = rawText.split("CS");
  //console.log(newText);
  
  for(i=0;i < newText.length;i++){
    if(newText[i].includes("Student ID:")){
      var path = String(newText[i]);
      const pattern = /^Unofficial Transcript - UT-DallasName: \w+ \w+ \d+Student ID: (\d+)/
      const match = path.match(pattern);
      this.sid = match[1];
      
      setSID(this.sid);
    }
  }
} 


function takenClasses(rawText){
  newText = rawText.split(":");
  //console.log(newText);
  this.classes = [];

  for(i=0;i < newText.length;i++){
    if(newText[i].includes("CS 6313")){
      this.classes.push("CS6313");
    }

    if(newText[i].includes("CS 6314")){
      this.classes.push("CS6314");
      
     
      
    }
    if(newText[i].includes("CS 6363")){
      this.classes.push("CS6363");
      
    }

    if(newText[i].includes("CS 6359")){
      this.classes.push("CS6359");
      
    }

    if(newText[i].includes("CS 6360")){
      this.classes.push("CS6360");
      
    }

    if(newText[i].includes("CS 6375")){
      this.classes.push("CS6375");
      
    }

    if(newText[i].includes("CS 5343")){
      this.classes.push("CS5343");
      
    }

    if(newText[i].includes("CS 6350")){
      this.classes.push("CS6350");
      
    }

    if(newText[i].includes("CS 6396")){
      this.classes.push("CS6396");

      
    }
  }
  
  setClasses(this.classes)
}

/*
function admittedSemester(rawText){
  newText = rawText.split(":");
  console.log(newText);
  const classes = [];
  
  for(i=0;i < newText.length;i++){
    if(newText[i].includes("Beginning of Graduate Record")){
      var admitted_semester = "Fall 2021";
      
      console.log(admitted_semester);
      
    }
  }
}*/

function setSID(sid){ 
  this.sid = sid;
}

function getSID(){
  return this.sid;
}

function setClasses(course_taken){
  this.course_taken = course_taken;
}

function getClasses(){
  return this.course_taken;
}

function setName(name){
  this.name = name;
}

function getName(){
  return this.name;
}

studentName(rawText);
console.log(getName());
studentID(rawText);
console.log(getSID());
takenClasses(rawText);
console.log(getClasses());
admittedSem(rawText);
console.log(getAdmittedSemester());
courseSemesters(rawText);
console.log(getCourseSemesters());
thesis(rawText);
console.log(getThesis());
    let student = new Student(variables);
    return student;
}
