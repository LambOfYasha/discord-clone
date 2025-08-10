# Scheduled Announcement System Implementation

## Overview
A comprehensive scheduled announcement system has been implemented for Discord clone servers, allowing moderators and admins to create reusable messages that are automatically sent to designated channels at scheduled intervals.

## Features Implemented

### 1. Database Schema
- **ScheduledAnnouncement Model**: Stores announcement data including title, message, schedule settings, and metadata
- **ScheduleType Enum**: Supports DAILY, WEEKLY, MONTHLY, and CUSTOM (one-time) schedules
- **Relations**: Connected to Server, Channel, and Profile models

### 2. Server Dropdown Menu Integration
- **Create Announcement**: Available to moderators and admins
- **View Announcements**: Available to all server members
- Located in the server header dropdown menu

### 3. Announcement Creation Page
- **Location**: `/servers/[serverId]/announcements/create`
- **Features**:
  - Title and message input with character limits
  - Channel selection (text channels only)
  - Schedule type selection (Daily, Weekly, Monthly, Custom)
  - Time picker for recurring schedules
  - Date picker for custom one-time schedules
  - Active/inactive toggle
  - Real-time schedule preview
  - Form validation

### 4. Announcement Management Page
- **Location**: `/servers/[serverId]/announcements`
- **Features**:
  - List all announcements for the server
  - Toggle announcement active/inactive status
  - Edit announcements (for creators and moderators)
  - Delete announcements (for creators and moderators)
  - View announcement details (schedule, next send time, last sent time)
  - Status badges and schedule type indicators

### 5. Announcement Editing
- **Location**: `/servers/[serverId]/announcements/[announcementId]/edit`
- **Features**:
  - Edit all announcement properties
  - View current status and history
  - Update schedule settings
  - Maintain creator permissions

### 6. API Endpoints
- **POST /api/announcements**: Create new announcement
- **GET /api/announcements**: List announcements for a server
- **PATCH /api/announcements/[id]**: Update announcement
- **DELETE /api/announcements/[id]**: Delete announcement
- **GET /api/announcements/recent**: Get recent announcements for activity feed

### 7. Background Scheduler
- **Automatic Execution**: Checks every minute for due announcements
- **Message Creation**: Automatically creates messages in target channels
- **Schedule Updates**: Updates next send times for recurring announcements
- **One-time Handling**: Deactivates custom announcements after sending

### 8. Activity Feed Integration
- **Friends Page**: Recent announcements appear in the activity sidebar
- **Server Context**: Shows announcements from followed servers and member servers
- **Rich Display**: Shows announcement title, server name, message preview, and send time

## Technical Implementation

### Database Schema
```sql
model ScheduledAnnouncement {
  id String @id @default(uuid())
  title String
  message String
  serverId String
  server Server @relation(fields: [serverId], references: [id], onDelete: Cascade)
  channelId String
  channel Channel @relation(fields: [channelId], references: [id], onDelete: Cascade)
  creatorProfileId String
  creatorProfile Profile @relation("ProfileCreatedAnnouncements", fields: [creatorProfileId], references: [id], onDelete: Cascade)
  scheduleType ScheduleType
  scheduleData Json
  isActive Boolean @default(true)
  lastSentAt DateTime?
  nextSendAt DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum ScheduleType {
  DAILY
  WEEKLY
  MONTHLY
  CUSTOM
}
```

### Key Components

#### 1. CreateAnnouncementForm
- Form validation and error handling
- Dynamic schedule preview
- Channel selection with server context
- Schedule type-specific UI elements

#### 2. AnnouncementsList
- Real-time status updates
- Permission-based actions
- Responsive design with cards
- Loading states and error handling

#### 3. EditAnnouncementForm
- Pre-populated form fields
- Current status display
- Schedule modification logic
- Permission validation

#### 4. AnnouncementScheduler
- Singleton pattern for background processing
- Database queries for due announcements
- Message creation with proper member context
- Schedule recalculation for recurring announcements

### Security & Permissions
- **Authentication**: All endpoints require valid user authentication
- **Authorization**: 
  - Create/Edit/Delete: Moderators and admins, or announcement creators
  - View: All server members
  - Toggle: Moderators and admins, or announcement creators
- **Validation**: Server membership verification on all operations

### Error Handling
- Form validation with user-friendly error messages
- API error responses with appropriate HTTP status codes
- Database constraint handling
- Scheduler error logging and recovery

## Usage Instructions

### Creating an Announcement
1. Navigate to a server where you have moderator permissions
2. Click the server name dropdown in the header
3. Select "Create Announcement"
4. Fill in the title and message
5. Select a target channel
6. Choose schedule type and timing
7. Toggle active status if needed
8. Review the schedule preview
9. Click "Create Announcement"

### Managing Announcements
1. Navigate to a server
2. Click the server name dropdown in the header
3. Select "View Announcements"
4. Use the toggle to activate/deactivate announcements
5. Click edit or delete buttons as needed
6. View announcement details and history

### Viewing Recent Activity
1. Navigate to the Friends page (`/friends`)
2. Look at the Activity sidebar on the right
3. Recent announcements will appear under "Recent Announcements"
4. Click on announcements to view more details

## Testing
- **Test Page**: `/test-announcement` provides a comprehensive view of all announcements
- **Database**: All tables and relationships have been created and tested
- **API**: All endpoints have been implemented and tested
- **UI**: All components have been created with proper styling and functionality

## Future Enhancements
- **Advanced Scheduling**: Cron expressions for more complex schedules
- **Announcement Templates**: Pre-defined templates for common announcements
- **Bulk Operations**: Create multiple announcements at once
- **Analytics**: Track announcement engagement and effectiveness
- **Notifications**: Notify users when announcements are sent
- **Rich Media**: Support for images, embeds, and attachments in announcements

## Files Created/Modified

### New Files
- `prisma/postgres/schema.prisma` (updated with new models)
- `app/api/announcements/route.ts`
- `app/api/announcements/[announcementId]/route.ts`
- `app/api/announcements/recent/route.ts`
- `app/(main)/(routes)/servers/[serverId]/announcements/page.tsx`
- `app/(main)/(routes)/servers/[serverId]/announcements/create/page.tsx`
- `app/(main)/(routes)/servers/[serverId]/announcements/[announcementId]/edit/page.tsx`
- `components/announcements/create-announcement-form.tsx`
- `components/announcements/announcements-list.tsx`
- `components/announcements/edit-announcement-form.tsx`
- `components/ui/switch.tsx`
- `lib/announcement-scheduler.ts`
- `app/test-announcement/page.tsx`

### Modified Files
- `components/server/server-header.tsx` (added announcement menu items)
- `components/friends/active-now-sidebar.tsx` (added announcement activity feed)

## Conclusion
The scheduled announcement system provides a comprehensive solution for automated server messaging with a user-friendly interface, robust backend processing, and seamless integration with the existing Discord clone architecture. The system supports various scheduling options, proper permission management, and real-time activity tracking.
