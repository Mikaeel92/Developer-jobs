import React from 'react'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Jobs from '../src/pages/Jobs'
import AddJobs from '../src/pages/AddJobs'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './pages/NotFoundPage'
import SingleJobPage from './pages/SingleJobPage'
import EditJob from './pages/EditJob'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <ToastContainer position='top-right' autoClose={5000}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/jobs/:id' element={<SingleJobPage/>}/>
        <Route path='/edit-job/:id' element={<EditJob/>}/>
        <Route path='/add-jobs' element={<AddJobs/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}
export default App