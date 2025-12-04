## Blog on Next.js with React Query and Firestore

Full‑featured blog platform with Firebase Firestore backend, React Query for data caching, and Next.js App Router with Server Components.

### 🚀 Tech Stack

- **Next.js 16** – React framework with App Router & Server Components
- **React 19** – UI library
- **TypeScript** – static typing
- **TanStack Query (React Query)** – server state & caching
- **Firebase Firestore** – NoSQL database
- **Zod** – schema validation
- **React Hook Form** – form handling
- **Tailwind CSS** – styling
- **Lucide React** – icons
- **Zustand** – client-side auth store

---

## ✨ Features

- View list of posts from Firestore
- Create, edit and delete posts (author only)
- Add and delete comments (authenticated users only)
- User authentication (register, login, logout)
- Form validation with Zod + React Hook Form
- Responsive layout with light/dark theme
- React Query caching, refetching and optimistic updates

---

## 🎯 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env example and fill it
cp env.example .env

# 3. Run dev server
pnpm dev
```

Then open `http://localhost:3000` in your browser.

---

## 🔧 Minimal Env Setup

Fill at least these variables in `.env`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Server-only JWT secret (never expose to client)
JWT_SECRET=your_jwt_secret_key_here
```

For full list and explanations see `DOCUMENTATION.md`.

---

## 📦 NPM Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Run production build
pnpm lint      # Run ESLint
pnpm test      # Run tests (if configured)
```

---

## 📚 More Details

For full technical documentation (architecture, detailed structure, data flow, testing, best practices) see:  
**`DOCUMENTATION.md`**

---

## 📄 License

MIT
