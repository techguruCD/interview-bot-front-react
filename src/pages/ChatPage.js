import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import ChatBox from '../components/ChatBox';

import { cn } from '../utils';

import { ReactComponent as SettingSVG} from '../assets/images/svgs/setting.svg'

export default function ChatPage() {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const { greeting, prompt } = useSelector((state) => state.app);

  const [conversationModalData, setConversationModalData] = useState({
    prompt: "",
    greeting: "",
  });

  const handleConversationChange = () => {
    setConversationModalData({
      prompt,
      greeting,
    });
    setIsConversationOpen(true);
  };

  // const handleConversationSave = (data) => {
  //   dispatch(setPrompt(data.prompt));
  //   dispatch(setGreeting(data.greeting));
  // };

  // const closeConversationModal = () => {
  //   setIsConversationOpen(false);
  // };
  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className="mt-[50px] p-2 border-[1px] border-gray-200 rounded-md">
        <div className="flex justify-between p-2 md:p-4 pb-2 sm:pb-6 border-b-[1px] border-gray-200 mb-[15px] sm:mb-[30px]">
          <span className="font-bold text-[15px] sm:text-[20px]">
            Chat to my interview bot
          </span>
          <button
            className="text-[#6355D8] border-[#6355D8] bg-transparent border-[1px] rounded-md md:mr-10 px-1 md:px-5 py-1 hover:bg-[#6355D8] hover:text-white transition-all flex gap-2 items-center"
            onClick={handleConversationChange}
          >
            <SettingSVG width={18} />
            <span className="hidden md:block">Configure interview bot</span>
          </button>
        </div>

        <ChatBox greeting={greeting} prompt={prompt} />
      </div>

      {/* <ConversationModal
        isOpen={isConversationOpen}
        onClose={closeConversationModal}
        data={conversationModalData}
        onSave={handleConversationSave}
      /> */}
    </div>
  )
}