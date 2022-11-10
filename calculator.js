
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

 function calculate_core_GPA(cores_taken,core_grades,core_attributes){
        // Calculate the core GPA
        var core_GPA = 0.000;
        this.sum_core_GPA = 0;
        var credit_holder = [];
        this.core_total_credit_pts = 0;

        cores_taken = cores_taken;
        core_grades = core_grades;
        core_attributes = core_attributes;

        for(var i = 0; i < cores_taken.length-1; i++){
            if(core_attributes[i] == "0"){
                credit_holder[i]= a1[i].charAt(3);
                core_total_credit_pts =  core_total_credit_pts + Number(credit_holder[i]);

                this.sum_core_GPA = sum_core_GPA + (core_grades[i]*Number(+a1[i].charAt(3)));
              }
        
        }
        core_GPA = sum_core_GPA / core_total_credit_pts;
        return core_GPA.toFixed(3);
        //console.log(core_GPA.toFixed(3));
 }
    
    calculate_elective_GPA(electives_taken,elective_grades,elective_attributes){
        // Calculate the core GPA
        var elective_GPA = 0.000;
        this.sum_elective_GPA = 0;
        var credit_holder = [];
        this.elective_total_credit_pts = 0;

        electives_taken = electives_taken;
        elective_grades = elective_grades;
        elective_attributes = elective_attributes;

        for(var i = 0; i < electives_taken.length-1; i++){
            if(elective_attributes[i] == "0"){
                credit_holder[i]= a1[i].charAt(3);
                elective_total_credit_pts =  elective_total_credit_pts + Number(credit_holder[i]);

                this.sum_elective_GPA = sum_elective_GPA + (elective_grades[i]*Number(+a1[i].charAt(3)));
            }

        }

        elective_GPA = sum_elective_GPA / elective_total_credit_pts;
        return elective_GPA.toFixed(3);
        //console.log(elective_GPA.toFixed(3));

    }
    
     calculate_total_GPA(sum_core_GPA, sum_elective_GPA ,core_total_credit_pts, elective_total_credit_pts){
        this.sum_core_GPA = sum_core_GPA;
        this.sum_elective_GPA = sum_elective_GPA;
        this.core_total_credit_pts = core_total_credit_pts;
        this.elective_total_credit_pts = elective_total_credit_pts;
        var total_GPA = 0.000;
        var total_credit_pts = 0;
        total_credit_pts = core_total_credit_pts + elective_total_credit_pts;
        total_GPA = (sum_core_GPA + sum_elective_GPA) / total_credit_pts;

        return total_GPA.toFixed(3);

     }         
    
     incomplete_requirements(total_required_courses,core_taken,core_attributes ){
        total_required_courses = total_required_courses;
        core_taken = core_taken;
        core_attributes = core_attributes;
        core_gpa = getCoreGPA();



        for(var i = 0; i < core_attributes.length-1; i++){

            if(core_attributes[i] == "1"){
                core_taken.splice(i,1);
                core_attributes.splice(i,1);
                i =0;
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
