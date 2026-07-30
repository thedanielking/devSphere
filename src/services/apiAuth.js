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

export async function googleSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirects back to your local React site after a successful login
            //   redirectTo: 'http://localhost:5173', 
            redirectTo: `${window.location.origin}`, 
        },
    });

    if (error) {
        throw new Error('Supabase login failed: ', error.message)
    }
    return data;
}

export async function getCurrentUser(){
    const {data: {user}, error} = await supabase.auth.getUser();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return user;
};

export async function logout(){
    let { error } = await supabase.auth.signOut();
    if(error){
        throw new Error(error.message);
    }

    return true;

}


export async function deleteUserAccount() {

    // Deleting the auth user automatically triggers the profile, post, and bookmark cascades!
    const { error } = await supabase.rpc('delete_authenticated_user');

    if (error) {
        console.error("Account Purge Service Error details:", error);
        throw new Error(error.message || "Your account could not be deleted!");
    }

    return true;
}






