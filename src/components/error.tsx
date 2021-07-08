import React from "react"
import router from "next/router"

const Error = () => (
  <div className='absolute inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm px-6'>
    <div className='bg-indigo-900 rounded shadow-2xl max-w-sm mx-auto'>
      <div className='p-8'>
        <h1>Hmm.</h1>
        <p className='text-lg'>
          It seems that you&apos;re lost in perpetual black hole. Maybe this
          will help.
        </p>
        <div className='flex flex-col'>
          <button
            className='font-semibold text-white border-white hover:border-gray-300 hover:text-gray-300 rounded border py-2 px-4'
            onClick={router.reload}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Error
