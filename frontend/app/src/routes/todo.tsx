import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getTodo } from "../apis/todos";

export async function loader({ params }: LoaderFunctionArgs) {
  return getTodo(params.todoId as string);
}

export function Todo() {
  const todo = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div id="todo">
      <div>
        <h1 className={todo.complete ? "complete-todo" : ""}>{todo.title}</h1>

        {todo.description && <p>{todo.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit" autoFocus>
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
