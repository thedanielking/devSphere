import Skeleton from "@mui/material/Skeleton";
import Filter from "../components/Filter"
import Header from "../components/Header"
import Post from "../components/Post";
import Posts from "../components/Posts"
import usePosts from "../features/posts/usePosts";

function Homepage() {
    const {isLoading, posts, error} = usePosts();
    const limit = 3;
    const popularPosts = posts.slice(0, limit).map(post => {
        return post;
    })  
    return (
        <div>
            <Header />
            <section className="space-y-3">
                <div>
                    <hr className="text-neutral-200"/>
                    <h3 className="uppercase text-center tracking-widest mt-10 font-bold">Explore trending topics</h3>
                    <Filter />
                </div>
                <div className="p-10 lg:p-0 lg:max-w-7xl lg:mx-auto">
                    <h2 className="text-2xl lg:text-3xl font-medium">Popular Articles</h2>
                    <p className="text-md lg:text-lg text-stone-500 mt-1">Discover trending developer articles</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:gap-6">
                        {isLoading ? (
                            Array.from({length: limit}).map((_, i) => (
                                <div key={i} className="rounded-md p-4 bg-white">
                                    <Skeleton variant="rectangular" height={200} />
                                    <div className="mt-4">
                                        <Skeleton width="60%" />
                                        <Skeleton width="40%" />
                                        <Skeleton />
                                    </div>
                                </div>
                            ))
                        ) : (
                            popularPosts.map((post)=>(
                                <Post key={post.id} post={post} />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Homepage
