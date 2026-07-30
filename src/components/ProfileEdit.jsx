import { useState, useEffect } from "react";
import { GoTrash, GoUpload } from "react-icons/go";
import useUpdateProfile from "../features/profiles/useUpdateProfile";
import { useAuth } from "../context/AuthContext";
import SpinnerMini from "./SpinnerMini";

export default function ProfileEdit({ profile, onCloseModal, refetchProfile }) {
    const { loading, updateProfile } = useUpdateProfile();
    const { refreshGlobalProfile } = useAuth();
    const [{ avatar_url, full_name, role, bio, github_url, linkedIn_url, portfolio_url, twitter_url, id }] = profile;

    const [form, setForm] = useState({
        fullName: "",
        role: "",
        bioData: "",
        avatarUrl: "",
        githubUrl: "",
        linkedInUrl: "",
        twitterUrl: "",
        portfolioUrl: "",
    });

    const [errors, setErrors] = useState({});
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

    // Initialize form state with profile data
    useEffect(() => {
        setForm({
            fullName: full_name || "",
            role: role || "",
            bioData: bio || "",
            avatarUrl: avatar_url || "",
            githubUrl: github_url || "",
            linkedInUrl: linkedIn_url || "",
            twitterUrl: twitter_url || "",
            portfolioUrl: portfolio_url || "",
        });
    }, [profile]);

    // Handle memory cleanup for dynamic object URLs
    useEffect(() => {
        const isFile = form.avatarUrl && typeof form.avatarUrl !== "string";
        let objectUrl = "";
        if (isFile) {
            objectUrl = URL.createObjectURL(form.avatarUrl);
        }
        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [form.avatarUrl]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        if (type === "file") {
            const file = files[0];
            if (file && file.size > MAX_IMAGE_SIZE) {
                setErrors(prev => ({ ...prev, avatarUrl: "File size exceeds the 5MB limit." }));
                return;
            }
            setForm(prevForm => ({ ...prevForm, [name]: file }));
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    };

    const handleCancel = () => {
        setForm({
            fullName: full_name || "",
            role: role || "",
            bioData: bio || "",
            avatarUrl: avatar_url || "",
            githubUrl: github_url || "",
            linkedInUrl: linkedIn_url || "",
            twitterUrl: twitter_url || "",
            portfolioUrl: portfolio_url || "",
        });
        setErrors({});
        onCloseModal();
    };

    const isValidUrl = (urlString) => {
        if (!urlString) return true;
        try {
            new URL(urlString);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = () => {
        const newErrors = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.role.trim()) newErrors.role = "Role is required";
        if (!form.bioData.trim()) newErrors.bioData = "Bio is required";

        if (form.githubUrl && !isValidUrl(form.githubUrl)) newErrors.githubUrl = "Invalid URL layout shape";
        if (form.linkedInUrl && !isValidUrl(form.linkedInUrl)) newErrors.linkedInUrl = "Invalid URL layout shape";
        if (form.twitterUrl && !isValidUrl(form.twitterUrl)) newErrors.twitterUrl = "Invalid URL layout shape";
        if (form.portfolioUrl && !isValidUrl(form.portfolioUrl)) newErrors.portfolioUrl = "Invalid URL layout shape";

        const fileObj = typeof form.avatarUrl === "string" ? null : form.avatarUrl;
        if (fileObj && fileObj.size > MAX_IMAGE_SIZE) {
            newErrors.avatarUrl = "Image must be under 5MB";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = {
            avatar_url: form.avatarUrl,
            full_name: form.fullName,
            role: form.role,
            bio: form.bioData,
            github_url: form.githubUrl,
            linkedIn_url: form.linkedInUrl,
            twitter_url: form.twitterUrl,
            portfolio_url: form.portfolioUrl,
        };

        updateProfile(formData, id, { 
            onSuccess: () => {
                refreshGlobalProfile(id); 
                refetchProfile();
                onCloseModal();
            } 
        });     
    };

    return (
        <form
            className="w-full min-w-full md:min-w-[700px] lg:min-w-[800px] max-w-[380px] md:max-w-2xl lg:max-w-4xl max-h-[85vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between select-none">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">Edit Profile</h1>                
            </div>

            {/* Scrollable Container Body */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                {/* ── Avatar Profile Input Block ── */}
                <div className="flex flex-col items-center sm:flex-row gap-5 p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                    <div className="relative w-24 h-24 p-2 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-inner border border-stone-200 bg-stone-100 flex-shrink-0">
                        {form.avatarUrl ? (
                            <img
                                src={typeof form.avatarUrl === "string" ? form.avatarUrl : URL.createObjectURL(form.avatarUrl)}
                                alt="Avatar preview"
                                className="w-full h-full object-cover rounded-full"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold text-2xl uppercase">
                                {form.fullName?.slice(0, 2) || "U"}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1 w-full">
                        <span className="block text-sm font-semibold text-stone-700">Profile Image</span>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <label htmlFor="avatarUrl" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer transition-colors border border-indigo-100">
                                <GoUpload className="text-sm" />
                                <span>Upload photo</span>
                            </label>
                            <input type="file" id="avatarUrl" name="avatarUrl" accept="image/*" className="sr-only" onChange={handleChange} />

                            {form.avatarUrl && (
                                <button type="button" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100 bg-white" onClick={() => setForm({ ...form, avatarUrl: "" })}>
                                    <GoTrash className="text-sm" />
                                </button>
                            )}
                        </div>
                        <p className="text-[11px] text-stone-400 leading-normal">PNG, JPG or WebP up to 5MB.</p>
                        {errors.avatarUrl && <p className="text-xs text-red-500 font-medium mt-1">{errors.avatarUrl}</p>}
                    </div>
                </div>

                {/* ── Main Metadata Info Fields ── */}
                <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-xs font-bold text-stone-600 uppercase tracking-wider">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="John Kennedy"
                            className={`w-full p-2.5 border rounded-lg text-sm text-stone-800 transition-all outline-none ${errors.fullName ? "border-red-400 bg-red-50/10 focus:border-red-500" : "border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                }`}
                            value={form.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="role" className="text-xs font-bold text-stone-600 uppercase tracking-wider">role</label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            placeholder="Software Engineer"
                            className={`w-full p-2.5 border rounded-lg text-sm text-stone-800 transition-all outline-none ${errors.role ? "border-red-400 bg-red-50/10 focus:border-red-500" : "border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                }`}
                            value={form.role}
                            onChange={handleChange}
                        />
                        {errors.role && <p className="text-xs text-red-500 font-medium">{errors.role}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="bioData" className="text-xs font-bold text-stone-600 uppercase tracking-wider">Bio</label>
                        <textarea
                            placeholder="Write a short bio about yourself..."
                            name="bioData"
                            id="bioData"
                            className={`w-full p-2.5 border rounded-lg text-sm text-stone-800 h-28 resize-none transition-all outline-none leading-relaxed ${errors.bioData ? "border-red-400 bg-red-50/10 focus:border-red-500" : "border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                }`}
                            value={form.bioData}
                            onChange={handleChange}
                        />
                        {/* Error display for bio data */}
                        {errors.bioData && <p className="text-xs text-red-500 font-medium">{errors.bioData}</p>}
                    </div>

                        {/* ── Unified Social Link Connections Grid ── */}
                    <div className="pt-2">
                            {/* <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 border-b border-stone-100 pb-2">
                                Social &amp; Portfolio Connections
                            </h2> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: "githubUrl", label: "GitHub Profile", placeholder: "github.com" },
                                    { name: "linkedInUrl", label: "LinkedIn Link", placeholder: "linkedin.com" },
                                    { name: "twitterUrl", label: "Twitter / X Profile", placeholder: "x.com" },
                                    { name: "portfolioUrl", label: "Personal Portfolio", placeholder: "https://johndoe.com" }
                                ].map((field) => (
                                    <div key={field.name} className="flex flex-col gap-1.5">
                                        <label htmlFor={field.name} className="text-xs font-semibold text-stone-600">
                                            {field.label}
                                        </label>
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            placeholder={field.placeholder}
                                            className={`w-full p-2.5 border rounded-lg text-xs font-mono text-stone-700 transition-all outline-none ${errors[field.name]
                                                ? "border-red-400 bg-red-50/10 focus:border-red-500"
                                                : "border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                }`}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                        />
                                        {errors[field.name] && (
                                            <p className="text-[11px] text-red-500 font-medium">{errors[field.name]}</p>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    

                    {/* Bottom Actions Sticky Bar */}
                    <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-3 select-none">
                        <button 
                            type="button"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200 bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="min-w-[120px] inline-flex items-center gap-1.5 justify-center px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/95 rounded-lg shadow-sm transition-all cursor-pointer disabled:bg-primary/70 disabled:cursor-not-allowed"
                        >
                            {loading && <SpinnerMini />}
                            <span>Save Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
