import { useEffect } from "react";

function LifeCycleTestComponent() {
  useEffect(() => {
    // 1.Aşama comp render edildi (Mount olması)
    console.log("Şuan render edildi");
  }, []);

  return <div>Component İçerigi</div>;
}

function App() {
  return (
    <>
      <LifeCycleTestComponent />
    </>
  );
}

export default App;
