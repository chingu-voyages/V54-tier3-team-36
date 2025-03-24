import React from 'react'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'

const DashboardLayout = () => {
  return (
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
  )
}


export default DashboardLayout