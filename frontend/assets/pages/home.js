import React, { useEffect, useState } from "react";
import {
    login, logout, new_default_meta, nft_mint,
    nft_transfer, nft_add_likes_to_candidate,
    nft_metadata, nft_tokens_for_kind, nft_token,
    nft_return_candidate_likes, check_voter_has_been_added,
    check_voter_has_voted, voter_voted, close_election, if_election_closed,
    reopen_election
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
        });
    }, [])

    const vote = (token_id) => {
        check_voter_has_voted(window.accountId).then(value => {
            if (Boolean(value)) {
                alert("You have already voted!")
                return
            }

            check_voter_has_been_added(window.accountId).then(value => {
                let tokenIdOfVoter = parseFloat(value);
                if (tokenIdOfVoter == 0) {
                    alert("You don't have vote ticket! Please ask deployer to give it to you.")
                    return
                }
                let isSure = confirm("Once you vote, you can't change selected candidate. Are you OK?");
                if (!isSure) {
                    return
                }
                nft_transfer(process.env.CONTRACT_NAME, tokenIdOfVoter);
                nft_add_likes_to_candidate(token_id);
                voter_voted(window.accountId);
            })
        })

    }

    const cardsInCaseOpen = () => {
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

    const cardsInCaseClosed = () => {
        let candidateCardList = [];
        let mostVotedNum = candidateLikesList.reduce((a, b) => { return Math.max(a, b) });

        for (let i = 0; i < candidateInfoList.length; i++) {
            if (candidateLikesList[i] == mostVotedNum) {
                candidateCardList.push(
                    <div className="items-center">
                        <div className="text-2xl shadow-rose-600 center font-semibold text-red-700">Won!</div>
                        <CandidateCard CID={candidateInfoList[i].metadata.media_CID} name={candidateInfoList[i].metadata.candidate_name} manifest={candidateInfoList[i].metadata.candidate_manifest} />
                        <div className="center text-xl items-center">
                            <img src={LikeIcon} className="object-cover h-5 w-5 mr-2" />
                            <p className="mr-2">{(candidateLikesList[i])}</p>
                        </div>
                    </div>

                )
            } else {
                candidateCardList.push(
                    <div className="items-center opacity-20">
                        <div className="pt-7"></div>
                        <CandidateCard CID={candidateInfoList[i].metadata.media_CID} name={candidateInfoList[i].metadata.candidate_name} manifest={candidateInfoList[i].metadata.candidate_manifest} />
                        <div className="center text-xl items-center">
                            <img src={LikeIcon} className="object-cover h-5 w-5 mr-2" />
                            <p className="mr-2">{(candidateLikesList[i])}</p>
                        </div>
                    </div>

                )
            }

        }
        return candidateCardList
    }

    const getCandidateLikes = async () => {
        for (let i = 0; i < candidateInfoList.length; i++) {
            await nft_return_candidate_likes(candidateInfoList[i].metadata.token_id).then(value => {
                candidateLikesList.push(value);
            })
        }
        confirmClosed();
    }

    const closeButton = () => {
        if (window.accountId !== process.env.CONTRACT_NAME) {
            return
        }
        return <button className="close_button hover:skew-1 h-10 bg-red-600 mb-3" onClick={() => {
            let isSureToClose = confirm("Are you sure to close this election?");
            if (isSureToClose) {
                close_election()
                setState("closed")
            }
        }}>Close Election</button>
    }

    const reopenButton = () => {
        if (window.accountId !== process.env.CONTRACT_NAME) {
            return
        }
        return <button className="close_button hover:skew-1 h-10 bg-red-600 mb-3" onClick={() => {
            let isSureToClose = confirm("Are you sure to reopen this election?");
            if (isSureToClose) {
                reopen_election()
                setState("show")
            }
        }}>Reopen Election</button>
    }

    const messageToWait = () => {
        return <div className="grid h-screen place-items-center text-3xl">Fetching NFTs of candidates...</div>
    }


    const confirmClosed = async () => {
        let isClosed = await if_election_closed();
        console.log(isClosed);
        if (isClosed) {
            setState("closed");
        } else {
            setState("show")
        }


    }

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
                        {cardsInCaseOpen()}
                    </div>
                </ div>
            )
        case State.Closed:
            return (
                < div >
                    <div className="center">{reopenButton()}</div>
                    <div className="grid grid-cols-3 gap-10">
                        {cardsInCaseClosed()}
                    </div>
                </ div>
            )
    }

}
export default Home;