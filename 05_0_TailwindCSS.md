# พื้นฐานที่ต้องรู้เกี่ยวกับ Tailwind CSS

Tailwind CSS เป็น Utility-First CSS Framework ที่ช่วยให้การออกแบบและพัฒนาเว็บไซต์มีความง่ายและรวดเร็ว โดยการใช้ utility class ที่ถูกกำหนดไว้ล่วงหน้า ทำให้นักพัฒนาไม่ต้องเขียน CSS ใหม่ทั้งหมดหรือจัดการไฟล์ CSS ที่ซับซ้อน

---

## 1. **Utility-First Framework**

Tailwind CSS มาพร้อมกับคลาสที่พร้อมใช้งานสำหรับการจัดการ layout, spacing, และการออกแบบอื่น ๆ โดยไม่ต้องสร้าง CSS เอง ตัวอย่างเช่น:

```html
<div class="bg-blue-500 text-white p-4 rounded">
    Hello, Tailwind!
</div>
```

### อธิบายโค้ด:
- `bg-blue-500`: กำหนดพื้นหลังสีฟ้าเฉดที่ 500
- `text-white`: กำหนดข้อความสีขาว
- `p-4`: เพิ่ม padding รอบ ๆ 16px
- `rounded`: ทำให้มุมขององค์ประกอบมีลักษณะโค้งมน

---

## 2. **Responsive Design**

Tailwind CSS รองรับการออกแบบที่ตอบสนองต่อหน้าจอ (Responsive Design) ด้วย breakpoints เช่น `sm`, `md`, `lg`, และ `xl`:

```html
<div class="text-sm md:text-lg lg:text-2xl">
    Responsive Text
</div>
```

### อธิบายโค้ด:
- `text-sm`: ขนาดตัวอักษรเล็กสำหรับหน้าจอเล็ก
- `md:text-lg`: ขนาดตัวอักษรใหญ่ขึ้นเมื่ออยู่ในหน้าจอกลาง
- `lg:text-2xl`: ขนาดตัวอักษรใหญ่สำหรับหน้าจอขนาดใหญ่

---

## 3. **Customization**

สามารถปรับแต่งค่าเริ่มต้นได้ในไฟล์ `tailwind.config.js` เพื่อเพิ่มความยืดหยุ่นให้กับการใช้งาน ตัวอย่างการปรับแต่งสี:

```javascript
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#FF5733',
            },
        },
    },
};
```

หลังจากปรับแต่ง คุณสามารถใช้งานสีที่กำหนดไว้ใหม่ได้ดังนี้:

```html
<div class="bg-primary text-secondary">
    Custom Colors Example
</div>
```

### อธิบายโค้ด:
- `bg-primary`: ใช้สีพื้นหลังที่กำหนดใน `tailwind.config.js`
- `text-secondary`: ใช้สีตัวอักษรที่ปรับแต่งใหม่

---

## 4. **Hover, Focus และ State Variants**

Tailwind CSS รองรับการจัดการ state-specific styling เช่น hover, focus หรือ active ตัวอย่างการใช้งาน:

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Hover me
</button>
```

### อธิบายโค้ด:
- `hover:bg-blue-700`: เปลี่ยนสีพื้นหลังเป็นฟ้าเข้มเมื่อผู้ใช้นำเมาส์ไปวาง
- `font-bold`: ทำให้ข้อความเป็นตัวหนา
- `py-2 px-4`: เพิ่ม padding ด้านบน-ล่าง 8px และซ้าย-ขวา 16px

---

## 6. **Flexbox และ Grid Utilities**

Flexbox และ Grid เป็นเครื่องมือที่ช่วยจัดการ layout ใน CSS ได้อย่างมีประสิทธิภาพ ซึ่ง Tailwind CSS ได้เตรียม utility classes ไว้เพื่อการใช้งานที่ง่ายดาย

### **Flexbox คืออะไร?**
Flexbox (Flexible Box Layout) เป็น layout model ที่ช่วยจัดวางและกระจาย space ระหว่าง items ภายใน container ได้อย่างยืดหยุ่น เหมาะสำหรับการจัดการ layout ที่เปลี่ยนแปลงได้ เช่น การจัดศูนย์กลางเนื้อหา หรือการสร้าง navigation bar

**ตัวอย่างการใช้งานใน Tailwind CSS:**
```html
<div class="flex justify-center items-center h-screen">
    Centered Content
