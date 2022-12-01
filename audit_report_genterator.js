
class Audit_Report{
   

  


    audit_generatePDF(student, calculator) {
        
        const { jsPDF } = window.jspdf;
        var doc = new jsPDF('p', 'in', 'a4');
        var studentname =  student.getName();
        var id = student.getSID();
        var plan = "Master";
        var major = "Computer Science";
        var track = student.getDegreeTrackID();
        var coreGPA = student.getCoreGPA(); ;
        var electiveGPA = student.getElectiveGPA() ;
        var totalGPA = student.getTotalGPA();
        var cores_taken = student.getCoreCoursesTaken();
        var electives_taken = student.getElectiveCoursesTaken();
        var leveling_courses = student.getLevelCoursesTaken();
        var outreq = calculator.getOutStaningRequirements() ;
    
        function dynamicText(name, id, plan, major, track, coreGPA, electiveGPA, totalGPA, cores_taken, electives_taken, leveling_courses, outreq){
            
            var name = name;
            var id = id;
            var plan = plan;
            var major = major;
            var track = track;
            var coreGPA = coreGPA;
            var electiveGPA = electiveGPA;
            var totalGPA = totalGPA;
            var cores_taken = cores_taken;
            var electives_taken = electives_taken;
            var leveling_courses = leveling_courses;
           
    
            doc.setFont('Calibri(Body)', 'bold')
            .setFontSize(12)
            .text(3.75, 1.0, "Audit Report ");
    
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
            var longtext_cores_taken = cores_taken  
            var longtext_electives_taken = electives_taken
            var longtext_leveling_courses_taken = leveling_courses
            var longtext_outreq = outreq
    
    
            
    
            var textlines1 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Core Courses: " + longtext_cores_taken + "\n",7.25);
    
            var textlines2 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Elective Courses: " + longtext_electives_taken + "\n",7,25);
    
            var textlines3 = doc.setFont('Calibri(Body)')
            .setFontSize(12)
            .splitTextToSize("Leveling Courses:\n" + longtext_leveling_courses_taken + "\n",7.25);
            
            var textlines4 = doc.setFont('Calibri(Body)')
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
        dynamicText(studentname, id, plan, major, track, coreGPA, electiveGPA, totalGPA, cores_taken, electives_taken, leveling_courses, outreq);
    
        doc.save('Audit.pdf');
    
    
    }

}

