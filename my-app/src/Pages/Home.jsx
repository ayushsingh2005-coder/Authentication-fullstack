import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-no-repeat bg-[url(https://notes.aimodels.fyi/content/images/size/w2000/2023/06/Screen-Shot-2023-06-15-at-2.01.50-PM.png)] h-screen flex pt-8  justify-between w-full flex-col '>

        <div className='space-y-5 bg-gray-900 pb-7 py-8 px-6 mt-auto '>
            <h2 className='text-3xl text-gray-200/90 font-bold'>Get started with Omnia</h2>
            <Link to='/auth' className='flex items-center justify-center  w-full bg-black text-white py-3 rounded mb-0 hover:bg-blue-700'>Continue</Link>
            {/* link is not an inline element that's why we have used inline-block */}
        </div>
      </div>
    </div>
  )
}

export default Home
