import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import { Route, Routes } from 'react-router'
import SignupForm from './Components/SignupForm/SignupForm.jsx'
import LoginForm from './Components/LoginForm/LoginForm.jsx'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import CreateListing from './Pages/CreateListing/CreateListing.jsx'
import SearchPage from './Pages/SearchPage/SearchPage.jsx'
import ListingPage from './Pages/ListingPage/ListingPage.jsx'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [tab, setTab] = useState('signup')

  return (
    <>
    <Navbar tab={tab} setTab={setTab} />
    <Routes>
    <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginForm tab={tab} setTab={setTab} />} />
      <Route path='/signup' element={<SignupForm tab={tab} setTab={setTab} />} />
      <Route path='/create-listing' element={<CreateListing />} />
      <Route path='/s' element={<SearchPage />} />
      <Route path='/listing/:id' element={<ListingPage />} />
    </Routes>
    </>
  )
}

export default App
