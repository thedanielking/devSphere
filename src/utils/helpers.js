import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
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

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

// Sort posts by latest (created_at)
export const sortByLatest = (posts) => {
  if (!Array.isArray(posts)) return []; //safety check if the posts is not an array
  return [...posts].sort((a, b) => { //copy of the posts array and sort it.
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA; // newest first
  });
};

// Sort posts by popular (likes_count)
export const sortByPopular = (posts) => {
  if (!Array.isArray(posts)) return [];
  return [...posts].sort((a, b) => {
    return (b.likes_count || 0) - (a.likes_count || 0); // highest likes first
  });
};

export const filterPosts = (posts, selectedTags) => {
  if (!Array.isArray(posts)) return [];
  if (!selectedTags || selectedTags.length === 0) return posts;

  return posts.filter((post) => {
    if (!post.tags) return false; // skips if there are no tags in that post
    
    // Handle if tags is a string (comma-separated) or array
    const postTags = Array.isArray(post.tags) 
      ? post.tags 
      : String(post.tags).split(",").map(tag => tag.trim());
       
    // Check if any of the post's tags are in the selectedTags
    return postTags.some((tag) => selectedTags.includes(tag));
  });
};
