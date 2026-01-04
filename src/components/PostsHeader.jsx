import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"
import SortBy from "./SortBy"
import WritePostButton from "./WritePostButton"

function PostsHeader() {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center gap-2">
                    <FilterBar />
                    <SearchBar />
                </div>
                <div className="flex gap-5">
                    <SortBy />
                    <WritePostButton />
                </div>
            </div>
    )
}

export default PostsHeader
