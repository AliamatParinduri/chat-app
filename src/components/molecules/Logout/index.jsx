import React from "react"

import { BiPowerOff } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

import classes from "./logout.module.scss"

function Logout() {
  const navigate = useNavigate()

  const handleClick = async () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className={classes.logout}>
      <BiPowerOff onClick={handleClick} />
    </div>
  )
}

export default Logout
