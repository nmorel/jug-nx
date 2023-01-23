import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import {getTodo, updateTodo} from '@front/api-client'

export async function loader({params}: LoaderFunctionArgs) {
  return getTodo(params.todoId as string)
}

export async function action({request, params}: ActionFunctionArgs) {
  const todoId = params.todoId as string
  const formData = await request.formData()
  const updates = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    complete: formData.get('complete') === 'on',
  }
  await updateTodo(todoId, updates)
  return redirect(`/todos/${todoId}`)
}

export function Edit() {
  const todo = useLoaderData() as Awaited<ReturnType<typeof loader>>
  const navigate = useNavigate()

  return (
    <Form method="post" id="todo-form">
      <label>
        <span>Title</span>
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={todo.title}
          required
          autoFocus
        />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" defaultValue={todo.description || ''} rows={6} />
      </label>
      <label>
        <span>Complete</span>
        <input type="checkbox" name="complete" defaultChecked={todo.complete} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(`/todos/${todo.id}`)}>
          Cancel
        </button>
      </p>
    </Form>
  )
}
