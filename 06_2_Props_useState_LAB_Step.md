
# LAB: Props และ useState


## การเริ่มต้นโปรเจค
สร้างโปรเจคใหม่ React+TypeScript รองรับการใช้ Tailwind CSS และนำไฟล์ [06-react-props-usestate.zip](files/06-react-usestate-start.zip) มาแตกไฟล์ลงในโปรเจคเพื่อเริ่มต้นการทำ Lab


## การแบ่ง Component
```
App.tsx
├── Header.tsx
├── BookList.tsx
│   └── BookDetail.tsx
├── Cart.tsx
│   └── CartDetail.tsx
└── Footer.tsx
```

## การกำหนดโครงสร้างชนิดข้อมูล
```
types (folder)
├── Book.ts
│   └── CartItem.ts
```

CartItem สืบทอดจาก Book interface โดยเพิ่ม property quantity เพื่อเก็บจำนวนหนังสือในตะกร้า

**<ins>CartItem.ts</ins>** - TODO: 1)
```typescript
interface CartItem extends Book {
  quantity: number;
}
```

## การใช้งาน useState

### showCart state

- **วัตถุประสงค์**: ควบคุมการแสดง/ซ่อนตะกร้าสินค้า
- **การใช้งาน**: ส่งผ่าน Props ไปยัง Header และ Cart Component


สร้าง state สำหรับเก็บค่ากำหนดการแสดงส่วนของตระกร้าสินค้าหรือซ่อนการแสดง 

**<ins>App.tsx</ins>** - TODO: 1)
```typescript
const [showCart, setShowCart] = useState<boolean>(true);
```


### cartItems state
- **วัตถุประสงค์**: เก็บข้อมูลหนังสือในตะกร้า


สร้าง state สำหรับเก็บข้อมูลหนังสือในตะกร้า 

**<ins>App.tsx</ins>** - TODO: 2)

```typescript
const [cartItems, setCartItems] = useState<CartItem[]>([]);
```


## การส่งผ่าน Props

### แนวคิดการส่ง Props
- ส่งเฉพาะข้อมูลที่ Component นั้นๆ ต้องใช้
- ส่งฟังก์ชันจัดการ state ไปยัง Component ที่ต้องแก้ไขข้อมูล
- ใช้ TypeScript interface กำหนด type ของ Props

### การส่ง Props จาก Parent สู่ Child


#### แสดงข้อมูลหนังสือและเพิ่มหนังสือลงตระกร้า  (App → BookList → BookDetail)

ขั้นตอนการแสดงข้อมูลหนังสือและเพิ่มหนังสือลงตะกร้าจะมีการไหลของข้อมูล (Data Flow) จาก App ส่ง Props ไปยัง BookList และจาก BookList ส่ง Props ไปยัง BookDetail โดยมีรายละเอียดของการเพิ่มหนังสือลงตระกร้าดังนี้

**การเพิ่มสินค้าลงตะกร้า**
1. ผู้ใช้คลิกปุ่ม "เพิ่มลงตะกร้า" ใน BookDetail
2. เรียกใช้ addToCart ที่รับมาจาก Props
3. App.tsx อัพเดท cartItems state
4. React render Component ที่เกี่ยวข้องใหม่

**LAB:**

1) ใน App.tsx สร้างฟังก์ชัน addToCart เพื่อใช้ในการเพิ่มหนังสือลงในตะกร้า

    **<ins>App.tsx</ins>** - TODO: 3)

    ```typescript
    const addToCart = (book:Book) => {
      const existingItem = cartItems.find(item => item.id === book.id);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...book, quantity: 1 }]);
      }
    };
    ```

2) ใน App.tsx ส่ง props เพื่อแสดงรายการหนังสือไปยัง BookList.tsx ดังนี้ 
    * books ข้อมูลของหนังสือทั้งหมด 
    * addToCart เป็นฟังก์ชันที่ใช้ในการเพิ่มหนังสือลงในตะกร้า 
    **<ins>App.tsx</ins>** - TODO: 9)

    ```typescript       
    <BookList books={books} addToCart={addToCart} />
    ```

3) ใน BookList.tsx รับข้อมูลที่ส่งมาจาก App.tsx โดยสร้าง interface ชื่อ BookListProps สำหรับรับ props

    **<ins>BookList.tsx</ins>** - TODO: 1)
    ```typescript    
    interface BookListProps {
      books: Book[];
      addToCart: (book: Book) => (void);
    }
    ```

4) ใน BookList.tsx ส่งค่า Props ผ่านไปยัง function BookList  

    **<ins>BookList.tsx</ins>** - TODO: 2)
    ```typescript    
    function BookList( {books,addToCart}:BookListProps  )
    ```

