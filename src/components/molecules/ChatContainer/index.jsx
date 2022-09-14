import React, { Fragment, useEffect, useState } from "react"
import ChatInput from "../../atoms/ChatInput"
import Logout from "../Logout"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

import classes from "./chatContainer.module.scss"
import { getAllMessageRoute, sendMessageRoute } from "../../../utils/APIRoutes"
import { useRef } from "react"

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()

  const getAllMessage = async () => {
    const response = await axios.post(getAllMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
    })
    setMessages(response.data)
  }

  useEffect(() => {
    if (currentChat) {
      getAllMessage()
    }
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    })

    const msgs = [...messages]
    msgs.push({ fromSelf: true, message: msg })

    setMessages(msgs)
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receieve", (msg) => {
        console.log(``)
        setArrivalMessage({
          fromSelf: false,
          nessage: msg,
        })
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])

  return (
    <Fragment>
      {currentChat && (
        <div className={classes.chat_container}>
          <div className={classes.chat_header}>
            <div className={classes.user_details}>
              <div className={classes.avatar}>
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                />
              </div>
              <div className={classes.username}>
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <ChatMessages /> */}

          <div className={classes.chat_messages}>
            {messages.map((message, index) => (
              <div ref={scrollRef} key={uuidv4(index)}>
                <div
                  className={`${classes.message} ${
                    message.fromSelf ? classes.sended : classes.received
                  } `}
                >
                  <div className={classes.content}>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </Fragment>
  )
}

export default ChatContainer
