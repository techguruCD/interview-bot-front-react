import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Transition } from "@headlessui/react";

import ChatBox from '../components/ChatBox';

import { cn } from '../utils';

import { ReactComponent as SettingSVG } from '../assets/images/svgs/setting.svg'
import { ReactComponent as CloseSVG } from '../assets/images/svgs/close.svg'

function ConversationModal({ isOpen, onClose: handleClose, data }) {
  const [prompt, setPrompt] = useState(data?.prompt);
  const [greeting, setGreeting] = useState(data?.greeting);

  useEffect(() => {
    setPrompt(data?.prompt);
    setGreeting(data?.greeting);
  }, [data]);

  const handleSubmit = () => {
    // dispatch(setAvatar(imageUrl));
    // handleSave({
    //   prompt,
    //   greeting,
    // });
    // handleClose();
  };
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-60"
          onClick={handleClose}
        ></div>

        <div className="relative h-[80%] w-full max-w-2xl rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="h-[15%] flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Configure Bot
            </h3>
            <button
              type="button"
              className="bg-transparent ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <CloseSVG width={24} height={24} />
            </button>
          </div>
          <div className="scrollbar overflow-y-auto h-[70%] space-y-6 p-6">
            <div className="mb-6">
              <label
                htmlFor="prompt"
                className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
              >
                Prompt
              </label>
              <textarea
                id="prompt"
                rows={12}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Write your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="greeting"
                className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
              >
                Greeting Sentence
              </label>
              <input
                type="text"
                id="greeting"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your LinkedIn profile link here."
                required
                defaultValue={greeting}
                onChange={(e) => setGreeting(e.target.value)}
              />
            </div>
          </div>
          <div className="h-[15%] flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              OK
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default function ChatPage() {
  const bot = useSelector(state => state.app.bot)
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const greeting = useSelector((state) => state.app.bot?.greeting);
  const prompt = useSelector((state) => state.app.boot?.prompt);

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

      <ConversationModal
        isOpen={isConversationOpen}
        onClose={() => setIsConversationOpen(false)}
        data={bot}
      // onSave={handleConversationSave}
      />
    </div>
  )
}