# 🚀 cjblack.dev - Minimalistic Portfolio Website

> A minimalistic modern portfolio website built with Next.js 16, featuring authentication, database integration, feedback wall, reaction system, and security protection.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Business Logic & Workflows](#-business-logic--workflows)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with glassmorphism, animations, and dark/light modes
- 🔐 **Authentication System** - Built with Better Auth (OAuth: GitHub, Google + Email/Password + Magic Link)
- 📧 **Contact Form** - EmailJS integration with anti-spam protection
- 🗄️ **Database** - PostgreSQL with Prisma ORM v7
- 🛡️ **Security** - Arcjet protection (Bot detection, rate limiting, shield)
- ⚡ **Performance** - Optimized with Next.js 16 App Router & dynamic imports

### Interactive Features

- 💬 **Feedback Wall** - Community feedback system with CRUD operations
- ❤️ **Reaction System** - Heart reactions with toggle functionality
- 🎭 **Animated Intro** - Custom intro loader animation
- 🌐 **3D Globe** - Interactive Three.js globe visualization
- 📊 **Analytics** - Vercel Analytics & Speed Insights integration

### Technical Features

- 🎯 **Type Safety** - Full TypeScript implementation
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS v4
- 🎭 **Animations** - Motion (Framer Motion) for smooth interactions
- 🌐 **3D Graphics** - Three.js & React Three Fiber integrations
- 🧪 **Testing Ready** - Vitest & React Testing Library setup

---

## 🔄 Business Logic & Workflows

### 1. Authentication Workflow

The authentication system supports multiple methods with complete email verification:

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   Sign Up   │    │   Sign In   │    │ Magic Link  │      │
│  │  (Email +   │    │  (Email +   │    │  (Email     │      │
│  │  Password)  │    │  Password)  │    │   Only)     │      │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘      │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌─────────────────────────────────────────────────┐        │
│  │              Email Verification                 │        │
│  │  • Verification email sent with 24hr expiry     │        │
│  │  • Custom branded email templates               │        │
│  │  • Redirect to sign-up page after verification  │        │
│  └─────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │                OAuth Providers                  │        │
│  │  ┌──────────┐           ┌──────────┐            │        │
│  │  │  GitHub  │           │  Google  │            │        │
│  │  │  OAuth   │           │  OAuth   │            │        │
│  │  └──────────┘           └──────────┘            │        │
│  └─────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │              Password Reset Flow                │        │
│  │  • Reset email sent with 1hr expiry             │        │
│  │  • Secure token-based verification              │        │
│  └─────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Implementation Details:**

- **Session Management**: Uses Better Auth with Prisma adapter for PostgreSQL
- **Password Requirements**: Minimum 8 characters, maximum 128 characters
- **Email Verification**: Required for all new accounts
- **Trusted Origins**: Configured for localhost development

### 2. Feedback Wall Workflow

The Feedback Wall (`/wall`) allows authenticated users to leave feedback with full CRUD capabilities:

```
┌─────────────────────────────────────────────────────────────┐
│                    FEEDBACK WALL FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User visits /wall page                                     │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Authentication Check                         │        │
│  │    • Session verified via Better Auth           │        │
│  │    • Unauthenticated? Show login prompt         │        │
│  └─────────────────────────────────────────────────┘        │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  CREATE         │  │  READ           │                   │
│  │  • Auth required│  │  • Public view  │                   │
│  │  • Server action│  │  • Real-time    │                   │
│  │  • Path revalidate│ │  • With author │                   │
│  └────────┬────────┘  └────────┬────────┘                   │
│           │                    │                            │
│           ▼                    ▼                            │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Feedback Card Display                        │        │
│  │    • User avatar & name                         │        │
│  │    • Timestamp (relative date)                  │        │
│  │    • Content                                    │        │
│  │    • Action buttons (owner/admin)               │        │
│  └─────────────────────────────────────────────────┘        │
│           │                                                 │
│  ┌────────┴────────┐                                        │
│  ▼                 ▼                                        │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  UPDATE         │  │  DELETE         │                   │
│  │  • Owner/Admin  │  │  • Owner/Admin  │                   │
│  │  • Pencil icon  │  │  • Trash icon   │                   │
│  │  • Inline edit  │  │  • Confirmation │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  PERMISSIONS:                                               │
│  • Create: Any authenticated user                           │
│  • Read: Public (no auth required)                          │
│  • Update: Author OR Admin only                             │
│  • Delete: Author OR Admin only                             │
│  • Admin Email: duquechristianjohncalderon@gmail.com        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **Services**: Business logic and server actions in `services/`
  **Server Actions (`services/feedback.ts`):**

- `createFeedback(content)` - Creates new feedback (requires auth)
- `getFeedbacks()` - Fetches all feedbacks with user data
- `updateFeedback(id, content)` - Updates feedback (owner/admin)
- `deleteFeedback(id)` - Deletes feedback (owner/admin)

### 3. Reaction System Workflow

Heart reaction system with toggle functionality:

```
┌─────────────────────────────────────────────────────────────┐
│                    REACTION SYSTEM FLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User clicks heart button                                   │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Authentication Check                         │        │
│  │    • Unauthorized? Prompt login                 │        │
│  └─────────────────────────────────────────────────┘        │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Check Existing Reaction                      │        │
│  │    • Query: userId + type = "HEART" (unique)    │        │
│  └─────────────────────────────────────────────────┘        │
│         │                                                   │
│    ┌────┴────┐                                              │
│    ▼         ▼                                              │
│  EXISTS    NOT EXISTS                                       │
│    │           │                                            │
│    ▼           ▼                                            │
│  DELETE    CREATE                                           │
│  reaction  reaction                                         │
│    │           │                                            │
│    └─────┬─────┘                                            │
│          ▼                                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Revalidate Path & Update UI                  │        │
│  │    • Show reaction count                        │        │
│  │    • Display user avatars who reacted           │        │
│  └─────────────────────────────────────────────────┘        │
│                                                             │
│  DATABASE CONSTRAINT:                                       │
│  • @@unique([userId, type]) - One reaction per type/user    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Server Actions:**

- `toggleReaction()` - Toggles heart reaction (auth required)
- `getReactionData()` - Gets reaction count & user list

### 4. Contact Form Workflow

Professional contact form with EmailJS integration:

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTACT FORM FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User fills contact form                                    │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Form Validation (Zod)                        │        │
│  │    • Name (required)                            │        │
│  │    • Email (valid format)                       │        │
│  │    • Message (required)                         │        │
│  └─────────────────────────────────────────────────┘        │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Arcjet Security Layer                        │        │
│  │    • Bot detection & verification               │        │
│  │    • Rate limiting (token bucket)               │        │
│  │    • Shield protection (SQL/XSS)                │        │
│  └─────────────────────────────────────────────────┘        │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    EmailJS Integration                          │        │
│  │    • Service ID configuration                   │        │
│  │    • Template-based emails                      │        │
│  │    • Public key authentication                  │        │
│  └─────────────────────────────────────────────────┘        │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────────────────────────────────────────┐        │
│  │    Success Response                             │        │
│  │    • Toast notification                         │        │
│  │    • Form reset                                 │        │
│  └─────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5. Page Navigation & Routes

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION ROUTES                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PUBLIC ROUTES:                                             │
│  ├── /                    → Homepage (Hero, Features,       │
│  │                          Projects, Tech, Contact)        │
│  ├── /about               → About page                      │
│  ├── /wall                → Feedback Wall (public read)     │
│  └── /projects            → Projects showcase (Patch Up)    │
│                                                             │
│  AUTH ROUTES:                                               │
│  ├── /sign-in             → Email/Password + OAuth login    │
│  └── /sign-up             → Registration                    │
│                                                             │
│  PROTECTED ROUTES:                                          │
│  └── /profile             → User profile (auth required)    │
│                                                             │
│  API ROUTES:                                                │
│  ├── /api/auth/*          → Better Auth endpoints           │
│  └── /api/arcjet           → Protected security endpoint    │
│                                                             │
│  NAVIGATION ITEMS (Floating Nav):                           │
│  • Home → /#home                                            │
│  • Wall → /wall                                             │
│  • About → /about                                           │
│  • Projects → /#projects                                    │
│  • Technologies → /#technologies                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Purpose             | Version  |
| ---------------- | ------------------- | -------- |
| **Next.js**      | React Framework     | 16.0.7   |
| **React**        | UI Library          | 19.2.0   |
| **TypeScript**   | Type Safety         | 5.x      |
| **Tailwind CSS** | Styling             | 4.x      |
| **Motion**       | Animations          | 12.23.26 |
| **Three.js**     | 3D Graphics         | 0.181.2  |
| **GSAP**         | Advanced Animations | 3.14.2   |

### Backend & Database

| Technology      | Purpose          | Version |
| --------------- | ---------------- | ------- |
| **Prisma**      | ORM              | 7.3.0   |
| **PostgreSQL**  | Database         | -       |
| **Better Auth** | Authentication   | 1.4.3   |
| **Node Argon2** | Password Hashing | 2.0.2   |

### Security & Utilities

| Technology  | Purpose                            | Version       |
| ----------- | ---------------------------------- | ------------- |
| **Arcjet**  | Security (Bot, Rate Limit, Shield) | 1.0.0-beta.15 |
| **EmailJS** | Email Service                      | 4.4.1         |
| **Zod**     | Schema Validation                  | 4.1.13        |
| **Sonner**  | Toast Notifications                | 2.0.7         |

### DevOps & Tools

| Technology | Purpose             | Version |
| ---------- | ------------------- | ------- |
| **Vercel** | Hosting & Analytics | -       |
| **ESLint** | Code Linting        | 9.x     |
| **Vitest** | Testing Framework   | 4.0.14  |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Next.js    │  │   React 19   │  │  TypeScript  │       │
│  │   App Router │  │   Components │  │   Type Safe  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Tailwind CSS │  │ Motion/GSAP  │  │  Three.js    │       │
│  │   Styling    │  │  Animations  │  │  3D Graphics │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYER (Arcjet)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Bot Detection│  │ Rate Limiting│  │    Shield    │       │
│  │   & Verify   │  │Token Bucket  │  │  SQL/XSS Prot│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │ /api/auth    │  │ /api/arcjet  │  │ Server Actions │     │
│  │ Better Auth  │  │  Protected   │  │ (Feedback CRUD)│     │
│  └──────────────┘  └──────────────┘  └────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Prisma ORM (v7)                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐  │   │
│  │  │   User   │ │ Account  │ │ Session  │ │  Verify │  │   │
│  │  │  Model   │ │  Model   │ │  Model   │ │  Model  │  │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘  │   │
│  │  ┌──────────┐ ┌──────────┐                           │   │
│  │  │ Feedback │ │ Reaction │                           │   │
│  │  │  Model   │ │  Model   │                           │   │
│  │  └──────────┘ └──────────┘                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              PostgreSQL (Prisma Accelerate)          │   │
│  │           Connection Pooling (pg adapter)            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** >= 18.17.0
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (local or cloud)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CJBLACK24/cjblack.dev-minimalistic-portfolio.git
   cd cjblack.dev-minimalistic-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your credentials (see [Environment Variables](#-environment-variables))

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# App URLs
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-random-secret-key-here"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
DIRECT_DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# SMTP (Gmail Example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="your-email@gmail.com"

# EmailJS
NEXT_APP_EMAILJS_SERVICE_ID="your-service-id"
NEXT_APP_EMAILJS_TEMPLATE_ID="your-template-id"
NEXT_APP_EMAILJS_PUBLIC_KEY="your-public-key"

# OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Security (Arcjet)
ARCJET_KEY="your-arcjet-key"
```

### How to get credentials:

- **Better Auth Secret**: Generate with `openssl rand -base64 32`
- **Database**: [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) or any PostgreSQL provider
- **EmailJS**: Sign up at [EmailJS.com](https://www.emailjs.com/)
- **GitHub OAuth**: [GitHub Developer Settings](https://github.com/settings/developers)
- **Google OAuth**: [Google Cloud Console](https://console.cloud.google.com/)
- **Arcjet**: [Arcjet Dashboard](https://app.arcjet.com/)

---

## 🗄️ Database Setup

### Schema Overview

The database uses Prisma ORM with the following models:

| Model            | Purpose                            |
| ---------------- | ---------------------------------- |
| **User**         | Core user data with OAuth support  |
| **Account**      | OAuth account associations         |
| **Session**      | Active user sessions               |
| **Verification** | Email/password verification tokens |
| **Feedback**     | User feedback entries              |
| **Reaction**     | Heart reactions (toggle-based)     |

### Database Relationships

```
User (1) ──────┬──────> (N) Account
               │
               ├──────> (N) Session
               │
               ├──────> (N) Feedback
               │
               └──────> (N) Reaction (unique per type)
```

### Migrations

> **Prisma v7 Note:** This project uses Prisma v7's new configuration system. See [docs/PRISMA-V7-GUIDE.md](docs/PRISMA-V7-GUIDE.md) for details.

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Production Migrations

```bash
# Create migration
npx dotenv-cli -e .env -- npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx dotenv-cli -e .env -- npx prisma migrate deploy
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (copy from `.env`)

3. **Set Build Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `cjblack.dev`)
4. Update DNS settings as instructed

---

## 📁 Project Structure

```
cjblack-dev_portfolio/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Better Auth endpoints
│   │   └── arcjet/          # Protected test endpoint
│   ├── (auth)/              # Auth pages (sign-in, sign-up)
│   ├── about/               # About page
│   ├── profile/             # Protected profile page
│   ├── projects/            # Projects showcase page
│   ├── wall/                # Feedback wall page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── backgrounds/         # Background effects
│   ├── contact/             # Contact form components
│   ├── features/            # Feature showcase
│   ├── feedback/            # Feedback wall components
│   │   ├── FeedbackForm.tsx    # Feedback input form
│   │   ├── FeedbackWall.tsx    # Main feedback display
│   │   └── ReactionButton.tsx  # Heart reaction toggle
│   ├── hero/                # Hero section
│   ├── layout/              # Layout components
│   │   ├── floating-navbar  # Navigation
│   │   ├── footer           # Footer
│   │   └── intro-loader     # Intro animation
│   ├── modals/              # Modal dialogs
│   ├── projects/            # Project cards
│   ├── providers/           # Context providers
│   ├── technologies/        # Tech stack section
│   └── ui/                  # UI primitives (68 components)
├── constants/               # App constants
│   ├── index.tsx            # Navigation & global constants
│   ├── projects.ts          # Projects data
│   └── projects-data.tsx    # Extended project data
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities & configurations
│   ├── actions/             # Server actions
│   │   └── feedback.ts      # Feedback CRUD operations
│   ├── auth.ts              # Better Auth config
│   ├── auth-client.ts       # Client-side auth
│   ├── db.ts                # Prisma client
│   ├── email.ts             # Email configuration
│   └── utils.ts             # Helper functions
├── prisma/                  # Database
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
│   ├── tech/                # Technology icons
│   ├── projects/            # Project screenshots
│   ├── hero/                # Profile & hero images
│   └── misc/                # Miscellaneous assets
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind config
└── README.md                # This file
```

---

## 📜 Scripts

### Development

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

### Database (Prisma v7)

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `npm run db:studio`   | Open Prisma Studio (database GUI) |
| `npm run db:push`     | Push schema changes to database   |
| `npm run db:generate` | Generate Prisma Client            |

### Testing

| Command              | Description             |
| -------------------- | ----------------------- |
| `npm run test`       | Run tests once          |
| `npm run test:watch` | Run tests in watch mode |

### Authentication

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npm run check-auth` | Fix password hashes (dev tool) |
| `npm run reset-auth` | Reset auth system (dev tool)   |

> 📖 **Note:** For detailed Prisma v7 usage, see [docs/PRISMA-V7-GUIDE.md](docs/PRISMA-V7-GUIDE.md)

---

## 🧪 Testing

Run tests with Vitest:

```bash
npm run test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Christian John Duque (CJ BLACK)**

- 🌐 Website: [cjblack.dev](https://cjblack.dev) (coming soon)
- 💼 LinkedIn: [cj-black-a5b110335](https://www.linkedin.com/in/cj-black-a5b110335)
- 🐙 GitHub: [@CJBLACK24](https://github.com/CJBLACK24)
- 📧 Email: duquechristianjohncalderon@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com) - Hosting platform
- [Prisma](https://www.prisma.io/) - Database ORM
- [Better Auth](https://www.better-auth.com/) - Authentication
- [Arcjet](https://arcjet.com/) - Security platform
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Aceternity UI](https://ui.aceternity.com/) - Additional UI components
- [Motion](https://motion.dev/) - Animation library
- [Three.js](https://threejs.org/) - 3D graphics library

---

<div align="center">
  <p>Built with ❤️ by cjblack.dev</p>
  <p>⭐ Star this repo if you find it helpful!</p>
  <p> THANKS FOR VISITING!!! </p>
</div>
