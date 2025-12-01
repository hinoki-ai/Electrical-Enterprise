#!/bin/bash
# Complete Convex Setup Script for Electrical Enterprise
# This script handles the full Convex setup including authentication

set -e

echo "🚀 Complete Convex Setup for Electrical Enterprise"
echo ""

# Check if Convex CLI is installed
if ! command -v convex &> /dev/null; then
    echo "Installing Convex CLI..."
    npm install -g convex
fi

echo "✅ Convex CLI: $(convex --version)"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📋 Creating .env.local from template..."
    cp .env.local.template .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Update .env.local with your actual Convex URL and Clerk keys"
    echo ""
fi

echo "🔐 Starting Convex Authentication..."
echo "This will open your browser for authentication."
echo ""
echo "📋 Instructions:"
echo "1. Your browser will open to Convex authentication"
echo "2. Sign in with your Convex account (or create one)"
echo "3. Create a new project or select existing"
echo "4. Copy the deployment URL when prompted"
echo ""

# Run convex dev to set up the project
if npx convex dev --configure; then
    echo ""
    echo "✅ Convex project configured successfully!"
    echo ""

    # Get the deployment URL and update .env.local
    if [ -f ".convex/config.json" ]; then
        DEPLOYMENT_URL=$(grep -o '"deploymentUrl": "[^"]*"' .convex/config.json | cut -d'"' -f4 || echo "")
        if [ -n "$DEPLOYMENT_URL" ]; then
            echo "📝 Updating .env.local with deployment URL..."
            # Update the NEXT_PUBLIC_CONVEX_URL in .env.local
            sed -i "s|NEXT_PUBLIC_CONVEX_URL=.*|NEXT_PUBLIC_CONVEX_URL=$DEPLOYMENT_URL|" .env.local
            echo "✅ Updated .env.local with: $DEPLOYMENT_URL"
        fi
    fi

    echo ""
    echo "📦 Deploying Convex schema..."
    npx convex deploy --typecheck disable --codegen enable
    echo "✅ Schema deployed successfully!"

    echo ""
    echo "🎉 Convex setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Verify .env.local has the correct NEXT_PUBLIC_CONVEX_URL"
    echo "2. Run 'npm run dev' to start development"
    echo "3. Your Convex functions are ready: quotes, line-items, calculator_sessions"
    echo "   - Anonymous access (no authentication required)"
    echo ""
    echo "Available Convex functions:"
    echo "- Quotes: createQuote, getAllQuotes, getQuoteWithDetails, updateQuote, deleteQuote"
    echo "- Line Items: addLineItem, addLineItemOption, updateLineItem, deleteLineItem"
    echo "- Calculator: getUserPresets, createSession, updateSession, saveAsPreset"
    echo ""

else
    echo ""
    echo "❌ Convex setup failed or was cancelled."
    echo ""
    echo "Manual setup instructions:"
    echo "1. Run: npx convex dev"
    echo "2. Follow the authentication prompts"
    echo "3. Copy the deployment URL to .env.local"
    echo "4. Run: npx convex deploy"
    exit 1
fi
