import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostDetails from "../components/PostDetails"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import usePosts from "../features/posts/usePosts";
import Spinner from "../components/Spinner";
import useProfile from "../features/profiles/useProfile";
import { formatDateFns} from "../utils/helpers";
import NetworkError from "../components/NetworkError"
import useIncrementViewsCount from "../features/posts/useIncrementViewsCount";
import PostContent from "../components/PostContent";

function PostPage() {
    const {postId} = useParams();
    const {post, isLoading: postLoading, error: postError, fetchPostById} = usePosts();
    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {incrementViewCount} = useIncrementViewsCount();
    const navigate = useNavigate();
 

    const goBack = () => {
        navigate(-1);
    }

    
    useEffect(() => {
        if (postId) {
            fetchPostById(postId);
        }
    }, [postId]);

    
    useEffect(() => {
        if (post?.author_id && postId) {
            // Fetch profile metrics
            fetchProfile(post.author_id);

            // Run session storage check safely here (No more layout shifts!)
            const storageKey = `viewed_post_${postId}`;
            if (!sessionStorage.getItem(storageKey)) {
                sessionStorage.setItem(storageKey, "true"); // Write immediately BEFORE the async call
                incrementViewCount(postId);
            }
        }
    }, [post?.author_id, postId]); // Triggers precisely when the post object finishes downloading

    
     

    if(postError || profileError) return (
        <NetworkError />
    );
    if(postLoading || profileLoading || !post) return (
        <div className="flex-6">
            <Spinner />
        </div>
        );

    const {title, content, cover_image_url, read_time, created_at } = post;
    const dateTime = formatDateFns(created_at);

    
    return (
        // 1. Added px-4 to prevent text from touching the edge of mobile screens
        <div className="w-full max-w-full overflow-x-hidden py-12 px-4 md:px-12 lg:px-50 flex flex-col gap-5">           
            
            {/* 2. Changed items-center to items-stretch so components conform to layout boundaries */}
            <div className="w-full max-w-full flex flex-col justify-center items-stretch gap-2">
                
                {/* Center the header text elements manually */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-4">{title}</h1>
                    <PostDetails profile={profile} readTime={read_time} dateTime={dateTime} postId={postId} title={title} />
                </div>
    
                {/* 3. Force the article block to adhere to 100% viewport width */}
                <article className="w-full max-w-full overflow-hidden mt-6">
                    <div className="w-full h-60 md:h-70 lg:h-100 mb-6 rounded overflow-hidden">
                        <img src={cover_image_url} alt="cover image" crossOrigin="anonymous" className="w-full h-full object-cover" />
                    </div>
                    
                    <PostContent content={content} />
                </article>
            </div>
        </div>
    );
}    

export default PostPage
