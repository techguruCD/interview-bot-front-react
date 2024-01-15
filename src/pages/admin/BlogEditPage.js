import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import showToaster from '../../utils/showToaster'
import BlogEdit from '../../components/BlogEdit'
export default function BlogEditPage() {
  const navigate = useNavigate()
  let { blogId } = useParams()
  const [blog, setBlog] = useState(null)

  function handleSuccess() {
    navigate('/blogs/' + blogId)
  }

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
      <div className='border rounded-md border-gray-200'>
        <BlogEdit blog={blog} onSuccess={handleSuccess} onCancel={handleSuccess}/>
      </div>
    </div>
  )
}