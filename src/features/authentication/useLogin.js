import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import { useState } from "react";
import {toast} from "react-hot-toast";

function useLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleLogin({email, password, onSucess, onError} = {}) {
        try{
            setIsLoading(true);
            setError(null);
            await login({email, password});
            toast.success("Logged in successfully");
            if(typeof onSucess === "function") onSucess();
            navigate("/");
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
    return {handleLogin, error, isLoading};
}

export default useLogin
