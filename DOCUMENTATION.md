# Project Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

## Overview

This is a modern blog platform built with Next.js 16, React 19, TypeScript, and Firebase Firestore. The application follows SOLID principles and uses a clean architecture pattern with clear separation of concerns.

### Key Technologies

- **Next.js 16** - React framework with App Router and Server Components
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query (React Query)** - Server state management and caching
- **Firebase Firestore** - NoSQL database
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Zustand** - Client state management (for auth)

## Architecture

### Architecture Patterns

The project follows these architectural principles:

1. **Separation of Concerns**
   - Server Components for data fetching and SEO
   - Client Components for interactivity
   - Server Actions for mutations
   - Custom hooks for reusable logic

2. **SOLID Principles**
   - **Single Responsibility**: Each module has one clear purpose
   - **Dependency Inversion**: Components depend on abstractions (Server Actions, hooks)
   - **Open/Closed**: Easy to extend without modifying existing code

3. **Data Flow**
   ```
   Server Component → Firestore API → Data
   Client Component → Server Action → Firestore API → Data
   Client Component → React Query Hook → Server Action → Firestore API
   ```

### Layer Structure

```
┌─────────────────────────────────────┐
│         UI Layer (Components)        │
│  - Server Components (pages)         │
│  - Client Components (interactive)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Application Layer               │
│  - Server Actions (mutations)        │
│  - React Query Hooks (queries)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Domain Layer                   │
│  - Firestore API (lib/firestore)    │
│  - Validation (lib/validations)     │
│  - Schemas (schemas/)                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Infrastructure Layer            │
│  - Firebase Config                   │
│  - Utilities (auth, session)        │
└─────────────────────────────────────┘
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page (Server Component)
│   ├── layout.tsx               # Root layout
│   ├── posts/
│   │   ├── [id]/
│   │   │   ├── page.tsx         # Post detail (Server Component)
│   │   │   └── edit/
│   │   │       └── page.tsx     # Edit post (Server Component)
│   │   ├── create/
│   │   │   └── page.tsx         # Create post (Client Component)
│   │   └── components/          # Post-related components
│   │       ├── post-list.tsx
│   │       ├── post-card.tsx
│   │       ├── post-detail/
│   │       └── post-form/
│   └── login/
│       └── page.tsx             # Login page
│
├── components/                   # React components
│   ├── blog/                    # Blog-specific components
│   │   ├── comment-section.tsx
│   │   ├── comment-form.tsx
│   │   └── comment-list.tsx
│   ├── auth/                    # Authentication components
│   │   ├── auth-required.tsx
│   │   └── access-denied.tsx
│   ├── layout/                  # Layout components
│   │   └── header/
│   └── ui/                      # Reusable UI components (shadcn/ui)
│
├── hooks/                        # Custom React hooks
│   ├── usePosts.ts              # Post queries and mutations
│   ├── useComments.ts           # Comment mutations
│   ├── useAuth.ts               # Authentication mutations
│   └── useCurrentUser.ts        # Current user query
│
├── lib/                          # Core business logic
│   ├── firestore/               # Firestore API layer
│   │   ├── posts.ts             # Post CRUD operations
│   │   ├── comments.ts          # Comment CRUD operations
│   │   └── users.ts             # User CRUD operations
│   └── validations/             # Validation logic
│       ├── auth.ts              # Auth validation
│       └── user.ts              # User validation
│
├── actions/                      # Next.js Server Actions
│   ├── posts.ts                 # Post server actions
│   ├── comments.ts              # Comment server actions
│   └── user.ts                  # User server actions
│
├── schemas/                      # Zod validation schemas
│   ├── post.schema.ts
│   ├── comment.schema.ts
│
├── types/                        # TypeScript type definitions
│   ├── post.ts
│   ├── comment.ts
│   └── user.ts
│
├── utils/                        # Utility functions
│   ├── auth.ts                  # Password hashing, JWT
│   ├── session.ts               # Session management
│   ├── timestamp.ts             # Firestore timestamp conversion
│   ├── post.ts                  # Post data transformation
│   └── comment.ts               # Comment data transformation
│
├── configs/                     # Configuration files
│   ├── firebase.ts              # Firebase initialization
│   ├── auth.ts                  # Auth configuration
│   └── schemas/                 # Zod schemas for forms
│
├── providers/                    # React context providers
│   ├── query.tsx                # TanStack Query provider
│   ├── theme.tsx                # Theme provider
│   └── auth-store-provider.tsx  # Auth store provider
│
└── store/                        # Client state management
    └── auth-store.ts            # Zustand auth store
```

