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
  attributes: { 
    async: "true",
    "data-excluded-urls": "{{excludedUrlsJson}}"
  },
  // Transform excludedUrls array to JSON string for data attribute
  transformData: function(data) {
    if (data.excludedUrls && Array.isArray(data.excludedUrls)) {
      data.excludedUrlsJson = JSON.stringify(data.excludedUrls);
    } else {
      data.excludedUrlsJson = '[]';
    }
    return data;
  },
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
      placeholder: 'https://abc123@sentry.example.com/123',
      required: true,
      size: 'full',
      description: 'Find in Settings → Projects → Client Keys (DSN). Format: https://<key>@<host>/<project_id>',
      validation: {
        pattern: "/^https:\/\/[a-f0-9]+@[a-z0-9.-]+\.[a-z]{2,}\/[0-9]+$/i",
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
        // Disable button until input has a value
        button_disabled: function(inputValue) {
          return !inputValue || inputValue.trim() === '';
        },
        validation: {
          pattern: "/^(\*|https?:\/\/)?[a-z\d\-.*:\/_@]+$/i",
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
  script: `(function () {
  // Default excluded URLs
  const defaultExcludedUrls = [
    "chrome-extension://*",
    "moz-extension://*",
    "https://store-cdn1.fynd.com/*"
  ];

  // Get the current running script reliably
  const currentScript = document.currentScript;

  let userExcludedUrls = [];
  try {
    const attr = currentScript?.getAttribute("data-excluded-urls");

    // Ensure placeholder is replaced by actual JSON
    if (attr && attr !== "{{excludedUrlsJson}}") {
      userExcludedUrls = JSON.parse(attr);
    }
  } catch (err) {
    console.warn("[Sentry] Invalid excluded URL attribute", err);
  }

  // Merge unique values
  const excludedUrlsArray = [...new Set([...defaultExcludedUrls, ...userExcludedUrls])];

  console.log("[Sentry] Excluded URLs:", excludedUrlsArray);

  // Build regex list from patterns
  const denyUrlsRegex = excludedUrlsArray.map((pattern) => {
    if (!pattern) return null;

    // Escape regex special chars except *
    const escaped = pattern.replace(/[-[\]/{}()+?.\\^$|]/g, "\\$&");

    // Convert wildcard * → match-anything regex
    const wildcard = escaped.replace(/\*/g, ".*");

    return new RegExp(wildcard);
  }).filter(Boolean);

  function initSentry() {
    if (!window.Sentry) {
      console.error("[Sentry] Sentry SDK not loaded");
      return;
    }

    const integrations = [];

    if (typeof window.Sentry.browserTracingIntegration === "function") {
      integrations.push(window.Sentry.browserTracingIntegration());
    }

    if (typeof window.Sentry.replayIntegration === "function") {
      integrations.push(
        window.Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        })
      );
    }

    window.Sentry.init({
      dsn: "{{dsn}}",
      sendDefaultPii: true,
      integrations,

      tracesSampleRate: 1.0,
      tracePropagationTargets: ["localhost", /^\/$/, window.location.origin],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      denyUrls: denyUrlsRegex,

      beforeSend(event) {
        // Filter exception stack frames
        if (event.exception?.values) {
          for (const ex of event.exception.values) {
            if (ex.stacktrace?.frames) {
              for (const frame of ex.stacktrace.frames) {
                if (frame.filename) {
                  if (denyUrlsRegex.some((rgx) => rgx.test(frame.filename))) {
                    console.log("[Sentry] Filtered excluded frame:", frame.filename);
                    return null;
                  }
                }
              }
            }
          }
        }

        // Filter based on request URL
        if (event.request?.url) {
          if (denyUrlsRegex.some((rgx) => rgx.test(event.request.url))) {
            console.log("[Sentry] Filtered excluded request:", event.request.url);
            return null;
          }
        }

        return event;
      },

      ignoreErrors: [
        "top.GLOBALS",
        "chrome-extension://",
        "moz-extension://",
        "NetworkError",
        "Failed to fetch",
        "atomicFindClose",
        "conduitPage",
      ],
    });

    console.log("[Sentry] Initialized OK");
  }

  // Load Sentry CDN
  const script = document.createElement("script");
  script.src = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.replay.min.js";
  script.crossOrigin = "anonymous";

  script.onload = () => setTimeout(initSentry, 10);
  script.onerror = () => console.error("[Sentry] SDK load failed");

  document.head.appendChild(script);
})();`
};

module.exports = sentryTemplate; 