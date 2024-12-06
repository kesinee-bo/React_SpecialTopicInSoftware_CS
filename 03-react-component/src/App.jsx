import "./App.css";

const reactDescription = ['Fundamental', 'Component', 'Props', 'State', 'Lifecycle', 'Hooks', 'Context', 'Redux', 'Testing', 'Deployment'];
function genRandomInt(max){
  return Math.floor(Math.random() * (max+1));
}

function Header() {
  const description=reactDescription[genRandomInt(9)]
  return (
    <header>
      <img src="src/assets/react.svg" alt="" width={100} />
      <h1>สวัสดี React</h1>
      <p>
         มาเรียนการพัฒนาเว็บแอปพลิเคชันด้วย React {description} กันเถอะ
      </p>
    </header>
  );
}

function App() {
  
  return (
    <div>
      <Header />
      <main>
        <h2>เริ่มต้นกับ React Component!</h2>
      </main>
    </div>
  );
}

export default App;
