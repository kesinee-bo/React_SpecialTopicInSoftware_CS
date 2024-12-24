# TypeScript


## รู้จักกับ TypeScript

TypeScript คือ ภาษาโปรแกรมที่เป็นซูเปอร์เซตของ JavaScript ที่มีการเพิ่ม Type System เข้ามา ทำให้การพัฒนาโค้ดสามารถตรวจสอบข้อผิดพลาดได้ตั้งแต่ตอนเขียนโค้ด ทำให้การเขียนโค้ดมีความมั่นใจมากขึ้น โดยเฉพาะในโครงการขนาดใหญ่

### TypeScript Vs. JavaScript


#### ความแตกต่างในการเขียนโค้ด

- **TypeScript**:

  เป็นซูเปอร์เซตของ JavaScript ที่มีการเพิ่ม Type System เข้ามา ทำให้การพัฒนาโค้ดสามารถตรวจสอบข้อผิดพลาดได้ตั้งแต่ตอนเขียนโค้ด ทำให้การเขียนโค้ดมีความมั่นใจมากขึ้น โดยเฉพาะในโครงการขนาดใหญ่ ตัวอย่างเช่น การประกาศตัวแปรจะต้องระบุชนิดข้อมูลที่ชัดเจน เช่น
    ```ts
    let message: string = "Hello World";
    ```

- **JavaScript**:
  เป็นภาษาที่เว็บเบราว์เซอร์รองรับโดยตรง และใช้กันอย่างแพร่หลาย ไม่มีการตรวจสอบชนิดข้อมูล ทำให้ง่ายต่อการเขียนโค้ดในระยะแรก แต่ก็อาจทำให้เกิดข้อผิดพลาดได้ง่ายขึ้น ตัวอย่างเช่น
    ```js
    let message = "Hello World";
    ```


#### ข้อดีและข้อเสียของ TypeScript และ JavaScript

- **TypeScript**:

  - **ข้อดี**:
    - ตรวจสอบข้อผิดพลาดได้ตั้งแต่ตอนเขียนโค้ด ทำให้มีความปลอดภัยในการพัฒนามากขึ้น
    - รองรับการใช้งาน OOP (Object-Oriented Programming) อย่างเต็มที่ ทำให้โค้ดอ่านและบำรุงรักษาได้ง่ายขึ้น
    - ช่วยให้การพัฒนาที่มีขนาดใหญ่หรือทำงานเป็นทีมทำได้ง่ายและเป็นระเบียบมากขึ้น
  - **ข้อเสีย**:
    - ต้องมีการตั้งค่าและคอมไพล์ก่อนที่จะใช้งานในเบราว์เซอร์ ซึ่งต้องใช้เวลาเพิ่มขึ้นเล็กน้อย
    - มีความซับซ้อนในการเขียนเมื่อเทียบกับ JavaScript ทั่วไป โดยเฉพาะสำหรับผู้เริ่มต้น

- **JavaScript**:
  - **ข้อดี**:
    - ใช้งานได้ทันทีในเบราว์เซอร์โดยไม่ต้องคอมไพล์ ทำให้พัฒนาและทดสอบได้รวดเร็ว
    - ง่ายต่อการเริ่มต้นและเขียนโค้ด ทำให้เป็นภาษาที่นิยมสำหรับผู้เริ่มต้น
  - **ข้อเสีย**:
    - ไม่มีการตรวจสอบข้อผิดพลาดแบบ Static Type ทำให้โค้ดมีความเสี่ยงที่จะเกิดข้อผิดพลาดมากขึ้น โดยเฉพาะในโครงการขนาดใหญ่
    - ยากต่อการบำรุงรักษาและจัดการโค้ดในโปรเจกต์ที่ซับซ้อน

## TypeScript Playground

