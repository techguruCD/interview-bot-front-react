import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import showToaster from '../utils/showToaster'
import { useDispatch, useSelector } from 'react-redux'
import Editor1 from '../components/Editor'
import { setLoading } from '../store/appSlice'

export default function About() {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const user = useSelector(state => state.app.user)
  const isAdmin = useMemo(() => user?.role === 'ADMIN')
  const loadContent = async () => {
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.get(process.env.REACT_APP_API_URL + '/api/about')
      setContent(response.about.content)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }
  const handleSubmit = async (e) => {
    e?.preventDefault()
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/update-about', { content })
      showToaster(response.message)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }
  useEffect(() => {
    loadContent()
  }, [])
  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className='border rounded-md border-gray-200 p-6'>
        {
          isAdmin &&
          <>
            <div className='flex justify-end gap-2 mt-6 mx-6'>
              <button
                type="button"
                className="rounded-lg bg-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                onClick={loadContent}
              >
                Reload
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
            <div className='mt-6'>
              <Editor1 onChange={setContent} data={content} />
            </div>
          </>
        }
        {
          !isAdmin &&
          <div className='blog-content ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred' style={{ overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: content }}></div>
        }
      </div>
    </div>
  )
}