import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";

function useLogout(){
    const logout = async () => {
        try{
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