function PostDetails() {
    return (
        <div className="flex justify-between gap-10 lg:gap-20 px-5 lg:px-20 py-4 border-b border-t border-gray-300 mb-6 items-center">
            <div className="flex gap-2 items-center">
                <img src="../team3.jpg" alt="avatar" className="w-8 h-8 rounded-full"/>
                <p>Daniel King</p>
            </div>
            <div className="flex gap-1">
                <p>4 min read &bull;</p>
                <p>Aug 22, 2025</p>
            </div>
        </div>
    )
}

export default PostDetails
