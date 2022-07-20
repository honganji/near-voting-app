import React, { useState, useEffect } from 'react';
import Title from "../component/title";
import Input from "../component/input_form";
import { useState } from "react";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes,
} from '../js/near/utils'
import { async } from 'regenerator-runtime';
import { WalletConnection } from 'near-api-js';

// add candidate screen
function Candidate() {
    const [inputCID, setInputCID] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputManifest, setInputManifest] = useState("");

    const addCandidate = async () => {
        await nft_mint(`${inputName}(candidate)`, "", `https://gateway.pinata.cloud/ipfs/${inputCID}`, inputCID, inputName, inputManifest, "candidate", process.env.CONTRACT_NAME);
        setInputCID("");
        setInputName("");
        setInputManifest("");
        alert("Candidate's NFT has minted! Let's Check it at Home screen!")
    }

    return (
        <div className="grid place-items-center w-full">
            <Title name="Add Candidate" />
            <div className="my-3 text-2xl text-red-400">Add candidate who you think must be a leader!</div>
            <Input title="Image URI(Pinata CID)" hint="QmT..." className="mb-3" input={inputCID} setInput={(event) => setInputCID(event.target.value)} />
            <div className="mb-6"></div>
            <Input title="Name" hint="Robert Downey Jr." input={inputName} setInput={(event) => setInputName(event.target.value)} />
            <div className="mb-6"></div>
            <Input title="Manifest" hint="I'm gonna prosper this city with web3 tech!" input={inputManifest} setInput={(event) => setInputManifest(event.target.value)} />
            <div className="mb-6"></div>
            <button className="button" onClick={async () => addCandidate()}>Add</button>
        </div>

    )
}
export default Candidate;