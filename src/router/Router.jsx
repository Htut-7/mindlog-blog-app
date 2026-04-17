import App from "../App";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Explore from "../pages/Explore";
import Read from "../pages/Read";
import PostForm from "../pages/PostForm";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function Router(){

  let {authReady,user}=useContext(AuthContext);
  const isAuthenticated=!!user

  const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'',
        element: isAuthenticated ?  <Home/> : <Navigate to='/login'/>
      },{
        path: '/register',
        element: !isAuthenticated ? <Register/> : <Navigate to='/'/>
      },{
        path: '/login',
        element: !isAuthenticated ? <Login/> : <Navigate to='/'/>
      },{
        path: '/contact',
        element: isAuthenticated ?  <Contact/> : <Navigate to='/login'/>
      },{
        path: '/explore',
        element: isAuthenticated ? <Explore/> : <Navigate to='/login'/>
      },{
        path: '/read/:id',
        element: isAuthenticated ? <Read/> : <Navigate to='/login'/>
      },{
        path:'/create',
        element: isAuthenticated ? <PostForm/> : <Navigate to='/login'/>
      },{
        path: '/edit/:id',
        element: isAuthenticated ? <PostForm/> : <Navigate to='/login'/>
      }
    ]
  },
]);

  return (
    authReady ? <RouterProvider router={router} /> : null
  )

}
