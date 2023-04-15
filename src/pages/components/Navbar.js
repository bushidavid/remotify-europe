import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (  
        <div className="flex p-5 justify-between max-w-4xl w-full place-self-center">
            <div className="">
                <Link href="/">Remotify Europe </Link>
            </div>
            <div>
                <Link href="./components/create-job">Post a new job</Link>
            </div>
            <div>
                <Link href="/components/login">Log in</Link>
            </div>
            <div>
                <Link href="/components/register">Register</Link>
            </div>
        </div>
    );
}
 
export default Navbar;