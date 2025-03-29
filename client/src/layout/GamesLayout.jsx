import React from 'react'
import Component2 from '../components/Component2'
import NavBar from '../components/NavBar'
import SlidingPuzzle from '../components/SlidingAnimalPuzzle/SlidingPuzzle'

const GamesLayout = () => {
  return (
    <>
      <NavBar/>
      <div className='bg-white'>
        <main className="w-full">
          <div className="w-full px-6 py-8 space-y-4">
            <div className="flex justify-center w-full">
              <SlidingPuzzle />
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

export default GamesLayout