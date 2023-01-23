import wretch from 'wretch'

export type Todo = {
  id: number
  title: string
  description: string | null
  complete: boolean
  createdAt: string
  updatedAt: string
}

export function getTodos() {
  return wretch(`/api/todos`).get().json<Todo[]>()
}

export function getTodo(todoId: string) {
  return wretch(`/api/todos/${todoId}`).get().json<Todo>()
}

export function createTodo(todo: Partial<Todo>) {
  return wretch(`/api/todos`).post(todo).json<Todo>()
}

export function updateTodo(
  todoId: string,
  updates: Pick<Todo, 'title' | 'description' | 'complete'>
) {
  return wretch(`/api/todos/${todoId}`).put(updates).json<Todo>()
}

export function deleteTodo(todoId: string) {
  return wretch(`/api/todos/${todoId}`).delete().res()
}
