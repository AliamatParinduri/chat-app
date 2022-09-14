import React, { Fragment, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Logo } from "../../assets"
import "./register.scss"
import { baseUrl } from "../../utils/APIRoutes"

const Register = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    email: "",
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
      const { username, email, password } = values
      const { data } = await axios.post(`${baseUrl}/auth/register`, {
        username,
        email,
        password,
      })

      if (!data.status) {
        return toast.error(data.message, toastOptions)
      }
      navigate("/login")
    }
  }

  const handleValidation = (e) => {
    const { username, email, password, confirmPassword } = values

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
    } else if (password !== confirmPassword) {
      toast.error("password and confirm password should be same.", toastOptions)
      return false
    } else if (email === "") {
      toast.error("email is required.", toastOptions)
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
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            already have an account? <NavLink to="/login">Login</NavLink>
          </span>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  )
}

export default Register
