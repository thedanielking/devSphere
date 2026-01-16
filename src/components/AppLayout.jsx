import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import SideNavBar from "./SideNavBar";
import { useState } from "react";

function AppLayout() {
    const [openSideNav, setOpenSideNav] = useState(false);

    const toggleSideNav = ()=>{
        setOpenSideNav((value)=> !value);
    }


    return (
        <div className="p-1">
            <Navbar toggleSideNav={toggleSideNav} />
            <main className="text-text p-4 min-h-screen flex justify-center items-start">
                <SideNavBar display={openSideNav} />
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout

