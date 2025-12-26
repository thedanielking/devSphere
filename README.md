# DevSphere – Developer Blog CMS

DevSphere is a **tech-focused blog Content Management System (CMS)** for developers and students to create, manage, and read programming-related articles.

It’s built to showcase **real-world frontend engineering skills**: authentication, CRUD operations, dashboards, responsive UI, and integration with a backend-as-a-service (Supabase).

---

## 🚀 Live Demo

> 🔗 **Live URL:** _Coming soon_  
> 🔗 **Frontend Repo:** This repo  
> 🔗 **Backend:** Supabase (managed BaaS – no separate backend repo)

---

## 🎯 Project Goals

- Build a **realistic fullstack-style project** using:
  - **React** (Vite)
  - **Supabase** (Auth, Database, Storage)
  - **TailwindCSS**
- Practice **software engineering workflow**:
  - Requirements → Architecture → Implementation → Testing → Deployment
- Serve as a **portfolio project** to demonstrate:
  - Frontend skills
  - Understanding of data flow
  - Product thinking
  - Clean UI & UX

---

## ✨ Features

### 👤 Authentication

- Email & password authentication with **Supabase Auth**
- Signup, login, and logout flows
- Persistent sessions
- Protected routes for dashboard and post creation

### 📝 Blog Management (CMS)

- Create, read, update, and delete (CRUD) blog posts
- Each blog post supports:
  - Title
  - Rich text content
  - Tags (e.g. `React`, `JavaScript`)
  - Cover image (uploaded to Supabase Storage)
  - Published/Draft status

### 🏠 Public Blog

- Homepage showing all **published posts**
- Post cards with:
  - Title
  - Excerpt
  - Author
  - Date
  - Cover image
- Single post page with:
  - Full content
  - Tags
  - Date
  - Author information

### 📊 Dashboard

- Private dashboard for authenticated users
- View all posts created by the logged-in user
- Edit or delete posts
- See basic stats (e.g. number of posts, published vs drafts – optional)

### 🔍 Search & Filter

- Search posts by title (basic search)
- Filter posts by tag

### 📱 Responsive UI

- Fully responsive layout using TailwindCSS
- Optimized for:
  - Mobile
  - Tablet
  - Desktop

---

## 🧰 Tech Stack

### Frontend

- **React** (Vite)
- **React Router v6** – Client-side routing
- **TailwindCSS** – Styling and layout
- **React Hook Form** – Form management (optional but used for cleaner forms)
- **React Quill** – Rich text editor for blog content
- **React Hot Toast** – Toast notifications
- **Framer Motion** – UI animations (optional)

### Backend (BaaS)

- **Supabase**
  - Authentication (email/password)
  - PostgreSQL database
  - Storage (for cover images)
  - Row-level security (RLS) & policies

---

## 🗄️ Database Schema (Supabase)

### `posts` Table

| Column           | Type      | Description                          |
|------------------|-----------|--------------------------------------|
| `id`             | uuid      | Primary key                          |
| `title`          | text      | Post title                           |
| `content`        | text      | Post content (HTML or markdown)     |
| `tags`           | text[] or text | Tags (e.g. `react,javascript`) |
| `cover_image_url`| text      | URL to cover image                   |
| `author_id`      | uuid      | Reference to `auth.users.id`         |
| `published`      | boolean   | Whether post is visible publicly     |
| `created_at`     | timestamp | Created timestamp                    |
| `updated_at`     | timestamp | Updated timestamp                    |

> 💡 Row Level Security (RLS) is enabled so that users can only **update/delete their own posts**, while all visitors can **read published posts**.

---

## 🏗️ Project Structure

```txt
src/
├── components/
│   ├── common/          # Buttons, Inputs, Navbar, Footer, Modals
│   ├── posts/           # PostCard, PostList, PostForm, etc.
│   ├── dashboard/       # DashboardTable, StatsCard, etc.
│   └── auth/            # LoginForm, SignupForm
│
├── pages/
│   ├── Home.jsx         # "/" – list of posts
│   ├── Post.jsx         # "/post/:id" – single post page
│   ├── Login.jsx        # "/login"
│   ├── Signup.jsx       # "/signup"
│   ├── Dashboard.jsx    # "/dashboard"
│   ├── CreatePost.jsx   # "/create"
│   └── EditPost.jsx     # "/edit/:id"
│
├── context/
│   └── AuthContext.jsx  # Authentication context & logic
│
├── utils/
│   ├── supabaseClient.js  # Supabase configuration
│   └── helpers.js         # Utility functions (dates, etc.)
│
├── hooks/
│   └── useAuth.js       # Custom hook to consume AuthContext
│
├── App.jsx              # Main app & routes
└── main.jsx             # React entry point
````

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/devsphere.git
cd devsphere
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Supabase

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Get your:

   * **Project URL**
   * **Anon public key**
3. Create the `posts` table (see schema above).
4. Enable Row Level Security and create basic policies.
5. Create a **Storage bucket** (e.g. `post-images`) for cover images.

### 4️⃣ Environment Variables

Create a `.env.local` file in the root of your project:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5️⃣ Start Development Server

```bash
npm run dev
```

The app should now be running at:
`http://localhost:5173` (or similar, depending on Vite)

---

## 🚢 Deployment

You can deploy DevSphere using:

### ▶️ Vercel (Recommended)

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your repo.
3. Add the environment variables:

   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
4. Deploy the app.

### ▶️ Netlify

Alternatively, you can also use Netlify by:

1. Connecting your GitHub repo.
2. Setting the build command: `npm run build`
3. Setting the output directory: `dist`
4. Adding the same environment variables.

---

## ✅ Current Status

* [x] Requirements & architecture defined
* [x] Project scaffolding with React & Tailwind
* [x] Supabase setup (Auth, DB, Storage)
* [x] Authentication (login/signup/logout)
* [x] Create & publish blog posts
* [x] Public homepage & single post page
* [x] User dashboard with post management
* [ ] Search & tag filtering (in progress / planned)
* [ ] Comments, likes, bookmarks (future)

---

## 🧠 What I Learned (Talking Point for Recruiters)

While building DevSphere, I practiced:

* Designing a project using proper **requirements** and **architecture docs**.
* Building a real-world **React app** with:

  * Routing
  * State management
  * Context API
* Integrating **Supabase** for:

  * Authentication
  * Database CRUD
  * File storage
* Implementing **protected routes** and role-based access.
* Writing clean, reusable UI with **TailwindCSS**.
* Deploying a production-ready app with environment variables.

---

## 🗺️ Roadmap / Future Ideas

* 🔹 Comment system for posts
* 🔹 Like & bookmark functionality
* 🔹 User profile pages (bio, avatar, social links)
* 🔹 Dark mode toggle
* 🔹 Analytics dashboard (views per post)
* 🔹 Learning streak tracker for authors
* 🔹 Multi-author collaboration features

---

## 🤝 Contributions

This is a personal portfolio project, but:

* Feedback, suggestions, and PRs are welcome.
* You can fork the project and adapt it for your own niche (campus news CMS, startup blog, etc.).

---

## 📬 Contact

**Developer:** Daniel (Frontend Developer)

* LinkedIn: *Add your link here*
* Portfolio: *Add your link here*
* Email: *Add your email here*

---

If you check this repo out, I’d love to hear your feedback or suggestions. 😊


