import React from 'react';
import Title from "../component/title";
import Input from "../component/input_form";

// add candidate screen
function Candidate() {
    return (
        <div className="grid place-items-center w-full">
            <Title name="Add Candidate" />
            <div className="mb-14"></div>
            <Input title="Image URI(Pinata CID)" hint="QmT..." className="mb-3" />
            <div className="mb-6"></div>
            <Input title="Name" hint="Robert Downey Jr." />
            <div className="mb-6"></div>
            <Input title="Manifest" hint="I'm gonna prosper this city with web3 tech!" />
            <div className="mb-6"></div>
            <button className="button">Add</button>
        </div>

    )
}
export default Candidate;