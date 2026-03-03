import { useState } from "react"
import type { TodoInterface } from "../interfaces/TodoInterface";
import type { TodoStatus } from "../interfaces/TodoInterface";
import type { ErrorData } from "../interfaces/ErrorData";
import * as Yup from "yup";

interface TodoFormProp {
    addTodo: (todo: Omit<TodoInterface, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

function TodoForm({addTodo}: TodoFormProp) {

    const [todoData, setTodoData] = useState<Omit<TodoInterface, 'id' | 'created_at' | 'updated_at'>>({
        title: '',
        description: '',
        status: 'Ej påbörjad'
    });

    const [errors, setErrors] = useState<ErrorData>({});

    const todoStatus = ['Ej påbörjad', 'Pågående', 'Avklarad'];

    // Skapa validerings schema
    const validationSchema = Yup.object({
        title: Yup.string().required('Fyll i todo-titel').min(3),
        description: Yup.string().optional().max(200),
        status: Yup.string().required('Välj status från lista')
    })

    async function submitForm(event: any) {
        event.preventDefault();

        
        try {
            // Validering via Yup
            await validationSchema.validate(todoData, { abortEarly: false });

            
            await addTodo(todoData);
            
        } catch (errors) {
            const validationErrors: ErrorData = {};

            if(errors instanceof Yup.ValidationError) {
                errors.inner.forEach((error) => {
                    const prop = error.path as keyof ErrorData;

                    validationErrors[prop] = error.message;
                });
            }

            setErrors(validationErrors);
        }
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Titel:</label>
            <br />
            <input 
            type="text" 
            name="title" 
            id="title" 
            value={todoData.title}
            onChange={(event) => 
                setTodoData({...todoData, title: event.target.value})
            }
            />
            {errors.title && <span color="red">{errors.title}</span>}

            <br />
            <label htmlFor="description">Beskrivning:</label>
            <br />
            <textarea 
            name="description" 
            id="description"
            value={todoData.description}
            onChange={(event) => 
                setTodoData({...todoData, description: event.target.value})
            }
            >

            </textarea>
            { errors.description && <span>{errors.description}</span>}

            <br />
            <label htmlFor="status">Status:</label>
            <select 
            name="status" 
            id="status"
            value={todoData.status}
            onChange={(event) => 
                setTodoData({...todoData, status: event.target.value as TodoStatus})
            }
            >
                {
                    todoStatus.map((status, index) => 
                        <option key={index} value={status}>{status}</option>
                    )
                }
            </select>
            { errors.status && <span>{errors.status}</span>}

            <br />
            <input type="submit" value="Lägg till todo" />
        </form>
    )
}

export default TodoForm;