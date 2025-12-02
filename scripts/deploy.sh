#!/bin/bash
# Complete deployment script - Build, Fix, Commit, Push, Sync, Deploy Convex & Vercel

echo "🚀 Starting complete deployment pipeline..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Check status
echo -e "${YELLOW}[1/8]${NC} Checking git status..."
git status --short 2>/dev/null | head -5 || true
echo ""

# Step 2: Lint (non-blocking)
echo -e "${YELLOW}[2/8]${NC} Running linter..."
npm run lint 2>&1 | tail -3 || echo -e "${YELLOW}⚠${NC}  Linter issues (non-blocking)"
echo ""

# Step 3: Build
echo -e "${YELLOW}[3/8]${NC} Building Next.js..."
if ! npm run build 2>&1 | tail -10; then
    echo -e "${RED}✗${NC} Build failed!"
    exit 1
fi
echo -e "${GREEN}✓${NC} Build successful"
echo ""

# Step 4: Stage
echo -e "${YELLOW}[4/8]${NC} Staging changes..."
git add -A
echo -e "${GREEN}✓${NC} Staged"
echo ""

# Step 5: Commit
echo -e "${YELLOW}[5/8]${NC} Committing..."
STAGED=$(git diff --cached --name-only)
if [ -n "$STAGED" ]; then
    COMMIT_MSG="${1:-Deploy: Update application}"
    if git commit -m "$COMMIT_MSG" 2>&1; then
        echo -e "${GREEN}✓${NC} Committed: $COMMIT_MSG"
    fi
else
    echo -e "${YELLOW}⚠${NC}  No changes to commit"
fi
echo ""

# Step 6: Push
echo -e "${YELLOW}[6/8]${NC} Pushing to GitHub..."
if git push origin main 2>&1; then
    echo -e "${GREEN}✓${NC} Pushed"
else
    echo -e "${RED}✗${NC} Push failed!"
    exit 1
fi
echo ""

# Step 7: Deploy Convex
echo -e "${YELLOW}[7/8]${NC} Deploying Convex..."
if npx convex deploy --yes 2>&1 | tail -5; then
    echo -e "${GREEN}✓${NC} Convex deployed"
else
    echo -e "${RED}✗${NC} Convex failed!"
    exit 1
fi
echo ""

# Step 8: Deploy Vercel
echo -e "${YELLOW}[8/8]${NC} Deploying to Vercel..."
if vercel --yes --prod 2>&1 | grep -E "(Production:|Inspect:|Queued|Building)"; then
    echo -e "${GREEN}✓${NC} Vercel deployed"
else
    echo -e "${RED}✗${NC} Vercel failed!"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
