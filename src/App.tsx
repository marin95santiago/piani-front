import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import GlobalProvider from './contexts'
import Layout from './pages/Layout'
import Login from './pages/Login'

function App() {
    return (
        <div className="App">
            <GlobalProvider>
                <Router>
                    <Routes>
                        <Route path="/loggin" element={<Login />} />
                        <Route path="*" element={<Layout />} />
                    </Routes>
                </Router>
                <ToastContainer/>
            </GlobalProvider>
        </div>
    );
}

export default App;
