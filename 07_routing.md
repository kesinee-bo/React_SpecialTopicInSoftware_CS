# คู่มือการใช้งาน Routing ใน React 

## บทนำ

React Router เป็นไลบรารีมาตรฐานสำหรับการจัดการ Routing ในแอปพลิเคชัน React ซึ่งช่วยให้เราสามารถสร้างแอปพลิเคชันแบบ Single Page Application (SPA) ที่มีหลายหน้าได้อย่างง่ายดาย โดยที่ไม่ต้องโหลดหน้าใหม่ทั้งหมด

คู่มือนี้จะแนะนำการใช้งาน React Router ผ่านตัวอย่างโปรเจ็คที่กำหนดให้

## ติดตั้ง React Router

ก่อนเริ่มใช้งาน React Router คุณต้องติดตั้งแพ็คเกจดังนี้:

```bash
npm install react-router
```


## โครงสร้างโปรเจ็ค

โปรเจ็คตัวอย่างมีโครงสร้างไฟล์ดังนี้:

```
src/
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── Home.tsx
│   ├── Book.tsx
│   ├── New.tsx
│   └── About.tsx
├── routes/
│   └── index.tsx
└── App.tsx
```

## การกำหนด Router

ไฟล์ `routes/index.tsx` เป็นไฟล์หลักที่ใช้กำหนด routes ในแอปพลิเคชัน:

```tsx
import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/Home"
import Book from "@/pages/Book"
import New from "@/pages/New"
import About from "@/pages/About"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
```

### อธิบายโค้ด:

1. `createBrowserRouter`: ฟังก์ชันที่ใช้สร้าง router object สำหรับการจัดการเส้นทาง (routes)
2. `RouterProvider`: คอมโพเนนต์ที่รับ router object และทำให้แอปพลิเคชันสามารถใช้งาน routing ได้
3. การกำหนด routes:
   - `path: "/"`: กำหนดให้เส้นทางหลัก (root path) ใช้ `MainLayout` เป็นเลย์เอาต์หลัก
   - `children`: กำหนด routes ย่อยที่อยู่ภายใต้เส้นทางหลัก
     - `index: true`: กำหนดให้ `Home` คอมโพเนนต์แสดงที่เส้นทางหลัก (`/`)
     - `path: "/about"`: กำหนดให้ `About` คอมโพเนนต์แสดงที่เส้นทาง `/about`

## การใช้งาน Layout

ไฟล์ `layouts/MainLayout.tsx` ใช้สำหรับกำหนดโครงสร้างหลักของแอปพลิเคชัน:

```tsx
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router"

export default function MainLayout() {
  return (
    <>
        <Header/>
            <div>
                <Outlet />        
            </div>

        <Footer/>
    </>
  )
}
```

### อธิบายโค้ด:

1. `Header` และ `Footer`: คอมโพเนนต์ที่จะแสดงในทุกหน้า
2. `Outlet`: คอมโพเนนต์พิเศษจาก React Router ที่ใช้เป็นตำแหน่งสำหรับแสดงเนื้อหาของ route ปัจจุบัน
   - เมื่อเข้าถึง `/` จะแสดง `Home` ที่ตำแหน่ง `<Outlet />`
   - เมื่อเข้าถึง `/about` จะแสดง `About` ที่ตำแหน่ง `<Outlet />`

## การนำ Router ไปใช้ใน App

ไฟล์ `App.tsx` ทำหน้าที่เป็นจุดเริ่มต้นของแอปพลิเคชัน:

```tsx
import { AppRouter } from "@/routes";

export default function App() {
  return <AppRouter />
}
```

## การเพิ่ม Link สำหรับ Navigation

เพื่อให้ผู้ใช้สามารถนำทางระหว่างหน้าต่างๆ ได้ คุณควรเพิ่ม `Link` ใน Navbar:

