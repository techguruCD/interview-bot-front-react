import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Pagination from '../../components/Pagination'
import showToaster from '../../utils/showToaster'
import axios from 'axios'
import EmptyImage from '../../assets/images/emptyImage.png'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/appSlice'
import { Transition } from "@headlessui/react";

import { ReactComponent as Close } from '../../assets/images/svgs/close.svg'
import convertFile2Base64 from '../../utils/convertFile2Base64'
import { ArchiveBoxXMarkIcon, ArrowPathRoundedSquareIcon, FolderOpenIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import convertJoiErrors2Errors from '../../utils/convertJoiErrors2Errors'
import moment from 'moment'
import BlogModal from '../../components/BlogModal'
import Editor1 from '../../components/Editor'
import { Link } from 'react-router-dom'

function BlogCreateModal({ isOpen, handleClose, onSuccess }) {
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
    e?.preventDefault();
    dispatch(setLoading(true))
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/create-blog', {
        title, content, image
      })
      // dispatch(setProfile(data.data))
      showToaster(data?.message)
      handleClose()
      setErrors(null)
      setTitle('')
      setContent('')
      setImage(null)
      onSuccess()
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
              Create a blog
            </h3>
            <button
              type="button"
              className="bg-transparent ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <Close width={24} height={24} />
            </button>
          </div>
          <div className="scrollbar overflow-y-auto h-[75%] space-y-6 p-6 flex flex-col">
            <div className="flex items-center space-x-6">
              <div className='w-full flex flex-col justify-center items-center'>
                <div className="shrink-0 h-32 w-32 flex justify-center items-center">
                  <img
                    id="preview_img"
                    className="h-32 w-32 rounded-md object-cover"
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
                  <ArrowPathRoundedSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => setImage(null)} />
                  <FolderOpenIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => imageInput.current.click()} />
                </div>
              </div>
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
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Blog title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors?.title && <label className="block text-rose-700 font-medium">{errors?.title}</label>}
            </div>
            <div className="mb-6 grow flex flex-col">
              <label
                htmlFor="description"
                className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              {/* <textarea
                id="description"
                rows={4}
                className="block grow w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea> */}
              <Editor1 onChange={setContent}/>
              {errors?.content && <label className="block text-rose-700 font-medium">{errors?.content}</label>}
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

export default function BlogsPage() {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [blogs, setBlogs] = useState([])

  const [isBlogCreateModalOpen, setIsBlogCreateModalOpen] = useState(false)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const getPage = async (page = 1) => {
    dispatch(setLoading(true))
    try {
      const { data: { data } } = await axios.get(process.env.REACT_APP_API_URL + '/api/admin/blogs', {
        params: {
          page,
          pageSize
        }
      })
      setBlogs(data.blogs)
      setTotalPage(data.totalPage)
      setPage(data.page)
      setTotalCount(data.totalCount)
    } catch (err) {
      showToaster(err?.response?.data?.message || { errors: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  async function deleteBlog(id) {
    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/delete-blog', { id })
      showToaster(data.message)
      getPage(page)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
  }

  async function openBlog(id) {
    try {
      const { data: { blog } } = await axios.get(process.env.REACT_APP_API_URL + '/api/blog', { params: { id } })
      setIsBlogModalOpen(true)
      console.log(blog)
      setSelectedBlog(blog)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
  }

  useEffect(() => {
    getPage();
  }, [])

  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className='border rounded-md border-gray-200 p-6'>
        <div className="sm:flex sm:items-center">
          <div className="mt-4 ml-auto">
            <Link
              to={'/blogs/new'}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Blog
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Thumbnail
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img className="h-11 w-11 rounded-md" src={blog.image ? (process.env.REACT_APP_API_URL + blog.image) : EmptyImage} alt="" />
                          </div>
                          <div className="ml-4">
                            {/* <div className="font-medium text-gray-900 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer underline" onClick={() => openBlog(blog.id)}>{blog.title}</div> */}
                            <Link className="font-medium text-gray-900 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer underline" to={'/blogs/' + blog.id}>{blog.title}</Link>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900 max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis"><Link className='cursor-pointer underline' to={'/blogs/' + blog.id}>{blog.title}</Link></div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{moment.utc(blog.createdAt).local().format('yyyy-MM-DD HH:mm:ss')}</td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-rose-600 hover:text-rose-900" onClick={() => deleteBlog(blog.id)}>
                          <ArchiveBoxXMarkIcon className='w-6' />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination totalCount={totalCount} totalPage={totalPage} page={page} from={pageSize * (page - 1) + 1} to={pageSize * (page - 1) + blogs.length} getPage={getPage} />
      </div>
      <BlogCreateModal isOpen={isBlogCreateModalOpen} handleClose={() => setIsBlogCreateModalOpen(false)} onSuccess={() => getPage(page)} />
      <BlogModal blog={selectedBlog} isOpen={isBlogModalOpen} handleClose={() => setIsBlogModalOpen(false)} />
    </div>
  )
}