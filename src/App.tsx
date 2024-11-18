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

function App() {
  const [showLifeCycleTestComp, setShowLifeCycleTestComp] =
    useState<boolean>(true);

  return (
    <>
      <div>
        <div>{showLifeCycleTestComp && <LifeCycleTestComponent />}</div>
        <button
          onClick={() => setShowLifeCycleTestComp((prevTest) => !prevTest)}
        >
          Toggle Life cycle test component
        </button>
      </div>
    </>
  );
}

export default App;
