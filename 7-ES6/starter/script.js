///////////////////////////////
//Lecture: let and const

// //ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller'
// console.log(name5);

// //ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller'
// console.log(name6);

///////////////////////////////
//Lecture: Block and IIFE's

// //ES5
// (function(){
//     var a = 1;
// })();

// //ES6
// {
//     let a = 1;
// }

///////////////////////////////
//Lecture: Strings

// let firstName = 'Alexandre';
// let lastName = 'Ferreira';
// const yearOfBirth = 1979;

// function calculateAge(year) {
//     const now = new Date();
//     return now.getFullYear() - year;
// }

// //ES5
// console.log('This is ' + firstName + ' ' + lastName + '. Born in ' + yearOfBirth + ', today he is ' + calculateAge(yearOfBirth) + ' years old.' );

// //ES6
// console.log(`This is ${firstName} ${lastName}. Born in ${yearOfBirth}, today he is ${calculateAge(yearOfBirth)} years old.`);

///////////////////////////////
//Lecture: Arrow functions

// const years = [1979, 1989, 1982, 1937];

// //ES5
// var ages5 = years.map(function(element, index, array){
//     const now = new Date();
//     return now.getFullYear() - element;
// })

// console.log(ages5);

// //ES6
// let ages6 = years.map((element, index, array) => {
//     const now = new Date();
//     return now.getFullYear() - element;
// });

// console.log(ages6);


//ES5
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         var self = this;
//         document.querySelector('.green').addEventListener('click', function(){
//             var str = 'This is box number ' + self.position + ' and it is ' + self.color + '.';
//             alert(str);
//         });
//     }
// };

// box5.clickMe();

//ES6
// let box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = `This is box number ${this.position} and it is ${this.color} .` ;
//             alert(str);
//         });
//     }
// };

// box6.clickMe();

//That don't work
// let box66 = {
//     color: 'green',
//     position: 1,
//     clickMe: () => {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = `This is box number ${this.position} and it is ${this.color} .` ;
//             alert(str);
//         });
//     }
// };
// box66.clickMe();


// function Person(name) {
//     this.name = name;
// }

// //ES5
// Person.prototype.myFriends5 = function(friends) {
//     var arr = friends.map(function(element) {
//         return this.name + ' is friend with ' + element;
//     }.bind(this));

//     console.log(arr);
// }

// var friends = ['Bob', 'Jane', 'Mark'];

// var john = new Person('John');
// john.myFriends5(friends);

// //ES6
// Person.prototype.myFriends6 = function(friends) {
//     var self = this;
//     var arr = friends.map(element => `${this.name} is friend with ${element}`);

//     console.log(arr);
// }
// new Person('Mike').myFriends6(friends);

///////////////////////////////
//Lecture: destructuring

//ES5
// var john = ['John', 23];
// var name5 = john[0];
// var age5 = john[1];

//ES6
// const [name, age] = ['John', 23];
// console.log(name, age);


// const obj = {
//     firstName: 'John',
//     lastName: 'Smith'
// }

// const { firstName, lastName } = obj;
// console.log(firstName, lastName);

// const { firstName: a, lastName: b } = obj;
// console.log(a, b);

// function calAgeRetirement(year) {
//     const age = new Date().getFullYear() - year;

//     return [age, 65 - age];
// }

// const [age, retirement] = calAgeRetirement(1979);

// console.log(age, retirement);

///////////////////////////////
//Lecture: Arrays

// const boxes = document.querySelectorAll('.box');

// //ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(current){
//     current.style.backgroundColor = 'dodgerblue';
// });

// //ES6
// const boxesArr6 = Array.from(boxes);
// boxesArr6.forEach(current => current.style.backgroundColor = 'green');
// //or
// Array.from(boxes).forEach(current => current.style.backgroundColor = 'dodgerblue');


// for (const box of boxesArr6) {
//     if (box.className.includes('blue')) {
//         continue;
//     }

//     box.textContent = 'I changed to blue';
// }

// var ages = [12, 18, 17, 15, 13];

