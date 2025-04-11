import React, { useEffect, useState } from 'react'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/auth'

const DashboardLayout = () => {
  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

  const { user } = useAuth();
  const { dashboardInfo, setDashboardInfo } = useState()
  console.log(user)

  useEffect(()=> {
    const fetchDashboard = async () => {
      try {
        console.log("Fetching dashboard...")
        const response = await fetch(`${backendUrl}/api/dashboard/${user._id}`)
        const result = await response.json()
        console.log("dashboard info", result)
        setDashboardInfo(result)
      } catch (error) {
        console.error("Error fetching dashboard", error)
      }
    }
    if (user) {
      fetchDashboard();
    }
  }, [])

  return (
    <>
      <NavBar/>
      <div className='bg-green-400'>
        DashboardLayout
        <main className="w-full">
          <div className="w-full px-6 py-8 space-y-4">
            <div className="flex justify-center w-full">
              <Component1 />
            </div>
            <div className="flex justify-center w-full">
              <Component2 />
            </div>
          </div>
        </main>
        </div>
    </>
  )
}


export default DashboardLayout