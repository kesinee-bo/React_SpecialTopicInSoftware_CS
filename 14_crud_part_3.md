# ตัวอย่าง ComSci Book Shop (CRUD) : Part 3 หน้าแก้ไขข้อมูลหนังสือ

## 1) การเรียกใช้ Custom Hook และการดึงข้อมูลหนังสือจาก API

### วัตถุประสงค์
- เข้าใจการเรียกใช้ Custom Hook (useBooks)
- เข้าใจการใช้งาน React Hook Form
- เข้าใจการดึงข้อมูลจาก URL parameters

### เนื้อหา
1. การเรียกใช้ Custom Hook และฟังก์ชันที่เกี่ยวข้อง
2. การจัดการพารามิเตอร์จาก URL
3. การสร้างและจัดการสถานะสำหรับข้อมูลหนังสือ

### กิจกรรม
- ให้ผู้เรียนเติมโค้ดส่วนการเรียกใช้ Custom Hook และการสร้างสถานะตามที่ระบุด้วย TODO 1-3

```typescript
// 📌 1) เรียกใช้ useParams เพื่อดึงค่า bookid จาก URL และ useNavigate สำหรับการนำทาง
const { bookid } = useParams<{ bookid: string }>();
const navigate = useNavigate();

// 📌 2) เรียกใช้ custom hook useBooks เพื่อดึงข้อมูลและฟังก์ชันที่เกี่ยวข้องกับการจัดการหนังสือ
const { books, loading, error, fetchBooks, updateBook, uploadBookCover } = useBooks();

// 📌 3) สร้าง state สำหรับการจัดการข้อมูลหนังสือและการอัปโหลดรูปภาพ
const [book, setBook] = useState<Book | null>(null);
const [coverFile, setCoverFile] = useState<File | null>(null);
const [coverPreview, setCoverPreview] = useState<string>("");
const [isSaving, setIsSaving] = useState<boolean>(false);
const [saveError, setSaveError] = useState<string | null>(null);
const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
```

## 2) การใช้งาน React Hook Form สำหรับการจัดการฟอร์ม

### วัตถุประสงค์
- เข้าใจการใช้งาน React Hook Form
- เข้าใจการกำหนดค่าเริ่มต้นของฟอร์ม

### เนื้อหา
1. การเตรียมและกำหนดค่าสำหรับ React Hook Form
2. การตั้งค่าเริ่มต้นสำหรับฟอร์ม

### กิจกรรม
- ให้ผู้เรียนเติมโค้ดการใช้งาน useForm ตามที่ระบุด้วย TODO 4

```typescript
// 📌 4) ใช้งาน useForm เพื่อจัดการฟอร์มแก้ไขข้อมูลหนังสือ
const { register, handleSubmit, setValue, formState: { errors } } = useForm<BookFormData>({
  defaultValues: {
    title: "",
    shortDescription: "",
    isbn: "",
    authorid: 0,
    category: "",
    price: 1,
    pageCount: 1,
    thumbnailUrl: "",
    publishedDate: "",
  }
});
```

## 3) การดึงข้อมูลหนังสือและกำหนดค่าให้กับฟอร์ม

### วัตถุประสงค์
- เข้าใจการใช้งาน useEffect
- เข้าใจการดึงข้อมูลตามเงื่อนไข
- เข้าใจการกำหนดค่าให้กับฟอร์ม

### เนื้อหา
1. การใช้ useEffect ในการดึงข้อมูลหนังสือ
2. การค้นหาข้อมูลหนังสือจาก ID ที่ระบุ
3. การกำหนดค่าให้กับฟอร์มและการแสดงภาพตัวอย่าง

### กิจกรรม
- ให้ผู้เรียนเติมโค้ดส่วนการดึงข้อมูลและกำหนดค่าให้กับฟอร์มตามที่ระบุด้วย TODO 5

```typescript
// 📌 5) ใช้ useEffect เพื่อดึงข้อมูลหนังสือเมื่อ Component โหลดหรือข้อมูลหนังสือเปลี่ยนแปลง
useEffect(() => {
  if (bookid && books.length > 0) {
    const bookIdNum = parseInt(bookid);
    const foundBook = books.find((b) => b.bookid === bookIdNum);

    if (foundBook) {
      setBook(foundBook);
      
      // Set form values
      setValue("title", foundBook.title);
      setValue("shortDescription", foundBook.shortDescription);
      setValue("isbn", foundBook.isbn);
      setValue("authorid", foundBook.authorid);
      setValue("category", foundBook.category);
      setValue("price", foundBook.price);
      setValue("pageCount", foundBook.pageCount);
      setValue("thumbnailUrl", foundBook.thumbnailUrl);
      setValue("publishedDate", foundBook.publishedDate ? foundBook.publishedDate.split("T")[0] : "");

      
      if (foundBook.thumbnailUrl) {
        setCoverPreview(foundBook.thumbnailUrl);
        setCoverFile(null);
      } 
    }
  }
}, [bookid, books, setValue]);
```

