# Environment Variables Setup

To fix the LiveKit disconnection issue, you need to set up the following environment variables.

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/discord_clone"

# Clerk Authentication
CLERK_FRONTEND_API="pk_test_your_clerk_frontend_api_key"
CLERK_API_KEY="sk_test_your_clerk_api_key"
NEXT_PUBLIC_CLERK_FRONTEND_API="pk_test_your_clerk_frontend_api_key"

# LiveKit for Audio/Video Chat (REQUIRED for audio channels)
LIVEKIT_API_KEY="your_livekit_api_key"
LIVEKIT_API_SECRET="your_livekit_api_secret"
# Alternative: LIVEKIT_SECRET="your_livekit_secret"
NEXT_PUBLIC_LIVEKIT_URL="wss://your-livekit-server.livekit.cloud"

# UploadThing for file uploads (optional)
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

## LiveKit Setup

1. **Get LiveKit credentials**:
   - Sign up at [LiveKit Cloud](https://livekit.io/)
   - Create a new project
   - Copy your API Key and Secret from the project dashboard
   - Copy your WebSocket URL (usually `wss://your-project.livekit.cloud`)

2. **Add to your .env file**:
   ```bash
   LIVEKIT_API_KEY="your_api_key_from_livekit_dashboard"
   LIVEKIT_API_SECRET="your_api_secret_from_livekit_dashboard"
   NEXT_PUBLIC_LIVEKIT_URL="wss://your-project.livekit.cloud"
   ```

## Current Issue

The 500 errors you're seeing in the logs are because the LiveKit environment variables are not configured. Once you add these variables to your `.env` file and restart your development server, the audio channels should work properly.

## Testing

After setting up the environment variables:

1. Restart your development server: `npm run dev`
2. Try joining an audio channel again
3. The "disconnected" message should be replaced with proper audio functionality 