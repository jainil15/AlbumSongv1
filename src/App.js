import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";
import CreateAlbum from "./Pages/CreateAlbum";
import AlbumSingle from "./Pages/AlbumSingle";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NavBar from "./Components/NavBar";
import { AuthContext } from "./Context/AuthContext";

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/createAlbum",
        element: <CreateAlbum />,
      },
      {
        path: "/album/:id",
        element: <AlbumSingle />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const App = () => {
  return (
    
      <div className="bg-black text-white h-screen">
        <RouterProvider router={router} />
      </div>
    
  );
};

export default App;
