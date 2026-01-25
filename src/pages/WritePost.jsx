import { useState } from "react";
import FormButton from "../components/FormButton";
import { useAuth } from "../context/AuthContext";
import useWritePost from "../features/posts/useWritePost";

function WritePost(){
    const {user} = useAuth();
    const {writePost, loading} = useWritePost(user);
    
    const [form, setForm] = useState({
        title: "",
        summary: "",
        content: "",
        tags: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const handleSubmit = (published = false) => {
        if(!form.title || !form.summary || !form.content) return;

        const normalizedTagsText = form.tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
            .join(',');

        writePost({
            ...form,
            coverImageUrl: "", //coverImage,
            tags: normalizedTagsText,
            published,
        });
    }


    const inputClass = "w-full border-l border-l-neutral-300 focus:border-l-neutral-500 outline-0 p-3";

    return (
        <form className="flex-6 space-y-6 p-6 lg:p-10 lg:space-y-10 " 
        onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(false);
        }}>
            {/* <h1 className="text-3xl font-bold">Write a new post</h1> */}
            <input
            type="text"
            name="title"
            placeholder="Post title"
            className={`${inputClass} placeholder:uppercase placeholder:tracking-widest font-semibold text-3xl`}
            value={form.title}
            onChange={handleChange} />

            <textarea
            placeholder="Short summary"
            name="summary"
            className={`${inputClass} text-lg h-24`}
            value={form.summary}
            onChange={handleChange} />


        <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className={`${inputClass} text-lg`}
            value={form.tags}
            onChange={handleChange} />

        <textarea
            placeholder="Write your article here..."
            name="content"
            className={`${inputClass} text-lg h-64`}
            value={form.content}
            onChange={handleChange}
        />

        <div className="flex gap-4">
            <FormButton 
            text={"save draft"} 
            disabled={loading} onClick={() => handleSubmit(false)} />
            <FormButton 
            text={"publish"} 
            disabled={loading} onClick={() => handleSubmit(true)} />
        </div>

        </form>
    )
}

export default WritePost;

