import { useEffect, useState } from "react";

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

function App() {
  const [showLifeCycleTestComp, setShowLifeCycleTestComp] =
    useState<boolean>(true);

  const [userRenderToggle, setUserRenderToggle] = useState<boolean>(false);
  const [user, setUser] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) return <p>Kullanıcı yükleniyor.....</p>;

  return (
    <>
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
    </>
  );
}

export default App;
