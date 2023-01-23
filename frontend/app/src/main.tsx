import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader, action as rootAction } from "@front/route-root";
import { ErrorPage } from "./components/ErrorPage";
import { View, loader as viewLoader } from "@front/route-view";
import { Edit, loader as editLoader, action as editAction } from "@front/route-edit";
import { action as destroyTodoAction } from "@front/route-destroy";
import { Index } from "@front/route-index";

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
            element: <View />,
            loader: viewLoader,
          },
          {
            path: "todos/:todoId/edit",
            element: <Edit />,
            loader: editLoader,
            action: editAction,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
