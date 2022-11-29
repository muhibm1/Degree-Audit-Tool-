
function parseText(rawText){
    //rawText - The text that comes from the transcript, shown on the main page when a transcript is uploaded.

    /*
    * Goal: Take the text and parse it into an instance of a student object. The student object will then be returned
    * from this function. You are given the text as the variable "rawText", it is a String.
    * To be the most successful for this part: make sure you create variables similar to what is seen in the "student.js"
    * file and be able to parse that information out from the text in some manner. Then, make sure you follow the constructor
    * and the getters/setters found in the "student.js" file.
    */
    
    //rawText - The text that comes from the transcript, shown on the main page when a transcript is uploaded.

    /*
    * Goal: Take the text and parse it into an instance of a student object. The student object will then be returned
    * from this function. You are given the text as the variable "rawText", it is a String.
    * To be the most successful for this part: make sure you create variables similar to what is seen in the "student.js"
    * file and be able to parse that information out from the text in some manner. Then, make sure you follow the constructor
    * and the getters/setters found in the "student.js" file.
    */ 
    var rawText = rawText;
  
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
          //setName(this.name);
          //console.log(this.name);
          return this.name;

          
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
          
          return this.sid;
        }
      }
    }

    function admittedSem(rawText) {
      newText = rawText.split("-");

      //console.log(newText);
    
    
      for(i=0;i < newText.length;i++){
        if(newText[i].includes("Beginning of Graduate Record")){
          var path = String(newText[i]);
          const pattern = /^\d+Beginning of Graduate Record(\d+) (\w{0,6})/
          const match = path.match(pattern);
          if(match[2].includes("Fall")){
            match[2] = "Fall";
            this.admittedSemester = match[1] + match[2];
          }
          if(match[2].includes("Spring")){
            match[2] = "Spring";
            this.admittedSemester = match[1] + match[2];
          }
          if(match[2].includes("Summer")){
            match[2] = "Summer";
            this.admittedSemester = match[1] + match[2];
          }
  
          return this.admittedSemester;
        }
      }
    }

    function utdCourseGrades(rawText) {
      newText = rawText.split(":");
      //console.log(newText);
      var transferText = [];
      var counter = 0;
      
      for(i=0;i < newText.length;i++){
    
        if(newText[i].includes("Transfer CreditsTransfer Credit")){
          
          transferText.push(newText[i]);
          //console.log(transferText);
        }
      //setClasses(this.transferClasses)
      }
    
      for( var j = 0; j < newText.length; j++){ 
        if (newText[j] === transferText[counter]) {
          newText.splice(j, 1); 
          counter += 1;
        }
      }
    
    
    
    
      updatedText = String(newText);
      //console.log(updatedText);
      onlyUTDGradesText = updatedText.split(" ");
      //console.log(onlyUTDGradesText);
      const letterGrades = [];
      this.studentGrades = [];
    // try splitting within a split for grade.
      //try first approach of splitting by space, searching for 3000 twice in nested if loops then get index
      for(i=0;i < onlyUTDGradesText.length;i++){
        //console.log(match);
        if(onlyUTDGradesText[i].includes("3.000")){
          if(onlyUTDGradesText[i+1].includes("3.000")){
            letterGrades.push(onlyUTDGradesText[i+2]);
          
          }
    
          if(onlyUTDGradesText[i+1].includes("0.000")){
            letterGrades.push("IP");
          
          }
        }
      } 
    
    
      for(j=0;j < letterGrades.length;j++){
        if(letterGrades[j] == "A"){
          this.studentGrades.push("4.000");
        }
        if(letterGrades[j] == "A-"){
          this.studentGrades.push("3.670");
        }
        if(letterGrades[j] == "B+"){
          this.studentGrades.push("3.330");
        }
        if(letterGrades[j] == "B"){
          this.studentGrades.push("3.000");
        }
        if(letterGrades[j] == "B-"){
          this.studentGrades.push("2.670");
        }
        if(letterGrades[j] == "C+"){
          this.studentGrades.push("2.330");
        }
        if(letterGrades[j] == "C"){
          this.studentGrades.push("2.000");
        }
        if(letterGrades[j] == "F"){
          this.studentGrades.push("0.000");
        }
        if(letterGrades[j] == "I"){
          this.studentGrades.push("Incomplete");
        }
        if(letterGrades[j] == "P"){
          this.studentGrades.push("0.000");
        }
        if(letterGrades[j] == "IP"){
          this.studentGrades.push("IP");
        }
      }
    
      //console.log(studentGrades);
      //console.log(letterGrades); 
      return this.studentGrades;
    }

    function takenUTDClasses(rawText){
      newText = rawText.split(":");
      //console.log(newText);
      var transferText = [];
      var counter = 0;
      
      for(i=0;i < newText.length;i++){
    
        if(newText[i].includes("Transfer CreditsTransfer Credit")){
          
          transferText.push(newText[i]);
          //console.log(transferText);
        }
      //setClasses(this.transferClasses)
      }
    
      for( var j = 0; j < newText.length; j++){ 
        if (newText[j] === transferText[counter]) {
          newText.splice(j, 1); 
          counter += 1;
        }
      }
    
      updatedText = String(newText);
      noTransferText = updatedText.split(" ");
      //console.log(newText);
      this.classes = [];
    
      for(i=0;i < noTransferText.length;i++){
    
        if(noTransferText[i].includes("CS")){
          if(noTransferText[i+1].length == 4){
            classes.push("CS"+ noTransferText[i+1]);
          }
        }
      }
      //console.log(classes);
      //setClasses(this.classes)
      return this.classes;
    }

    function transferredClasses(rawText){
      newText = rawText.split(":");
      //console.log(newText);
      var transferText = [];
      this.transferClasses = [];
    
      for(i=0;i < newText.length;i++){
    
        if(newText[i].includes("Transfer CreditsTransfer Credit")){
          
          transferText.push(newText[i]);
          //console.log(transferText);
        }
      //setClasses(this.transferClasses)
      }
      for(j=0;j < transferText.length;j++){
        result = String(transferText[j]);
        splitText = result.split(" ");
        //console.log(splitText);
        
        for(k=0;k < splitText.length;k++){
          if(splitText[k].includes("CS")){
            if(splitText[k+1].length == 4){
              this.transferClasses.push("CS"+ splitText[k+1]);
            }
          }
        }
      } //if does not include transfer credit credit transfer
    
    
      //console.log(this.transferClasses);
      return this.transferClasses;
      //console.log(this.transferClasses);
    }

    function transferredClassesGrades(rawText){
      newText = rawText.split(":");
      //console.log(newText);
      var transferText = [];
      this.transferClassGrades = [];
    
      for(i=0;i < newText.length;i++){
    
        if(newText[i].includes("Transfer CreditsTransfer Credit")){
          
          transferText.push(newText[i]);
          //console.log(transferText);
        }
      //setClasses(this.transferClasses)
      }
      for(j=0;j < transferText.length;j++){
        result = String(transferText[j]);
        splitText = result.split(" ");
        //console.log(splitText);
        
        for(k=0;k < splitText.length;k++){
          if(splitText[k].includes("3.000")){
            if(splitText[k+1].includes("3.000")){
              transferClassGrades.push(splitText[k+2]);
            }
          }
        }
      } //if does not include transfer credit credit transfer
    
    
      //console.log(this.transferClasses);
      return this.transferClassGrades;
      //console.log(this.transferClasses);
    }

    function courseSemesters(rawText){
      newText = rawText.split(":");
      console.log(newText);
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
          if(newText[i].includes("Fall") || newText[i].includes("Spring") || newText[i].includes("Summer")){
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
            if(match[2].includes("Summer")){
              match[2] = "Summer";
              singleSemester2 = match[1] + match[2];
              this.semesters.push(singleSemester2);
            }
          }
          
        }
      }
      return this.semesters;
    }

    function pushUTDClassInfo(takenAtUTD,utdClassGrades,transferList,transferGradeList){
      console.log(takenAtUTD);
      console.log(utdClassGrades);
      console.log(transferList);
      console.log(transferGradeList);
      var classAttributes= [];
    
      for(i = 0; i < utdClassGrades.length; i++){
        if(utdClassGrades[i] == "IP"){
          takenAtUTD.splice(i,1);
          utdClassGrades.splice(i,1);
          i =0;
        }
      }
    
    
      for(k = 0; k < takenAtUTD.length; k++){
        student.addCourseTaken(takenAtUTD[k]);
        student.addCourseGrade(utdClassGrades[k]);
        student.addCourseAttribute("0");
      }

      if(transferList.length != 0 && transferGradeList.length != 0){
        for(j = 0; j < transferList; j++){
          student.addCourseTaken(transferList[j]);
          student.addCourseGrade(transferGradeList[j]);
          student.addCourseAttribute("2");
        }
      }
    }

    function pushCourseSemester(semList){
      for(i=0; i < this.semesters.length; i++){
        student.addCourseSemester(semList[i]);
      }

    }
  

      var sName = studentName(rawText);
      studentID(rawText);
      admittedSem(rawText)
      utdCourseGrades(rawText);
      takenUTDClasses(rawText);
      transferredClasses(rawText);
      transferredClassesGrades(rawText);
      courseSemesters(rawText);
      
      var student = new Student(this.name, this.sid, "anti_grad", this.admittedSemester);
      
      
      pushUTDClassInfo(this.classes, this.studentGrades, this.transferClasses, this.transferClassGrades);
      pushCourseSemester(this.semesters);
    
    //Populate the student object using setters found in student.js console.log(student) to check
    //console.log(rawText);

    return student;
    
    
    
}
