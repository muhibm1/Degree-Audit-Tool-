
function parseText(rawText){
    //rawText - The text that comes from the transcript, shown on the main page when a transcript is uploaded.

    /*
    * Goal: Take the text and parse it into an instance of a student object. The student object will then be returned
    * from this function. You are given the text as the variable "rawText", it is a String.
    * To be the most successful for this part: make sure you create variables similar to what is seen in the "student.js"
    * file and be able to parse that information out from the text in some manner. Then, make sure you follow the constructor
    * and the getters/setters found in the "student.js" file.
    */
    
    
    function getName(rawText) {
        newText = rawText.split("CS");
        console.log(newText);
      
      
        for(i=0;i < newText.length;i++){
          if(newText[i].includes("Name:")){
            var path = String(newText[i]);
            const pattern = /^Unofficial Transcript - UT-DallasName: (\w+ \w\D+)/
            const match = path.match(pattern);
            studentName = match[1];
            console.log(studentName);
            
          }
        }
      }
      
      function getSID(rawText) {
        newText = rawText.split("CS");
        console.log(newText);
        
        for(i=0;i < newText.length;i++){
          if(newText[i].includes("Student ID:")){
            var path = String(newText[i]);
            const pattern = /^Unofficial Transcript - UT-DallasName: \w+ \w+ \d+Student ID: (\d+)/
            const match = path.match(pattern);
            sid = match[1];
            console.log(sid);
            
          }
        }
      }
      
        
      
      function getClasses(rawText){
        newText = rawText.split(":");
        console.log(newText);
        const classes = [];
      
        for(i=0;i < newText.length;i++){
          if(newText[i].includes("CS 6313")){
            classes.push("CS6313");
          }
      
          if(newText[i].includes("CS 6314")){
            classes.push("CS6314");
            
           
            
          }
          if(newText[i].includes("CS 6363")){
            classes.push("CS6363");
            
          }
      
          if(newText[i].includes("CS 6359")){
            classes.push("CS6359");
            
          }
      
          if(newText[i].includes("CS 6360")){
            classes.push("CS6360");
            
          }
      
          if(newText[i].includes("CS 6375")){
            classes.push("CS6375");
            
          }
      
          if(newText[i].includes("CS 5343")){
            classes.push("CS5343");
            
          }
      
          if(newText[i].includes("CS 6350")){
            classes.push("CS6350");
            
          }
      
          if(newText[i].includes("CS 6396")){
            classes.push("CS6396");
      
            console.log(classes)
            
          }
        }
      }
      
      
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
      }
    
    function admittedSem(rawText) {
      newText = rawText.split("-");
      console.log(newText);


      for(i=0;i < newText.length;i++){
        if(newText[i].includes("Beginning of Graduate Record")){
          var path = String(newText[i]);
          const pattern = /^\d+Beginning of Graduate Record(\d+) (\w{0,4})/
          const match = path.match(pattern);
          admittedSemester = match[1] + match[2];
          console.log(admittedSemester)
        }
      }
    }
    
    function courseSemesters(rawText) {
      newText = rawText.split(":");
      const semesters = [];


     for(i=0;i < newText.length;i++){
       if(newText[i].includes("Beginning of Graduate Record")){
         var path = String(newText[i]);
         const pattern = /^ \d+-\d+-\d+Beginning of Graduate Record(\d+) (\w{0,4})/
         const match = path.match(pattern);
         singleSemester = match[1] + match[2];
         semesters.push(singleSemester);
       }

       if(newText[i].includes("Good Standing")){
         var path = String(newText[i]);
         const pattern = /^ Good Standing(\d+) (\w{0,6})/
         const match = path.match(pattern);
         singleSemester2 = match[1] + match[2];
         semesters.push(singleSemester2);
      
       }
       console.log(semesters)
     }
   }
    
    
      
      getName(rawText);
      getSID(rawText);
      getClasses(rawText);
      admittedSemester(rawText);
    let student = new Student(variables);
    return student;
}
