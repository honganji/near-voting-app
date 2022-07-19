import React, { useEffect, useState } from "react";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes, check_voter_has_been_added,
    check_voter_has_voted, voter_voted
} from '../js/near/utils'
import CandidateCard from "../component/candidate_card";
import DeadLine from "../component/deadline";
import { async } from "regenerator-runtime";
import LikeIcon from '../img/like_icon.png'

// home screen(you can vote here)
const Home = () => {
    const [candidateInfoList, setCandidateInfo] = useState();
    const [likesList, setLikesInfo] = useState([]);

    useEffect(() => {
        nft_tokens_for_kind("candidate").then(value => {
            setCandidateInfo(value);
        });


    }, [])

    const vote = (token_id) => {
        check_voter_has_voted(window.accountId).then(value => {
            console.log(Boolean(value));
            if (Boolean(value)) return

            check_voter_has_been_added(window.accountId).then(value => {
                let tokenIdOfVoter = parseFloat(value);
                if (tokenIdOfVoter == 0) return

                console.log(tokenIdOfVoter);

                nft_add_likes_to_candidate(token_id);
                nft_transfer(process.env.CONTRACT_NAME, tokenIdOfVoter);
                voter_voted(window.accountId);
            })
        })

    }

    const generateCandidateCard = () => {
        let candidateCardList = [];
        for (let i = 0; i < candidateInfoList.length; i++) {
            candidateCardList.push(
                <div className="items-center">
                    <CandidateCard CID={candidateInfoList[i].metadata.media_CID} name={candidateInfoList[i].metadata.candidate_name} manifest={candidateInfoList[i].metadata.candidate_manifest} />
                    <div className="center text-xl items-center">
                        <img src={LikeIcon} className="object-cover h-5 w-5 mr-2" />
                        <p className="mr-2">0</p>
                        <button value={candidateInfoList[i].metadata.token_id} onClick={(event) => vote(parseInt(event.target.value))} className="h-8 px-3 py-0 my-2 font-sans text-xl font-semibold text-white transition ease-in-out bg-purple-600 border-purple-800 rounded shadow-lg shadow-purple-600/50 hover:skew-1 hover:border-purple-600">Vote!</button>
                    </div>
                </div>

            )

        }
        return candidateCardList
    }

    if (candidateInfoList == undefined) {
        return <div>wait a minute</div>
    } else {
        return (
            <div>
                <div className="grid grid-cols-3 gap-10">
                    {generateCandidateCard()}
                </div>
            </div>


        )
    }

}
export default Home;