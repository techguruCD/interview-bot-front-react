import React from "react";
import Select from "./Select";

import LogoImage from '../assets/images/logo.png'
import {ReactComponent as TwitterSVG} from "../assets/images/svgs/twitter.svg"
import {ReactComponent as FacebookSVG} from "../assets/images/svgs/facebook.svg";
import {ReactComponent as LinkedinSVG} from "../assets/images/svgs/linkedin.svg";
import {ReactComponent as YoutubeSVG} from "../assets/images/svgs/youtube.svg";
const Languages = [
  {
    title: "English",
    value: "en",
  },
  {
    title: "Spanish",
    value: "spa",
  },
  {
    title: "German",
    value: "de",
  },
];

const Footer = () => {
  const [language, setLanguage] = React.useState(Languages[0].value);
  return (
    <div className="w-full bg-[#F8F9FA] mt-3 sm:mt-[100px]">
      <div className="max-w-[1200px] px-[40px] mx-auto w-full pt-10 sm:pt-[80px] pb-[50px] text-[18px]">
        <div className="flex flex-col min-h-[100px] lg:flex-row justify-center items-center gap-10 lg:gap-0 lg:items-start lg:justify-between ">
          <div className="flex gap-3 items-start ">
            <img src={LogoImage} className="w-10" alt="logo" />
            <span className="font-black text-[20px]">interview bot</span>
          </div>

          <div className="flex flex-col md:flex-row flex-1 gap-20 md:gap-40 justify-center text-gray-600">
            <div className="flex flex-col gap-[10px] ">
              <span className="font-bold">Product</span>
              <span>Features</span>
              <span>Pricing</span>
            </div>

            <div className="flex flex-col gap-[10px] ">
              <span className="font-bold">Resources</span>
              <span>Blog</span>
              <span>User guides</span>
              <span>Webinars</span>
            </div>

            <div className="flex flex-col gap-[10px] ">
              <span className="font-bold">Company</span>
              <span>About</span>
              <span>Join us</span>
            </div>
          </div>

        </div>
        <div className="w-full h-[1px] mt-16 mb-6 bg-gray-300"></div>
        <div className="flex flex-col gap-6 lg:flex-row justify-between items-center">
          <div className="">
            <Select
              data={Languages}
              current={language}
              onChange={(v) => setLanguage(v)}
              className="!w-[200px]"
            />
          </div>
          <div className="flex gap-2 text-gray-700 font-[500] text-[13px] md:text-[18px]">
            <span className="mr-1">© InterviewBot.com.au</span>
          </div>

          <div className="text-gray-600 flex flex-row gap-4">
            <TwitterSVG width={22} />
            <FacebookSVG width={24} />
            <LinkedinSVG width={24} />
            <YoutubeSVG width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
