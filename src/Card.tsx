import "./App.css";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h1> {title}</h1>
      <div>{children}</div>
    </div>
  );
}
