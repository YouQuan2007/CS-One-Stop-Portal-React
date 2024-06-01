//import React from 'react'
import { BsClipboardDataFill } from "react-icons/bs"
//import logo from '../assets/images/Logo.png'
//import { ChevronFirst} from 'lucide-react'
//import { SidebarItem } from './SidebarItem'
//import { Barchart3, Settings } from 'lucide-react'
const SidebarforStudents = () => {
  return (
    <aside id="sidebar">

        <div className='sidebar-title'>
            <div className='sidebar-brand'>
             CS One Stop Portal
            </div>
            <span className='close-icon'>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href='dashboardforstudents'>
                    <BsClipboardDataFill className='icon'/> &nbsp;Dashboard
                </a>
                <p></p>
            </li>
            <li className='sidebar-list-item'>
                <a href='listofresources/students'>
                    <BsClipboardDataFill className='icon'/>&nbsp; List of resources
                </a>
                <p></p>
            </li>
            <li className='sidebar-list-item'>
                <a href='listofcompetitions/students'>
                    <BsClipboardDataFill className='icon'/>&nbsp; List of competitions
                </a>
            </li>
            <p></p>
            {/* <li className='sidebar-list-item'>
                <a href='setting'>
                    <BsFillGearFill className='icon'/>&nbsp; Setting
                </a>
            </li> */}
        </ul>
    </aside>
    // <aside className="h-screen">
    //     <nav className="h-full flex flex-col bg-white border-r shadow-sm">
    //         <div className="p-4 pb-2 flex justify-between items-center">
    //             <img src="https://img.logoipsum.com/243.svg" alt="logo" className="w-32" />
    //             <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
    //                 <ChevronFirst />
    //             </button>

    //         </div>
    //         <ul className="flex-1 px-3"></ul>
            
    //         <div className="border-t flex p-3">

    //         </div>
    //     </nav>
    // </aside>
  )
}

export default SidebarforStudents