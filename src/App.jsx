import { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Leetcode from './Leetcode'
import Hobbies from './Hobbies'
import NotFound from './NotFound'
import Footer from './Footer'
import './App.css'
import {  BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function App() {

  return (
    <>
      
      <Router>
        <Navbar/>
          <main>
            <Routes>
              <Route path="/" element={ <Home />} />
              <Route path="/Leetcode" element={<Leetcode />} />
              <Route path="/Hobbies" element={<Hobbies username="sheershobanerjee" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </main>
      <Footer />
    </Router>  
    </>
  )
}

export default App
