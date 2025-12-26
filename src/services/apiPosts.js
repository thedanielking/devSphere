import supabase, {supabaseUrl} from "./supabase";


export async function getPosts(){
    
    const { data: posts, error } = await supabase
    .from('posts')
    .select('*')


    if(error){
        console.error(error);
        throw new Error("Posts could not be loaded!");
    }

    return posts;
}





