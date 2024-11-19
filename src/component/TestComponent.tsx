import { forwardRef } from "react";

interface TestCompProps {}

export const TestComponent = forwardRef<HTMLInputElement, TestCompProps>(
  ({ props }, ref) => {
    console.log(ref);
    return <input ref={ref} />;
  }
);
