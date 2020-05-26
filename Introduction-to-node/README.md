# Introduction to Node
This is a brief introduction to node that will cover very basics to get you going
___
## What is Node?
Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!
Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. This allows Node.js to be very performant.
A Node.js app is run in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.
When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.
This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.
### 6 Types
```
undefined : "undefined"
Boolean :  True/False
Number : 2
String : 'This is a string'
BigInt : 9007199254740992n
Symbol : Symbol("Sym")
```
### Basic Operators
```
+ (addition) 2 + 3 = 5
- (subtraction) 2 - 3 = -1
/ (division) 2 / 3 = 0.6666666666666666
* (multiplication) 2 * 3 = 6
% (remainder)  3 % 2 = 1
```
### Comparisons
```
== (equal) 
2 == 2 returns True 
2 == 3 returns False

!= (NOT equal) 
2 != 2 returns False 
2 != 3 returns True

> (greater than) 
2 > 3 returns False 
3 > 2 returns True

> (less than) 
2 > 3 returns True 
3 > 2 returns False

>= (greater than or equal to) 
2 >= 2 returns True
3 >= 2 returns True
2 >= returns False

>= (less than or equal to) 
2 >= 2 returns True
3 >= 2 returns False
2 >= returns True
```
## Variables 
Variables have to be declared with either `const` or `let`. The differences are shown below
### `let`
```
The value of a let variable can be changed and redeclared
// declare variable
   let letExample = 'orange'
   // try to reassign the variable
   try {
       letExample = 'potato'
   }
   // if unable to reassign the variable print out error
   catch (e) {
       console.log('cannot reassign letExample' + letExample + '\n');
   }
   // Print out result: Should equal potato
   console.log('letExample: ' + letExample')
```
### `const`

The value of a constant can't be changed through reassignment, and it can't be redeclared. (There are exceptions to this discussed below)
```javascript
// declare variable
const constExample = 'apple';
// try to reassign the variable
try {
    constExample = 'potato';
}
// if unable to reassign the variable print out error
catch(e) {
    console.log('cannot reassign constExample  ' + constExample + '\n');
}
// Print out result: Should equal Apple
console.log('constExample: ' + constExample);
```
#### `const` with objects and arrays

```javascript
const myObject = {'key': 'value'};
// you cannot overwrite the object itself
try{
    myObject =  {'OTHER_KEY': 'value'};
}
catch(e) {
    console.log('Unable to overwrite myObject' + '\n')
}

// however the keys within the object are not protected themselves
myObject.key = 'newValue'
console.log(myObject)

// the values within the array are not protected as well and can be modified
const myArray = ['test']
myArray.push('test2')
console.log(myArray)
```
### Functions
___
Functions can be declared in two ways:
`ECMAScript 5`
```javascript
function event_handler(event) {
    console.log(event)
```
`ECMAScript 6 (arrow functions)`
```javascript
// Function with no parameters
const func = () => {
    /* code goes here*/
}
// Function with one parameter
const func = event => {
    /* code goes here*/
}
// Function with more than one parameter
const func = (event, error) => {
    /* code goes here*/
}
```
You will likely see both used but it is highly recommended to conform to the newest version and use the arrow functions to declare functions