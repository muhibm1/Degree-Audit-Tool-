



class GPA_Calculator extends Student{
    constructor(){
        this.outstanding_req = "";
    }
    //get the list of outstanding required core courses
    getOutStaningRequirements(){
        return this.outstanding_req;
    }

    //gets the core gpa
    getCoreGPA(){
        return this.core_GPA;
    }

    calculate_core_GPA(courses_taken,core_grades,core_attributes){
        // Calculate the core GPA
        var core_GPA = 0.000;
        var core_classes = 0;
        for(var i = 0; i < courses_taken.length; i++){
            
            if(core_attributes[i] == "0"){
                core_GPA = core_GPA + core_grades[i];
                core_classes++;
            }
        }
        var core_GPA = core_GPA / core_classes;
        return this.core_GPA;
    }
    calculate_elective_GPA(electives_taken,elective_grades,elective_attributes){
        // Calculate the elective GPA
        var elective_GPA = 0.000;
        var elective_classes = 0;
        for(var i = 0; i < electives_taken.length; i++){
             
            if(elective_attributes[i] == "0"){
                elective_GPA = elective_GPA + elective_grades[i];
                elective_classes++;
            }
        }
        var elective_GPA = elective_GPA / elective_classes;
        return elective_GPA;
    }
  
    calculate_total_GPA(){
        // Calculate the total GPA
        var core_gpa = this.calculate_core_GPA();
        var elective_gpa = this.calculate_elective_GPA();
        var total_gpa = (core_gpa + elective_gpa) / 2;
        return total_gpa;
    }
    
    incomplete_requirements(total_required_courses,core_taken,core_attributes ){
        // Check if the student has completed all requirements
        //to see if there are any F's in the list of cores taken
        //pull it out of the list of cores taken
        //compare the list of all required classes to the list of cores taken
        // output the list of classes that are not in the list of required cores
        //calculate minium gpa for the class inorder to maintain the overall core gpa
        
        for(var i = 0; i < core_taken.length; i++){
            if(core_attributes[i] == 0){
                core_taken.splice(i,1);
            }
        }

        

        let difference = total_required_courses.filter(x => !core_taken.includes(x));

        this.outstanding_req = difference;
        var core_gpa = this.getCoreGPA();

        for(var i = 0; i < courses_taken.length; i++){
            this.count_core_classes = 0;
            if(core_attributes[i] == "0"){
                this.count_core_classes++;
            }
        }
        this.min_gpa = ((3.19 * (this.count_core_classes + difference.length)) - (core_gpa * this.count_core_classes))/ difference.length; 

        
        //return this.outstanding_req;
        return ("The student needs a GPA of" + this.min_gpa + "in" + this.outstanding_req + " to maintain a 3.19 core GPA");
    }

}
