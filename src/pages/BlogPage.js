import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import showToaster from '../utils/showToaster'
export default function BlogPage() {
  const user = useSelector(state => state.app.user)
  let { blogId } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    (async function () {
      try {
        const { data: { blog } } = await axios.get(process.env.REACT_APP_API_URL + '/api/blog', { params: { id: blogId } })
        setBlog(blog)
      } catch (err) {
        showToaster(err?.response?.data?.message || { error: 'Please try again later' })
      }
    }())
  }, [])
  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className='border rounded-md border-gray-200 pb-6'>
        {
          user?.role === "ADMIN" &&
          (
            <div className='flex justify-end gap-2 mt-6 mx-6'>
              <Link
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                to={'/blogs/' + blogId + '/edit'}
              >
                Edit
              </Link>
              <button
                type="button"
                className="rounded-lg bg-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"

              >
                Delete
              </button>
            </div>
          )
        }
        <div className='mt-6 px-2 md:p-6 text-3xl font-bold whitespace-pre-line' style={{ overflowWrap: 'break-word' }}>
          {blog?.title}
        </div>
        {
          blog?.image &&
          <div className='md:px-2'>
            <img
              id="preview_img"
              className="w-full mt-6"
              src={process.env.REACT_APP_API_URL + blog?.image}
              alt="User Avatar"
            />
          </div>
        }
        <div className='mt-6 whitespace-pre-line ck-content px-2 md:px-6' style={{ overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
      </div>
    </div>
  )
}