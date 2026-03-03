/**
 * Centralized API Configuration
 * Automatically detects environment and switches API base URL
 * 
 * Development: http://localhost:5000
 * Production: https://api.infinity2k26.com (or your backend domain)
 */

// Detect environment based on hostname
const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Configure API base URL based on environment
export const API_BASE = isLocalHost
  ? 'http://localhost:5000'
  : 'https://api.infinity2k26.com'; // Change to your production backend URL

// Log configuration in development only
if (isLocalHost && process.env.NODE_ENV !== 'production') {
  console.log('🔗 API Configuration:', { environment: 'development', API_BASE });
}

export default API_BASE;
