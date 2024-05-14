//import React from 'react'
import Header from '../assets/Header'
import Home from '../assets/Home'
import Sidebar from '../assets/Sidebar'
//import SidebarItem from'../assets/SidebarItem'
const Dashboard = () => {
  return (
    <div className='grid-container'>
      <Header/>
      <Sidebar />
      <Home />
      
    </div>
  )
}

export default Dashboard