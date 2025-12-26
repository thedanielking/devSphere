import { Link } from "react-router-dom";
import Tags from "./Tags"

function Post({post}) {
    const {title, content, tags, slug } = post;

    const tagList = Array.isArray(tags) ? tags 
    : (typeof tags === "string" 
        ? tags.split(",").map(tag => tag.trim()).filter(Boolean) : []); 
    return (
        <Link to={`/posts/${slug}`}>
        <div className="flex flex-col gap-4 bg-white overflow-hidden rounded-xl cursor-pointer">
            <picture className=" w-full">
                <source srcSet="../team3.jpg" type="image/jpg" />
                <img src="../team3.jpg" alt="post image" className="w-full"/>
            </picture>
            <div className=" space-y-3 p-3">
                <h3 className="text-xl font-medium">
                    {title}
                </h3>
                <p className="text-stone-600">
                    {content}
                </p>
                <ul className="flex gap-2">
                    {tagList.map((tag, id)=>(
                        <Tags key={`${tag}-${id}`} tag={tag} type="secondary"/>
                    ))}
                </ul>
            </div>
        </div>
        </Link>
    )
}

export default Post
