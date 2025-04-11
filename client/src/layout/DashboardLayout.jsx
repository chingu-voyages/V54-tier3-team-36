import React, { useEffect, useState } from 'react'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/auth'
import Footer from '../components/footer/Footer'
import backgroundImage from "../assets/backgroundImage.jpg"

const DashboardLayout = () => {
  const pageBg = "bg-white bg-opacity-0"
  
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
    <div className="md:min-h-screen flex items-center justify-center bg-fixed bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="container mx-auto m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden">
        <NavBar bgColor={pageBg}/>
        <div className="w-full px-6 py-8 space-y-4">
          <div className="flex justify-center w-full">
            <Component1 />
          </div>
          <div className="flex justify-center w-full">
            <Component2 />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}


export default DashboardLayout