import PostDetails from "../components/PostDetails"

function PostPage() {
    return (
        <div className="p-3 lg:p-10 text-center flex flex-col justify-center items-center gap-2">
            <h1 className="text-2xl md:text-3xl lg:text-6xl font-bold mb-4">Understanding CSS Grid like a simple Mathematics Equation </h1>
            <PostDetails />
            <article className="max-w-[1200px] mx-auto text-lg/11">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore exercitationem illum aliquam, culpa tempora, rem numquam ad vero nulla? Provident temporibus omnis suscipit sunt nesciunt nisi eligendi harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolorum numquam aut vitae at corrupti tenetur esse repudiandae placeat, dolore dolor, sapiente omnis voluptate? Quos eum consequuntur quas pariatur aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis sequi enim nostrum non autem possimus, quisquam molestias quasi beatae perferendis numquam voluptatum sunt obcaecati exercitationem ea libero magnam! Exercitationem, doloremque?</p>
                <div className="max-w-[800px] w-[80%] mx-auto">
                    <img src="../team3.jpg" alt="post image" className="w-full m-4"/>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolor perferendis maxime beatae eaque reprehenderit, aut numquam ipsa corrupti harum at dicta voluptas totam id, enim incidunt doloremque, cum aspernatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quas explicabo ex maiores ducimus cum fugit obcaecati reprehenderit cumque blanditiis nulla voluptates repudiandae et aliquid, deserunt, ipsam officia asperiores quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolor perferendis maxime beatae eaque reprehenderit, aut numquam ipsa corrupti harum at dicta voluptas totam id, enim incidunt doloremque, cum aspernatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quas explicabo ex maiores ducimus cum fugit obcaecati reprehenderit cumque blanditiis nulla voluptates repudiandae et aliquid, deserunt, ipsam officia asperiores quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit modi repellendus, incidunt aliquam earum atque corporis quidem odio reiciendis quo similique sapiente voluptate architecto vero nam ea quis consequuntur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo adipisci doloribus nostrum vitae excepturi tenetur soluta ab et maiores minus, voluptatibus tempore pariatur, corporis expedita dicta quisquam asperiores provident. Veritatis.
                </p>
            </article>
        </div>
    )
}

export default PostPage
