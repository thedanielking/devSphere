import PostDetails from "../components/PostDetails"

function PostPage() {
    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Understanding CSS Grid like a simple Mathematics Equation </h1>
            <PostDetails />
            <div className="lg:w-[800px] w-[250px] mx-auto">
                <img src="../team3.jpg" alt="post image" className="w-full m-4"/>
            </div>
            <article>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolor perferendis maxime beatae eaque reprehenderit, aut numquam ipsa corrupti harum at dicta voluptas totam id, enim incidunt doloremque, cum aspernatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quas explicabo ex maiores ducimus cum fugit obcaecati reprehenderit cumque blanditiis nulla voluptates repudiandae et aliquid, deserunt, ipsam officia asperiores quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolor perferendis maxime beatae eaque reprehenderit, aut numquam ipsa corrupti harum at dicta voluptas totam id, enim incidunt doloremque, cum aspernatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quas explicabo ex maiores ducimus cum fugit obcaecati reprehenderit cumque blanditiis nulla voluptates repudiandae et aliquid, deserunt, ipsam officia asperiores quia.
                </p>
            </article>
        </div>
    )
}

export default PostPage
