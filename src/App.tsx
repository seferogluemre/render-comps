import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Container } from "react-bootstrap";
import { TodoList, TodoListItems } from "./component/TodoList";
import "./App.css";
import { TodoListItem } from "./component/TodoListItem";

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

const todos: TodoListItem[] = [
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

function App() {
  const [showLifeCycleTestComp, setShowLifeCycleTestComp] =
    useState<boolean>(true);

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
    </>
  );
}

export default App;
