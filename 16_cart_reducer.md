# ตัวอย่างการสร้างส่วนตระกร้าสินค้าโดยใช้ useReducer ร่วมกับ useContext ใน React

## 1. ความรู้พื้นฐานเกี่ยวกับ useReducer และ useContext

### useReducer คืออะไร?
`useReducer` เป็น React Hook ที่ใช้สำหรับจัดการ state ที่ซับซ้อนในแอปพลิเคชัน โดยทำงานคล้ายกับ Redux แต่เป็นส่วนหนึ่งของ React โดยตรง

**การทำงานหลักของ useReducer:**
- รับ reducer function และ initial state เป็น parameter
- คืนค่า state ปัจจุบันและ dispatch function สำหรับส่ง action

**ตัวอย่างพื้นฐานของ useReducer:**
```jsx
const [state, dispatch] = useReducer(reducer, initialState);

// การเรียกใช้ dispatch
dispatch({ type: 'ACTION_TYPE', payload: data });
```

### useContext คืออะไร?
`useContext` เป็น React Hook ที่ใช้สำหรับการแชร์ข้อมูลระหว่าง component โดยไม่ต้องส่งผ่าน props หลายระดับ (prop drilling)

**การทำงานหลักของ useContext:**
- สร้าง context ด้วย `createContext`
- ห่อหุ้ม component ด้วย Provider เพื่อกำหนดค่า
- ใช้ `useContext` เพื่อเข้าถึงค่าใน component ลูก

**ตัวอย่างพื้นฐานของ useContext:**
```jsx
// สร้าง context
const MyContext = createContext();

// Provider component
function ParentComponent() {
  return (
    <MyContext.Provider value={someValue}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

// การใช้งานใน component ลูก
function ChildComponent() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}
```

## 2. การ Implement ตระกร้าสินค้าด้วย useReducer และ useContext

ใช้โปรเจ็คเริ่มต้นจาก LAB ก่อนนี้ โดยปรับเปลี่ยนและเพิ่มไฟล์บางส่วนจากไฟล์ [16_cart_start_files.zip](files/16_cart_start_files.zip) (แตก zip และนำไปทับไฟล์ในโปรเจ็คเดิม)

### ขั้นตอนที่ 1: สร้าง Context และ Provider เริ่มต้น
สร้างไฟล์ใหม่ /context/CartContext.tsx และกำหนดค่าเริ่มต้น

```typescript
import { createContext, ReactNode, useState } from "react";
import CartItem from "../types/CartItem";


// กำหนด interface สำหรับสถานะของตระกร้า
interface CartState {
  items: CartItem[];  // รายการสินค้าในตระกร้า
  total: number;      // ราคารวมทั้งหมด
}

// กำหนดค่าเริ่มต้นของตระกร้า
const initialState: CartState = {
  items: [],  // เริ่มต้นด้วยตระกร้าว่าง
  total: 0    // ราคารวมเป็น 0
};

// -- สร้าง Reducer
// กำหนด action types ที่สามารถทำกับตระกร้าได้
// Code


// กำหนด cartReducer
// Code

// สร้าง context
interface CartContextType {
  state: CartState; //แก้ไขเป็น state ในภายหลัง
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// กำหนด props สำหรับ Provider
interface CartProviderProps {
  children: ReactNode;
}

// สร้าง Provider component
export function CartProvider({ children }: CartProviderProps) {

  const [state] = useState(initialState);
 


  // ส่งค่าและ function ผ่าน Provider
  return (
    <CartContext.Provider
      value={{
        state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// สร้าง custom hook เพื่อใช้งาน context ได้ง่าย
//Code
```


### ขั้นตอนที่ 2: การเรียกใช้ Context ใน App

โดยนำ Tag <CartProvider></CartProvider> ครอบกับ Tag ที่เป็น Routes ใน App.tsx ดังตัวอย่างข้างล่าง

```tsx
// ใน App.tsx 
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}
```

### ขั้นตอนที่ 3: สร้างส่วนเพิ่มหนังสือในตะกร้า

#### เริ่มต้นด้วยการกำหนด type ที่สามารถทำกับตระกร้าได้ 

โดยเพิ่มในไฟล์ context/CartContext.tsx

```typescript
// กำหนด action types ที่สามารถทำกับตระกร้าได้
type CartAction = 
  | { type: 'ADD_TO_CART'; payload: Book }  // เพิ่มสินค้าในตระกร้า
```


#### สร้าง Reducer Function ของการเพิ่มหนังสือในตะกร้า

โดยเพิ่มในไฟล์ context/CartContext.tsx

