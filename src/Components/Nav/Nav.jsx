import React from 'react'
import logo from "../../assets/assets/resized_logo_40x40.png"


const Nav = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src={logo} alt='logo'/>
        <h1>ED TECH</h1>
      </div>
    </div>
  )
}

export default Nav
