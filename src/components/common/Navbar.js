import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import { AiFillHome, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai'
import { IoIosPerson, IoIosPeople } from 'react-icons/io'
import { FaVoteYea } from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { useHistory } from 'react-router'

import { Link, NavLink, BrowserRouter } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import Icon from '../icon.png'
import { IconContext } from 'react-icons'
import { logout, useAuthState, useAuthDispatch } from '../Context'
import Profile from '../Authentication/Profile'
function Navbar(props) {
  const [sidebar, setSidebar] = useState(true)
  const [active, setActive] = useState(true)
  // const showSidebar = () => setSidebar(!sidebar)
  const dispatch = useAuthDispatch()
  const history = useHistory()
  const { token } = useAuthState()

  const handleLogout = () => {
    logout(dispatch) //call the logout action

    history.push('/login') //navigate to logout page on logout
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <button className="body-auth" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            <div>
              <img src={Icon} className="nav-logo" />
              <span className="logo-text">BallotChain</span>
            </div>
            <li className="navbar-toggle"></li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} activeClassName="is-active">
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
