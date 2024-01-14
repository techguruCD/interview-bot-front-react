import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chatbot from '../assets/images/chatbot.png'
import { ReactComponent as RightToLeftFlow } from '../assets/images/RightToLeftFlow.svg'
import { ReactComponent as LeftToRightFlow } from '../assets/images/LeftToRightFlow.svg'
import QuicknEasyImage from '../assets/images/quickneasy.svg'
import TechSkillsImage from '../assets/images/techskills.svg'
import SimpleToTrainImage from '../assets/images/simpletotrain.svg'
import VirtualYouImage from '../assets/images/virtualyou.svg'
import FriendsImage from '../assets/images/friends.svg'
import { useSelector } from 'react-redux';
import axios from 'axios';
import EmptyImage from '../assets/images/emptyImage.png'
import showToaster from '../utils/showToaster';
import BlogModal from '../components/BlogModal';

const sliderSettings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  infinite: false
};

const SimpleSlider = () => {
  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: false
  };

  return (
    <Slider {...sliderSettings}>
      <div>
        <img src="http://placekitten.com/g/400/400" alt="randomOne" />
        {/* <img height={300} width={300} alt="ricardavatar" src="/images/rikardslider.png" />
        <button className="text-white p-4 bg-[#6355d8]">Chat with Rikard's interview bot</button> */}
      </div>
      <div>
        <img src="http://placekitten.com/g/400/400" alt="randomTwo" />
        {/* <img height={300} width={300} alt="brionyavatar" src="/images/brionyslider.png" />
        <button className="text-white p-4 bg-[#6355d8]">Chat with Briony's interview bot</button> */}
      </div>
      <div>
        <img src="http://placekitten.com/g/400/400" alt="randomThree" />
        {/* <img height={300} width={300} alt="neilavatar" src="/images/neilslider.png" />
        <button className="text-white p-4 bg-[#6355d8]">Chat with Neil's interview bot</button> */}
      </div>
      <div>
        <img src="http://placekitten.com/g/400/400" alt="randomThree" />
        {/* <img height={300} width={300} alt="neilavatar" src="/images/neilslider.png" />
        <button className="text-white p-4 bg-[#6355d8]">Chat with Neil's interview bot</button> */}
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
}

