import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useAuth } from "../../context/AuthContext";

function useLogout(){
    const {user} = useAuth();
    const logout = async () => {
        try{
            if(!user) throw new Error("No user is currently logged in.");
            await logoutApi();
            toast.success("Logged out successfully");
        }
        catch(err){
            console.error("Logout failed:", err);
            toast.error("Logout failed. Please try again.");
        }
        
    }
    return logout;
}


export default useLogout;