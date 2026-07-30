import ProfileEdit from "./ProfileEdit";
import Modal from "./Modal";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";

function ProfileContainer({ profile, refetchProfile, userEmail }) {
    const username = userEmail.split("@")[0];
    const [{ avatar_url, full_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role }] = profile;

    // 1. FIXED CONDITION LOGIC: Safely check if ANY link exists using correct grouping brackets
    const hasAnyLinks = Boolean(github_url || linkedIn_url || twitter_url || portfolio_url);

    return (
        // 2. RESTYLED CARD: Changed to an elegant, soft slate border layout with smooth shadow depth
        <div className="w-full max-w-3xl bg-white border border-stone-200/80 rounded-2xl shadow-sm p-6 md:p-8 space-y-8 select-none mx-auto">

            {/* ── Top Header Identity Card Section ── */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 md:gap-6 border-b border-stone-100 pb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-sm p-1 flex-shrink-0">
                    <img
                        src={avatar_url || "../person.png"}
                        alt="profile picture"
                        className="w-full h-full rounded-full object-cover"
                        crossOrigin="anonymous"
                    />
                </div>

                <div className="space-y-1.5 flex-1 w-full pt-1 sm:pt-3">
                    <h2 className="text-xl font-bold text-stone-900 capitalize md:text-2xl tracking-tight">
                        {full_name || username}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100/60 capitalize">
                        {role || "User"}
                    </span>
                </div>

                {/* 3. LIFTED CTAS: Clean edit profile button placement inside header layout block */}
                <div className="sm:pt-3">
                    <Modal.Open opens={"profileEdit"}>
                        <button type="button" className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg shadow-sm transition-colors cursor-pointer w-full sm:w-auto">
                            Edit Profile
                        </button>
                    </Modal.Open>
                </div>
            </div>

            {/* ── About Me Content Area ── */}
            <div className="space-y-2">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">About Me</h3>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl">
                    {bio || "No biography information available yet."}
                </p>
            </div>

            {/* ── Developer Context Connections Links Area ── */}
            {hasAnyLinks && (
                <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Connections</h3>

                    
                    <div className="flex flex-wrap items-center gap-3 text-stone-500">
                        {github_url && (
                            <a
                                href={github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900 hover:border-stone-400 hover:shadow-sm transition-all"
                                title="GitHub Profile"
                            >
                                <FaGithub className="text-lg" />
                            </a>
                        )}
                        {linkedIn_url && (
                            <a
                                href={linkedIn_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:text-indigo-600 hover:border-indigo-400 hover:shadow-sm transition-all"
                                title="LinkedIn Profile"
                            >
                                <FaLinkedin className="text-lg" />
                            </a>
                        )}
                        {twitter_url && (
                            <a
                                href={twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900 hover:border-stone-400 hover:shadow-sm transition-all"
                                title="Twitter / X Profile"
                            >
                                <FaXTwitter className="text-base" />
                            </a>
                        )}
                        {portfolio_url && (
                            <a
                                href={portfolio_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:text-indigo-600 hover:border-indigo-400 hover:shadow-sm transition-all"
                                title="Personal Website Portfolio"
                            >
                                <FaLink className="text-base" />
                            </a>
                        )}               
                    </div>
                </div>
            )}

            {/* Modal portal instance cleanup windows */}
            <Modal.Window name="profileEdit">
                <ProfileEdit profile={profile} refetchProfile={refetchProfile} />
            </Modal.Window>
        </div>
    );
}

export default ProfileContainer;
