# Dual Database Setup

This Discord clone uses a dual database architecture with PostgreSQL and MongoDB to optimize performance and scalability.

## Architecture Overview

### PostgreSQL (User/Signup Logic)
- **Purpose**: Handles user authentication, profiles, server management, and structural data
- **Models**: Profile, Server, Member, Channel, Conversation
- **Client**: `postgres` from `@/lib/db`

### MongoDB (Chat/Messaging Logic)
- **Purpose**: Handles real-time messaging and chat data
- **Models**: Message, DirectMessage
- **Client**: `mongo` from `@/lib/db`

## Database Clients

```typescript
import { postgres, mongo } from "@/lib/db";

// Use postgres for user-related operations
const profile = await postgres.profile.findUnique({
  where: { userId: "user123" }
});

// Use mongo for messaging operations
const messages = await mongo.message.findMany({
  where: { channelId: "channel123" }
});
```

## Schema Structure

### PostgreSQL Schema (`prisma/postgres/schema.prisma`)

```prisma
model Profile {
  id String @id @default(uuid())
  userId String @unique
  name String
  imageUrl String
  email String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  servers Server[]
  members Member[]
  channels Channel[]
  conversations Conversation[]

  @@map("profiles")
}

model Server {
  id String @id @default(uuid())
  name String
  imageUrl String
  inviteCode String @unique
  profileId String
  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  members Member[]
  channels Channel[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("servers")
}

model Member {
  id String @id @default(uuid())
  role MemberRole @default(GUEST)
  profileId String
  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  serverId String
  server Server @relation(fields: [serverId], references: [id], onDelete: Cascade)
  conversationsInitiated Conversation[] @relation("MemberOne")
  conversationsReceived Conversation[] @relation("MemberTwo")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([profileId, serverId])
  @@map("members")
}

model Channel {
  id String @id @default(uuid())
  name String
  type ChannelType @default(TEXT)
  profileId String
  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  serverId String
  server Server @relation(fields: [serverId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("channels")
}

model Conversation {
  id String @id @default(uuid())
  memberOneId String
  memberOne Member @relation("MemberOne", fields: [memberOneId], references: [id], onDelete: Cascade)
  memberTwoId String
  memberTwo Member @relation("MemberTwo", fields: [memberTwoId], references: [id], onDelete: Cascade)
  profileId String
  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([memberOneId, memberTwoId])
  @@map("conversations")
}
```

### MongoDB Schema (`prisma/mongo/schema.prisma`)

```prisma
model Message {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  content String
  fileUrl String?
  memberId String
  channelId String
  deleted Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("messages")
}

model DirectMessage {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  content String
  fileUrl String?
  memberId String
  conversationId String
  deleted Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("direct_messages")
}
```

## Usage Examples

### Creating a Server
```typescript
import { postgres } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

const profile = await currentProfile();
const server = await postgres.server.create({
  data: {
    name: "My Server",
    imageUrl: "https://example.com/image.png",
    profileId: profile.id,
    inviteCode: crypto.randomUUID(),
    channels: {
      create: [{ name: "general", profileId: profile.id }],
    },
    members: {
      create: [{ profileId: profile.id, role: "ADMIN" }],
    },
  },
});
```

### Sending a Channel Message
```typescript
import { postgres, mongo } from "@/lib/db";

// First verify access in PostgreSQL
const channel = await postgres.channel.findFirst({
  where: {
    id: channelId,
    server: {
      members: {
        some: { profileId: profile.id }
      }
    }
  }
});

if (!channel) throw new Error("Access denied");

// Then create message in MongoDB
const message = await mongo.message.create({
  data: {
    content: "Hello world!",
    channelId,
    memberId: member.id,
  },
});
```

### Getting Messages with Pagination
```typescript
import { mongo } from "@/lib/db";

const messages = await mongo.message.findMany({
  where: {
    channelId,
    deleted: false,
  },
  take: 10,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: {
    createdAt: "desc",
  },
});
```

## Environment Variables

Make sure to set up these environment variables:

```env
# PostgreSQL
POSTGRES_URL="postgresql://username:password@localhost:5432/discord_clone"

# MongoDB
MONGO_URL="mongodb://localhost:27017/discord_clone"
```

## Database Generation

To regenerate the Prisma clients after schema changes:

```bash
# Generate PostgreSQL client
npx prisma generate --schema=./prisma/postgres/schema.prisma

# Generate MongoDB client
npx prisma generate --schema=./prisma/mongo/schema.prisma
```

## Migration Strategy

### PostgreSQL Migrations
```bash
npx prisma migrate dev --schema=./prisma/postgres/schema.prisma
```

### MongoDB Schema Updates
Since MongoDB is schemaless, you can update the schema and regenerate the client without migrations.

## Best Practices

1. **Always use the correct client**: Use `postgres` for user data, `mongo` for messages
2. **Verify access in PostgreSQL first**: Before creating messages, verify user permissions
3. **Use transactions when needed**: For operations that span both databases
4. **Handle errors gracefully**: Both databases can fail independently
5. **Use proper indexing**: Ensure your queries are optimized

## Example API Route

```typescript
// app/api/messages/route.ts
import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { content, channelId } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify access in PostgreSQL
    const channel = await postgres.channel.findFirst({
      where: {
        id: channelId,
        server: {
          members: {
            some: { profileId: profile.id }
          }
        }
      }
    });

    if (!channel) {
      return new NextResponse("Access denied", { status: 403 });
    }

    // Create message in MongoDB
    const message = await mongo.message.create({
      data: {
        content,
        channelId,
        memberId: profile.id,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

This dual database setup provides the best of both worlds: PostgreSQL's ACID compliance for user data and MongoDB's flexibility for high-volume messaging data. 