import { useState } from "react";
import {toast} from "react-hot-toast";
import { signUp } from "../../services/apiAuth";
import { useModal } from "../../components/Modal";

function useSignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {open} = useModal();

    async function handleSignUp({email, password } = {}) {
        try{
            setIsLoading(true);
            setError(null);
            await signUp({email, password});
            toast.success("Signed Up successfully");
            open("sign-in")            
        }
        catch (err){
            const message= err?.message;
            setError(message);
            toast.error(message);
        }
        finally{
            setIsLoading(false); 
        }
    }
    return {handleSignUp, error, isLoading};
}

export default useSignUp;
