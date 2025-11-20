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
    excludedUrls: 'excluded_urls'
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
      placeholder: 'https://xxxxxx@xxx.ingest.sentry.io/xxxxx',
      required: true,
      size: 'full',
      description: 'Find in Settings → Projects → Client Keys (DSN).',
      validation: {
        pattern: "/^https?:\/\/[\w.@:\/\-]+$/",
        message: 'Must be a valid DSN URL',
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
        "moz-extension://*"
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
          pattern: "/^(\*|https?:\/\/)?[a-z\d\-.*:/_@]+$/i",
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
                const script = document.createElement('script');
                script.src = 'https://browser.sentry-cdn.com/8.38.0/bundle.tracing.replay.min.js';
                script.integrity = 'sha384-Wo/pfCS2y2B2QZFJWM8LQu+7l8wOIdQHiMSLQVLuT5Oz5f4Pq+xSGQhcG5bCVwS1';
                script.crossOrigin = 'anonymous';
                script.onload = () => {
                    // Process excluded URLs and convert to RegExp patterns
                    const excludedUrlsArray = [{{#each excludedUrls}}'{{this}}'{{#unless @last}},{{/unless}}{{/each}}];
                    const specialChars = ['.', '+', '?', '^', '$', '(', ')', '|', '[', ']', '\\\\'];
                    const denyUrlsRegex = excludedUrlsArray
                        .filter(url => url && url.trim() !== '')
                        .map(url => {
                            // Escape special regex characters except * which we'll use as wildcard
                            let escaped = url;
                            specialChars.forEach(char => {
                                escaped = escaped.split(char).join('\\\\' + char);
                            });
                            // Convert * to .* for wildcard matching
                            const pattern = escaped.replace(/\\*/g, '.*');
                            return new RegExp(pattern);
                        });

                    Sentry.init({
                        dsn: '{{dsn}}',
                        sendDefaultPii: true,
                        integrations: [
                            new Sentry.BrowserTracing({
                                tracePropagationTargets: ["localhost", /^\//],
                            }),
                            new Sentry.Replay({
                                maskAllText: true,
                                blockAllMedia: true,
                            })
                        ],
                        // Performance Monitoring
                        tracesSampleRate: 1.0,
                        
                        // Session Replay
                        replaysSessionSampleRate: 0.1,
                        replaysOnErrorSampleRate: 1.0,
                        
                        // Filter out errors from excluded URLs
                        denyUrls: denyUrlsRegex,
                        
                        // Additional filtering via beforeSend
                        beforeSend(event, hint) {
                            // Check if error originated from excluded URLs
                            if (event.exception && event.exception.values) {
                                for (const exception of event.exception.values) {
                                    if (exception.stacktrace && exception.stacktrace.frames) {
                                        for (const frame of exception.stacktrace.frames) {
                                            if (frame.filename) {
                                                // Check against excluded URLs
                                                for (const regex of denyUrlsRegex) {
                                                    if (regex.test(frame.filename)) {
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
                                for (const regex of denyUrlsRegex) {
                                    if (regex.test(event.request.url)) {
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
                };
                
                script.onerror = () => {
                    console.error('[Sentry] Failed to load Sentry SDK');
                };
                
                document.head.appendChild(script);
                })();`
};

module.exports = sentryTemplate; 