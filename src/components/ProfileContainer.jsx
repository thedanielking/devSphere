import ProfileEdit from "./ProfileEdit";
import Modal from "./Modal";
// import { formatDateFns } from "../utils/helpers";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";


function ProfileContainer({profile, refetchProfile, userEmail}) {

    const username = userEmail.split("@")[0];

    const [{avatar_url, full_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role, created_at, updated_at}] = profile;

 
    // const date_joined = formatDateFns(created_at);
    // const date_updated = formatDateFns(updated_at);

 
    return (
        <div className="p-8 ring-1 ring-gray-300 rounded-lg space-y-9 flex flex-col justify-center lg:px-12 lg:py-10">
            <div className="flex items-center gap-6">
                <picture className="w-32 h-32 flex items-center justify-center p-2 shadow-sm rounded-full overflow-hidden lg:w-35 lg:h-35">
                    <img src={avatar_url || "../person.png"} alt="profile picture" className="w-full h-full rounded-full object-cover" crossOrigin="anonymous" />
                </picture>
                <div className="space-y-1">
                    <h2 className="text-lg font-medium capitalize lg:text-xl">
                        {full_name || username}
                    </h2>
                    <p className="text-base text-stone-700 italic capitalize">{role || "User"}</p>
                </div>
            </div>

            {/* <div className="space-y-2 lg:space-y-3">
                <h3 className="text-lg font-medium lg:text-xl">Personal Information</h3>
                <ul className="grid grid-cols-2 gap-4 lg:gap-8">
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-sm  lg:text-base">Full Name:</span>
                        <span className="font-medium capitalize text-base lg:text-lg">
                            {full_name}
                        </span>
                    </li>                    
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-sm  lg:text-base">Date Joined:</span>
                        <span className="font-medium capitalize text-base lg:text-lg">
                            {date_joined}
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-gray-500 font-medium text-sm  lg:text-base">Date Updated:</span>
                        <span className="font-medium capitalize text-base lg:text-lg">
                            {date_updated}
                        </span>
                    </li>
                </ul>
            </div> */}

            <div className="space-y-2 lg:space-y-3">
                <h3 className="text-lg font-medium lg:text-xl">About Me</h3>
                <p className="text-gray-700 text-sm lg:text-base">{bio || "No information available."}</p>
            </div>

            { github_url || linkedIn_url || twitter_url || portfolio_url && (
            <div className="space-y-2 lg:space-y-3">
                <h3 className="text-lg font-medium lg:text-xl">Links</h3>
                <div className="flex items-center">
                    {github_url && (
                        <>
                            <a href={github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaGithub className="text-base" />
                            </a>
                            
                        </>
                    )}
                    {linkedIn_url && (
                        <>
                            <span className="mx-2 text-gray-500">|</span>
                            <a href={linkedIn_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaLinkedin className="text-base" />
                            </a>
                        </>
                    )}
                    {twitter_url && (
                        <>
                            <span className="mx-2 text-gray-500">|</span>
                            <a href={twitter_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaXTwitter className="text-base" />
                            </a>
                        </>
                    )}
                    {portfolio_url && (
                        <>
                            <span className="mx-2 text-gray-500">|</span>
                            <a href={portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                                <FaLink className="text-base" />
                            </a>
                        </>
                    )}               
                    
                    

                </div>                
            </div>
                )
                }

            <Modal.Open opens={"profileEdit"}>
                <button className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-darker transition-colors lg:w-fit text-base">Edit Profile</button>
            </Modal.Open>
            <Modal.Window name="profileEdit">
                <ProfileEdit profile={profile} refetchProfile={refetchProfile} />
            </Modal.Window>
        </div>
    )
}

export default ProfileContainer
