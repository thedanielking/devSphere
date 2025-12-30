import usePosts from "../features/posts/usePosts";
import Post from "./Post"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

function Posts() {
    const {isLoading, posts, error} = usePosts();
    
    if(error) return <p className="text-red-400">{error}</p>;

    if (isLoading) {
        // render skeleton placeholders while loading
        const skeletonCount = posts && posts.length > 0 ? posts.length : 3;
        return (
            <div className="p-10 lg:p-0 lg:max-w-7xl lg:mx-auto">
                <Box>
                    <h2 className="text-2xl lg:text-3xl font-medium">Latest Articles</h2>
                    <p className="text-md lg:text-lg text-stone-500 mt-2">Loading...</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 lg:gap-6">
                        {Array.from({length: skeletonCount}).map((_, i) => (
                            <div key={i} className="rounded-md p-4">
                                <Skeleton variant="rectangular" height={140} />
                                <div className="mt-4">
                                    <Skeleton width="60%" />
                                    <Skeleton width="40%" />
                                    <Skeleton />
                                </div>
                            </div>
                        ))}
                    </div>
                </Box>
            </div>
        );
    }

    return (        
        <div className="p-10 lg:p-0 lg:max-w-7xl lg:mx-auto">
            <h2 className="text-2xl lg:text-3xl font-medium">Latest Articles</h2>
            <p className="text-md lg:text-lg text-stone-500 mt-2">{posts.length} articles found</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 lg:gap-6">
                {posts.map((post)=> (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}



export default Posts