5) ใน BookList.tsx อ่านข้อมูลใน books เพื่อนำข้อมูลหนังสือแต่ละเล่มมาแสดงใน BookDetail ผ่านคำสั่ง map 

    **<ins>BookList.tsx</ins>** - TODO: 3)
    ```typescript    
    {books.map(book => (
      <BookDetail key={book.id} book={book} addToCart={addToCart} />
    ))}
    ```

6) ใน BookDetail.tsx สร้าง type หรือ interface ชื่อ BookDetailProps สำหรับรับ props ที่จำเป็นสำหรับการแสดงข้อมูลของหนังสือในตะกร้า

    **<ins>BookDetail.tsx</ins>** - TODO: 1)
    ```typescript
    interface BookDetailProps {
      book: Book;
      addToCart: (book: Book) => void;
    }
    ```

7) ใน BookDetail.tsx ส่งค่า Props ผ่านไปยัง function BookDetail

    **<ins>BookDetail.tsx</ins>** - TODO: 2)
    ```typescript
    function BookDetail({ book,addToCart }: BookDetailProps)
    ```

8) ใน BookDetail.tsx สร้างปุ่ม "เพิ่มลงตะกร้า" และเพิ่มเหตุการณ์ onClick เพื่อเรียกใช้ฟังก์ชัน addToCart ที่รับมาจาก Props

    **<ins>BookDetail.tsx</ins>** - TODO: 10)
    ```typescript
    <button 
      onClick={() => addToCart(book)}
      className="w-full font-semibold flex items-center justify-center gap-2 bg-blue-500 hover:text-red-600 hover:bg-sky-300 text-white rounded-md py-3 mt-4"
    >
      <ShoppingBasket size={20} />
      เพิ่มลงตะกร้า
    </button>
    ```

9) ใน BookDetail.tsx แสดงข้อมูลของหนังสือที่รับมาจาก Props

    **<ins>BookDetail.tsx</ins>** - TODO: 3) ถึง TODO: 9) ใช้โค้ดเหมือนเอกสารก่อนหน้า

10) ทดสอบการทำงานโดยให้คลิกปุ่ม "เพิ่มลงตะกร้า" และตรวจสอบว่าข้อมูลถูกเพิ่มลงในตะกร้าหรือไม่ การตรวจสอบสามารถทำได้โดยการแสดงข้อมูล cartItems โดยใช้ React Developer Tools ใน Browser ได้

#### แสดงข้อมูลตระกร้าสินค้าและการปรับจำนวนหนังสือในตระกร้า (App → Cart → CartDetail)

ขั้นตอนการแสดงข้อมูลตระกร้าสินค้าและปรับจำนวนสินค้าในตะกร้าจะมีการไหลของข้อมูล (Data Flow) จาก App ส่ง Props ไปยัง Cart และจาก Cart ส่ง Props ไปยัง CartDetail โดยมีรายละเอียดการปรับจำนวนหนังสือในตระกร้าดังนี้

**การปรับจำนวนหนังสือในตระกร้า**
1. ผู้ใช้คลิกปุ่ม +/- ใน CartDetail
2. เรียกใช้ updateQuantity ที่รับมาจาก Props
3. App.tsx อัพเดท cartItems state

**LAB:**

1) ใน App.tsx สร้างฟังก์ชัน updateQuantity เพื่อใช้ในการเปลี่ยนจำนวนหนังสือในตะกร้า

    **<ins>App.tsx</ins>** - TODO: 4)
    ```typescript
    const updateQuantity = (id:number, change:number) => {
      setCartItems(cartItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity >= 1
            ? { ...item, quantity: newQuantity }
            : item;
        }
        return item;
      }));
    };
    ```


3) สร้างตัวแปร totalPrice เพื่อเก็บผลการคำนวณราคารวมของหนังสือทั้งหมดในตะกร้า

    **<ins>App.tsx</ins>** - TODO: 6)
    ```typescript
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    ```

4) ใน App.tsx ส่ง props ไปยัง Cart เพื่อแสดงรายการในตะกร้าสินค้า ดังนี้
    * cartItems ข้อมูลของหนังสือในตะกร้า
    * updateQuantity เป็นฟังก์ชันที่ใช้ในการเปลี่ยนจำนวนหนังสือในตะกร้า
    * totalPrice แสดงมูลค่ารวมของหนังสือในตระกร้า

    **<ins>App.tsx</ins>** - TODO: 8)
    ```typescript
    <Cart cartItems={cartItems} updateQuantity={updateQuantity} totalPrice={totalPrice} />
    ```

5) ใน Cart.tsx รับข้อมูลที่ส่งมาจาก App.tsx โดยสร้าง interface ชื่อ CartProps สำหรับรับ props

    **<ins>Cart.tsx</ins>** - TODO: 1)

    ```typescript
    interface CartProps {
      cartItems: CartItem[];
      updateQuantity: (bookId: number, change: number) => void;
      totalPrice: number;
    }
    ```

