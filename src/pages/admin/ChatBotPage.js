import React, { useEffect, useState } from 'react'
import showToaster from '../../utils/showToaster'
import axios from 'axios'
import convertJoiErrors2Errors from '../../utils/convertJoiErrors2Errors'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/appSlice'
import moment from 'moment'
import Pagination from '../../components/Pagination'
import { cn } from '../../utils'

export default function ChatBotPage() {
  const dispatch = useDispatch()
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getQuestions = async (page = 1) => {
    dispatch(setLoading(true))
    try {
      const { data: { data } } = await axios.get(process.env.REACT_APP_API_URL + '/api/admin/chatbot-questions', {
        params: {
          page, pageSize
        }
      })
      setQuestions(data.questions)
      setTotalPage(data.totalPage)
      setPage(data.page)
      setTotalCount(data.totalCount)
    } catch (err) {
      showToaster(err?.response?.data?.message || { errors: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    getQuestions(1)
  }, [])
  return (
    <div className='max-w-[1200px] px-[20px] mx-auto w-full mt-[25px]'>
      <div className='border rounded-md border-gray-200 p-6'>
        <div className="mt-8 flow-root">
          <div className="mx-4 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap text-center">
                      User #
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Question / Answer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {questions.map((question) => (
                    <tr key={question.email}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        {moment.utc(question.createdAt).local().format('yyyy-MM-DD HH:mm:ss')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
                        {question.chatbotIndex}
                      </td>
                      <td className="px-3 py-5 text-sm text-gray-500 break-all whitespace-normal">
                        <span class="font-bold">{question.question}</span><br />
                        {question.answer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination totalCount={totalCount} totalPage={totalPage} page={page} from={pageSize * (page - 1) + 1} to={pageSize * (page - 1) + questions.length} getPage={getQuestions} />
      </div>
      <div className="mb-6">
      </div>
    </div>
  )
}