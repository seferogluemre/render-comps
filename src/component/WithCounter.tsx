import { useState } from "react";
export interface WithCounterComponentProps {
  count: number;
  increaseCount: () => void;
}

export function withCounter<
  T extends WithCounterComponentProps = WithCounterComponentProps
>(OriginalComponent: React.ComponentType<T>) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    OriginalComponent.displayName || OriginalComponent.name || "Component";

  // Bu withCounter dışardan component alıyor ve altta new componentde işlemleri yani arttırma işlemlerini 1 kere yazıp bizim dışardan gönderdigimiz componente prop geçiyor
  const NewComponent = (props: Omit<T, keyof WithCounterComponentProps>) => {
    // İşlemi 1 kere yazıp parametre geçilen componente prop geçtik
    const [count, setCount] = useState(0);

    function handleIncrementCount() {
      setCount((oldCount) => oldCount + 1);
    }
    return (
      <OriginalComponent
        {...(props as T)}
        count={count}
        increaseCount={handleIncrementCount}
      />
    );
  };

  NewComponent.displayName = `withCounter(${displayName})`;

  return NewComponent;
}
