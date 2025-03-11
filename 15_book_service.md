# อธิบายการทำงานของ BookService.ts ในการติดต่อกับ API

เอกสารนี้อธิบายเกี่ยวกับการทำงานของแต่ละฟังก์ชันใน `BookService.ts` และการเชื่อมโยงกับ API endpoints ที่เกี่ยวข้อง

## หัวข้อ
1. [ภาพรวมระบบ](#ภาพรวมระบบ)
2. [โครงสร้างของ BookService.ts](#โครงสร้างของ-bookservicets)
3. [การเรียกใช้งาน API](#การเรียกใช้งาน-api)
4. [ฟังก์ชัน fetchBooks](#ฟังก์ชัน-fetchbooks)
5. [ฟังก์ชัน addBook](#ฟังก์ชัน-addbook)
6. [ฟังก์ชัน updateBook](#ฟังก์ชัน-updatebook)
7. [ฟังก์ชัน uploadBookCover](#ฟังก์ชัน-uploadbookcover)
8. [ฟังก์ชัน updateThumbnailUrl](#ฟังก์ชัน-updatethumbnailurl)
9. [ฟังก์ชัน deleteBook](#ฟังก์ชัน-deletebook)

## ภาพรวมระบบ

`BookService.ts` เป็น Service ที่ใช้ในการเรียกใช้งาน API เกี่ยวกับการจัดการข้อมูลหนังสือ โดยมีการเชื่อมต่อกับ REST API ที่กำหนดไว้ใน Backend โดยมีโครงสร้างของไฟล์ที่เกี่ยวข้องดังนี้:

- `index.js`: กำหนด routes หลักของระบบ API
- `books.js`: กำหนด endpoints สำหรับการจัดการข้อมูลหนังสือ 
- `booksController.js`: ประกอบด้วยฟังก์ชันที่ใช้จัดการกับคำขอ API ที่เกี่ยวข้องกับหนังสือ

## โครงสร้างของ BookService.ts

`BookService.ts` ถูกสร้างขึ้นโดยใช้ React Custom Hook ชื่อ `useBooks` ที่รวมฟังก์ชันสำหรับจัดการข้อมูลหนังสือทั้งหมดไว้ด้วยกัน โดยมีการจัดการ state ดังนี้:

```typescript
// State สำหรับเก็บข้อมูลหนังสือ
const [books, setBooks] = useState<Book[]>([]);

// State สำหรับแสดงสถานะกำลังโหลดข้อมูล
const [loading, setLoading] = useState<boolean>(true);

// State สำหรับเก็บข้อความ error (ถ้ามี)
const [error, setError] = useState<string | null>(null);
```

Hook นี้ return ค่าต่างๆ ที่ Component สามารถนำไปใช้ได้:

```typescript
// สิ่งที่ return กลับไปให้ Component ที่เรียกใช้
return {
  books,           // รายการหนังสือทั้งหมด
  loading,         // สถานะการโหลด
  error,           // ข้อความ error (ถ้ามี)
  fetchBooks,      // ฟังก์ชันดึงข้อมูลหนังสือ
  addBook,         // ฟังก์ชันเพิ่มหนังสือ
  updateBook,      // ฟังก์ชันอัปเดตหนังสือ
  deleteBook,      // ฟังก์ชันลบหนังสือ
  uploadBookCover, // ฟังก์ชันอัปโหลดรูปปกหนังสือ
  updateThumbnailUrl // ฟังก์ชันอัปเดต URL รูปปกหนังสือ
};
```

## การเรียกใช้งาน API

API ทั้งหมดจะถูกเรียกผ่าน base URL ที่กำหนดในไฟล์ `configAxios.ts` ดังแสดงต่อจากนี้ และจะมีการเพิ่ม version ของ API โดยใช้ค่าจาก environment variable `API_VERSION` ตามที่กำหนดในไฟล์ `index.js`

```typescript
// 📌 สร้าง Axios Instance
import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API ,
    headers: {
      'Content-Type': 'application/json',
    },
    
  });

// 📌 Middleware: เพิ่ม Authorization Header โดยอัตโนมัติ
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

// 📌  ฟังก์ชันจัดการ Error
const handleApiError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        throw new AxiosError(err.response?.data || err.message, err.response?.status?.toString() || '500', err.config, err.request, err.response);
    }else{
        throw err;
    }
};

export  {api,handleApiError} ;
```

## ฟังก์ชัน fetchBooks

**หน้าที่**: ดึงข้อมูลหนังสือทั้งหมดจากระบบ

**การเรียกใช้งาน**:
```typescript
const { books, loading, error, fetchBooks } = useBooks();

// สามารถเรียกใช้ซ้ำเพื่อดึงข้อมูลใหม่ได้
fetchBooks();
```

**รายละเอียดการทำงานภายใน**:
```typescript
const fetchBooks = async () => {
  try {
    // เริ่มต้นโหลดข้อมูล - กำหนด loading state เป็น true
    setLoading(true);
    
    // เรียกใช้ API ด้วย axios ที่กำหนดค่าไว้ใน configAxios.ts
    const response = await api.get("/books");
    
    // บันทึกข้อมูลหนังสือลงใน state
    setBooks(response.data.data);

    // เสร็จสิ้นการโหลด - กำหนด loading state เป็น false
    setLoading(false);
  } catch (err) {
    // จัดการกับ error
    if (err instanceof AxiosError) {
      // ถ้าเป็น error จาก Axios จะมีข้อมูล response status
      setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
    } else {
      // error ทั่วไป
      setError(`Error : ${String(error)}`);
    }
    // จบการโหลดข้อมูลแม้จะมี error
    setLoading(false);
  }
};
```

**API Endpoint**: 
- Method: `GET`
- URL: `/books`
- Auth: ไม่จำเป็นต้องมี JWT token

**การทำงานโดยละเอียด**:
1. เมื่อฟังก์ชันถูกเรียกใช้ จะกำหนด state `loading` เป็น `true` เพื่อแสดงว่ากำลังโหลดข้อมูล
2. ส่งคำขอ GET ไปยัง `/books` โดยใช้ axios instance ที่กำหนดค่าไว้แล้ว
3. เมื่อได้รับการตอบกลับ จะดึงข้อมูลจาก `response.data.data` และบันทึกลงใน state `books`
4. กำหนดค่า `loading` เป็น `false` เพื่อแสดงว่าจบการโหลดข้อมูลแล้ว
5. หากมีข้อผิดพลาดเกิดขึ้น จะดักจับด้วย try-catch และบันทึกข้อความผิดพลาดลงใน state `error`
6. ฟังก์ชันนี้จะถูกเรียกใช้อัตโนมัติเมื่อ component มีการ mount ผ่าน useEffect

**Backend Implementation**:
```javascript
// จากไฟล์ booksController.js
const getBooks = async function (req, res) {
  try {
    db.query(
      `SELECT 
        bookid,title,isbn,pageCount,
        publishedDate,thumbnailUrl,
        shortDescription,authorid as 'authorid',authors.name as 'author',
        category,price
      FROM books,authors 
      WHERE books.author=authors.authorid`,
      function (error, results, fields) {
        if (error) throw error;
        return res
          .status(200)
          .send({ error: false, message: "books list", data: results });
      }
    );
  } catch {
    return res.status(401).send();
  }
};
```

## ฟังก์ชัน addBook

**หน้าที่**: เพิ่มหนังสือใหม่เข้าสู่ระบบ

**การเรียกใช้งาน**:
```typescript
const { addBook } = useBooks();
const newBook = {
  title: "ชื่อหนังสือ",
  price: 299,
  isbn: "9780123456789",
  pageCount: 250,
  publishedDate: "2023-01-01",
  thumbnailUrl: "http://example.com/cover.jpg",
  shortDescription: "คำอธิบายสั้นๆ",
  authorid: "1",
  category: "novel"
};
addBook(newBook);
```

**รายละเอียดการทำงานภายใน**:
```typescript
const addBook = async (book: Omit<Book, "bookid">) => {
  try {
    // เรียกใช้ API เพื่อเพิ่มหนังสือ
    const response = await api.post('/books', book);
    
    // รับข้อมูลหนังสือที่เพิ่มแล้วจาก response
    const newBook = response.data;
    
    // อัปเดต state โดยเพิ่มหนังสือใหม่เข้าไปใน array
    setBooks([...books, newBook]);
    
    // ส่งคืนข้อมูลหนังสือที่เพิ่มเพื่อให้ Component สามารถนำไปใช้ต่อได้
    return newBook;
  } catch (err) {
    // จัดการกับ error
    if (err instanceof AxiosError) {
      setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
    } else {
      setError(`Error : ${String(error)}`);
    }
  }
};
```

**API Endpoint**: 
- Method: `POST`
- URL: `/books`
- Auth: ต้องมี JWT token
- Body: ข้อมูลหนังสือ

**การทำงานโดยละเอียด**:
1. รับข้อมูลหนังสือใหม่เป็น parameter โดยไม่รวมฟิลด์ `bookid` เนื่องจากจะถูกสร้างโดยฐานข้อมูล
2. ส่งคำขอ POST พร้อมข้อมูลหนังสือไปยัง `/books` โดยต้องมี JWT token ในการเรียกใช้
3. เมื่อได้รับการตอบกลับ จะรับค่า `response.data` ซึ่งมีข้อมูลของหนังสือที่เพิ่มแล้ว
4. อัปเดต state `books` โดยใช้ spread operator เพื่อเพิ่มหนังสือใหม่เข้าไปต่อท้าย array เดิม
5. ส่งคืนข้อมูลหนังสือที่เพิ่มแล้ว เพื่อให้ Component ที่เรียกใช้สามารถนำไปใช้ต่อได้
6. หากมีข้อผิดพลาด จะบันทึกลงใน state `error`

**Backend Implementation**:
```javascript
// จากไฟล์ booksController.js
const addBook = async function (req, res) {
  try {
    var title = req.body.title;
    var price = req.body.price;
    var isbn = req.body.isbn;
    var pageCount = req.body.pageCount;
    var publishedDate = req.body.publishedDate;
    var thumbnailUrl = req.body.thumbnailUrl;
    var shortDescription = req.body.shortDescription;
    var author = req.body.authorid;
    var category = req.body.category;

    db.query(
      `INSERT INTO books 
      (title,price, isbn, pageCount, publishedDate, thumbnailUrl, 
      shortDescription, author, category) 
      VALUES ( '${title}',${price}, '${isbn}', ${pageCount}, '${publishedDate}', '${thumbnailUrl}', 
      '${shortDescription}', '${author}', '${category}');`,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(201).send({
          error: false,
          message: "Insert new book successfully",
          bookid: results.insertId,
        });
      }
    );
  } catch {
    return res.status(401).send();
  }
};
```

## ฟังก์ชัน updateBook

**หน้าที่**: อัปเดตข้อมูลหนังสือที่มีอยู่แล้ว

**การเรียกใช้งาน**:
```typescript
const { updateBook } = useBooks();
const bookUpdates = {
  title: "ชื่อหนังสือที่แก้ไขแล้ว",
  price: 350
};
updateBook(1, bookUpdates); // 1 คือ bookid
```

**รายละเอียดการทำงานภายใน**:
```typescript
const updateBook = async (id: number, updates: Partial<Book>) => {
  try {
    // เรียกใช้ API เพื่ออัปเดตหนังสือ
    const response = await api.put(`/books/${id}`, updates);
    
    // รับข้อมูลหนังสือที่อัปเดตแล้วจาก response
    const updatedBook = response.data;
    
    // อัปเดต state โดยแทนที่หนังสือเดิมด้วยหนังสือที่อัปเดตแล้ว
    setBooks(books.map(book => book.bookid === id ? updatedBook : book));
    
    // ส่งคืนข้อมูลหนังสือที่อัปเดตแล้ว
    return updatedBook;
  } catch (err) {
    // จัดการกับ error
    if (err instanceof AxiosError) {
      setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
    } else {
      setError(`Error : ${String(error)}`);
    }
  }
};
```

**API Endpoint**: 
- Method: `PUT`
- URL: `/books/:bookid`
- Auth: ต้องมี JWT token
- Body: ข้อมูลหนังสือที่ต้องการอัปเดต

**การทำงานโดยละเอียด**:
1. รับพารามิเตอร์ 2 ตัว: `id` (bookid ของหนังสือที่ต้องการอัปเดต) และ `updates` (ข้อมูลที่ต้องการอัปเดต)
2. `updates` เป็น type `Partial<Book>` หมายความว่าสามารถส่งเฉพาะฟิลด์ที่ต้องการอัปเดตได้ ไม่จำเป็นต้องส่งทุกฟิลด์
3. ส่งคำขอ PUT ไปยัง `/books/:bookid` พร้อมข้อมูลที่ต้องการอัปเดต
4. เมื่อได้รับการตอบกลับ จะอัปเดต state `books` โดยใช้ `map` เพื่อแทนที่ข้อมูลหนังสือเดิมด้วยข้อมูลใหม่
5. ส่งคืนข้อมูลหนังสือที่อัปเดตแล้ว
6. หากมีข้อผิดพลาด จะบันทึกลงใน state `error`

**Backend Implementation**:
```javascript
// จากไฟล์ booksController.js
const updateBookById = async function (req, res) {
  try {
    var title = req.body.title;
    var price = req.body.price;
    var isbn = req.body.isbn;
    var pageCount = req.body.pageCount;
    var publishedDate = req.body.publishedDate;
    var thumbnailUrl = req.body.thumbnailUrl;
    var shortDescription = req.body.shortDescription;
    var author = req.body.authorid;
    var category = req.body.category;

    var bookid = Number(req.params.bookid);

    db.query(
      `UPDATE books 
              SET 
                    title='${title}', 
                    price=${price},
                    isbn= '${isbn}', 
                    pageCount=${pageCount}, 
                    publishedDate='${publishedDate}', 
                    thumbnailUrl='${thumbnailUrl}', 
                    shortDescription='${shortDescription}', 
                    author='${author}', 
                    category= '${category}'
              WHERE bookid=?`,
      bookid,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send({
          error: false,
          message: "Edit book id =" + bookid.toString(),
          data: results,
        });
      }
    );
  } catch {
    return res.status(401).send();
  }
};
```

## ฟังก์ชัน uploadBookCover

**หน้าที่**: อัปโหลดรูปภาพปกหนังสือ

**การเรียกใช้งาน**:
```typescript
const { uploadBookCover } = useBooks();
const coverFile = fileInput.files[0]; // ไฟล์รูปภาพจาก input type=file
uploadBookCover(1, coverFile); // 1 คือ bookid
```

**รายละเอียดการทำงานภายใน**:
```typescript
const uploadBookCover = async (bookid: number, coverFile: File) => {
  try {
    // สร้าง FormData เพื่อส่งไฟล์
    const formData = new FormData();
    
    // เพิ่มไฟล์ลงใน FormData โดยใช้ชื่อฟิลด์ 'book_cover' ตามที่ API ต้องการ
    formData.append('book_cover', coverFile);
    
    // ส่งคำขอแบบ multipart/form-data
    const response = await api.post(`/books/cover/${bookid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // ส่งคืนข้อมูลการอัปโหลด
    return response.data;
  } catch (err) {
    // จัดการกับ error
    if (err instanceof AxiosError) {
      setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
    } else {
      setError(`Error : ${String(error)}`);
    }
  }
};
```

**API Endpoint**: 
- Method: `POST`
- URL: `/books/cover/:bookid`
- Auth: ต้องมี JWT token
- Body: FormData ที่มี field `book_cover` เป็นไฟล์รูปภาพ

**การทำงานโดยละเอียด**:
1. รับพารามิเตอร์ 2 ตัว: `bookid` (id ของหนังสือ) และ `coverFile` (ไฟล์รูปภาพที่ต้องการอัปโหลด)
2. สร้าง `FormData` object สำหรับส่งไฟล์รูปภาพ
3. เพิ่มไฟล์รูปภาพลงใน FormData โดยใช้ชื่อฟิลด์ `book_cover` ตามที่ API backend กำหนด
4. ส่งคำขอ POST ไปยัง `/books/cover/:bookid` พร้อมกับ header `Content-Type: multipart/form-data`
5. เมื่อได้รับการตอบกลับ จะส่งคืนข้อมูลการอัปโหลด (ประกอบด้วย name และ path)
6. หากมีข้อผิดพลาด จะบันทึกลงใน state `error`
7. ฟังก์ชันนี้ไม่ได้อัปเดต state `books` โดยตรง เนื่องจากเป็นการอัปโหลดไฟล์เท่านั้น

**Backend Implementation**:
```javascript
// จากไฟล์ booksController.js
const uploadBookCover = async function (req, res) {
  const bookCoverPath = process.env.BOOKSHOP_PICTURE_PATH;
  const bookid = Number(req.params.bookid);

  try {
    // ตรวจสอบว่ามีไฟล์หรือไม่
    if (!req.files || !req.files.book_cover) {
      return res.status(400).send({ msg: "No file uploaded" });
    }

    const bookPictureFile = req.files.book_cover;
    const pictureExt = path.extname(bookPictureFile.name);

    // ตรวจสอบและสร้างไดเรกทอรีถ้ายังไม่มี
    if (!fs.existsSync(bookCoverPath)) {
      fs.mkdirSync(bookCoverPath, { recursive: true });
    }

    // ลบไฟล์เดิมถ้ามี
    try {
      const files = fs.readdirSync(bookCoverPath);
      const bookFilePattern = new RegExp(`^${bookid}\\.`);

      files.forEach((file) => {
        if (bookFilePattern.test(file)) {
          fs.unlinkSync(path.join(bookCoverPath, file));
          console.log(`Deleted existing file: ${file}`);
        }
      });
    } catch (error) {
      console.error("Error while checking for existing files:", error);
    }

    // สร้างพาธไฟล์ใหม่
    const newFilePath = path.join(bookCoverPath, `${bookid}${pictureExt}`);

    // อัปโหลดไฟล์ใหม่
    bookPictureFile.mv(newFilePath, function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send({ msg: "Error occurred during upload" });
      }

      return res.status(200).send({
        name: `${bookid}${pictureExt}`,
        path: newFilePath,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).send({ msg: "Server error" });
  }
};
```

## ฟังก์ชัน updateThumbnailUrl

**หน้าที่**: อัปเดต URL ของรูปภาพปกหนังสือ

**การเรียกใช้งาน**:
```typescript
const { updateThumbnailUrl } = useBooks();
const updates = {
  thumbnailUrl: "http://example.com/newcover.jpg"
};
updateThumbnailUrl(1, updates); // 1 คือ bookid
```

**รายละเอียดการทำงานภายใน**:
```typescript
const updateThumbnailUrl = async (bookid: number, updates: Partial<Book>) => {
  try {
    // เรียกใช้ API เพื่ออัปเดต thumbnailUrl
    const response = await api.put(`/books/cover/${bookid}`, updates);
    
    // รับข้อมูลหนังสือที่อัปเดตแล้วจาก response
    const updatedBook = response.data;
    
    // อัปเดต state โดยแทนที่หนังสือเดิมด้วยหนังสือที่อัปเดตแล้ว
    setBooks(books.map(book => book.bookid === bookid ? updatedBook : book));
    
    // ส่งคืนข้อมูลหนังสือที่อัปเดตแล้ว
    return updatedBook;
  } catch (err) {
    // จัดการกับ error
    if (err instanceof AxiosError) {
      setError(`Error : ${err.response?.status} ${err.response?.statusText}`);
    } else {
      setError(`Error : ${String(error)}`);
    }
  }
};
```

**API Endpoint**: 
- Method: `PUT`
- URL: `/books/cover/:bookid`
- Auth: ต้องมี JWT token
- Body: ข้อมูลที่มี field `thumbnailUrl`

**การทำงานโดยละเอียด**:
1. รับพารามิเตอร์ 2 ตัว: `bookid` (id ของหนังสือ) และ `updates` (ข้อมูลที่ต้องการอัปเดต โดยมี field `thumbnailUrl`)
2. ส่งคำขอ PUT ไปยัง `/books/cover/:bookid` พร้อมข้อมูล thumbnailUrl
3. เมื่อได้รับการตอบกลับ จะอัปเดต state `books` โดยใช้ `map` เพื่อแทนที่ข้อมูลหนังสือเดิมด้วยข้อมูลใหม่
4. ส่งคืนข้อมูลหนังสือที่อัปเดตแล้ว
5. หากมีข้อผิดพลาด จะบันทึกลงใน state `error`
6. ฟังก์ชันนี้มีวัตถุประสงค์เพื่ออัปเดตเฉพาะ URL ของรูปภาพปกหนังสือ หลังจากทำการอัปโหลดรูปภาพแล้ว

**Backend Implementation**:
```javascript
// จากไฟล์ booksController.js
const updateBookThumbnailUrl = async function (req, res) {
  try {
    var thumbnailUrl = req.body.thumbnailUrl;
    var bookid = Number(req.params.bookid);

    db.query(
      `UPDATE books 
              SET thumbnailUrl='${thumbnailUrl}'
              WHERE bookid=?`,
      bookid,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send({
          error: false,
          message: "Update thumbnailURL for book id =" + bookid.toString(),
          data: results,
        });
      }
    );
  } catch {
    return res.status(401).send();
  }
};
```

## ฟังก์ชัน deleteBook

**หน้าที่**: ลบหนังสือออกจากระบบ

**การเรียกใช้งาน**:
```typescript
const { deleteBook } = useBooks();
deleteBook(1); // 1 คือ bookid
```

**รายละเอียดการทำงานภายใน**:
ส่วนนี้ให้นักศึกษาทำเป็นการบ้านจึงไม่แสดงในเอกสาร

**API Endpoint**: 
- Method: `DELETE`
- URL: `/books/:bookid`
- Auth: ต้องมี JWT token

**การทำงาน**:
1. ส่งคำขอ DELETE ไปยัง `/books/:bookid`
2. เมื่อได้รับการตอบกลับ จะลบหนังสือออกจาก state `books`
3. ส่งคืนค่า boolean เพื่อระบุว่าการลบสำเร็จหรือไม่

**Backend Implementation**:
```javascript
// จากไฟล์ booksController.js
const deleteBookById = async function (req, res) {
  try {
    var bookid = Number(req.params.bookid);

    await db.query(
      "DELETE FROM books where bookid=?",
      bookid,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send({
          error: false,
          message: "Delete book id =" + bookid.toString(),
          data: results,
        });
      }
    );

    // ลบรูปภาพปกหนังสือ
    const bookCoverPath = process.env.BOOKSHOP_PICTURE_PATH;
    if (!fs.existsSync(bookCoverPath)) {
      fs.mkdirSync(bookCoverPath, { recursive: true });
    }

    const files = fs.readdirSync(bookCoverPath);
    const bookFilePattern = new RegExp(`^${bookid}\\.`);

    files.forEach((file) => {
      if (bookFilePattern.test(file)) {
        fs.unlinkSync(path.join(bookCoverPath, file));
        console.log(`Deleted existing file: ${file}`);
      }
    });
  } catch {
    return res.status(401).send();
  }
};
```

<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup>