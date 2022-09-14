import React, { Fragment } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { Buffer } from "buffer"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { apiAvatar, baseUrl } from "../../utils/APIRoutes"
import "./setAvatar.scss"
import { Loader } from "../../assets"
import { useState } from "react"
import { useEffect } from "react"

function SetAvatar() {
  const api = apiAvatar

  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  // const

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))
      const result = await axios.post(`${baseUrl}/auth/${user._id}/setAvatar`, {
        image: avatars[selectedAvatar],
      })

      if (result.data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImageSet = result.data.image
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate("/")
      } else {
        toast.error("Error setting avatar. try again", toastOptions)
      }
    }
  }

  const setImageAvatars = async () => {
    const data = []
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${apiAvatar}/${Math.random() * 100}`)
      const buffer = new Buffer(image.data)
      data.push(buffer.toString("base64"))
    }
    setAvatars(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) navigate("/login")
    setImageAvatars()
  }, [])

  const navigate = useNavigate()

  return (
    <div className="container">
      {isLoading ? (
        <img src={Loader} alt="Loading" />
      ) : (
        <Fragment>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={() => setProfilePicture()}>
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Fragment>
      )}
    </div>
  )
}

export default SetAvatar
