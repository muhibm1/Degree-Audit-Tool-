class Degree_Plan{


    getName(){ return this.name; }
    getSID(){ return this.sid; }
    getAnticipatedGraduation(){ return this.anticipated_grad; }
    getAdmittedSemester(){ return this.admitted_sem; }
    getDegreeTrackID(){ return this.degree_track; }
    getCoursesTaken(){ return this.courses_taken; }
    getCourseGrades(){ return this.course_grades; }
    getCourseAttributes(){ return this.course_attributes; }
    getCourseSemesters() { return this.course_semesters; }
    getLevelCoursesTaken(){ return this.level_taken; }
    getLevelCourseGrades(){ return this.level_grades; }
    getLevelCourseAttributes(){ return this.level_attributes; }
    getCoreCoursesTaken(){ return this.core_taken; }
    getCoreCourseGrades(){ return this.core_grades; }
    getCoreCourseAttributes(){ return this.core_attributes; }
    getElectiveCoursesTaken(){ return this.electives_taken; }
    getElectiveCourseGrades(){ return this.elective_grades; }
    getElectiveCourseAttributes(){ return this.elective_attributes; }
    getThesis(){ return this.thesis; }
    getTotalGPA(){ return this.total_GPA; }
    getCoreGPA(){ return this.core_GPA; }
    getElectiveGPA(){ return this.elective_GPA; }
    getCredits(){ return this.credits; }





    degreePlan_generatePDF(name,id,admittedSem,anticipatedGrad,thesis,plan,track,leveling_courses,leveling_course_grades,leveling_course_attributes,core_courses,core_course_grades,core_course_attributes,elective_courses,elective_course_grades,elective_course_attributes) {
    
        name =  getName();
        id = getSID();
        admittedSem = getAdmittedSemester(); 
        anticipatedGrad = getAnticipatedGraduation();
        thesis = getThesis();
        track = getDegreeTrackID();
        leveling_courses = getLevelCoursesTaken();
        leveling_course_grades = getLevelCourseGrades();
        leveling_course_attributes = getLevelCourseAttributes();
        core_courses = getCoreCoursesTaken();
        core_course_grades = getCoreCourseGrades();
        core_course_attributes = getCoreCourseAttributes();
        elective_courses = getElectiveCoursesTaken();
        elective_course_grades = getElectiveCourseGrades();
        elective_course_attributes = getElectiveCourseAttributes();

    
        function dynamicText(name,id,admittedSem,anticipatedGrad,thesis,plan,track,leveling_courses,leveling_course_grades,leveling_course_attributes,core_courses,core_course_grades,core_course_attributes,elective_courses,elective_course_grades,elective_course_attributes){
            
            name = name;
            id = id;
            admittedSem = admittedSem;
            anticipatedGrad = anticipatedGrad;
            thesis = thesis;
            plan = plan;
            track = track;
            leveling_courses = leveling_courses;
            leveling_course_grades = leveling_course_grades;
            leveling_course_attributes = leveling_course_attributes;
            core_courses = core_courses;
            core_course_grades = core_course_grades;
            core_course_attributes = core_course_attributes;
            elective_courses = elective_courses;
            elective_course_grades = elective_course_grades;
            elective_course_attributes = elective_course_attributes;
    
            doc.setFont('Calibri(Body)', 'bold')
            .setFontSize(12)
            .text(4.25, 1.0, "Degree Plan", align = 'center');
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 1.5, "Name: " + name);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(5.5, 1.5, "Student I.D. Number: " + id);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 1.75, "Semester Admitted to Program: " + admittedSem);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(5.5, 1.75, "Anticipated Graduation: " + anticipatedGrad);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(5.5, 2.0, "Thesis: " + thesis);
            #i am here
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 2.50, "FT: ");
    

            core_courses = core_courses;
            core_course_grades = core_course_grades;
            core_course_attributes = core_course_attributes;
            elective_courses = elective_courses;
            elective_course_grades = elective_course_grades;
            elective_course_attributes = elective_course_attributes;
            leveling_courses = leveling_courses;
            leveling_course_grades = leveling_course_grades;
            leveling_course_attributes = leveling_course_attributes;
    

            #dynamic sizing 
            longtext_core_courses = core_courses;
            longtext_core_course_grades = core_course_grades;
            longtext_core_course_attributes = core_course_attributes;
            longtext_elective_courses = elective_courses;
            longtext_elective_course_grades = elective_course_grades;
            longtext_elective_course_attributes = elective_course_attributes;
            longtext_leveling_courses = leveling_courses;
            longtext_leveling_course_grades = leveling_course_grades;
            longtext_leveling_course_attributes = leveling_course_attributes;   
            

            # cores 
            textlines1 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("CORE COURSES (15 Credit Hours) 3.19 Grade Point Average Required: " + "\n" + longtext_core_courses + "\n",7.25);
            
            textlines3 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Transfer:\n" + longtext_core_course_attributes[2] + "\n",7.25);

            textlines2 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Grade:\n" + longtext_core_course_grades + "\n",7.25);

            # electives 
            textlines4 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("FIVE APPROVED 6000 LEVEL ELECTIVES (15 * Credit Hours) 3.0 Grade Point Average: " + "\n" + longtext_elective_courses + "\n",7,25);

            textlines6 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Transfer:\n" + longtext_elective_course_attributes[2] + "\n",7.25);

            textlines5 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Grade:\n" + longtext_elective_course_grades + "\n",7.25);

            # leveling 
            textlines7 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Admission Prerequisites:\n" + "\n" + longtext_leveling_courses + "\n",7.25);

            textlines9 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Waiver:\n" + longtext_leveling_course_attributes[1] + "\n",7.25);
            
            textlines8 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Grade:\n" + longtext_leveling_course_grades + "\n",7.25);


            let verticalOffset = 3.25;
            doc.text(0.5, verticalOffset + 12/72, textlines1);
            verticalOffset += (textlines1.length + 0.5) * 12/72;
            doc.text(0.5, verticalOffset + 12/72, textlines2); 
            verticalOffset += (textlines2.length + 0.5) * 12/72;
            doc.text(0.5, verticalOffset + 12/72, textlines3);  
            verticalOffset += (textlines3.length + 0.5) * 12/72;
            doc.text(0.5, verticalOffset + 12/72, textlines4);
    
    
        }
        dynamicText(name,id,admittedSem,anticipatedGrad,thesis,plan,track,leveling_courses,leveling_course_grades,leveling_course_attributes,core_courses,core_course_grades,core_course_attributes,elective_courses,elective_course_grades,elective_course_attributes);
    
        doc.save('Degree Plan.pdf');
    
    
    }

}
