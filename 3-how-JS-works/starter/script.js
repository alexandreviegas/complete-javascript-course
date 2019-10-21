///////////////////////////////////////
// Lecture: Hoisting


// var a = 'Hello';

// function foo () {
//     console.log(a);
// }

// foo();














///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         third()
//     }
// }

// function third() {
//     var d = 'John';
//     console.log(a + b + c + d);
// }




///////////////////////////////////////
// Lecture: The this keyword

var a = 'Hello';

foo();

function foo() {
    console.log(this);

    bar();
    function bar() {
        console.log(this);
    }
}


var john = {
    firstName: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2019 - this.yearOfBirth);
        // function innerFunction() {
        //     console.log(this);
        // }
        // innerFunction();
    }
}

john.calculateAge();


var mike = {
    firstName: 'Mike',
    yearOfBirth: 1984
}

mike.calculateAge = john.calculateAge;

mike.calculateAge();