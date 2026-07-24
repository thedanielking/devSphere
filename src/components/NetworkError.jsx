import { RiSignalWifiErrorFill } from "react-icons/ri";

function NetworkError() {

    const handleRefresh = () =>{
        window.location.reload(false)
    }
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 gap-2 text-center select-none flex-1, w-full, min-h-[60vh]">
            
            {/* ── Icon with radiating rings ────────────────────────────────────── */}
            <div className="relative flex items-center justify-center mb-8">
                {/* Outermost ring */}
                <span
                aria-hidden="true"
                className="absolute w-36 h-36 rounded-full border border-stone-200/70"
                />
                {/* Middle ring */}
                <span
                aria-hidden="true"
                className="absolute w-24 h-24 rounded-full border border-stone-200"
                />
                {/* Icon container */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-100 shadow-sm ring-1 ring-stone-200">
                    <RiSignalWifiErrorFill 
                    aria-hidden="true"
                    className="text-2xl text-stone-400" />                    
                </div>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-stone-800">
                Something went wrong on our end
            </h2>

            
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
                    Check your connection and refresh the page.
            </p>

            <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-stone-700 text-sm font-semibold  transition-all duration-150 underline underline-offset-3 cursor-pointer hover:-translate-y-0.5"
            >
                Refresh
            </button>


        </div>
    )
}

export default NetworkError
