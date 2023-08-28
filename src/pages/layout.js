import React from "react";
import Navbar from "./navbar";

const Layout = ({ children }) => {
    return ( 
        <div className="flex flex-col h-screen w-screen">
            <Navbar />
            { children }
        </div>

     );
}
 
export default Layout;