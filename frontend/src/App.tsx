import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './components/Landing';
import { Room } from './components/Room';
import Home from './pages/Home';
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
    <div className='w-[100vw]'>
    <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/video-call" element={<Landing />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
