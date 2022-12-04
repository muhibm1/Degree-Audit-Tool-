class Student {
    constructor(name, sid, anticipated_grad, admitted_sem){
        this.name = name; //String
        this.sid = sid; //String
        this.anticipated_grad = anticipated_grad; //String in the form YYYYSpring, YYYYFall, or YYYYSummer
        this.admitted_sem = admitted_sem; //String in the form YYYYSpring, YYYYFall, or YYYYSummer
        this.degree_track = 0; //Integer
        this.courses_taken = []; //List of Strings in the format "CSXXXX"
        this.course_grades = []; //List of floating-point decimals
        this.course_attributes = []; //List of Integers
            //Attribute References: 0=Taken at UTD, Standard; 1=Waived; 2=Transfered; 3=Pass in P/F
        this.course_semesters = [];  //List of Strings in the format "YYYYSpring, YYYYFall, or YYYYSummer"
        this.level_taken = [];  //List of Strings in the format "CSXXXX"
        this.level_grades = []; //List of floating-point decimals
        this.level_attributes = []; //List of Integers
        this.core_taken = []; //List of Strings in the format "CSXXXX"
        this.core_grades = []; //List of floating-point decimals
        this.core_attributes = []; //List of Integers
        this.electives_taken = []; //List of Strings in the format "CSXXXX"
        this.elective_grades = []; //List of floating-point decimals
        this.elective_attributes = []; //List of Integers
        this.thesis = false; 
        this.fasttrack = false;
        this.total_GPA = 0.000;
        this.core_GPA = 0.000;
        this.elective_GPA = 0.000;
        this.credits = 0;
    }

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
    getFastTrack(){ return this.fasttrack; }
    getTotalGPA(){ return this.total_GPA; }
    getCoreGPA(){ return this.core_GPA; }
    getElectiveGPA(){ return this.elective_GPA; }
    getCredits(){ return this.credits; }

    setName(name){ this.name = name; }
    setSID(sid){ this.sid = sid; }
    setAnticipatedGraduation(antic){ this.anticipated_grad = antic; }
    setAdmittedSemester(admit){ this.admitted_sem = admit; }
    setDegreeTrackID(id){ this.degree_track = id; }
    addCourseTaken(course){ this.courses_taken.push(course); }
    addCourseGrade(grade){ this.course_grades.push(grade); }
    addCourseAttribute(att){ this.course_attributes.push(att); }
    addCourseSemester(sem){ this.course_semesters.push(sem); }
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
    setFastTrack(bool){ this.fasttrack = bool; }
    setTotalGPA(gpa){ this.total_GPA = gpa; }
    setCoreGPA(gpa){ this.core_GPA = gpa; }
    setElectiveGPA(gpa){ this.elective_GPA = gpa; }
    setCredits(cred){ this.credits = cred; }
    setCourseTaken(index, course){ this.courses_taken[index]= course; }
    setCourseGrade(index, grade){ this.course_grades[index] = grade; }
    setCourseAttribute(index, att){ this.course_attributes[index] = att; }
    setCourseSemester(index, sem){ this.course_semesters[index] = sem; }
    setLevelCourseTaken(index, course){ this.level_taken[index] = course; }
    setLevelCourseGrade(index, grade){ this.level_grades[index] = grade; }
    setLevelCourseAttribute(index, att){ this.level_attributes[index] = att; }
    setElectiveCourseTaken(index, course){ this.electives_taken[index] = course; }
    setElectiveCourseGrade(index, grade){ this.elective_grades[index] = grade; }
    setElectiveCourseAttribute(index, att){ this.elective_attributes[index] = att; }
    setCoreCourseTaken(index, course){ this.core_taken[index] = course; }
    setCoreCourseGrade(index, grade){ this.core_grades[index] = grade; }
    setCoreCourseAttribute(index, att){ this.core_attributes[index] = att; }
}