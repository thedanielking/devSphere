import Tags from "./Tags"
import { FaBug, FaRocket } from "react-icons/fa";
import { FaBookOpen, FaDiagramProject, FaRegPenToSquare, FaScrewdriverWrench, FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Filter() {

    const filterTags = [
        {
            id: "build-log",
            title: "Build Logs",            
            icon: <FaRocket className="text-base text-violet-500" />
        },
        {
            id: "architecture-decision",
            title: "Architecture Decisions",            
            icon: <FaDiagramProject className="text-base text-emerald-500" />
        },
        {
            id: "refactor-story",
            title: "Refactor Stories",            
            icon: <FaScrewdriverWrench className="text-base text-orange-500" />
        },
        {
            id: "bug-fix-journey",
            title: "Bug fixes",            
            icon: <FaBug className="text-base text-red-500" />
        },
        {
            id: "tutorial",
            title: "Tutorials",            
            icon: <FaBookOpen className="text-base text-sky-500" />
        },
        {
            id: "post-mortem",
            title: "Post Mortems",            
            icon: <FaTriangleExclamation className="text-base text-yellow-500" />
        },
        {
            id: "blank-story",
            title: "Lessons Learned",            
            icon: <FaRegPenToSquare className="text-base text-slate-500" />
        }
    ]

    const navigate = useNavigate();

    function handleTagClick(tagId){
        if(!tagId) return;
        navigate(`/posts?tags=${encodeURIComponent(tagId.trim())}`)
    }

    return (
        <aside className="flex-2 space-y-5 py-3 lg:p-8">
            
            <ul className="flex flex-wrap justify-center gap-5">
                {filterTags.map((tag)=> (
                    <Tags key={tag.id} tag={tag.title} tagId={tag.id} Icon={tag.icon} onSelect={handleTagClick} />
                ))}
            </ul>
        </aside>
    )
}

export default Filter
