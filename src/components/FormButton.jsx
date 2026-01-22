function FormButton({text, disabled, onClick}) {
    return (
        <button 
        className={`px-6 py-3 capitalize cursor-pointer hover:shadow-sm  rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${text === "publish" ? "bg-primary text-white" : "ring ring-primary text-primary" }`} 
        disabled={disabled}
        onClick={onClick}
        >
            {text}
        </button>
    )
}

export default FormButton;
