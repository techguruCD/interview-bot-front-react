import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import copy from "clipboard-copy";
import { useSnackbar } from "notistack";
import { Transition } from "@headlessui/react";
import axios from 'axios';
import moment from 'moment'

import { ArchiveBoxXMarkIcon, ArrowPathRoundedSquareIcon, FolderOpenIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// import AvatarImage from '../assets/images/avatar.png'
import { ReactComponent as Linkedin } from "../assets/images/svgs/linkedin.svg";
import { ReactComponent as Website } from "../assets/images/svgs/website.svg";
import { ReactComponent as Copy } from '../assets/images/svgs/copy.svg'
import { ReactComponent as Check } from "../assets/images/svgs/check.svg";
import { ReactComponent as Pencil } from "../assets/images/svgs/pencil.svg";
import { ReactComponent as Arrow } from "../assets/images/svgs/arrow.svg";
import { ReactComponent as Close } from '../assets/images/svgs/close.svg'
import InterviewerImage from '../assets/images/interviewer.png'

import { setFiles, setLoading, setProfile } from '../store/appSlice'

import showToaster from '../utils/showToaster'
import convertJoiErrors2Errors from '../utils/convertJoiErrors2Errors';
import convertFile2Base64 from '../utils/convertFile2Base64'

function ProfileModal({
  isOpen,
  onClose: handleClose,
  profile
}) {
  const dispatch = useDispatch();

  const fileInput = useRef(null)
  const avatarInput = useRef(null)
  const [name, setName] = useState('')
  const [headline, setHeadLine] = useState('')
  const [about, setAbout] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [prompt, setPrompt] = useState('')
  const [greeting, setGreeting] = useState('')
  const [avatar, setAvatar] = useState('')
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setAvatar(profile?.avatar || '')
      setName(profile?.name || '')
      setHeadLine(profile?.headline || '')
      setAbout(profile?.about || '')
      setLinkedin(profile?.linkedin || '')
      setPrompt(profile?.prompt || '')
      setGreeting(profile?.greeting || '')
    }
  }, [isOpen])

  async function onAvatarChange(e) {
    const file = e.target?.files?.[0]
    if (!file) return;
    dispatch(setLoading(true))
    let fileData = await convertFile2Base64(file)
    avatarInput.current.value = null
    setAvatar(fileData)
    dispatch(setLoading(false))
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    dispatch(setLoading(true))
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/user/update-profile', {
        name, headline, about, linkedin, prompt, greeting, avatar
      })
      dispatch(setProfile(data.data))
      showToaster(data?.message)
      handleClose()
      setErrors(null)
    } catch (err) {
      showToaster(err?.response?.data?.message)
      if (err?.response?.data?.isJoi) {
        setErrors(convertJoiErrors2Errors(err.response.data.errors))
      } else {
        setErrors(err?.response?.data?.errors)
      }
    }
    dispatch(setLoading(false))
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
                <div className='w-full flex flex-col justify-center items-center'>
                  <div className="shrink-0 h-32 w-32 flex justify-center items-center">
                    <img
                      id="preview_img"
                      className="h-32 w-32 rounded-full object-cover"
                      src={avatar ? (typeof (avatar) == 'string' ? process.env.REACT_APP_API_URL + avatar : avatar.data) : InterviewerImage}
                      alt="User Avatar"
                    />
                    <input
                      accept='.jpg, .jpeg, .png'
                      type="file"
                      ref={avatarInput}
                      onChange={onAvatarChange}
                      hidden={true}
                    />
                  </div>
                  <div className='w-32 mt-2 px-2 flex justify-between'>
                    <ArrowPathRoundedSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => setAvatar(profile?.avatar || null)} />
                    <FolderOpenIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => avatarInput.current.click()} />
                    <ArchiveBoxXMarkIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => setAvatar(null)} />
                  </div>
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
                {errors?.name && <label className="block text-rose-700 font-medium">{errors?.name}</label>}
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
                {errors?.headline && <label className="block text-rose-700 font-medium">{errors?.headline}</label>}
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
                {errors?.about && <label className="block text-rose-700 font-medium">{errors?.about}</label>}
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
                {errors?.linkedin && <label className="block text-rose-700 font-medium">{errors?.linkedin}</label>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  Chat bot prompt
                </label>
                <textarea
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Chat bot prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
                {errors?.prompt && <label className="block text-rose-700 font-medium">{errors?.prompt}</label>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="linkedin"
                  className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                  Chat bot greeting
                </label>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Chat bot greeting here."
                  required
                  value={greeting}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                {errors?.greeting && <label className="block text-rose-700 font-medium">{errors?.greeting}</label>}
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
    </>
  )
}


