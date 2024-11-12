// 1. Börja med att skapa en skola som en klass. Skolan ska innehålla egenskaperna: name, address, zipcode, city, students med värdet av en tom array och teachers som en tom array. Skapa sen en instans av klassen med ett namn som du väljer.
class School {
  constructor(name, address, zipcode, city) {
    this.name = name;
    this.address = address;
    this.zipcode = zipcode;
    this.city = city;
    this.students = [];
    this.teachers = [];
  }

  addTeacher(teacher) {
    this.teachers.push(teacher);
  }

  addStudent(student) {
    this.students.push(student);
  }

  relegateStudent(student) {
    const subjects = [
      frontendDevelopment,
      backendDevelopment,
      databaseManagement,
    ];

    this.students = this.students.filter(
      (iterationElement) => iterationElement !== student
    );

    subjects.forEach((subject) => {
      const isStudentEnlisted = subject.students.includes(student);

      if (isStudentEnlisted) {
        subject.students = subject.students.filter(
          (iterationElement) => iterationElement !== student
        );
      }
    });
  }

  fireTeacher(teacher) {
    const subjects = [
      frontendDevelopment,
      backendDevelopment,
      databaseManagement,
    ];

    this.teachers = this.teachers.filter(
      (iterationElement) => iterationElement !== teacher
    );

    subjects.forEach((subject) => {
      if (subject.teacher === teacher) {
        subject.teacher = null;
      }
    });
  }
}

const developerSchool = new School(
  "Utvecklarskolan",
  "Utvecklargatan",
  "123 45",
  "Utvecklare"
);

// 2. Skapa tre stycken olika ämnen. För att göra det så behöver du en klass för ämne. Ett ämne ska ha name, students som en tom array och teacher som null till en början.
class Subject {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teacher = {};
  }

  addStudent(student) {
    const exists = developerSchool.students.includes(student);

    if (exists) {
      this.students.push(student);
    }
  }

  addTeacher(teacher) {
    const exists = developerSchool.teachers.includes(teacher);

    if (exists) {
      this.teacher = teacher;
    }
  }

  quitSubject(student) {
    sharedQuitSubject(student, this);
  }

  removeTeacher(teacher) {
    sharedRemoveTeacher(teacher, this);
  }
}

const frontendDevelopment = new Subject("Frontend-utveckling");
const backendDevelopment = new Subject("Backend-utveckling");
const databaseManagement = new Subject("Databashantering");

// 3. Skapa en klass för Student och sen fem instanser av den klassen. Egenskaperna ska vara name, age och subjects som en tom array.
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.subjects = [];
    this.grades = [];
  }

  enlistToSubject(subject) {
    this.subjects.push(subject);
    subject.students.push(this);
  }

  quitSubject(subject) {
    sharedQuitSubject(this, subject);
  }
}

const bengt = new Student("Bengt", "21");
const ulrika = new Student("Ulrika", "33");
const gustaf = new Student("Gustaf", "37");
const sara = new Student("Sara", "26");
const niklas = new Student("Niklas", "19");

// 4. Skapa en klass i Teacher där egenskaperna är name och subjects som en tom array.
class Teacher {
  constructor(name) {
    this.name = name;
    this.subjects = [];
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }

  removeTeacher(subject) {
    sharedRemoveTeacher(this, subject);
  }
}

const goran = new Teacher("Göran");
const linda = new Teacher("Linda");

// 5. Skapa en metod i Teacher som lägger till ett ämne i en lärares ämnesarray.
/*
  addSubject(subject) {
    this.subjects.push(subject);
  }
*/

// 6. Skapa en metod i Subject som lägger till en Student i ett ämnes studentarray.
/*
  addStudent(student) {
    const exists = developerSchool.students.includes(student);

    if (exists) {
      this.students.push(student);
    }
  }
*/

/* 7. Som tidigare så ska vi lägga till en koppling på båda sidorna när vi lägger till saker. Ska vi till exempel lägga till en ett ämne som en lärare utbildar i så måste vi lägga till en referens till ämnet i lärarens ämnesarray och en referens till läraren i ämnesklassen.

Då har vi en referens på båda sidorna.

Egentligen är detta något som kallas för en cirkulär referens vilket vi helst vill undvika när vi programmerar, då kan orsaka krashar i vissa fall, men i syftet för uppgiften så är det ingen fara.

Skapa nu en fristående funktion som heter addSubjectToTeacher som tar emot ett ämne och en lärare, och parar ihop dessa. Returnera sen läraren så du kan se förändringen i lärarens ämnesarray. */
function addSubjectToTeacher(subject, teacher) {
  const exists = developerSchool.teachers.includes(teacher);

  if (exists) {
    teacher.subjects.push(subject);
    subject.teacher = teacher;
    return teacher;
  }
}

// 8. Varför ha en fristående funktion som lägger till ämne till en lärare? Varför inte bara lägga till en funktion (alltså en metod eftersom funktionen då är kopplad till ett specifikt objekt) i lärarnas objekt som en egenskap? Prova denna nya metod i konsolen.

