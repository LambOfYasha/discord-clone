# Explore Servers Feature

## Overview

The Explore Servers feature allows users to discover and join servers by category. Users can browse servers across different categories, search for specific servers, and join them directly from the explore page.

## Features

### Categories
- **Popular** 🔥 - Trending servers with high activity
- **Christianity** ✝️ - Faith-based communities and discussions
- **Business** 💼 - Professional networking and business discussions
- **Social** 👥 - Casual social communities and hangouts
- **Science & Education** 🔬 - Learning communities and scientific discussions

### Functionality
- **Category Filtering**: Filter servers by specific categories
- **Search**: Search servers by name or creator
- **Server Cards**: Display server information including:
  - Server name and image
  - Creator name
  - Category badge
  - Member count
  - Invite code preview
  - Join button

### Navigation
- New navigation item with compass icon
- Accessible via `/explore` route
- Purple color scheme to distinguish from other navigation items

## Technical Implementation

### Database Schema
Added `category` field to the `Server` model:
```prisma
model Server {
  id String @id @default(uuid())
  name String
  imageUrl String
  inviteCode String @unique
  category ServerCategory @default(POPULAR)  // New field
  profileId String
  // ... other fields
}

enum ServerCategory {
  POPULAR
  CHRISTIANITY
  BUSINESS
  SOCIAL
  SCIENCE_AND_EDUCATION
}
```

### API Endpoints
- `GET /api/servers/explore` - Get servers with optional category and search filtering
- `POST /api/servers` - Updated to include category field
- `POST /api/invite/[inviteCode]` - Join server functionality

### Components
- `ExplorePageClient` - Main explore page component with filtering and search
- `NavigationExplore` - Navigation item for the explore page
- Updated `CreateServerModal` - Now includes category selection

### Pages
- `/explore` - Main explore page route

## Usage

### For Users
1. Click the compass icon in the navigation sidebar
2. Browse servers by category using the filter buttons
3. Use the search bar to find specific servers
4. Click "Join Server" to join any server

### For Server Creators
1. When creating a server, select a category from the dropdown
2. The server will appear in the explore page under the selected category
3. Users can discover and join the server through the explore page

## Sample Data
The feature includes sample servers across all categories for testing:
- Christian Fellowship (Christianity)
- Tech Entrepreneurs (Business)
- Gaming Community (Social)
- Science & Research (Science & Education)
- Popular Gaming Hub (Popular)
- And more...

## Future Enhancements
- Server recommendations based on user preferences
- Trending servers algorithm
- Server ratings and reviews
- Advanced filtering options
- Server preview functionality
