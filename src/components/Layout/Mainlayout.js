import React from 'react'
import Navbar from '../common/Navbar'
import '../main.css'

function Mainlayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="main">{children}</div>
    </div>
  )
}

export default Mainlayout
