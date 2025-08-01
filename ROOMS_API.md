# Rooms API Documentation

The Rooms API provides a unified interface for managing both Direct Messages (DMs) and Group DMs. It's designed to be fully dynamic and functional, handling both types of rooms seamlessly.

## Overview

The Rooms API consists of several endpoints that work together to provide a complete room management system:

- `/api/rooms` - Main rooms endpoint for listing and creating rooms
- `/api/rooms/[roomId]` - Individual room management
- `/api/rooms/[roomId]/messages` - Message handling for rooms
- `/api/rooms/[roomId]/members` - Member management for group rooms

## Endpoints

### 1. GET /api/rooms

Fetches all rooms (DMs and group DMs) for the current user.

**Response:**
```json
[
  {
    "id": "room-id",
    "type": "dm",
    "name": "User Name",
    "imageUrl": "https://example.com/avatar.jpg",
    "members": [...],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  {
    "id": "group-room-id",
    "type": "group",
    "name": "Group Name",
    "imageUrl": "https://example.com/group-avatar.jpg",
    "members": [...],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### 2. POST /api/rooms

Creates a new room (DM or group DM).

**Request Body:**
```json
{
  "type": "dm",
  "memberIds": ["member-id"]
}
```

OR

```json
{
  "type": "group",
  "memberIds": ["member-id-1", "member-id-2"],
  "name": "Group Name (optional)"
}
```

**Response:**
```json
{
  "id": "room-id",
  "type": "dm",
  "name": "User Name",
  "imageUrl": "https://example.com/avatar.jpg",
  "members": [...],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 3. GET /api/rooms/[roomId]

Gets details for a specific room.

**Response:**
```json
{
  "id": "room-id",
  "type": "dm",
  "name": "User Name",
  "imageUrl": "https://example.com/avatar.jpg",
  "members": [...],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 4. PUT /api/rooms/[roomId]

Updates room details (only for group conversations).

**Request Body:**
```json
{
  "name": "New Group Name",
  "imageUrl": "https://example.com/new-avatar.jpg"
}
```

### 5. DELETE /api/rooms/[roomId]

Leaves or deletes a room.

- For DMs: Returns success (DMs are typically kept for history)
- For Groups: Removes the user from the group, deletes the group if it's the last member

### 6. GET /api/rooms/[roomId]/messages

Gets messages for a room with pagination support.

**Query Parameters:**
- `cursor` (optional): Pagination cursor
- `limit` (optional): Number of messages to fetch (default: 10)

**Response:**
```json
{
  "items": [
    {
      "id": "message-id",
      "content": "Hello!",
      "fileUrl": "https://example.com/file.jpg",
      "memberId": "member-id",
      "member": {...},
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "nextCursor": "next-cursor-id"
}
```

### 7. POST /api/rooms/[roomId]/messages

Sends a message to a room.

**Request Body:**
```json
{
  "content": "Hello!",
  "fileUrl": "https://example.com/file.jpg"
}
```

### 8. GET /api/rooms/[roomId]/members

Gets members of a room.

**Response:**
```json
[
  {
    "id": "member-id",
    "role": "ADMIN",
    "profileId": "profile-id",
    "profile": {...},
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### 9. POST /api/rooms/[roomId]/members

Adds members to a group conversation (admin only).

**Request Body:**
```json
{
  "memberIds": ["member-id-1", "member-id-2"]
}
```

### 10. DELETE /api/rooms/[roomId]/members?memberId=[memberId]

Removes a member from a group conversation (admin only).

## Room Types

### DM Rooms
- **Type**: `"dm"`
- **Members**: Exactly 2 members
- **Storage**: Messages stored in MongoDB
- **Features**: Direct messaging between two users

### Group Rooms
- **Type**: `"group"`
- **Members**: 2 or more members
- **Storage**: Messages stored in PostgreSQL
- **Features**: Group messaging with admin roles

## Database Integration

The Rooms API integrates with both databases:

- **PostgreSQL**: Stores room metadata, group messages, and member relationships
- **MongoDB**: Stores DM messages for better performance

## Helper Functions

The `lib/room.ts` file provides utility functions:

- `getRoomType(roomId)`: Determines if a room is DM or group
- `checkRoomAccess(roomId, profileId)`: Checks if user has access to room
- `getRoomDetails(roomId)`: Gets complete room details
- `createDMRoom(targetMemberId)`: Creates a DM room
- `createGroupRoom(memberIds, name)`: Creates a group room

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (missing parameters, invalid data)
- `401`: Unauthorized (user not authenticated)
- `403`: Forbidden (user doesn't have permission)
- `404`: Not Found (room or member not found)
- `500`: Internal Server Error

## Usage Examples

### Creating a DM
```javascript
const response = await fetch('/api/rooms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'dm',
    memberIds: ['target-member-id']
  })
});
```

### Creating a Group DM
```javascript
const response = await fetch('/api/rooms', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'group',
    memberIds: ['member-1', 'member-2', 'member-3'],
    name: 'My Group'
  })
});
```

### Sending a Message
```javascript
const response = await fetch(`/api/rooms/${roomId}/messages`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: 'Hello everyone!',
    fileUrl: 'https://example.com/file.jpg'
  })
});
```

### Getting Room Messages
```javascript
const response = await fetch(`/api/rooms/${roomId}/messages?limit=20`);
const data = await response.json();
// data.items contains messages
// data.nextCursor for pagination
```

## Security Features

- Authentication required for all endpoints
- Access control ensures users can only access their own rooms
- Admin-only operations for group management
- Input validation for all parameters
- Proper error handling and logging

## Integration with Existing APIs

The Rooms API is designed to work alongside existing APIs:
- Uses the same authentication system (`currentProfile()`)
- Integrates with existing database schemas
- Compatible with existing socket implementations
- Follows the same patterns as server and channel APIs 