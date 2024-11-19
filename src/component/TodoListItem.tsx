import { TodoListItems } from "./TodoList";

export function TodoListItem(todo: TodoListItems) {
  return (
    <li className="todo-item">
      <div className="todo-subject">{todo.subject}</div>
      <div className="todo-desc">{todo.description}</div>
      <div>Tamamlandı mı? {todo.isCompleted ? "Evet" : "Hayır"}</div>
    </li>
  );
}
