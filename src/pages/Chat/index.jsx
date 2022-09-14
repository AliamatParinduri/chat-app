import React, { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { io } from "socket.io-client"

import classes from "./chat.module.scss"
import { baseUrl } from "../../utils/APIRoutes"
import Contacts from "../../components/molecules/Contacts"
import Welcome from "../../components/molecules/Welcome"
import ChatContainer from "../../components/molecules/ChatContainer"

const Chat = () => {
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("chat-app-user")
      ? JSON.parse(localStorage.getItem("chat-app-user"))
      : undefined
  )

  // --> masalah const [currentUser, setCurrentUser] = useState(undefined)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
      setIsLoading(true)
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(baseUrl)
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  const getUser = async () => {
    const { data } = await axios.get(
      `${baseUrl}/auth/getUser/${currentUser._id}`
    )
    setContacts(data.users)
  }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        getUser()
      } else {
        navigate("/setAvatar")
      }
    }
  }, [])

  const navigate = useNavigate()

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <div className={classes.body_chat}>
      <div className={classes.container}>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoading && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  )
}

export default Chat
