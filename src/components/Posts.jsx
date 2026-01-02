import { GoClock, GoFilter, GoSearch} from "react-icons/go"
import { FaFire } from "react-icons/fa";
import { TbPencilCode } from "react-icons/tb";
import usePosts from "../features/posts/usePosts";
import Skeleton from "@mui/material/Skeleton";
import Post from "./Post";

function Posts() {
    const {isLoading, posts, error} = usePosts();
    const skeletonCount = posts && posts.length > 0 ? posts.length : 6;;
    return (
        <div className="flex-1 p-10 space-y-6 lg:py-10 lg:px-30">
            <div>
                <h2 className="text-3xl font-semibold lg:text-4xl">Articles</h2>
                <p className="text-lg text-text lg:text-xl">Discover and share developers articles</p>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center gap-2">
                    <GoFilter className="text-3xl" />
                    <div className="flex gap-3 items-center px-4 py-2 rounded-3xl w-[500px] bg-stone-100 lg:w-[600px]">
                        <GoSearch className="text-xl" /> 
                        <input type="text" placeholder="Search articles..." className="outline-0 w-full placeholder:text-stone-600 text-stone-900 p-1 text-xl"/>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex items-center gap-2 ring ring-stone-400 rounded-full px-5 py-2">
                        <GoClock className="text-xl text-primary" />
                        <p className="text-xl lg:text-2xl">Latest</p>
                    </div>
                    <div className="flex items-center gap-2 ring ring-stone-400 rounded-full px-5 py-2">
                        <FaFire className="text-xl text-primary" />
                        <p className="text-xl lg:text-2xl">Popular</p>
                    </div>
                    <div className="px-5 py-2 rounded flex items-center gap-2 bg-primary">
                        <TbPencilCode className="text-xl text-white" />
                        <p className="text-white text-xl lg:text-2xl">Write</p>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                {isLoading 
                ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:gap-6">
                        {Array.from({length: skeletonCount}).map((_, i) => (
                        <div key={i} className="rounded-md p-4 bg-white">
                            <Skeleton variant="rectangular" height={200} />
                            <div className="mt-4">
                                <Skeleton width="60%" />
                                <Skeleton width="40%" />
                                <Skeleton />
                            </div>
                        </div>
                        ))}
                    </div>
                ) : error ? (
                    <p>Error loading posts</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:gap-6">
                        {posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Posts
