import usePosts from "../features/posts/usePosts";
import Filter from "../components/Filter"
import Header from "../components/Header"
import PostsList from "../components/PostsList";

function Homepage() {
    const {isLoading, posts, error} = usePosts();
    const limit = 6;
    const popularPosts = posts.slice(0, limit).map(post => {
        return post;
    })  
    return (
        <div className="">
            <Header />
            <section className="space-y-3">
                <div>
                    <hr className="text-neutral-200"/>
                    <h3 className="uppercase text-center tracking-widest mt-10 font-bold">Explore trending topics</h3>
                    <Filter />
                </div>
                <div className="py-12 px-2 lg:py-20 lg:px-10">
                    <h2 className="text-xl lg:text-2xl font-medium">Popular Articles</h2>
                    <p className="text-sm lg:text-base text-stone-500 mt-1">Discover trending developer articles</p>
                    <PostsList posts={popularPosts} isLoading={isLoading} error={error} />
                </div>
            </section>
        </div>
    )
}

export default Homepage
