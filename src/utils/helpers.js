import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { format } from 'date-fns';

//format dates from supabase
export const formatDateFns = (dateString, formatString = 'MMMM do, yyyy') => {
  // Date.parse() can handle ISO strings and timestamps
  return format(Date.parse(dateString), formatString);
};

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2 = getToday({ end: true })) => {
  const diff = differenceInDays(parseISO(String(dateStr2)), parseISO(String(dateStr1)));
  return diff;
}

export const formatDistanceFromNow = (dateStr, baseDate = new Date()) =>
  formatDistance(parseISO(dateStr), baseDate, {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};



// Sort posts by latest (created_at)
export const sortByLatest = (posts) => {
  if (!Array.isArray(posts)) return []; //safety check if the posts is not an array
  return [...posts].sort((a, b) => { //copy of the posts array and sort it.
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA; // newest first
  });
};

// Sort posts by popular (views_count)
export const sortByPopular = (posts) => {
  if (!Array.isArray(posts)) return [];
  return [...posts].sort((a, b) => {
    return (b.views_count || 0) - (a.views_count || 0); // highest views first
  });
};

export const filterPosts = (posts, selectedTagIds) => {
  if (!Array.isArray(posts)) return [];
  if (!selectedTagIds || selectedTagIds.length === 0) return posts;

  // Ensure all incoming IDs are normalized to lowercase strings
  const targetIds = selectedTagIds.map(id => String(id).trim().toLowerCase());
  
  return posts.filter((post) => {
    // 1. Extract and split post tags (handles Array, comma String, or null)
    
    const postTags = Array.isArray(post.tags)
      ? post.tags
      : post.tags
        ? String(post.tags).split(",").map(t => t.trim().toLowerCase())
        : [];

    // 2. Extract template value (handles string ID like 'build-log' or null)
    const postTemplate = post.template ? String(post.template).trim().toLowerCase() : "";
    
    // 3. Check if template ID matches OR if any post tags match
    const matchesTemplate = targetIds.includes(postTemplate);
    const matchesTags = postTags.some((tag) => targetIds.includes(tag));
    
    return matchesTemplate || matchesTags;
  });
}
