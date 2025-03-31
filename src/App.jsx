import React, { useEffect,useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import SearchBar from './pages/SearchBar'
import MovieDetails from './pages/Details/MovieDetails'
import TvDetails from './pages/Details/TvDetails'
import PersonDetails from './pages/Details/PersonDetails'
import { AppContext } from './context/AppContext'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/email-verify' element={<VerifyEmail />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path="/" element={<SearchBar />}/>
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvDetails />} />
        <Route path="/persons/:id" element={<PersonDetails />} />
      </Routes>
    </div>
  )
}

export default App
