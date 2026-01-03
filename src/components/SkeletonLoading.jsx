import Skeleton from "@mui/material/Skeleton"

function SkeletonLoading({skeletonCount = 3}) {
    return (
        <>
            {Array.from({length: skeletonCount}).map((_, i) => (
                <div key={i} className="rounded-md p-4 bg-white">
                    <Skeleton variant="rectangular" height={200} />
                    <div className="mt-4">
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                        <Skeleton />
                    </div>
                </div>
            ))}
        </>
    )
}

export default SkeletonLoading
