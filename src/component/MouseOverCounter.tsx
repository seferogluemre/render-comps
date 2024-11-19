import { withCounter, WithCounterComponentProps } from "./WithCounter";

interface ClickCounterOriginalProps extends WithCounterComponentProps {
  imgSrc: string;
}

function MouseOverCounterOriginal({
  count,
  imgSrc,
  increaseCount,
}: ClickCounterOriginalProps) {
  return (
    <div>
      <div>
        <img src={imgSrc} />
      </div>
      <span>Mouse'mi Üstüne getirme Sayacı: {count}</span>
      <div>
        <button onMouseOver={increaseCount}>
          Sayacı Butonun üzerine getirerek arttır
        </button>
      </div>
    </div>
  );
}
export const MouseOverCounter = withCounter(MouseOverCounterOriginal);
