import React, { Fragment } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Logo } from "../../../assets"

import classes from "./contacts.module.scss"

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUsername(currentUser.username)
    }
  }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <Fragment>
      {currentUserImage && currentUsername && (
        <div className={classes.contact_body}>
          <div className={classes.brand}>
            <img src={Logo} alt="logo" />
            <h3>Chat App</h3>
          </div>
          <div className={classes.contacts}>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`${classes.contact} ${
                    index === currentSelected ? `${classes.selected}` : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className={classes.avatar}>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className={classes.username}>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={classes.current_user}>
            <div className={classes.avatar}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className={classes.username}>
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Contacts
