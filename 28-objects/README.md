# Objects

JavaScript is designed on a simple object-based paradigm. An object is a collection of properties, and a property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a method. In addition to objects that are predefined in the browser, you can define your own objects.

Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life. The concept of objects in JavaScript can be understood with real life, tangible objects.

In JavaScript, an object is a standalone entity, with properties and type. Compare it with a cup, for example. A cup is an object, with properties. A cup has a color, a design, weight, a material it is made of, etc. The same way, JavaScript objects can have properties, which define their characteristics.


## A Simple Object

```js
// An object can be as simple as this
// Keys are ALWAYS strings
{
    make: 'Tesla',
    model: 'S',
    year: 2015
}

// We can assign it to a variable for later use
const car = {
    make: 'Tesla',
    model: 'S',
    year: 2015
}
```

## Looking properties up

```js
car.make
"Tesla"

car['make']
"Tesla"

propertyName = 'make'
car[propertyName]
"Tesla"

// Looking for a non-existing property will return 'undefined'
car.stuff
undefined
```

## Settings properties

Since properties are always keys, any property we give to an object will be converted to string.
```js
// Upon instantiation
const car = {
    make: 'Tesla',
    model: 'S',
    year: 2015
}

// Later on
car.driver = 'The Stig'
car['marco'] = 'polo'

car
/*
{
    make: 'Tesla',
    model: 'S',
    year: 2015,
    driver: 'The Stig',
    marco: 'polo'
}
*/

// Anything can be a property, even a function.
car.beep = function () { return `I'm a ${this.make} ${this.model}. Beep beep!` }

car.beep()
"I'm a Tesla S. Beep beep!"
// The 'this' keyword points to the object calling the method
// So 'this.make' and 'this.model' refer to 'car.make' and 'car.model' here
```

## Deleting properties

```js
delete car.marco
true

car
/*
{
    make: 'Tesla',
    model: 'S',
    year: 2015,
    driver: 'The Stig'
}
*/
```

## Enumerating properties

```js
Object.keys(car)
["make", "model", "year"]

Object.values(car)
["Tesla", "S", 2015]

// Relatively new, doesn't work in IE
Object.entries(car)
[
    ["make", "Tesla"],
    ["model", "S"],
    ["year", 2015]
]
```

## Creating new objects

We could use a good old function
```js
function makeCar(make, model, year) {
    return {
        make: make,
        model: model,
        year: year
    }
}

const car2 = makeCar('Ford', 'Fiesta', 1996)
{make: "Ford", model: "Fiesta", year: 1996}
```
But imagine that you have created 1000 cars, and later on we want to add a new property.

Enter constructors:
```js
function Car(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
}
```

A constructor in a function which we can run to create a new object using the `new` keyword. The `new` keyword will run whatever is in the function, and set the function's `prototype` object as the new object's prototype.

## Prototypes

```js
const car = new Car('Tesla', 'S', 2010)

// The Car constructor function has a `prototype`
Car.prototype
// {}
car.__proto__
// {}

Car.prototype === car.__proto__
true
```

When you try to get the property of an object, if it does't have it, it will query its prototype, and if the prototype doesn't have it either, it will query its prototype, and so on until we run out of prototypes to check in the prototype chain.

```js
const obj1 = { pen: 'fountain pen' }
const obj2 = { __proto__: obj1 }
const obj3 = { __proto__: obj2 }
const obj4 = { __proto__: obj3 }
const obj5 = { __proto__: obj4 }

// If we query object 5 for a pen, the prototype chain
// will eventually lead to object 1's pen.
obj5.pen
"fountain pen"
```

### ES6 Class Syntax
ES2015 (ES6) brought object-oriented programming paradigms to JS, simplifying everything displayed above.

* Creating a class and writing a constructor (similar to `initialize` in Ruby)

  ```js
  class Person {

    constructor(name, occupation) {
      this.name = name;
      this.occupation = occupation;
    }

  }

  let tim = new Person("Tim", "Instructor");
  tim; // => { name: "Tim", occupation: "Instructor" }
  ```

* Creating "instance" functions

  ```js
  class Person {

    constructor(name, occupation) {
      this.name = name;
      this.occupation = occupation;
    }

    whoAmI(){
      console.log(`Hi, my name is ${this.name}, and I am a ${this.occupation}`);
    }
  }

  let tim = new Person("Tim", "Instructor");
  tim.whoAmI(); // => "Hi, my name is Tim, and I am a Instructor"
  ```

* Creating static or "class" methods. It is useful to `console.log(this)` in both instance and static functions to illustrate the difference

  ```js
  class Person {

    constructor(name, occupation) {
      this.name = name;
      this.occupation = occupation;
    }

    whoAmI() {
      console.log(this);
      console.log(`Hi, my name is ${this.name}, and I am a ${this.occupation}`);
    }

    static sayHello() {
      console.log(this);
      console.log("Hello");
    }
  }

  let tim = new Person("Tim", "Instructor");
  tim.whoAmI(); // => Logs [{ name: "Tim, occupation: "Instructor" }] and "Hi, my name is Tim, and I am a Instructor"
  Person.sayHello(); // => Logs Person class and "Hello"
  ```

* Adding private "class" variables using a closure and an IIFE

  ```js
  const Person = (function() {
    let count = 0;
    const all = [];

    return class {
      constructor(name, occupation) {
        this.name = name;
        this.occupation = occupation;
        this.id = ++count;
        all.push(this);
      }

      whoAmI() {
        console.log(`Hi, my name is ${this.name}, and I am a ${this.occupation}`);
      }

      static count() {
        return count;
      }

      static all() {
        return all.slice();
      }
    }
  })()

  let tim = new Person("Tim", "Instructor");
  tim.whoAmI(); // => "Hi, my name is Tim, and I am a Instructor"
  Person.count(); // => 1
  ```
