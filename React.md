# ขั้นตอนในการสร้างโปรเจกต์ React Web (TypeScript) ด้วย Vite

## ขั้นตอนในการสร้างโปรเจกต์

1. **ติดตั้ง Node.js**: ตรวจสอบให้แน่ใจว่าเครื่องของคุณมี Node.js ติดตั้งอยู่แล้ว โดยสามารถตรวจสอบได้ด้วยคำสั่ง `node -v` และ `npm -v` เพื่อเช็คเวอร์ชันของ Node.js และ npm ตามลำดับ หากยังไม่มีติดตั้ง สามารถดาวน์โหลดได้จาก [เว็บไซต์ Node.js](https://nodejs.org) [แหล่งอ้างอิง: Node.js Documentation](https://nodejs.org/en/docs/) [แหล่งอ้างอิง](https://nodejs.org/en/docs/)

- **Node.js**: เป็น JavaScript runtime ที่ทำให้สามารถรันโค้ด JavaScript นอกเบราว์เซอร์ได้ เหมาะสำหรับการพัฒนาแอปพลิเคชันฝั่งเซิร์ฟเวอร์ [แหล่งอ้างอิง](https://nodejs.org/en/about/)
- **npm**: ย่อมาจาก Node Package Manager ใช้สำหรับจัดการแพ็กเกจ (libraries) ที่ใช้ในการพัฒนา Node.js สามารถติดตั้ง ไลบรารีต่าง ๆ และจัดการ Dependencies ได้อย่างสะดวก [แหล่งอ้างอิง](https://docs.npmjs.com/)
- **npx**: เป็นเครื่องมือที่มาพร้อมกับ npm ใช้สำหรับรันคำสั่งของแพ็กเกจที่ยังไม่ได้ติดตั้งไว้ในโปรเจกต์โดยตรง เหมาะสำหรับการรันคำสั่งเพียงครั้งเดียวโดยไม่ต้องติดตั้งแพ็กเกจถาวร [แหล่งอ้างอิง](https://nodejs.dev/en/learn/the-npx-nodejs-package-runner/)

2. **สร้างโปรเจกต์ Vite**: Vite เป็นเครื่องมือที่ใช้สร้างโปรเจกต์ JavaScript และทำให้การพัฒนาแอปพลิเคชันเป็นไปได้อย่างรวดเร็ว โดยการ Build และ Hot Reload ที่มีประสิทธิภาพสูง เหมาะสำหรับการพัฒนา React, Vue, และ Svelte โดยเฉพาะ สามารถดูข้อมูลเพิ่มเติมเกี่ยวกับ Vite ได้ที่ [Vite Documentation](https://vitejs.dev/guide/)

สามารถสร้างโปรเจกต์ได้หลายวิธี เช่น ผ่าน npm, npx, หรือ vite โดยตรง ซึ่งแต่ละแบบมีข้อดีแตกต่างกัน:

- **ผ่าน npm**: ใช้คำสั่ง `npm create vite@latest my-react-app -- --template react-ts`  
  - เหมาะสำหรับผู้ที่ต้องการติดตั้งแพ็กเกจอย่างเป็นทางการและจัดการทุกอย่างผ่าน npm  
  [แหล่งอ้างอิง: npm Documentation](https://docs.npmjs.com/)

- **ผ่าน npx**: ใช้คำสั่ง `npx create-vite@latest my-react-app --template react-ts`  
  - ไม่ต้องติดตั้งแพ็กเกจล่วงหน้า ใช้ npx สำหรับการรันคำสั่งที่ต้องการเพียงครั้งเดียว ทำให้ประหยัดพื้นที่ในเครื่อง  
  [แหล่งอ้างอิง: npx Documentation](https://docs.npmjs.com/cli/v7/commands/npx)

- **ผ่าน vite โดยตรง**: หลังจากติดตั้ง Vite โดยใช้คำสั่ง `npm install -g vite` สามารถใช้คำสั่ง `vite create my-react-app --template react-ts`  
  - การติดตั้ง Vite ทั่วไปบนเครื่อง ทำให้สามารถใช้งานได้ทันทีโดยไม่ต้องพึ่ง npx หรือ npm ทุกครั้ง

เปิด Terminal แล้วรันคำสั่งต่อไปนี้:
   ```bash
   npm create vite@latest my-react-app -- --template react-ts
   cd my-react-app
   ```
   - `my-react-app` คือชื่อโฟลเดอร์ของโปรเจกต์
   - `--template react-ts` ใช้สำหรับสร้างโปรเจกต์ React พร้อมกับ TypeScript

3. **ติดตั้ง Dependencies**:  
   เข้าไปที่โฟลเดอร์โปรเจกต์แล้วติดตั้ง Dependencies ที่จำเป็น:
   ```bash
   npm install
   ```

4. **เริ่มต้นเซิร์ฟเวอร์สำหรับพัฒนา**:  
   รันเซิร์ฟเวอร์เพื่อทดสอบโปรเจกต์:
   ```bash
   npm run dev
   ```

5. **เปิดโปรเจกต์ในเบราว์เซอร์**:  
   เปิดเบราว์เซอร์แล้วไปที่ URL ที่แสดงใน Terminal (ปกติจะเป็น `http://localhost:5173`)

---

## โครงสร้างของโปรเจกต์ React (Vite + TypeScript) [แหล่งอ้างอิง](https://vitejs.dev/guide/)

หลังจากสร้างโปรเจกต์แล้ว โครงสร้างของโฟลเดอร์จะมีลักษณะดังนี้:

```
my-react-app/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── [ไฟล์ Static เช่น รูปภาพ]
│   ├── components/
│   │   └── [ส่วนประกอบ React ที่สามารถใช้ซ้ำได้]
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### โฟลเดอร์และไฟล์สำคัญ
- **`src/`**:  
  รวมโค้ดทั้งหมดของแอปพลิเคชัน
  - **`App.tsx`**: ไฟล์ Root Component ของแอป
  - **`main.tsx`**: จุดเริ่มต้นสำหรับการเรนเดอร์แอปเข้าสู่ DOM
  - **`components/`**: โฟลเดอร์สำหรับเก็บส่วนประกอบ (Component) ที่สามารถใช้ซ้ำได้
  - **`assets/`**: โฟลเดอร์สำหรับไฟล์ Static เช่น รูปภาพ
  - **`index.css`**: ไฟล์สำหรับ CSS ทั่วไปของแอป

- **`public/`**:  
  เก็บไฟล์ Static ที่ Vite จะไม่ทำการประมวลผล เช่น ไฟล์ HTML หรือรูปภาพ

- **`tsconfig.json`**:  
  ไฟล์การตั้งค่าของ TypeScript

- **`vite.config.ts`**:  
  ไฟล์การตั้งค่าของ Vite

---

## คอนเซปต์สำคัญสำหรับ React

### 1. **Components (ส่วนประกอบ)**
   - เป็นส่วนสำคัญของ React ที่ใช้ในการสร้าง UI
   - สามารถเขียนเป็นฟังก์ชันหรือคลาสที่คืนค่า JSX (JavaScript XML)
   - ตัวอย่าง:
     ```tsx
     const HelloWorld = () => {
       return <h1>สวัสดี โลก!</h1>;
     };
     ```

### 2. **JSX**
   - รูปแบบการเขียนโค้ดที่ผสม HTML และ JavaScript
   - ตัวอย่าง:
     ```tsx
     const App = () => <div>สวัสดี React!</div>;
     ```

### 3. **State (สถานะ)**
   - ใช้สำหรับเก็บข้อมูลที่เปลี่ยนแปลงได้ใน Component
   - จัดการด้วย `useState` hook
   - ตัวอย่าง:
     ```tsx
     const Counter = () => {
       const [count, setCount] = React.useState(0);
       return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
     };
     ```

### 4. **Props (คุณสมบัติ)**
   - ใช้สำหรับส่งข้อมูลจาก Parent Component ไปยัง Child Component
   - ตัวอย่าง:
     ```tsx
     const Greeting = ({ name }: { name: string }) => <h1>สวัสดี, {name}!</h1>;
     ```

### 5. **Lifecycle และ Effects**
   - React มี Lifecycle ของ Component เช่น การ Mount, Update และ Unmount
   - `useEffect` ใช้จัดการ Side Effects เช่น การดึงข้อมูล
   - ตัวอย่าง:
     ```tsx
     React.useEffect(() => {
       console.log("Component ถูก Mount!");
     }, []);
     ```

### 6. **Routing (การจัดการเส้นทาง)**
   - React ไม่ได้มีระบบ Routing มาในตัว สามารถใช้ไลบรารี เช่น `react-router-dom` เพื่อสร้างการนำทาง [แหล่งอ้างอิง](https://reactrouter.com/)
   - ตัวอย่าง:
     ```tsx
     import { BrowserRouter, Routes, Route } from 'react-router-dom';

     const App = () => (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
         </Routes>
       </BrowserRouter>
     );
     ```

### 7. **Context**
   - ใช้สำหรับแชร์ข้อมูลระหว่าง Component โดยไม่ต้องส่งผ่าน Props
   - ตัวอย่าง:
     ```tsx
     const ThemeContext = React.createContext("light");

     const App = () => (
       <ThemeContext.Provider value="dark">
         <Toolbar />
       </ThemeContext.Provider>
     );
     ```

---

## ทำไมต้องแปลง TypeScript ไปเป็น JavaScript

TypeScript เป็นภาษาที่ช่วยเสริมความสามารถของ JavaScript โดยการเพิ่ม Type System ซึ่งช่วยให้การเขียนโค้ดมีความปลอดภัยและมีความแม่นยำมากขึ้น แต่เว็บเบราว์เซอร์ส่วนใหญ่ไม่สามารถรัน TypeScript ได้โดยตรง ดังนั้นเราจำเป็นต้องแปลง TypeScript ไปเป็น JavaScript เพื่อให้สามารถรันในเบราว์เซอร์และสภาพแวดล้อมต่าง ๆ ได้อย่างถูกต้อง [แหล่งอ้างอิง](https://www.typescriptlang.org/docs/)

## ขั้นตอนในการแปลง TypeScript ไปเป็น JavaScript และการ Build และ Deploy โปรเจกต์

[แหล่งอ้างอิง: TypeScript Handbook](https://www.typescriptlang.org/docs/)

1. **แปลง TypeScript ไปเป็น JavaScript**: 
   โปรเจกต์ที่สร้างด้วย Vite นั้นจะใช้ TypeScript โดยอัตโนมัติ และในการแปลงโค้ด TypeScript ไปเป็น JavaScript นั้น Vite จะทำการแปลงให้ในขั้นตอนการ Build โดยอัตโนมัติ ดังนั้นคุณไม่จำเป็นต้องทำอะไรเพิ่มเติมในขั้นตอนนี้

2. **การ Build โปรเจกต์**: 
   เมื่อคุณพัฒนาโปรเจกต์เสร็จแล้ว คุณสามารถ Build โปรเจกต์เพื่อเตรียมพร้อมสำหรับการ Deploy โดยใช้คำสั่งต่อไปนี้:
   ```bash
   npm run build
   ```
   คำสั่งนี้จะสร้างโฟลเดอร์ `dist/` ซึ่งจะประกอบไปด้วยไฟล์ JavaScript และ Asset ต่าง ๆ ที่ถูก Optimize และพร้อมใช้งานใน Production

3. **การ Deploy โปรเจกต์**:
   - **Deploy ไปยัง Static Server**: คุณสามารถใช้ Static Server อย่างเช่น `serve` เพื่อตรวจสอบว่าโปรเจกต์ที่ Build แล้วสามารถรันได้อย่างถูกต้อง
     ```bash
     npm install -g serve
     serve -s dist
     ```
     คำสั่งนี้จะเริ่มต้นเซิร์ฟเวอร์และแสดงผลเนื้อหาในโฟลเดอร์ `dist/` บนเบราว์เซอร์
   
   - **Deploy ไปยัง Hosting Provider**: คุณสามารถนำไฟล์ในโฟลเดอร์ `dist/` ไปวางบนบริการ Hosting ต่าง ๆ เช่น [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [GitHub Pages](https://pages.github.com/) หรือใช้เซิร์ฟเวอร์ของคุณเอง
   
   - **Deploy ไปยัง Vercel**: ตัวอย่างการ Deploy โปรเจกต์ไปยัง Vercel
     1. ติดตั้ง [Vercel CLI](https://vercel.com/docs/cli) โดยใช้คำสั่ง `npm install -g vercel`
     2. รันคำสั่ง `vercel` ในโฟลเดอร์โปรเจกต์ จากนั้นทำตามคำแนะนำบนหน้าจอ
     
4. **คำอธิบายเพิ่มเติม**:
   - **Vite** จะช่วยทำการ Bundle และ Optimize โค้ดให้เล็กลงและมีประสิทธิภาพมากขึ้นสำหรับการใช้งานใน Production โดยอัตโนมัติ
   - การ Build และ Deploy โปรเจกต์ React ด้วย Vite จะช่วยลดเวลาในการ Build และเพิ่มประสิทธิภาพในการโหลดแอปพลิเคชัน

## การเปรียบเทียบความแตกต่างระหว่าง TypeScript และ JavaScript

[แหล่งอ้างอิง: TypeScript vs JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) [แหล่งอ้างอิง](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### ความแตกต่างในการเขียนโค้ด
- **TypeScript**: 
  - เป็นซูเปอร์เซตของ JavaScript ที่มีการเพิ่ม Type System เข้ามา ทำให้การพัฒนาโค้ดสามารถตรวจสอบข้อผิดพลาดได้ตั้งแต่ตอนเขียนโค้ด ทำให้การเขียนโค้ดมีความมั่นใจมากขึ้น โดยเฉพาะในโครงการขนาดใหญ่ ตัวอย่างเช่น การประกาศตัวแปรจะต้องระบุชนิดข้อมูลที่ชัดเจน เช่น
    ```ts
    let message: string = "Hello World";
    ```
  - รองรับการใช้ฟีเจอร์ใหม่ ๆ ของ JavaScript ได้อย่างรวดเร็ว

- **JavaScript**: 
  - เป็นภาษาที่เว็บเบราว์เซอร์รองรับโดยตรง และใช้กันอย่างแพร่หลาย ไม่มีการตรวจสอบชนิดข้อมูล ทำให้ง่ายต่อการเขียนโค้ดในระยะแรก แต่ก็อาจทำให้เกิดข้อผิดพลาดได้ง่ายขึ้น ตัวอย่างเช่น
    ```js
    let message = "Hello World";
    ```

### ข้อดีและข้อเสียของ TypeScript และ JavaScript
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

## สรุป
การใช้ Vite และ TypeScript ช่วยให้พัฒนา React ได้อย่างรวดเร็วและทันสมัย การเข้าใจคอนเซปต์สำคัญของ React เช่น Components, State, Props และ Hooks จะช่วยให้คุณสร้างแอปพลิเคชันที่มีโครงสร้างและดูแลรักษาได้ง่ายขึ้น!