```typescript
// สร้าง reducer function เพื่อจัดการการเปลี่ยนแปลงของ state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {

    // เพิ่มหนังสือในตะกร้า
    case 'ADD_TO_CART': {
      // ค้นหาว่าสินค้านี้มีในตะกร้าอยู่แล้วหรือไม่
      const existingItemIndex = state.items.findIndex(
        item => item.bookid === action.payload.bookid
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // ถ้ามีอยู่แล้ว เพิ่มจำนวน
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
      } else {
        // ถ้ายังไม่มี เพิ่มรายการใหม่ด้วยจำนวน 1
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // คำนวณราคารวมใหม่
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );

      return {
        items: updatedItems,
        total
      };
    }
    
    // ส่วนของ action type อื่นๆ...



    default:
      return state;  // กรณีไม่มี action ที่ตรงกัน ให้คืนค่า state เดิม
      
  }
};
```


#### ปรับปรุง Context และ Provider เพื่อเพิ่มส่วนการเรียกใช้ฟังค์ชันการเพิ่มหนังสือในตระกร้า

ปรับปรุง interface CartContextType เพื่อเพิ่มฟังชันค์ addToCart
ในไฟล์ context/CartContext.tsx

```typescript
// กำหนดโครงสร้างของ context
interface CartContextType {
  state: CartState;                                // สถานะของตระกร้า
  addToCart: (book: Book) => void;                 // function เพิ่มสินค้า
}
```

เปลี่ยนจากการใช้ useState 
```typescript
const [state] = useState(initialState);
```
เป็น การใช้ผ่าน Reducer ดังนี้
```typescript
// สร้าง Provider component
export function CartProvider({ children }: CartProviderProps) {
  // ใช้ useReducer โดยส่ง reducer function และค่าเริ่มต้น
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // สร้าง function สำหรับเรียกใช้ action ต่างๆ
  const addToCart = (book: Book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  // ... Code เดิม

  // ส่งค่าและ function ผ่าน Provider
  return (
    <CartContext.Provider
      value={{
        state,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
```

####  สร้าง Custom Hook เพื่อใช้งาน Context
เพิ่มในไฟล์ context/CartContext.tsx
```typescript
// สร้าง custom hook เพื่อใช้งาน context ได้ง่าย
export const useCart = () => {
  const context = useContext(CartContext);
  
  // ตรวจสอบว่ามีการใช้ hook นอก Provider หรือไม่
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
```

#### เรียกใช้ useCart เพื่อเรียกฟังค์ชันการเพิ่มตระกร้าสินค้าจาก BookDetail.tsx

เพื่อเพิ่มส่วนการเรียกใช้ฟังค์ชันการเพิ่มหนังสือในตระกร้า


```tsx
// ใน component ที่ต้องการใช้งานตระกร้าสินค้า
import { useCart } from '../../context/CartContext';


function BookDetail({ book }: { book: Book }) {

  // เรียกใช้ useCart hook เพื่อเข้าถึง context
  const { addToCart } = useCart();

  return (
    <div>
      
      ...

      <button 
        onClick={() => addToCart(book)}
      >
        <ShoppingBasket size={20} />
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}
```

ทดสอบเพิ่มหนังสือลงตระกร้า และตรวจสอบค่าผ่านหน้าต่าง Components ส่วน CartProvider ดูค่าใน hook>Reducer>items

#### แสดงจำนวนหนังสือที่เพิ่มใน Header

ในไฟล์ componets/cart/CartButton.tsx เพิ่มและปรับปรุงส่วนต่อไปนี้

```tsx
import { useCart } from "../../context/CartContext";

const { state } = useCart();
const { items } = state;
```

จากที่แสดงจำนวนเป็น 9 ให้แก้ไขเป็น
```tsx
 {items.length}
```

#### แสดงข้อมูลในตระกร้าสินค้า

ในไฟล์ componets/cart/Cart.tsx เพิ่มและปรับปรุงส่วนต่อไปนี้

นำส่วนต่อไปนี้ออก
```tsx
// -- Remove --
const items: CartItem[] = [];
const total=0;
// -- Remove ---
```
ปรับปรุงส่วนต่อไปนี้
```tsx
import { useCart } from "../../context/CartContext";

const { state } = useCart();
const { items, total } = state;
```

### ขั้นตอนที่ 4: เพิ่มส่วนลบหนังสือจากตระกร้า


#### เพิ่ม type สำหรับการลบหนังสือในตระกร้า

ปรับปรุงเพิ่ม type สำหรับการลบหนังสือในตระกร้า โดยเพิ่มในไฟล์ context/CartContext.tsx

```typescript
// กำหนด action types ที่สามารถทำกับตระกร้าได้
type CartAction = 
  ...
  | { type: 'REMOVE_FROM_CART'; payload: number }   
```

#### เพิ่ม case ให้กับ Reducer Function เพื่อลบหนังสือในตะกร้า
```typescript
case 'REMOVE_FROM_CART': {
  // กรองเอาสินค้าที่ต้องการลบออก
  const updatedItems = state.items.filter(
    item => item.bookid !== action.payload
  );
  
  // คำนวณราคารวมใหม่
  const total = updatedItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return {
    items: updatedItems,
    total
  };
}
```

