import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function AppLayout() {
    return (
        <div className="p-1">
            <Navbar />
            <main className="text-text p-4 min-h-screen flex justify-center items-start">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout

