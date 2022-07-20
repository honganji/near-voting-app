import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import NEARLogo from './assets/img/logo-black.svg'
import UNCHLogo from './assets/img/unchain_logo.png'
import crossLogo from './assets/img/cross.png'
import TopImage from './assets/img/top_img.avif'

import './assets/css/global.css'

import AppRouter from './assets/AppRouter'

import {
  login, logout, new_default_meta, nft_mint,
  nft_transfer, nft_add_likes_to_candidate,
  nft_metadata, nft_tokens_for_kind, nft_token,
  nft_return_candidate_likes,
} from './assets/js/near/utils'

import getConfig from './assets/js/near/config'


export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = React.useState()

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  const getContractInfo = () => {
    nft_metadata().then(
      value => {
        console.log(value)
      }
    )
  }

  const getCandidateInfo = (token_id) => {
    nft_tokens_for_kind(token_id).then(value => {
      console.log(value[1].metadata);
    })
  }

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <div className='grid h-3/4 place-items-center'>
        <div className="flex items-center">
          <img src={NEARLogo} className="object-cover h-16 w-16" />
          <img src={crossLogo} className="object-cover h-6 w-6" />
          <img src={UNCHLogo} className="object-cover h-12 w-12 mx-2" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap app_title">Election Dapp</span>
        </div>
        <div className="text-3xl">Have a liberate and fair election!</div>
        <img src={TopImage} className="mb-4 h-5/6 w-1/2" />
        <button className='text-white w-2/5 h-12 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-3xl text-center ' onClick={login}>Sign in</button>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-white pt-2.5">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center">
            <img src={NEARLogo} className="object-cover h-12 w-12" />
            <img src={crossLogo} className="object-cover h-4 w-4" />
            <img src={UNCHLogo} className="object-cover h-9 w-9 mx-2" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap app_title">Election Dapp</span>
          </div>
          <div className="md:block md:w-auto pt-1">
            <ul className='flex md:flex-row md:space-x-8 md:text-xl md:font-medium'>
              <li><a href='http://localhost:1234/'> Home </a></li>
              <li><a href='http://localhost:1234/candidate'> Add Candidate </a></li>
              <li><a href='http://localhost:1234/voter'> Add Voter </a></li>
              <button className="link text-red-500" style={{ float: 'right' }} onClick={logout}>
                Sign out
              </button>
            </ul>
          </div>
        </div>
      </nav>

      <div className='center'>
        <AppRouter />
      </div>

    </div>
  )
}
