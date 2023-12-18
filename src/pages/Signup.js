import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from 'axios'

import SocialLogins from '../components/SocialLogins';
import setAuthToken from '../utils/setAuthToken';
import toast from 'react-hot-toast';
import showToaster from '../utils/showToaster';

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/appSlice';
import convertJoiErrors2Errors from '../utils/convertJoiErrors2Errors';

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null)

  const handleSignUp = async () => {
    dispatch(setLoading(true))
    try {
      await axios.post(process.env.REACT_APP_API_URL + '/auth/signup/email', {
        name, email, password
      })
      const { data: { token } } = await axios.post(process.env.REACT_APP_API_URL + '/auth/signin/email', {
        email, password
      })
      setAuthToken(token)
      const { data: user } = await axios.get(process.env.REACT_APP_API_URL + '/user/me')
      dispatch(setUser(user))
      navigate('/')
      toast.success('Registered successfully')
      setErrors(null)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later.' })
      if (err?.response?.data?.isJoi) {
        setErrors(convertJoiErrors2Errors(err.response.data.errors))
      } else {
        setErrors(err?.response?.data?.errors)
      }
    }
    dispatch(setLoading(false))
  }

  return (
    <div className=" bg-[#F5F5F5] pt-[64px] pb-[64px]">
      <div className="mx-[20px] md:mx=[40px] lg:mx-[80px] bg-[#F5F5F5] ">
        <div className="flex justify-center">
          <div className="flex justify-center align-middle w-[100%] md:w-[65%] lg:w-[60%] xl:w-[50%] rounded border-[2px] border-[#f542c5]">
            <div className="mt-10 mb-10 w-[80%]">
              <p className="mb-8 text-center">Create an account</p>

              {/* <SocialLogins
              // handleLoginResponse={handleLoginResponse}
              /> */}

              <div className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                  {errors?.name && <label className="block text-rose-700 font-medium">{errors?.name}</label>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="example@example.com"
                    required
                  />
                  {errors?.email && <label className="block text-rose-700 font-medium">{errors?.email}</label>}
                </div>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium"
                  >
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Password"
                      required
                    />
                    <button
                      className="flex justify-around items-center"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      <Icon
                        className="absolute bottom-[10%] right-[4%]"
                        icon={showPassword ? eye : eyeOff}
                        size={25}
                      />
                    </button>
                  </div>
                  {errors?.password && <label className="block text-rose-700 font-medium">{errors?.password}</label>}
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={handleSignUp}
                    className={`bg-[#6355D8] w-full text-white py-2 px-4 rounded-full hover:bg-[#6355D8] transition duration-300 ease-in-out`}
                  >Sign Up
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p>
                  Been here before?{" "}
                  <Link
                    to="/signin"
                    className="text-[#6355D8] hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}