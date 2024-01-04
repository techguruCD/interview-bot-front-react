import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Transition } from "@headlessui/react";
import { ReactComponent as Close } from '../assets/images/svgs/close.svg'

export default function BlogModal({
  isOpen, handleClose, blog
}) {
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

        <div className="relative h-[90%] w-full max-w-2xl rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="h-[10%] flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Blog
            </h3>
            <button
              type="button"
              className="bg-transparent ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <Close width={24} height={24} />
            </button>
          </div>
          <div className="scrollbar overflow-y-auto h-[75%] space-y-6 p-6">
            {
              !!(blog?.image) &&
              <div className="flex items-center space-x-6">
                <div className='w-full flex flex-col justify-center items-center'>
                  <div className="shrink-0 flex justify-center items-center">
                    <img
                      id="preview_img"
                      className="rounded-xl"
                      src={process.env.REACT_APP_API_URL + blog?.image}
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </div>
            }
            <div className="mb-6 text-wrap w-full font-bold text-xl" style={{overflowWrap: 'anywhere'}}>
              {blog?.title}
            </div>
            <div className="mb-6 whitespace-pre-line" style={{overflowWrap: 'anywhere'}}>{blog?.content}</div>
          </div>
          <div className="h-[15%] flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}