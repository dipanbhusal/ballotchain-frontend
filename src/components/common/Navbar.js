import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router'

import { NavLink } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import Icon from '../icon.png'
import { IconContext } from 'react-icons'
import { logout, useAuthState, useAuthDispatch } from '../Context'

function Navbar(props) {
  const dispatch = useAuthDispatch()
  const history = useHistory()

  const handleLogout = () => {
    logout(dispatch) //call the logout action

    history.push('/login') //navigate to logout page on logout
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Button
            className="body-auth"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
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
