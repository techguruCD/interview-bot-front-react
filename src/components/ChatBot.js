import React, { useEffect, useRef, useState } from 'react'

import { ChatBubbleLeftIcon, ArrowPathIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { cn } from '../utils';
import axios from 'axios';
import showToaster from '../utils/showToaster';

function Message({
  text,
  isRight = false,
  typing = false,
}) {

  return (
    <div
      className={cn({
        "flex gap-4 items-center max-w-[90%] flex-col flex-row my-2": true,
        "ml-auto justify-end": isRight,
      })}
    >
      <div className={`px-4 py-3 sm:py-6 bg-[#6355D830] rounded-md font-[500] max-w-[600px] ${typing && 'typing'} ${isRight ? 'bg-indigo-500 text-white' : 'bg-[#6355D830]'}`}>
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
}

export default function ChatBot() {
  const [messages, setMessages] = useState([])
  const [chatbotIndex, setChatbotIndex] = useState(0)
  const [typing, setTyping] = useState(false)
  const [payload, setPayload] = useState('')
  const inputTextarea = useRef(null)
  const chatBoxRef = useRef(null)

  const [isOpened, setIsOpened] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const payloadChanged = (e) => {
    inputTextarea.current.style.height = '1px';
    inputTextarea.current.style.height = `${inputTextarea.current.scrollHeight}px`;
    console.log(inputTextarea.current)
    setPayload(e.target.value)
  }

  const init = async () => {
    if (typing) return;
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/chatbot-init')
      setChatbotIndex(data.chatbotIndex)
      setMessages([
        { role: 'assistant', content: data.chatbotGreeting }
      ]);
    } catch (err) {

    }
  }

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault()
    if (typing) return;
    const content = payload;
    setMessages([...messages, { role: 'user', content }])
    setTimeout(scrollToBottom, 100)
    setPayload('')
    setTyping(true)
    axios.post(process.env.REACT_APP_API_URL + '/api/chatbot-sendMessage', { chatbotIndex, messages: [...messages, { role: 'user', content: payload }].slice(-5) })
      .then(({ data }) => {
        setMessages([...messages, { role: 'user', content }, { role: 'assistant', content: data.data }])
        setTimeout(scrollToBottom, 100)
      }).catch(err => {
        setMessages([...messages])
        showToaster(err?.response?.data?.message)
      }).finally(() => {
        setTyping(false)
      })
  };

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className='fixed bottom-20 right-4 z-[100]'>
        <div className={'fixed inset-0 flex flex-col flex-auto shrink-0 sm:relative sm:w-[420px] sm:h-[620px] sm:max-h-[80vh] shadow-md border rounded-md border-gray-200 bg-white ' + (isOpened ? '' : 'hidden')}>
          <div className='flex gap-3 justify-end border-b pb-4 m-4 mb-0'>
            <div className='w-5 cursor-pointer' onClick={init}>
              <ArrowPathIcon />
            </div>
            <div className='w-5 cursor-pointer' onClick={() => setIsOpened(false)}>
              <XMarkIcon />
            </div>
          </div>
          <div className='p-4 py-0 h-full flex flex-col overflow-auto'>
            <div className='h-full overflow-auto px-2' ref={chatBoxRef}>
              {
                messages.map((message, index) => (
                  <Message
                    text={message.content}
                    isRight={message.role === 'user'}
                    key={index}
                  />
                ))
              }
              {
                typing &&
                <Message
                  typing={true}
                  isRight={false}
                />
              }
            </div>
          </div>
          <div className='border-t flex p-4 items-end'>
            <textarea value={payload} placeholder='Message...' className='grow px-2 py-1 resize-none max-h-[90px] focus:outline-none focus-visible:outline-none' ref={inputTextarea} onKeyDown={handleKeyDown} onChange={payloadChanged} style={{ height: '32px' }} />
            <div className='w-6 cursor-pointer' onClick={handleSend}>
              <PaperAirplaneIcon />
            </div>
          </div>
        </div>

      </div>
      <div className='fixed bottom-4 right-4 z-[99] w-12 p-3 rounded-full bg-black cursor-pointer hover:scale-110 transition-all duration-200 ml-auto text-white' onClick={() => setIsOpened(!isOpened)}>
        {
          isOpened &&
          <XMarkIcon />
        }
        {
          !isOpened &&
          <ChatBubbleLeftIcon />
        }
      </div>
    </>
  )
}