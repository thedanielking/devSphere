import { useState } from "react"
// import { HiOutlineBars3, HiXMark } from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user } =  useAuth(); 

    return (
        <nav className="flex justify-between items-center px-5 py-3 max-w-xl mx-auto sticky top-2 z-10 w-full backdrop-blur-lg bg-white/30 border-b border-white border-opacity-30 shadow-lg rounded-full mt-10">
            <Link to="/">
                <img src="../default-monochrome-black.svg" alt="DevSphere Logo" className="w-[120px] md:w-[150px]" />
            </Link>
            <div className="flex gap-4 items-center">
                <Link to="/posts" className="font-medium text-lg lg:text-xl  hover:underline">Articles</Link>
                {user 
                ? <img src="../team3.jpg" alt="avatar" className="w-7 h-7 rounded-full" />
                : <Link to="/login" className="bg-primary text-stone-100 px-5 py-2 rounded-full hover:opacity-90 transition ">
                    Sign In
                </Link>
                }
                
            </div>
        </nav>
    )
}

export default Navbar