// 9. Skapa följande metoder och lägg in de i rätt klass: addTeacher, enlistToSubject, addStudent, addSubject.
/*
  1#:
  addTeacher(teacher) {
    this.teachers.push(teacher);
  }
    
  #2:
  addTeacher(teacher) {
    const exists = developerSchool.teachers.includes(teacher);

    if (exists) {
      this.teacher = teacher;
    }
  }

  #3:
  enlistToSubject(subject) {
    this.subjects.push(subject);
    subject.students.push(this);
  }

  #1:
  addStudent(student) {
    this.students.push(student);
  }
*/

// 10. Prova att leka runt med alla de skapade metoderna i konsolen och försöka lägga till i de olika instanserna. Skriv ut instansen hela tiden och inspektera dem. Tänk dig nu ett adminprogram för en skola där en admin till exempel skriver ut en lista på alla ämnen för att se vilka respektive lärare som är ansvariga för respektive kurs. Klasser och metoder som vi har skapat hittils skulle kunna existera i ett sådant program.

// 11. Skapa fler metoder, quitSubject, removeTeacher, relegateStudent, fireTeacher. I vilka klasser hör dessa metoder hemma? Och om vi till exempel sparkar en lärare, så måste vi ju ta bort lärarens koppling med skolan, och ämnet/ämnerna som läraren undervisar i. Hur löser vi detta i våra metoder, nu får vi börja tänka oss för lite.
function sharedQuitSubject(student, subject) {
  student.subjects = student.subjects.filter((el) => el !== subject);
  subject.students = subject.students.filter((el) => el !== student);
}
/*
  #2:
  quitSubject(student) {
    sharedQuitSubject(student, this);
  }

  #3:
  quitSubject(subject) {
    sharedQuitSubject(this, subject);
  }
*/

function sharedRemoveTeacher(teacher, subject) {
  if (this.teacher === teacher) {
    this.teacher = null;
  }

  teacher.subjects = teacher.subjects.filter((el) => el !== teacher);
}
/*
  #2:
  removeTeacher(teacher) {
    sharedRemoveTeacher(teacher, this);
  }

  #4:
  removeTeacher(subject) {
    sharedRemoveTeacher(this, subject);
  }
*/

// #1: relegateStudent & fireTeacher

// 12. Lek runt med dessa metoder i konsolen. Lägg till lite här och ta bort lite där. Rätt smidigt va?

// 13. Ny bygger vi på det lite. För att undvika att behöva anropa massa metoder i konsolen när vi startar om programmet (vilket händer vid varje redigering av script-filen) så kan vi längst ner i script-filen skapa ( alltså den koden läses in sist hela tiden ) logik för att koppla några studenter till skolan, några ämnen till studenterna och några lärare till ämnena och så vidare. Skapa sån logik nu.
developerSchool.addStudent(bengt);
developerSchool.addStudent(ulrika);
developerSchool.addStudent(gustaf);
developerSchool.addStudent(sara);
developerSchool.addStudent(niklas);

developerSchool.addTeacher(goran);
developerSchool.addTeacher(linda);

bengt.enlistToSubject(frontendDevelopment);
ulrika.enlistToSubject(backendDevelopment);
gustaf.enlistToSubject(databaseManagement);
sara.enlistToSubject(frontendDevelopment);
niklas.enlistToSubject(backendDevelopment);

addSubjectToTeacher(frontendDevelopment, goran);
addSubjectToTeacher(backendDevelopment, linda);
addSubjectToTeacher(databaseManagement, goran);

// 14. Skapa en fristående funktion displayAllStudents som tar emot en skola och loopar igenom skolans alla studenter och skriver ut alla studenterna i konsolen.
function displayAllStudents() {
  /*   const studentsList = [];
      
  for (const key in developerSchool.students) {
    studentsList.push(developerSchool.students[key]);
  }

  return studentsList; */

  return developerSchool.students;
}

// 15. Skapa nu fler fristående funktioner, displayAllSubjectsOfStudent(student), displayAllStudentsEnlistedToSubject(subject), displayAllTeachers. Varje funktion bör ha något returvärde.
function displayAllSubjectsOfStudent(student) {
  return student.subjects;
}

function displayAllStudentsEnlistedToSubject(subject) {
  return subject.students;
}

function displayAllTeachers() {
  return developerSchool.teachers;
}

// 16. Bygg ut med ett ytterligare typ av klasser, lägg till klass som handlar om betyg. Vilka egenskaper ska dessa ha? Vilka metoder kan behövas i denna betygsklass? Hur ska relationen mellan de andra klasserna vara? Vilka metoder bör finnas i de andra typerna av klasser som behandlar betyg? Försöka lösa detta och inspektera och lek runt med det i konsolen.
class Grades {
  addGrade(student, subject, grade) {
    student.grades.push({ subject, grade });
  }

  removeGrade(student, subject, grade) {
    const index = student.grades.findIndex(
      (entry) => entry.subject === subject && entry.grade === grade
    );

    if (index !== -1) {
      student.grades.splice(index, 1);
    }
  }

  listGrades(student) {
    return student.grades;
  }

  listGradesForSubject(student, subject) {
    return student.grades.filter((entry) => entry.subject === subject);
  }
}

const grades = new Grades();
