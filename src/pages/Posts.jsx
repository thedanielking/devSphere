import { useMemo } from "react";
import PostsHeader from "../components/PostsHeader";
import PostsList from "../components/PostsList";
import { sortByLatest, sortByPopular } from "../utils/helpers";
import usePosts from "../features/posts/usePosts";
import { useSearchParams } from "react-router-dom";

function Posts() {
    const {isLoading, error, posts = []} = usePosts();
    const [searchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "latest";

    const sortedPosts = useMemo(()=> {
        if(!posts || posts.length === 0) return [];
        
        if(sortBy === "latest") {
            return sortByLatest(posts); 
        } else if(sortBy === "popular") {
            return sortByPopular(posts);
        }
    }, [posts, sortBy])
    return (
        <div className="flex-1 p-10 space-y-6 lg:py-10 lg:px-30">
            <div>
                <h2 className="text-3xl font-semibold lg:text-4xl">Articles</h2>
                <p className="text-lg text-text lg:text-xl">Discover and share developers articles</p>
            </div>
            <PostsHeader />
            <PostsList posts={sortedPosts} isLoading={isLoading} error={error} />
        </div>
    )
}

export default Posts
