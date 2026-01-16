import supabase from "./supabase.js";

export async function login({email, password}) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


export async function signUp({email, password}){
    let { data, error } = await supabase.auth.signUp({
    email,
    password
    })

    if(error){
        throw new Error(error.message);
    }
    return data;

} 

export async function logout(){
    let { error } = await supabase.auth.signOut();
    if(error){
        throw new Error(error.message);
    }

}