## 4) การจัดการการอัปโหลดรูปภาพปกหนังสือ

### วัตถุประสงค์
- เข้าใจการจัดการไฟล์อัปโหลด
- เข้าใจการสร้างภาพตัวอย่าง

### เนื้อหา
1. การจัดการเหตุการณ์เมื่อมีการเลือกไฟล์
2. การสร้างภาพตัวอย่างจากไฟล์ที่เลือก
3. การกำหนด URL สำหรับภาพปกหนังสือ

### กิจกรรม
- ให้ผู้เรียนเติมโค้ดส่วนการจัดการไฟล์อัปโหลดตามที่ระบุด้วย TODO 6

```typescript
// 📌 6) สร้างฟังก์ชันสำหรับจัดการการเลือกไฟล์สำหรับปกหนังสือ
const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setCoverFile(file);

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setValue("thumbnailUrl", `${import.meta.env.VITE_BASE_URL_API}/books/cover/${bookid}`);
  }
};
```

## 5) การจัดการการส่งฟอร์มและการบันทึกข้อมูล

### วัตถุประสงค์
- เข้าใจการส่งฟอร์มด้วย React Hook Form
- เข้าใจการจัดการการอัปโหลดไฟล์และการอัปเดตข้อมูล
- เข้าใจการจัดการสถานะการบันทึกข้อมูล

### เนื้อหา
1. การส่งฟอร์มและการจัดการการบันทึกข้อมูล
2. การอัปโหลดไฟล์ภาพปกหนังสือ
3. การอัปเดตข้อมูลหนังสือ
4. การจัดการสถานะความสำเร็จและข้อผิดพลาด

### กิจกรรม
- ให้ผู้เรียนเติมโค้ดส่วนการส่งฟอร์มตามที่ระบุด้วย TODO 7

```typescript
// 📌 7) สร้างฟังก์ชันสำหรับการส่งฟอร์มและบันทึกข้อมูล
const onSubmit: SubmitHandler<BookFormData> = async (data) => {
  if (!book) return;

  setIsSaving(true);
  setSaveError(null);
  setSaveSuccess(false);

  try {
    const bookId = book.bookid;
    
    // Upload the cover if a new one was selected
    if (coverFile) {
      await uploadBookCover(bookId, coverFile);
    }

    await updateBook(bookId, data);

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  } catch (err) {
    setSaveError("ไม่สามารถบันทึกข้อมูลหนังสือได้ กรุณาลองอีกครั้ง");
    console.error(err);
  } finally {
    setIsSaving(false);
  }
};
```

## 6) การจัดการการแสดงผลตามสถานะต่างๆ

### วัตถุประสงค์
- เข้าใจการจัดการการแสดงผลตามสถานะการโหลดข้อมูล
- เข้าใจการจัดการข้อผิดพลาด
- เข้าใจการจัดการกรณีไม่พบข้อมูล

### เนื้อหา
1. การแสดงผลระหว่างการโหลดข้อมูล
2. การแสดงข้อผิดพลาด
3. การแสดงกรณีไม่พบข้อมูลหนังสือ

### กิจกรรม
- ให้ผู้เรียนเติมโค้ดส่วนการจัดการการแสดงผลตามสถานะตามที่ระบุด้วย TODO 8-10

```typescript
// 📌 8) แสดงผลระหว่างการโหลดข้อมูล
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

// 📌 9) แสดงข้อผิดพลาดเมื่อมีปัญหาในการดึงข้อมูล
if (error) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );
}

// 📌 10) แสดงข้อความเมื่อไม่พบข้อมูลหนังสือ
if (!book) {
  return (
    <div
      className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Book not found!</strong>
      <span className="block sm:inline">
        {" "}
        The requested book could not be found.
      </span>
    </div>
  );
}
```

