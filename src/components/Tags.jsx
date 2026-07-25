import { GoCheck } from "react-icons/go";

function Tags({tag, tagId, type, onSelect, isSelected, Icon}) {

    function handleSelect(){
        onSelect(tagId);
    }

    

    if(type === "filter"){
        return (
            <button className={`capitalize font-medium  rounded bg-white text-sm px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-stone-200`} onClick={handleSelect} >
                <span className="capitalize">{tag}</span>
                {isSelected && <GoCheck className="text-primary" />}
            </button>
        )
    }

    return (
        <li className={`capitalize cursor-pointer font-medium flex items-center gap-2 ring ring-stone-200 p-3 rounded-xl bg-white text-xs lg:text-sm ${!type && `shadow-lg`} ${type && `bg-stone-100`}`} onClick={handleSelect}>
            {Icon}
            <span>{tag}</span>
        </li>
    )
}

export default Tags
