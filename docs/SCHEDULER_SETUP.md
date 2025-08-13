# Automatic Scheduler Setup

The embed scheduler currently requires manual triggering. To set up automatic scheduling, you have several options:

## Option 1: External Cron Job (Recommended)

### 1. Create a Cron Job

On Linux/Mac, add to your crontab:
```bash
# Edit crontab
crontab -e

# Add this line to run every minute
* * * * * curl -X POST http://localhost:3000/api/cron/scheduler

# Or run every 5 minutes
*/5 * * * * curl -X POST http://localhost:3000/api/cron/scheduler
```

### 2. Using a Cron Service (Production)

For production, use services like:
- **Vercel Cron Jobs** (if hosting on Vercel)
- **GitHub Actions** (free, runs on schedule)
- **AWS EventBridge**
- **Google Cloud Scheduler**

### 3. GitHub Actions Example

Create `.github/workflows/scheduler.yml`:
```yaml
name: Embed Scheduler

on:
  schedule:
    # Run every minute
    - cron: '* * * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  scheduler:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Scheduler
        run: |
          curl -X POST ${{ secrets.APP_URL }}/api/cron/scheduler
```

## Option 2: Node.js Cron Package

### 1. Install node-cron
```bash
npm install node-cron
```

### 2. Create a scheduler service
Create `lib/scheduler-service.ts`:
```typescript
import cron from 'node-cron';
import { db, mongo } from '@/lib/db';

export function startScheduler() {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    console.log('Running scheduled embed check...');
    
    const now = new Date();
    const scheduledEmbeds = await db.embed.findMany({
      where: {
        isScheduled: true,
        isActive: true,
        nextSendAt: { lte: now },
        channelId: { not: null },
      },
      include: {
        fields: { orderBy: { order: 'asc' } },
        creatorProfile: true,
        channel: {
          include: {
            server: { include: { members: true } }
          }
        }
      }
    });

    // Process embeds...
    // (Same logic as in the API route)
  });
}
```

### 3. Start the scheduler
In your main server file, add:
```typescript
import { startScheduler } from '@/lib/scheduler-service';

// Start the scheduler when the app starts
startScheduler();
```

## Option 3: Vercel Cron Jobs (If using Vercel)

### 1. Create a cron API route
Create `app/api/cron/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { db, mongo } from '@/lib/db';

export async function GET() {
  // Your scheduler logic here
  return NextResponse.json({ success: true });
}
```

### 2. Add to vercel.json
```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "* * * * *"
    }
  ]
}
```

## Testing the Scheduler

### 1. Test the cron endpoint
```bash
# Test manually
curl -X POST http://localhost:3000/api/cron/scheduler

# Or use the test script
node scripts/test-cron.js
```

### 2. Check logs
Monitor your application logs to see scheduler activity:
```
[CRON_SCHEDULER] Found 2 scheduled embeds to process
[CRON_SCHEDULER] Posted scheduled embed abc123 to channel def456
```

## Security Considerations

### 1. Add Authentication (Production)
Uncomment and configure the secret key validation in `/api/cron/scheduler/route.ts`:
```typescript
const authHeader = req.headers.get('authorization');
if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
  return new NextResponse("Unauthorized", { status: 401 });
}
```

### 2. Environment Variables
Add to your `.env`:
```
CRON_SECRET_KEY=your-secret-key-here
```

## Monitoring

### 1. Health Check
Check if the scheduler is running:
```bash
curl http://localhost:3000/api/cron/scheduler
```

### 2. Database Monitoring
Query scheduled embeds:
```sql
SELECT * FROM "Embed" 
WHERE "isScheduled" = true 
AND "isActive" = true 
ORDER BY "nextSendAt" ASC;
```

## Troubleshooting

### Common Issues:
1. **Scheduler not running**: Check if cron job is active
2. **Embeds not posting**: Verify database connections
3. **Permission errors**: Check API authentication
4. **Time zone issues**: Ensure consistent timezone handling

### Debug Commands:
```bash
# Check cron jobs
crontab -l

# Test endpoint manually
curl -X POST http://localhost:3000/api/cron/scheduler

# Check application logs
tail -f logs/app.log
```

## Recommended Setup for Production

1. **Use Vercel Cron Jobs** if hosting on Vercel
2. **Use GitHub Actions** for free, reliable scheduling
3. **Add proper authentication** to the cron endpoint
4. **Monitor logs** for scheduler activity
5. **Set up alerts** for scheduler failures

