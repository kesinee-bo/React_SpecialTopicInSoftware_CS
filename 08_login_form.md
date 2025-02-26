# React Login Form

1) สร้างโปรเจ็คใหม่และติดตั้ง react-login-form

```
npm install react-router tailwindcss @tailwindcss/vite react-hook-form sweetalert2 lucide-react
```

index.css
```
@import "tailwindcss";
```

vite.config.ts
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
```

2) สร้าง layouts/AdminLayout.tsx และ layouts/AuthLayout.tsx

AdminLayout.tsx
```
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <div>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

```

AuthLayout.tsx
```
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>

      <div>
        <Outlet />
      </div>

    </>
  );
}

```

3) กำหนด routes เบื้องต้น ใน App.tsx

```
import {Route, Routes, BrowserRouter} from 'react-router';
import MainLayout from './layouts/MainLayout';
import BookPage from './pages/Book';
import Home from './pages/Home';
import About from './pages/About';
import New from './pages/New';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Page */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/new" element={<New />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Admin Page */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
        </Route>

        {/* Auth Page */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<h1 className='text-6xl text-red-500'>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

```


4) สร้าง pages/auth/login.tsx

```

```

5) AdminHeader ใส่โค้ด Sign Out


```

```


6) สร้าง routes/ProtectedRoute.tsx

```

```


