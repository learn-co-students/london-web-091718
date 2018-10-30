# Scope and Closures

### Function Composition
* Using the return values of functions as arguments to other functions

  ```js
  // Composition taking the form f(g(x)); uses return value of g(x) as the argument

  function decimalToPercent(decimal) {
    return decimal * 100.0;
  }

  // y = g(x)
  // f(y)
  let returnValue = decimalToPercent(0.5);
  console.log(returnValue); // => 50

  //Same thing, with more composition: f(g(x))
  console.log(decimalToPercent(0.5)); // => 50
  ```

* Passing a function as a callback to another function

  ```js
  //Composition taking the form f(g)(x); uses g itself as the argument

  function multiplyThenDo(num1, num2, callback) {
    let product = num1 * num2;
    return callback(product);
  }

  function addFive(num) {
    return num + 5;
  }

  function square(num) {
    return num * num;
  }

  multiplyThenDo(2, 3, addFive); // => 11
  multiplyThenDo(2, 3, square); // => 36
  multiplyThenDo(2, 3, console.log); // => Logs "6"

  //Take as many callbacks as needed

  function doThisThenDoThatToFive(callback1, callback2) {
    let result = callback1(5);
    return callback2(result);
  }

  doThisThenDoThatToFive(addFive, square) // => 100
  doThisThenDoThatToFive(square, addFive) // => 30

  ```

### Callbacks in Iterators

* Iterators such as `.map`, `.forEach`, `.filter`, and `.find` are the most common use-cases for callbacks.

  ```js

  const people = ["Laura", "Natalie", "Matt"];
  const numbers = [78, 49, 32, 45];

  function sayIt(element) {
    console.log(element);
  }

  people.forEach(sayIt); // => Logs "Laura", "Natalie", and "Matt"
  numbers.forEach(sayIt); // => Logs "78", "49", "32", and "45"

  function yellIt(element) {
    return element + "!";
  }

  people.map(yellIt); // => ["Laura!", "Natalie!", "Matt!"]
  numbers.map(yellIt); // => ["78!", "49!", "32!", "45!"]

  //Writing inline anonymous functions. It might be useful to remind them of the differences in arrow function syntax

  people.forEach(name => console.log(`My name is ${name}`)); // => Logs "My name is Laura", "My name is Natalie", and "My name is Matt"
  numbers.map(num => num + 10); // => [88, 59, 42, 55]

  ```
* All iterators can pass up to three arguments: the element, the index of that element, and the original array

  ```js
  const theBox = ["Laura", "Natalie", "Matt"];

  function whatsInTheBox(element, index, array) {
    console.log(`${index+1}. ${element}`);
    console.log(array);
  }

  theBox.forEach(whatsInTheBox); // => Logs "1. Laura" and "["Laura", "Natalie", "Matt"]"; Logs "2. Natalie" and "["Laura", "Natalie", "Matt"]"; Logs "3. Matt" and "["Laura", "Natalie", "Matt"]"

  ```

### Higher Order Functions
It is useful to explain that you have already been exposed to higher order functions: any function that **takes** and/or **returns** a function (callback) as an argument is a HOF. This means that `.map`, `.forEach`, etc., as well as functions written in the first portion of the lecture were HOFs.

* Higher order function that takes a callback

  ```js
  //Higher order function;
  function withFormatting(sentence, format) {
    return format(sentence);
  }

  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1, string.length);
  }

  function camelCase(string) {
    const words = [];

    string.split(" ").forEach((word, index) => {
      if (index !== 0) {
        words.push(capitalize(word));
      } else {
        words.push(word);
      }
    })
    return words.join("");
  }

  withFormatting("is that a camel?", capitalize); // => "Is that a camel?"
  withFormatting("no this is a camel", camelCase); // => "noThisIsACamel"

  ```

* Higher order function that returns a function

  ```js
  function generateECardMaker(greeting) {
    return function(person) {
      return `${person} would like to tell you ${greeting}`;
    }
  }

  let sayHey = generateECardMaker("Hey");
  let sayMerryChristmas = generateECardMaker("Merry Christmas");
  let sayYouSmell = generateECardMaker("You smell");

  sayHey("Laura"); //=> "Laura would like to tell you Hey"
  sayHey("Ashlee"); // => "Ashlee would like to tell you Hey"
  sayMerryChristmas("Laura"); // => "Laura would like to tell you Merry Christmas
  sayYouSmell("Laura"); // => "Laura would like to tell you You smell"

  ```

