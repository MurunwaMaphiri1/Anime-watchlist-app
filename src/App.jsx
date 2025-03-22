import Footer from './components/Footer'
import Navbar from './components/Navbar'
import HomePage from './HomePage'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Popular from './Popular'
import Movies from './Movies'
import Series from './Series'

function App() {

  return (
    <>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/popular' element={<Popular/>}/>
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/series' element={<Series/>}/>
          </Routes>
          <Footer/>
        </Router>
    </>
  )
}

export default App
