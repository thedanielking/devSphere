import { useParams } from "react-router-dom";
import useProfile from "../features/profiles/useProfile";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import usePublishedPosts from "../features/posts/usePublishedPosts";
import StoriesList from "../components/StoriesList";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import NetworkError from "../components/NetworkError";

function ViewProfile() {
    const {userHandle} =  useParams();
    const handleParts = userHandle?.split("-") || [];
    // Re-combine the UUID parts from the end of the string
    const authorId = handleParts.slice(-5).join("-"); // Extracts: "d4b9e2a1-3c4d-5e6f-7a8b-9c0d1e2f3a4b"

    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {isLoading: postsLoading, error: postsError, posts, fetchPosts} = usePublishedPosts();

    useEffect(()=>{
        if(!authorId) return;
        fetchProfile(authorId);        
    }, [authorId])
    useEffect(()=>{
        if(!authorId) return;
        fetchPosts(authorId);        
    }, [authorId])
    

    if(profileLoading) return <Spinner />;
    if(profileError) return <NetworkError />

    const [{avatar_url, full_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role,}] = profile;

    return (
        <div className="py-10 px-2 space-y-6 lg:py-3.5 lg:px-10">

            {/* <div className="h-40 bg-primary">                
            </div> */}

            <div className="flex items-start gap-3">
                <div className="w-20 h-20 flex items-center justify-center p-2 shadow-md rounded-full overflow-hidden lg:w-35 lg:h-35">
                    <img src={avatar_url} alt="avatar bg" crossOrigin="anonymous" className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="space-y-2">

                    <h1 className="text-2xl font-bold">{full_name}</h1>

                    <p className="capitalize text-stone-500 font-medium text-base">{role}</p>

                    <div className="flex items-center">
                    {github_url && (
                        <>
                            <a href={github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaGithub className="text-base" />
                            </a>
                            
                        </>
                    )}
                    {linkedIn_url && (
                        <>
                            <span className="mx-2 text-gray-500">|</span>
                            <a href={linkedIn_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaLinkedin className="text-base" />
                            </a>
                        </>
                    )}
                    {twitter_url && (
                        <>
                            <span className="mx-2 text-gray-500">|</span>
                            <a href={twitter_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaXTwitter className="text-base" />
                            </a>
                        </>
                    )}
                    {portfolio_url && (
                        <>
                            <span className="mx-2 text-gray-500">|</span>
                            <a href={portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaLink className="text-base" />
                            </a>
                        </>
                    )}     
                    
                    

                </div>      
                </div>
                
            </div>

            <div>
                <h2 className="font-medium text-base">Bio</h2>
                <p className="text-stone-800">{bio}</p>
            </div>

            <div>
                <h2 className="font-medium text-base">Articles</h2>
                <StoriesList posts={posts} isLoading={postsLoading} error={postsError} isReaderView={true} />
            </div>

        </div>
    )
}

export default ViewProfile
