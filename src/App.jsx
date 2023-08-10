import React from 'react'
import { BrowserRouter as Router, Route, NavLink, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import CreateAlbum from './Pages/CreateAlbum'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createAlbum",
    element: <CreateAlbum />
  }

])

const App = () => {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App