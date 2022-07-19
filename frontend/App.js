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

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  // useEffect(
  //   () => {
  //   }, []);

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
      <main>
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
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Vote App</span>
          </div>
          <div className="md:block md:w-auto pt-1">
            <ul className='flex md:flex-row md:space-x-8 md:text-xl md:font-medium'>
              <li><a href='http://localhost:1234/'> Home </a></li>
              <li><a href='http://localhost:1234/candidate'> Add Candidate </a></li>
              <li><a href='http://localhost:1234/voter'> Add Voter </a></li>
              <button className="link text-red-400" style={{ float: 'right' }} onClick={logout}>
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
    // <>
    //   <button className="link" style={{ float: 'right' }} onClick={logout}>
    //     Sign out
    //   </button>
    //   <main>
    //     <h1>
    //       <label
    //         htmlFor="greeting"
    //         style={{
    //           color: 'var(--secondary)',
    //           borderBottom: '2px solid var(--secondary)'
    //         }}
    //       >
    //         {greeting}
    //       </label>
    //       {' '/* React trims whitespace around tags; insert literal space character when needed */}
    //       {window.accountId}!
    //     </h1>
    //     <form onSubmit={async event => {
    //       event.preventDefault()

    //       // get elements from the form using their id attribute
    //       const { fieldset, greeting } = event.target.elements

    //       // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
    //       const newGreeting = greeting.value

    //       // disable the form while the value gets updated on-chain
    //       fieldset.disabled = true

    //       try {
    //         // make an update call to the smart contract
    //         // pass the value that the user entered in the greeting field
    //         await console.log(nft_tokens());
    //       } catch (e) {
    //         alert(
    //           'Something went wrong! ' +
    //           'Maybe you need to sign out and back in? ' +
    //           'Check your browser console for more info.'
    //         )
    //         throw e
    //       } finally {
    //         // re-enable the form, whether the call succeeded or failed
    //         fieldset.disabled = false
    //       }

    //       // update local `greeting` variable to match persisted value
    //       setGreeting(newGreeting)

    //       // show Notification
    //       setShowNotification(true)

    //       // remove Notification again after css animation completes
    //       // this allows it to be shown again next time the form is submitted
    //       setTimeout(() => {
    //         setShowNotification(false)
    //       }, 11000)
    //     }}>
    //       <fieldset id="fieldset">
    //         <label
    //           htmlFor="greeting"
    //           style={{
    //             display: 'block',
    //             color: 'var(--gray)',
    //             marginBottom: '0.5em'
    //           }}
    //         >
    //           <h2 className='text-orange-500 text-5xl center'>
    //             Hey! Baby!
    //           </h2>
    //           Change greeting
    //         </label>
    //         <div style={{ display: 'flex' }}>
    //           <input
    //             autoComplete="off"
    //             defaultValue={greeting}
    //             id="greeting"
    //             onChange={e => setButtonDisabled(e.target.value === greeting)}
    //             style={{ flex: 1 }}
    //           />
    //           <button
    //             disabled={buttonDisabled}
    //             style={{ borderRadius: '0 5px 5px 0' }}
    //           >
    //             Save
    //           </button>
    //         </div>
    //       </fieldset>
    //     </form>
    //     <p>
    //       Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
    //     </p>
    //     <ol>
    //       <li>
    //         Look in <code>src/App.js</code> and <code>src/utils.js</code> – you'll see <code>get_greeting</code> and <code>set_greeting</code> being called on <code>contract</code>. What's this?
    //       </li>
    //       <li>
    //         Ultimately, this <code>contract</code> code is defined in <code>assembly/main.ts</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
    //       <li>
    //         When you run <code>yarn dev</code>, the code in <code>assembly/main.ts</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code> at the <code>scripts</code> section to find the <code>dev</code> command.</li>
    //     </ol>
    //     <hr />
    //     <p>
    //       To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
    //     </p>
    //   </main>
    //   {showNotification && <Notification />}
    // </>

  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || 'development')
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'set_greeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
