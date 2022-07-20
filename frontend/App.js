import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import NEARLogo from './assets/img/logo-black.svg'
import UNCHLogo from './assets/img/unchain_logo.png'
import crossLogo from './assets/img/cross.png'

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
      <main className='grid h-screen place-items-center text-3xl'>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
            {greeting}
          </label>!
          Welcome to NEAR!
        </h1>
        <p>
          Your contract is storing a greeting message in the NEAR blockchain. To
          change it you need to sign in using the NEAR Wallet. It is very simple,
          just use the button below.
        </p>
        <p>
          Do not worry, this app runs in the test network ("testnet"). It works
          just like the main network ("mainnet"), but using NEAR Tokens that are
          only for testing!
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
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
