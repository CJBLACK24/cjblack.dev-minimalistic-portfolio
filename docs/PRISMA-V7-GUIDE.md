# 🗄️ Prisma v7 Configuration Guide

## Overview

This project uses **Prisma v7**, which introduced a new configuration system. The main change is that the database URL is now defined in `prisma.config.ts` instead of directly in `schema.prisma`.

## Configuration Files

### `prisma.config.ts`
```typescript
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
```

### `schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // Note: No 'url' property here anymore!
}
```

## Environment Variables Required

Your `.env` file must contain:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
DIRECT_DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

## 🚀 Available Scripts

We've added convenient npm scripts for Prisma operations:

### Database Studio (GUI)
```bash
npm run db:studio
```
Opens Prisma Studio at `http://localhost:5555`

### Push Schema to Database
```bash
npm run db:push
```
Pushes your schema changes to the database (for development)

### Generate Prisma Client
```bash
npm run db:generate
```
Generates the Prisma Client based on your schema

## 🔧 Manual Commands

If you need to run Prisma commands manually, use `dotenv-cli` to load environment variables:

### Examples:
```bash
# Prisma Studio
npx dotenv-cli -e .env -- npx prisma studio

# Database push
npx dotenv-cli -e .env -- npx prisma db push

# Create migration
npx dotenv-cli -e .env -- npx prisma migrate dev --name your_migration

# Deploy migrations
npx dotenv-cli -e .env -- npx prisma migrate deploy

# Format schema
npx prisma format
```

## 📝 Common Issues

### Issue: "No database URL found"
**Solution:** Use the npm scripts (`npm run db:studio`) or prepend with `dotenv-cli -e .env --`

### Issue: Environment variables not loading
**Solution:** Make sure your `.env` file exists and contains `DATABASE_URL`

### Issue: Prisma Client not found
**Solution:** Run `npm run db:generate` or `npx prisma generate`

## 🔄 Migration from Prisma v5/v6

If you're upgrading from older Prisma versions:

1. **Remove `url` from `schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"
     // ❌ Remove this: url = env("DATABASE_URL")
   }
   ```

2. **Create `prisma.config.ts`:**
   ```typescript
   import { defineConfig } from "@prisma/config";
   
   export default defineConfig({
     datasource: {
       url: process.env.DATABASE_URL!,
     },
   });
   ```

3. **Install `@prisma/config`:**
   ```bash
   npm install @prisma/config
   ```

4. **Update scripts in `package.json`** (already done)

## 📚 Resources

- [Prisma v7 Release Notes](https://www.prisma.io/docs/orm/more/releases#7.0.0)
- [Prisma Configuration Reference](https://www.prisma.io/docs/orm/prisma-config)
- [Prisma CLI Reference](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

---

**Last Updated:** December 2025  
**Prisma Version:** 7.0.1
