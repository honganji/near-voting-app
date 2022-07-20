import React, { useEffect, useState } from "react";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes, check_voter_has_been_added,
    check_voter_has_voted, voter_voted, close_election, if_election_closed
} from '../js/near/utils'
import CandidateCard from "../component/candidate_card";
import LikeIcon from '../img/like_icon.png'

// home screen(you can vote here)
const Home = () => {
    const [candidateInfoList, setCandidateInfoList] = useState();
    const [candidateLikesList] = useState([]);
    const [state, setState] = useState("fetching");
    const State = {
        Fetching: "fetching",
        Fetched: "fetched",
        Show: "show",
        Closed: "closed"
    }


    useEffect(async () => {
        await nft_tokens_for_kind("candidate").then(value => {
            setCandidateInfoList(value);
            setState("fetched");
            // { confirmClosed() }
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
                        <p className="mr-2">{(candidateLikesList[i])}</p>
                        <button value={candidateInfoList[i].metadata.token_id} onClick={(event) => vote(parseInt(event.target.value))} className="vote_button hover:skew-1">Vote!</button>
                    </div>
                </div>

            )

        }
        return candidateCardList
    }

    const getCandidateLikes = async () => {
        for (let i = 0; i < candidateInfoList.length; i++) {
            await nft_return_candidate_likes(candidateInfoList[i].metadata.token_id).then(value => {
                candidateLikesList.push(value);
            })
        }
        setState("show");
    }

    const closeButton = () => {
        if (window.accountId !== process.env.CONTRACT_NAME) {
            return
        }
        return <button className="close_button hover:skew-1 h-10 bg-red-600 mb-3" onClick={() => {
            let isSureToClose = confirm("Are you sure to close this election?");
            if (isSureToClose) {
                close_election()
            }
        }}>Close Election</button>
    }

    const messageToWait = () => {
        return <div className="grid h-screen place-items-center text-3xl">Fetching NFTs of candidates...</div>
    }


    // const confirmClosed = async () => {
    //     let isClosed = await if_election_closed();
    //     if (isClosed) {
    //         console.log(isClosed);
    //         setState("closed");
    //     }
    //     console.log(isClosed);
    // }

    switch (state) {
        case State.Fetching:
            return <div>{messageToWait()}</div>
        case State.Fetched:
            getCandidateLikes();
            return <div>{messageToWait()}</div>
        case State.Show:
            return (
                < div >
                    <div className="center">{closeButton()}</div>

                    <div className="grid grid-cols-3 gap-10">
                        {generateCandidateCard()}
                    </div>
                </ div>
            )
        case State.Closed:
            return <div>close</div>
    }

}
export default Home;