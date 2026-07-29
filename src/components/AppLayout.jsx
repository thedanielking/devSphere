import { useState } from "react";
import { Outlet } from "react-router-dom"
import { CiLogout } from "react-icons/ci";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "./Navbar"
import SideNavBar from "./SideNavBar";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import useLogout from "../features/authentication/useLogout";
import Footer from "./Footer";


function AppLayout() {
    const [openSideNav, setOpenSideNav] = useState(false);
    const {loading: logoutLoading, logout} = useLogout();
    

    const toggleSideNav = ()=>{
        setOpenSideNav((value)=> !value);
    }

    function handleLogout(){
        logout();
    }



    return (
        <div className="min-h-screen flex flex-col p-1 ">
            <Modal>
                <Navbar toggleSideNav={toggleSideNav}  display={openSideNav} />
                <main className="text-text p-4 flex flex-1 w-full gap-4 max-w-7xl mx-auto items-start">
                    <SideNavBar display={openSideNav} toggleSideNav={toggleSideNav} />
                    <div className="flex-1 min-w-0 lg:px-6">
                        <Outlet />
                    </div>
                </main>
                
                <Footer />
                
                <Modal.Window name="sign-in">
                    <Login />
                </Modal.Window>
                <Modal.Window name="sign-up">
                    <Signup />
                </Modal.Window>
                <Modal.Window name="logout">
                    <ConfirmAction onClick={handleLogout} icon={<CiLogout className="text-lg" />} action={"logout"} loading={logoutLoading} />
                </Modal.Window>                    
            </Modal>
        </div>
    )
}

export default AppLayout

