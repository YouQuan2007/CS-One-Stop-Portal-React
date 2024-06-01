//import React from 'react'
import Header from '../assets/Header'
import Home from '../assets/Home'
//import Sidebar from '../assets/Sidebar'
import SidebarforStudents from '../assets/SidebarforStudents'
//import SidebarItem from'../assets/SidebarItem'
const DashboardforStudents = () => {
  return (
    <div className='grid-container'>
      <Header/>
      <SidebarforStudents />
      <Home />
      
    </div>
  )
}

export default DashboardforStudents