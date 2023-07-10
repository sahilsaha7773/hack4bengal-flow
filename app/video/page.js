"use client"
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { HandThumbDownIcon, HandThumbUpIcon, HeartIcon, DocumentMagnifyingGlassIcon, BeakerIcon, InformationCircleIcon, } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'
import { useRouter, useSearchParams } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';

// fcl imports
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"
import "../../flow/config.js";
import { ToastContainer, toast } from 'react-toastify'

function page() {
  const [tab, setTab] = React.useState(0)
  const [video, setVideo] = React.useState({})
  const [acc, setAcc] = React.useState({})
  const [user, setUser] = React.useState({})
  const [owners, setOwners] = React.useState(1)
  const handleSelectTab = (index) => {
    setTab(index)
  }
  const getQueryParams = query => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=');
          params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
          return params;
        }, {}
        )
      : {}
  };
  const router = useSearchParams()
  async function purchaseNFT(nftId, price, owner) {
    const acc = await fcl.account(owner)
    const transactionId = await fcl.mutate({
      cadence: `
      import FlowVideo from 0xf8d6e0586b0a20c7
      import FlowToken from 0xFlowToken
      import NonFungibleToken from 0xf8d6e0586b0a20c7
      import MetadataViews from 0xf8d6e0586b0a20c7

      transaction(nftId: UInt64, price: UInt64, owner:Address) {
        let Vault: &FlowToken.Vault
        let RecipientCollection: &FlowVideo.Collection{FlowVideo.MyCollectionPublic}
        
        prepare(signer: AuthAccount) {
          self.Vault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!

          // This is the only part you would have.
          if signer.borrow<&FlowVideo.Collection>(from: /storage/Collection) == nil {
            signer.save(<- FlowVideo.createEmptyCollection(), to: /storage/Collection) // Save the collection to the account's storage
            signer.link<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>(/public/Collection, target: /storage/Collection) // Link the collection to the account's public interface
            signer.link<&FlowVideo.Collection{FlowVideo.MyCollectionPrivate}>(/private/Collection, target: /storage/Collection) // Link the collection to the account's private interface
            // signer.save(<- FlowVideo.createEmptyCollection(), to: FlowVideo.CollectionStoragePath)
            // signer.link<&FlowVideo.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(FlowVideo.CollectionPublicPath, target: FlowVideo.CollectionStoragePath)
          }

          self.RecipientCollection = signer.getCapability(/public/Collection)
                                      .borrow<&FlowVideo.Collection{FlowVideo.MyCollectionPublic}>()!
        }

        execute {
          var pr: UFix64 = UFix64(price)
          let payment <- self.Vault.withdraw(amount: pr) as! @FlowToken.Vault
          // let ow: Address = owner
          FlowVideo.purchaseNFT(nftId: nftId, recipient: self.RecipientCollection, payment: <- payment, owner: owner)
        }
      }
      `,
      args: (arg, t) => [
        arg(nftId, t.UInt64),
        arg(price, t.UInt64),
        arg(owner, t.Address)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    const txStatus = await fcl.tx(transactionId).onceSealed();
    console.log('TxStatus', txStatus);
    toast.success('Purchase Success')
    getAcc()
    setVideo({ ...video, owner: user.addr })
    setOwners(owners + 1)
  }
  const getAcc = async () => {
    const a = await fcl.account(user?.addr)
    console.log(a);
    setAcc(a)
  }
  useEffect(() => {
    // const { data } = getQueryParams(window.location.search);
    fcl.currentUser().subscribe(setUser)
    const data = {
      id: router.get('id'),
      title: router.get('title'),
      description: router.get('description'),
      videoCID: router.get('videoCID'),
      owner: router.get('owner'),
      likes: router.get('likes'),
      dislikes: router.get('dislikes'),
      views: router.get('views'),
      price: router.get('price'),
    }
    setVideo(data)
    console.log(data)
  }, []);
  useEffect(() => {
    if (user?.addr)
      getAcc()
  }, [user])
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
          <video autoPlay className='rounded-lg shadow-lg' controls width={700} height={400}
            src={"https://" + video.videoCID + ".ipfs.nftstorage.link/"} />
          <div className='flex flex-col lg:items-center'>
            {/* <div className='flex mx-10 px-8 py-5 shadow-lg rounded-lg items-center'> */}
            {/* <Image
                src="https://dpemoji.com/wp-content/uploads/2023/03/doremon-dp-2.png"
                width={80} height={80}
                className='rounded-full object-cover h-20 w-20' /> */}
            {/* <div className='ml-5'>
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
              </div> */}

            {/* </div> */}
            <div className='flex items-center mt-8'>
              <img src="https://cryptologos.cc/logos/flow-flow-logo.png" className='h-6 w-6 mr-2' />
              <h2 className='text-lg'>{video.price} FLOW (Estimated Price)</h2>
            </div>
            <div className='flex items-center mt-2'>
              <h2 className='text-lg mr-2'>Your balance: </h2>
              <img src="https://cryptologos.cc/logos/flow-flow-logo.png" className='h-6 w-6 mr-2' />
              <h2 className='text-lg'>{(acc.balance * Math.pow(10, -8)).toString().substring(0, 6)} FLOW </h2>
            </div>
            {video.owner !== user?.addr &&
              <>

                <button className='text-sm 
            mt-2 border-2 py-4 px-8 rounded-lg flex items-center ml-2 hover:bg-green-400 hover:text-white hover:border-green-400
            hover:font-semibold
            text-xl'
                  onClick={() => purchaseNFT(video.id, 100, video.owner)}>
                  <ShoppingBagIcon className='h-6 w-6 mr-2' />
                  Buy Now
                </button></>}
            <div className='
              flex items-left align-left rounded-2xl py-2 px-2 
              border-solid border-0 mt-4 justify-evenely
              min-w-5xl'>
              <HandThumbUpIcon
                className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
              <p className='text-gray-600 mx-2'>{video.likes}</p>
              <HandThumbDownIcon
                className='h-6 w-6 text-gray-600 group-hover:text-indigo-600' />
              <p className='text-gray-600 mx-2'>{video.dislikes}</p>

            </div>
            <div className='mx-20 mt-10 flex align-center text-center'>
              <div className='mr-8'>
                <h3 className='font-bold text-lg'>{owners}</h3>
                <h4 className='text-gray-600'>owners</h4>
              </div>
              <div>
                <h3 className='font-bold text-lg'>100%</h3>
                <h4 className='text-gray-600'>unique owners</h4>
              </div>
            </div>


          </div>
        </div>

        <div className='mx-20 mt-10 mb-20'>

          <h1 className='text-4xl font-bold mb-2'>{video.title}</h1>
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
            {video.description}
          </p>}
          {
            tab == 1 &&
            <div className='mt-10 max-w-lg py-10 px-5 shadow-lg rounded-lg'>
              <div className='flex justify-between mb-2 mx-auto'>
                <h2 className='font-bold'>Contract Address</h2>
                <h2>{video.owner}</h2>
              </div>
              <div className='flex justify-between mb-2'>
                <h2 className='font-bold'>Token ID</h2>
                <h2>{video.id}</h2>
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
      <ToastContainer />
    </div>
  )
}

export default page