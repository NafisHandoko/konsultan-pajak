import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from './auth-context'

const AdminVerificationContext = createContext({})

function AdminVerificationProvider({ children }) {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { token } = useAuth()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      // console.log(response)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getPaginationSchedules = async (page, limit) => {
    // console.log(page, limit)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      // console.log(response)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
    // fetchFilterData()
  }

  // Fetch data from API

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token])

  // Handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reset current page when search term changes
  }

  return (
    <AdminVerificationContext.Provider
      value={{
        data,
        setData,
        searchTerm,
        setSearchTerm,
        getPaginationSchedules,
        handleSearchTermChange,
        fetchData,
      }}
    >
      {children}
    </AdminVerificationContext.Provider>
  )
}

export default AdminVerificationProvider

export const useAdminVerificationContext = () =>
  useContext(AdminVerificationContext)
