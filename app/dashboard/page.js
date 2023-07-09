"use client"
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  MagnifyingGlassCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]
const videos = [
  {
    title: "Peaky Blinders",
    // thumbnail: "https://i.ytimg.com/vi/1KrfZ81EXH8/maxresdefault.jpg",
    thumbnail: "https://s3.amazonaws.com/photos.bcheights.com/wp-content/uploads/2019/10/03123602/peaky-blinders-online.jpg",
    description: "Peaky Blinders is a British period crime drama television series created by Steven Knight...",
    likes: "6k",
    dislikes: "291",
    views: "1.2M",
  },
  {
    title: "The Batman",
    thumbnail: "https://images3.alphacoders.com/129/1297317.jpg",
    description: "When that light hits the sky, it's not just a call- it's a warning. To them. Fear is a tool...",
    likes: "6k",
    dislikes: "291",
    views: "1.2M",
  },
  {
    title: "Breaking Bad",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BMTJiMzgwZTktYzZhZC00YzhhLWEzZDUtMGM2NTE4MzQ4NGFmXkEyXkFqcGdeQWpybA@@._V1_.jpg",
    description: "Walter White, a chemistry teacher, discovers that he has cancer and...",
    likes: "1.2k",
    dislikes: "65",
    views: "350K",
  },
  {
    title: "Peaky Blinders",
    thumbnail: "https://i.ytimg.com/vi/1KrfZ81EXH8/maxresdefault.jpg",
    description: "Peaky Blinders is a British period crime drama television series created by Steven Knight...",
    likes: "6k",
    dislikes: "291",
    views: "1.2M",
  },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
      <Navbar />

      <div style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "0 20px"
      }}>
        {/* <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
          Search Videos
        </label> */}
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <MagnifyingGlassCircleIcon className="h-8 w-8 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
            </span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block
            text-center w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Welcome to FlowTube!"
          />
          {/* <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div> */}
        </div>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-12 my-10 gap-6'>
        {
          videos.map((video) => (
            <Link href='/video'>
              <div className='col-span-1 px-8 py-8 border-solid rounded-lg  shadow-innerr shadow-2xl min-w-full hover:scale-105
            transition ease-in-out delay-150 hover:cursor-pointer'>
                <div className="
              flex
              iems-center
              justify-between
              flex-col
            ">
                  <img className="w-full h-60 object-cover rounded-lg shadow-inner"
                    src={video.thumbnail}
                    alt="" />
                  <h3 className="mt-5 text-lg leading-6 font-small text-gray-900">
                    {video.title}
                  </h3>
                  <p className='text-gray-600 mt-2'>{video.description}</p>
                  <div className='
              flex items-center align-center rounded-2xl py-2 px-2 border-solid border-0 mt-4'>
                    <HandThumbUpIcon
                      className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
                    <p className='text-gray-600 mx-2'>{video.likes}</p>
                    <HandThumbDownIcon
                      className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
                    <p className='text-gray-600 mx-2'>{video.dislikes}</p>
                    <p className='text-gray-600 ml-auto'>
                      {video.views} views
                      {/* <EyeIcon className='h-6 w-6' /> */}
                    </p>
                  </div>

                </div>
              </div>
            </Link>


          ))
        }

      </div>
    </div>
  )
}
