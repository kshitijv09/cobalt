import React from 'react';
import {createBrowserRouter,Route,RouterProvider} from "react-router-dom"
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';


function App() {

  const router=createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/profile/:userId",element:<Profile/>}
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
