# Convex Setup Guide

This project now uses Convex for storing and managing electrical quotes data.

## Setup Instructions

1. **Install Convex CLI globally** (if not already installed):
   ```bash
   npm install -g convex
   ```

2. **Initialize Convex in your project**:
   ```bash
   npx convex dev
   ```

3. **Follow the prompts** to:
   - Sign in to your Convex account (or create one)
   - Create a new project
   - Choose your deployment region

4. **Copy the deployment URL** that Convex provides (it will look like `https://your-project-name.convex.cloud`)

5. **Create a `.env.local` file** in the project root with:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
   ```

6. **Deploy your database schema**:
   ```bash
   npx convex deploy
   ```

## Features Added

- **Database Schema**: Complete schema for quotes, line items, payment summaries, and more
- **Quote Management**: UI to save, load, and create new quotes
- **Real-time Data**: All quote data is now stored in Convex for persistence
- **CRUD Operations**: Full create, read, update, delete functionality for quotes

## Current Status

✅ Convex dependency added
✅ Database schema created
✅ API functions implemented
✅ Quote manager UI added
⏳ Components need to be updated to use Convex data instead of hardcoded values

## Next Steps

To complete the integration:

1. Set up your Convex account and get the deployment URL
2. Update the individual components (ProjectInfo, PartidasTable, etc.) to fetch data from Convex
3. Add functionality to save all quote sections (line items, payment summaries, etc.)

## Testing

Once setup is complete, you can:
- Click "Save Current" to save the hardcoded quote data
- Click "New Quote" to create new quotes
- Click "Load Quote" to view saved quotes