</div>
```

**อธิบายโค้ด:**
- `flex`: กำหนด display ของ container เป็น flexbox
- `justify-center`: จัดวาง items ให้อยู่กึ่งกลางในแนวนอน
- `items-center`: จัดวาง items ให้อยู่กึ่งกลางในแนวตั้ง
- `h-screen`: กำหนดความสูง container ให้เต็มหน้าจอ

---

### **Grid คืออะไร?**
Grid Layout เป็น layout model ที่ช่วยจัดการ layout ที่มีความซับซ้อน โดยแบ่งพื้นที่ออกเป็นแถว (rows) และคอลัมน์ (columns) ซึ่งเหมาะสำหรับการสร้างหน้าเว็บที่มีการจัดวางองค์ประกอบเป็นระเบียบ เช่น gallery หรือ dashboard

**ตัวอย่างการใช้งานใน Tailwind CSS:**
```html
<div class="grid grid-cols-3 gap-4">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

**อธิบายโค้ด:**
- `grid`: กำหนด display ของ container เป็น grid
- `grid-cols-3`: แบ่ง grid ออกเป็น 3 คอลัมน์
- `gap-4`: กำหนดระยะห่างระหว่าง items เป็น 16px

---

### **เปรียบเทียบระหว่าง Flexbox และ Grid**
| คุณสมบัติ         | Flexbox                          | Grid                               |
|-------------------|----------------------------------|-----------------------------------|
| การจัดวาง        | เหมาะสำหรับ layout แบบหนึ่งมิติ | เหมาะสำหรับ layout แบบสองมิติ   |
| การกำหนดทิศทาง   | ใช้ `flex-direction`             | ใช้ `grid-template-rows` และ `grid-template-columns` |
| ความยืดหยุ่น     | เหมาะสำหรับการจัดการ space ระหว่าง items | เหมาะสำหรับการจัด layout ที่ซับซ้อน |

Flexbox และ Grid มีจุดเด่นที่แตกต่างกัน การเลือกใช้งานขึ้นอยู่กับความต้องการของ layout และความซับซ้อนของโปรเจกต์

### Flexbox:
```html
<div class="flex justify-center items-center h-screen">
    Centered Content
</div>
```

### อธิบายโค้ด:
- `flex`: กำหนด display ของ container เป็น flex
- `justify-center`: จัดวางองค์ประกอบในแนวนอนให้อยู่กึ่งกลาง
- `items-center`: จัดวางองค์ประกอบในแนวตั้งให้อยู่กึ่งกลาง
- `h-screen`: กำหนดความสูงเป็น 100% ของหน้าจอ

### Grid:
```html
<div class="grid grid-cols-3 gap-4">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

### อธิบายโค้ด:
- `grid`: กำหนด display ของ container เป็น grid
- `grid-cols-3`: แบ่ง grid ออกเป็น 3 คอลัมน์
- `gap-4`: เพิ่มระยะห่างระหว่าง grid items 16px

---

## 7. **Dark Mode Support**

Tailwind CSS สนับสนุน Dark Mode โดยใช้คลาส `dark:` สำหรับปรับแต่ง styling:

```html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
    Dark Mode Example
</div>
```

### อธิบายโค้ด:
- `dark:bg-gray-800`: เปลี่ยนพื้นหลังเป็นสีเทาเข้มเมื่ออยู่ในโหมด Dark
- `dark:text-white`: เปลี่ยนข้อความเป็นสีขาวในโหมด Dark

---

## 8. **JIT (Just-In-Time) Compiler**

ระบบ Just-In-Time ของ Tailwind CSS ช่วยสร้าง class ที่ถูกใช้งานในไฟล์เท่านั้น ทำให้ไฟล์ CSS มีขนาดเล็กลงและโหลดเร็วขึ้น

### ตัวอย่างการใช้งาน:
```html
<div class="text-red-600 hover:text-red-800">
    Dynamic Class Example
