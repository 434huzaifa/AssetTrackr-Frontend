import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./Auth.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import AddEmployee from "./AddEmployee.jsx";
import Device from "./Device.jsx";
const qc = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/emp",
        element:<AddEmployee/>
      },
      {
        path:"/device",
        element:<Device/>
      }
    ],
  },
  {
    path:"/login",
    element:<Login></Login>
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <Auth>
        <RouterProvider router={router} />
        <Outlet></Outlet>
      </Auth>
    </QueryClientProvider>
  </React.StrictMode>
);
