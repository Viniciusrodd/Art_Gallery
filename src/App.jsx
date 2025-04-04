// import style
import './App.css'

// import components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import NavBar from './components/Navbar/NavBar'
import { onAuthStateChanged } from 'firebase/auth' // function from firebase for authentication

// import hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

// import pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

// import context
import { AuthProvider } from './context/AuthContext'

function App() {
    const [ user, setUser ] = useState(undefined);
    const { auth } = useAuthentication();
    
    
    // check user authentication
    useEffect(() => {
        onAuthStateChanged(auth, (userReturn) => {
            setUser(userReturn);
        })
    }, [ auth ]);
    
    // check user not authenticated
    if(user === undefined){
        return <p>Carregando...</p>
    }

    return (
        <div className='App'>
            <AuthProvider value={{ user }}> {/* authentication context */}
                <BrowserRouter>
                    <NavBar />
                
                    <div className="container">
                        <Routes>
                            <Route path='/' element={ <Home /> } />
                            <Route path='/about' element={ <About /> } />
                            <Route path='/login' element={ !user ? ( <Login/> ) : ( <Navigate to='/' /> ) } /> {/*page need auth*/}
                            <Route path='/register' element={ !user ? ( <Register/> ) : ( <Navigate to='/' /> ) } /> {/*page need auth*/}
                            <Route path='/posts/create' element={ user ? ( <CreatePost/> ) : ( <Navigate to='/login' /> ) } />
                            <Route path='/dashboard' element={ user ? ( <Dashboard/> ) : ( <Navigate to='/login' /> ) } />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default App
