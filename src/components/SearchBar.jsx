import { GoSearch } from "react-icons/go"

function SearchBar() {
    return (
        <div className="flex gap-3 items-center px-4 py-2 rounded-3xl w-[500px] bg-stone-100 lg:w-[600px]">
            <GoSearch className="text-xl" /> 
            <input type="text" placeholder="Search articles..." className="outline-0 w-full placeholder:text-stone-600 text-stone-900 p-1 text-xl"/>
        </div>        
    )
}

export default SearchBar
