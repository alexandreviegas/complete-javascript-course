// var john = {
//     firstName: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

// var Person = function(firstName, yearOfBirth, job){
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person.prototype.calculateAge = function() {
//     return 2019 - this.yearOfBirth;
// }

// Person.prototype.lastName = 'Smith';

// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'desginer');
// var mark = new Person('Mark', 1948, 'retired');

// var personProto = {
//     calculateAge: function() {
//         console.log(2019 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);
// john.firstName = 'Jonh';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//     firstName: { value: 'Jane'},
//     yearOfBirth: { value: 1969},
//     job: { value: 'designer'},
// });

// var a = 23;
// var b = a;
// a = 46;

// console.log(a);
// console.log(b);

// var obj1 = {
//     name: 'John',
//     age: 23
// }

// var obj2 = obj1;
// var obj3 = Object.assign({}, obj1);

// obj1.age = 30;
// console.log(obj1);
// console.log(obj2);
// console.log(obj3);

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCal(arr, fn) {
//     var arrRes = [];
//     for (var i = 0; i < arr.length; i++) {
//         arrRes.push(fn(arr[i]));
//     }

//     return arrRes;
// }

// function calculateAge(el) {
//     return 2019 - el;
// }

// function retirementAge(el) {
//     return 65 - el;
// }

// function isFullAge(el) {
//     return el >= 28;
// }

// function maxHeartRate(el) {
//     if (el >= 18 && el <=81) {
//         return Math.round(206.9 - (0.67 * el))
//     }else {
//         return -1;
//     }

// }

// var ages = arrayCal(years, calculateAge);

// var fullAges = arrayCal(ages, isFullAge);

// var rates = arrayCal(ages, maxHeartRate);

// var retirements = arrayCal(ages, retirementAge);


// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(name + ', can you please explain what UX design is?');
//         }
//     } else if (job === 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//     } else {
//         return function(name) {
//             console.log('Hello ' + name + ', what do you do?');
//         }
//     }
// }


// var teacherQuestion= interviewQuestion('teacher');

// teacherQuestion('John');

// var designerQuestion= interviewQuestion('designer');

// designerQuestion('Jane');
// designerQuestion('Mark');

// interviewQuestion('developer')('Alex');


//IIFE

// (function(goodLuck) {
//     var score = Math.random() * 10;
//     console.log(score >= 5 - goodLuck);
// })(4);



// function retirementAge(retirementAge) {
//     var text = ' years left until retirement';
//     return function(yearOfBirth) {
//         var age = 2019 - yearOfBirth;
//         console.log((retirementAge - age) + text );
//     }
// }

// var retirementUS = retirementAge(66);
// retirementUS(1979);

// var retirementGermany = retirementAge(65);
// retirementGermany(1979);

// var retirementIceland = retirementAge(67);
// retirementIceland(1979);

// function interviewQuestion(job) {
//     return function(name) {
//         if (job === 'designer') {
//             console.log(name + ', can you please explain what UX design is?');
//         } else if (job === 'teacher') {
//             console.log('What subject do you teach, ' + name + '?');
//         } else {
//             console.log('Hello ' + name + ', what do you do?');
//         }
//     }


// }

// var teacherQuestion= interviewQuestion('teacher');
// teacherQuestion('John');

// var designerQuestion= interviewQuestion('designer');
// designerQuestion('Jane');
// designerQuestion('Mark');

// interviewQuestion('developer')('Alex');

//----------------------------------------------------------------------------------------------------------------
//Desafio 7
(function() {

    var Question = function(question, possibleAnswers, correctAnswer) {
        this.question = question;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.showQuestion = function() {
        console.log(this.question);
        for(var i = 0; i < this.possibleAnswers.length; i++) {
            console.log(i+ ': ' + this.possibleAnswers[i]);
        }
    };

    Question.prototype.checkAnswer = function(answer, callbackFn) {
        var score;
        if(this.correctAnswer === answer) {
            console.log('Congratulations! Your answer is correct!');
            score = callbackFn(true);
        } else {
            console.log('Sorry! Try again!');
            score = callbackFn(false);
        }

        this.showScore(score);
    };

    Question.prototype.showScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('-------------------------');
    }

    function score() {
        var score = 0;
        return function(correct) {
            return correct ? ++score : score;
        }
    }

    var keepScore = score();

    var questions = [];

    questions.push(new Question('Qual seu nome?', ['Alexandre', 'Beltrano', 'Ciclano'], 0));
    questions.push(new Question('Em que ano você nasceu?', ['1979', '1978', '1980'], 0));
    questions.push(new Question('Onde você mora?', ['Belém', 'Santarém', 'Monte Dourado'], 0));
    questions.push(new Question('Onde você nasceu?', ['Belém', 'Santarém', 'Monte Dourado'], 1));
    questions.push(new Question('Onde você morou na adolescência?', ['Belém', 'Santarém', 'Monte Dourado'], 2));

    function nextQuestion() {
        var random = Math.floor(Math.random() * questions.length);
        questions[random].showQuestion();

        var userAnswer = prompt(this.question);
        if (userAnswer !== 'exit') {
            questions[random].checkAnswer(parseInt(userAnswer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();
})();






















