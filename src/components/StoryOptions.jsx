import { Link } from "react-router-dom";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import useDeletePost from "../features/posts/useDeletePost";
import useCopyLinkButton from "../hooks/useCopyLinkButton";
import { useBookmark } from "../features/bookmarks/useBookmark"
import { slugify } from "../utils/slugify";
import { GoEye, GoLink, GoPencil, GoTrash, GoUpload } from "react-icons/go";
import { useOutsideClick } from "../hooks/useOutsideClick";

// 1. Accept 'onClose' as a prop from the parent component
function StoryOptions({isPublished, postId, title, onRefresh, onClose}) {
    
    // 2. Pass 'onClose' to your custom outside click hook instead of the undefined 'close' string
    const ref = useOutsideClick(onClose);
    
    const {loading: deleteLoading, deletePost} = useDeletePost(); 
    const {loading: bookmarkedLoading, removePostBookmark} = useBookmark(postId);
    const {handleCopyLink, copied} = useCopyLinkButton();

    const slug = slugify(title);
    
    function handleDeletePost(){
        if(!postId) return;
        deletePost(postId);
        if(onRefresh) onRefresh();
        if(onClose) onClose(); // 3. Cleanly close menu list items upon successful deletion
    }

    function handleCopyLinkClick(e){
        e.stopPropagation(); // 4. Block event bubbling from resetting the outside-click hook context
        const url = `${window.location.origin}/posts/${postId}/${slug}`;
        handleCopyLink(url);
    }

    // bookmark functions
    const removebookmark = async (postId) => {
        if (postId) {
            const success = await removePostBookmark({ postId });
            
            if (success && onRefresh) {                
                onRefresh();
            }
            if (onClose) onClose(); // 5. Close menu window frame upon successful bookmark removal
        }
    }

    return (
        <div ref={ref} className="absolute z-40 -bottom-20 right-0 bg-white rounded-lg drop-shadow-xl py-4 w-60 space-y-2 md:w-90 lg:w-62 md:space-y-3 md:-bottom-65 lg:-bottom-32">
            {isPublished !== "draft" && 
            <>
            <p className="hover:font-medium flex gap-2 items-center px-4 mb-2 md:text-sm cursor-pointer" onClick={handleCopyLinkClick}>
                <GoLink />
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </p>
            {/* <hr className="text-neutral-200"/> */}
            </>
            }
            <ul className="space-y-2 px-4 md:text-sm">
                {/* {isPublished !== "draft" && <Link to={`/posts/${postId}/${slug}`} className="hover:font-medium  flex gap-2 items-center">
                    <GoEye />
                    <span>View Story</span>
                </Link>} */}

                {isPublished !== "bookmarked" && <Link to={`/stories/write/edit/${postId}`} className="hover:font-medium  flex gap-2 items-center">
                    <GoPencil />
                    <span>Edit Story</span>
                </Link>}

                {isPublished === "draft" && 
                <Link to={`/stories/write/edit/${postId}`} className="hover:font-medium flex gap-2 items-center">
                    <GoUpload />
                    <span>Publish Story</span>
                </Link>
                }
                
            </ul>
            <hr className="text-neutral-200"/>
            {isPublished !== "bookmarked" &&<Modal.Open opens={"delete"}>
                <button 
                className="hover:font-medium w-full flex gap-2 items-center px-4 text-red-600 cursor-pointer md:text-sm disabled:cursor-not-allowed" disabled={deleteLoading}                
                >
                    <GoTrash />
                    <span>Delete Story</span>
                </button>
            </Modal.Open>} 

            {isPublished === "bookmarked" &&<Modal.Open opens={"removeBookmark"}>
                <button 
                className="hover:font-medium w-full flex gap-2 items-center px-4 text-red-600 cursor-pointer md:text-sm disabled:cursor-not-allowed" disabled={bookmarkedLoading}                
                >
                    <GoTrash />
                    <span>Remove Bookmark</span>
                </button>
            </Modal.Open>} 
            
            <Modal.Window name="delete">
                <ConfirmAction onClick={handleDeletePost} 
                icon={<GoTrash className="text-lg"/>} 
                action={"delete this post"} loading={deleteLoading} />
            </Modal.Window>

            <Modal.Window name="removeBookmark">
                <ConfirmAction onClick={()=> removebookmark(postId)} 
                icon={<GoTrash className="text-lg"/>} 
                action={"remove bookmarked post"} loading={bookmarkedLoading} />
            </Modal.Window>
        </div>
    )
}

export default StoryOptions;