#### ปรับปรุง Context และ Provider เพื่อเพิ่มส่วนการเรียกใช้ฟังค์ชันการลบหนังสือในตระกร้า

ปรับปรุง interface CartContextType เพื่อเพิ่มฟังชันค์ removeFromCart
ในไฟล์ context/CartContext.tsx

```tsx
// กำหนดโครงสร้างของ context
interface CartContextType {
  ...
  removeFromCart: (bookid: number) => void; 
}
```

ปรับปรุงการใช้ผ่าน Reducer เพื่อเพิ่มการลบหนังสือในตระกร้าดังนี้

```tsx
// สร้าง Provider component
export function CartProvider({ children }: CartProviderProps) {
  
  ...

  const removeFromCart = (bookid: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: bookid });
  };


  // ส่งค่าและ function ผ่าน Provider
  return (
    <CartContext.Provider
      value={{
        ...
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
```

#### ปรับปรุงการแสดงข้อมูลในตระกร้าสินค้า เพื่อรียกใช้ปุ่ม "ลบสินค้า"
ในไฟล์ componets/cart/CartDetail.tsx เพิ่มและปรับปรุงส่วนต่อไปนี้


```jsx
import { useCart } from "../../context/CartContext";

function CartDetail({
  cartItem,
}: CartDetailProps) {
  const { removeFromCart } = useCart();
  return (
      <div>
        ...
            <button
              onClick={() => removeFromCart(cartItem.bookid)}
              title="ลบสินค้า"
            >
              <Trash2 size={20}/>
            </button>
          
        ...
      </div>
  );
}
```


### ขั้นตอนที่ 5: เพิ่มส่วนล้างตระกร้า

#### เพิ่ม type สำหรับล้างตระกร้า

ปรับปรุงเพิ่ม type สำหรับการล้างตระกร้า โดยเพิ่มในไฟล์ context/CartContext.tsx

```typescript
// กำหนด action types ที่สามารถทำกับตระกร้าได้
type CartAction = 
  ...
  | { type: 'CLEAR_CART' };    
```

#### เพิ่ม case ให้กับ Reducer Function เพื่อล้างหนังสือตระกร้า
```typescript
case 'CLEAR_CART':
  return initialState;  // กลับไปที่สถานะเริ่มต้น (ตระกร้าว่าง)
```

#### ปรับปรุง Context และ Provider เพื่อเพิ่มส่วนการเรียกใช้ฟังค์ชันล้างหนังสือในตระกร้า

ปรับปรุง interface CartContextType เพื่อเพิ่มฟังชันค์ clearCart
ในไฟล์ context/CartContext.tsx

```tsx
// กำหนดโครงสร้างของ context
interface CartContextType {
  ...
  clearCart: () => void;
}
```

ปรับปรุงการใช้ผ่าน Reducer เพื่อเพิ่มกาล้างหนังสือในตระกร้าดังนี้

```tsx
// สร้าง Provider component
export function CartProvider({ children }: CartProviderProps) {
  
  ...

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


  // ส่งค่าและ function ผ่าน Provider
  return (
    <CartContext.Provider
      value={{
        ...
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
```

#### ปรับปรุงการแสดงข้อมูลในตระกร้าสินค้า เพื่อเรียกใช้ปุ่ม "ล้างตะกร้าลินค้า"

ในไฟล์ componets/cart/Cart.tsx เพิ่มและปรับปรุงส่วนต่อไปนี้

```jsx
function Cart({ setShowCart }: { setShowCart: (show: boolean) => void }) {
  const { state, clearCart } = useCart();
...
}


function BooksInCart(items: CartItem[], total: number, clearCart: () => void) {
  return (
    <>
      ...
      <button
        onClick={clearCart} 
      >
        <CopyX />
        <span>ล้างตะกร้าลินค้า</span>
      </button>
       ...
    </>
  );
}
```



### ขั้นตอนที่ 6: การเก็บข้อมูลตระกร้าไว้หลังจากรีเฟรชหน้า

หากต้องการให้ข้อมูลตระกร้ายังคงอยู่แม้หลังจากรีเฟรชหน้า เราสามารถใช้ `localStorage` เพื่อเก็บข้อมูล:

#### การปรับปรุง CartProvider

```tsx
export function CartProvider({ children }: CartProviderProps) {
  // โหลดข้อมูลจาก localStorage (ถ้ามี)
  const loadInitialState = (): CartState => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  // บันทึกข้อมูลลง localStorage ทุกครั้งที่ state เปลี่ยน
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // ฟังก์ชันต่างๆ ยังคงเหมือนเดิม...
}
```


## การบ้าน 

ให้เพิ่มส่วนการปรับปรุงข้อมูล เมื่อกดปุ่มเพิ่มหรือลดจำนวนหนังสือให้มีการปรับปรุงข้อมูลได้ โดยกำหนด type สำหรับการปรับปรุงข้อมูลดังนี้

```tsx
{ type: 'UPDATE_QUANTITY'; payload: { bookid: number; quantity: number } } 
```

