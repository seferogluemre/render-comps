import { Container } from "react-bootstrap";

interface TodoListProps {
  title: string;
  todos: TodoListItems[];
  renderListItem: (todo: TodoListItems) => JSX.Element;
}

export interface TodoListItems {
  description: string;
  subject: string;
  isCompleted: boolean;
}

export function TodoList({ title, todos, renderListItem }: TodoListProps) {
  return (
    <>
      <Container>
        <div>{title}</div>
        <ul className="list-unstyled">{todos.map(renderListItem)}</ul>
      </Container>
    </>
  );
}
