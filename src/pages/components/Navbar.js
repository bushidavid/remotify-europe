import './index.css';
import React from "react";

const Navbar = () => {
    return (  
        <div className="flex p-5 justify-between max-w-4xl w-full place-self-center">
            <div className="">
                <h1><a href="/home">Remotify Europe</a></h1>
            </div>
            <div>
                <a href="/create-job">Post a new job</a>
            </div>
        </div>
    );
}
 
export default Navbar;