```tsx
import {Link} from 'react-router'

function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">หน้าแรก</Link></li>
        <li><Link to="/about">เกี่ยวกับเรา</Link></li>
      </ul>
    </nav>
  )
}

export default Header
```

## การเพิ่ม Route ใหม่

หากต้องการเพิ่ม route ใหม่ เช่น หน้า Contact สามารถทำได้ดังนี้:

1. สร้างไฟล์ `Book.tsx` และ New.tsx ใน `pages/`
2. แก้ไข `routes/index.tsx` ดังนี้:

```tsx
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
                        {
                path: "book",
                element: <Book />
            },
            {
                path: "/new",
                element: <New />
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    }
])
```

3. เพิ่ม `Link` ใน Navbar:

```tsx
<li><Link to="/book">หนังสือ</Link></li>
<li><Link to="/new">เพิ่มหนังสือใหม่</Link></li>
```

## เพิ่มความสวยงามด้วย Tailwind CSS

```tsx
import { useState } from "react"
import {Link} from 'react-router'
function Header() {
    const [menu, setMenu] = useState(1);

    return (
      <>
        <header className="bg-black text-white py-4 sticky top-0">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex-shrink-0  cursor-pointer flex items-center">
              <span className="material-icons text-cyan-200 text-5xl md:text-6xl">
                auto_stories
              </span>
              {/* ถ้าหน้าจอเล็กกว่า (md) ไม่แสดงชื่อร้าน */}
              <span className="text-xl md:text-2xl font-semibold text-cyan-300 ml-2 hidden md:block">
                ComSci Book Shop
              </span>
            </div>
            {/* หน้าจอขนาดใหญ่ (sm) ขึ้นไป ให้แสดงเมนูเป็นข้อความ */}
            <nav className="font-semibold hidden sm:flex text-lg">
              <ul className="flex space-x-4">
                <li className="mr-6 p-1">
                  <Link to="/" className={menu==1 ? "cursor-default text-cyan-400 border-b-2 border-cyan-400" : "text-white hover:text-cyan-400"} onClick={() => setMenu(1)} >
                    Home
                  </Link>
                </li>
                <li className="mr-6 p-1">
                <Link to="/book"  className={menu==2 ? "cursor-default text-cyan-400 border-b-2 border-cyan-400" : "text-white hover:text-cyan-400"} onClick={() => setMenu(2)} >
                    Books
                    </Link>
                </li>
                <li className="mr-6 p-1">
                <Link to="/new"  className={menu==3 ? "cursor-default text-cyan-400  border-b-2 border-cyan-400" : "text-white hover:text-cyan-400"} onClick={() => setMenu(3)}>
                    New Arrivals
                    </Link>
                </li>
                <li className="mr-6 p-1">
                <Link to="/about"  className={menu==4 ? "cursor-default text-cyan-400  border-b-2 border-cyan-400" : "text-white hover:text-cyan-400"} onClick={() => setMenu(4)}>
                    About Us
                    </Link>
                </li>
              </ul>
            </nav>
            {/* ถ้าหน้าจอเล็กมาก (sm) ให้แสดงเมนูเป็น icon เมนู (hamburger menu) */}
            <div className="mr-6 sm:hidden">
              <span className="text-cyan-300 focus:outline-none material-icons text-3xl">
                menu
              </span>
            </div>
          </div>
        </header>
      </>
    );
  }
  
  export default Header;
```

## สรุป

React Router ช่วยให้การจัดการเส้นทางในแอปพลิเคชัน React เป็นเรื่องง่าย ด้วยความสามารถในการกำหนดเส้นทาง การใช้งาน layout ร่วมกัน การรับพารามิเตอร์ และการนำทางแบบโปรแกรม

เมื่อใช้งาน React Router อย่างเหมาะสม คุณจะสามารถสร้างแอปพลิเคชันที่มีหลายหน้าที่ใช้งานง่ายและมีประสิทธิภาพ


<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup> 