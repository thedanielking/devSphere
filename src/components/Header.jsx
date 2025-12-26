import {GoSearch} from "react-icons/go";
import Button from "./Button";

function Header() {
    return (
        <>
            <section className=" rounded px-6 py-10 space-y-7 flex flex-col justify-center items-center text-center mb-10 lg:px-20 lg:py-16">
                <h1 className="text-5xl tracking-widest  font-semibold lg:text-7xl">Learn. Code. Grow</h1>
                <p className="text-stone-700">A collaborative platform for developers and students to share knowledge about their code, what they learnt, what they can do and what actually works!</p>
                <form className="flex items-center gap-2">
                    <div className="flex gap-3 items-center px-4 py-2 rounded-3xl w-[300px] bg-stone-100 lg:w-[500px]">
                        <GoSearch className="text-xl" /> 
                        <input type="text" placeholder="Search articles..." className="outline-0 w-full placeholder:text-stone-600 text-stone-900 p-1"/>
                    </div>
                    <Button type="submit">
                        Search
                    </Button>
                </form>
            </section>
        </>
    )
}

export default Header
