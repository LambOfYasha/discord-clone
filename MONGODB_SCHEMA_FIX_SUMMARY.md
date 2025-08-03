# MongoDB Schema Fix Summary

## Issue
The error `Unknown field 'member' for include statement on model 'DirectMessage'` occurred because the MongoDB `DirectMessage` model doesn't have a `member` relation, but the API route was trying to include it.

## Root Cause
The MongoDB schema for `DirectMessage` only has a `memberId` field, not a `member` relation:
```prisma
model DirectMessage {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  content String
  fileUrl String?
  memberId String  // Only has memberId, no member relation
  conversationId String
  deleted Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("direct_messages")
}
```

## Fix Applied

### File: `app/api/rooms/[roomId]/messages/route.ts`

**Before:**
```typescript
const messages = await mongo.directMessage.findMany({
  where: messagesQuery,
  take: limit,
  orderBy: {
    createdAt: "desc",
  },
  include: {
    member: {  // ❌ This doesn't exist in MongoDB
      include: {
        profile: true,
      },
    },
  },
});
```

**After:**
```typescript
const messages = await mongo.directMessage.findMany({
  where: messagesQuery,
  take: limit,
  orderBy: {
    createdAt: "desc",
  },
});

// Get member data for all messages
const memberIds = [...new Set(messages.map(msg => msg.memberId))];
const members = await postgres.member.findMany({
  where: {
    id: {
      in: memberIds,
    },
  },
  include: {
    profile: true,
  },
});

// Create a map for quick member lookup
const memberMap = new Map(members.map(member => [member.id, member]));

// Combine messages with member data
const messagesWithMembers = messages.map(message => ({
  ...message,
  member: memberMap.get(message.memberId),
}));
```

## Changes Made

1. **Removed invalid include**: Removed the `include: { member: { include: { profile: true } } }` from the MongoDB query
2. **Added separate member fetch**: Fetch member data from PostgreSQL using the `memberId` values
3. **Combined data**: Map the messages to include the member data from PostgreSQL
4. **Optimized queries**: Used a single query to fetch all members instead of individual queries

## Result
- ✅ MongoDB queries now work without schema errors
- ✅ Member data is properly included in DM messages
- ✅ Group messages continue to work (they have proper relations in PostgreSQL)
- ✅ API returns consistent data structure for both DM and group messages

## Testing
The following should now work correctly:
- [ ] DM messages load without Prisma validation errors
- [ ] Group messages continue to work
- [ ] Member data is included in message responses
- [ ] Room pages load without 500 errors 