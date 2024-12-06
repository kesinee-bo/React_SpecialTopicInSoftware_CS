# React Component (อยู่ระหว่างการจัดทำและปรับปรุงเนื้อหา)

## React Component คืออะไร?
React Component คือการแบ่งส่วนของ UI ให้เป็นส่วนย่อยๆ ที่สามารถนำมาใช้ซ้ำได้ และสามารถรับข้อมูลเข้ามาและแสดงผลออกมาได้ โดย React Component สามารถเป็น Function Component หรือ Class Component ซึ่งสามารถใช้งานได้ทั้งสองแบบ ใน Component จะรวมทั้ง HTML JavaScript และ CSS ด้วยกัน ทำให้การเขียนโค้ดของเรามีความยืดหยุ่นมากขึ้น 



## การสร้าง React Component

การสร้าง React Component สามารถทำได้โดยการสร้างไฟล์ใหม่ และเขียนโค้ดของ Component ลงไป หรือสร้าง Component ในไฟล์เดียวกันกับ Component อื่นๆ โดยการเขียนโค้ดของ Component ลงไปในฟังก์ชันหรือคลาส ตัวอย่างการสร้าง Function Component และ Class Component แสดงดังต่อไปนี้

```jsx
// Function Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
``` 

การตั้งชื่อ Component Function ควรเป็นไปตามหลักการต่อไปนี้
- ชื่อของ Component ควรเป็นคำเดียว และเริ่มต้นด้วยตัวพิมพ์ใหญ่
- หากชื่อของ Component มีมากกว่าหนึ่งคำ ควรใช้ PascalCase ในการตั้งชื่อ เช่น MyHeader
- ฟังค์ชันต้องส่งคืนค่าที่สามารถแสดงผลได้ (Renderable) ได้ เช่น String, Number, Element หรือ Array และ Object ที่ประกอบด้วยค่าที่แสดงผลได้

## การใช้งาน React Component
การใช้งาน React Component สามารถทำได้โดยการเรียกใช้ Component นั้นๆ ใน Component อื่นๆ โดยการเขียนชื่อของ Component ลงไปใน JSX ตัวอย่างการใช้งาน Component แสดงดังต่อไปนี้

```jsx
// Function Component
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

// Class Component
class App extends
React.Component {
  render() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }
}
```

## การส่งข้อมูลเข้าไปใน React Component
การส่งข้อมูลเข้าไปใน React Component สามารถทำได้โดยการส่งข้อมูลผ่าน Props ซึ่งเป็น Object ที่มีข้อมูลที่ต้องการส่งเข้าไปใน Component ตัวอย่างการส่งข้อมูลเข้าไปใน Component แสดงดังต่อไปนี้

```jsx
// Function Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// การใช้งาน Component
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

## การใช้งาน State ใน React Component
การใช้งาน State ใน React Component สามารถทำได้โดยการใช้ useState Hook ใน Function Component หรือใช้ this.state ใน Class Component โดย State จะเป็นข้อมูลที่เปลี่ยนแปลงได้ ตัวอย่างการใช้งาน State แสดงดังต่อไปนี้

```jsx
// Function Component
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

## การใช้งาน Lifecycle ใน React Component
การใช้งาน Lifecycle ใน React Component สามารถทำได้โดยการใช้ useEffect Hook ใน Function Component หรือใช้ Lifecycle Method ใน Class Component โดย Lifecycle จะเป็นการทำงานตามลำดับของ Component ตัวอย่างการใช้งาน Lifecycle แสดงดังต่อไปนี้

```jsx
// Function Component
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

// Class Component
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

## การใช้งาน Context ใน React Component
การใช้งาน Context ใน React Component สามารถทำได้โดยการใช้ useContext Hook ใน Function Component หรือใช้ this.context ใน Class
Component โดย Context จะเป็นการส่งข้อมูลไปยัง Component ที่อยู่ห่างออกไป ตัวอย่างการใช้งาน Context แสดงดังต่อไปนี้

```jsx
// Function Component
const ThemeContext = React.createContext('light');

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return <button>{theme}</button>;
}

