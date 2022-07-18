import React, { useEffect, useState } from "react";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes,
} from '../js/near/utils'
import CandidateCard from "../component/candidate_card";
import DeadLine from "../component/deadline";
import { async } from "regenerator-runtime";

// home screen(you can vote here)
const Home = () => {
    const [candidateInfoList, setCandidateInfo] = useState();
    // nft_tokens_for_kind("candidate").then(value => {
    //     setCandidateInfo(value);
    //     console.log(value)
    // })
    // console.log(candidateInfoList)

    useEffect(async () => {
        nft_tokens_for_kind("candidate").then(value => {
            setCandidateInfo(value);
        })
    }, [])

    const generateCandidateCard = () => {
        let candidateCardList = [];
        for (let i = 0; i < candidateInfoList.length; i++) {
            candidateCardList.push(
                <CandidateCard CID={candidateInfoList[i].metadata.media_CID} name={candidateInfoList[i].metadata.candidate_name} manifest={candidateInfoList[i].metadata.candidate_manifest} likes={""} />
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