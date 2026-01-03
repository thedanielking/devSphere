import Post from "./Post";
import SkeletonLoading from "./SkeletonLoading";

function PostsList({posts = [], isLoading, error}) {
    const skeletonCount = posts && posts.length > 0 ? posts.length : 6;
    return (          
            <div className="mt-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:gap-6">
                {isLoading 
                ? (
                    <SkeletonLoading skeletonCount={skeletonCount} />
                ) : error ? (
                    <p>Error loading posts</p>
                ) : (
                    
                        posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))
                    )}
                </div>
            </div>
    )
}

export default PostsList
