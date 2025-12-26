import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiAuth";
import { useState } from "react";
import {toast} from "react-hot-toast";

function useSignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleSignUp({email, password, onSucess, onError} = {}) {
        try{
            setIsLoading(true);
            setError(null);
            await signUp({email, password});
            toast.success("Signed Up successfully");
            if(typeof onSucess === "function") onSucess();
            navigate("/login");
        }
        catch (err){
            const message= err?.message;
            setError(message);
            toast.error(message);
            onError?.(message);
        }
        finally{
            setIsLoading(false); 
        }
    }
    return {handleSignUp, error, isLoading};
}

export default useSignUp;