## Key Components

### Server Components

**Purpose**: Fetch data on the server for better SEO and performance.

- `app/page.tsx` - Home page, fetches posts from Firestore
- `app/post/[id]/page.tsx` - Post detail page, fetches post and comments
- `app/post/[id]/edit/page.tsx` - Edit page, fetches post and validates ownership

### Client Components

**Purpose**: Handle user interactions and client-side state.

- `app/post/create/page.tsx` - Create post form
- `components/blog/comment-form.tsx` - Comment submission
- `components/layout/header/index.tsx` - Header with user menu

### Server Actions

**Purpose**: Handle mutations and revalidation.

- `actions/posts.ts` - Create, update, delete posts
- `actions/comments.ts` - Create, delete comments
- `actions/user.ts` - Register, login, logout

### Custom Hooks

**Purpose**: Reusable data fetching and mutation logic.

- `hooks/usePosts.ts` - Post queries and mutations with React Query
- `hooks/useComments.ts` - Comment mutations
- `hooks/useAuth.ts` - Authentication mutations

### Firestore API Layer

**Purpose**: Direct database operations.

- `lib/firestore/posts.ts` - Post CRUD operations
- `lib/firestore/comments.ts` - Comment CRUD operations
- `lib/firestore/users.ts` - User CRUD operations

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd test
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy `env.example` to `.env`:

   ```bash
   cp env.example .env
   ```

   Fill in your Firebase credentials:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Configure Firestore Rules**

   Update `firestore.rules` in Firebase Console to match your security requirements.

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate test coverage
```

## Environment Variables

### Required Variables

| Variable                                   | Description                             | Example                   |
| ------------------------------------------ | --------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API key                        | `AIza...`                 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain                    | `project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID                     | `my-project`              |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket                 | `project.appspot.com`     |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID            | `123456789`               |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID                         | `1:123:web:abc`           |
| `JWT_SECRET`                               | Secret key for JWT tokens (server-only) | `your-secret-key`         |

### Optional Variables

| Variable                              | Description                     |
| ------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID |

**Note**: All `NEXT_PUBLIC_*` variables are exposed to the client. The `JWT_SECRET` is server-only and should never be exposed.

## Testing

See [TESTING.md](./TESTING.md) for detailed testing documentation.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Data Flow Examples

### Reading Data (Server Component)

```typescript
// app/page.tsx
import { getPosts } from '@/lib/firestore/posts';

export default async function HomePage() {
  const posts = await getPosts(); // Direct Firestore call
  return <PostList posts={posts} />;
}
```

### Reading Data (Client Component)

```typescript
// hooks/usePosts.ts
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
}
```

### Creating Data

```typescript
// hooks/usePosts.ts
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => createPostAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

## Best Practices

1. **Use Server Components by default** - Only use Client Components when needed
2. **Use Server Actions for mutations** - Better error handling and revalidation
3. **Use React Query for client-side data** - Automatic caching and refetching
4. **Validate on both client and server** - Zod schemas for type safety
5. **Keep components small and focused** - Single Responsibility Principle
6. **Use TypeScript strictly** - Enable strict mode in tsconfig.json

## Troubleshooting

### Common Issues

1. **Firebase initialization errors**
   - Check that all environment variables are set
   - Ensure `.env.local` is in the project root
   - Restart the dev server after changing env variables

2. **Hydration mismatches**
   - Ensure Server Components don't use client-only APIs
   - Use `suppressHydrationWarning` for theme switching

3. **Query cache not updating**
   - Ensure query keys match between queries and mutations
   - Use `invalidateQueries` after mutations

## License

MIT
