import usePosts from "../features/posts/usePosts";
import Post from "./Post"

function Posts() {
    const {isLoading, posts, error} = usePosts();

    if(isLoading) return <p>Loading posts...</p>;
    if(error) return <p className="text-red-400">{error}</p>;
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
