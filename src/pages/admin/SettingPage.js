import React, { useEffect, useRef, useState } from 'react'
import showToaster from '../../utils/showToaster'
import axios from 'axios'
import convertJoiErrors2Errors from '../../utils/convertJoiErrors2Errors'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/appSlice'
import moment from 'moment'
import { ArchiveBoxXMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import convertFile2Base64 from '../../utils/convertFile2Base64'

export default function SettingPage() {
    const dispatch = useDispatch()
    const [usersLimit, setUsersLimit] = useState(0)
    const [sitePrompt, setSitePrompt] = useState('')
    const [chatbotGreeting, setChatbotGreeting] = useState('')
    const [chatbotPrompt, setChatbotPrompt] = useState('')
    const [chatbotFiles, setChatbotFiles] = useState([])
    const [errors, setErrors] = useState(null)

    const fileInput = useRef(null)

    async function onFileChange(e) {
        const file = e.target?.files?.[0]
        if (!file) return;
        dispatch(setLoading(true))
        let fileData = await convertFile2Base64(file)
        fileInput.current.value = null
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/setting-add-file', fileData)
            setChatbotFiles(data.data)
            showToaster(data.message)
        } catch (err) {
            showToaster(err?.response?.data?.message || { error: 'Please try again later' })
        }
        dispatch(setLoading(false))
    }
    async function onDeleteFile(fileId) {
        dispatch(setLoading(true))
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/setting-delete-file', { id: fileId })
            setChatbotFiles(data.data)
            showToaster(data.message)
        } catch (err) {
            showToaster(err?.response?.data?.message || { error: 'Please try again later' })
        }
        dispatch(setLoading(false))
    }

    const loadSetting = async () => {
        dispatch(setLoading(true))
        try {
            const { data: { data } } = await axios.get(process.env.REACT_APP_API_URL + '/api/admin/setting')
            setUsersLimit(data.usersLimit)
            setSitePrompt(data.sitePrompt)
            setChatbotGreeting(data.chatbotGreeting)
            setChatbotPrompt(data.chatbotPrompt)
            setChatbotFiles(data.chatbotFiles)
        } catch (err) {
            showToaster(err?.response?.data?.message)
        }
        dispatch(setLoading(false))
    }

    const handleSubmit = async (e) => {
        e?.preventDefault()
        dispatch(setLoading(true))
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/setting', {
                usersLimit, sitePrompt, chatbotGreeting, chatbotPrompt
            })
            setErrors(null)
            showToaster(data.message)
        } catch (err) {
            showToaster(err?.response?.data?.message || { error: 'Please try again later' })
            if (err?.response?.data?.isJoi) {
                setErrors(convertJoiErrors2Errors(err.response.data.errors))
            } else {
                setErrors(err?.response?.data?.errors)
            }
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        loadSetting()
    }, [])
    return (
        <div className='max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]'>
            <div className='border rounded-md border-gray-200 p-6'>
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                        User Limit
                    </label>
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="User Limits"
                        value={usersLimit}
                        onChange={(e) => setUsersLimit(e.target.value)}
                    />
                    {errors?.userLimit && <label className="block text-rose-700 font-medium">{errors?.userLimit}</label>}
                </div>
                <div className='mt-6'>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                        Site prompt
                    </label>
                    <textarea
                        id="description"
                        rows={10}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Add a summary of your career, aspirations and interests"
                        value={sitePrompt}
                        onChange={(e) => setSitePrompt(e.target.value)}
                    ></textarea>
                    {errors?.sitePrompt && <label className="block text-rose-700 font-medium">{errors?.sitePrompt}</label>}
                </div>
                <div className='mt-6'>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                        Chatbot Greeting
                    </label>
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Chatbot Greeting"
                        value={chatbotGreeting}
                        onChange={(e) => setChatbotGreeting(e.target.value)}
                    />
                    {errors?.chatbotGreeting && <label className="block text-rose-700 font-medium">{errors?.chatbotGreeting}</label>}
                </div>
                <div className='mt-6'>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                        Chatbot prompt
                    </label>
                    <textarea
                        rows={10}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Chatbot prompt"
                        value={chatbotPrompt}
                        onChange={(e) => setChatbotPrompt(e.target.value)}
                    ></textarea>
                    {errors?.chatbotPrompt && <label className="block text-rose-700 font-medium">{errors?.chatbotPrompt}</label>}
                </div>
                <div className='mt-6'>
                    <div className='flex'>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                        >
                            Chatbot Files
                        </label>
                        <div className='flex rounded-md px-3 py-2 text-center font-semibold bg-indigo-500 hover:bg-indigo-400 text-white cursor-pointer ml-auto' onClick={() => fileInput.current.click()}>
                            <PlusCircleIcon className='w-6 mr-2' /> Add File
                        </div>
                        <input
                            accept='.pdf, .docx'
                            type="file"
                            ref={fileInput}
                            onChange={onFileChange}
                            hidden
                        />
                    </div>
                    <div className='mx-2 overflow-x-auto'>
                        {!!(!chatbotFiles || !chatbotFiles.length) &&
                            'No files'
                        }
                        {
                            !!chatbotFiles?.length &&
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
                                            {chatbotFiles?.length &&
                                                chatbotFiles.map((file, index) => (
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
                <div className='mt-6 flex justify-end gap-6'>
                    <button
                        type="button"
                        className="rounded-lg bg-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                        onClick={loadSetting}
                    >
                        Reload
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                    >
                        OK
                    </button>
                </div>
            </div>
            <div className="mb-6">
            </div>
        </div>
    )
}