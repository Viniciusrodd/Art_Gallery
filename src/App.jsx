
// import components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import NavBar from './components/Navbar/NavBar'

// import pages
import Home from './pages/Home/Home'
import About from './pages/About/About'

// import style
import './App.css'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <NavBar />
                
                <div className="container">
                    <Routes>
                        <Route path='/' element={ <Home /> } />
                        <Route path='/about' element={ <About /> } />
                    </Routes>
                </div>

                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