6) ใน Cart.tsx ส่งค่า Props ผ่านไปยัง function Cart

    **<ins>Cart.tsx</ins>** - TODO: 2)

    ```typescript
    function Cart({ cartItems, updateQuantity, totalPrice }: CartProps)
    ```


7) ใน Cart.tsx สร้าง component function เพื่อ return การแสดงผลเมื่อตระกร้าสินค้าว่าง

    **<ins>Cart.tsx</ins>** - TODO: 3)

    ```typescript
    function EmptyCart() {
      return <div className="flex flex-col items-center text-center justify-center">
        <img src="/images/emptycart.png" width={200} alt="Empty Cart" className="mx-auto mb-4" />
        <p className="text-red-500 text-2xl font-semibold">ไม่มีสินค้าในตะกร้า</p>
      </div>;
    }
    ```

8) ใน Cart.tsx สร้าง component function เพื่อ return การแสดงผลเมื่อมีหนังสือในตระกร้าสินค้าและรับข้อมูลเพื่อส่งไปยัง CartDetail.tsx ดังนี้
    * cartItem ข้อมูลของหนังสือในตะกร้าทั้งหมด
    * updateQuantity เป็นฟังก์ชันที่ใช้ในการเปลี่ยนจำนวนหนังสือในตะกร้า

    **<ins>Cart.tsx</ins>** - TODO: 4)

    ```typescript
    function BooksInCart(cartItems: CartItem[], updateQuantity: (bookId: number, change: number) => void,  totalPrice: number) {
      return <>
        {/* TODO: 5) อ่านข้อมูลใน cartItems เพื่อนำข้อมูลหนังสือแต่ละเล่มในตระกร้ามาแสดงใน CartDetail ผ่านคำสั่ง map */}
        
        <div className="mt-4 text-right">
          <p className="text-lg font-bold">
            {/* TODO: 6) แสดงมูลค่ารวมของหนังสือในตระกร้า */}
            รวมทั้งหมด: {new Intl.NumberFormat('en-US').format(totalPrice)} บาท
          </p>
        </div>
      </>;
    }
    ```
9) ใน Cart.tsx อ่านข้อมูลใน cartItems เพื่อนำข้อมูลหนังสือแต่ละเล่มในตระกร้ามาแสดงใน CartDetail ผ่านคำสั่ง map

    **<ins>Cart.tsx</ins>** - TODO: 5)

    ```typescript
    {cartItems.map((item) => (
      <CartDetail
        key={item.id}
        cartItem={item}
        updateQuantity={updateQuantity} />
    ))}
    ```


10) ใน Cart.tsx เรียก function component เพื่อแสดงผลตามเงื่อนไขดังนี้
    * แสดงจากฟังก์ชัน EmptyCart เมื่อไม่มีหนังสือในตระกร้าสินค้า (cartItems มีขนาดเป็น 0) 
    * แสดงจากฟังก์ชัน BooksInCart เมื่อมีหนังสืออย่างน้อย 1 เล่มในตระกร้า (cartItems มีขนาดมากกว่า 0)

    **<ins>Cart.tsx</ins>** - TODO: 7)

    ```typescript
    {cartItems.length === 0 ?  EmptyCart() : BooksInCart(cartItems, updateQuantity, totalPrice)}
    ```

11) ใน Cart.tsx แสดงมูลค่ารวมของหนังสือในตระกร้า

    **<ins>Cart.tsx</ins>** - TODO: 6)

    ```typescript
    รวมทั้งหมด: {new Intl.NumberFormat('en-US').format(totalPrice)} บาท
    ```

12) ใน CartDetail.tsx รับข้อมูลที่ส่งมาจาก Cart.tsx โดยสร้าง interface ชื่อ CartDetailProps สำหรับรับ props ที่จำเป็นสำหรับการแสดงข้อมูลของหนังสือในตะกร้า

    **<ins>CartDetail.tsx</ins>** - TODO: 1)

    ```typescript
    type CartDetailProps={
        cartItem: CartItem;
        updateQuantity: (bookId:number,change:number) => void;
    }
    ```

13) ใน CartDetail.tsx ส่งค่า Props ผ่านไปยัง function CartDetail

    **<ins>CartDetail.tsx</ins>** - TODO: 2)

    ```typescript
    function CartDetail({ cartItem, updateQuantity }: CartDetailProps)
    ```