// //ES5
// var full5 = ages.map(function(current){
//     return current >= 18;
// });
// var index5 = full5.indexOf(true);
// console.log(full5, index5, ages[index5]);

// //ES6
// const index6 = ages.findIndex(current => current >= 18);
// const element6 = ages.find(current => current >= 18);
// console.log(index6, element6);

// var ages = [12, 18, 17, 19, 13, 23];
// //ES5
// var full5 = [];
// ages.forEach(function(current){
//     if (current >= 18) {
//         full5.push(current);
//     }
// })
// console.log(full5);

// //ES6
// const full6 = ages.filter(current => current >= 18);
// console.log(full6);


//////////////////////////////////
//Lecture: Spread operator


// const ages = [12, 18, 17, 19];
// console.log(...ages);


// function sumFourAges(a, b, c, d) {
//     return a + b + c + d;
// }

// var sum1 = sumFourAges(12, 18, 17, 19);
// console.log(sum1);

// var ages = [12, 18, 17, 19];
// //ES5
// var sum2 = sumFourAges.apply(null, ages);
// console.log(sum2);
// //ES6
// var sum3 = sumFourAges(...ages);
// console.log(sum3);

// const smithFamily = ['John', 'Jane', 'Mark'];
// const millerFamily = ['Ann', 'Mary', 'Bob'];

// const bigFamily = [...smithFamily, ...millerFamily];
// console.log(bigFamily);
// const evenBiggerFamily = [...smithFamily, 'Lily', ...millerFamily];
// console.log(evenBiggerFamily);

// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');

// Array.from([h, ...boxes]).forEach(current => current.style.color = 'purple');

////////////////////////////////////////////////////
//Lecture: Rest parameters

// //ES5
// function isFullAge5(){
//     var agesArr = Array.prototype.slice.call(arguments);
//     agesArr.forEach(function(current){
//         console.log(new Date().getFullYear() - current >= 18 );
//     });
// }

// // isFullAge5(1990, 1985, 2006, 1995, 2011);

// //ES6
// function isFullAge6(...years) {
//     years.forEach(current => console.log(new Date().getFullYear() - current >= 18 ));
// }

// isFullAge6(1990, 1985, 2006, 1995, 2011);

// //ES5
// function isFullAge5(limit){
//     var agesArr = Array.prototype.slice.call(arguments, 1);
//     agesArr.forEach(function(current){
//         console.log(new Date().getFullYear() - current >= limit );
//     });
// }

// isFullAge5(21, 1999, 1985, 2006, 1995, 2011);

// //ES6
// function isFullAge6(limit, ...years) {
//     years.forEach(current => console.log(new Date().getFullYear() - current >= limit ));
// }

// isFullAge6(21, 1999, 1985, 2006, 1995, 2011);

/////////////////////////////////////
//Lecture: Default parameters

// //ES5
// function SmithPerson5(firstName, yearOfBirth, lastName, nationality){
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.lastName = lastName === undefined ? 'Smith' : lastName;
//     this.nationality = nationality === undefined ? 'American' : nationality;
// }

// var john5 = new SmithPerson5('John', 1990);
// console.log(john5);

// var emily5 = new SmithPerson5('Emily', 1993, 'Diaz', 'Spanish');
// console.log(emily5);

// //ES6
// function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality='American'){
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.lastName = lastName;
//     this.nationality = nationality;
// }

// var john = new SmithPerson('John', 1990);
// console.log(john);

// var emily = new SmithPerson('Emily', 1993, 'Diaz', 'Spanish');
// console.log(emily);


/////////////////////////////////////
//Lecture: Maps

/////////////////////////////////////
//Lecture: Classes

// //ES5
// function Person5(firstName, yearOfBirth, job){
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
// Person5.prototype.calculateAge = function() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// var john5 = new Person5('John', 1990, 'teacher');
// john5.calculateAge();

// //ES6
// class Person{
//     constructor(firstName, yearOfBirth, job){
//         this.firstName = firstName;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }

//     calculateAge() {
//       var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }

//     static greeting() {
//         console.log('Hey there!');
//     }
// }

