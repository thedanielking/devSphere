import { GoClock } from "react-icons/go";
import { FaEllipsis } from "react-icons/fa6";
import { useEffect, useState } from "react";
import StoryOptions from "./StoryOptions";
import { formatDateFns } from "../utils/helpers";
import useProfile from "../features/profiles/useProfile";
import { slugify } from "../utils/slugify";
import { useNavigate } from "react-router-dom";

function Story({ post, isPublished, onRefresh, isReaderView, isWriterView }) {
    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {title, summary, read_time, id, created_at, cover_image_url, author_id} = post;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const dateTime = formatDateFns(created_at);
    const slug = slugify(title);

    useEffect(()=> {
        if(author_id)
            fetchProfile(author_id)
    }, [author_id])

    const handleProfileClick = (e, authorId, authorFullName) => {
        e.stopPropagation(); 
        if(authorId) {
            const userHandle = `${slugify(authorFullName)}-${authorId}`;
            navigate(`/profile/${userHandle}`)
        } 
    };

    function handlePostClick(e) {
        // 1. Added stopPropagation hook safety valve for custom triggers
        if (e) e.stopPropagation();
        if (isReaderView || isWriterView) {
            navigate(`/posts/${id}/${slug}`)
        }              
    }

    if(profileLoading) return null;
    
    return (
        // 2. REMOVED onClick from this wrapper container to completely break the layout propagation bug
        <div className="relative flex gap-4 rounded-lg shadow lg:w-full bg-white">

            {/* 3. Click handler targeted directly to the cover image preview box context */}
            <picture
                onClick={handlePostClick}
                className="hidden md:block flex-2 md:flex-1 max-h-40 cursor-pointer"
            >
                <source srcSet={cover_image_url} type="image/jpg" crossOrigin="anonymous" />
                <img src={cover_image_url} alt="post image" className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-102" crossOrigin="anonymous" />
            </picture>

            <div className="flex-4 flex flex-col justify-between px-3 py-4">
                <div className="space-y-3">
                    {/* 4. Click handlers targeted directly onto the title string layout */}
                    <h3
                        onClick={handlePostClick}
                        className="text-base font-medium lg:text-lg cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                        {title}
                    </h3>

                    <p onClick={handlePostClick} className="line-clamp-1 cursor-pointer">{summary}</p>

                    <div className="flex gap-2 text-xs text-stone-500">
                        <p>{read_time} mins read</p>
                        <p>&bull;</p>
                        <div className="flex items-center gap-1">
                            <GoClock className="text-base text-primary" />
                            <p>{dateTime}</p>
                        </div>
                    </div>

                    {isPublished === "bookmarked" && <div className="flex gap-1 items-center text-slate-600">
                        <div 
                            onClick={(e) => handleProfileClick(e, author_id, profile[0]?.full_name)}
                            className="flex gap-1 items-center text-slate-600 hover:text-primary transition-colors z-10 cursor-pointer"
                        >
                            by
                            <img src={profile[0]?.avatar_url || "./team3.jpg"} alt="avatar" className="w-6 h-6 rounded-full object-cover" crossOrigin="anonymous"/>
                            <p className="text-slate-600"> 
                                <i className="hover:underline font-medium">{profile[0]?.full_name || "User"}</i>
                            </p>
                        </div>
                    </div>}
                </div>

                {!isReaderView && (
                    <div className="relative w-fit ml-auto mt-auto flex justify-end">
                        <button
                            type="button"
                            className="p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                            onClick={(e) => {
                                // 5. Added explicit block to prevent the click from bubbling up
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen((prev) => !prev);
                            }}
                        >
                            <FaEllipsis className="text-lg" />
                        </button>

                        {/* 6. Wrapped dropdown container to catch and kill bubble events right here */}
                        {isMenuOpen && (
                            <div onClick={(e) => e.stopPropagation()}>
                                <StoryOptions
                                    isPublished={isPublished}
                                    postId={id}
                                    title={title}
                                    onRefresh={onRefresh}
                                    onClose={() => setIsMenuOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                )}                
            </div>
        </div>
    );
}

export default Story;
