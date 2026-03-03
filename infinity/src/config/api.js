/**
 * Centralized API Configuration
 * Automatically detects environment and switches API base URL
 * 
 * Development: http://localhost:5000
 * Production: http://api.infinity2k25.in (or your backend domain)
 */

// Detect environment based on hostname
const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Configure API base URL based on environment
// When not on localhost, choose protocol-aware URL to avoid mixed-content errors.
const prodDomain = 'api.infinity2k25.in';
const prodProtocol = window.location.protocol === 'https:' ? 'https' : 'http';
const prodUrl = `${prodProtocol}://${prodDomain}`;

export const API_BASE = isLocalHost
  ? 'http://localhost:5000'
  : prodUrl; // production backend URL, protocol follows current page

// Log configuration in development only
if (isLocalHost && process.env.NODE_ENV !== 'production') {
  console.log('🔗 API Configuration:', { environment: 'development', API_BASE });
}

export default API_BASE;