* Higher order function that takes a callback **and** returns a function

  ```js
  function formatMultiplication(format) {
    return function(num1, num2) {
      return format(num1 * num2);
    }
  }

  function report(value) {
    return `Your new number is ${value}`;
  }

  function disappointed(value) {
    return `Oh no...it looks your number is ${value}...`
  }

  const disappointedMultiplication = formatMultiplication(disappointed);

  disappointedMultiplication(4, 5); // => "Oh no...it looks your number is 20..."
  disappointedMultiplication(7, 2); // => "Oh no...it looks your number is 14..."

  const reportMultiplication = formatMultiplication(report);
  reportMultiplication(4, 5); // => "Your new number is 20"
  reportMultiplication(7, 2); // => "Your new number is 14"


  //Ask them to explain granularly what happens in the following code:
  formatMultiplication(disappointed)(4, 5) // =>  "Oh no...it looks your number is 20..."

  ```

**Group Exercise** ~10m

This is a great opportunity to test their understanding of higher order functions by having them build a custom iterator using a `.for` loop. `.map` should look like the following:

  ```js
    function customMap(array, callback) {
      let final = [];
      for (let index = 0; index < array.length; index++) {
        final.push(callback(array[index], index, array))
      }
      return final;
    }
  ```

### Private Variables Using Closures
A closure is a higher order component that makes use of the lexical environment to contain values in memory. The above examples are all closures - begin this part of lecture with asking the students which values are contained in memory in the previous example. (`format` retains its value)

  ```js
  function generateCounter() {
    let counter = 0;
    console.log(`Initializing counter at ${counter}`)
    return function() {
      console.log(++counter);
    }
  }

  //Call function to generate a counter function
  let counterOne = generateCounter(); //=> Logs "Initializing counter at 0"

  //Call function; explain that the value of `counter` is modified when calling `counterOne` because `counterOne` sees the same point in memory for `counter` every time it is called
  counterOne(); // => Logs "1"
  counterOne(); // => Logs "2"
  counterOne(); // => Logs "3"
  counterOne(); // => Logs "4"

  //Create another instance of a counter
  let counterTwo = generateCounter(); // => Logs "Initializing counter at 0"

  //A fresh count is started; this instance of a counter sees a different `count` which refers to a different point in memory than the `count` in `counterOne`
  counterTwo(); // => Logs "1"
  counterTwo(); // => Logs "2"

  //`counter` in `counterOne` is unchanged
  counterOne(); // => Logs "5"
  ```

* Using an IIFE

  ```js
  let counterFunc = (function() {
    let counter = 0;
    console.log(`Initializing counter at ${counter}`);
    return function() {
      console.log(++counter);
    }
  })() // => Logs "Initializing counter at 0"

  counterFunc() // => Logs "1"

  //Ask students to explain this code.
  //What are the pros and cons of using this syntax?
  ```

### Currying with Closures
The act of currying is to break one function that takes a number of parameters into more functions that take fewer parameters. Students have already seen examples of this above. The point of this part of the lecture is to clarify the term and provide them with some use-cases.

  ```js
  function multiply(num1, num2) {
    return num1 * num2;
  }

  multiply(3, 4); // => 12

  function curriedMultiply(num1) {
    return function(num2) {
      return num1 * num2;
    }
  }

  triple = curriedMultiply(3);
  triple(4); // => 12
  ```

### Preview of OO
The following serves as a wrap up discussion about this lecture, as well as a transition into OO concepts in JS.

Consider the following example:

  ```js
  function robotFactory() {
    let count = 0;
    let all = [];

    return function(name, purpose) {
      count++;

      let robot = { name, purpose, id: count++ };
      all.push(robot);

      console.log("Your list of robots: ", all);
      return robot;
    }
  }

  const factory = robotFactory();
  const x29 = factory("x29", "combat"); // => Logs "Your list of robots: [{name: "x29", purpose: "combat", id: 1}]", returns undefined
  const p3x54 = factory("p3x54", "industrial"); // => Logs "Your list of robots: [{name: "x29", purpose: "combat", id: 1}, {name: "p3x54", purpose: "industrial", id: 3}]", returns undefined
  ```

* What type of function is `robotFactory`? What is the return value?
* Why are `count` and `all` now private?
* When are the values for `count` and `all` changed? What are they being used for?
* What data types are `x29` and `p3x54`?  Where do they get their key-value pairs?
* What would happen if you created another factory? (`const newFactory = robotFactory()`) What do you expect `newFactory()` will log and return?
* How could we refactor this code to use an IIFE to immediately create our factory?