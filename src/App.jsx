import { useState } from 'react'
import './index.css'
import MovieCard from './components/MovieCard'
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import WatchPage from './Pages/Watch'
import { MovieProvider } from './contexts/MovieContexts'

function App() {

  return (
    <MovieProvider>
      <div className='  MSBackground'>
        <div className='h-17'>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watch/:type/:id" element={<WatchPage />} />
        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
