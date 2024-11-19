import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Container } from "react-bootstrap";
import { TodoList, TodoListItems } from "./component/TodoList";
import "./App.css";
import { TodoListItem } from "./component/TodoListItem";
import { TestComponent } from "./component/TestComponent";

function LifeCycleTestComponent() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1.Aşama comp render edildi (Mount olması)
    console.log("Şuan render edildi");
  }, []);

  useEffect(() => {
    // 2.Aşama :güncellenmesi (rerender oldugu an)
    console.log("Component güncellendi yani (rerender oldu)");
  });

  useEffect(() => {
    // Componentin renderdan çıkış anı unmount olması
    return () => {
      console.log("Component Renderdan çıktı.");
    };
  }, []);

  return (
    <div>
      <div>sayaç {counter}</div>
      <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
        Sayacı Arttır
      </button>
    </div>
  );
}

interface Users {
  id?: {
    userId: string;
  };
  name: string;
  gender: string;
  email: string;
}

function RenderUserCard({ name, gender, email }: Users) {
  return (
    <div>
      <br />
      <h1>{name}</h1>
      <h1>{gender}</h1>
      <h1>{email}</h1>
    </div>
  );
}

const todos: TodoListItems[] = [
  {
    subject: "Video Çekmek",
    description: "React Videoları Çekilip tamamlancak",
    isCompleted: true,
  },
  {
    subject: "React Alıştırmaları",
    description: "React Yeni konular bitirilcek",
    isCompleted: true,
  },
  {
    subject: "Yazılım Makale Kelimeleri ",
    description: "Yazılım makale kelimeleri anlamlarıyla beraber yazılcak",
    isCompleted: false,
  },
  {
    subject: "Projeler tamamlancak",
    description: "Render Projesi bitirilcek",
    isCompleted: false,
  },
];

interface WithCounterComponentProps {
  count: number;
  increaseCount: () => void;
}
// WithCountera bu fonksiyon parametre geçildiginde bu component 2 prop alıyor oda withCounterdeki 2 işlemi alıp burda return kısmında tanımlayıp sayfada gösteriyor
function ClickCounterOriginal({
  count,
  increaseCount,
}: WithCounterComponentProps) {
  return (
    <div>
      <span>Tıklama Sayacı: {count}</span>
      <div>
        <button onClick={increaseCount}>Sayacı Arttır</button>
      </div>
    </div>
  );
}
function MouseOverCounterOriginal({
  count,
  increaseCount,
}: WithCounterComponentProps) {
  return (
    <div>
      <span>Mouse'mi Üstüne getirme Sayacı: {count}</span>
      <div>
        <button onMouseOver={increaseCount}>
          Sayacı Butonun üzerine getirerek arttır
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withCounter(OriginalComponent: any) {
  // Bu withCounter dışardan component alıyor ve altta new componentde işlemleri yani arttırma işlemlerini 1 kere yazıp bizim dışardan gönderdigimiz componente prop geçiyor
  function NewComponent() {
    // İşlemi 1 kere yazıp parametre geçilen componente prop geçtik
    const [count, setCount] = useState(0);

    function handleIncrementCount() {
      setCount((oldCount) => oldCount + 1);
    }
    return (
      <OriginalComponent count={count} increaseCount={handleIncrementCount} />
    );
  }

  return NewComponent;
}

const ClickCounter = withCounter(ClickCounterOriginal);
const MouseOverCounter = withCounter(MouseOverCounterOriginal);

function App() {
  // const [state, setState, ref] = useStateRef(0);

  const [showLifeCycleTestComp, setShowLifeCycleTestComp] =
    useState<boolean>(true);

  const inputRef = useRef("");

  const [name, setName] = useState("");
  const renderCount = useRef(null);
  const [userRenderToggle, setUserRenderToggle] = useState<boolean>(false);
  const [user, setUser] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRandomUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        alert("Hata var:" + error);
      } finally {
        setLoading(false);
      }
    };
    getRandomUser();
  }, []);

  if (loading) return <p>Kullanıcı yükleniyor.....</p>;

  const renderListItem = (todo: TodoListItems) => (
    <TodoListItem
      subject={todo.subject}
      isCompleted={todo.isCompleted}
      description={todo.description}
    />
  );

  // const increaseRenderCount = () => {
  //   renderCount.current = renderCount.current + 1;
  // };
  // const [counter, setCounter] = useStateRef(0);
  // function increment() {
  //   setCounter((count) => count + 1);
  //   alert(counter);
  // }

  return (
    <>
      <Container>
        <div>
          <div>{showLifeCycleTestComp && <LifeCycleTestComponent />}</div>
          <button
            onClick={() => setShowLifeCycleTestComp((prevTest) => !prevTest)}
          >
            Toggle Life cycle test
          </button>
        </div>
        <button onClick={() => setUserRenderToggle((prev) => !prev)}>
          Kullanıcıyı getir
        </button>
        <div style={{ marginTop: "100px" }}>
          {user.map(
            (data, index) =>
              userRenderToggle && (
                <RenderUserCard
                  key={index}
                  name={data.name}
                  gender={data.gender}
                  email={data.email}
                />
              )
          )}
        </div>
        <div style={{ margin: "200px" }}>
          <Card title="Emre SEFEROĞLU">
            <p>Merhaba emre</p>
            <p>Merhaba emre</p>
            <p>Merhaba emre</p>
            <p>Merhaba emre</p>
            <p>Merhaba emre</p>
            <p>Merhaba emre</p>
          </Card>
        </div>
      </Container>
      <Container>
        <TodoList
          title="Todo List"
          todos={todos}
          renderListItem={renderListItem}
        />
      </Container>
      <Container>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>Mevcut isim: {name}</div>
        <div>Kaç kez render edildi: {renderCount.current}</div>
        {/* <button onClick={increaseRenderCount}>Render count arttır!</button> */}
      </Container>
      <Container className="mt-5">
        {/* <div>Güncel Sayı: {counter}</div>
        <div>
          <button onClick={increment}>Arttır</button>
        </div> */}

        <TestComponent ref={inputRef} />
      </Container>
      <Container>
        <ClickCounter />
        <br />
        <MouseOverCounter />
      </Container>
    </>
  );
}

export default App;
