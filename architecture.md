# DevSphere – Architecture Document

DevSphere is a tech-focused blog CMS for developers and students.  
It uses a **React frontend** and **Supabase backend-as-a-service** to provide authentication, content management, and storage.

---

## 1. High-Level Architecture

DevSphere follows a **client–BaaS** model:

- **Client (Frontend):**  
  - Built with **React** (Vite) + **React Router**  
  - Styled with **TailwindCSS**  
  - Handles UI, routing, forms, and state management

- **Backend-as-a-Service (BaaS):**  
  - Powered by **Supabase**  
  - Provides:
    - Authentication (Email/Password)
    - Database (PostgreSQL)
    - Storage (for images)
    - Row-level security (RLS) and policies

### 1.1 High-Level Diagram (Conceptual)

```text
[ React Client ]  <-------->  [ Supabase (Auth, DB, Storage) ]

   Pages & Components             Tables:
   - Home                         - posts
   - Post                         - (optional) profiles
   - Login / Signup
   - Dashboard
   - Create / Edit Post

   State:
   - AuthContext (user session)
   - Posts data (from Supabase)
````

The frontend communicates directly with Supabase via the **Supabase JS client**, making HTTP requests over HTTPS.

---

## 2. Frontend Architecture

### 2.1 Tech Stack

* **React (Vite)** – Core UI library
* **React Router v6** – Client-side routing
* **TailwindCSS** – Utility-first styling
* **React Hook Form** – Form handling & validation (optional)
* **React Quill / Markdown Editor** – Rich text editing
* **React Hot Toast** – Notifications
* **Framer Motion** – Simple animations (optional)

---

### 2.2 Folder Structure

```text
src/
├── components/
│   ├── common/          # Buttons, Inputs, Modals, Navbar, Footer
│   ├── posts/           # PostCard, PostList, PostForm
│   ├── dashboard/       # DashboardTable, StatsCard
│   └── auth/            # LoginForm, SignupForm
│
├── pages/
│   ├── Home.jsx         # "/" - list of posts
│   ├── Post.jsx         # "/post/:id" - single post
│   ├── Login.jsx        # "/login"
│   ├── Signup.jsx       # "/signup"
│   ├── Dashboard.jsx    # "/dashboard"
│   ├── CreatePost.jsx   # "/create"
│   └── EditPost.jsx     # "/edit/:id"
│
├── context/
│   └── AuthContext.jsx  # User session and auth logic
│
├── utils/
│   ├── supabaseClient.js  # Supabase client initialization
│   └── helpers.js         # Utility functions (e.g., date formatting)
│
├── hooks/
│   └── useAuth.js       # Custom hook to access auth context
│
├── App.jsx              # Routes and layout
└── main.jsx             # App bootstrap
```

This structure separates **pages**, **reusable components**, **context**, and **utilities**, which makes the app easier to maintain and scale.

---

## 3. Routing Architecture

Routing is handled with **React Router v6**.

### 3.1 Routes

| Route        | Component    | Access Level                   | Description              |
| ------------ | ------------ | ------------------------------ | ------------------------ |
| `/`          | `Home`       | Public                         | List of published posts  |
| `/post/:id`  | `Post`       | Public                         | Single post view         |
| `/login`     | `Login`      | Public (redirect if logged in) | Login form               |
| `/signup`    | `Signup`     | Public (redirect if logged in) | Signup form              |
| `/dashboard` | `Dashboard`  | Private (auth only)            | User's posts & stats     |
| `/create`    | `CreatePost` | Private (auth only)            | New post creation        |
| `/edit/:id`  | `EditPost`   | Private (auth only)            | Editing an existing post |

### 3.2 Protected Routes

A `ProtectedRoute` component (or pattern) is used to guard private routes:

* Checks for current authenticated user from `AuthContext`
* If not logged in → redirects to `/login`
* If logged in → renders the requested page

---

## 4. State Management

DevSphere uses a combination of:

* **React Context** for global auth state.
* Local component state for forms, loading, and simple UI states.

### 4.1 AuthContext

Responsibilities:

* Store current user session.
* Listen for Supabase auth state changes.
* Expose:

  * `user`
  * `login()`
  * `signup()`
  * `logout()`

### 4.2 Posts State

Posts are usually fetched:

* On **Home page load** (published posts).
* On **Dashboard load** (posts by current user).
* On **Post page load** (a specific post by ID).

Data flow:

1. Component triggers Supabase query.
2. Data is stored in local state with `useState`.
3. UI renders based on loading, success, or error state.

---

## 5. Backend Architecture (Supabase)

Supabase acts as the backend and consists of 3 main parts:

* **Authentication**
* **Database**
* **Storage**

### 5.1 Authentication

* Email/Password authentication via Supabase Auth.
* Supabase manages:

  * User registration
  * Login
  * Password validation
  * Session tokens

The frontend stores auth state via `AuthContext`, using:

* `supabase.auth.signUp()`
* `supabase.auth.signInWithPassword()`
* `supabase.auth.signOut()`
* `supabase.auth.getUser()` / `onAuthStateChange()`

---

### 5.2 Database Design

#### 5.2.1 Tables

**`posts` Table (Core content)**

| Column            | Type           | Description                     |
| ----------------- | -------------- | ------------------------------- |
| `id`              | uuid           | Primary key                     |
| `title`           | text           | Post title                      |
| `content`         | text           | Post body (HTML/Markdown)       |
| `tags`            | text[] or text | Tags (e.g. "react, javascript") |
| `cover_image_url` | text           | Public URL to cover image       |
| `author_id`       | uuid           | Reference to `auth.users.id`    |
| `published`       | boolean        | True if visible on homepage     |
| `created_at`      | timestamp      | Auto-generated                  |
| `updated_at`      | timestamp      | Auto-generated                  |

*(Optional)* **`profiles` Table**

To store extra user info (e.g., display name, bio, avatar) tied to `auth.users`.

---

### 5.3 Storage

Supabase **Storage** is used for:

* Cover images for posts
* (Optional) User avatars

Process:

1. User uploads image from React.
2. Supabase uploads into a bucket (e.g. `post-images`).
3. Supabase returns a public URL.
4. The URL is stored in `posts.cover_image_url`.

---

### 5.4 Security & Row Level Security (RLS)

Supabase Row Level Security (RLS) ensures:

* Only the **author** of a post can update/delete it.
* All users can read **published** posts.

Example policies (conceptually):

* `SELECT`:

  * Allow for all rows where `published = true`
  * Allow for author’s own posts even if unpublished (in dashboard)
* `INSERT`:

  * Allow if `author_id = auth.uid()`
* `UPDATE` / `DELETE`:

  * Allow if `author_id = auth.uid()`

---

## 6. Data Flow

### 6.1 Creating a Post

1. User logs in.
2. User navigates to `/create`.
3. User fills form (title, content, tags, optional cover image).
4. If image is uploaded:

   * File is sent to Supabase Storage.
   * URL returned and saved.
5. Post data (including `author_id` and `published`) is sent to Supabase `posts` table.
6. On success:

   * Show toast notification.
   * Redirect to Dashboard or Post page.

---

### 6.2 Viewing Posts (Home & Post Page)

**Home Page (`/`):**

1. Component loads.
2. Supabase query selects all posts where `published = true`.
3. Posts sorted by `created_at DESC`.
4. `PostCard` components render list.

**Post Page (`/post/:id`):**

1. Component reads `id` from route params.
2. Supabase query selects post by `id`.
3. Renders full post detail.

---

### 6.3 Editing & Deleting Posts

**Editing (`/edit/:id`):**

1. User navigates to Edit page from Dashboard.
2. App fetches existing post data.
3. Form pre-fills with existing title, content, tags, etc.
4. On submit:

   * Supabase `update` called with new values.
5. On success:

   * Redirect to Dashboard or Post page.

**Deleting (from Dashboard):**

1. User clicks delete on a specific post.
2. Confirmation modal appears.
3. On confirm:

   * Supabase `delete` called for that `id`.
4. Local state updated to remove the post from the dashboard list.

---

## 7. UI/UX Architecture

### 7.1 Design Principles

* Minimal, clean design using TailwindCSS.
* A focus on **readability** for blog content:

  * Proper font sizes
  * Spacing
  * Typography
* Clear visual hierarchy:

  * Navigation at top
  * Content in the middle
  * Footer at bottom

### 7.2 Shared Layouts

You may define layouts for:

* **Public Layout** – Navbar + content + footer.
* **Dashboard Layout** – Sidebar + main content area.

This helps reuse layout code and keep pages cleaner.

---

## 8. Deployment Architecture

### 8.1 Hosting

* **Frontend:** Deployed on Vercel or Netlify.
* **Backend (Supabase):** Hosted on Supabase cloud.

### 8.2 Environment Variables

The frontend uses environment variables for:

* `VITE_SUPABASE_URL`
* `VITE_SUPABASE_ANON_KEY`

These are configured in:

* `.env.local` (local development)
* Vercel/Netlify project settings (production)

---

## 9. Future Architecture Enhancements

Possible future upgrades:

* **Comments system** (new `comments` table + relations)
* **Likes / bookmarks** (many-to-many relations between users and posts)
* **Analytics** (views tracking with an additional table)
* **Role-based admin panel** (extra policies and UI sections)
* **Microservices or Functions** for server-side tasks (Supabase Edge Functions)

---

This architecture is designed to be:

* **Beginner-friendly for implementation**
* **Senior-friendly for explanation to recruiters/interviewers**
* Scalable enough for future features if you continue to extend DevSphere.