const Features = () => {
  return (
    <>
      <div>
        <div className="flex-flex-col xl:flex gap-4 lg:gap-[100px] mb-2 md:mb-4">
          <p className="text-[24px] md:text-[40px] lg:text-[40px] 2xl:text-[64px] whitespace-nowrap font-medium leading-normal text-center">
            Building your Interview Bot
          </p>
          <p className="text-[20px] md:text-[24px] text-center md:text-justify font-light leading-8">
            You want the job. Use Generative AI to get it.
          </p>
        </div>
        <div className="flex flex-col md:flex md:flex-row md:justify-between mt-10 lg:mt-5 xl:mt-10 mb-10 relative">
          <div className="flex justify-center md:flex md:justify-start">
            <img
              src={QuicknEasyImage}
              alt="quickneasy"
              className=" w-[110px] md:w-[210px] lg:w-[270px] 2xl:w-[340px] h-[110px] md:h-[210px] lg:h-auto"
            />
          </div>
          <div className="flex flex-col justify-center md:flex md:justify-center">
            <p className="text-3xl font-bold capitalize mt-[12px] mb-[12px] text-center md:text-right">
              Quick & Easy
            </p>
            <p className="font-normal mt-[12px] text-[24px] leading-[29px] capitalize text-center md:text-right">
              Set up your Interview Bot for free in minute
            </p>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-end 2xl:flex 2xl:justify-center mt-[-40px] lg:mr-20 2xl:mr-0 2xl:ml-20 ">
          <RightToLeftFlow />
        </div>
        <div className="my-10">
          <div className="flex flex-col-reverse  md:flex md:flex-row md:justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-bold capitalize mt-[12px] mb-[12px] text-center md:text-left">
                no tech skills required
              </p>
              <p className="font-normal mt-[12px] mb-[12px] text-[24px] leading-[29px] capitalize text-center md:text-left">
                As simple as opening a file / clicking a URL
              </p>
            </div>
            <div className="flex justify-center md:flex md:justify-end">
              <img
                src={TechSkillsImage}
                alt="techskills"
                className="w-[110px] md:w-[210px] lg:w-[270px] 2xl:w-[340px] h-[110px] md:h-[210px] lg:h-auto"
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-end 2xl:flex 2xl:justify-center 2xl:ml-[180px] mt-[-40px] mr-20">
          <LeftToRightFlow />
        </div>
        <div className="flex flex-col md:flex md:flex-row md:justify-between mt-10 lg:mt-5 xl:mt-10 mb-10 relative">
          <div className="flex justify-center md:flex md:justify-start">
            <img
              src={SimpleToTrainImage}
              alt="simpletotrain"
              className="w-[110px] md:w-[210px] lg:w-[270px] 2xl:w-[340px] h-[110px] md:h-[210px] lg:h-auto"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-bold capitalize mt-[12px] mb-[12px] text-center md:text-right">
              Simple to train{" "}
            </p>
            <p className="font-normal  w-auto lg:w-[387px] 2xl:w-[480px] mt-[12px] text-[24px] leading-[29px] capitalize text-center md:text-right">
              Upload your CV, Linkedin Profile, Cover Letters and more
            </p>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-end 2xl:flex 2xl:justify-center mt-[-40px] lg:mr-20 2xl:mr-0 2xl:ml-20 ">
          <RightToLeftFlow />
        </div>
        <div className="">
          <div className="flex flex-col-reverse  md:flex md:flex-row md:justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-3xl font-bold capitalize mt-[12px] mb-[12px] text-center md:text-left">
                See a virtual you
              </p>
              <p className="font-normal text-[24px] md:w-[80%] leading-[29px] capitalize text-center md:text-left">
                Train your bot to answer questions as you would in an interview
              </p>
            </div>
            <div className="flex justify-center md:flex md:justify-end">
              <img
                src={VirtualYouImage}
                alt="virtualyou"
                className="w-[110px] md:w-[210px] lg:w-[270px] 2xl:w-[340px] h-[110px] md:h-[210px] lg:h-auto"
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-end 2xl:flex 2xl:justify-center mt-[30px] mb-[20px] lg:mr-20 2xl:mr-0 2xl:ml-20 ">
          <LeftToRightFlow />
        </div>
        <div className="flex flex-col md:flex md:flex-row md:justify-between lg:flex lg:flex-row lg:justify-between mt-10 lg:mt-5 xl:mt-10 mb-10 relative">
          <div className="flex justify-center md:flex md:justify-start">
            <img
              src={FriendsImage}
              alt="friends"
              className="w-[110px] md:w-[210px] lg:w-[270px] 2xl:w-[340px] h-[110px] md:h-[210px] lg:h-auto"
            />
          </div>
          <div className="flex flex-col justify-center md:flex md:flex-col md:justify-center">
            <p className="text-3xl font-bold capitalize mt-[12px] mb-[12px] text-center md:text-right">
              Have fun with friends
            </p>
            <p className="font-normal mt-[12px] text-[24px] leading-[29px] capitalize text-center md:text-right">
              Engage Banter Mode to share with friends
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Card = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="pt-[24px]">
        <div className="bg-black max-w-[285px] flex flex-col justify-between  h-[245px] rounded-lg p-2 ">
          <div className="p-4">
            <p className="text-purple-400 font-bold text-[24px] md:text-[28px] lg:text-[36px] leading-10">
              Get The Job{" "}
            </p>
            <p className="text-white capitalize font-medium text-[20px] md:text-[24px] leading-[30px]">
              Stand Out From Other Applicants
            </p>
          </div>
          <p className="text-white font-medium text-[20px] md:text-[24px]"></p>
        </div>
      </div>
      <div className="pb-0 md:pb-[24px]">
        <div className="bg-[#E16DDE] max-w-[388px] h-[230px]  rounded-lg p-2 ">
          <div className="p-4">
            <p className="text-white font-bold text-[24px] md:text-[28px] lg:text-[36px]">Show You Know</p>
            <p className="text-black text-[20px] md:text-[24px] flex flex-wrap font-medium leading-7 capitalize">
              Demonstrate your understanding of Artificial Intelligence
            </p>
          </div>
          <p className="text-white font-medium text-[20px] md:text-[24px]"></p>
        </div>
      </div>
      <div>
        <div className="bg-black max-w-[310px] lg:max-w-[300px] 2xl:max-w-[460px] h-[210px] mt-0 md:mt-[12px] rounded-lg p-2 flex flex-col justify-between ">
          <div className="p-4">
            <p className="text-pink-400 font-bold text-[24px]  md:text-[28px] lg:text-[36px] leading-10">
              Learn and Improve
            </p>
            <p className="text-white font-medium text-[20px] md:text-[24px] leading-[30px]">
              Know where your CV / resume could be improved
            </p>
          </div>
          <p className="text-pink-400 font-medium text-[20px] md:text-[24px]"></p>
        </div>
      </div>
      <div className="pl-[20px] md:pl-[75px] pb-0 md:pb-[24px]">
        <div className="bg-[#6355D8] max-w-[310px] lg:max-w-[310px] 2xl:max-w-[489px] h-[242px] rounded-lg p-2 flex flex-col justify-between ">
          <div className="p-4">
            <p className="text-black font-bold text-[24px]  md:text-[28px] lg:text-[36px] leading-10">
              Raise your Social Profile
            </p>
            <p className="text-white capitalize font-medium text-[20px] md:text-[24px] leading-7">
              Add it to your Linked in Profile to raise engagement
            </p>
          </div>
          <p className="text-black font-medium text-[20px] md:text-[24px]"></p>
        </div>
      </div>
      <div className="pt-0 md:pt-3">
        <div className="bg-black max-w-[487px] h-[253px] rounded-lg p-2 flex flex-col justify-between ">
          <div className="p-4">
            <p className="text-white font-bold mt-[12px] text-[24px] md:text-[28px] lg:text-[36px] leading-10">
              Have fun{" "}
            </p>
            <p className="text-[#E16DDE] capitalize font-medium text-[20px] md:text-[24px] leading-[30px]">
              Engage banter mode and send to your friends
            </p>
          </div>
          <p className="text-white font-medium text-[20px] md:text-[24px]"></p>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  return (
    <>
      <div className="mt-12 mb-12 pb-2">
        <div>
          <h1 className="text-[28px] text-center whitespace-nowrap md:text-[48px] lg:text-[64px] mb-5 lg: font-medium leading-normal">
            Interview Bot helps you
          </h1>
          <div className="">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default function LandingPage() {
  const isAuthenticated = useSelector(state => state.app.token)
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
    axios.get(process.env.REACT_APP_API_URL + '/api/blogs').then(({ data }) => {
      setBlogs(data.blogs)
    }).catch(err => { })
  }, [])
  function makeInterviewBotClickedf() {
    if (isAuthenticated) {
      navigate('/profile')
    } else {
      navigate('/signup')
    }
  }
  async function openBlog(id) {
    try {
      const { data: {blog} } = await axios.get(process.env.REACT_APP_API_URL + '/api/blog', { params: { id } })
      setIsBlogModalOpen(true)
      console.log(blog)
      setSelectedBlog(blog)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
  }
  return (
    <div id="home" className="mx-[20px] md:mx=[40px] lg:mx-32">
      <div className="mt-4 lg:mt-[12px] pb-2">
        <div className="flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-evenly">
          <div className="">
            <div className="max-w-[739px] whitespace-nowrap lg:whitespace-pre-wrap font-bold text-[28px] md:text-[48px] lg:text-[64px] xl:text-[100px] 2xl:text-[128px] mb-[10px] leading-tight text-center lg:text-left">
              <span className="lg:line-clamp-1">Interview </span>
              the{" "}
              <span className="font-bold  text-[28px] md:text-[48px] lg:text-[64px] xl:text-[100px] 2xl:text-[128px] text-[#6355D8]">
                AI
              </span>{" "}
              you.
            </div>
            <p className="mb-4 font-normal text-[24px] text-center md:text-left leading-normal">
              Upload Your CV/Resume And Talk To Your AI Chatbot in 5 Mins Or
              Less
            </p>
            <div className="flex justify-center lg:flex lg:justify-center 2xl:flex 2xl:justify-end ">
              <a onClick={makeInterviewBotClickedf}
                className="flex cursor-pointer justify-center items-center mb-4 xl:mr-[-24rem] 2xl:mr-[-0px] whitespace-nowrap w-[270px] md:w-auto h-[60px] md:h-auto rounded-full border-[1px] text-[20px] md:text-[24px] font-semibold border-[#6355D8] text-[#6355D8] gap-2 p-4 lg:p-4"
              >
                Make your Interview bot
                <div className="hidden md:flex mt-[10px]">
                  <svg
                    width="33"
                    height="20"
                    viewBox="0 0 33 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9.75L32.4545 9.75"
                      stroke="#6355D8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.9728 4.26562L32.4546 9.75L26.9728 15.2344"
                      stroke="#6355D8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <div className="flex justify-center h-[285px] w-[340px]  lg:h-[380px] lg:w-[540px]">
            <img src={chatbot} alt="Dashboard Bot" />
          </div>
        </div>
        <div className="mb-[70px]">
          <Benefits />
        </div>
        <div>
          <Features />
        </div>
        <div className="mt-10">
          <div>
            <div className="">
              <p className="text-[28px] lg:text-[48px] font-medium leading-[55px] mb-[4px] lg:mb-[20px] text-center">
                Want to interview a bot?{" "}
              </p>
              <p className="text-[20px] font-normal text-center leading-7">
                Who wouldn&apos;t? Select a professional below and grill them
                as you see fit
              </p>
            </div>
            {/* <div className="flex flex-wrap justify-evenly gap-4 mt-4">
                <img src={"/images/rikard.png"} alt="rikard" />
                <img src={"/images/briony.png"} alt="briony" />
                <img src={"/images/neil.png"} alt="neil" />
              </div> */}
            {/* <Slider {...sliderSettings}>
                <div className="mt-6">
                  <div className="flex flex-col justify-center ">

                    <img className="" src={"/images/rikard.png"} alt="rikard" />
                    <img alt="ricardavatar" src="/images/rikardslider.png" />
                    <button className=" text-white p-4  bg-[#6355d8]">Chat with Rikard&apos;s interview bot</button>
                  </div>

                  <div className="flex flex-col justify-center ">
                    <img src={"/images/briony.png"} alt="briony" />
                    <img alt="brionyavatar" src="/images/brionyslider.png" />
                    <button className=" text-white p-4  bg-[#6355d8]">Chat with Briony&apos;s interview bot</button>
                  </div>
                  <div className="flex flex-col justify-center mt-4">
                    <img className="" src={"/images/neil.png"} alt="neil" />
                    <img className="" alt="neilavatar" src="/images/neilslider.png" />
                    <button className=" text-white p-4  bg-[#6355d8]">Chat with Neil&apos;s interview bot</button>
                  </div>
                </div>

              </Slider> */}
          </div>
        </div>
        <div className="mt-[40px]">
          <SimpleSlider />
        </div>
        <section id="blog">
          <div className="mt-20 mb-20">
            <div>
              <div className="mb-6 mt-6">
                <p className=" text-[28px] lg:text-5xl text-center font-medium mb-[10px]">
                  Article Below
                </p>
                <p className="text-2xl text-center font-normal mb-[12px] leading-8">
                  Learn how your Interview Bot uses AI to act as you in the
                  interview process
                </p>
              </div>
              {
                !blogs.length && <div className='text-center text-lg text-gray-400'>No articles</div>
              }
              {
                !!blogs.length && <Slider {...sliderSettings}>
                  {
                    blogs.map(blog => (
                      <div key={blog.id} className="flex flex-col justify-center items-center">
                        <div className='p-4'>
                          <img className='rounded-xl' src={blog.image ? process.env.REACT_APP_API_URL + blog.image : EmptyImage} />
                        </div>
                        <p onClick={() => openBlog(blog.id)}
                          className="cursor-pointer text-[28px] underline mb-[12px] font-medium leading-8 text-center max-w-[100%] whitespace-nowrap overflow-hidden text-ellipsis">
                          {blog.title}
                        </p>
                        {/* <p className="text-[20px] font-normal mb-[12px] leading-7 text-center max-w-[100%] whitespace-nowrap overflow-hidden text-ellipsis">
                          {blog.content}
                        </p> */}
                        <p className="text-[20px] font-light text-center leading-6">
                          August 19,2023
                        </p>
                      </div>
                    ))
                  }
                </Slider>
              }
            </div>
          </div>
        </section>
      </div>
      <BlogModal blog={selectedBlog} isOpen={isBlogModalOpen} handleClose={() => setIsBlogModalOpen(false)}/>
    </div>
  )
}