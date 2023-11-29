import  ReactDOM from "react-dom/client";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import "./index.css";
import AddTransaction from "./views/AddTransaction/AddTransaction"

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },

    {
       path: "/signup",
        element: <Signup/>,
      },

      {
        path: "/login",
        element: <Login/>,
      },

      {
        path: "/addTransaction",
        element: <AddTransaction/>,
      },

  ]);

 root.render(
      <RouterProvider router={router} />
  );

