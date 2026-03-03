import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodosTable from "./TodosTable";
import type { TodoInterface } from "../interfaces/TodoInterface";

function Main() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

    const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  // Hjälpfunktion för att simulera fördröjning
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function getTodos() {
    try {
      setLoading(true);

      await delay(2000);

      const url = "https://tois-dt210g-moment2-backend.onrender.com/todos";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Serverfel");
      } else {
        const data = await response.json();

        setTodos(data.todos);
      }
    } catch (error) {
      console.error("Fel vid hämtning av data", error);
    } finally {
      setLoading(false);
    }
  }

  async function addNewTodo(
    newTodo: Omit<TodoInterface, "id" | "created_at" | "updated_at">,
  ) {
    try {
      // Ajax-anrop
      let url = "https://tois-dt210g-moment2-backend.onrender.com/todos";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Serverfel");
      } else {
        const newData = await response.json();

        setTodos((prev) => [...prev, newData.todo]);

      }
    } catch (error) {
      console.error("Fel vid skapande: ", error);
    }
  }

  async function deleteTodo(id: number) {
    try {
      const url ="https://tois-dt210g-moment2-backend.onrender.com/todos/" + id;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kunder inte radera todo-uppgift");
      } else {
        // Uppdatera staten
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Fel vid radering: ", error);
    }
  }

  function startEdit(id: number | null) {
    setEditingId(id);
  }
  async function editTodo(id:number, updatedData: Omit<TodoInterface, 'id' | 'created_at' | 'updated_at'>) {
    try {
        const url ="https://tois-dt210g-moment2-backend.onrender.com/todos/" + id;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if(!response.ok) {
            throw new Error('Serverfel');
        } else {
            const updatedTodo = await response.json();

            // console.log(updatedTodo.updatedTodo);

            setTodos(prev => 
                prev.map(todo => todo.id === id ? updatedTodo.updatedTodo : todo)
            );

            setEditingId(null);
        }
    } catch (error) {
        console.error('Ett fel uppstått: ', error);
    }
  }

  return (
    <main>
      <TodoForm addTodo={addNewTodo} />
      <TodosTable 
      todos={todos} 
      removeTodo={deleteTodo} 
      updateTodo={editTodo}  
      loading={loading} 
      startEdit={startEdit}
      editingId={editingId}
      />
    </main>
  );
}

export default Main;
