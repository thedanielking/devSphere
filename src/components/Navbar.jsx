import { HiOutlineBars3,} from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { GoPerson } from "react-icons/go";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import useProfile from "../features/profiles/useProfile";
import { useEffect } from "react";


function Navbar({toggleSideNav, display}) {
    const { user } =  useAuth();
    const userId = user?.id;
    const {profile, loading, error, fetchProfile} = useProfile();

    useEffect(()=>{
        if(!userId) return;
        fetchProfile(userId);
    }, [userId])

    
    return (
        <nav className="flex justify-between items-center px-1 lg:px-5 py-3 w-full lg:max-w-xl  mx-auto sticky top-0 z-10  backdrop-blur-lg bg-white/30 border-b border-white border-opacity-30 shadow-lg lg:rounded-full lg:mt-10">
            <div className="flex items-center gap-4">
                {user ? display ? <LuPanelLeftClose className={`text-xl cursor-pointer lg:hidden `}  onClick={toggleSideNav}  /> 
            :
            <LuPanelRightClose className={`text-xl cursor-pointer lg:hidden `}  onClick={toggleSideNav}  /> : null}
                <Link to="/">
                    <img src="../default-monochrome-black.svg" alt="DevSphere Logo" className="w-[90px] md:w-[100px]" cross-origin="anonymous" />
                </Link>
            </div>
            <div className="flex gap-4 items-center">
                <Link to="/posts" className="font-medium text-base lg:text-lg  hover:underline">Articles</Link>
                {user 
                ? ( 
                    <Link to="/profile">
                        {profile ? (
                        <div className="w-7 h-7 overflow-hidden  ring-primary-darker rounded-full">
                            <img src={profile[0]?.avatar_url} alt="avatar" crossOrigin="anonymous" className="w-full h-full object-cover" />
                        </div>
                        ) : <GoPerson className="text-primary text-xl"/>}
                    </Link>
                )
                : (
                    <Modal.Open opens="sign-in">
                        <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer hover:px-6 transition-all duration-500">Sign in</button>
                    </Modal.Open>
                )}
            </div>
        </nav>
    )
}

export default Navbar
