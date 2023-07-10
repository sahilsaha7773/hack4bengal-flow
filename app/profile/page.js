"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import "../../flow/config.js";

export default function Page() {
  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const getProfile = async () => {
    const res = await fcl.query(
      {
        cadence: `
        import UserProfile from 0xf8d6e0586b0a20c7
        pub fun main(addr: Address): UserProfile.ProfileStruct{
          var acc = getAccount(addr)
          var publicProfileRef = 
                      acc.getCapability(/public/Profile).borrow<&UserProfile.Profile>() ?? panic("Could not borrow public profile reference")
          return publicProfileRef.getProfileStruct()
        }`,
        args: (arg, t) => [
          arg(user?.addr, t.Address)
        ]
      }
    )
    console.log(res);
    setProfile(res)
    setName(res.name)
    setEmail(res.email)
    setBio(res.bio)
  }
  const createProfile = async () => {
    setIsUpdating(true)
    const txId = await fcl.send([
      fcl.transaction(`
        import UserProfile from 0xf8d6e0586b0a20c7
        transaction(name: String, email: String, bio: String) {
          prepare(acct: AuthAccount){
            acct.save<@UserProfile.Profile>(<- UserProfile.createProfile(name: name, email: email, bio: bio),
             to: /storage/Profile) 
            acct.link<&UserProfile.Profile>(/public/Profile, target: /storage/Profile)
          }
          execute {
            log("Stored User Profile")
          }
        }`),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.args([
        fcl.arg(name, t.String),
        fcl.arg(email, t.String),
        fcl.arg(bio, t.String)
      ]),
      fcl.limit(9999)
    ])
    getProfile()
    setIsUpdating(false)
    // const res = await fcl.tx(txId).onceSealed()
    console.log(txId);
  }
  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
    // console.log(user);
  }, [])
  useEffect(() => {
    console.log("asda");
    if (user?.addr) {
      getProfile()
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <div className='flex items-center flex-col mb-20'>
        {profile == null ?
          <div>
            <h2 className='text-lg font-semibold mb-5'>Create a Profile</h2>
            <div className='shadow-2xl px-10 py-10 rounded-lg'>
              <h2 className='text-xl mb-5 flex items-center font-semibolds'>
                <UserCircleIcon className='h-8 w-8 mr-2' />
                Basic Details
              </h2>
              <input
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-5'
                placeholder='Name' value={name}
                onChange={(e) => setName(e.target.value)} />
              <input className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-5'
                placeholder='Email' value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <textarea className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full' placeholder='bio'
                value={bio} onChange={(e) => setBio(e.target.value)} />
              <button
                onClick={() => createProfile()}
                className="text-lg hover:font-semibold 
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
              hover:border-green-400">
                <PlusIcon className='h-6 w-6 mr-2' />
                {isUpdating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div> :
          <div className='flex items-center flex-col mb-20'>
            {/* <button onClick={() => fcl.authenticate()} className='text-sm font-semibold'>Login</button> */}
            {/* <button onClick={() => getProfile()} className='text-sm font-semibold'>Get Profile</button> */}
            <Image src="https://images3.alphacoders.com/129/1297317.jpg"
              width={80} height={80}
              className='rounded-full fit-cover w-52 h-52 mb-5' />
            <h4 className='text-lg mb-2 text-gray-600'>238 followers</h4>
            <h4 className='text-gray-600 mb-10'>31 videos</h4>

            <div className='shadow-2xl px-10 py-10 rounded-lg'>
              <h2 className='text-xl mb-5 flex items-center font-semibolds'>
                <UserCircleIcon className='h-8 w-8 mr-2' />
                Basic Details
              </h2>
              <input className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-5' placeholder='Name' value={"Sahil Saha"} />
              <input className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-5' placeholder='Email' value={"sahilsaha7773@gmail.com"} />

              <textarea className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full' placeholder='bio'
                value={"Lorem ipsum dolor sit amet consectetur adipisicing elit."} />

            </div>
          </div>
        }
      </div>
    </div>
  )
}
