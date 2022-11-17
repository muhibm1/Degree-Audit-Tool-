class Audit_Report{


    getName(){ return this.name; }
    getSID(){ return this.sid; }
    getDegreeTrackID(){ return this.degree_track; }
    getCoreGPA(){ return this.core_GPA; }
    getElectiveGPA(){ return this.elective_GPA; }
    getTotalGPA(){ return this.total_GPA; }
    getCoursesTaken(){ return this.courses_taken; }
    getCoreCoursesTaken(){ return this.core_taken; }
    getElectiveCoursesTaken(){ return this.elective_taken; }
    getLevelCoursesTaken(){ return this.level_taken; }
    getOutStaningRequirements(){return this.outstanding_req;}




    audit_generatePDF(student, calculator) {
    
        studentname =  student.getName();
        id = student.getSID();
        plan = "Master";
        major = "Computer Science";
        track = student.getDegreeTrackID();
        coreGPA = student.getCoreGPA(); ;
        electiveGPA = student.getElectiveGPA() ;
        totalGPA = student.getTotalGPA();
        cores_taken = student.getCoursesTaken();
        elective_taken = student.getElectiveCoursesTaken();
        leveling_courses = student.getLevelCoursesTaken();
        outreq = calculator.getOutStaningRequirements();
    
        function dynamicText(name, id, plan, major, track, coreGPA, electiveGPA, totalGPA, cores_taken, elective_taken, leveling_courses, outreq){
            
            name = name;
            id = id;
            plan = plan;
            major = major;
            track = track;
            coreGPA = coreGPA;
            electiveGPA = electiveGPA;
            totalGPA = totalGPA;
    
            doc.setFont('Calibri(Body)', 'bold')
            .setFontSize(12)
            .text(4.25, 1.0, "Audit Report ", align = 'center');
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 1.5, "Name: " + name);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(5.5, 1.5, "ID: " + id);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 1.75, "Plan: " + plan);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(5.5, 1.75, "Major: " + major);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(5.5, 2.0, "Track: " + track);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 2.50, "Core GPA: " + coreGPA);
            
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 2.75, "Elective GPA: " + electiveGPA);
    
            doc.setFont('Calibri(Body)', 'normal')
            .setFontSize(12)
            .text(0.5, 3.0, "Total GPA: " + totalGPA);
    
            //dynamic sizing part of the audit report 
            longtext_cores_taken = cores_taken  
            longtext_electives_taken = electives_taken
            longtext_leveling_courses_taken = leveling_courses_taken
            longtext_outreq = outreq
    
    
            
    
            textlines1 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Core Courses: " + longtext_cores_taken + "\n",7.25);
    
            textlines2 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Elective Courses: " + longtext_electives_taken + "\n",7,25);
    
            textlines3 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Leveling Courses:\n" + longtext_leveling_courses_taken + "\n",7.25);
            
            textlines4 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Outstanding Requirements:\n" + longtext_outreq,7.25);
            
    
    
            let verticalOffset = 3.25;
            doc.text(0.5, verticalOffset + 12/72, textlines1);
            verticalOffset += (textlines1.length + 0.5) * 12/72;
            doc.text(0.5, verticalOffset + 12/72, textlines2); 
            verticalOffset += (textlines2.length + 0.5) * 12/72;
            doc.text(0.5, verticalOffset + 12/72, textlines3);  
            verticalOffset += (textlines3.length + 0.5) * 12/72;
            doc.text(0.5, verticalOffset + 12/72, textlines4);
    
    
        }
        dynamicText(studentname, id, plan, major, track, coreGPA, electiveGPA, totalGPA, cores_taken, elective_taken, leveling_courses, outreq);
    
        doc.save('Audit.pdf');
    
    
    }

}
