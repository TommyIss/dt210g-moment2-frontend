import type { TodoInterface } from "../interfaces/TodoInterface";
import TodoRow from "./TodoRow";

interface TodosTableProps {
  todos: TodoInterface[];
  removeTodo: (id: number) => void;
  updateTodo: (
    id: number,
    todo: Omit<TodoInterface, "id" | "created_at" | "updated_at">,
  ) => void;
  loading: boolean;
  startEdit: (id: number | null) => void;
  editingId: number | null;
}

function TodosTable({
  todos,
  removeTodo,
  updateTodo,
  startEdit,
  editingId,
  loading,
}: TodosTableProps) {

  return (
    <table>
      <thead>
        <tr>
          <th>Todo-Titel</th>
          <th>Beskrivning</th>
          <th>Status</th>
          <th>Åtgärder</th>
        </tr>
      </thead>

      <tbody>
        {loading && (
          <tr>
            <td colSpan={4}><em>Laddar uppgifterna...</em></td>
          </tr>
        )}
        {todos.map((todo) => (
          <TodoRow
            id={todo.id}
            key={todo.id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            isEditing={editingId === todo.id}
            startEdit={startEdit}
            editTodo={updateTodo}
            deleteTodo={removeTodo}
          />
        ))}

      </tbody>
    </table>
  );
}

export default TodosTable;
