
class GPA_Calculator {

    constructor(){
        this.outstanding_req = "";
        this.core_credits = 0;
        this.core_gpa = 0;
        this.elective_credits = 0;
        this.elective_gpa = 0;
        this.total_credits = 0;
        this.total_gpa = 0;
    }
    //get the list of outstanding required core courses
    getOutStaningRequirements(){
        return this.outstanding_req;
    }

    //gets the core gpa
    getCoreGPA(){
        return this.core_gpa;
    }

    calculate_core_GPA(cores_taken,core_grades,core_attributes){
        // Calculate the core GPA
        for(var i = 0; i < cores_taken.length; i++){
            if(core_attributes[i] == "0"){
                const nameLength = cores_taken[i].length;
                var credit_holder = cores_taken[i].charAt(nameLength-3);
                this.core_credits += Number(credit_holder);
                this.core_gpa += (core_grades[i]*Number(credit_holder));
            }
        
        }
        this.core_gpa /= this.core_credits;
        return this.core_gpa.toFixed(3);
    }
    
    calculate_elective_GPA(electives_taken,elective_grades,elective_attributes){
        // Calculate the core GPA
        for(var i = 0; i < electives_taken.length; i++){
            if(elective_attributes[i] == "0"){
                const nameLength = electives_taken[i].length;
                var credit_holder = electives_taken[i].charAt(nameLength-3);
                this.elective_credits += Number(credit_holder);
                this.elective_gpa += (elective_grades[i]*Number(credit_holder));
            }
        }
        this.elective_gpa /= this.elective_credits;
        return this.elective_gpa.toFixed(3);
    }
    
     calculate_total_GPA(coursesTaken, courseGrades, courseAttributes){
        for(var i = 0; i < coursesTaken.length; i++){
            if(courseAttributes[i] == "0"){
                const nameLength = coursesTaken[i].length;
                var credit_holder = coursesTaken[i].charAt(nameLength-3);
                this.total_credits += Number(credit_holder);
                this.total_gpa += (courseGrades[i]*Number(credit_holder));
            }
        }
        this.total_gpa /= this.total_credits;
        return this.total_gpa.toFixed(3);
     }         
    
     incomplete_requirements(total_required_courses,core_taken,core_attributes ){
        total_required_courses = total_required_courses;
        core_taken = core_taken;
        core_attributes = core_attributes;
        core_gpa = getCoreGPA();

        for(var i = 0; i < core_attributes.length-1; i++){

            if(core_attributes[i] == "0"){
                if(core_grades[i] <= 73){
                core_taken.splice(i,1);
                core_grades.splice(i,1);
                core_attributes.splice(i,1);
                i =0;
                }
            }

        } 

        let difference = total_required_courses.filter(x => !core_taken.includes(x));

        this.count_core_classes_taken = core_taken.length;
        this.count_core_classes_required = difference.length;

        min_gpa = ((3.19 * (this.count_core_classes_taken + this.count_core_classes_required)) - (core_gpa * this.count_core_classes_taken))/ this.count_core_classes_required;

        precise_min_gpa = min_gpa.toFixed(3);

        this.outstanding_req_string = "The student needs a GPA of " + precise_min_gpa + " in " + difference + " to maintain a 3.19 core GPA";

        return this.outstanding_req_string
        //console.log(this.outstanding_req_string); 
    }
}
