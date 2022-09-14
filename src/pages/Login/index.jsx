import React, { Fragment, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Logo } from "../../assets"
import "../Register/register.scss"
import { baseUrl } from "../../utils/APIRoutes"
import { useEffect } from "react"

const Login = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) navigate("/")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (handleValidation()) {
      const { username, password } = values
      const result = await axios
        .post(`${baseUrl}/auth/login`, {
          username,
          password,
        })
        .catch((err) => {
          return err
        })

      if (result.response) {
        return toast.error(result.response.data.message, toastOptions)
      }

      if (!result.data.status) {
        return toast.error(result.data.message, toastOptions)
      }

      localStorage.setItem("chat-app-user", JSON.stringify(result.data.data))

      if (result.data.data.isAvatarImageSet) {
        navigate("/")
      } else {
        navigate("/setAvatar")
      }
    }
  }

  const handleValidation = (e) => {
    const { username, password } = values

    if (username.length < 3) {
      toast.error(
        "username should be equal or greater than 3 characters.",
        toastOptions
      )
      return false
    } else if (password.length < 8) {
      toast.error(
        "password should equal or frater than 8 characters.",
        toastOptions
      )
      return false
    }
    return true
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <div className="FormContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>Chat App</h1>
          </div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            don't have any account? <NavLink to="/register">Register</NavLink>
          </span>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  )
}

export default Login
