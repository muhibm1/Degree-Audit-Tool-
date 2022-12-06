class Degree_Plan {



    degreePlan_generatePDF(student, db_handler) {
        console.log(student);
        var studentname = student.getName();
        var id = student.getSID();
        var admittedSem = student.getAdmittedSemester();
        var anticipatedGrad = student.getAnticipatedGraduation();
        var thesis = student.getThesis();
        var fasttrack = student.getFastTrack();
        var track = student.getDegreeTrackID();
        var trackname = db_handler.getDegreeTracks()[track - 1]['name'];
        //var leveling_courses = student.getLevelCoursesTaken();
        var leveling_course_grades = student.getLevelCourseGrades();
        var leveling_course_attributes = student.getLevelCourseAttributes();
        //var core_courses = student.getCoreCoursesTaken();
        var core_course_grades = student.getCoreCourseGrades();
        var core_course_attributes = student.getCoreCourseAttributes();
        //var elective_courses = student.getElectiveCoursesTaken();
        var elective_course_grades = student.getElectiveCourseGrades();
        var elective_course_attributes = student.getElectiveCourseAttributes();
        //var courses = db_handler.getCourseList()
        //get all courses semesters
        var courses_semesters = student.getCourseSemesters();
        
        //loop and print all courses_semesters
        console.log(courses_semesters);
        

        



        //courses taken from the student
        var courses_grades = student.getCourseGrades();
        var courses_taken = student.getCoursesTaken();
        var course_attributes = student.getCourseAttributes();
        var courseNames = [];


        const { jsPDF } = window.jspdf;
        var doc = new jsPDF()


        //print all courses_taken
        console.log(courses_taken);
       
        for (var i = 0; i <courses_taken.length; i++) {
            for (var j = 0; j < db_handler.getCourseList().length; j++) {
                if (courses_taken[i] == db_handler.getCourseList()[j]["courseID"]) {

                    courseNames.push(db_handler.getCourseList()[j]["name"]);
                }
            }
        }
        //class names for courses taken 
        console.log(courseNames);


        /*
        
       core courses are not having the correct semester,
        
        
        */



        //loop through and take out all courses and store them in a new array for core courses, courese names, atrributes, and semesters
        var core_courses_names = [];
        var core_courses_semesters = [];
        var core_courses_attributes = [];
        var core_courses_grades = [];
        var core_courses = student.getCoreCoursesTaken();
        for (var i = 0; i < core_courses.length; i++) {
            for (var j = 0; j < db_handler.getCourseList().length; j++) {
                if (core_courses[i] == db_handler.getCourseList()[j]["courseID"]) {
                    core_courses_names.push(db_handler.getCourseList()[j]["name"]);
                    core_courses_semesters.push(courses_semesters[i]);
                    core_courses_attributes.push(core_course_attributes[i]);
                    core_courses_grades.push(core_course_grades[i]);
                }
            }
        }
        //print core courses
        console.log(core_courses);
        //print core courses names
        console.log(core_courses_names);
        //print core courses semesters
        console.log(core_courses_semesters);
        //print core courses attributes
        console.log(core_courses_attributes);
        //print core courses grades
        console.log(core_courses_grades);


                /*
        
        elective  courses are not having the correct semester,
        
        
        */

        //loop through and take out all courses and store them in a new array for elective courses, courese names, atrributes, and semesters
        var elective_courses_names = [];
        var elective_courses_semesters = [];
        var elective_courses_attributes = [];
        var elective_courses_grades = [];
        var elective_courses = student.getElectiveCoursesTaken();
        for (var i = 0; i < elective_courses.length; i++) {
            for (var j = 0; j < db_handler.getCourseList().length; j++) {
                if (elective_courses[i] == db_handler.getCourseList()[j]["courseID"]) {
                    elective_courses_names.push(db_handler.getCourseList()[j]["name"]);
                    elective_courses_semesters.push(courses_semesters[i]);
                    elective_courses_attributes.push(elective_course_attributes[i]);
                    elective_courses_grades.push(elective_course_grades[i]);
                }
            }
        }
        //print elective courses
        console.log(elective_courses);
        //print elective courses names
        console.log(elective_courses_names);
        //print elective courses semesters
        console.log(elective_courses_semesters);
        //print elective courses attributes
        console.log(elective_courses_attributes);
        //print elective courses grades
        console.log(elective_courses_grades);


        
        /*
        
        leveling courses are not having the correct semester,
        
        
        */

        //loop through and take out all courses and store them in a new array for leveling courses, courese names, atrributes, and semesters
        var leveling_courses_names = [];
        var leveling_courses_semesters = [];
        var leveling_courses_attributes = [];
        var leveling_courses_grades = [];
        var leveling_courses = student.getLevelCoursesTaken();
        for (var i = 0; i < leveling_courses.length; i++) {
            for (var j = 0; j < db_handler.getCourseList().length; j++) {
                if (leveling_courses[i] == db_handler.getCourseList()[j]["courseID"]) {
                    leveling_courses_names.push(db_handler.getCourseList()[j]["name"]);
                    leveling_courses_semesters.push(courses_semesters[i]);
                    leveling_courses_attributes.push(leveling_course_attributes[i]);
                    leveling_courses_grades.push(leveling_course_grades[i]);
                }
            }
        }
        //print leveling courses
        console.log(leveling_courses);
        //print leveling courses names
        console.log(leveling_courses_names);
        //print leveling courses semesters
        console.log(leveling_courses_semesters);
        //print leveling courses attributes
        console.log(leveling_courses_attributes);
        //print leveling courses grades
        console.log(leveling_courses_grades);



             /*
        
        other courses are not having the correct semester,
        not sure how to get the attributes and grades for the other courses
        
        */

     //create a new array that filters out all core, leveling, and elective courses
        var other_courses = [];
        var other_courses_names = [];
        var other_courses_semesters = [];
        var other_courses_attributes = [];
        var other_courses_grades = [];
        for (var i = 0; i < courses_taken.length; i++) {
            if (core_courses.indexOf(courses_taken[i]) == -1 && elective_courses.indexOf(courses_taken[i]) == -1 && leveling_courses.indexOf(courses_taken[i]) == -1) {
                other_courses.push(courses_taken[i]);
                other_courses_names.push("");
                other_courses_semesters.push(courses_semesters[i]);
                other_courses_attributes.push(course_attributes[i]);
                other_courses_grades.push(courses_grades[i]);
            }
        }
      
        console.log(other_courses);

   

        //loop through and take out all courses and store them in a new array for other courses, courese names, atrributes, and semesters
        for (var i = 0; i <  other_courses.length; i++) {
            for (var j = 0; j < db_handler.getCourseList().length; j++) {
                if (other_courses[i] == db_handler.getCourseList()[j]["courseID"]) {
                    other_courses_names.push(db_handler.getCourseList()[j]["name"]);
                    other_courses_semesters.push(courses_semesters[i]);
                    other_courses_attributes.push(course_attributes[i]);
                    other_courses_grades.push(courses_grades[i]);
                }
            }
        }
        //print other courses
        console.log(other_courses);
        //print other courses names
        console.log(other_courses_names);
        //print other courses semesters
        console.log(other_courses_semesters);
        //print other courses attributes
        console.log(other_courses_attributes);
        //print other courses grades
        console.log(other_courses_grades);
    
       

        function convertLetterGrades(grades_array, att_arr){
            var letters_arr = [];
            for(var i = 0; i < grades_array.length; i++){
                switch(grades_array[i]){
                    case "4":
                        letters_arr.push("A");
                        break;
                    case "3.67":
                        letters_arr.push("A-");
                        break;
                    case "3.33":
                        letters_arr.push("B+");
                        break;
                    case "3":
                        letters_arr.push("B");
                        break;
                    case "2.67":
                        letters_arr.push("B-");
                        break;
                    case "2.33":
                        letters_arr.push("C+");
                        break;
                    case "2":
                        letters_arr.push("C");
                        break;
                    case "0":
                        letters_arr.push("F");
                        break;
                }
                if(att_arr[i] == 3){
                    letters_arr.pop();
                    letters_arr.push("P");
                }
            }
            return letters_arr;
        }

        function convertAttributeList(course_att_arr){
            var attribute_list = [];
            for(var i = 0; i < course_att_arr.length; i++){
                switch(course_att_arr[i]){
                    case "0":
                        attribute_list.push("");
                        break;
                    case "1":
                        attribute_list.push("Waived");
                        break;
                    case "2":
                        attribute_list.push("Transfered");
                        break;
                    default:
                        attribute_list.push("");
                }
            }
            return attribute_list;
        }

        var course_grades_letter = convertLetterGrades(courses_grades, course_attributes);
        var core_grades_letter = convertLetterGrades(core_course_grades, core_course_attributes);
        var level_grades_letter = convertLetterGrades(leveling_course_grades, leveling_courses_attributes);
        var elective_grades_letter = convertLetterGrades(elective_course_grades, elective_course_attributes);
        var other_grades_letter = convertLetterGrades(other_courses_grades, other_courses_attributes);

        var core_att_list = convertAttributeList(core_course_attributes);
        var level_att_list = convertAttributeList(leveling_course_attributes);
        var elective_att_list = convertAttributeList(elective_course_attributes);
        var other_att_list = convertAttributeList(other_courses_attributes);

         //create a table with more that one header
         var columns1 = ["Course Title", "Course Number", "UTD Semester", "Transfer", "Grade"];
         var columns2 = ["CORE COURSES", "(15 Credit Hours)", "3.19 Grade Point Average Required"]
         var columns3 = ["FIVE APPROVED 6000 LEVEL ELECTIVES", "(15 Credit Hours)", "3.00 Grade Point Average Required", "", ""]
         var columns4 = ["Additional Electives ( 3 Credit Hours minimum )"];
         var columns5 = ["Index", "Course Title", "Course Number", "UTD Semester", "Transfer", "Grade"];
         var columns6 = ["Other Requirements"];
         var columns7 = ["Admission Prerequisites", "Course", "UTD Semeter", "Waiver", "Grade"];
 
         //create lists of courses, titles, credits, grades, and semesters
         //var courses = [];
         var titles = [];
         var credits = [];
         //var grades = ["A", "B", "C", "A", "A",];
         var semesters = [];
         var index = [1, 2, 3, 4, 5, 6, 7, 8];
 
 
 
         var rows = [];
         for (var i = 0; i < core_courses.length; i++) {
             rows.push([core_courses_names[i], core_courses[i], core_courses_semesters[i], core_att_list[i], core_grades_letter[i]]);
         }
 
         var rows1 = [];
 
         var rows2 = [];
         for (var i = 0; i < 5; i++) {
             
             rows2.push([index[i], elective_courses_names[i], elective_courses[i], elective_courses_semesters[i], elective_att_list[i], elective_grades_letter[i]]);
         }
 
 
         var rows3 = [];
         for (var i = 5; i < 8; i++) {
             rows3.push([index[i], elective_courses_names[i], elective_courses[i], elective_courses[i], elective_att_list[i], elective_grades_letter[i]]);
         }
 
         var rows4 = [];
         for (var i = 0; i < leveling_courses.length; i++) {
             rows4.push([leveling_courses_names[i], leveling_courses[i], leveling_courses_semesters[i], level_att_list[i], level_grades_letter[i]]);
         }
 
         var rows5 = [];
         for (var i = 0; i < other_courses.length; i++) {
             rows5.push([other_courses_names[i], other_courses[i], other_courses_semesters[i], other_att_list[i], other_grades_letter[i]]);
         }
 
 
 
         doc.rect(14, 10, 182, 50, 'S');
         doc.setFontSize(10);
         doc.setFont("helvetica", "bold");
 
         doc.text("DEGREE PLAN", 110, 15, null, null, 'center');
         doc.text('UNIVERSITY OF TEXAS AT DALLAS', 110, 20, null, null, 'center');
         doc.text("MASTER OF COMPUTER SCIENCE", 110, 25, null, null, 'center');
         doc.text(trackname, 110, 35, null, null, 'center');
         doc.text("Name of the Student: " + studentname, 20, 45, null, null, 'left');
         doc.text("Student ID: " + id, 20, 50, null, null, 'left');
         doc.text("Admit Semester: " + admittedSem, 20, 55, null, null, 'left');
         doc.text("Anticipated Graduation: " + anticipatedGrad, 135, 55, 'left');
         doc.text("FT: ", 135, 43, null, null, 'left');
         doc.text("Thesis: ", 135, 50, null, null, 'left');
         doc.text("Y", 155, 43, null, null, 'left');
         doc.text("N", 170, 43, null, null, 'left');
         doc.text("Y", 155, 50, null, null, 'left');
         doc.text("N", 170, 50, null, null, 'left');
 
         doc.rect(160, 39, 5, 5, 'S');
         doc.rect(160, 45, 5, 5, 'S');
         doc.rect(175, 39, 5, 5, 'S');
         doc.rect(175, 45, 5, 5, 'S');
 
         doc.rect(155, 11, 40, 6, 'S');
         doc.rect(155, 18, 40, 6, 'S');
         doc.rect(155, 25, 40, 6, 'S');
         doc.rect(155, 32, 40, 6, 'S');
 
         if(fasttrack){
            doc.text("X", 162, 43, null, null, 'left');
         }else{
            doc.text("X", 177, 43, null, null, 'left');
         }
         if(thesis){
            doc.text("X", 162, 49, null, null, 'left');
        }else{
            doc.text("X", 177, 49, null, null, 'left');
        }
 
 
 
 
         var textField1 = new doc.AcroFormTextField();
         textField1.Rect = [155, 11, 40, 6];
         textField1.Margin = [10, 20, 100, 10];
         doc.addField(textField1);
 
         var textField2 = new doc.AcroFormTextField();
         textField2.Rect = [155, 18, 40, 6];
         textField2.Margin = [10, 20, 100, 10];
         doc.addField(textField2);
 
         var textField3 = new doc.AcroFormTextField();
         textField3.Rect = [155, 25, 40, 6];
         textField3.Margin = [10, 20, 100, 10];
         doc.addField(textField3);
 
         var textField4 = new doc.AcroFormTextField();
         textField4.Rect = [155, 32, 40, 6];
         textField4.Margin = [10, 20, 100, 10];
         doc.addField(textField4);
 
 
 
 
 
         doc.autoTable(columns1, rows1, {
             startY: 60,
 
             theme: 'grid',
             headerStyles: {
                 fillColor: [255, 255, 255],
                 halign: 'center',
             },
 
             styles: {
                 overflow: 'linebreak',
                 textColor: [0, 0, 0],
                 lineColor: [0, 0, 0],
                 fontSize: 8,
                 lineWidth: 0.1,
             },
             columnStyles: {
                 text: {
                     columnWidth: 'wrap',
                 }
             },
 
         });
 
         var endY = doc.autoTable.previous.finalY;
 
 
         doc.autoTable(columns2, rows1, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
 
             },
             headerStyles: {
                 fillColor: [160, 160, 160],
                 halign: 'center',
 
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns1, rows, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
 
             },
 
             columnStyles: { text: { columnWidth: 'wrap' } },
 
             showHeader: 'never',
             headerStyles: {
 
 
             },
         });
 
 
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns3, rows1, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
             },
             columnStyles: {
                 text: { columnWidth: 'wrap' }
 
 
             },
             headerStyles: {
                 fillColor: [160, 160, 160],
                 halign: 'center',
 
 
             },
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns5, rows2, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
 
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
             showHeader: 'never',
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns4, rows1, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
             },
             headerStyles: {
                 fillColor: [160, 160, 160],
                 halign: 'center',
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns5, rows3, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
             showHeader: 'never',
             headerStyles: {
                 fillColor: [255, 255, 255]
             },
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns6, rows1, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
             },
             headerStyles: {
                 fillColor: [160, 160, 160],
                 halign: 'center',
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 //
         doc.autoTable(columns1, rows5, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
             showHeader: 'never',
             headerStyles: {
                 fillColor: [255, 255, 255]
             },
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         doc.autoTable(columns7, rows4, {
             startY: endY,
             theme: 'grid',
             styles: {
                 overflow: 'linebreak',
                 fontSize: 8,
                 halign: 'center',
                 valign: 'middle',
             },
             headerStyles: {
                 fillColor: [160, 160, 160],
 
             },
             columnStyles: { text: { columnWidth: 'wrap' } },
 
 
         });
 
         endY = doc.autoTable.previous.finalY;
 
         // doc.autoTable(columns1, rows, {
         //     startY: endY,
         //     theme: 'grid',
         //     styles: {
         //         overflow: 'linebreak',
         //         fontSize: 8,
         //         halign: 'center',
         //         valign: 'middle',
         //     },
         //     columnStyles: { text: { columnWidth: 'wrap' } },
 
         //     showHeader: 'never',
         //     headerStyles: {
         //         fillColor: [255, 255, 255]
         //     },
 
 
         // });
 
         endY = doc.autoTable.previous.finalY;
 


        //add box dynamically under the table and dynamically grow the box
        doc.rect(14, endY, 182, 30, 'S');
        doc.text("* May include any 6000 or 7000 level CS course without prior permission", 110, endY + 5, null, null, 'center');
        //output that course list
        //doc.text(courses.toString(), 20, endY + 15);


        doc.text("Academic Advisor: _____________________", 20, endY + 28);
        doc.text("Date Submitted: _____________________", 120, endY + 28);
        var textField5 = new doc.AcroFormTextField();
        textField5.Rect = [54, endY + 23, 40, 6];
        doc.addField(textField5);

        var textField6 = new doc.AcroFormTextField();
        textField6.Rect = [149, endY + 23, 40, 6];
        doc.addField(textField6);


        return doc;
    }
}
