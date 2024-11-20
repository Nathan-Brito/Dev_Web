import axiosInstance from "./api/axiosInstance";

export async function getTodos() {
    const response = await axiosInstance.get('https://ifms-todo.fly.dev/api/todo');

    return response.data;
}

export async function createTodo(name: string) {
    const response = await axiosInstance.post('https://ifms-todo.fly.dev/api/todo', { name });

    return response.data.ops[0];
}