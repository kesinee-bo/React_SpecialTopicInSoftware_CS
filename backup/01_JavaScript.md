# พื้นฐานของ JavaScript เพื่อการเขียน React

## Adding JavaScript to a page & How React Projects Differ
ในโปรเจคที่เป็น HTML ปกติ เราสามารถเพิ่ม JavaScript ได้โดยการใช้แท็ก `<script>` ในไฟล์ HTML ตัวอย่างเช่น:


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Example</title>
</head>
<body>
    <h1>Hello, world!</h1>
    <script>
        console.log("This is an inline JavaScript code.");
    </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Example</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <script src="app.js"></script>
</body>
</html>
```

การแทรก `<script>` ในตำแหน่งต่างๆ ของไฟล์ HTML จะมีผลการทำงานที่แตกต่างกัน:

1. **ใน `<head>`**:
    ```html
    <head>
         <script src="app.js"></script>
    </head>
    ```
    การแทรกสคริปต์ใน `<head>` จะทำให้เบราว์เซอร์โหลดและประมวลผลสคริปต์ก่อนที่จะโหลดเนื้อหาใน `<body>` ซึ่งอาจทำให้หน้าเว็บโหลดช้าลงหากสคริปต์ใช้เวลานานในการประมวลผล

2. **ต้นของ `<body>`**:
    ```html
    <body>
         <script src="app.js"></script>
         <h1>Hello, world!</h1>
    </body>
    ```
    การแทรกสคริปต์ในตำแหน่งนี้จะทำให้สคริปต์ถูกประมวลผลก่อนที่เนื้อหาทั้งหมดใน `<body>` จะถูกโหลด ซึ่งอาจทำให้การแสดงผลของหน้าเว็บช้าลง

3. **ท้ายของ `<body>`**:
    ```html
    <body>
         <h1>Hello, world!</h1>
         <script src="app.js"></script>
    </body>
    ```
    การแทรกสคริปต์ในตำแหน่งนี้เป็นวิธีที่แนะนำ เพราะจะทำให้เบราว์เซอร์โหลดและแสดงผลเนื้อหาใน `<body>` ก่อน จากนั้นจึงประมวลผลสคริปต์ ทำให้ผู้ใช้เห็นเนื้อหาได้เร็วขึ้น

เทคนิคอื่นๆ ที่เกี่ยวข้อง:
- **การใช้ `async` และ `defer`**:
  ```html
  <script src="app.js" async></script>
  <script src="app.js" defer></script>
  ```
  - `async`: สคริปต์จะถูกโหลดแบบอะซิงโครนัสและประมวลผลทันทีที่โหลดเสร็จ
  - `defer`: สคริปต์จะถูกโหลดแบบอะซิงโครนัสแต่จะประมวลผลหลังจากที่เนื้อหาทั้งหมดในหน้าเว็บถูกโหลดเสร็จแล้ว

แต่ในโปรเจคที่ใช้ React การทำงานจะแตกต่างกัน เพราะ React จะใช้วิธีการ Build Process ในการเตรียมโค้ดก่อนจะนำไปใช้งานจริง การ Build นั้นช่วยให้การเขียนโค้ดเป็นไปได้อย่างสะดวกขึ้น เช่นการใช้โมดูลและการแยกโค้ดออกเป็นไฟล์ย่อยๆ ซึ่งช่วยให้การจัดการโค้ดในโปรเจค React ง่ายขึ้น โดยการแยกโค้ดเป็นไฟล์ย่อยช่วยให้โค้ดอ่านง่าย มีความเป็นระเบียบ และสามารถทำงานร่วมกับทีมได้สะดวกขึ้น เพราะแต่ละคนสามารถแก้ไขหรือพัฒนาในส่วนต่าง ๆ ของโปรเจคได้อย่างอิสระ

## React Projects use a Build Process
React ใช้เครื่องมืออย่าง Webpack, Vite หรือ Babel ในการ Build โค้ด เครื่องมือแต่ละตัวทำหน้าที่แปลงโค้ด JavaScript รวมถึง JSX ให้สามารถใช้งานได้ในเว็บเบราว์เซอร์ทั่วไป โดย Webpack ช่วยจัดการการรวมไฟล์และการโหลดทรัพยากรต่างๆ, Vite มีความเร็วในการ Build ที่สูงและเหมาะสำหรับการพัฒนา, ส่วน Babel แปลง JSX และคุณสมบัติของ JavaScript ที่ยังไม่รองรับให้สามารถใช้งานได้ โดย Vite เองสามารถทำหน้าที่เดียวกับ Babel ในการแปลง JSX ให้เป็น JavaScript ที่สามารถทำงานได้ นอกจากนี้ Vite ยังมีจุดเด่นในเรื่องของความเร็วในการทำงานและการเริ่มเซิร์ฟเวอร์สำหรับการพัฒนา นอกจากนี้ยังช่วยจัดการการโหลดของไฟล์ต่างๆ ให้เหมาะสม ซึ่งทำให้การทำงานของแอปพลิเคชันมีประสิทธิภาพสูงขึ้น

ตัวอย่างการแปลง JSX เป็น JavaScript โดยใช้ Babel:

```jsx
// โค้ด JSX
const element = <h1>Hello, world!</h1>;
```

เมื่อใช้ Babel ในการแปลง JSX จะได้ JavaScript ดังนี้:

```javascript
// โค้ดที่ถูกแปลง
const element = React.createElement("h1", null, "Hello, world!");
```

เบราว์เซอร์ทั่วไปไม่สามารถอ่าน JSX ได้โดยตรง ดังนั้น Babel จึงถูกใช้ในการแปลง JSX ให้เป็น JavaScript ที่สามารถทำงานได้ นอกจากนี้ยังสามารถใช้เครื่องมืออื่น ๆ เช่น TypeScript หรือ SWC ในการแปลงโค้ด JSX ให้เป็น JavaScript ที่สามารถใช้งานได้ โดย TypeScript จะเพิ่มความสามารถในการตรวจสอบประเภทข้อมูลให้กับ JavaScript ส่วน SWC เป็นคอมไพเลอร์ที่เร็วและมีประสิทธิภาพสูง ซึ่งเหมาะสำหรับโปรเจคขนาดใหญ่ที่ต้องการประสิทธิภาพในการ Build ที่รวดเร็ว โดย TypeScript จะเพิ่มความสามารถในการตรวจสอบประเภทข้อมูลให้กับ JavaScript ส่วน SWC เป็นคอมไพเลอร์ที่เร็วและมีประสิทธิภาพสูง

## Import & Export
การทำงานกับโมดูลใน JavaScript นั้นจะใช้การ Import และ Export เพื่อแบ่งปันโค้ดระหว่างไฟล์ ตัวอย่างเช่น:

```javascript
// ในไฟล์ math.js
export function add(a, b) {
  return a + b;
}

