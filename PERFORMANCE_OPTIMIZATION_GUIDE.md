# Performance Optimization Guide

## 🚀 Current Performance Optimizations Implemented

### 1. React Query Caching
- **Stale Time**: 5 minutes (data considered fresh)
- **Garbage Collection Time**: 10 minutes (cache retention)
- **Retry Logic**: 3 attempts for queries, 1 for mutations
- **Smart Refetching**: Only on reconnect, not window focus

### 2. Next.js Optimizations
- **Image Optimization**: WebP/AVIF formats, responsive sizes
- **Bundle Optimization**: Package imports optimization
- **Compression**: Enabled for all responses
- **Security Headers**: Performance-focused headers
- **Turbo Mode**: Enabled for faster builds

### 3. Dual Database Architecture
- **PostgreSQL**: User data, authentication, server structure
- **MongoDB**: Real-time messaging, chat data
- **Optimized Queries**: Separate concerns for better performance

## 🔧 Additional Optimization Opportunities

### 4. Database Indexing (Critical)
```sql
-- PostgreSQL Indexes
CREATE INDEX idx_profile_userid ON profiles(user_id);
CREATE INDEX idx_member_profileid ON members(profile_id);
CREATE INDEX idx_channel_serverid ON channels(server_id);
CREATE INDEX idx_server_invitecode ON servers(invite_code);

-- MongoDB Indexes
db.messages.createIndex({ "channelId": 1, "createdAt": -1 });
db.messages.createIndex({ "memberId": 1 });
db.reactions.createIndex({ "messageId": 1 });
```

### 5. API Route Caching
```typescript
// Add to API routes for static data
export const revalidate = 300; // 5 minutes
export const dynamic = 'force-static';
```

### 6. Component-Level Optimizations
- **React.memo()** for expensive components
- **useMemo()** for expensive calculations
- **useCallback()** for function dependencies
- **Lazy loading** for heavy components

### 7. Socket.IO Optimizations
```typescript
// Optimize socket connections
const socket = io(url, {
  transports: ['websocket'], // Force WebSocket
  upgrade: false,
  rememberUpgrade: true,
  timeout: 20000,
  forceNew: false
});
```

### 8. Image Loading Strategy
```typescript
// Use priority loading for above-the-fold images
<Image 
  priority={true}
  loading="eager"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 9. Bundle Splitting
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### 10. Service Worker for Caching
```typescript
// Cache API responses
const cacheName = 'discord-clone-v1';
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

## 📊 Performance Monitoring

### 11. Add Performance Monitoring
```typescript
// Add to _app.tsx or layout
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    console.log(metric);
    // Send to analytics service
  }
}
```

### 12. Database Query Monitoring
```typescript
// Add query logging in development
if (process.env.NODE_ENV === 'development') {
  postgres.$on('query', (e) => {
    console.log('Query: ' + e.query);
    console.log('Duration: ' + e.duration + 'ms');
  });
}
```

## 🎯 Implementation Priority

### High Priority (Immediate Impact)
1. **Database Indexing** - Critical for query performance
2. **React Query Caching** - Already implemented ✅
3. **Image Optimization** - Already implemented ✅
4. **Bundle Optimization** - Already implemented ✅

### Medium Priority (Significant Impact)
5. **Component Memoization** - Reduce re-renders
6. **API Route Caching** - Reduce server load
7. **Socket.IO Optimization** - Better real-time performance

### Low Priority (Nice to Have)
8. **Service Worker** - Offline capabilities
9. **Performance Monitoring** - Track improvements
10. **Advanced Caching** - Edge caching strategies

## 🔍 Performance Testing

### Tools to Use
- **Lighthouse** - Core Web Vitals
- **WebPageTest** - Detailed performance analysis
- **React DevTools Profiler** - Component performance
- **Database Query Analyzer** - Query optimization

### Key Metrics to Monitor
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

## 🚀 Quick Wins

1. **Enable Gzip Compression** (Already done ✅)
2. **Optimize Images** (Already done ✅)
3. **Add Database Indexes** (Critical)
4. **Implement Component Memoization**
5. **Add API Response Caching**

## 📈 Expected Performance Improvements

- **Database Queries**: 50-80% faster with proper indexing
- **Image Loading**: 30-50% faster with WebP/AVIF
- **Bundle Size**: 20-30% smaller with optimizations
- **Caching**: 60-80% fewer API calls
- **Overall**: 40-60% improvement in Core Web Vitals
