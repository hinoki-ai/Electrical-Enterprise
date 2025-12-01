#!/bin/bash
# Quick Convex Authentication Script
# Opens browser for Convex setup

echo "🔐 Convex Authentication Setup"
echo ""
echo "This will:"
echo "1. Open your browser for Convex authentication"
echo "2. Guide you through project creation"
echo "3. Set up your deployment URL"
echo ""

read -p "Press Enter to continue and open browser for Convex setup..."

# Start Convex setup (this will open browser)
npx convex dev --configure

echo ""
echo "✅ If setup completed, run: npm run convex:init"
echo "   to finish the configuration"