// ในไฟล์ main.js
import { add } from './math.js';

console.log(add(2, 3)); // ผลลัพธ์คือ 5
```
การใช้โมดูลช่วยให้โค้ดเป็นระเบียบและสามารถนำกลับมาใช้ใหม่ได้ง่ายขึ้น

## Variables & Values
JavaScript มีการประกาศตัวแปรด้วย `var`, `let`, และ `const` โดย:
- `var` เป็นวิธีการประกาศตัวแปรแบบเก่าที่มีข้อจำกัดในเรื่องของ Scope
- `let` ใช้ในการประกาศตัวแปรที่สามารถเปลี่ยนค่าได้ และมี Scope ที่จำกัดอยู่ในบล็อก (block scope)
- `const` ใช้ในการประกาศค่าคงที่ที่ไม่สามารถเปลี่ยนแปลงค่าได้

ตัวอย่าง:

```javascript
let name = "John";
const age = 30;
name = "Doe"; // สามารถเปลี่ยนค่าได้
// age = 31; // ไม่สามารถเปลี่ยนค่าได้ จะเกิด Error
```

## Operators
ตัวดำเนินการใน JavaScript ประกอบด้วยตัวดำเนินการทางคณิตศาสตร์ (`+`, `-`, `*`, `/`, `%`) ตัวดำเนินการเปรียบเทียบ (`==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`) และตัวดำเนินการตรรกศาสตร์ (`&&`, `||`, `!`) ซึ่งเราสามารถใช้ตัวดำเนินการเหล่านี้ในการควบคุมการทำงานของโปรแกรมได้

ตัวอย่าง:

```javascript
let x = 5;
let y = 10;
console.log(x + y); // ผลลัพธ์คือ 15
console.log(x > y); // ผลลัพธ์คือ false
console.log(x < y && y > 0); // ผลลัพธ์คือ true
```

## Functions & Parameter
ฟังก์ชันใน JavaScript เป็นกลุ่มของคำสั่งที่ใช้ในการทำงานซ้ำๆ หรือแยกการทำงานที่ซับซ้อนออกมาให้เข้าใจได้ง่ายขึ้น ฟังก์ชันสามารถรับพารามิเตอร์เพื่อใช้ในการคำนวณและส่งค่าผลลัพธ์กลับมาได้

ตัวอย่าง:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // ผลลัพธ์คือ "Hello, Alice!"
```

