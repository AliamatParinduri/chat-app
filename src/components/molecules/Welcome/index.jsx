import React from "react"

import { Robot } from "../../../assets"
import classes from "./welcome.module.scss"

const Welcome = ({ currentUser }) => {
  return (
    <div className={classes.body_welcome}>
      <img src={Robot} alt="Robot" srcset="" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please, select a chat to start messaging</h3>
    </div>
  )
}

export default Welcome
