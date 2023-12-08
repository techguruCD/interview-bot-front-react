import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import PrivateRoute from './components/routeHelper/PrivateRoute';
import PublicRoute from './components/routeHelper/PublicRoute';

import LandingPage from './pages/LandingPage';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About';
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { setUser } from './store/appSlice';

import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      if (localStorage.token) {
        try {
          const { data: user } = await axios.get(process.env.REACT_APP_API_URL + '/user/me')
          dispatch(setUser(user))
        } catch (err) {
          setAuthToken(null)
        }
      }
    })()
    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch(setUser(null))
    })
  })
  return (
    <Router>
      <Toaster position='top-center' reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
        <Route exact path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route exact path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router >
  );
}

export default App;
