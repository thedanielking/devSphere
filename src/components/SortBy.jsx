import { FaFire } from "react-icons/fa"
import { GoClock } from "react-icons/go"

function SortBy({sortBy="latest", onChange}) {

    const activeClass = (name) =>
        `flex items-center gap-2 rounded-full px-5 py-2 ${sortBy === name ? "bg-primary/10 ring ring-primary" : "ring ring-stone-400"}`

    return (
        <div className="flex items-center gap-5">
            <button type="button" onClick={()=> onChange?.("latest")} className={activeClass("latest")}>
                <GoClock className="text-xl text-primary" />
                <p className="text-xl lg:text-2xl">Latest</p>
            </button>
            <button type="button" onClick={()=> onChange?.("popular")} className={activeClass("popular")}>
                <FaFire className="text-xl text-primary" />
                <p className="text-xl lg:text-2xl">Popular</p>
            </button>
        </div>
    )
}

export default SortBy
