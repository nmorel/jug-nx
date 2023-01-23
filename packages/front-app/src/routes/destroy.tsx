import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteTodo } from "../apis/todos";

export async function action({ params }: ActionFunctionArgs) {
  await deleteTodo(params.todoId as string);
  return redirect("/");
}
