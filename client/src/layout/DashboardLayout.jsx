import React, { useEffect } from 'react'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import NavBar from '../components/NavBar'

const DashboardLayout = () => {
  const apiUrl = 'https://v54-tier3-team-36.onrender.com'
  const localApiUrl = 'http://localhost:5000'

  const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl:localApiUrl

  // this will be taken from sessions/tokens/context
  const userId = "67f20b50f453a24a59d35adf"

  useEffect(()=> {
    const fetchDashboard = async () => {
      try {
        console.log("Fetching dashboard...")
        const response = await fetch(`${backendUrl}/api/dashboard/${userId}`)
        const result = await response.json()
        console.log(result)

      } catch (error) {
        console.error("Error fetching dashboard", error)
      }
    }
    fetchDashboard();
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