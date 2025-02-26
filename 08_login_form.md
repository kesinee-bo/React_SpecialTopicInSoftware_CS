# React Login Form

1) สร้างโปรเจ็คใหม่และติดตั้ง react-login-form

```
npm install react-router tailwindcss @tailwindcss/vite react-hook-form sweetalert2
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


