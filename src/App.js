import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { setUser } from './store/appSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
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
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router >
  );
}

export default App;
