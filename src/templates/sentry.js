/**
 * Sentry Template
 */

const sentryTemplate = {
  name: 'Sentry',
  path: "sentry-tag",
  description: "Monitor errors and performance with Sentry.",
  image: "https://sentry-brand.storage.googleapis.com/sentry-logo-black.png",
  note:"The DSN for your Sentry account is available on the Sentry Dashboard in Settings > Project > Client Keys (*this instructions needs to be changed according to Sentry documentation)",
  help_link: {
    text: "Learn the steps to connect with Sentry by reading the article on",
    url: "https://docs.sentry.io/product/sentry-basics/",
    label: "Help Center"
  },
  template_id: "1002",
  template_version: "1.0.0",
  category: 'monitoring',
  type: 'js',
  sub_type: 'inline',
  position: 'head',
  pages: [],
  attributes: { async: "true" },
  compatible_engines: ['react', 'vue2'],
  field_mappings: {
    dsn: 'sentry_dsn',
    excludedUrls: 'excluded_urls',
    excludedUrlsJson: 'excluded_urls_json'
  },
  // Transform excludedUrls array to JSON string for safe injection
  transformData: function(data) {
    if (data.excludedUrls && Array.isArray(data.excludedUrls)) {
      data.excludedUrlsJson = JSON.stringify(data.excludedUrls);
    } else {
      data.excludedUrlsJson = JSON.stringify([
        'chrome-extension://*',
        'moz-extension://*'
      ]);
    }
    return data;
  },
  layout: {
    columns: 2,
    gap: '24px'
  },
  fields: [
    {
      name: 'dsn',
      type: 'text',
      label: 'Sentry DSN',
      placeholder: 'https://abc123@o123456.ingest.sentry.io/1234567',
      required: true,
      size: 'full',
      description: 'Find in Settings → Projects → Client Keys (DSN). Format: https://<key>@<host>/<project_id>',
      validation: {
        pattern: "/^https:\\/\\/[a-f0-9]+@[a-z0-9.-]+\\.sentry\\.io\\/[0-9]+$/i",
        message: 'Must be a valid Sentry DSN',
      },
    },
    {
      name: 'excludedUrls',
      type: 'array',
      label: 'URLs to Exclude',
      description: 'Add URL patterns to exclude from Sentry error tracking. Supports wildcards (*) for flexible matching. Examples: "https://cdn.example.com/*", "*/analytics.js", "chrome-extension://*". Errors originating from these URLs will not be reported to Sentry.',
      help_link: {
        url: "https://docs.sentry.io/platforms/javascript/configuration/filtering/",
        text: "Learn more about URL filtering"
      },
      default: [
        "chrome-extension://*",
        "moz-extension://*",
        "https://store-cdn1.fynd.com/*"
      ],
      size: 'full',
      useTooltip: false,  // Show description as text for array fields
      input_config: {
        type: 'text',
        placeholder: 'e.g., https://cdn.example.com/* or */analytics.js',
        button_text: 'Add URL Pattern',
        input_size: 'large',  // Size for the input within array field
        button_size: 'small', // Size for the button within array field
        validation: {
          pattern: "/^(\\*|https?:\\/\\/)?[a-z\\d\\-.*:\\/_@]+$/i",
          message: 'Enter a valid URL pattern (wildcards * are supported)'
        },
        events: {
          // Custom click handler - can be used for additional validation or logging
          click: function(value, field, formData, component) {
            console.log('Adding excluded URL:', value);
            // The actual chip addition is handled by the default addArrayItem method
            // You can add custom validation or processing here if needed
          },
          // Custom remove handler - optional notification when removing
          remove: function(value, index, field, formData, component) {
            console.log('Removed excluded URL:', value);
            // The actual removal is handled by the default removeArrayItem method
          }
        }
      }
    },
  ],
  script: `(function() {
    // Process excluded URLs - inject as JSON string and parse
    var excludedUrlsJson = '{{excludedUrlsJson}}';
    var excludedUrlsArray = [];
    
    try {
      if (excludedUrlsJson && excludedUrlsJson !== '' && excludedUrlsJson !== '{{excludedUrlsJson}}') {
        excludedUrlsArray = JSON.parse(excludedUrlsJson);
      }
    } catch (e) {
      console.warn('[Sentry] Failed to parse excluded URLs:', e);
    }
    
    // Default excluded URLs if none provided
    if (!excludedUrlsArray || excludedUrlsArray.length === 0) {
      excludedUrlsArray = [
        'chrome-extension://*',
        'moz-extension://*'
      ];
    }
    
    var specialChars = ['.', '+', '?', '^', '$', '(', ')', '|', '[', ']', '\\\\'];
    var denyUrlsRegex = excludedUrlsArray
      .filter(function(url) { return url && url.trim() !== ''; })
      .map(function(url) {
        // Escape special regex characters except * which we'll use as wildcard
        var escaped = url;
        specialChars.forEach(function(char) {
          escaped = escaped.split(char).join('\\\\' + char);
        });
        // Convert * to .* for wildcard matching
        var pattern = escaped.replace(/\\*/g, '.*');
        return new RegExp(pattern);
      });

    function initSentry() {
      if (typeof window.Sentry === 'undefined') {
        console.error('[Sentry] Sentry SDK not loaded');
        return;
      }

      // Sentry v8 uses function-based integrations (not constructors)
      var integrations = [];
      
      // Add browser tracing if available
      if (typeof window.Sentry.browserTracingIntegration === 'function') {
        integrations.push(window.Sentry.browserTracingIntegration());
      }
      
      // Add replay if available
      if (typeof window.Sentry.replayIntegration === 'function') {
        integrations.push(window.Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }));
      }

      window.Sentry.init({
        dsn: '{{dsn}}',
        sendDefaultPii: true,
        integrations: integrations,
        
        // Performance Monitoring
        tracesSampleRate: 1.0,
        
        // Trace propagation targets (v8 syntax - moved to root level)
        tracePropagationTargets: ['localhost', /^\\//, window.location.origin],
        
        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        
        // Filter out errors from excluded URLs
        denyUrls: denyUrlsRegex,
        
        // Additional filtering via beforeSend
        beforeSend: function(event, hint) {
          // Check if error originated from excluded URLs
          if (event.exception && event.exception.values) {
            for (var i = 0; i < event.exception.values.length; i++) {
              var exception = event.exception.values[i];
              if (exception.stacktrace && exception.stacktrace.frames) {
                for (var j = 0; j < exception.stacktrace.frames.length; j++) {
                  var frame = exception.stacktrace.frames[j];
                  if (frame.filename) {
                    // Check against excluded URLs
                    for (var k = 0; k < denyUrlsRegex.length; k++) {
                      if (denyUrlsRegex[k].test(frame.filename)) {
                        console.log('[Sentry] Filtered error from excluded URL:', frame.filename);
                        return null; // Drop the event
                      }
                    }
                  }
                }
              }
            }
          }
          
          // Check request URL
          if (event.request && event.request.url) {
            for (var m = 0; m < denyUrlsRegex.length; m++) {
              if (denyUrlsRegex[m].test(event.request.url)) {
                console.log('[Sentry] Filtered error from excluded request URL:', event.request.url);
                return null; // Drop the event
              }
            }
          }
          
          return event;
        },
        
        // Ignore specific error messages
        ignoreErrors: [
          // Browser extensions
          'top.GLOBALS',
          'chrome-extension://',
          'moz-extension://',
          // Network errors
          'NetworkError',
          'Failed to fetch',
          'Network request failed',
          // Random plugins/extensions
          'atomicFindClose',
          'conduitPage',
        ],
      });

      console.log('[Sentry] Initialized with DSN:', '{{dsn}}');
      if (denyUrlsRegex.length > 0) {
        console.log('[Sentry] Excluding', denyUrlsRegex.length, 'URL patterns');
      }
    }

    // Load Sentry SDK
    var script = document.createElement('script');
    script.src = 'https://browser.sentry-cdn.com/8.38.0/bundle.tracing.replay.min.js';
    script.crossOrigin = 'anonymous';
    
    script.onload = function() {
      // Give a small delay to ensure Sentry global is available
      setTimeout(function() {
        initSentry();
      }, 10);
    };
    
    script.onerror = function() {
      console.error('[Sentry] Failed to load Sentry SDK');
    };
    
    document.head.appendChild(script);
  })();`
};

module.exports = sentryTemplate; 