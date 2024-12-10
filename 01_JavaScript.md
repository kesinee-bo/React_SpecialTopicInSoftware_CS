# JavaScript 

## ทบทวน JavaScriptfile:///home/ssits/Projects/React/ReactNative_Expo_ITGenius_2567/00_Documents/01_IntroReactNative.md


JavaScript เป็นภาษาโปรแกรมที่ใช้ในการพัฒนาเว็บแอปพลิเคชัน โดยเป็นภาษาที่ใช้งานกันอย่างแพร่หลายในการพัฒนาเว็บแอปพลิเคชัน โดยเฉพาะในการพัฒนา React ซึ่งเป็นไลบรารีสำหรับสร้าง User Interface (UI) ที่มีประสิทธิภาพ ในเอกสารนี้จะกล่าวถึงพื้นฐานของ JavaScript ที่จำเป็นสำหรับการเขียน React

### การแทรก JavaScript ในหน้าเว็บ
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

แต่ในโปรเจคที่ใช้ React การทำงานจะแตกต่างกัน เพราะ React จะใช้วิธีการ Build Process ในการเตรียมโค้ดก่อนจะนำไปใช้งานจริง การ Build นั้นช่วยให้การเขียนโค้ดเป็นไปได้อย่างสะดวกขึ้น เช่นการใช้โมดูลและการแยกโค้ดออกเป็นไฟล์ย่อยๆ ซึ่งช่วยให้การจัดการโค้ดในโปรเจค React ง่ายขึ้น โดยการแยกโค้ดเป็นไฟล์ย่อยช่วยให้โค้ดอ่านง่าย มีความเป็นระเบียบ และสามารถทำงานร่วมกับทีมได้สะดวกขึ้น เพราะแต่ละคนสามารถแก้ไขหรือพัฒนาในส่วนต่าง ๆ ของโปรเจคได้อย่างอิสระ

### React Projects use a Build Process
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

### Import & Export
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

### Data Types
JavaScript มีประเภทข้อมูลพื้นฐานเช่น Number, String, Boolean, Object, Array และ Undefined เป็นต้น การเข้าใจชนิดข้อมูลนี้เป็นสิ่งสำคัญเพื่อใช้งานอย่างมีประสิทธิภาพ ตัวอย่าง:

```javascript
let number = 10; // Number
let text = "Hello"; // String
let isTrue = true; // Boolean
let person = { name: "Alice", age: 25 }; // Object
let numbers = [1, 2, 3, 4, 5]; // Array
let notDefined; // Undefined
```

### Variables & Values
JavaScript มีการประกาศตัวแปรด้วย `var`, `let`, และ `const` โดย:
- `var` ใช้ในการประกาศตัวแปรที่สามารถเปลี่ยนค่าได้ และมี Scope ที่จำกัดอยู่ในฟังก์ชัน (function scope)
- `let` ใช้ในการประกาศตัวแปรที่สามารถเปลี่ยนค่าได้ และมี Scope ที่จำกัดอยู่ในบล็อก (block scope)
- `const` ใช้ในการประกาศค่าคงที่ที่ไม่สามารถเปลี่ยนแปลงค่าได้

ตัวอย่าง:

```javascript
let name = "John";
const age = 30;
name = "Doe"; // สามารถเปลี่ยนค่าได้
// age = 31; // ไม่สามารถเปลี่ยนค่าได้ จะเกิด Error
```

### Operators
ตัวดำเนินการใน JavaScript ประกอบด้วยตัวดำเนินการทางคณิตศาสตร์ (`+`, `-`, `*`, `/`, `%`) ตัวดำเนินการเปรียบเทียบ (`==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`) และตัวดำเนินการตรรกศาสตร์ (`&&`, `||`, `!`) ซึ่งเราสามารถใช้ตัวดำเนินการเหล่านี้ในการควบคุมการทำงานของโปรแกรมได้

ตัวอย่าง:

