import  ReactDOM from "react-dom/client";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import "./index.css";
import AddTransaction from "./views/AddTransaction/AddTransaction"
import UpdateTransaction from "./views/UpdateTransaction/update.js"

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
        path: "/update/:_id",
        element: <UpdateTransaction/>,
      },

      {
        path: "/addTransaction",
        element: <AddTransaction/>,
      },

  ]);

 root.render(
      <RouterProvider router={router} />
  );

