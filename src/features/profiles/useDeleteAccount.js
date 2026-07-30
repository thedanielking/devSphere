import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUserAccount as apiDeleteAccount } from "../../services/apiAuth"; // Path to your service file
import supabase from "../../services/supabase";

export function useDeleteAccount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function deleteAccount() {
        try {
            setLoading(true);
            setError(null);

            // 1. Run the backend database deletion call
            await apiDeleteAccount();

            // 2. Clear out client authorization states on success
            await supabase.auth.signOut();
            sessionStorage.clear(); // Wipes out reading view cache keys

            toast.success("Account and all associated records permanently removed.");
            window.location.href = "/"; // Send them back to the landing homepage

        } catch (err) {
            const message = err?.message || "Failed to fully delete your account data.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, deleteAccount };
}
