import React from 'react'
import {BrowserRouter ,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Jobs from '../src/pages/Jobs'
import AddJobs from '../src/pages/AddJobs'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/add-jobs' element={<AddJobs/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App