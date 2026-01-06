import { useMemo } from "react";
import { filterPosts, sortByLatest, sortByPopular } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

export function useFilteredPosts(posts) {
    const [searchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "latest";

    return useMemo(() => {
        if (!posts || posts.length === 0) return [];

        const searchQuery = searchParams.get("q") || "";
        let filtered = posts;

        // Filter by search query
        if (searchQuery.length > 0) {
            filtered = posts.filter(post => (
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }

        // Filter by tags
        const tags = searchParams.get("tags")?.split(",") || [];
        filtered = filterPosts(filtered, tags);

        // Sort
        if (sortBy === "latest") return sortByLatest(filtered);
        if (sortBy === "popular") return sortByPopular(filtered);
        return filtered;
    }, [posts, searchParams, sortBy]);
}