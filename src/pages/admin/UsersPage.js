
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Pagination from '../../components/Pagination'
import showToaster from '../../utils/showToaster'
import axios from 'axios'
import InterviewerImage from '../../assets/images/interviewer.png'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/appSlice'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function UsersPage() {
  const dispatch = useDispatch()
  const [setting, setSetting] = useState(null)

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [users, setUsers] = useState([])

  const getPage = async (page = 1) => {
    dispatch(setLoading(true))
    try {
      const {data: {data}} = await axios.get(process.env.REACT_APP_API_URL + '/admin/users', {
        params: {
          page,
          pageSize
        }
      })
      setUsers(data.users)
      setTotalPage(data.totalPage)
      setPage(data.page)
      setTotalCount(data.totalCount)
    } catch (err) {
      showToaster(err?.response?.data?.message || {errors: 'Please try again later'})
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    getPage();
    (async function() {
      dispatch(setLoading(true))
      try {
        const {data: { data }} = await axios.get(process.env.REACT_APP_API_URL + '/admin/setting')
        setSetting(data)
      } catch (err) {

      }
      dispatch(setLoading(false))
    })()
  }, [])

  return (
    <div className="max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]">
      <div className='border rounded-md border-gray-200 p-6'>
        {/* <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div> */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img className="h-11 w-11 rounded-full" src={user.profile?.avatar?(process.env.REACT_APP_API_URL + user.profile.avatar):InterviewerImage} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="mt-1 text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{user.profile?.name}</div>
                        <div className="mt-1 text-gray-500">{user.profile?.headline}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.role}</td>
                      {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {user.name}</span>
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination totalCount={totalCount} totalPage={totalPage} page={page} from={pageSize * (page - 1) + 1} to={pageSize * (page - 1) + users.length} getPage={getPage}/>
      </div>
    </div>
  )
}