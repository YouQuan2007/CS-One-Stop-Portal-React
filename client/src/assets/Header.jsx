//import React from 'react'
import { BsFillBellFill,BsJustify, BsArrowBarRight } from 'react-icons/bs'
//import { Button } from 'react-bootstrap';

const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
    // Ini should be okay le kot?

}

const handleNotification = () => {
  alert('No new notifications')
  //Need to implement new function lagi, not completed yet
}



const Header = () => {

  const email = localStorage.getItem('email');
  //console.log("---hello",email);
  return (
    <>
    <header className='header'>

        <div className='menu-icon'>
            <BsJustify className='icon'/>
        </div>

        <div className='header-left'>
           &nbsp; Welcome, {email}!
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'onClick={handleNotification}/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <BsArrowBarRight className='icon' onClick={handleLogout} />
            &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </header>
    </>
  )
}

export default Header