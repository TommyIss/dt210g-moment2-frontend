export type TodoStatus = 'Ej påbörjad' | 'Pågående' | 'Avklarad';
export interface TodoInterface {
    id: number;
    title: string;
    description?: string;
    status: TodoStatus;
    created_at?: string;
    updated_at?: string;
}