import { Link } from "react-router-dom";
import Modal from "./Modal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { GoHome, GoPerson, GoBookmark } from "react-icons/go";
import { CiSettings, CiLogout } from "react-icons/ci";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

function SideNavBar({ display, toggleSideNav }) {
    const { user } = useAuth();
    const ref = useOutsideClick(() => {
        if (display) toggleSideNav();
    }, true);

    if (!user) return null;

    return (
        <ul
            ref={ref}
            className={`px-4 py-6 space-y-2 text-base backdrop-blur-lg shadow-md
                fixed left-0 h-dvh z-50 
                transition-all duration-300 ease-in-out
                
                /* Mobile Behavior */
                ${display ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
                
                /* Large Screen (Desktop) Behavior */                
                lg:sticky lg:top-32 lg:h-[calc(100vh-200px)] lg:overflow-y-visible lg:z-0 lg:backdrop-blur-none lg:shadow-none lg:border-r lg:border-r-stone-200 lg:translate-x-0
                ${display ? 'lg:w-40 lg:px-1' : 'lg:w-0 lg:px-0 lg:py-0 lg:border-none'}
            `}
        >
            {/* 2. FIXED: Turned the button layout sticky/z-10 so it floats visible above scrolling links */}
            <div className="absolute top-6 right-4 lg:sticky lg:top-0 lg:z-10">
                {display ? (
                    <LuPanelLeftClose className="text-xl cursor-pointer transition-all duration-300 ml-auto hidden lg:block text-stone-600 hover:text-stone-900" onClick={toggleSideNav} />
                ) : (
                    <LuPanelRightClose className="text-xl cursor-pointer transition-all duration-300 mr-auto hidden lg:block text-stone-600 hover:text-stone-900" onClick={toggleSideNav} />
                )}
            </div>
            
            {/* 3. SCROLL ISOLATION LAYER: Put internal scrolling rules here so long item trees don't affect parent wrappers */}
            <div className={`w-54 lg:w-34 space-y-10 pt-6 overflow-y-auto max-h-[calc(100vh-150px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-200 ${display ? 'opacity-100' : 'opacity-0 pointer-events-none lg:hidden'}`}>
                <Link to="/" className="px-3 py-4 flex items-center gap-2 hover:bg-stone-50 cursor-pointer rounded transition-colors">
                    <GoHome className="text-primary text-xl" />
                    <span>Home</span>
                </Link>

                <Link to="/profile" className="px-3 py-4 flex items-center gap-2 hover:bg-stone-50 cursor-pointer rounded transition-colors">
                    <GoPerson className="text-primary text-xl" />
                    <span>Profile</span>
                </Link>

                <Link to="/stories" className="px-3 py-4 flex items-center gap-2 hover:bg-stone-50 cursor-pointer rounded transition-colors">
                    <GoBookmark className="text-primary text-xl" />
                    <span>Stories</span>
                </Link>

                <Link to="/settings" className="px-3 py-4 flex items-center gap-2 hover:bg-stone-50 cursor-pointer rounded transition-colors">
                    <CiSettings className="text-primary text-xl" />
                    <span>Settings</span>
                </Link>

                {user && (
                    <Modal.Open opens="logout">
                        <li className="px-3 py-4 flex items-center gap-2 hover:bg-stone-50 cursor-pointer rounded transition-colors list-none">
                            <CiLogout className="text-primary text-xl" />
                            <span>Logout</span>
                        </li>
                    </Modal.Open>
                )}
            </div>
        </ul>
    );
}

export default SideNavBar;
