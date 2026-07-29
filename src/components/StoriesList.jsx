import { useState } from "react";
import NetworkError from "./NetworkError";
import SkeletonLoading from "./SkeletonLoading";
import Story from "./Story";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import EmptyStories from "./EmptyStories";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import useDeletePost from "../features/posts/useDeletePost";
import { useBookmark } from "../features/bookmarks/useBookmark";

function StoriesList({ posts = [], isLoading, error, isPublished, onRefresh, isReaderView, isWriterView }) {
    const skeletonCount = posts && posts.length > 0 ? posts.length : 6;

    // 1. Lifted active state to track which card is currently being interacted with
    const [targetPost, setTargetPost] = useState(null);

    // 2. Lifted custom action hooks so they execute inside a single context layer
    const { loading: deleteLoading, deletePost } = useDeletePost();
    const { loading: bookmarkedLoading, removePostBookmark } = useBookmark(targetPost?.id);

    function handleDeletePost() {
        if (!targetPost?.id) return;
        deletePost(targetPost.id);
        if (onRefresh) onRefresh();
    }

    const removebookmark = async () => {
        if (targetPost?.id) {
            const success = await removePostBookmark({ postId: targetPost.id });
            if (success && onRefresh) {                
                onRefresh();
            }
        }
    };

    return (
        // 3. Wrap the list in a single Modal provider so overlays never double-stack
        <div>
            <div className="mt-10">
                <div className="grid gap-10 mt-5">
                {isLoading 
                ? (
                    <SkeletonLoading skeletonCount={skeletonCount} />
                ) : error ? (
                    <div className="md:col-span-2 lg:col-span-3 w-full flex items-center justify-center">
                        <NetworkError />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="md:col-span-2 lg:col-span-3 w-full flex items-center justify-center">                
                        <EmptyStories
                            icon={FaRegFolderOpen}
                            title=""
                            description="This user has not made a post yet"
                        />
                    </div>
                ) : (                    
                        posts.map(post => (
                            <Story 
                                key={post.id} 
                                post={post} 
                                isPublished={isPublished} 
                                onRefresh={onRefresh} 
                                isReaderView={isReaderView} 
                                isWriterView={isWriterView} 
                                onSelectTarget={() => setTargetPost(post)} // 4. Pass target setter to child
                            />
                        ))
                    )}
                </div>
            </div>

            {/* 5. Lifted global modal windows execute exactly once per list frame layout */}
            <Modal.Window name="delete">
                <ConfirmAction 
                    onClick={handleDeletePost} 
                    icon={<GoTrash className="text-lg"/>} 
                    action={"delete story"} 
                    loading={deleteLoading} 
                />
            </Modal.Window>

            <Modal.Window name="removeBookmark">
                <ConfirmAction 
                    onClick={removebookmark} 
                    icon={<GoTrash className="text-lg"/>} 
                    action={"unbookmark post"} 
                    loading={bookmarkedLoading} 
                />
            </Modal.Window>
        </div>
    );
}

export default StoriesList;
