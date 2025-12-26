import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function AppLayout() {
    return (
        <div>
            <Navbar />
            <main className="bg-background text-text p-4 min-h-screen flex justify-center items-start">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout

