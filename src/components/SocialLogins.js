import React from 'react'
import GoogleImage from '../assets/images/google.png'
import LinkedinImage from '../assets/images/linkedin.jpg'

export default function SocialLogins({ setLoading, handleLoginResponse }) {
  return (
    <div className="flex justify-center gap-4">

      <button
        // onClick={() => linkedInLogin()}
        className="rounded-full w-[80px] flex justify-center p-2 border-[1px] border-blue-200"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <img
          width={"30"}
          height={"30"}
          src={LinkedinImage}
          alt="linkedin"
        />
      </button>
      <button
        // onClick={() => googleLogin()}
        className="rounded-full w-[80px] flex justify-center p-2 border-[1px] border-blue-200"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <img
          width="30"
          height="30"
          src={GoogleImage}
          alt="google"
        />
      </button>
    </div>
  )
}