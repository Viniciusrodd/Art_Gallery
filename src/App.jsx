
// import components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import NavBar from './components/Navbar/NavBar'

// import pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

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
                        <Route path='/login' element={ <Login /> } />
                        <Route path='/register' element={ <Register /> } />
                    </Routes>
                </div>

                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
