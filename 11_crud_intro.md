# ตัวอย่าง ComSci Book Shop (CRUD)

โดยมีไฟล์สำหรับเริ่มต้นโปรเจ็คในไฟล์ [11_bookshop_start_files](files/11_bookshop_start_files.zip)


## 1) รัน Script สำหรับข้อมูล Database
โดย Script จะอยู่ในไฟล์ 00_BookShopDBScript.sql ก่อนจะรันหากมี database ของ bookshopdb อยู่แล้วต้องทำการ drop ของเก่าก่อน

## 2) โปรเจ็ค API
จะให้โปรเจ็คมาใน directory ชื่อ **01_node_bookshop_api** สามารถรันโปรเจ็ค โดยใช้คำสั่ง npm run dev ได้เลย 

ก่อนรันให้แก้ไขไฟล์ .env ต่อไปนี้ให้ตรงกับข้อมูลในเครื่องที่ทำงาน

```
MYSQL_USER="<<user_name>>"
MYSQL_PASSWORD="<<password>>"
MYSQL_DATABASE="<<database_name>>"
```

 API ในส่วนนี้จะถูกเรียกใช้จากโปรเจ็ค React ในหัวข้อถัดไป อยู่ในไฟล์หลักของโปรเจ็ค React คือ BookService.ts ซึ่งรายละเอียดเกี่ยวกับการติดต่อ API อยู่ในเอกสาร อธิบายการทำงานของ [BookService.ts ในการติดต่อกับ API](15_book_service.md)

## 3) โปรเจ็ค React
จะให้โปรเจ็คมาใน directory ชื่อ **02_react_crud** สามารถรันโปรเจ็ค โดยใช้คำสั่ง npm run dev ได้เลย 

ก่อนรันให้แก้ไขไฟล์ .env ส่วนระบุ url ของ API ให้ถูกต้อง
```
VITE_BASE_URL_API=http://localhost:3000/api/v2
```

ตัวอย่างนี้เน้นแสดงการเพิ่มลบแก้ไขข้อมูลหนังสือของร้านหนังสือ ComSci Book Shop โดยแบ่งเป็น 3 ส่วน ดังนี้
- [Part 1 หน้าการจัดการข้อมูลหนังสือ](12_crud_part_1.md)
- [Part 2 หน้าการเพิ่มหนังสือใหม่](13_crud_part_2.md)
- [Part 3 หน้าแก้ไขข้อมูลหนังสือ](14_crud_part_3.md)

ในแต่ละส่วนจะต้องทำการปรับปรุงไฟล์ App.tsx เส้นทางการเรียกหน้าเพจใหม่ที่สร้างขึ้นของ Admin ประกอบด้วย หน้าจัดการข้อมูล หน้าเพิ่มข้อมูล และหน้าแก้ไขข้อมูล ตามลำดับ 

```
{/* Admin Page */}
<Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute> }>
    ...
    <Route path="/admin/book" element={<ManageBook />} />
    <Route path="/admin/addbook" element={<AddBook />} />
    <Route path="/admin/editbook/:bookid" element={<EditBook />} />
    ...
</Route>
```