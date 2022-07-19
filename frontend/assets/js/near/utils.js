import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
const BN = require("bn.js");

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['nft_metadata', 'nft_tokens_for_kind', 'nft_token', 'nft_return_candidate_likes', 'check_voter_has_been_added', 'check_voter_has_voted'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['new_default_meta', 'nft_mint', 'nft_transfer', 'nft_add_likes_to_candidate', 'voter_voted'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function new_default_meta() {
  await window.contract.new_default_meta(
    { owner_id: window.accountId }
  )
}

export async function nft_mint(title, description, media, media_CID, candidate_name, candidate_manifest, token_kind, receiver_id) {
  await window.contract.nft_mint(
    {
      metadata: {
        title: title,
        description: description,
        media: media,
        media_CID: media_CID,
        candidate_name: candidate_name,
        candidate_manifest: candidate_manifest,
        token_kind: token_kind
      },
      receiver_id: receiver_id,
    },
    300000000000000, // attached GAS (optional)
    new BN("1000000000000000000000000")
  )
}

export async function nft_transfer(receiver_id, token_id) {
  await window.contract.nft_transfer(
    {
      receiver_id: receiver_id,
      token_id: token_id
    },
    300000000000000, // attached GAS (optional)
    new BN("1")// deposit yoctoNEAR
  )
}

export async function nft_add_likes_to_candidate(token_id) {
  await window.contract.nft_add_likes_to_candidate(
    { token_id: token_id }
  )
}

export async function nft_metadata() {
  let contract_metadata = await window.contract.nft_metadata()
  return contract_metadata;
}

export async function nft_tokens_for_kind(token_kind) {
  let tokens_list = await window.contract.nft_tokens_for_kind(
    {
      token_kind: token_kind
    }
  )
  return tokens_list
}

// get specified token
export async function nft_token(token_id) {
  let token = await window.contract.nft_token(
    {
      token_id: token_id
    }
  )
  return token
}

export async function nft_return_candidate_likes(token_id) {
  let token = await window.contract.nft_token(
    {
      token_id: token_id
    }
  )
  return token
}

export async function check_voter_has_been_added(voter_id) {
  return await window.contract.check_voter_has_been_added(
    { voter_id: voter_id }
  )
}

export async function check_voter_has_voted(voter_id) {
  return await window.contract.check_voter_has_voted(
    { voter_id: voter_id }
  )
}

export async function voter_voted(voter_id) {
  return await window.contract.voter_voted(
    { voter_id: voter_id }
  )
}