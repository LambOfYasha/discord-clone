# Dual Database Architecture - MongoDB + PostgreSQL

## Overview

This application uses a dual-database architecture where:
- **MongoDB** serves as the primary database for direct messages
- **PostgreSQL** serves as the backup database and stores all other data
- **Automatic fallback** ensures reliability when MongoDB is unavailable

## Architecture Design

### Database Responsibilities

#### MongoDB (Primary)
- **Direct Messages**: All DM conversations and messages
- **Document Storage**: Optimized for message content and metadata
- **Scalability**: Better performance for high-volume messaging

#### PostgreSQL (Backup + Core Data)
- **User Data**: Profiles, members, servers, channels
- **Conversations**: DM conversation metadata
- **Group Messages**: All group conversation messages
- **Backup**: Direct messages (fallback when MongoDB is down)
- **Relationships**: Complex user and server relationships

### Fallback Strategy

```typescript
// Example: Getting DM messages with fallback
const messages = await withMongoFallback(
  // MongoDB operation (primary)
  async () => {
    return await mongo.directMessage.findMany({
      where: { conversationId: roomId },
      take: limit,
      orderBy: { createdAt: "desc" }
    });
  },
  // PostgreSQL fallback
  async () => {
    return await postgres.directMessage.findMany({
      where: { conversationId: roomId },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { member: { include: { profile: true } } }
    });
  },
  "ROOM_MESSAGES_GET_DM"
);
```

## Key Features

### ✅ Automatic Fallback
- MongoDB operations fail → automatically use PostgreSQL
- No service interruption during MongoDB downtime
- Transparent to end users

### ✅ Data Redundancy
- Critical data stored in both databases
- Reduced risk of data loss
- Better disaster recovery

### ✅ Health Monitoring
- `/api/health` endpoint monitors both databases
- Real-time status reporting
- Proactive issue detection

### ✅ Performance Optimization
- MongoDB for high-volume messaging
- PostgreSQL for complex relationships
- Best of both worlds

## API Endpoints

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy|degraded|unhealthy",
  "databases": {
    "mongodb": true,
    "postgresql": true,
    "timestamp": "2025-01-05T04:19:24.000Z"
  },
  "message": "All databases operational"
}
```

### Room Messages
```
GET /api/rooms/[roomId]/messages
POST /api/rooms/[roomId]/messages
```

**Behavior:**
- DM messages: MongoDB primary, PostgreSQL fallback
- Group messages: PostgreSQL only
- Automatic error handling and logging

## Database Schema

### MongoDB Schema (`prisma/mongo/schema.prisma`)
```prisma
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

### PostgreSQL Schema (`prisma/postgres/schema.prisma`)
```prisma
model DirectMessage {
  id String @id @default(uuid())
  content String
  fileUrl String?
  deleted Boolean @default(false)
  memberId String
  member Member @relation(fields: [memberId], references: [id], onDelete: Cascade)
  conversationId String
  conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("direct_messages")
}
```

## Environment Variables

```env
# Primary Database (MongoDB)
MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&ssl=true&connectTimeoutMS=30000&socketTimeoutMS=30000"

# Backup Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/discord_clone"

# Other required variables...
```

## Utility Functions

### `withMongoFallback<T>()`
Handles MongoDB operations with automatic PostgreSQL fallback.

**Usage:**
```typescript
const result = await withMongoFallback(
  () => mongoOperation(),
  () => postgresFallback(),
  "operation_name"
);
```

### `syncToBothDatabases<T>()`
Performs operations on both databases for redundancy.

**Usage:**
```typescript
const result = await syncToBothDatabases(
  () => mongoOperation(),
  () => postgresOperation(),
  "sync_operation"
);
```

### `checkDatabaseHealth()`
Checks the health status of both databases.

**Usage:**
```typescript
const health = await checkDatabaseHealth();
// Returns: { mongodb: boolean, postgresql: boolean, timestamp: string }
```

## Error Handling

### MongoDB Connection Issues
1. **Automatic Detection**: Connection errors are caught
2. **Fallback Activation**: PostgreSQL operations are triggered
3. **Logging**: All fallback events are logged
4. **Recovery**: MongoDB operations resume when connection is restored

### PostgreSQL Connection Issues
1. **Primary Operations**: MongoDB continues to work
2. **User Data**: Critical user data remains accessible
3. **Limited Functionality**: Some features may be affected
4. **Recovery**: Full functionality restored when PostgreSQL is back

## Monitoring and Logging

### Console Logs
```
[ROOM_MESSAGES_GET_DM] MongoDB failed, falling back to PostgreSQL: Error details
[ROOM_MESSAGES_GET_DM] Successfully used PostgreSQL fallback
```

### Health Monitoring
- Real-time database status
- Performance metrics
- Error tracking
- Uptime monitoring

## Best Practices

### 1. Database Selection
- **Use MongoDB** for: High-volume messaging, document storage
- **Use PostgreSQL** for: User data, relationships, transactions
- **Use Both** for: Critical data redundancy

### 2. Error Handling
- Always implement fallback logic
- Log all database operations
- Monitor health endpoints
- Set up alerts for database issues

### 3. Performance
- Optimize queries for each database
- Use appropriate indexes
- Monitor query performance
- Cache frequently accessed data

### 4. Data Consistency
- Keep schemas in sync
- Implement data validation
- Regular backup procedures
- Test fallback scenarios

## Migration and Deployment

### Development Setup
```bash
# Generate both Prisma clients
npx prisma generate --schema=./prisma/mongo/schema.prisma
npx prisma generate --schema=./prisma/postgres/schema.prisma

# Run PostgreSQL migrations
npx prisma migrate dev --schema=./prisma/postgres/schema.prisma
```

### Production Deployment
1. **Environment Variables**: Set up both database URLs
2. **Health Checks**: Monitor database status
3. **Backup Strategy**: Implement regular backups
4. **Monitoring**: Set up alerts and logging

## Troubleshooting

### Common Issues

#### MongoDB Connection Failed
- Check `MONGO_URL` format
- Verify network connectivity
- Check MongoDB Atlas status
- Review connection parameters

#### PostgreSQL Connection Failed
- Check `DATABASE_URL` format
- Verify database server status
- Check firewall settings
- Review connection limits

#### Data Inconsistency
- Compare schemas between databases
- Check for migration issues
- Verify data types match
- Review fallback logic

### Debug Commands
```bash
# Check database health
curl http://localhost:3000/api/health

# Test MongoDB connection
npx prisma db pull --schema=./prisma/mongo/schema.prisma

# Test PostgreSQL connection
npx prisma db pull --schema=./prisma/postgres/schema.prisma
```

## Future Enhancements

### Planned Features
1. **Data Synchronization**: Automatic sync between databases
2. **Load Balancing**: Distribute queries across databases
3. **Caching Layer**: Redis for frequently accessed data
4. **Analytics**: Database performance monitoring
5. **Auto-scaling**: Dynamic database resource allocation

### Architecture Evolution
- **Phase 1**: Current dual-database setup ✅
- **Phase 2**: Enhanced monitoring and alerting
- **Phase 3**: Advanced caching and optimization
- **Phase 4**: Multi-region deployment

## Conclusion

This dual-database architecture provides:
- **High Availability**: Automatic fallback ensures uptime
- **Data Redundancy**: Critical data stored in multiple places
- **Performance**: Optimized for different data types
- **Scalability**: Can handle growth in both directions
- **Reliability**: Robust error handling and monitoring

The system is designed to be resilient, performant, and maintainable while providing a seamless experience for users. 