# Deployment Guide

## Quick Deploy

**When you type "deploy", use this command:**

```bash
npm run deploy
```

## What It Does

The deployment script (`scripts/deploy.sh`) automatically:

1. ✅ Checks git status
2. ✅ Runs linter (non-blocking)
3. ✅ Builds Next.js project
4. ✅ Stages all changes
5. ✅ Commits changes (with optional custom message)
6. ✅ Pushes to GitHub
7. ✅ Deploys Convex backend
8. ✅ Deploys to Vercel production

## Usage

```bash
# Default commit message
npm run deploy

# Custom commit message
./scripts/deploy.sh "Your custom commit message"
```

## Manual Steps (if needed)

If you need to deploy manually:

```bash
# 1. Build
npm run build

# 2. Commit & Push
git add -A
git commit -m "Your message"
git push origin main

# 3. Deploy Convex
npx convex deploy --yes

# 4. Deploy Vercel
vercel --yes --prod
```

## Important Notes

- ⚠️ **Always commit before deploying** - The script handles this automatically
- The script fails fast on errors - if any step fails, deployment stops
- Build errors must be fixed before deployment

