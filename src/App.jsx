import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/nav.jsx'
import Home from './pages/home.jsx'
import Register from './pages/register.jsx'
import Login from './pages/login'
import Postview from './pages/postView.jsx'

function App() {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/posts/:postId' element={<Postview />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
