class Student {
    constructor(name, sid, anticipated_grad, admitted_sem){
        this.name = name;
        this.sid = sid;
        this.anticipated_grad = anticipated_grad;
        this.admitted_sem = admitted_sem;
        this.courses_taken = [];
        this.course_grades = [];
        this.course_attributes = [];
        this.level_taken = [];
        this.level_grades = [];
        this.level_attributes = [];
        this.core_taken = [];
        this.core_grades = [];
        this.core_attributes = [];
        this.electives_taken = [];
        this.elective_grades = [];
        this.elective_attributes = [];
        this.thesis = false;
        this.total_GPA = 0.000;
        this.core_GPA = 0.000;
        this.elective_GPA = 0.000;
        this.credits = 0;
    }

    getName(){ return this.name; }
    getSID(){ return this.sid; }
    getAnticipatedGraduation(){ return this.anticipated_grad; }
    getAdmittedSemester(){ return this.admitted_sem; }
    getCoursesTaken(){ return this.courses_taken; }
    getCourseGrades(){ return this.course_grades; }
    getCourseAttributes(){ return this.course_attributes; }
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

    setName(name){ this.name = name; }
    setSID(sid){ this.sid = sid; }
    setAnticipatedGraduation(antic){ this.anticipated_grad = antic; }
    setAdmittedSemester(admit){ this.admitted_sem = admit; }
    addCourseTaken(course){ this.courses_taken.push(course); }
    addCourseGrade(grade){ this.course_grades.push(grade); }
    addCourseAttribute(att){ this.course_attributes.push(att); }
    addLevelCourseTaken(course){ this.level_taken.push(course); }
    addLevelCourseGrade(grade){ this.level_grades.push(grade); }
    addLevelCourseAttribute(att){ this.level_attributes.push(att); }
    addElectiveCourseTaken(course){ this.electives_taken.push(course); }
    addElectiveCourseGrade(grade){ this.elective_grades.push(grade); }
    addElectiveCourseAttribute(att){ this.elective_attributes.push(att); }
    addCoreCourseTaken(course){ this.core_taken.push(course); }
    addCoreCourseGrade(grade){ this.core_grades.push(grade); }
    addCoreCourseAttribute(att){ this.core_attributes.push(att); }
    setThesis(bool){ this.thesis = bool; }
    setTotalGPA(gpa){ this.total_GPA = gpa; }
    setCoreGPA(gpa){ this.core_GPA = gpa; }
    setElectiveGPA(gpa){ this.elective_GPA = gpa; }
    setCredits(cred){ this.credits = cred; }
}