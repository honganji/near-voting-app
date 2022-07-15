import React from "react";

// template for displaying candidate info
const CandidateCard = (props) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-64 h-96">
            {/* <img className="w-full" src={"https://gateway.pinata.cloud/ipfs/" + props.CID} alt="Sunset in the mountains" /> */}
            <img className="w-full h-3/5" src={props.URI} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 text-base">
                    {props.manifest}
                </p>
            </div>

        </div>
    )

}

export default CandidateCard;