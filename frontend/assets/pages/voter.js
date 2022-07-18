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
        await nft_mint("King(candidate)", "", "https://gateway.pinata.cloud/ipfs/QmPLdPqETJ6nFwrTWFRv8ooeBzyx5jGv73aRQtXEXNkYrJ", "QmPLdPqETJ6nFwrTWFRv8ooeBzyx5jGv73aRQtXEXNkYrJ", "King", "I will make this country strong", "candidate", `${inputId}`);
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