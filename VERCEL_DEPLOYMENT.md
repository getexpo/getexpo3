# 🚀 Vercel Deployment Guide

## ✅ Issue Fixed

The Prisma Client generation error has been fixed by updating `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

## 📝 Deployment Steps

### 1. **Set Environment Variables in Vercel**

Go to your Vercel project → Settings → Environment Variables and add:

```env
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-jwt-key-change-this
```

⚠️ **Important:** Generate a strong JWT_SECRET for production:
```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. **Database Considerations**

#### Option A: SQLite (Current Setup)
- ✅ Good for development
- ❌ **Not recommended for production** (Vercel's filesystem is ephemeral)
- Data will be lost on each deployment

#### Option B: Migrate to PostgreSQL (Recommended for Production)

**Use Vercel Postgres:**

1. In Vercel Dashboard → Storage → Create Database → Postgres
2. Copy the `DATABASE_URL` connection string
3. Update your `.env` and Vercel environment variables
4. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

5. Generate migration:
```bash
npx prisma migrate dev --name init
```

6. Commit and redeploy

#### Option C: Use Turso (SQLite in the Cloud)

**Free SQLite alternative:**
- Sign up at https://turso.tech
- Create database
- Get connection URL
- Works like PostgreSQL but with SQLite syntax

### 3. **Vercel Build Configuration**

Create `vercel.json` (optional, for custom config):

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}
```

### 4. **Deploy**

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and let Vercel auto-deploy
git add .
git commit -m "Fix Prisma generation for Vercel"
git push
```

## 🔧 Troubleshooting

### Error: "Prisma Client did not initialize"

**Solution:** Already fixed! The `postinstall` script will run automatically.

### Error: "Database file not found"

**Solution:** SQLite doesn't work well on Vercel (ephemeral filesystem). Migrate to PostgreSQL or Turso.

### Error: "JWT_SECRET not defined"

**Solution:** Add `JWT_SECRET` to Vercel environment variables.

### Build succeeds but admin login fails

**Solution:** 
1. Check environment variables are set in Vercel
2. Run seed script after deployment (see below)

## 🌱 Seeding the Database on Vercel

If using PostgreSQL on Vercel:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Connect to your project:
```bash
vercel link
```

3. Pull environment variables:
```bash
vercel env pull .env.local
```

4. Run migrations:
```bash
npx prisma migrate deploy
```

5. Seed the database:
```bash
npx prisma db seed
```

Or create an API endpoint to seed:

```javascript
// app/api/seed/route.js
import { seedDatabase } from '@/prisma/seed'

export async function POST(request) {
  const { secret } = await request.json()
  
  // Use a secret to protect this endpoint
  if (secret !== process.env.SEED_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  await seedDatabase()
  return Response.json({ success: true })
}
```

## 📊 Recommended Production Setup

### For Small to Medium Sites:
```
✅ Vercel Hosting
✅ Vercel Postgres (or Supabase)
✅ Vercel Blob Storage (for images)
```

### Current Setup (Development):
```
✅ Vercel Hosting
⚠️ SQLite (will reset on each deploy)
⚠️ Local filesystem for images
```

## 🔄 Migration to Production Database

### Quick Migration Guide:

1. **Create Vercel Postgres Database**
   - Go to Vercel Dashboard → Storage → Create
   - Copy connection string

2. **Update Prisma Schema**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Update Environment Variables**
```env
# In Vercel
DATABASE_URL=postgres://...vercel-postgres-url...
JWT_SECRET=your-generated-secret
```

4. **Generate Migration**
```bash
npx prisma migrate dev --name init_postgres
```

5. **Deploy**
```bash
git add .
git commit -m "Migrate to PostgreSQL"
git push
```

6. **Seed Production Database**
```bash
# After deployment
vercel env pull .env.local
npx prisma db seed
```

## ✅ Current Fix Summary

**What was changed:**
- ✅ Added `prisma generate` to build script
- ✅ Added `postinstall` script for automatic generation
- ✅ This ensures Prisma Client is generated before building

**What you need to do:**
1. ✅ Commit the updated `package.json`
2. ✅ Push to GitHub (if using Git integration)
3. ✅ Vercel will automatically redeploy
4. ⚠️ Consider migrating to PostgreSQL for production

## 🎉 After Successful Deployment

Your admin panel will be available at:
```
https://your-app.vercel.app/admin
```

Default login:
- Username: `admin`
- Password: `admin123`

⚠️ **Remember to change the admin password after first login!**

## 📞 Need Help?

Common issues and solutions:
1. Build fails → Check Vercel build logs
2. Database issues → Migrate to PostgreSQL
3. Login fails → Check environment variables
4. Images not showing → Use Vercel Blob or external CDN

---

**Your app should now deploy successfully! 🚀**

