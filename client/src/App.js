// import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import GameInfo from './pages/GameInfo';
import Navbar from './components/Navbar';

export default function App() { 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/game/:id' element={<GameInfo/>} />
      </Routes>
    </>
  )
}