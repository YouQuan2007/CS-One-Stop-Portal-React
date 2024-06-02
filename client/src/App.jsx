// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
//import router from './'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import LoginAsStudents from './pages/LoginAsStudents'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ListofCompetitions from './pages/ListofCompetitions'
import ListofResources from './pages/ListofResources'
import SettingPage from './pages/SettingPage'
import ResetPassword from './pages/ResetPassword'
import RegisterAsLecturers from './pages/RegisterAsLecturers'
//import RegisterAsStaff from './pages/RegisterAsStaff'
import RegisterAsStudents from './pages/RegisterAsStudents'
import DashboardforStudents from './pages/DashboardforStudents'
import ListofResourcesforStudents from './pages/ListofResourcesforStudents'
import ListofCompetitionsforStudents from './pages/ListofCompetitionsforStudents'
//import Sidebar from './assets/Sidebar'

function App() {
  //const [count, setCount] = useState(0)
  // 05.31 update:
  // The default login page changed to loginasstuents first, after siap students punya thing
  // need to change back to lecturer side

  return (

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      <Routes>
        <Route path ="/dashboardforstudents" element = {<DashboardforStudents/>} />
      </Routes>
      <Routes>
        <Route path="/listofcompetitions" element={<ListofCompetitions/>} />
      </Routes>
      <Routes>
        <Route path="/listofresources" element={<ListofResources/>} />
      </Routes>
      <Routes>
        <Route path = "/listofresources/students" element={<ListofResourcesforStudents/>}/>
      </Routes>
      <Routes>
        <Route path="/listofcompetitions/students" element={<ListofCompetitionsforStudents/>} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/loginasstudents" element={<LoginAsStudents/>} />
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
        <Route path="/registerasStudents" element={<RegisterAsStudents/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
