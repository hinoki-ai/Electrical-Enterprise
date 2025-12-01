#!/bin/bash
# Convex Setup Script
# This script will initialize Convex for the project

set -e

echo "🚀 Setting up Convex for Electrical Enterprise..."
echo ""

# Check if Convex CLI is installed
if ! command -v convex &> /dev/null; then
    echo "❌ Convex CLI not found. Installing..."
    npm install -g convex
fi

echo "✅ Convex CLI found: $(convex --version)"
echo ""

# Check if already initialized
if [ -f "convex.json" ] || [ -d ".convex" ]; then
    echo "⚠️  Convex appears to be already initialized."
    read -p "Do you want to reinitialize? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping initialization."
        exit 0
    fi
fi

echo "📋 Initializing Convex..."
echo "This will open your browser for authentication."
echo ""

# Initialize Convex
npx convex dev --configure || {
    echo ""
    echo "⚠️  Interactive setup required."
    echo "Please run: npx convex dev"
    echo "Then follow the prompts to:"
    echo "  1. Log in to your Convex account"
    echo "  2. Create or select a project"
    echo "  3. Copy the deployment URL"
    echo ""
    echo "After setup, create .env.local with:"
    echo "  NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud"
    exit 1
}

# Wait for convex.json to be created
if [ -f "convex.json" ]; then
    echo "✅ Convex initialized successfully!"
    echo ""
    
    # Try to get the deployment URL
    if [ -f ".env.local" ]; then
        echo "✅ .env.local already exists"
    else
        echo "📝 Please create .env.local with your Convex deployment URL:"
        echo "   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud"
    fi
    
    echo ""
    echo "🎉 Setup complete! Run 'npm run dev' to start developing."
else
    echo "⚠️  Convex initialization may need manual completion."
fi

