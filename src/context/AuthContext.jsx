import toast from "react-hot-toast";
import supabase from "../services/supabase";
import { createContext, useState, useEffect, useContext } from "react";
import { useCallback } from "react";

const AuthContext = createContext();


function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. Create a shareable profile fetching method
    const refreshGlobalProfile = useCallback(async (userId) => {
        if (!userId) return;
        try {
            setIsProfileLoading(true);
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single(); // Using single because a user only has one profile row

            if (!error && data) {
                setUserProfile(data);
            }
        } catch (err) {
            console.error("Global profile fetch error:", err);
        } finally {
            setIsProfileLoading(false);
        }
    }, []);

    // Fetch profile whenever the authenticated user state initializes or changes
    useEffect(() => {
        if (user?.id) {
            refreshGlobalProfile(user.id);
        } else {
            setUserProfile(null);
        }
    }, [user?.id, refreshGlobalProfile]);

    useEffect(()=> {
        // using a ref to make sure the toast only fires exactly once
        let isToastFired = false;
        //get current session on app load
        const getSession = async ()=> {
            const {data, error} = await supabase.auth.getSession();
            if(error){
                console.log("Error getting session:", error.message);
            }
            setUser(data.session?.user ?? null);
            setLoading(false);
        }
        getSession();

        //listen for auth changes(login, logout, signup)
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session)=> {
            setUser(session?.user ?? null);
            setLoading(false);
            if (event === "SIGNED_IN" && session && !isToastFired) {
                isToastFired = true;
                toast.success("Signed In successfully!");
            }
        });

        //clean up subscription on unmount
        return ()=>{
            authListener.subscription.unsubscribe();
       }  
        
        
    }, []);

    return (
        <AuthContext.Provider value={{user, loading, isProfileLoading, setUser, setLoading, userProfile, refreshGlobalProfile}}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error ("AuthContext was used outside of AuthProvider")
    return context;
}


export {AuthProvider, useAuth};



