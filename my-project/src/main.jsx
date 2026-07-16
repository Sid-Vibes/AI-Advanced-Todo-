import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Login from './components/Login/Login.jsx'
import Registration from './components/Registration/Registration.jsx'
import Dashboard from './components/Dashborad/Dashborad.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'


import {
  createRoutesFromElements,
  Route,
} from "react-router"
import { createBrowserRouter, RouterProvider, Routes } from "react-router"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Registration/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />


    </Route>
  )
)




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
