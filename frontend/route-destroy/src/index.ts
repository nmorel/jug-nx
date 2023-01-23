import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteTodo } from "@front/api-client";

export async function action({ params }: ActionFunctionArgs) {
  await deleteTodo(params.todoId as string);
  return redirect("/");
}
