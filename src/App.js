import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import SetAvatar from "./pages/setAvatar"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/setAvatar" element={<SetAvatar />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/" element={<Chat />}></Route>
      </Routes>
    </Router>
  )
}

export default App
