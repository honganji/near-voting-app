import React from "react";
import Title from "../component/title";
import Input from "../component/input_form";

// add vote screen
const Voter = () => {
    return (
        <div className="grid place-items-center w-full">
            <Title name="Add Voter" />
            <div className="mb-24"></div>
            <Input title="Wallet Address" hint="0x..." />
            <div className="mb-24"></div>
            <button className="button">Add</button>
        </div>


    )
}
export default Voter;