import { createRoot } from 'react-dom/client'
import './index.css'
import Signup from './components/Signup.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './components/Dashboard.jsx'
import Signin from './components/Signin.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
  <Route index element={<Signup />} />
    <Route path="/signin" element={<Signin />}/>

    <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  </BrowserRouter>,
)
