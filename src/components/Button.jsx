function Button({children, type, disabled}) {
    return (
        <button 
        className={`cursor-pointer ${type === "primary" ? "bg-stone-800 text-stone-100 p-3 rounded font-medium hover:bg-stone-900": type === "submit" ? "bg-primary px-8 py-3 rounded-3xl text-stone-100": ""}`}
        disabled={disabled}
        >
            {children}
        </button>        
    )
}

export default Button
