

class GPA_Calculator {

    constructor() {
        this.outstanding_req = "";
        this.core_credits = 0;
        this.core_gpa = 0;
        this.elective_credits = 0;
        this.elective_gpa = 0;
        this.total_credits = 0;
        this.total_gpa = 0;

    }
   

    //get the list of outstanding required core courses
    getOutStaningRequirements() {
        return this.outstanding_req_string;
    }

    //gets the core gpa
    getCoreGPA() {
        return this.core_gpa;
    }


    calculate_core_GPA(cores_taken, core_grades, core_attributes) {
        // Calculate the core GPA
        var cores_taken = cores_taken;
        var core_gradesNum = [];
        core_grades.forEach(str => { 
            core_gradesNum.push(parseFloat(str)) });

        var core_attributes = core_attributes;
        var credit_holder =[];
       
        for (var i = 0; i < cores_taken.length; i++) {
            if (core_attributes[i] == "0") {
                credit_holder[i] = cores_taken[i].charAt(3);
                if(credit_holder[i] = 'V'){
                    credit_holder[i] = '3';
                }
                
                this.core_credits += Number(credit_holder[i]);
                this.core_gpa += (core_gradesNum[i] * Number(credit_holder[i]));
            }    
        }
        console.log(cores_taken);
        console.log(core_gradesNum);
        console.log(core_attributes); 
        console.log(credit_holder);  
        console.log(this.core_credits);
        console.log(this.core_gpa);
        this.core_gpa = this.core_gpa / this.core_credits;
        console.log(this.core_gpa.toFixed(3));
        return this.core_gpa.toFixed(3);
    }

    calculate_elective_GPA(electives_taken, elective_grades, elective_attributes) {
        // Calculate the core GPA
        var electives_taken = electives_taken;
        var elective_gradesNum = [];
        var credit_holder =[];
        elective_grades.forEach(str => { 
            elective_gradesNum.push(parseFloat(str)) });

        var elective_attributes = elective_attributes;
        var credit_holder =[];
       
        for (var i = 0; i < electives_taken.length; i++) {
            if (elective_attributes[i] == "0") {
                credit_holder[i] = electives_taken[i].charAt(3);
                if(credit_holder[i] = 'V'){
                    credit_holder[i] = '3';
                }
                
                this.elective_credits += Number(credit_holder[i]);
                this.elective_gpa += (elective_gradesNum[i] * Number(credit_holder[i]));
            }    
        }

        console.log(electives_taken);
        console.log(elective_gradesNum);
        console.log(elective_attributes);
        console.log(credit_holder);  
        console.log(this.elective_credits);
        console.log(this.elective_gpa);

        this.elective_gpa /= this.elective_credits;
        console.log(this.elective_gpa.toFixed(3));
        return this.elective_gpa.toFixed(3);
    }

    calculate_total_GPA(coursesTaken, courseGrades, courseAttributes) {
        var coursesTaken = coursesTaken;
        var courseGrades = courseGrades;
        var courseAttributes = courseAttributes;
        var courseGradesNum = [];
        var credit_holder =[];
   
        courseGrades.forEach(str => {
            courseGradesNum.push(parseFloat(str)) });


        var credit_holder =[];
        for (var i = 0; i < coursesTaken.length; i++) {
            credit_holder[i] = coursesTaken[i].charAt(3);
            if(credit_holder[i] = 'V'){
                credit_holder[i] = '3';
            }
            this.total_credits += Number(credit_holder[i]);
            this.total_gpa += (courseGradesNum[i] * Number(credit_holder[i]));
        }
        console.log(coursesTaken);
        console.log(courseGradesNum);
        console.log(courseAttributes);
        console.log(credit_holder);
        console.log(this.total_credits);
        console.log(this.total_gpa);
        this.total_gpa /= this.total_credits;
        console.log(this.total_gpa.toFixed(3));
        return this.total_gpa.toFixed(3);
    }


    incomplete_requirements(total_required_courses, core_taken, core_attributes, core_grades) {
        var total_required_courses = total_required_courses;
        var core_taken = core_taken;
        var core_attributes = core_attributes;
        var core_gpa = this.core_gpa;
        core_grades = core_grades;
        console.log(core_gpa);

        for (var i = 0; i < core_attributes.length; i++) {

            if (core_attributes[i] == 0) {
                if (core_grades[i] < 2.000) {
                    core_taken.splice(i, 1);
                    core_grades.splice(i, 1);
                    core_attributes.splice(i, 1); 
                    i = 0;
                }
            }

        }

        let difference = total_required_courses.filter(x => !core_taken.includes(x));

        var count_core_classes_taken = core_taken.length;
        var count_core_classes_required = difference.length;

        var min_gpa = ((3.19 * (count_core_classes_taken + count_core_classes_required)) - (core_gpa * count_core_classes_taken)) / count_core_classes_required;

        this.precise_min_gpa = min_gpa.toFixed(3);
        console.log(this.precise_min_gpa);

        this.outstanding_req_string = "The student needs a GPA of " + this.precise_min_gpa + " in " + difference + " to maintain a 3.19 core GPA";
        console.log(this.outstanding_req_string);
        return this.outstanding_req_string

    }
}

