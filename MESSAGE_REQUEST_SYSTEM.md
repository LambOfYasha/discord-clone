# Dynamic Message Request System

## Overview

The message request system allows users to send message requests to other users who are not their friends. This creates a controlled way for users to initiate conversations without requiring mutual friendship first.

## Features

### ✅ **Core Functionality**
- Send message requests to any user
- View pending message requests
- Accept or reject message requests
- Automatic conversation creation when accepted
- Real-time updates in the UI

### ✅ **Database Schema**
- `MessageRequest` model in PostgreSQL
- `MessageRequestStatus` enum (PENDING, ACCEPTED, REJECTED)
- Proper relationships with Profile model

### ✅ **API Endpoints**
- `GET /api/message-requests` - Get pending and sent requests
- `POST /api/message-requests` - Send a new message request
- `PATCH /api/message-requests/[targetProfileId]` - Accept/reject requests
- `DELETE /api/message-requests/[targetProfileId]` - Cancel sent requests

### ✅ **UI Components**
- Message requests list with accept/reject buttons
- Send message request modal
- Reusable send message request button
- Test page for demonstration

## How It Works

### 1. **Sending Message Requests**
```typescript
// User clicks "Send Message" button
const handleSendRequest = async (targetProfileId: string, message: string) => {
  await axios.post("/api/message-requests", {
    targetProfileId,
    message: "Hello! I'd like to chat with you."
  });
};
```

### 2. **Receiving Message Requests**
- Requests appear in the `/message-requests` page
- Users can see the requester's profile and message
- Accept/Reject buttons for each request

### 3. **Accepting Requests**
When a user accepts a message request:
1. Request status changes to "ACCEPTED"
2. A direct message conversation is automatically created
3. Both users can now send messages to each other

### 4. **Rejecting Requests**
- Request status changes to "REJECTED"
- No conversation is created
- Requester is notified (can be extended with notifications)

## Database Models

### MessageRequest Model
```prisma
model MessageRequest {
  id String @id @default(uuid())
  requesterProfileId String
  requesterProfile Profile @relation("MessageRequestRequester")
  targetProfileId String
  targetProfile Profile @relation("MessageRequestTarget")
  message String
  status MessageRequestStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("message_requests")
}

enum MessageRequestStatus {
  PENDING
  ACCEPTED
  REJECTED
}
```

## API Endpoints

### GET /api/message-requests
Returns pending and sent message requests for the current user.

**Response:**
```json
{
  "pending": [
    {
      "id": "uuid",
      "requesterProfile": {
        "id": "uuid",
        "name": "John Doe",
        "imageUrl": "https://..."
      },
      "message": "Hello! I'd like to chat.",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "sent": [...]
}
```

### POST /api/message-requests
Send a new message request.

**Request Body:**
```json
{
  "targetProfileId": "uuid",
  "message": "Hello! I'd like to chat with you."
}
```

### PATCH /api/message-requests/[targetProfileId]
Accept or reject a message request.

**Request Body:**
```json
{
  "action": "accept" // or "reject"
}
```

## UI Components

### MessageRequestsList
- Shows pending message requests
- Accept/Reject buttons for each request
- Displays requester profile and message content
- Real-time updates when requests are handled

### SendMessageRequestModal
- Modal for composing message requests
- Character limit (500 characters)
- Target user information display
- Form validation

### SendMessageRequestButton
- Reusable button component
- Opens the send message request modal
- Can be used anywhere in the app

## Usage Examples

### 1. Send a Message Request
```typescript
import { SendMessageRequestButton } from "@/components/ui/send-message-request-button";

<SendMessageRequestButton
  targetProfile={{
    id: "user123",
    name: "John Doe",
    imageUrl: "https://..."
  }}
/>
```

### 2. View Message Requests
Navigate to `/message-requests` to see:
- Pending message requests
- Accept/Reject options
- Requester information and messages

### 3. Test the System
Visit `/test-message-requests` to:
- See all available users
- Send message requests to any user
- Test the complete flow

## Integration Points

### With Friends System
- Message requests are separate from friend requests
- Users can send message requests without being friends
- When accepted, a conversation is created for direct messaging

### With Direct Messaging
- Accepted message requests create conversations
- Users can then send direct messages normally
- Conversations appear in the friends/DM sidebar

### With Notifications (Future)
- Can be extended to send notifications when requests are received
- Notifications when requests are accepted/rejected
- Real-time updates via WebSocket

## Security & Validation

### Input Validation
- Message content required and trimmed
- Target profile must exist
- Cannot send requests to yourself
- Prevents duplicate pending requests

### Authorization
- Users can only see their own requests
- Users can only accept/reject requests sent to them
- Users can only cancel their own sent requests

## Future Enhancements

### 🔮 **Planned Features**
- Real-time notifications for new requests
- Request expiration (auto-reject after X days)
- Bulk accept/reject options
- Request templates/presets
- Analytics on request success rates

### 🔮 **Advanced Features**
- Message request categories (business, personal, etc.)
- Custom acceptance messages
- Request history and analytics
- Integration with server discovery

## Testing

### Manual Testing
1. Visit `/test-message-requests`
2. Send message requests to different users
3. Check `/message-requests` for pending requests
4. Accept/reject requests and verify conversation creation

### API Testing
```bash
# Send a message request
curl -X POST /api/message-requests \
  -H "Content-Type: application/json" \
  -d '{"targetProfileId": "uuid", "message": "Hello!"}'

# Get pending requests
curl -X GET /api/message-requests

# Accept a request
curl -X PATCH /api/message-requests/uuid \
  -H "Content-Type: application/json" \
  -d '{"action": "accept"}'
```

## Migration

The system includes a database migration that adds:
- `MessageRequest` table
- `MessageRequestStatus` enum
- Proper foreign key relationships
- Indexes for performance

Run migrations with:
```bash
npx prisma migrate dev --name add_message_requests
```

## Conclusion

The dynamic message request system provides a controlled way for users to initiate conversations while maintaining privacy and user control. It integrates seamlessly with the existing friends and direct messaging systems while providing a smooth user experience. 