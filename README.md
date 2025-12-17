# 🚀 cjblack.dev - Minimalistic Portfolio Website

> A minimalistic modern portfolio website built with Next.js 16, featuring authentication, database integration, and security protection.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
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

- 🎨 **Modern UI/UX** - Beautiful, responsive design with glassmorphism and animations
- 🔐 **Authentication System** - Built with Better Auth (OAuth support: GitHub, Google)
- 📧 **Contact Form** - EmailJS integration with anti-spam protection
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 🛡️ **Security** - Arcjet protection (Bot detection, rate limiting, shield)
- ⚡ **Performance** - Optimized with Next.js 16 App Router

### Technical Features

- 🎯 **Type Safety** - Full TypeScript implementation
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎭 **Animations** - Motion (Framer Motion) for smooth interactions
- 🌐 **3D Graphics** - Three.js & React Three Fiber integrations
- 📊 **Analytics** - Vercel Analytics integration
- 🧪 **Testing Ready** - Vitest & React Testing Library setup

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Purpose         | Version  |
| ---------------- | --------------- | -------- |
| **Next.js**      | React Framework | 16.0.7   |
| **React**        | UI Library      | 19.2.0   |
| **TypeScript**   | Type Safety     | 5.x      |
| **Tailwind CSS** | Styling         | 4.x      |
| **Motion**       | Animations      | 12.23.24 |
| **Three.js**     | 3D Graphics     | 0.181.2  |

### Backend & Database

| Technology      | Purpose          | Version |
| --------------- | ---------------- | ------- |
| **Prisma**      | ORM              | 7.0.1   |
| **PostgreSQL**  | Database         | -       |
| **Better Auth** | Authentication   | 1.4.3   |
| **Node Argon2** | Password Hashing | 2.0.2   |

### Security & Utilities

| Technology  | Purpose                            | Version       |
| ----------- | ---------------------------------- | ------------- |
| **Arcjet**  | Security (Bot, Rate Limit, Shield) | 1.0.0-beta.15 |
| **EmailJS** | Email Service                      | 4.4.1         |
| **Zod**     | Schema Validation                  | 4.1.13        |

### DevOps & Tools

| Technology | Purpose             | Version |
| ---------- | ------------------- | ------- |
| **Vercel** | Hosting & Analytics | -       |
| **ESLint** | Code Linting        | 9.x     |
| **Vitest** | Testing Framework   | Latest  |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Next.js    │  │   React 19   │  │  TypeScript  │       │
│  │   App Router │  │   Components │  │   Type Safe  │       │
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
│  │ Better Auth  │  │  Protected   │  │   (Forms)      │     │
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

- **User**: Core user data with OAuth support
- **Account**: OAuth account associations
- **Session**: Active user sessions
- **Verification**: Email/password verification tokens

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
│   ├── (protected)/         # Protected routes (profile, projects)
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── ui/                  # UI components (shadcn/ui)
│   ├── projects/            # Project-specific components
│   ├── contact-section.tsx  # Contact form
│   └── ...
├── lib/                     # Utilities & configurations
│   ├── auth.ts              # Better Auth config
│   ├── auth-client.ts       # Client-side auth
│   ├── db.ts                # Prisma client
│   └── utils.ts             # Helper functions
├── prisma/                  # Database
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
│   ├── tech/                # Technology icons
│   ├── projects/            # Project screenshots
│   ├── hero/                # Profile & hero images
│   └── misc/                # Miscellaneous assets
├── styles/                  # Global styles
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

---

<div align="center">
  <p>Built with ❤️ by cjblack.dev</p>
  <p>⭐ Star this repo if you find it helpful!</p>
  <p> THANKS FOR VISITING!!! </p>
</div>
