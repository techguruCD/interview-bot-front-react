import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/appSlice'
import convertFile2Base64 from '../utils/convertFile2Base64'
import { ArchiveBoxXMarkIcon, ArrowPathRoundedSquareIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import EmptyImage from '../assets/images/emptyImage.png'
import Editor1 from './Editor'
import { Link } from 'react-router-dom'
import axios from 'axios'
import showToaster from '../utils/showToaster'
import convertJoiErrors2Errors from '../utils/convertJoiErrors2Errors'

export default function BlogEdit({
  blog,
  resetFlag,
  onSuccess,
  onCancel
}) {
  const dispatch = useDispatch()
  const imageInput = useRef(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState(null)

  async function onImageChange(e) {
    const file = e.target?.files?.[0]
    if (!file) return;
    dispatch(setLoading(true))
    let fileData = await convertFile2Base64(file)
    imageInput.current.value = null
    setImage(fileData)
    dispatch(setLoading(false))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(setLoading(true))
    try {
      const url = process.env.REACT_APP_API_URL + '/api/admin/' + (blog ? 'update-blog?id=' + blog.id : 'create-blog')
      const { data } = await axios.post(url, {
        title, content, image
      })
      // dispatch(setProfile(data.data))
      showToaster(data?.message)
      setErrors(null)
      setTitle('')
      setContent('')
      setImage(null)
      onSuccess?.(data.blog.urlCaption)
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
    setImage(blog?.image || null)
    setTitle(blog?.title || '')
    setContent(blog?.content || '')
    setErrors(null)
  }, [resetFlag, blog])

  return (
    <div>
      <div className='flex justify-end gap-2 mt-6 mx-6'>
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          {blog ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          className="rounded-lg bg-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <div className="mt-6 w-full px-6">
          <label
            htmlFor="title"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Blog title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors?.title && <label className="block text-rose-700 font-medium">{errors?.title}</label>}
        </div>
        <div className="w-full shrink-0 flex justify-center items-center">
          <img
            id="preview_img"
            className={`object-cover md:p-2 ${image ? 'w-full' : 'h-32 w-32'}`}
            src={image ? (typeof (image) == 'string' ? process.env.REACT_APP_API_URL + image : image.data) : EmptyImage}
            alt="User Avatar"
          />
          <input
            accept='.jpg, .jpeg, .png'
            type="file"
            ref={imageInput}
            onChange={onImageChange}
            hidden={true}
          />
        </div>
        <div className='w-32 mt-2 px-2 flex justify-between'>
          <ArrowPathRoundedSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => setImage(blog?.image || null)} />
          <FolderOpenIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => imageInput.current.click()} />
          <ArchiveBoxXMarkIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => setImage(null)} />
        </div>
        <div className="mt-6 mb-6 grow flex flex-col px-6 w-full">
          <label
            htmlFor="description"
            className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <Editor1 onChange={setContent} data={blog?.content} />
          {errors?.content && <label className="block text-rose-700 font-medium">{errors?.content}</label>}
        </div>
      </div>
    </div>
  )
}