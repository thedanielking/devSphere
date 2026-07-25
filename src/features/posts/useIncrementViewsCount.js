import { useState } from "react";
import { incrementPostViews } from "../../services/apiPosts";

function useIncrementViewsCount(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function incrementViewCount(postId){
        try{
            setLoading(true);
            setError(null);

            await incrementPostViews(postId);            
        }
        catch(err){
            const message = err?.message;
            console.log(message)
            setError(message)
            throw new Error(message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, incrementViewCount}
}

export default useIncrementViewsCount;