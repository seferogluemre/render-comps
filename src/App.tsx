import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Col, Container, Row } from "react-bootstrap";
import { TodoList, TodoListItems } from "./component/TodoList";
import "./App.css";
import { TodoListItem } from "./component/TodoListItem";
import { load } from "cheerio";
// import { TestComponent } from "./component/TestComponent";
// import { ClickCounter } from "./component/ClickCounter";
// import { MouseOverCounter } from "./component/MouseOverCounter";

// function LifeCycleTestComponent() {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     // 1.Aşama comp render edildi (Mount olması)
//     console.log("Şuan render edildi");
//   }, []);

//   useEffect(() => {
//     // 2.Aşama :güncellenmesi (rerender oldugu an)
//     console.log("Component güncellendi yani (rerender oldu)");
//   });

//   useEffect(() => {
//     // Componentin renderdan çıkış anı unmount olması
//     return () => {
//       console.log("Component Renderdan çıktı.");
//     };
//   }, []);

//   return (
//     <div>
//       <div>sayaç {counter}</div>
//       <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
//         Sayacı Arttır
//       </button>
//     </div>
//   );
// }

// interface Users {
//   id?: {
//     userId: string;
//   };
//   name: string;
//   gender: string;
//   email: string;
// }

// function RenderUserCard({ name, gender, email }: Users) {
//   return (
//     <div>
//       <br />
//       <h1>{name}</h1>
//       <h1>{gender}</h1>
//       <h1>{email}</h1>
//     </div>
//   );
// }

// const todos: TodoListItems[] = [
//   {
//     subject: "Video Çekmek",
//     description: "React Videoları Çekilip tamamlancak",
//     isCompleted: true,
//   },
//   {
//     subject: "React Alıştırmaları",
//     description: "React Yeni konular bitirilcek",
//     isCompleted: true,
//   },
//   {
//     subject: "Yazılım Makale Kelimeleri ",
//     description: "Yazılım makale kelimeleri anlamlarıyla beraber yazılcak",
//     isCompleted: false,
//   },
//   {
//     subject: "Projeler tamamlancak",
//     description: "Render Projesi bitirilcek",
//     isCompleted: false,
//   },
// // ];
// ------------------
const BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_URL = BASE_URL + "/posts";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const getAllPosts = async (page: number = 0) => {
    try {
      const response = await fetch(POSTS_URL + "?page=" + page);
      const postsData: Post[] = await response.json();
      return postsData;
    } catch (e) {
      console.log("Hata var:" + e);
      setError("Tüh birşeyler ters gitti Daha sonra tekrar dene");
    }
  };

  // const [state, setState, ref] = useStateRef(0);
  const [error, setError] = useState<string | null>(null);

  // const [showLifeCycleTestComp, setShowLifeCycleTestComp] =
  //   useState<boolean>(true);

  // const inputRef = useRef("");

  // const [name, setName] = useState("");
  // const renderCount = useRef(null);
  // const [userRenderToggle, setUserRenderToggle] = useState<boolean>(false);
  // const [user, setUser] = useState<Users[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const getRandomUser = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       const data = await response.json();
  //       setUser(data);
  //       // setLoading(false);
  //     } catch (error) {
  //       // setLoading(true);
  //       alert("Hata var:" + error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };
  //   getRandomUser();
  // }, []);

  // if (loading) return <p>Kullanıcı yükleniyor.....</p>;

  // const renderListItem = (todo: TodoListItems) => (
  //   <TodoListItem
  //     subject={todo.subject}
  //     isCompleted={todo.isCompleted}
  //     description={todo.description}
  //   />
  // );

  // const increaseRenderCount = () => {
  //   renderCount.current = renderCount.current + 1;
  // };
  // const [counter, setCounter] = useStateRef(0);
  // function increment() {
  //   setCounter((count) => count + 1);
  //   alert(counter);
  // }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = () => {
    setPage((oldPage) => oldPage + 1);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions

    (async () => {
      setLoading(true);
      const postsData = await getAllPosts(page);
      setPosts(postsData);
      setLoading(false);
    })();
  }, [page]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Container className="mt-5">
        {page < 42 && (
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleNextPage}>
              Sıradaki Sayfa
            </button>
          </div>
        )}
        <Row className="list-unstyled">
          {loading ? (
            <div
              style={{
                position: "fixed",
                left: "45%",
                top: "35%",
                background: "whitesmoke",
                textAlign: "center",
              }}
            >
              <p>Gönderiler yükleniyor....</p>
            </div>
          ) : (
            posts.map((post) => (
              <Col
                key={post.id}
                className="post-content "
                lg="4"
                md="4"
                sm="12"
              >
                <li>{post.title}</li>
                <div>
                  <p>{post.body}</p>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}

export default App;
