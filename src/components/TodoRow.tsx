import { useState } from "react";
import type { TodoInterface, TodoStatus } from "../interfaces/TodoInterface"

interface TodoRowProps extends TodoInterface {
    editTodo: (id: number, updatedData: Omit<TodoInterface, 'id' | 'created_at' | 'updated_at'>) => void;
    deleteTodo: (id: number) => void; 
    isEditing: boolean;
    startEdit: (id: number | null) => void;
}

function TodoRow({id, title, description, status, editTodo, deleteTodo, isEditing, startEdit}: TodoRowProps) {

    const [editData, setEditData] = useState<Omit<TodoInterface, 'id' | 'created_at' | 'updated_at'>>({
        title,
        description,
        status
    });


    if(isEditing) {
        return(
            <tr>
                <td>
                    <input type="text" value={editData.title} onChange={(event) => setEditData({...editData, title: event.target.value})} />
                </td>
                <td><textarea name="description" id="description" value={editData.description} onChange={(event) => setEditData({...editData, description: event.target.value})} ></textarea></td>
                <td>
                    <select name="status" id="status" 
                    value={editData.status}
                    onChange={(event) => setEditData({...editData, status: event.target.value as TodoStatus})}
                    >
                        <option>Ej påbörjad</option>
                        <option>Pågående</option>
                        <option>Avklarad</option>
                    </select>
                </td>
                <td>
                    <button onClick={() => editTodo(id, editData)}>Spara</button> - 
                    <button onClick={() => startEdit(null)}>Avbryt</button>
                </td>
            </tr>
        )
    }

    return(
        <tr>
            <td>{title}</td>
            <td>{description}</td>
            <td>{status}</td>
            <td><button onClick={() => startEdit(id)}>Ändra</button> - <button onClick={() => deleteTodo(id)}>Radera</button></td>
        </tr>
    )
}

export default TodoRow;