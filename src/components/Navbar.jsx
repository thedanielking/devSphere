import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { GoPerson } from "react-icons/go";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

function Navbar({ toggleSideNav, display }) {
    const { user, userProfile } = useAuth();  

    return (
        /* 1. NEW STRATEGY: Full-width outer layout block that is sticky, transparent, and blurs everything scrolling behind it */
        <div className="w-full sticky top-0 z-50 backdrop-blur-lg px-4 shadow md:shadow-none">

            {/* 2. PRESERVED DESIGN: Your exact capsule layout remains completely intact, but is no longer handling top stickiness natively */}
            <nav className="flex justify-between items-center px-1 lg:px-5 py-3 w-full lg:max-w-xl mx-auto lg:shadow-lg lg:rounded-full lg:mt-6 lg:mb-4">
                <div className="flex items-center gap-4">
                    {user ? (
                        display ? (
                            <LuPanelLeftClose className="text-xl cursor-pointer lg:hidden" onClick={toggleSideNav} />
                        ) : (
                            <LuPanelRightClose className="text-xl cursor-pointer lg:hidden" onClick={toggleSideNav} />
                        )
                    ) : null}
                    <Link to="/">
                        <img src="/default-monochrome-black.svg" alt="DevSphere Logo" className="w-[90px] md:w-[100px]" crossOrigin="anonymous" />
                    </Link>
                </div>

                <div className="flex gap-4 items-center">
                    <Link to="/posts" className="font-medium text-base lg:text-lg hover:underline">Articles</Link>
                    {user ? (
                        <Link to="/profile">
                            {userProfile?.avatar_url ? (
                                <div className="w-7 h-7 p-1 shadow-sm overflow-hidden ring-primary-darker rounded-full">
                                    <img src={userProfile.avatar_url || `../person.png`} alt="avatar" crossOrigin="anonymous" className="w-full h-full object-cover rounded-full" />
                                </div>
                            ) : (
                                <GoPerson className="text-primary text-xl" />
                            )}
                        </Link>
                    ) : (
                        <Modal.Open opens="sign-in">
                            <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer hover:px-6 transition-all duration-500">Sign in</button>
                        </Modal.Open>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