[TypeScript Playground](https://www.typescriptlang.org/play/) เป็นเครื่องมือในการเขียน TypeScript ในโปรเจกต์ขนาดเล็ก หรือทดสอบโค้ดได้ง่ายๆ โดยไม่ต้องติดตั้งอะไรเพิ่มเติม ซึ่งผู้ใช้จะสามารถเห็นโค้ดที TypeScript และ JavaScript ได้เปรียบเทียบกันได้



```js
function calculateTotalPriceJS(product, quantity, discount) {
  const priceWithoutDiscount = product.price * quantity;
  const discountAmount = priceWithoutDiscount * discount;
  return priceWithoutDiscount - discountAmount;
}
```


```ts
function calculateTotalPrice(
  product: { name: string; unitPrice: number },
  quantity: number,
  discount: number
) {
  const priceWithoutDiscount = product.unitPrice * quantity;
  const discountAmount = priceWithoutDiscount * discount;
  return priceWithoutDiscount - discountAmount;
}

// Usage
const product = { name: "Laptop", unitPrice: 1000 };
const quantity = 2;
const discount = 0.1; // 10% discount

const totalPrice = calculateTotalPrice(product, quantity, discount);

console.log(`The total price is: $${totalPrice}`);
```


## รู้จักกับการทำงานพื้นฐานของ Type ใน TypeScript

### Type annotation
Type annotaion คือการระบุชนิดข้อมูลให้กับตัวแปร หรือฟังก์ชัน ทำให้ TypeScript สามารถตรวจสอบข้อผิดพลาดได้ตั้งแต่ตอนเขียนโค้ด

```ts
let count: number = 10;
count = "Hello"; // Error: Type 'string' is not assignable to type 'number'.
```

### Type inference
Type inference คือการระบุชนิดข้อมูลโดยอัตโนมัติจากค่าที่กำหนดให้กับตัวแปร หรือฟังก์ชัน

```ts
let count = 10; // Type: number
count = "Hello"; // Error: Type 'string' is not assignable to type 'number'.
```

### Date Type
TypeScript มีชนิดข้อมูล Date ให้ใช้งาน โดยใช้คำสั่ง `Date` ในการประกาศตัวแปร ในขณะที่ JavaScript ใช้ `Date` จาก Object ในการประกาศตัวแปร

```ts
let today: Date = new Date();
```

### Any Type
Any Type ใช้ในกรณีที่ต้องการให้ตัวแปรมีค่าทุกชนิดข้อมูล หรือไม่ต้องการให้ TypeScript ตรวจสอบชนิดข้อมูล

```ts
let data: any = 10;
data = "Hello";
data = true;
```

### Unknown Type
Unknown Type ใช้ในกรณีที่ต้องการให้ตัวแปรมีค่าทุกชนิดข้อมูล แต่ต้องมีการตรวจสอบชนิดข้อมูลก่อนใช้งาน (หากไม่ตรวจสอบ TypeScript จะแจ้งเตือนข้อผิดพลาด)

```ts
let data: unknown = 10;
data = "Hello";
data = true;

console.log(data.toUpperCase()); // Error: Object is of type 'unknown'.

// ตรวจสอบชนิดข้อมูลก่อนใช้งาน
if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```

### Void Type
Void Type ใช้ในกรณีที่ฟังก์ชันไม่มีการส่งค่ากลับ

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

### Never Type
Never Type ใช้ในกรณีที่ฟังก์ชันไม่ต้องการให้ส่งค่ากลับ ซึ่งฟังก์ชันอาจไม่มีการไม่สิ้นสุดการทำงาน เช่น while(true) หรือ throw error


```ts
function infiniteLoop(): never {
  while (true) {
    console.log("Hello");
  }
}
```

หรือ


```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### Array Type
Array Type ใช้ในการประกาศตัวแปรที่มีชนิดข้อมูลเป็น Array

```ts
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["Apple", "Banana", "Orange"];
```

Array Type สามารถใช้เป็น Generic Type ได้

```ts
let numbers: Array<number> = [1, 2, 3, 4, 5];
let fruits: Array<string> = ["Apple", "Banana", "Orange"];
```


## การสร้าง type ใน TypeScript

### Object type
Object type ใช้ในการประกาศชนิดข้อมูลของ Object

```ts
let person: { name: string; age: number } = {
  name: "John Doe",
  age: 30,
};
```

### Type alias
Type alias ใช้ในการสร้างชนิดข้อมูลใหม่จากชนิดข้อมูลที่มีอยู่แล้ว

```ts
type Person = { name: string; age: number };

let person: Person = {
  name: "John Doe",
  age: 30,
};
```

### Interface
Interface ใช้ในการสร้างชนิดข้อมูลใหม่จากชนิดข้อมูลที่มีอยู่แล้ว โดยสามารถใช้งานร่วมกับ Class ได้

```ts
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: "John Doe",
  age: 30,
};
```

### Class
Class ใช้ในการสร้าง Object ที่มีคุณสมบัติและเมธอดต่างๆ ได้

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

let person = new Person("John Doe", 30);
console.log(person.getDetails());
```

### Enumerations
Enumerations ใช้ในการสร้างชนิดข้อมูลที่มีค่าคงที่

```ts
enum Color {
  Red,
  Green,
  Blue,
}

let color: Color = Color.Red;
console.log(color); // 0
```

หรือกำหนดค่าเริ่มต้นให้กับ Enumerations

```ts
enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}

let color: Color = Color.Red;
console.log(color); // 1
```

### Union Type
Union Type ใช้ในการระบุชนิดข้อมูลที่เป็นไปได้หลายชนิด

```ts
let data: string | number = "Hello";
data = 10;
```

หรือใช้กับค่าที่เป็นไปได้หลายค่า

```ts
type Result = "Success" | "Error";

let result: Result = "Success";

let message: Result = "Hello"; // Error: Type '"Hello"' is not assignable to type 'Result'.     
```

## การ Build โปรเจกต์ TypeScript
การ Build โปรเจกต์ TypeScript สามารถทำได้โดยใช้คำสั่ง `tsc` ซึ่งเป็น TypeScript Compiler ที่จะทำการคอมไพล์โค้ด TypeScript ให้เป็น JavaScript



เขียนโค้ด TypeScript ตามโจทย์ต่อไปนี้

1. **การใช้ Interface**
    - สร้าง Interface `Car` ที่มีคุณสมบัติ `brand` เป็น `string`, `model` เป็น `string`, และ `year` เป็น `number`
    - สร้างตัวแปร `myCar` ที่มีชนิดข้อมูลเป็น `Car` และกำหนดค่าให้กับคุณสมบัติทั้งหมด
    - สร้างฟังก์ชัน `getCarDetails` ที่รับพารามิเตอร์ `car` ที่มีชนิดข้อมูลเป็น `Car` และให้ฟังก์ชันนี้ส่งค่ากลับเป็นข้อความที่รวมรายละเอียดของรถ


2. **การใช้ Class**
    - สร้าง Class `Animal` ที่มีคุณสมบัติ `name` เป็น `string` และ `age` เป็น `number`
    - สร้างเมธอด `speak` ใน Class `Animal` ที่ส่งค่ากลับเป็นข้อความที่บอกชื่อและอายุของสัตว์
    - สร้างอินสแตนซ์ของ Class `Animal` และเรียกใช้เมธอด `speak`

    
<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup> 
