import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import showToaster from '../../utils/showToaster'
import BlogEdit from '../../components/BlogEdit'
export default function BlogCreatePage() {
  const navigate = useNavigate()
  function handleSuccess(blogId) {
    navigate('/blogs/' + blogId)
  }
  function handleCancel() {
    navigate('/admin/blogs')
  }
  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className='border rounded-md border-gray-200'>
        <BlogEdit blog={null} onSuccess={handleSuccess} onCancel={handleCancel}/>
      </div>
    </div>
  )
}