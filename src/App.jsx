import HomePage from './HomePage'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