// const jane = new Person('Jane', 1987, 'Designer');
// jane.calculateAge();

// Person.greeting();


/////////////////////////////////////
//Lecture: Classes and Subclasses

//ES5
// function Person5(firstName, yearOfBirth, job){
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
// Person5.prototype.calculateAge = function() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// function Athlete5(firstName, yearOfBirth, job, olympicGames, medals) {
//     Person5.call(this, firstName, yearOfBirth, job);
//     this.olympicGames = olympicGames;
//     this.medals = medals;
// }
// Athlete5.prototype = Object.create(Person5.prototype);

// Athlete5.prototype.wonMedal = function() {
//     this.medals++
//     console.log(this.medals);
// }

// var athelete5 = new Athlete5('John', 1990, 'runner', 3, 2);
// athelete5.calculateAge();
// athelete5.wonMedal();

// //ES6
// class Person{
//     constructor(firstName, yearOfBirth, job){
//         this.firstName = firstName;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }

//     calculateAge() {
//       var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }

//     static greeting() {
//         console.log('Hey there!');
//     }
// }

// class Athlete extends Person {

//     constructor(firstName, yearOfBirth, job, olympicGames, medals) {
//         super(firstName, yearOfBirth, job);
//         this.olympicGamess = olympicGames;
//         this.medals = medals;
//     }

//     wonMedal() {
//         this.medals++
//         console.log(this.medals);
//     }
// }

// const jane = new Athlete('Jane', 1987, 'swimmer', 3, 5);
// jane.calculateAge();
// jane.wonMedal();

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class Base {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Base{
    constructor(name, buildYear, area, treesAmount) {
        super(name, buildYear);
        this.area = area;
        this.treesAmount = treesAmount;
    }

    treeDensity() {
        return this.treesAmount / this.area;
    }

    calculateAge() {
        return new Date().getFullYear() - this.buildYear;
    }
}

class Street extends Base{
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    streetClassification() {
        return this.sizes().get(this.size);
    }

    sizes() {
        const sizes = new Map();
        sizes.set(1, 'tiny');
        sizes.set(2, 'small');
        sizes.set(3, 'normal');
        sizes.set(4, 'big');
        sizes.set(5, 'huge');

        return sizes;
    }
}

class Report {
    constructor(parks, streets) {
        this.parks = parks;
        this.streets = streets;
    }

    calculateAverage(array){
        const sum = array.reduce((prev, cur) => prev + cur, 0);

        return [sum, sum / array.length];
    }

    parksTreeDensity() {
        this.parks.forEach(current =>
            console.log(`${current.name} has a density of ${current.treeDensity().toFixed(1)} trees per square km.`));
    }

    parksAverageAge() {
        const [total, average] = this.calculateAverage(
            this.parks.map(current => current.calculateAge()));

        console.log(`Our ${this.parks.length} parks have an average of ${average.toFixed(1)} years.`);
    }

    parksWithMoreThanTrees(amount) {
        this.parks
                .filter(current => current.treesAmount > amount)
                .forEach(current => console.log(`${current.name} has more than ${amount}.`));
    }

    parksReport() {
        console.log('----PARKS REPORT----');
        this.parksAverageAge();
        this.parksTreeDensity();
        this.parksWithMoreThanTrees(1000);
    }

    streetsTotalAndAverageLength() {
        const [total, average] = this.calculateAverage(this.streets.map(current => current.length));

        console.log(`Our ${this.streets.length} streets have a total length of ${total.toFixed(1)} with an average of ${average.toFixed(1)} km.`)
    }

    streetsClassification() {
        this.streets.forEach(current =>
            console.log(`${current.name}, built in ${current.buildYear}, is a ${current.streetClassification()} street.`));
    }

    streetsReport() {
        console.log('----STREETS REPORT----');
        this.streetsTotalAndAverageLength();
        this.streetsClassification();
    }

    show() {
        this.parksReport();
        this.streetsReport();
    }
}

const parks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const streets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

const report = new Report(parks, streets);
report.show();



















