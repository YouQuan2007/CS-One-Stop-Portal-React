// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
//import router from './'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ListofCompetitions from './pages/ListofCompetitions'
import ListofResources from './pages/ListofResources'
import SettingPage from './pages/SettingPage'
import ResetPassword from './pages/ResetPassword'
import RegisterAsLecturers from './pages/RegisterAsLecturers'
//import RegisterAsStaff from './pages/RegisterAsStaff'
import RegisterAsStudent from './pages/RegisterAsStudent'
//import Sidebar from './assets/Sidebar'

function App() {
  //const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      <Routes>
        <Route path="/listofcompetitions" element={<ListofCompetitions/>} />
      </Routes>
      <Routes>
        <Route path="/listofresources" element={<ListofResources/>} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
      </Routes>
      <Routes>
        <Route path="/resetPassword/:token" element={<ResetPassword/>} />
      </Routes>
      <Routes>
        <Route path="/setting" element={<SettingPage/>} />
      </Routes>
      <Routes>
        <Route path="/registerasLecturers" element={<RegisterAsLecturers/>} />
      </Routes>
      <Routes>
        <Route path="/registerasStudent" element={<RegisterAsStudent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