## Arrow Function
ฟังก์ชันลูกศร (Arrow Function) เป็นวิธีการประกาศฟังก์ชันที่สั้นกว่าและเหมาะสำหรับการใช้งานที่ไม่ซับซ้อน ตัวอย่างการใช้งาน:

```javascript
// ฟังก์ชันแบบปกติ
function add(a, b) {
  return a + b;
}

// ฟังก์ชันลูกศร
const addArrow = (a, b) => a + b;

console.log(add(3, 4)); // ผลลัพธ์คือ 7
console.log(addArrow(3, 4)); // ผลลัพธ์คือ 7
```
ฟังก์ชันลูกศรเหมาะสำหรับใช้ในกรณีที่ฟังก์ชันมีการทำงานไม่ซับซ้อนหรือมีคำสั่งเพียงบรรทัดเดียว เพราะมีความกระชับและอ่านง่ายกว่า ตัวอย่างเช่น ในกรณีที่ฟังก์ชันใช้ `this` ค่าของ `this` ในฟังก์ชันลูกศรจะแตกต่างจากฟังก์ชันแบบปกติ:

```javascript
// ฟังก์ชันแบบปกติ
function Person(name) {
  this.name = name;
  this.sayName = function() {
    console.log("My name is " + this.name);
  };
}

const john = new Person("John");
john.sayName(); // ผลลัพธ์คือ "My name is John"

// ฟังก์ชันลูกศร
function PersonArrow(name) {
  this.name = name;
  this.sayName = () => {
    console.log("My name is " + this.name);
  };
}

const jane = new PersonArrow("Jane");
jane.sayName(); // ผลลัพธ์คือ "My name is Jane"
```
ฟังก์ชันลูกศรจะไม่มีค่าของ `this` ของตัวเอง แต่จะยืมค่าของ `this` จากบริบทที่อยู่เหนือกว่า ทำให้เหมาะสำหรับการใช้งานในกรณีที่ต้องการรักษาค่าของ `this` ให้คงที่

## Objects & Classes
ใน JavaScript อ็อบเจกต์ (Object) เป็นโครงสร้างข้อมูลที่ใช้เก็บคุณลักษณะ (property) และฟังก์ชัน (method) ซึ่งอ็อบเจกต์สามารถประกาศได้ดังนี้:

```javascript
const person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

person.greet(); // ผลลัพธ์คือ "Hello, my name is John"
```

