/**
 * Service Worker Registration Template
 */

const createTemplate = require('../utils/createTemplate');

const serviceWorkerTemplate = createTemplate({
  // Required keys
  name: 'Service Worker Registration',
  path: "service-worker-registration",
  description: "Register a service worker for offline functionality and performance improvements.",
  help_link: {
    text: "Learn more about service workers and their capabilities",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
    label: "MDN Documentation"
  },
  template_id: "1034",
  template_version: "1.0.0",
  category: 'monitoring',
  fields: [],
  script: `(function() {
  'use strict';

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.log('[SW Register] Service Workers are not supported in this browser.');
    return;
  }

  // Service worker file path (adjust if uploaded to different location)
  const SW_PATH = '/files/service-worker.js';
  // Alternative paths to try (in order of preference)
  const SW_PATHS = [
    '/files/service-worker.js',  // Primary path - where file is uploaded
    '/service-worker.js',         // Fallback 1
    './service-worker.js'        // Fallback 2
  ];

  // Register service worker
  function registerServiceWorker() {
    let swPath = SW_PATH;
    
    // Try to find service worker at different paths
    const tryRegister = (pathIndex = 0) => {
      if (pathIndex >= SW_PATHS.length) {
        console.error('[SW Register] Service worker not found at any expected path');
        return;
      }

      const currentPath = SW_PATHS[pathIndex];
      console.log(\`[SW Register] Attempting to register from path \${pathIndex + 1}/\${SW_PATHS.length}:\`, currentPath);
      
      // First, verify the file is accessible
      return fetch(currentPath, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            throw new Error(\`File returned \${response.status} status\`);
          }
          const contentType = response.headers.get('content-type');
          console.log('[SW Register] ✅ File is accessible');
          console.log('[SW Register] Content-Type:', contentType);
          
          // Verify Content-Type is correct
          if (contentType && !contentType.includes('javascript') && !contentType.includes('application/x-javascript')) {
            console.warn('[SW Register] ⚠️ Content-Type might be incorrect:', contentType);
          }
          
          // Now register the service worker
          console.log('[SW Register] 📝 Registering service worker...');
          
          // Note: If file is in /files/, backend must set "Service-Worker-Allowed: /" header
          // Otherwise browser will only allow scope of /files/
          if (currentPath.startsWith('/files/')) {
            console.log('[SW Register] ⚠️ File is in /files/ directory');
            console.log('[SW Register] ⚠️ Backend must set "Service-Worker-Allowed: /" HTTP header');
            console.log('[SW Register] ⚠️ Otherwise service worker can only control /files/ pages');
          }
          
          return navigator.serviceWorker.register(currentPath, {
            scope: '/' // Service worker scope (requires Service-Worker-Allowed header if file is in /files/)
          });
        })
        .then((registration) => {
          console.log('[SW Register] Service Worker registered successfully:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                console.log('[SW Register] New service worker available');
                
                // Optional: Show update notification to user
                if (confirm('A new version is available. Reload to update?')) {
                  newWorker.postMessage({ action: 'skipWaiting' });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          const currentPath = SW_PATHS[pathIndex];
          console.error(\`[SW Register] ❌ Failed for path: \${currentPath}\`);
          console.error('[SW Register] Error:', error.message || error);
          
          // Try next path
          if (pathIndex < SW_PATHS.length - 1) {
            console.log(\`[SW Register] Trying next path (\${pathIndex + 2}/\${SW_PATHS.length})...\`);
            tryRegister(pathIndex + 1);
          } else {
            console.error('[SW Register] ❌ All paths failed!');
            console.error('[SW Register] Tried paths:', SW_PATHS);
            console.error('[SW Register] Common issues:');
            console.error('  1. File Content-Type must be "application/javascript" or "text/javascript"');
            console.error('  2. File must be served over HTTPS (or localhost)');
            console.error('  3. Check browser console for CORS errors');
            console.error('  4. Verify file exists at: /files/service-worker.js');
          }
        });
    };

    tryRegister();
  }

  // Wait for page to be ready before registering
  // This works whether script is in <head> or before </body>
  if (document.readyState === 'loading') {
    // DOM is still loading, wait for it
    document.addEventListener('DOMContentLoaded', registerServiceWorker);
  } else {
    // DOM is already loaded, register immediately
    registerServiceWorker();
  }

  // Listen for service worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('[SW Register] Message from service worker:', event.data);
    
    if (event.data && event.data.action === 'reload') {
      window.location.reload();
    }
  });

  // Handle service worker controller changes
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      console.log('[SW Register] New service worker activated, reloading...');
      window.location.reload();
    }
  });
})();`,
  
  // Optional keys
  note: "**Important:** Ensure your service worker file is served with the correct Content-Type header (application/javascript or text/javascript) and over HTTPS (or localhost for development). If your service worker is in a subdirectory like /files/, your server must set the 'Service-Worker-Allowed' header to allow broader scopes."
});

module.exports = serviceWorkerTemplate;

