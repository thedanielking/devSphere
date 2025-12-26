import { useState } from "react"
import { HiOutlineBars3, HiXMark } from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user } =  useAuth(); 
    // console.log(user);
    const [openNav, setOpenNav] = useState(false);

    const handleToggle = ()=>{
        setOpenNav(!openNav)
    }

    return (
        <nav className="flex justify-between items-center p-4 relative">
            <img src="../default-monochrome-black.svg" alt="DevSphere Logo" width={150} />
            {user 
            ? <p>{user?.email}</p> 
            : (
                <>
                <HiOutlineBars3 onClick={handleToggle} className=" text-3xl cursor-pointer "/>
                <div className={openNav ? `h-screen w-full right-0 top-0 z-1 bg-stone-900/50 absolute translate-x-2`: `hidden`}>
                    <div className={`bg-stone-200 h-full w-3/4 absolute right-0 top-0 p-5 flex flex-col gap-5`}>
                        <HiXMark className="self-end text-2xl cursor-pointer" onClick={handleToggle} />
                        <ul className="flex flex-col gap-6 text-lg">
                            <Link to="/" className="text-xl">Home</Link>
                            <Link to="/login" className="text-xl">Login</Link>
                            <Link to="/signUp" className="text-xl">Sign Up</Link>
                        </ul>
                    </div>
                </div>
                </>
            )
            }    
        </nav>
    )
}

export default Navbar
