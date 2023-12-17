import React,{useContext,} from 'react'
import {Link,} from 'react-router-dom'
import{store} from './App'
import './Nav.css'; 
const Nav = () => {
  const [token,]=useContext(store)
  return (

    <div  className="nav-container">
      <div className="nav-container" style={{ height: '5px', width: '100%' }}></div>
       <h1 className="nav-title">Chat App</h1>
      {!token&& 
      <ul>
        <li>
        <Link to='/Home' className='nav-link'>
          Home
        </Link>

        </li>
        <li>
        <Link to='/About' className='nav-link'>
          About
        </Link>
        
        </li>
      <li>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  }

    </div>
  )
}

export default Nav
