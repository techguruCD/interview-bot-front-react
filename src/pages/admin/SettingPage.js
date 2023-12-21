import React, { useEffect, useState } from 'react'
import showToaster from '../../utils/showToaster'
import axios from 'axios'
import convertJoiErrors2Errors from '../../utils/convertJoiErrors2Errors'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/appSlice'

export default function SettingPage() {
    const dispatch = useDispatch()
    const [usersLimit, setUsersLimit] = useState(0)
    const [sitePrompt, setSitePrompt] = useState('')
    const [errors, setErrors] = useState(null)

    const loadSetting = async () => {
        dispatch(setLoading(true))
        try {
            const {data: { data }} = await axios.get(process.env.REACT_APP_API_URL + '/admin/setting')
            setUsersLimit(data.usersLimit)
            setSitePrompt(data.sitePrompt)
        } catch (err) {
            showToaster(err?.response?.data?.message)
        }
        dispatch(setLoading(false))
    }

    const handleSubmit = async (e) => {
        e?.preventDefault()
        dispatch(setLoading(true))
        try {
            const {data} = await axios.post(process.env.REACT_APP_API_URL + '/admin/setting', {
                usersLimit, sitePrompt
            })
            setErrors(null)
            showToaster(data.message)
        } catch (err) {
            showToaster(err?.response?.data?.message || {error: 'Please try again later'})
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
                        id="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Gaming is Awesome!"
                        required
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