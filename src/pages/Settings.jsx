import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import ConfirmAction from "../components/ConfirmAction";
import { GoTrash, GoPerson, GoShield } from "react-icons/go";
import { useDeleteAccount } from "../features/profiles/useDeleteAccount";

function Settings() {
    const { user, userProfile } = useAuth();
    const { loading: isDeleting, deleteAccount } = useDeleteAccount();

    return (
        <div className="py-6 px-2 space-y-8 lg:py-3.5 lg:px-10 max-w-2xl lg:max-w-5xl">

            {/* ── Page Header ── */}
            <div>
                <h1 className="text-xl font-bold lg:text-2xl text-stone-900 tracking-tight">Settings</h1>
                <p className="text-sm text-stone-500">Manage your developer account configurations and data privacy.</p>
            </div>

            {/* ── Profile Snapshot Section ── */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center gap-4">
                <div className="w-12 h-12 p-1 rounded-full overflow-hidden shadow flex items-center justify-center flex-shrink-0">
                    <img
                        src={userProfile?.avatar_url || "../person.png"}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                        crossOrigin="anonymous"
                    />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-stone-800">{userProfile?.full_name || "User"}</h2>
                    <p className="text-xs text-stone-400 font-mono">{user?.email}</p>
                </div>
            </div>

            {/* ── Basic Preferences Section ── */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2 flex items-center gap-1.5">
                    <GoShield />
                    <span>Preferences</span>
                </h3>
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 bg-white">
                    <div>
                        <p className="text-sm font-medium text-stone-700">Interface Theme</p>
                        <p className="text-xs text-stone-400">System dark mode toggle support placeholder.</p>
                    </div>
                    <select disabled className="text-xs border border-stone-200 p-1.5 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed">
                        <option>Light Mode (Default)</option>
                    </select>
                </div>
            </div>

            {/* ── Danger Zone Section ── */}
            <div className="pt-6 border-t border-stone-200/80 space-y-4">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                    <GoTrash className="text-sm" />
                    <span>Danger Zone</span>
                </h3>

                <div className="p-4 rounded-xl border border-red-100 bg-red-50/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-stone-800">Delete Account</p>
                        <p className="text-xs text-stone-500 leading-relaxed max-w-md">
                            Permanently delete your profile card, published stories, drafts, and bookmarks. This action cannot be undone.
                        </p>
                    </div>

                    {/* 2. Open the Confirmation Window built specifically into your Modal component */}
                    <Modal.Open opens="confirm-account-deletion">
                        <button 
                            type="button"
                            className="px-4 py-2 text-xs font-semibold text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer self-start sm:self-center"
                        >
                            Delete Account
                        </button>
                    </Modal.Open>
                </div>
            </div>

            {/* 3. The isolated confirmation prompt window */}
            <Modal.Window name="confirm-account-deletion">
                <ConfirmAction
                    action="delete your account"
                    icon={<GoTrash className="text-lg" />}
                    onClick={deleteAccount} 
                    loading={isDeleting}
                />
            </Modal.Window>

        </div>
    );
}

export default Settings;