นอกจากนี้ยังสามารถสร้างคลาส (Class) เพื่อใช้ในการสร้างอ็อบเจกต์หลายๆ ตัวที่มีโครงสร้างเหมือนกันได้

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const john = new Person("John", 30);
john.greet(); // ผลลัพธ์คือ "Hello, my name is John"
```

## Arrays & Array Methods
อาร์เรย์ (Array) เป็นโครงสร้างข้อมูลที่ใช้ในการเก็บค่าหลายๆ ค่าในตัวแปรเดียว เมธอด `map()` ใช้ในการประมวลผลแต่ละค่าของอาร์เรย์และส่งคืนอาร์เรย์ใหม่ที่มีการเปลี่ยนแปลง

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // ผลลัพธ์คือ [2, 4, 6, 8, 10]
```

## Destructuring
Destructuring เป็นวิธีการที่ใช้ในการแยกค่าจากอ็อบเจกต์หรืออาร์เรย์ให้อยู่ในตัวแปรอย่างง่าย

```javascript
const person = {
  name: "Alice",
  age: 25
};

const { name, age } = person;
console.log(name); // ผลลัพธ์คือ "Alice"
console.log(age); // ผลลัพธ์คือ 25
```

## Destructuring in Function Parameter Lists
สามารถใช้ destructuring ในการประกาศพารามิเตอร์ของฟังก์ชันได้โดยตรง

```javascript
function introduce({ name, age }) {
  console.log(`My name is ${name} and I am ${age} years old.`);
}

const person = {
  name: "Bob",
  age: 28
};

introduce(person); // ผลลัพธ์คือ "My name is Bob and I am 28 years old."
```

## The Spread Operator
Spread Operator ใช้ในการคัดลอกหรือรวมอ็อบเจกต์และอาร์เรย์

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];

console.log(arr2); // ผลลัพธ์คือ [1, 2, 3, 4, 5, 6]

const person1 = { name: "Charlie", age: 35 };
const person2 = { ...person1, city: "New York" };

console.log(person2); // ผลลัพธ์คือ { name: "Charlie", age: 35, city: "New York" }
```

## Control Structures
โครงสร้างการควบคุมใช้ในการควบคุมลำดับการทำงานของโปรแกรม เช่น การใช้คำสั่งเงื่อนไข (`if`, `else`) หรือการวนซ้ำ (`for`, `while`)

```javascript
const age = 18;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

for (let i = 0; i < 5; i++) {
  console.log(i); // พิมพ์ค่า 0 ถึง 4
}
```

## Manipulating the DOM - Not with React
JavaScript สามารถใช้ในการจัดการ Document Object Model (DOM) โดยไม่ต้องใช้ React เช่น การเพิ่มหรือเปลี่ยนแปลงเนื้อหาในหน้าเว็บ

```javascript
const element = document.getElementById("myElement");
element.textContent = "Hello, world!";
```

## Using Functions as Values
ฟังก์ชันใน JavaScript สามารถใช้เป็นค่าได้ เช่น การเก็บไว้ในตัวแปร หรือการส่งเป็นพารามิเตอร์ให้กับฟังก์ชันอื่น

```javascript
function sayHello() {
  console.log("Hello!");
}

const greet = sayHello;
greet(); // ผลลัพธ์คือ "Hello!"
```

## Defining Functions inside of functions
สามารถประกาศฟังก์ชันภายในฟังก์ชันอื่นได้เพื่อสร้างการทำงานที่ซับซ้อนขึ้น

```javascript
function outer() {
  function inner() {
    console.log("This is the inner function.");
  }

  inner();
}

outer(); // ผลลัพธ์คือ "This is the inner function."
```

## Reference vs Primitive Values
ใน JavaScript ค่าประเภทดั้งเดิม (Primitive Values) เช่น `string`, `number`, `boolean` จะถูกเก็บและคัดลอกตามค่า ส่วนค่าประเภทอ้างอิง (Reference Values) เช่น อ็อบเจกต์และอาร์เรย์ จะถูกเก็บและคัดลอกตามอ้างอิง

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a); // ผลลัพธ์คือ 10 (ค่าประเภทดั้งเดิม)

const obj1 = { value: 10 };
const obj2 = obj1;
obj2.value = 20;
console.log(obj1.value); // ผลลัพธ์คือ 20 (ค่าประเภทอ้างอิง)
 