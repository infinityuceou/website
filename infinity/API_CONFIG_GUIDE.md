# API Configuration Guide

## Overview

The frontend now uses a **centralized, automatic API configuration** that switches between development and production environments without requiring environment variables.

---

## How It Works

### File: `src/config/api.js`

The API base URL is automatically detected based on the **hostname**:

```javascript
const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE = isLocalHost
  ? 'http://localhost:5000'
  : 'https://api.infinity2k26.com';
```

### Environment Detection

| Hostname | Environment | API_BASE |
|----------|-------------|----------|
| `localhost` | Development | `http://localhost:5000` |
| `127.0.0.1` | Development | `http://localhost:5000` |
| `infinity2k26.com` | Production | `https://api.infinity2k26.com` |
| `www.infinity2k26.com` | Production | `https://api.infinity2k26.com` |

---

## Implementation Details

### 1. Centralized API Config

**File:** `src/config/api.js`

- Automatically detects environment via `window.location.hostname`
- Exports `API_BASE` constant
- Logs configuration in development mode only
- No dependency on Vercel environment variables

### 2. Updated Files

All API calls now import from centralized config:

```javascript
import { API_BASE } from "../config/api";

// Usage
fetch(`${API_BASE}/api/register`, { ... })
```

**Updated Components:**
- ✅ `src/Pages/WIP.jsx` - Registration form
- ✅ `src/Pages/PaymentPage.jsx` - Payment processing

### 3. Environment Files

#### Development (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GA_ID=G-XVN0FP5JV4
```

#### Production (`.env.production`)
```env
VITE_API_BASE_URL=https://api.infinity2k26.com
VITE_GA_ID=G-XVN0FP5JV4
```

---

## Update Production Backend URL

### Option 1: Update Code (Recommended)

Edit `src/config/api.js`:

```javascript
export const API_BASE = isLocalHost
  ? 'http://localhost:5000'
  : 'https://your-actual-backend.com';  // ← Change this
```

### Option 2: Update Environment File

Edit `.env.production`:

```env
VITE_API_BASE_URL=https://your-actual-backend.com
```

---

## Testing

### Local Development

```bash
npm run dev
```

Verify in browser console:
```
🔗 API Configuration: { environment: 'development', API_BASE: 'http://localhost:5000' }
```

### Production Build

```bash
npm run build
```

The build will automatically use the production API URL based on the hostname when deployed.

---

## CORS Configuration (Backend)

Ensure your backend has proper CORS setup:

**Node.js/Express:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://infinity2k26.com', 'https://www.infinity2k26.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Benefits

✅ **No Vercel Environment Variables Needed** - Works purely from code  
✅ **Automatic Environment Detection** - Switches based on hostname  
✅ **Development-Friendly** - Console logs only in dev mode  
✅ **Production-Ready** - No sensitive data exposed  
✅ **Centralized Configuration** - Single source of truth for API URL  
✅ **No Build-Time Dependencies** - Works at runtime  

---

## Troubleshooting

### API calls failing in production?

1. ✅ Verify the production URL is correct in `src/config/api.js`
2. ✅ Confirm backend CORS allows your domain
3. ✅ Check backend is running and accessible
4. ✅ Verify network tab in DevTools - see actual request URL

### localhost calls in production?

- This shouldn't happen. The automatic detection checks `window.location.hostname`
- If it does, add debugging to `src/config/api.js`:

```javascript
console.log('Current hostname:', window.location.hostname);
```

---

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| Configuration | Hardcoded in components | Centralized in `api.js` |
| Environment Detection | Manual via env vars | Automatic via hostname |
| Vercel Variables | Required | Not needed |
| Production Setup | Complex | Simple - just update 1 URL |
| UI/Design Changes | - | None |

Happy coding! 🚀
