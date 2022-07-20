import React, { useEffect, useState } from "react";
import Title from "../component/title";
import Input from "../component/input_form";
import { async } from "regenerator-runtime";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes, check_voter_has_been_added
} from '../js/near/utils'

// add vote screen
const Voter = () => {

    const [inputId, setInputId] = useState("");

    const mint = async () => {
        if (window.accountId !== process.env.CONTRACT_NAME) {
            alert("You are not contract deployer, so you can't add voter")
            return
        }
        const isMinted = await check_voter_has_been_added(`${inputId}`);
        if (isMinted !== 0) {
            alert("You've already got vote ticket or voted and used it!")
            return
        }
        await nft_mint("Vote Ticket", "", "https://gateway.pinata.cloud/ipfs/QmUs5K3LwdvbhKA58bH9C6FX5Q7Bhsvvg9GRAhr9aVKLyx", "QmUs5K3LwdvbhKA58bH9C6FX5Q7Bhsvvg9GRAhr9aVKLyx", "Vote Ticket", "You can vote with this ticket! But remember that you can do it just once.", "vote", `${inputId}`);
        alert(`Vote ticket is minted to ${inputId}!`);
        setInputId("");
    }

    return (
        <div className="grid place-items-center w-full">
            <Title name="Add Voter" />
            <div className="text-lg">※Only contract deployer can add voter.</div>
            <div className="mb-24"></div>
            <Input title="Wallet ID" hint="0x..." input={inputId} type="text" setInput={(event) => setInputId(event.target.value)} />
            <div className="mb-24"></div>
            <button className="button" onClick={() => mint()}>Add</button>
        </div>
    )
}
export default Voter;