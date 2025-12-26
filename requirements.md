# DevSphere – Requirements Document

A tech-focused blog Content Management System (CMS) for developers and students to create, manage, and read programming-related articles.

---

## 1. Project Overview

**Name:** DevSphere  
**Type:** Fullstack Web Application (Frontend-heavy)  
**Stack:** React, TailwindCSS, Supabase, React Router, React Quill  

### 1.1 Goal

DevSphere is a mini blog CMS designed for developers and tech learners.  
Users can:

- Create and publish blog posts.
- Read and search existing posts.
- Manage their own posts through a dashboard.
- Authenticate securely via Supabase.

The project demonstrates:

- Real-world CRUD operations.
- Authentication and protected routes.
- Integration between React and a backend-as-a-service (Supabase).
- UI/UX design with TailwindCSS.

---

## 2. User Roles

### 2.1 Reader (Unauthenticated)

- Can view the homepage.
- Can view individual posts.
- Can search or filter posts.

### 2.2 Authenticated User / Author

- Can perform all Reader actions.
- Can create new posts.
- Can edit and delete **their own** posts.
- Can view their posts in a personal dashboard.

### 2.3 Admin (Optional / Future)

- Can perform all Author actions.
- Can view and manage all posts.
- Can manage users (optional).

---

## 3. Functional Requirements

### 3.1 Authentication & User Management

- Users can **sign up** with email and password.
- Users can **log in** and **log out**.
- Auth is handled via **Supabase Auth**.
- The app remembers logged-in user sessions.
- Authenticated pages (dashboard, create/edit post) are protected.

### 3.2 Posts – Create, Read, Update, Delete (CRUD)

**Create**

- Authenticated users can create a blog post.
- Each post includes:
  - Title
  - Content (rich text)
  - Tags (e.g. "React", "JavaScript")
  - Cover image (optional)
  - Published flag (true/false)
- Post is saved to a Supabase `posts` table and linked to the user.

**Read**

- Public homepage lists **published** posts.
- Each post preview shows:
  - Title
  - Short excerpt or truncated content
  - Author name
  - Created date
  - Cover image (if available)
- Clicking a post opens a **single post page** with full content.

**Update**

- Authors can edit their own posts from the dashboard.
- They can update:
  - Title
  - Content
  - Tags
  - Cover image
  - Published status

**Delete**

- Authors can delete their own posts.
- Deletion should require a confirmation step (modal or prompt).

### 3.3 Homepage

- Displays a list/grid of published posts.
- Supports basic **search by title** or keyword.
- Supports **filtering by tag**.
- Shows latest posts first (sorted by `created_at` descending).
- Responsive layout for mobile, tablet, and desktop.

### 3.4 Single Post Page

- Displays:
  - Title
  - Author name
  - Created date
  - Cover image (if present)
  - Full rich text content
  - Tags
- Renders formatted text (headings, lists, code blocks).
- (Optional) Shows related posts by tag.

### 3.5 Dashboard

- Accessible only to authenticated users.
- Shows a table or list of the logged-in user’s posts.
- For each post, user can:
  - View status (published/draft)
  - Edit
  - Delete
- Displays basic stats:
  - Total number of posts
  - Number of published vs drafts (optional)

### 3.6 Editor / Post Creation UI

- Uses a rich text editor (e.g. React Quill).
- Supports basic formatting:
  - Bold, italic, underline
  - Headings
  - Lists
  - Code blocks
- Supports adding tags (comma-separated or via chips).
- Supports uploading a cover image and storing it in Supabase Storage.

### 3.7 Search and Filter

- Users can search for posts using a search bar by:
  - Title
  - (Optional) Content text
- Users can click on a tag to filter posts by that tag.

---

## 4. Non-Functional Requirements

### 4.1 Performance

- Pages should load within a reasonable time on average mobile internet.
- Use lazy loading where possible (e.g. images).
- Minimize unnecessary network calls.

### 4.2 Security

- All auth-related actions handled via Supabase Auth.
- Database policies ensure users can only modify their own posts.
- Environment variables are used for Supabase keys (`.env`).

### 4.3 Reliability

- The application should handle common error states:
  - Failed network requests
  - Auth errors (wrong password, user not found)
  - Empty states (no posts to display)
- Show appropriate error or empty state messages.

### 4.4 Usability & UX

- Clear navigation (Home, Blog, Dashboard, Login/Logout).
- Forms should show validation and error messages.
- Buttons and inputs should have consistent styling and states (hover, disabled).

### 4.5 Responsiveness

- Mobile-first design.
- Works well on:
  - Phones
  - Tablets
  - Desktops

### 4.6 Accessibility

- Use semantic HTML where possible.
- Ensure text contrast is readable.
- Images should include alt text.
- Basic keyboard navigation should work.

### 4.7 Maintainability

- Organized folder structure for:
  - pages
  - components
  - context
  - utils
- Reuse shared components (Button, Input, Card, etc.).
- Use clear naming conventions for variables and components.

---

## 5. Technical Requirements

### 5.1 Frontend

- **React** (with Vite).
- **React Router** for client-side routing.
- **TailwindCSS** for styling.
- **React Hook Form** for form handling (optional but recommended).
- **Framer Motion** for simple animations (optional).
- **React Hot Toast** for notifications.

### 5.2 Backend / BaaS

- **Supabase**:
  - Auth (email/password)
  - Database (PostgreSQL)
  - Storage (cover images)

#### Posts Table (Suggested Schema)

- `id` – uuid (primary key)
- `title` – text
- `content` – text
- `tags` – text[] or comma-separated text
- `cover_image_url` – text
- `author_id` – uuid (references `auth.users.id`)
- `published` – boolean
- `created_at` – timestamp
- `updated_at` – timestamp

### 5.3 Deployment

- Hosted on **Vercel** or **Netlify**.
- Connected to GitHub for CI/CD.
- Production build optimized.

---

## 6. Pages & Routes

- `/` – Home (list of posts)
- `/post/:id` – Single post view
- `/login` – Login page
- `/signup` – Signup page
- `/dashboard` – User dashboard (protected)
- `/create` – Create new post (protected)
- `/edit/:id` – Edit existing post (protected)
- `/search` (optional) – Search results

---

## 7. MVP vs Future Enhancements

### Minimum Viable Product (MVP)

- Auth (signup, login, logout)
- Create, read, update, delete posts
- Homepage with post list
- Single post view
- Dashboard with user posts
- Basic search/filter by title/tag
- Responsive design

### Future Enhancements

- Comment system for posts
- Like / bookmark posts
- Dark / light mode toggle
- User profiles with bio and avatar
- Analytics (views per post)
- Email notifications for new posts
- Learning streak tracker (days of continuous posting)

---

## 8. Acceptance Criteria

DevSphere is considered **complete for this iteration** when:

- A new user can sign up, log in, and log out.
- An authenticated user can:
  - Create a post with a title, content, tags, and optional image.
  - See their posts in a dashboard.
  - Edit and delete their posts.
- Any visitor (even logged out) can:
  - View the homepage with a list of published posts.
  - Click a post and read the full content.
  - Search posts by title or tag.
- The app is deployed and accessible via a public URL.
- The UI works well on mobile and desktop.

---