function ProfielLink() {
  const profile = useSelector(state => state.app.profile)
  const url = useMemo(() => process.env.REACT_APP_API_URL + '/' + profile?.chatId)
  const { enqueueSnackbar } = useSnackbar();
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
      <span className="text-gray-300 text-ellipsis whitespace-nowrap max-w-[180px] sm:w-fit overflow-hidden">
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

function AttachmentFolder({
  isOpen,
  onClose: handleClose
}) {
  const dispatch = useDispatch()
  const files = useSelector(state => state.app.user?.profile?.files)
  const fileInput = useRef(null)
  async function onFileChange(e) {
    const file = e.target?.files?.[0]
    if (!file) return;
    dispatch(setLoading(true))
    let fileData = await convertFile2Base64(file)
    fileInput.current.value = null
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/user/add-file', fileData)
      dispatch(setFiles(data.data))
      showToaster(data.message)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }
  async function onDeleteFile(fileId) {
    dispatch(setLoading(true))
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/user/delete-file', { id: fileId })
      dispatch(setFiles(data.data))
      showToaster(data.message)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
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

          <div className="relative min-h-[300px] flex flex-col max-h-[90%] w-full max-w-2xl rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="h-[10%] flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Uploaded files
              </h3>
              <button
                type="button"
                className="bg-transparent ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
              >
                <Close width={24} height={24} />
              </button>
            </div>
            <div className="scrollbar grow overflow-y-auto h-[75%] space-y-2 p-6">
              <div className='flex'>
                <div className='flex rounded-md px-3 py-2 text-center font-semibold bg-indigo-500 hover:bg-indigo-400 text-white cursor-pointer ml-auto' onClick={() => fileInput.current.click()}>
                  <PlusCircleIcon className='w-6 mr-2' /> Add File
                </div>
                <input
                  accept='.pdf'
                  type="file"
                  ref={fileInput}
                  onChange={onFileChange}
                  hidden
                />
              </div>
              <div className='mx-2 overflow-x-auto'>
                {!!(!files || !files.length) &&
                  'No files'
                }
                {
                  !!files?.length &&
                  (<div className='inline-block min-w-full py-2 align-middle px-6'>
                    <div className='min-w-full divide-y divide-gray-300'>
                      <table className='min-w-full divide-y divide-gray-300'>
                        <thead>
                          <tr>
                            <th scope="col" className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                              Name
                            </th>
                            <th scope="col" className='py-3.5 pl-4 text-left text-sm font-semibold text-gray-900'>
                              Time
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                              {/* <ArchiveBoxXMarkIcon className="h-6 w-6 text-rose-500 cursor-pointer ml-auto"/> */}
                            </th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                          {files?.length &&
                            files.map((file, index) => (
                              <tr key={index}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                  <a className='underline text-indigo-500' href={process.env.REACT_APP_API_URL + file.path} target='_blank'>{file.name}</a>
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-600'>
                                  {moment.utc(file.createdAt).local().format('yyyy-MM-DD HH:mm:ss')}
                                </td>
                                <td className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                                  <ArchiveBoxXMarkIcon className="h-6 w-6 text-rose-500 cursor-pointer ml-auto" onClick={() => onDeleteFile(file.id)} />
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>)
                }
              </div>
            </div>
            <div className="h-[15%] flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
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

export default function ProfilePage() {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.app.profile);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAttachmentFolderOpen, setIsAttachmentFolderOpen] = useState(false)

  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className="flex flex-col gap-[20px] lg:flex-row items-center justify-between">
        <div className="flex items-center gap-1">
          <ProfielLink />
          <button className="text-[#6355D8] bg-[#6355D810] py-[7px] px-2 rounded-md text-[14px] hover:bg-[#6355D8] hover:text-white transition-all">
            Share
          </button>
        </div>
        {/* <div className="flex items-center gap-3">
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
        </div> */}
      </div>

      <div className="mt-[10px] flex flex-col p-5 border-[1px] rounded-md border-gray-200 gap-3">
        <div className="flex flex-col sm:flex-row justify-between w-full items-start gap-3">
          <div className="flex flex-row gap-6 items-center">
            <div className='w-[110px] h-[115px] flex justify-center items-center'>
              <img
                src={profile?.avatar ? process.env.REACT_APP_API_URL + profile?.avatar : InterviewerImage}
                className="w-[110px] h-[115px] rounded-full object-cover"
                alt="avatar"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[22px] font-[700] text-[#6355D8]">
                {profile?.name}
              </span>
              <span className="text-[17px] text-gray-500 font-[500]">
                {profile?.headline}
              </span>
              <div className="flex flex-row gap-2 mt-[5px]">
                <a
                  href={profile?.linkedin}
                  target="_blank"
                  className="cursor-pointer text-gray-700 hover:text-gray-950 transition-all"
                  rel="noreferrer"
                >
                  <Linkedin width={18} />
                </a>
              </div>
            </div>
          </div>

          <button
            className="text-[#6355D8] border-[#6355D8] bg-transparent border-[1px] rounded-md mr-10 px-8 py-[6px] hover:bg-[#6355D8] hover:text-white transition-all flex gap-3 items-center"
            onClick={() => setIsProfileOpen(true)}
          >
            <Pencil width={16} />
            <span>Edit profile</span>
          </button>
        </div>

        <div className="mt-10 pb-[100px]">
          <span className="text-[20px] font-bold">About me</span>
          <p className="mt-2 text-gray-700 font-[500]">{profile?.about}</p>
        </div>

        <div className='mt-10 px-6'>
          <ul className='list-disc'>
            {(profile?.files || []).map((file, index) => (
              <li key={index}>
                <a href={process.env.REACT_APP_API_URL + file.path} className='underline' target='_blank'>{file.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pb-[100px] text-[20px] font-bold">
          {/* To see attached CV: <a href={process.env.REACT_APP_API_URL + profile.file} target='_blank' className='text-indigo-600 underline'>CLICK HERE</a> */}
          <span className='max-w-64'>Provide your CV & Q&A documents so your bot knows your work history: </span>
          <span onClick={() => setIsAttachmentFolderOpen(true)} className="cursor-pointer text-rose-600 underline">Upload</span>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
      />
      <AttachmentFolder
        isOpen={isAttachmentFolderOpen}
        onClose={() => setIsAttachmentFolderOpen(false)}
        profile={profile}
      />
    </div>
  )
}