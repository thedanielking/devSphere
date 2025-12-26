function Tags({tag, type}) {
    return (
        <li className={`capitalize font-medium ring ring-stone-200 p-3 rounded-xl bg-white ${type && `bg-stone-100`}`}>
            <span>{tag}</span>
        </li>
    )
}

export default Tags
