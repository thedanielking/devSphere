import NetworkError from "./NetworkError";
import SkeletonLoading from "./SkeletonLoading";
import Story from "./Story";
import { FaRegFolderOpen } from "react-icons/fa";
import EmptyStories from "./EmptyStories";

function StoriesList({posts = [], isLoading, error, isPublished, onRefresh, isReaderView }) {
    const skeletonCount = posts && posts.length > 0 ? posts.length : 6;
    return (          
            <div className="mt-10">
                <div className="grid gap-10 mt-5">
                {isLoading 
                ? (
                    <SkeletonLoading skeletonCount={skeletonCount} />
                ) : error ? (
                    <div className="md:col-span-2 lg:col-span-3 w-full flex items-center justify-center">
                        <NetworkError />
                    </div>
                ): posts.length === 0 ? (
                    <div className="md:col-span-2 lg:col-span-3 w-full flex items-center justify-center">                
                        <EmptyStories
                            icon={FaRegFolderOpen}
                            title=""
                            description="This user has not made a post yet"
                                                        
                          />
                    </div>
                ) : (                    
                        posts.map(post => (
                            <Story key={post.id} post={post} isPublished={isPublished} onRefresh={onRefresh} isReaderView={isReaderView} />
                        ))
                    )}
                </div>
            </div>
    )
}

export default StoriesList
