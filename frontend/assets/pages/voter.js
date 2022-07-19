import React, { useEffect, useState } from "react";
import Title from "../component/title";
import Input from "../component/input_form";
import { async } from "regenerator-runtime";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes,
} from '../js/near/utils'

// add vote screen
const Voter = () => {

    const [inputId, setInputId] = useState("");

    const mint = async () => {
        await nft_mint("Vote Ticket", "", "https://gateway.pinata.cloud/ipfs/QmUs5K3LwdvbhKA58bH9C6FX5Q7Bhsvvg9GRAhr9aVKLyx", "QmUs5K3LwdvbhKA58bH9C6FX5Q7Bhsvvg9GRAhr9aVKLyx", "Vote Ticket", "You can vote with this ticket! But remember that you can do it just once.", "vote", `${inputId}`);
        console.log({ inputId });
        setInputId("");
    }

    return (
        <div className="grid place-items-center w-full">
            <Title name="Add Voter" />
            <div className="mb-24"></div>
            <Input title="Wallet ID" hint="0x..." input={inputId} type="text" setInput={(event) => setInputId(event.target.value)} />
            <div className="mb-24"></div>
            <button className="button" onClick={() => mint()}>Add</button>
        </div>


    )
}
export default Voter;