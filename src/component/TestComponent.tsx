import { forwardRef } from "react";

interface TestCompProps {
  props: HTMLInputElement;
}

export const TestComponent = forwardRef<HTMLInputElement, TestCompProps>(
  ({ props }, ref) => {
    console.log(props);
    return <input ref={ref} />;
  }
);
