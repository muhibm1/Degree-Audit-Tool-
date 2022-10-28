


class GPA_Calculator extends Student{
    constructor(name, sid, anticipated_grad, admitted_sem){
        super(name, sid, anticipated_grad, admitted_sem);
    }

    calculateGPA(){
        var totalGPA = 0.000;
        var coreGPA = 0.000;
        var electiveGPA = 0.000;
        var credits = 0;
        var coreCredits = 0;
        var electiveCredits = 0;
        const  minimum_core_gpa = 3.19;
        const minimum_elective_gpa = 3.0;
        const minimum_total_gpa = minimum_elective_gpa;
        var number_of_P =0;
        var number_of_F =0;
        course_grades = this.getCourseGrades();
        course_attributes = this.getCourseAttributes();
        core_grades = this.getCoreCourseGrades();
        core_attributes = this.getCoreCourseAttributes();
        elective_grades = this.getElectiveCourseGrades();
        elective_attributes = this.getElectiveCourseAttributes();
        
        //need to see what track the student is on and figure out how many class the student needs to take

        //need to see how to recognoze and deal with Ps and Fs

        for(var i = 0; i < course_grades.length; i++){
            //still need to calculate GPA with just passes and fails
            if(course_attributes[i] == "Core"){
                coreGPA += course_grades[i];
                coreCredits++;
            }
            //still need to calculate GPA with just passes and fails
            else if(course_attributes[i] == "Elective"){
                electiveGPA += course_grades[i];                                                                                                                                
                electiveCredits++;
            }
            totalGPA += course_grades[i];
            credits++;
        }

        totalGPA /= credits;
        coreGPA /= coreCredits;
        electiveGPA /= electiveCredits;
        
        //check to see if the student needs to take antoher core course
        if(coreGPA < minimum_core_gpa){
            
        }
        //check to see if the student needs to take antoher elective course
        if(electiveGPA < minimum_elective_gpa){

        }
        //checks to see if the student needs to take another course to meet the minimum total gpa
        if(totalGPA < minimum_total_gpa){

        }

        //needs to make check if all class are C+ or higher (some professsor might not follow thw grade ranges for letter grades)

        //needs to see how many class that need to be taken

    

        this.total_GPA = totalGPA;
        this.core_GPA = coreGPA;
        this.elective_GPA = electiveGPA;
        this.credits = credits;
    }

    getTotalGPA(){ return this.total_GPA; }
    getCoreGPA(){ return this.core_GPA; }
    getElectiveGPA(){ return this.elective_GPA; }
    getCredits(){ return this.credits; }
}
