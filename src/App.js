import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import PrivateRoute from './components/routeHelper/PrivateRoute';
import PublicRoute from './components/routeHelper/PublicRoute';
import NormalRoute from './components/routeHelper/NormalRoute';
import AdminRoute from './components/routeHelper/AdminRoute';

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
import WithNavbar from './layouts/WithNavbar';
import UsersPage from './pages/admin/UsersPage';
import SettingPage from './pages/admin/SettingPage';
import BlogsPage from './pages/admin/BlogsPage';
import ChatBotPage from './pages/admin/ChatBotPage';
import ChatBot from './components/ChatBot';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.app.loading)
  useEffect(() => {
    (async function () {
      if (localStorage.token) {
        try {
          const { data: user } = await axios.get(process.env.REACT_APP_API_URL + '/api/me')
          dispatch(setUser(user))
        } catch (err) {
          setAuthToken(null)
        }
      }
    })()
    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch(setUser(null))
    })
  }, [])

  return (
    <>
      <Router>
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>
          <Route path="/" element={<WithNavbar />}>
            <Route exact path="/" element={<NormalRoute><LandingPage /></NormalRoute>} />
            <Route exact path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
            <Route exact path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route exact path="/about" element={<NormalRoute><About /></NormalRoute>} />
            <Route exact path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route exact path="/:chatId" element={<ChatPage />} />

            <Route exact path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
            <Route exact path="/admin/blogs" element={<AdminRoute><BlogsPage /></AdminRoute>} />
            <Route exact path="/admin/chatbot" element={<AdminRoute><ChatBotPage /></AdminRoute>} />
            <Route exact path="/admin/setting" element={<AdminRoute><SettingPage /></AdminRoute>} />
          </Route>
        </Routes>
        <Footer />
      </Router >
      <ChatBot />
      {loading &&
        <div className='fixed inset-0 z-50' style={{ backdropFilter: 'blur(5px)' }}>
          <div className='flex w-full h-full justify-center items-center'>
            <div
              className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-orange-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
