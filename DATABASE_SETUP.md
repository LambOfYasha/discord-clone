# Database Setup Guide

## Issue
The error `type "public.ChannelType" does not exist` indicates that the database schema hasn't been properly migrated. The Prisma schema defines enums and tables that don't exist in the database yet.

## Solution

### 1. Set up Environment Variables
First, make sure you have the required environment variables set up. Create a `.env.local` file in the root directory with:

```env
# Database
POSTGRES_URL="your_postgresql_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# UploadThing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

### 2. Generate Prisma Client
Run this command to generate the Prisma client with the correct schema:

```bash
npm run db:generate
```

### 3. Push Database Schema
Run this command to push the schema to your database:

```bash
npm run db:push
```

### 4. Alternative: Create Migration
If you prefer to use migrations instead of db push:

```bash
npm run db:migrate
```

### 5. Verify Setup
You can verify the database setup by running:

```bash
npm run db:studio
```

This will open Prisma Studio where you can see your database tables and data.

## Database Schema Overview

The schema includes:
- **Profile**: User profiles with Clerk integration
- **Server**: Discord-like servers
- **Member**: Server members with roles (ADMIN, MODERATOR, GUEST)
- **Channel**: Server channels with types (TEXT, AUDIO, VIDEO)
- **Conversation**: Direct message conversations

## Enums
- **MemberRole**: ADMIN, MODERATOR, GUEST
- **ChannelType**: TEXT, AUDIO, VIDEO

## After Setup
Once the database is properly set up, the Create Server functionality should work correctly. The error should be resolved and you should be able to:
1. Upload server images
2. Create servers
3. See the success popup

## Troubleshooting

If you still get errors after following these steps:

1. **Check your database connection**: Make sure your `POSTGRES_URL` is correct
2. **Verify environment variables**: Ensure all required env vars are set
3. **Check database permissions**: Make sure your database user has CREATE privileges
4. **Reset database**: If needed, you can drop and recreate the database

## Commands Summary

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create migration (alternative)
npm run db:migrate

# Open Prisma Studio
npm run db:studio
``` 