14) ใน CartDetail.tsx สร้างปุ่ม "+" เพื่อเพิ่มจำนวนหนังสือในตะกร้า และเพิ่มเหตุการณ์ onClick เพื่อเรียกใช้ฟังก์ชัน updateQuantity ที่รับมาจาก Props

    **<ins>CartDetail.tsx</ins>** - TODO: 6)

    ```typescript
    <button
      className="w-8 h-8 ms-6 border-orange-600 bg-white border-2 text-orange-600 rounded-lg  flex items-center justify-center "
      onClick={() => updateQuantity(cartItem.id, -1)}
    >
      <Minus size={20} />
    </button>
    ```

15) ใน CartDetail.tsx สร้างปุ่ม "-" เพื่อลดจำนวนหนังสือในตะกร้า และเพิ่มเหตุการณ์ onClick เพื่อเรียกใช้ฟังก์ชัน updateQuantity ที่รับมาจาก Props

    **<ins>CartDetail.tsx</ins>** - TODO: 8)

    ```typescript
     <button
      className="w-8 h-8  border-green-600 bg-white border-2 text-green-600 rounded-lg  flex items-center justify-center "
      onClick={() => updateQuantity(cartItem.id, 1)}
    >
      <Plus size={20} />
    </button>
    ```


16) ใน CartDetail.tsx แสดงข้อมูลของหนังสือในตระกร้าที่รับมาจาก Props

    **<ins>CartDetail.tsx</ins>** - TODO: 3) 4) 5) และ 7) ใช้โค้ดเหมือนเอกสารก่อนหน้า

17) ทดสอบการทำงานโดยให้คลิกปุ่ม "+" และ "-" ว่าจำนวนสินค้าเปลี่ยนแปลงตามที่คาดหวังหรือไม่ การตรวจสอบสามารถทำได้โดยการแสดงข้อมูล cartItems โดยใช้ React Developer Tools ใน Browser ได้



## Exercises

### 1) สร้างฟังก์ชัน removeFromCart เพื่อใช้ในการลบหนังสือออกจากตะกร้า

- สร้างฟังก์ชัน removeFromCart ที่ใช้ในการลบหนังสือออกจากตะกร้า โดยรับ id ของหนังสือ (id)
    
  **<ins>App.tsx</ins>** - TODO: 5)

- เพิ่มการส่ง props ไปยัง Cart เพื่อใช้ในการลบหนังสือออกจากตะกร้า (removeFromCart)

  **<ins>App.tsx</ins>** - TODO: 8)

- เพิ่ม removeFromCart ใน CartProps 

  **<ins>Cart.tsx</ins>** - TODO: 1)

- เพิ่ม removeFromCart ในพารามิเตอร์ของฟังก์ชัน Cart

  **<ins>Cart.tsx</ins>** - TODO: 2)

- เพิ่ม removeFromCart ในพารามิเตอร์ของฟังก์ชัน BooksInCart

  **<ins>Cart.tsx</ins>** - TODO: 4)

- เพิ่มการส่ง removeFromCart ไปยัง CartDetail

  **<ins>Cart.tsx</ins>** - TODO: 5)

- เพิ่ม removeFromCart ใน CartDetailProps 

  **<ins>CartDetail.tsx</ins>** - TODO: 1)

- เพิ่ม removeFromCart ในพารามิเตอร์ของฟังก์ชัน CartDetail

  **<ins>CartDetail.tsx</ins>** - TODO: 2)

- สร้างปุ่ม "ลบ" เพื่อลบหนังสือออกจากตะกร้า และเพิ่มเหตุการณ์ onClick เพื่อเรียกใช้ฟังก์ชัน removeFromCart ที่รับมาจาก Props

  **<ins>CartDetail.tsx</ins>** - TODO: 9)


    
### 2) ให้ปุ่มตระกร้าสินค้าใน Header สามารถแสดง/ซ่อนตะกร้าสินค้าได้ โดยใช้ค่าของ showCart และ setShowCart ที่ได้จาก useState 

- กำหนดค่าเริ่มต้นให้กับ showCart ใน useState เป็น false

  **<ins>App.tsx</ins>** - TODO: 1)

- ส่ง props ไปยัง Header โดยส่งค่าของ setShowCart และ showCart ไปด้วย

  **<ins>App.tsx</ins>** - TODO: 7)

- เพิ่ม showCart และ setShowCart ในพารามิเตอร์ของ Header

  **<ins>Header.tsx</ins>** - TODO: 1)

- เพิ่ม event ให้กับปุ่ม โดยเมื่อคลิกปุ่มจะเปลี่ยนค่าของ showCart โดยใช้ฟังก์ชัน setShowCart

  **<ins>Header.tsx</ins>** - TODO: 2)

- แสดงตะกร้าสินค้า หรือซ่อนตามค่าของ showCart ใน App.tsx

  **<ins>App.tsx</ins>** - TODO: 8)


<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup> 