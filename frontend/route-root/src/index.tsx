import {
  ActionFunctionArgs,
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import {createTodo, getTodos} from '@front/api-client'

export async function loader() {
  const todos = await getTodos()
  return {todos}
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const title = formData.get('title') as string | null
  if (!title) throw new Error('Title is mandatory')
  const todo = await createTodo({
    title,
  })
  document.querySelector<HTMLFormElement>('form#add-todo')?.reset()
  return redirect(`/todos/${todo.id}`)
}

export function Root() {
  const {todos} = useLoaderData() as Awaited<ReturnType<typeof loader>>
  const navigation = useNavigation()
  return (
    <>
      <div id="sidebar">
        <h1>JUG Nantes</h1>
        <Form id="add-todo" method="post">
          <input
            id="title"
            aria-label="Add todo"
            placeholder="Add todo"
            type="text"
            name="title"
            required
          />
          <button type="submit">Add</button>
        </Form>
        <nav>
          {todos.length ? (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <NavLink
                    to={`todos/${todo.id}`}
                    className={({isActive, isPending}) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    <span className={todo.complete ? 'complete-todo' : ''}>{todo.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No todos</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}
