/**********************8
 * CODING CHALLENGE 1
 */

// var markMass, markHeight, markBMI, johnMass, johnHeight, johnBMI;

// markMass = 100;
// markHeight = 1.8;

// johnMass = 90;
// johnHeight = 1.9;

// markBMI = markMass / (markHeight * markHeight);

// johnBMI = johnMass / (johnHeight * johnHeight);

// var isMarkBMIHigher = markBMI > johnBMI;

// console.log("Is Mark's BMI higher than John's? " + isMarkBMIHigher);

// var firstName = 'John';
// var job = 'teacher';
// switch (job) {
//     case 'teacher':
//     case 'instructor':
//         console.log(firstName + ' teaches kids how to code.');
//         break;
//     case 'driver':
//         console.log(firstName + ' drives an uber in Lisbon.');
//         break;
//     case 'designer':
//         console.log(firstName + ' designs beautiful websites.');
//         break;
//     default:
//         console.log(firstName + ' does something else.');
// }

// var johnFirstScore, johnSecondScore, johnThirdScore, johnScoreAverage;
// var mikeFirstScore, mikeSecondScore, mikeThirdScore, mikeScoreAverage;
// var maryFirstScore, marySecondScore, maryThirdScore, maryScoreAverage;

// johnFirstScore = 89;
// johnSecondScore = 120;
// johnThirdScore = 103;
// johnScoreAverage = (johnFirstScore + johnSecondScore + johnThirdScore) / 3;

// mikeFirstScore = 116;
// mikeSecondScore = 94;
// mikeThirdScore = 123;
// mikeScoreAverage = (mikeFirstScore + mikeSecondScore + mikeThirdScore) / 3;

// maryFirstScore = 97;
// marySecondScore = 134;
// maryThirdScore = 105;
// maryScoreAverage = (maryFirstScore + marySecondScore + maryThirdScore) / 3;

// switch(true) {
//     case johnScoreAverage > mikeScoreAverage && johnScoreAverage > maryScoreAverage:
//         console.log('John\'s team is the winner with an average of ' + johnScoreAverage + ' points');
//         break;
//     case mikeScoreAverage > johnScoreAverage && mikeScoreAverage > maryScoreAverage:
//         console.log('Mikes\'s team is the winner with an average of ' + mikeScoreAverage + ' points');
//         break;
//     case maryScoreAverage > johnScoreAverage && maryScoreAverage > mikeScoreAverage:
//         console.log('Mary\'s team is the winner with an average of ' + mikeScoreAverage + ' points');
//         break;
//     default:
//         console.log('All the teams had a draw');
// }

// var bills = [124, 48, 268];

// var calculateTip = function(bill) {
//     switch(true) {
//         case bill < 50:
//             return bill * 20 / 100;
//         case bill >= 50 && bill <= 200:
//             return bill * 15 / 100;
//         default:
//             return bill * 10 / 100;
//     }
// }

// var tips = [calculateTip(bills[0]), calculateTip(bills[1]), calculateTip(bills[2])];
// var finalAmounts = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// console.log(bills);
// console.log(tips);
// console.log(finalAmounts);

// var calculateBMI = function (mass, height){
//     return mass / (height * height);
// }

// var john = {
//     firstName: 'John',
//     lastName: 'Smith',
//     mass: 92,
//     height: 1.95,
//     fullName: function() {
//         return this.firstName + ' ' + this.lastName;
//     },
//     bmi: function (){
//         return this.mass / (this.height * this.height);
//     }
// }

// var mark = {
//     firstName: 'Mark',
//     lastName: 'Wayne',
//     mass: 78,
//     height: 1.69,
//     fullName: function() {
//         return this.firstName + ' ' + this.lastName;
//     },
//     bmi: function (){
//         return this.mass / (this.height * this.height);
//     }
// }

// if(mark.bmi() > john.bmi()){
//     console.log(mark.fullName() + ' has the highest BMI');
// } else if(john.bmi() > mark.bmi()) {
//     console.log(john.fullName() + ' has the highest BMI');
// } else {
//     console.log(mark.fullName() +' and ' + john.fullName() +' John have the same BMI');
// }


var john = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    finalAmounts: [],
    calculateTips: function() {
        for (var i = 0; i < this.bills.length; i++) {

            var tip, percentage;
            var bill = this.bills[i];

            if (bill < 50) {
                percentage = 20 / 100;
            } else if (bill >= 50 && bill <= 200) {
                percentage = 15 / 100;
            } else{
                percentage = 10 / 100;
            }
            tip = bill * percentage;
            this.tips.push(tip);
            this.finalAmounts.push(bill + tip);
        }
    }
}

var mark = {
    bills: [77, 375, 110, 45],
    tips: [],
    finalAmounts: [],
    calculateTips: function() {
        for (var i = 0; i < this.bills.length; i++) {
            var tip, percentage;
            var bill = this.bills[i];

            if (bill < 100) {
                percentage = 20 / 100;
            } else if (bill >= 100 && bill <= 300) {
                percentage = 15 / 100;
            } else{
                percentage = 25 / 100;
            }
            tip = bill * percentage;
            this.tips.push(tip);
            this.finalAmounts.push(bill + tip);
        }
    }
}

john.calculateTips();
mark.calculateTips();

var tipsAverage = function(tips) {
    var sum = 0;
    var tipsCount = tips.length;
    for (var i = 0; i < tipsCount; i++) {
        sum += tips[i];
    }
    return sum / tipsCount;
}

john.average = tipsAverage(john.tips);
mark.average = tipsAverage(mark.tips);

console.log(john, mark);

if (john.average > mark.average) {
    console.log(john.fullName() + '\'s average is the highest');
} else if (mark.average > john.average) {
    console.log(mark.fullName() + '\'s average is the highest');
} else {
    console.log(john.fullName() + ' and ' + mark.fullName() + '\'s average is the same');
}
