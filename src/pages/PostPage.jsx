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
import ReactMarkdown from "react-markdown";

function PostPage() {
    const {postId} = useParams();
    const {post, isLoading: postLoading, error: postError, fetchPostById} = usePosts();
    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {incrementViewCount} = useIncrementViewsCount();
    const navigate = useNavigate();
 

    const goBack = () => {
        navigate(-1);
    }

    useEffect(()=> {
        if(postId){
            fetchPostById(postId);
            incrementViewCount(postId);
        }
    }, [postId])

    useEffect(()=> {
        if(post?.author_id)
            fetchProfile(post?.author_id)
    }, [post?.author_id]); 
     

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
        <div className="px-3 py-12 lg:px-50 flex flex-col gap-5">           
            <div className="text-center flex flex-col justify-center items-center gap-2">
                <h1 className="text-2xl lg:text-4xl font-bold mb-4">{title} </h1>
                <PostDetails profile={profile} readTime={read_time} dateTime={dateTime} postId={postId} title={title} />
                <article className="">
                    <div className="w-full h-70 lg:h-100">
                        <img src={cover_image_url} alt="cover image" crossOrigin="anonymous" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full text-stone-800 text-sm/8 text-left lg:text-base/10 leading-relaxed
                    [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-stone-900
                    [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-stone-900
                    [&_h3]:text-base  [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-stone-900
                    [&_p]:mb-4 [&_p]:leading-8
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                    [&_strong]:font-bold [&_strong]:text-stone-950
                    [&_em]:italic"
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                    {/* <p className="whitespace-pre-line text-sm/8 text-left lg:text-base/10">{content}</p> */}
                </article>
            </div>
        </div>
    )
}

export default PostPage
