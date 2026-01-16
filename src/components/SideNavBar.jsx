import { GoHome, GoPerson, GoBookmark } from "react-icons/go";
import { CiSettings, CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

function SideNavBar({display}) {
    return (
        <ul className={`px-4 py-6 space-y-12 text-xl backdrop-blur-lg shadow-md
    fixed left-0 h-screen w-64 z-50
    transform transition-transform duration-300 ease-in-out
    ${display ? 'translate-x-0' : '-translate-x-full'}
    lg:static lg:translate-x-0 lg:z-auto lg:block lg:w-64 lg:transition-none
  `}>
            
            <Link to="/" className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded">
                <GoHome className="text-primary" />
                <span>Home</span>                
            </Link>
            
            <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded">
                <GoPerson className="text-primary" />
                <span>Profile</span>
            </Link>

            <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded">
                <GoBookmark className="text-primary" />
                <span>Library</span>
            </Link>

            <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded">
                <CiSettings className="text-primary" />
                <span>Settings</span>
            </Link>

            <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded">
                <CiLogout className="text-primary" />
                <span>Logout</span>
            </Link>
        </ul>
    )
}

export default SideNavBar
