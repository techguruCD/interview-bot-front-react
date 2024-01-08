import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cn } from '../utils';
import axios from 'axios';
import showToaster from '../utils/showToaster';
import convertJoiErrors2Errors from '../utils/convertJoiErrors2Errors';

import { ReactComponent as MicrophoneSVG } from '../assets/images/svgs/microphone.svg'
import { ReactComponent as AirplaneSVG } from '../assets/images/svgs/airplane.svg'
import InterviewerImage from '../assets/images/interviewer.png'
import { setLoading } from '../store/appSlice';
import '../assets/css/message.css'

const Message = ({
  text = '',
  avatar,
  isRight = false,
  typing = false,
  name = ''
}) => {
  return (
    <div
      className={cn({
        "flex gap-4 items-center max-w-[90%] flex-col md:flex-row mt-4 md:mt-2": true,
        "md:flex-row-reverse md:ml-auto": isRight,
      })}
    >
      <div className='flex flex-col items-center text-center font-bold'>
        <img src={avatar} className="rounded-full w-10 sm:w-12 md:w-14" />
        {name}
      </div>
      <div className={`px-4 py-3 sm:py-6 bg-[#6355D830] rounded-md font-[500] max-w-[600px] ${typing && 'typing'}`}>
        {text}
        {
          typing &&
          <>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </>
        }
      </div>
    </div>
  );
};

export default function ChatPage() {
  const dispatch = useDispatch()
  let { chatId } = useParams()
  const [profile, setProfile] = useState(null)

  const [isValidChat, setIsValidChat] = useState(false)
  const chatBoxRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [payload, setPayload] = useState("");
  const [typing, setTyping] = useState(false)
  const [interviewerIndex, setInterviewerIndex] = useState(0)

  const handleSend = async (e) => {
    if (typing) return;
    const content = payload;
    setHistory([...history, { role: 'user', content }])
    setPayload('')
    setTyping(true)
    axios.post(process.env.REACT_APP_API_URL + '/api/user/chat', { chatId, interviewerIndex, messages: [...history, { role: 'user', content: payload }].slice(-5) })
      .then(({ data }) => {
        setHistory([...history, { role: 'user', content }, { role: 'assistant', content: data.data }])
      }).catch(err => {
        showToaster(err?.response?.data?.message)
      }).finally(() => {
        setTyping(false)
      })
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    (async function () {
      dispatch(setLoading(true))
      try {
        const { data: { data, interviewerIndex } } = await axios.post(process.env.REACT_APP_API_URL + '/api/user/chat-init', { chatId })
        setProfile(data)
        setHistory([{ role: 'assistant', content: data.greeting }]);
        setIsValidChat(true)
        setInterviewerIndex(interviewerIndex)
      } catch (err) {
        showToaster(err?.response?.data?.message || { error: 'Please try again later' })
      }
      dispatch(setLoading(false))
    })()
  }, [])

  if (!isValidChat) {
    return <></>
  }
  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className="mt-[50px] p-2 border-[1px] border-gray-200 rounded-md">
        <div className="flex min-h-[500px] flex-col w-full justify-between px-2 sm:px-10 mb-3 sm:mb-20">
          <div className="flex justify-between p-2 md:p-4 pb-2 sm:pb-6 border-b-[1px] border-gray-200 mb-[15px] sm:mb-[30px]">
            <span className="font-bold text-[15px] sm:text-[20px]">
              Chat to {profile?.name}'s interview bot
            </span>
          </div>
          <div
            ref={chatBoxRef}
            className="flex flex-col items-center md:items-start gap-3 sm:gap-8 mb-3 sm:mb-8 text-[14px] sm:text-[16px] max-h-[500px] overflow-y-auto scrollbar px-4"
          >
            {history &&
              history.flat().map((item, index) => (
                <Message
                  text={item.content}
                  avatar={
                    (item.role == 'user' || !profile?.avatar) ? InterviewerImage : process.env.REACT_APP_API_URL + profile?.avatar
                  }
                  isRight={item.role == 'user'}
                  key={index}
                  name={item.role == 'user' ? <>Interview Bot<br />(You)</> : profile?.name}
                />
              ))
            }
            {
              typing &&
              <Message
                typing={true}
                avatar={!(profile?.avatar) ? InterviewerImage : process.env.REACT_APP_API_URL + profile?.avatar}
                isRight={false}
                name={profile?.name}
              />
            }
          </div>
          <div>
            <div className="flex items-center pr-4 gap-3 border-[1px] border-[#6355D8] rounded-md mt-5 sm:mt-0">
              <input
                className="py-2 px-4 w-full bg-transparent"
                placeholder="Send your message"
                value={payload}
                onChange={(e) => {
                  setPayload(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className="flex gap-3 text-gray-500">
                {/* <button>
                  <MicrophoneSVG width={20} />
                </button> */}
                <button onClick={handleSend}>
                  <AirplaneSVG width={20} className="-rotate-45" />
                </button>
              </div>
            </div>
            <p className="text-center mt-4 text-gray-600 text-[14px] sm:text-[16px]">
              Interview Bot may produce inaccurate information about people, places,
              of fact.{" "}
              <span className="text-[#6355D8] underline">Privacy Notice</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}