## Code เริ่มต้น (pages/admin/EditBook.tsx)
```typescript
import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBooks } from "../../services/BookService";
import Book from "../../types/Book";
import { authors } from "../../data/AuthorData";
import { categories } from "../../data/CategoryData";

type BookFormData = {
  title: string;
  shortDescription: string;
  isbn: string;
  authorid: number;
  category: string;
  price: number;
  pageCount: number;
  thumbnailUrl: string;
  publishedDate: string;
};

function EditBook() {
  // 📌 1) เรียกใช้ useParams เพื่อดึงค่า bookid จาก URL และ useNavigate สำหรับการนำทาง
  
  
  // 📌 2) เรียกใช้ custom hook useBooks เพื่อดึงข้อมูลและฟังก์ชันที่เกี่ยวข้องกับการจัดการหนังสือ
  
  
  // 📌 3) สร้าง state สำหรับการจัดการข้อมูลหนังสือและการอัปโหลดรูปภาพ
  
  
  // 📌 4) ใช้งาน useForm เพื่อจัดการฟอร์มแก้ไขข้อมูลหนังสือ
  
  
  // 📌 5) ใช้ useEffect เพื่อดึงข้อมูลหนังสือเมื่อ Component โหลดหรือข้อมูลหนังสือเปลี่ยนแปลง
  
  
  // 📌 6) สร้างฟังก์ชันสำหรับจัดการการเลือกไฟล์สำหรับปกหนังสือ
  
  
  // 📌 7) สร้างฟังก์ชันสำหรับการส่งฟอร์มและบันทึกข้อมูล
  
  
  // 📌 8) แสดงผลระหว่างการโหลดข้อมูล
  if (loading) {
    // Code
  }

  // 📌 9) แสดงข้อผิดพลาดเมื่อมีปัญหาในการดึงข้อมูล
  if (error) {
    // Code
  }

  // 📌 10) แสดงข้อความเมื่อไม่พบข้อมูลหนังสือ
  if (!book) {
    // Code
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">แก้ไขข้อมูลหนังสือ</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
        >
          <span className="inline-block mr-1">&#9664;</span> กลับหน้าจัดการข้อมูลหนังสือ
        </button>
      </div>

      {saveSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">บันทึกสำเร็จ!</strong>
          <span className="block sm:inline"> ข้อมูลการแก้ไขหนังสือได้ถูกบันทึกเรียบร้อยแล้ว</span>
        </div>
      )}

      {saveError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {saveError}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Cover */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-full h-full max-w-sm mb-4">
              <img
                src={coverPreview || "../images/placeholder.png"}
                alt="Book cover"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <label className="w-full max-w-sm">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                เปลี่ยนภาพปกหนังสือ
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
          </div>

          {/* Book Details */}
          <div className="col-span-1">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                ชื่อหนังสือ
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                id="title"
                type="text"
                {...register("title", { required: "กรุณาระบุชื่อหนังสือ" })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs italic">{errors.title.message}</p>
              )}
            </div>

            {/* ส่วนแสดงรายละเอียดหนังสือต่างๆ */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isbn"
              >
                ISBN
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.isbn ? 'border-red-500' : ''}`}
                id="isbn"
                type="text"
                {...register("isbn", { required: "กรุณาระบุ ISBN", maxLength: { value: 10, message: "ISBN ความยาวไม่เกิน 10 ตัวอักษร" } })}
              />
              {errors.isbn && (
                <p className="text-red-500 text-xs italic">{errors.isbn.message}</p>
              )}
            </div>
            
            
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  ราคา
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''}`}
                  id="price"
                  type="number"
                  min="1"
                  //step="0.01"
                  {...register("price", { 
                    required: "Price is required",
                    min: { value: 0, message: "กรุณาระบุราคา ราคาต่ำสุดต้องมากกว่า 0 บาท" },
                    valueAsNumber: true 
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs italic">{errors.price.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pageCount"
                >
                  จำนวนหน้า
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pageCount ? 'border-red-500' : ''}`}
                  id="pageCount"
                  type="number"
                  min="1"
                  {...register("pageCount", { 
                    required: "Page count is required",
                    min: { value: 1, message: "กรุณาระบุจำนวนหน้า จำนวนหน้าต้องมีอย่างน้อย 1 หน้า" },
                    valueAsNumber: true 
                  })}
                />
                {errors.pageCount && (
                  <p className="text-red-500 text-xs italic">{errors.pageCount.message}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="authorid"
              >
                ผู้แต่ง
              </label>
              <select
                id="authorid"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.authorid ? 'border-red-500' : ''}`}
                {...register("authorid", { 
                  required: "กรุณาเลือกผู้แต่ง",
                  min: { value: 1, message: "กรุณาเลือกผู้แต่ง" },
                  valueAsNumber: true 
                })}
              >
                <option value="0">เลือกผู้แต่ง</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {errors.authorid && (
                <p className="text-red-500 text-xs italic">{errors.authorid.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                หมวดหมู่
              </label>
              <select
                id="category"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}
                {...register("category", { required: "กรุณาเลือกหมวดหมู่" })}
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs italic">{errors.category.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="publishedDate"
              >
                วันที่ตีพิมพ์
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.publishedDate ? 'border-red-500' : ''}`}
                id="publishedDate"
                type="date"
                {...register("publishedDate", { required: "กรุณาระบุวันที่" })}
              />
              {errors.publishedDate && (
                <p className="text-red-500 text-xs italic">{errors.publishedDate.message}</p>
              )}
            </div>
            
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="mb-4 mt-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="shortDescription"
          >
            คำอธิบาย
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.shortDescription ? 'border-red-500' : ''}`}
            id="shortDescription"
            rows={4}
            {...register("shortDescription", { required: "กรุณาระบุคำอธิบาย" })}
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-xs italic">{errors.shortDescription.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => {
                fetchBooks();
            } } 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBook;
```


<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup>