
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

        for(var i = 0; i < cores_taken.length; i++){
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
    
function calculate_elective_GPA(electives_taken,elective_grades,elective_attributes){
    // Calculate the core GPA
    var elective_GPA = 0.000;
    this.sum_elective_GPA = 0;
    var credit_holder = [];
    this.elective_total_credit_pts = 0;
    
    electives_taken = electives_taken;
    elective_grades = elective_grades;
    elective_attributes = elective_attributes;

    for(var i = 0; i < electives_taken.length; i++){
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
    
 function calculate_total_GPA(sum_core_GPA, sum_elective_GPA ,core_total_credit_pts, elective_total_credit_pts){
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

        
        //return this.outstanding_req_string;
        this.outstanding_req_string = "The student needs a GPA of" + this.min_gpa + "in" + this.outstanding_req + " to maintain a 3.19 core GPA";
        return this.outstanding_req_string;
    }

}
