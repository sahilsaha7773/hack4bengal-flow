"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

// Flow imports
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import "../../flow/config.js";
import { createVideoNFT } from '@/flow/cadence/transactions/js/CreateVideoNFT';
import { PaintBrushIcon } from '@heroicons/react/24/outline';

export default function page() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null)
  const [user, setUser] = useState({})

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
    // console.log(user);
  }, [])

  const uploadVideo = async () => {
    console.log("Creating transaction")
    const acc = await fcl.account(user.addr)
    console.log(acc.address)
    const transactionId = await fcl.send([
      fcl.transaction(createVideoNFT),
      fcl.args([
        fcl.arg(user.addr, t.Address),
        fcl.arg(title, t.String),
        fcl.arg(description, t.String),
        // the batman fcl.arg("bafybeie6ahuwg7al2l5att7e6ajphqhiqcspzdy3koailsvg6jpifnrype", t.String),
        // fcl.arg("bafybeigwtvjce3kbr35uwf7ti4ylkrgjxwpcv7f3apfnem4kr2ufnnu5ei", t.String)
        fcl.arg("bafybeid3wquuygelr5svb47r7kpsyhigsizmiafxtoaqmsahs5igbp567i", t.String)
      ]),
      fcl.payer(fcl.currentUser),
      fcl.proposer(fcl.currentUser),
      fcl.authorizations([fcl.currentUser]),
      fcl.limit(9999),
    ]).then(fcl.decode)

    console.log(transactionId)
  }
  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center '>
        <div className='flex justify-center items-center flex-col w-96 mr-20'>
          <h1 className='text-4xl font-semibold'>Upload Video</h1>
          <div class="flex items-center justify-center ">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-96 mt-5 h-64 border-2 border-gray-600
           border-dashed rounded-lg cursor-pointer hover:bg-slate-30 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-slate-100">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">MP4, wav, etc. (Video files only)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>

          <input type="text" placeholder='Title'
            className='border-2 border-gray-300 rounded-lg px-4 py-2 mt-5 w-full'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder='Description'
            className='border-2 border-gray-300 rounded-lg px-4 py-2 mt-5 w-full'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <button
            className="text-lg hover:font-semibold w-full items-center
         mt-2
       leading-6 
       px-4
       py-2 
       lg:flex
       border-solid
       border-2
       rounded-lg
       hover:bg-green-400
       hover:text-white
       hover:border-green-400" onClick={() => uploadVideo()}> Upload </button>
        </div>
        <button
          className="text-lg hover:font-semibold items-center
          hh-6
          
        mt-2
      leading-6 
      px-8
      py-2 
      lg:flex
      border-solid
      border-2
      rounded-lg
      hover:bg-green-400
      hover:text-white
      hover:border-green-400" onClick={() => uploadVideo()}>
          <PaintBrushIcon className="h-6 w-6 mr-2" />
          Generate Using AI </button>
      </div>
    </div>
  )
}
