import { useEffect, useState } from "react";
import {getPosts} from "../../services/apiPosts";

function usePosts(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getPosts();
            setPosts(data ?? []);
        } catch (err) {
            const message = err?.message;
            setError(message ?? "Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    }

    //fetch posts on mount
    useEffect(()=>{
        fetchPosts();
    }, []);

    return {isLoading, error, posts, fetchPosts};
}


export default usePosts;



