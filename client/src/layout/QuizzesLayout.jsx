import React from 'react'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import NavBar from '../components/NavBar'

const QuizzesLayout = () => {
  return (
    <>
      <NavBar/>
      <div className='bg-rose-600'>
        QuizzesLayout
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

export default QuizzesLayout