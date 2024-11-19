import { withCounter, WithCounterComponentProps } from "./WithCounter";

// WithCountera bu fonksiyon parametre geçildiginde bu component 2 prop alıyor oda withCounterdeki 2 işlemi alıp burda return kısmında tanımlayıp sayfada gösteriyor
interface ClickCounterOriginalProps extends WithCounterComponentProps {
  title: string;
}

function ClickCounterOriginal({
  title,
  count,
  increaseCount,
}: ClickCounterOriginalProps) {
  return (
    <div>
      <div>{title}</div>
      <span>Tıklama Sayacı: {count}</span>
      <div>
        <button onClick={increaseCount}>Sayacı Arttır</button>
      </div>
    </div>
  );
}

const ClickCounter = withCounter(ClickCounterOriginal);

export { ClickCounter };
