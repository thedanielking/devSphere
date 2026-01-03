import { TbPencilCode } from "react-icons/tb"

function WritePostButton() {
    return (
        <button className="px-5 py-2 rounded flex items-center gap-2 bg-primary">
            <TbPencilCode className="text-xl text-white" />
            <p className="text-white text-xl lg:text-2xl">Write</p>
        </button>
    )
}

export default WritePostButton
