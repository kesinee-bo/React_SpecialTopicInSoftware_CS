# การเชื่อมต่อ API ด้วย Axios 

ใช้โปรเจ็คต่อเนื่องจากเรื่องการสร้างหน้า Login ในหัวข้อก่อน [ตัวอย่างการทำส่วน Login](08_login_form.md)

### ไฟล์ที่เกี่ยวข้อง

คัดลอกไฟล์จาก [09_react_bookshop_api_start_files.zip](files/09_react_bookshop_api_start_files.zip)

## 1) สร้างส่วนของการเชื่อมต่อ API ใน services/BookService.ts

services/BookService.ts
```
import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from "../types/Book";

// 📌 1) สร้าง Axios Instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  
});

// 📌 2) Middleware: เพิ่ม Authorization Header โดยอัตโนมัติ
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 📌 5) ดึงข้อมูลหนังสือเมื่อ Component โหลด
   useEffect(() => {
    fetchBooks();
  }, []);


  // 📌 4) ดึงข้อมูลหนังสือ
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/books');
      setBooks(response.data.data);
      setLoading(false);
    } catch (err) {
      return handleApiError(err);
    }
  };

  // 📌  3) ฟังก์ชันจัดการ Error
    const handleApiError = (err: unknown) => {
    const errorMessage = axios.isAxiosError(err)
      ? err.response?.data?.message || err.message
      : "An unknown error occurred";
    setError(errorMessage);
    throw new Error(errorMessage);
  };
  
  

  return { 
    books, 
    loading, 
    error, 
    fetchBooks, 
  };
};
```
## 2) การเรียกใช้งาน services/BookService.ts ในหน้า Book.tsx

pages/Book.tsx

ทำการ import useBooks จาก services/BookService.ts
```
import { useBooks } from "../services/BookService";
```

ใช้ useBooks ในการดึงข้อมูลหนังสือ
```  
  const { books, loading, error } = useBooks();

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error)
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  if (!books)
    return <div className="container mx-auto px-4 py-8">No Data</div>;
```

## 3) สร้างส่วนของการเชื่อมต่อ API ใน services/AuthService.ts

services/AuthService.ts
```
import axios from "axios";

// 📌 1) กำหนด interface ของข้อมูลที่จะได้รับจาก API (authentication response)
interface AuthResponse {
  error: boolean;
  message: string;
  userId: number;
  accessToken: string;
}

// 📌 2) กำหนด interface ของข้อมูลที่จะส่งไปยัง API 
interface SignInCredentials {
  username: string;
  role:string;
  password: string;
}

// 📌 3) สร้างตัวแปรของ axios โดยกำหนด base URL ที่ใช้ในการติดต่อ API
const api = axios.create({
  baseURL: "http://localhost:3000/api/v2", // Match your API version from index.js
  headers: {
    "Content-Type": "application/json",
  },
});



class AuthService {
  // 📌 method สำหรับ Login (singIn)
  static async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    try {

      // 📌 4) ส่งข้อมูลไปยัง API
       const response = await api.post<AuthResponse>(
        "/users/auth/signin/",
        credentials
      );

      // 📌 5) หาก login สำเร็จให้เก็บ token ใน local storage
      if ((!response.data.error) && response.data.accessToken) {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem(
          "email",
          JSON.stringify(credentials.username)
        );
      }

      return response.data;
    } catch (error) {
      // 📌 หากเกิด error จากการเรียกใช้ API ให้แสดงข้อความของ error 
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Authentication failed";
        return {
          error: true,
          message: errorMessage,
          userId: 0,
          accessToken   : "",
        };
      }

      // 📌 หากเกิด error อื่น ๆ ให้แสดงข้อความของ error 
      return {
        error: true,
        message: "An unknown error occurred during authentication",
        userId: 0,
        accessToken   : "",
      };
    }
  }

}

export default AuthService;
```

## 4) การเรียกใช้งาน services/AuthService.ts ในหน้า Login.tsx

pages/auth/Login.tsx

ทำการ import AuthService จาก services/AuthService.ts
```
import AuthService from "../../services/AuthService";
```


กำหนดสถานะของการโหลดข้อมูล
```
const [isLoading, setIsLoading] = useState(false);
```

ปรับเปลี่ยนให้มีการเรียกใช้งาน AuthService.signIn ในฟังก์ชัน onSubmit
```
 //Code
```  
  
กำหนดให้ปุ่ม Login มีการแสดงผลตามสถานะของ isLoading โดยหาก isLoading เป็น true ให้แสดงข้อความ "กำลังเข้าสู่ระบบ..." และปุ่มจะไม่สามารถกดได้
```
//Code
```