</div>
```

---

## 9. @apply Directive:
- ใช้สำหรับเพิ่ม utility classes ที่กำหนดไว้ล่วงหน้า
- ช่วยให้การจัดการ CSS ที่ซับซ้อนมีความสะดวกและเรียบง่าย
- ควรใช้กับ style ที่มีลักษณะซ้ำ ๆ กันจริง ๆ ไม่งั้นจะทำให้สูญเสียความยืดหยุ่นของ Tailwind CSS ซึ่งเป็น Utility-First Framework

การใช้ @apply สามารถกำหนดได้ 3 ระดับดังนี้:
#### 1. @layer base:
* ใช้สำหรับกำหนด base styles หรือ default styles
* เหมาะสำหรับ HTML elements พื้นฐาน เช่น body, h1, p, a



##### ตัวอย่างการใช้งาน:
```css
@layer base {
  h1 {
    @apply text-2xl font-bold mb-4;
  }
  
  a {
    @apply text-blue-600 hover:text-blue-800;
  }

  input {
    @apply border rounded px-2 py-1;
  }

  body {
    @apply bg-gray-100 text-gray-900;
  }
}
```

#### 2. @layer components:
* ใช้สำหรับสร้าง reusable components
* เหมาะกับ UI components ที่ใช้ซ้ำบ่อยๆ
* มี specificity สูงกว่า base แต่ต่ำกว่า utilities



##### ตัวอย่างการใช้งาน:
```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded;
  }

  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }

  .form-input {
    @apply border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500;
  }
}
```

#### 3. @layer utilities:
* ใช้สำหรับสร้าง utility classes ใหม่
* มี specificity สูงสุด
* เหมาะสำหรับสร้าง custom utilities ที่ Tailwind ไม่มีให้

##### ตัวอย่างการใช้งาน:
```css
@layer utilities {
  .text-shadow {
    @apply shadow-sm;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .custom-grid {
    @apply grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))];
  }
}
```

#### สรุปการใช้ @layer
หากพิจารณาจากลำดับความเฉพาะเจาะจง (Specificity) ของ CSS จะเรียงลำดับได้ดังนี้:
1. Utilities
2. Components
3. Base

```
utilities > components > base
```

##### ควรใช้ @layer base เมื่อ:
* เมื่อต้องการกำหนด default styles
* เมื่อต้องการ override browser defaults
* สำหรับ global typography

##### ควรใช้ @layer components เมื่อ:
* เมื่อสร้าง reusable UI components
* สำหรับ pattern ที่ใช้ซ้ำบ่อยๆ

##### ควรใช้ @layer utilities เมื่อ:
* เมื่อต้องการสร้าง utility classes ใหม่
* สำหรับ custom styles ที่ใช้บ่อยแต่ Tailwind ไม่มีให้


##### ตัวอย่างการใช้งานร่วมกัน:
```css
@layer base {
  body {
    @apply bg-gray-50;
  }
}

@layer components {
  .btn-custom {
    @apply px-4 py-2 rounded;
  }
}

@layer utilities {
  .custom-shadow {
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
  }
}
```

---

## สรุปข้อดีของ Tailwind CSS
- ลดเวลาในการเขียน CSS
- ปรับแต่งได้ง่ายและยืดหยุ่น
- รองรับ Responsive Design อย่างครบถ้วน
- มีระบบ Dark Mode และการจัดการ State Variants ที่สะดวก

---

## แหล่งอ้างอิง
1. [เว็บไซต์ทางการ Tailwind CSS](https://tailwindcss.com/)
2. [Tailwind CSS Documentation](https://tailwindcss.com/docs)
3. [Tailwind UI Components](https://tailwindui.com/)



<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup> 
