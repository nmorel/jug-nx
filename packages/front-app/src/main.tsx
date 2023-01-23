import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader, action as rootAction } from "./routes/root";
import { ErrorPage } from "./components/ErrorPage";
import { Todo, loader as todoLoader } from "./routes/todo";
import { EditTodo, loader as editTodoLoader, action as editTodoAction } from "./routes/edit";
import { action as destroyTodoAction } from "./routes/destroy";
import { Index } from "./routes";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "todos/:todoId",
            element: <Todo />,
            loader: todoLoader,
          },
          {
            path: "todos/:todoId/edit",
            element: <EditTodo />,
            loader: editTodoLoader,
            action: editTodoAction,
          },
          {
            path: "todos/:todoId/destroy",
            action: destroyTodoAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
