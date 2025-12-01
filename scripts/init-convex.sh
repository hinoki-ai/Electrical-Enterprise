#!/bin/bash
# Convex Initialization Script
# Run this once to set up Convex

set -e

echo "🚀 Initializing Convex for Electrical Enterprise"
echo ""

# Check Convex CLI
if ! command -v convex &> /dev/null; then
    echo "Installing Convex CLI..."
    npm install -g convex
fi

echo "✅ Convex CLI: $(convex --version)"
echo ""

# Check for Convex auth token
if [ -z "$CONVEX_AUTH_TOKEN" ]; then
    echo "⚠️  No Convex auth token found in environment"
    echo "Please set CONVEX_AUTH_TOKEN:"
    echo "  export CONVEX_AUTH_TOKEN=your_token"
    exit 1
fi

echo "📋 Starting Convex configuration..."
echo ""

# Initialize Convex
npx convex dev --once --configure || {
    echo ""
    echo "⚠️  Configuration failed. Check your CONVEX_AUTH_TOKEN."
    exit 1
}

# Get deployment URL from .env.local or .convex/config.json
if [ -f ".env.local" ] && grep -q "NEXT_PUBLIC_CONVEX_URL" .env.local; then
    echo "✅ Found NEXT_PUBLIC_CONVEX_URL in .env.local"
    DEPLOYMENT_URL=$(grep "NEXT_PUBLIC_CONVEX_URL" .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'")
elif [ -f ".convex/config.json" ]; then
    DEPLOYMENT_URL=$(grep -o '"deploymentUrl": "[^"]*"' .convex/config.json | cut -d'"' -f4 || echo "")
    if [ -n "$DEPLOYMENT_URL" ]; then
        echo "📝 Creating .env.local with deployment URL..."
        echo "NEXT_PUBLIC_CONVEX_URL=$DEPLOYMENT_URL" > .env.local
        echo "✅ Created .env.local"
    fi
fi

# Deploy schema
echo ""
echo "📦 Deploying Convex schema..."
npx convex deploy --typecheck disable --codegen enable || {
    echo "⚠️  Schema deployment may need manual completion"
}

echo ""
echo "✅ Convex setup complete!"
echo ""
echo "Your deployment URL: ${DEPLOYMENT_URL:-'Check .env.local'}"
echo ""
echo "Next steps:"
echo "  1. Verify .env.local has NEXT_PUBLIC_CONVEX_URL"
echo "  2. Run 'npm run dev' to start development"
echo "  3. Your Convex functions are ready to use!"

