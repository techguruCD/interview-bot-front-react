import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import copy from "clipboard-copy";
import { useSnackbar } from "notistack";
import { Transition } from "@headlessui/react";
import axios from 'axios';

import AvatarImage from '../assets/images/avatar.png'
import { ReactComponent as Linkedin } from "../assets/images/svgs/linkedin.svg";
import { ReactComponent as Website } from "../assets/images/svgs/website.svg";
import { ReactComponent as Copy } from '../assets/images/svgs/copy.svg'
import { ReactComponent as Check } from "../assets/images/svgs/check.svg";
import { ReactComponent as Pencil } from "../assets/images/svgs/pencil.svg";
import { ReactComponent as Arrow } from "../assets/images/svgs/arrow.svg";
import { ReactComponent as Close } from '../assets/images/svgs/close.svg'

import { setDraftProfile, setProfile } from '../store/appSlice'

import showToaster from '../utils/showToaster'

function ProfileModal({
  isOpen,
  onClose: handleClose,
  profile
}) {
  const dispatch = useDispatch()
  const fileInput = useRef(null)
  const [name, setName] = useState('')
  const [headline, setHeadLine] = useState('')
  const [about, setAbout] = useState('')
  const [website, setWebsite] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)
  const [file, setFile] = useState(null)
  const [isFileChanged, setIsFileChanged] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setName(profile?.name || '')
      setHeadLine(profile?.headline || '')
      setAbout(profile?.about || '')
      setWebsite(profile?.website || '')
      setLinkedin(profile?.linkedin || '')
    }
  }, [isOpen])

  async function convertFile2Base64(file) {
    let fileData = {}
    fileData.content2FileType = file.type
    fileData.content2Extension = file.name.split('.').pop()
    fileData.name = file.name
    await (new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function () {
        fileData.data = reader.result
        resolve()
      }
    }))
    return fileData;
  }

  async function onFileChange(e) {
    const file = e.target?.files?.[0]
    if (!file) return;
    let fileData = await convertFile2Base64(file)
    fileInput.current.value = null
    setFile(fileData)
    setIsFileChanged(true)
  }

  async function handleSubmit(e) {
    e?.preventDefault()
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/user/draft-profile', {
        name, headline, about, website, linkedin, avatar, isFileChanged, file
      })
      dispatch(setDraftProfile(data.data))
      showToaster(data?.message)
      handleClose()
    } catch (err) {
      showToaster(err.response.data.message)
    }
  }

  return (
    <>
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
                Edit User Profile
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
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <img
                    id="preview_img"
                    className="h-32 w-32 rounded-full object-cover"
                    src={avatar != '' ? avatar : AvatarImage}
                    alt="User Avatar"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  User name
                </label>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="User name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Gaming is Awesome!"
                  required
                  value={headline}
                  onChange={(e) => setHeadLine(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  About
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Add a summary of your career, aspirations and interests"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="website"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Your website link here."
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="linkedin"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  id="linkedin"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Your LinkedIn profile link here."
                  required
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className='mb-6'>
                <label className="mb-2 block text-base font-medium text-gray-900 dark:text-white">
                  Attach file
                </label>
                <input
                  accept='.pdf'
                  id="file_input"
                  type="file"
                  ref={fileInput}
                  onChange={onFileChange}
                  className="text-slate-500 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {/* <div className="mb-6">
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
            </div> */}
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
    </>
  )
}


function ProfielLink() {
  const { enqueueSnackbar } = useSnackbar();
  const url = "https://www.linkedin.com/in/neiljaitken/";
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    copy(url);
    setCopied(true);

    enqueueSnackbar(`Copied!`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  return (
    <div
      className="flex gap-4 border-1 border-gray-400 text-[14px] py-[6px] px-[10px] rounded-[4px] items-center cursor-pointer"
      onClick={() => handleCopy()}
    >
      <span className="font-bold text-gray-500 w-fit flex-1 whitespace-nowrap">
        Profile link
      </span>
      <span className="text-gray-300 text-ellipsis whitespace-nowrap max-w-[140px] sm:w-fit overflow-hidden">
        {url}
      </span>

      {copied ? (
        <div className="text-green-400">
          <Check width={20} />
        </div>
      ) : (
        <Copy width={20} />
      )}
    </div>
  );
}

export default function ProfilePage() {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.app.profile);
  const draftProfile = useSelector(state => state.app.draftProfile)
  const visibleProfile = useMemo(() => (draftProfile || profile), [profile, draftProfile])
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  async function onPublish() {
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/user/publish-profile')
      showToaster(data?.message)
      dispatch(setProfile(data.data))
      dispatch(setDraftProfile(null))
    } catch (err) {
      showToaster(err?.response?.data?.message)
    }
  }

  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className="flex flex-col gap-[20px] lg:flex-row items-center justify-between">
        <div className="flex items-center gap-1">
          <ProfielLink />
          <button className="text-[#6355D8] bg-[#6355D810] py-[7px] px-2 rounded-md text-[14px] hover:bg-[#6355D8] hover:text-white transition-all">
            Share
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Don&apos;t forget to publish your latest updates
            </span>
          </div>
          <button
            className="border-transparent uppercase border-[1px] bg-[#6355D8] text-white py-2 px-7 rounded-md text-[14px] hover:bg-white hover:border-[#6355D8] hover:text-[#6355D8] transition-all flex gap-2 items-center"
            onClick={onPublish}>
            <span>Publish</span>
            <Arrow width={16} />
          </button>
        </div>
      </div>

      <div className="mt-[10px] flex flex-col p-5 border-[1px] rounded-md border-gray-200 gap-3">
        <div className="flex flex-col sm:flex-row justify-between w-full items-start gap-3">
          <div className="flex flex-row gap-6 items-center">
            <img
              src={visibleProfile?.avatar || AvatarImage}
              className="w-[110px] h-[115px] rounded-full object-cover"
              alt="avatar"
            />
            <div className="flex flex-col gap-[2px]">
              <span className="text-[22px] font-[700] text-[#6355D8]">
                {visibleProfile?.name}
              </span>
              <span className="text-[17px] text-gray-500 font-[500]">
                {visibleProfile?.headline}
              </span>
              <div className="flex flex-row gap-2 mt-[5px]">
                <a
                  href={visibleProfile?.linkedin}
                  target="_blank"
                  className="cursor-pointer text-gray-700 hover:text-gray-950 transition-all"
                  rel="noreferrer"
                >
                  <Linkedin width={18} />
                </a>
                <a
                  href={visibleProfile?.website}
                  target="_blank"
                  className="cursor-pointer text-gray-700 hover:text-gray-950 transition-all my-auto"
                  rel="noreferrer"
                >
                  <Website width={14} />
                </a>
              </div>
            </div>
          </div>

          <button
            className="text-[#6355D8] border-[#6355D8] bg-transparent border-[1px] rounded-md mr-10 px-8 py-[6px] hover:bg-[#6355D8] hover:text-white transition-all flex gap-3 items-center"
            onClick={() => setIsProfileOpen(true)}
          >
            <Pencil width={16} />
            <span>Edit Public profile</span>
          </button>
        </div>

        <div className="mt-10 pb-[100px]">
          <span className="text-[20px] font-bold">About me</span>
          <p className="mt-2 text-gray-700 font-[500]">{visibleProfile?.about}</p>
        </div>
        <div className="mt-10 pb-[20px]">
          <label className="block">
            <input
              id="file_input"
              type="file"
              multiple
              accept=".docx,.pdf"
              // onChange={handleUpload}
              className="text-slate-500 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </label>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={visibleProfile}
      />
    </div>
  )
}