```javascript
let x = 5;
let y = 10;
console.log(x + y); // ผลลัพธ์คือ 15
console.log(x > y); // ผลลัพธ์คือ false
console.log(x < y && y > 0); // ผลลัพธ์คือ true
```

### Control Structures
ประกอบด้วยคำสั่งอย่าง `if...else`, `switch`, `for`, และ `while` เพื่อควบคุมการทำงานของโปรแกรมตามเงื่อนไขและการวนลูป ตัวอย่าง:

  ```javascript
  if (number > 5) {
    console.log("Number is greater than 5");
  } else {
    console.log("Number is 5 or less");
  }

  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
  }
  ```

```javascript
const day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(dayName); // ผลลัพธ์คือ "Wednesday"
```

```javascript
// ตัวอย่างการใช้ while
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
// ผลลัพธ์คือ 0, 1, 2, 3, 4
```

### Functions & Parameter
ฟังก์ชันใน JavaScript เป็นกลุ่มของคำสั่งที่ใช้ในการทำงานซ้ำๆ หรือแยกการทำงานที่ซับซ้อนออกมาให้เข้าใจได้ง่ายขึ้น ฟังก์ชันสามารถรับพารามิเตอร์เพื่อใช้ในการคำนวณและส่งค่าผลลัพธ์กลับมาได้

ตัวอย่าง:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // ผลลัพธ์คือ "Hello, Alice!"
```

### Arrow Function
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
ฟังก์ชันลูกศรเหมาะสำหรับใช้ในกรณีที่ฟังก์ชันมีการทำงานไม่ซับซ้อนหรือมีคำสั่งเพียงบรรทัดเดียว เพราะมีความกระชับและอ่านง่ายกว่า 

### Objects & Classes
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

### Arrays & Array Methods
อาร์เรย์ (Array) เป็นโครงสร้างข้อมูลที่ใช้ในการเก็บค่าหลายๆ ค่าในตัวแปรเดียว เมธอด `map()` ใช้ในการประมวลผลแต่ละค่าของอาร์เรย์และส่งคืนอาร์เรย์ใหม่ที่มีการเปลี่ยนแปลง

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // ผลลัพธ์คือ [2, 4, 6, 8, 10]
```

### Destructuring
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

### Destructuring in Function Parameter Lists
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

### The Spread Operator
Spread Operator ใช้ในการคัดลอกหรือรวมอ็อบเจกต์และอาร์เรย์

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];

console.log(arr2); // ผลลัพธ์คือ [1, 2, 3, 4, 5, 6]

const person1 = { name: "Charlie", age: 35 };
const person2 = { ...person1, city: "New York" };

console.log(person2); // ผลลัพธ์คือ { name: "Charlie", age: 35, city: "New York" }
```


### Template Literals
ช่วยให้การสร้างสตริงมีความสะดวกขึ้น โดยใช้ backtick \( \` ) และสามารถแทรกตัวแปรด้วย `${}` เช่น:

  ```javascript
  const name = "Alice";
  const message = `Hello, ${name}!`;
  console.log(message);
  ```


### Manipulating the DOM - (ไม่ใช้ React)
JavaScript สามารถใช้ในการจัดการ Document Object Model (DOM) โดยไม่ต้องใช้ React เช่น การเพิ่มหรือเปลี่ยนแปลงเนื้อหาในหน้าเว็บ

```javascript
const element = document.getElementById("myElement");
element.textContent = "Hello, world!";
```

### Using Functions as Values
ฟังก์ชันใน JavaScript สามารถใช้เป็นค่าได้ เช่น การเก็บไว้ในตัวแปร หรือการส่งเป็นพารามิเตอร์ให้กับฟังก์ชันอื่น

```javascript
function sayHello() {
  console.log("Hello!");
}

const greet = sayHello;
greet(); // ผลลัพธ์คือ "Hello!"
```

### Defining Functions inside of functions
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

### Reference vs Primitive Values
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
```


<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup> 