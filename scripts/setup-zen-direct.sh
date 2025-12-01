#!/bin/bash
# Direct Zen API Key setup (when you can't access Zen website)

echo "🔐 Zen API Key Setup"
echo ""
echo "If you have your Zen Terminal API Key, enter it below."
echo "If not, you can:"
echo "  1. Try accessing Zen from a different network/VPN"
echo "  2. Contact Zen support to get your API key"
echo "  3. Check if you have it saved in password manager"
echo ""

read -p "Enter your Zen Terminal API Key (or press Enter to skip): " ZEN_KEY

if [ -z "$ZEN_KEY" ]; then
    echo "Skipping setup. You can set it later with:"
    echo "  export ZEN_TERMINAL_API_KEY=your_key"
    echo "  export CONVEX_AUTH_TOKEN=\$ZEN_TERMINAL_API_KEY"
    exit 0
fi

# Create/update .env.local
if [ ! -f ".env.local" ]; then
    touch .env.local
fi

# Remove old entries
sed -i '/ZEN_TERMINAL_API_KEY/d' .env.local 2>/dev/null
sed -i '/CONVEX_AUTH_TOKEN/d' .env.local 2>/dev/null

# Add new entries
echo "ZEN_TERMINAL_API_KEY=$ZEN_KEY" >> .env.local
echo "CONVEX_AUTH_TOKEN=$ZEN_KEY" >> .env.local

echo ""
echo "✅ Zen API Key saved to .env.local"
echo ""
echo "To use it now, run:"
echo "  source .env.local"
echo "  npm run convex:init"