// Class Component
const ThemeContext = React.createContext('light');

class ThemeButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button>{this.context}</button>;
  }
}
```

## การใช้งาน Ref ใน React Component
การใช้งาน Ref ใน React Component สามารถทำได้โดยการใช้ useRef Hook ใน Function Component หรือใช้ createRef Method ใน Class Component โดย Ref จะเป็นการอ้างอิงไปยัง Element หรือ Component ตัวอย่างการใช้งาน Ref แสดงดังต่อไปนี้

```jsx
// Function Component
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

// Class Component
class TextInputWithFocusButton extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <>
        <input ref={this.textInput} />
        <button onClick={this.focusTextInput}>
          Focus the input
        </button>
      </>
    );
  }
}
```

## การใช้งาน Hook ใน React Component
การใช้งาน Hook ใน React Component สามารถทำได้โดยการใช้ Hook ต่างๆ ที่ React มีให้ โดย Hook จะเป็น Function ที่ช่วยในการจัดการ State และ Lifecycle ของ Component ตัวอย่างการใช้งาน Hook แสดงดังต่อไปนี้

```jsx
// Function Component
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Class Component
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

## การใช้งาน Effect ใน React Component
การใช้งาน Effect ใน React Component สามารถทำได้โดยการใช้ useEffect Hook ใน Function Component หรือใช้ Lifecycle Method ใน Class Component โดย Effect จะเป็นการทำงานตามลำดับของ Component ตัวอย่างการใช้งาน Effect แสดงดังต่อไปนี้

```jsx
// Function Component
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Class Component

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

## การใช้งาน Reducer ใน React Component
การใช้งาน Reducer ใน React Component สามารถทำได้โดยการใช้ useReducer Hook ใน Function Component หรือใช้ this.state ใน Class Component โดย Reducer จะเป็นการจัดการ State ใน Component ตัวอย่างการใช้งาน Reducer แสดงดังต่อไปนี้

```jsx
// Function Component
function Counter({ initialCount }) {
  const [count, dispatch] = useReducer(reducer, initialCount);

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  return (
    <>
      Count: {count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}

// Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <>
        Count: {this.state.count}
        <button onClick={() => this.increment()}>+</button>
        <button onClick={() => this.decrement()}>-</button>
      </>
    );
  }
}
```

## LAB: การสร้าง React Component
1. สร้าง Function Component ที่ชื่อว่า `HelloWorld` โดย Component นี้จะแสดงข้อความ `Hello, World!` บนหน้าเว็บ
2. สร้าง Class Component ที่ชื่อว่า `Counter` โดย Component นี้จะแสดงตัวเลขและปุ่ม `+` และ `-` ที่เมื่อคลิกที่ปุ่ม `+` จะเพิ่มค่าของตัวเลขขึ้น 1 และเมื่อคลิกที่ปุ่ม `-` จะลดค่าของตัวเลขลง 1
3. สร้าง Function Component ที่ชื่อว่า `ThemeButton` โดย Component นี้จะแสดงปุ่มที่มีสีของปุ่มเป็นสีที่กำหนดให้ โดยสีของปุ่มจะถูกกำหนดโดย Context ที่ชื่อว่า `ThemeContext` ที่มีค่าเริ่มต้นเป็น `light` และสามารถเปลี่ยนสีของปุ่มได้โดยการเปลี่ยนค่าของ Context นี้





<sup><ins>หมายเหตุ</ins> เอกสารนี้มีการใช้ Generative AI เข้ามาช่วยในการสร้างเอกสารบางส่วน และมีเพิ่มเติมข้อมูล ตลอดจนปรับปรุงข้อมูลเพื่อความเหมาะสมโดยผู้เขียน</sup> 