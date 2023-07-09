"use client"
import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { HandThumbDownIcon, HandThumbUpIcon, HeartIcon, DocumentMagnifyingGlassIcon, BeakerIcon, InformationCircleIcon, } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'

function page() {
  const [tab, setTab] = React.useState(0)
  const handleSelectTab = (index) => {
    setTab(index)
  }
  return (
    <div>
      <Navbar />
      <div className='
      lg:flex
      justify-center
      flex-col
      '>
        <div className='
      lg:flex
      justify-center'>
          <Image src="https://images3.alphacoders.com/129/1297317.jpg" width={700} height={90}
            className='rounded-lg' />
          <div className='flex flex-col lg:items-center'>
            <div className='flex mx-10 px-8 py-5 shadow-lg rounded-lg items-center'>
              <Image
                src="https://dpemoji.com/wp-content/uploads/2023/03/doremon-dp-2.png"
                width={80} height={80}
                className='rounded-full object-cover h-20 w-20' />
              <div className='ml-5'>
                <h2 className='font-semibold'>Doraemon</h2>
                <h4 className='text-gray-600 mb-5'>31 videos</h4>
                <button className='text-sm font-semibold 
              leading-6 
              stext-white 
              bsg-blue-900 
              px-4
              py-2 
              lg:flex
              border-solid
              border-2
              rounded-lg
              hover:bg-green-400
              hover:text-white
              hover:border-green-400
              mt-auto'>
                  <HeartIcon className='h-6 w-6 mr-2' />
                  Follow
                </button>
              </div>

            </div>
            <div className='flex items-center mt-8'>
              <img src="https://cryptologos.cc/logos/flow-flow-logo.png" className='h-6 w-6 mr-2' />
              <h2 className='text-lg'>129 FLOW</h2>
            </div>
            <button className='text-sm 
            mt-2 border-2 py-4 px-8 rounded-lg flex items-center ml-2 hover:bg-green-400 hover:text-white hover:border-green-400
            hover:font-semibold
            text-xl'>
              <ShoppingBagIcon className='h-6 w-6 mr-2' />
              Buy Now
            </button>
            <div className='
              flex items-left align-left rounded-2xl py-2 px-2 
              border-solid border-0 mt-4 justify-evenely
              min-w-5xl'>
              <HandThumbUpIcon
                className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
              <p className='text-gray-600 mx-2'>6k</p>
              <HandThumbDownIcon
                className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
              <p className='text-gray-600 mx-2'>291</p>

            </div>
            <div className='mx-20 mt-10 flex align-center text-center'>
              <div className='mr-8'>
                <h3 className='font-bold text-lg'>295</h3>
                <h4 className='text-gray-600'>owners</h4>
              </div>
              <div>
                <h3 className='font-bold text-lg'>44%</h3>
                <h4 className='text-gray-600'>unique owners</h4>
              </div>
            </div>


          </div>
        </div>

        <div className='mx-20 mt-10 mb-20'>

          <h1 className='text-4xl font-bold mb-2'>The Batman</h1>
          <hr />
          <div className='flex align-center text-center mt-5'>
            <div className={`
            mr-8 ${tab == 0 ? "bg-green-400 text-white border-2 border-green-400" : "border-solid border-2 text-gray-600"} px-2 py-2 rounded-lg
            hover:cursor-pointer hover:bg-green-400 hover:text-white 
            hover:border-green-400 transition duration-200 ease-in-out flex`}
              onClick={() => setTab(0)}>
              <InformationCircleIcon className='h-6 w-6 mr-2' />
              Description
            </div>
            <div
              className={`
              mr-8 ${tab == 1 ? "bg-green-400 text-white border-2 border-green-400" : "border-solid border-2 text-gray-600"} px-2 py-2 rounded-lg
              hover:cursor-pointer hover:bg-green-400 hover:text-white 
              hover:border-green-400 transition duration-200 ease-in-out flex`} onClick={() => setTab(1)}>
              <DocumentMagnifyingGlassIcon className='h-6 w-6 mr-2' />
              Details</div>
            <div className={`
            mr-8 ${tab == 2 ? "bg-green-400 text-white border-2 border-green-400" : "border-solid border-2 text-gray-600"} px-2 py-2 rounded-lg
            hover:cursor-pointer hover:bg-green-400 hover:text-white 
            hover:border-green-400 transition duration-200 ease-in-out flex`}
              onClick={() => setTab(2)}
            >
              <BeakerIcon className='h-6 w-6 mr-2' />
              Price History</div>

          </div>
          {tab == 0 && <p className='mt-6'>
            Thursday, October 31st. The city streets are crowded for the holiday. Even with the rain. Hidden in the chaos is the element, waiting to strike like snakes. And I'm there too. Watching. 2 years of nights have turned me into a nocturnal animal. I must choose my targets carefully. It's a big city. I can't be everywhere. But they don't know where I am. We have a signal now, for when I'm needed. When that light hits the sky, it's not just a call- it's a warning. To them. Fear is a tool. They think I'm hiding in the shadows. But I AM the shadows. I wish I could say I'm making a difference, but I don't know. Murder, robberies, assault- 2 years later, they're all up. And now this. This city's eating itself. Maybe it can't be saved, but i have to try. PUSH MYSELF. These nights all roll together in a rush, Behind the mask. Sometimes in the morning i have to force myself to remember everything that happened.
          </p>}
          {
            tab == 1 &&
            <div className='mt-10 max-w-lg py-10 px-5 shadow-lg rounded-lg'>
              <div className='flex justify-between mb-2 mx-auto'>
                <h2 className='font-bold'>Contract Address</h2>
                <h2>0xf8d6e0586b0a20c7</h2>
              </div>
              <div className='flex justify-between mb-2'>
                <h2 className='font-bold'>Token ID</h2>
                <h2>21</h2>
              </div>
              <div className='flex justify-between mb-2'>
                <h2 className='font-bold'>Last Updated</h2>
                <h2>6th July, 2023</h2>
              </div>
              <div className='flex justify-between mb-2'>
                <h2 className='font-bold'>Created on</h2>
                <h2>7th July, 2023</h2>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default page