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
    async: "true"
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
  // User configured excluded URLs (injected from template)
  var userExcludedUrls = [{{excludedUrls}}];

  // Default excluded URLs
  var defaultExcludedUrls = [
    "chrome-extension://*",
    "moz-extension://*",
    "https://store-cdn1.fynd.com/*"
  ];

  // Merge unique values
  var allUrls = defaultExcludedUrls.concat(userExcludedUrls);
  var excludedUrlsArray = allUrls.filter(function(item, index) {
    return item && allUrls.indexOf(item) === index;
  });

  console.log("[Sentry] Excluded URLs:", excludedUrlsArray);

  // Convert wildcard pattern to regex
  function patternToRegex(pattern) {
    if (!pattern) return null;
    // Escape all regex special characters except *
    var specialChars = [".", "+", "?", "^", "$", "{", "}", "(", ")", "|", "[", "]"];
    var escaped = "";
    for (var i = 0; i < pattern.length; i++) {
      var c = pattern[i];
      if (c === "*") {
        escaped += ".*";
      } else if (specialChars.indexOf(c) !== -1) {
        escaped += String.fromCharCode(92) + c;
      } else {
        escaped += c;
      }
    }
    try {
      return new RegExp("^" + escaped + "$", "i");
    } catch (e) {
      console.warn("[Sentry] Invalid pattern:", pattern);
      return null;
    }
  }

  // Build regex list from patterns
  var denyUrlsRegex = excludedUrlsArray.map(patternToRegex).filter(Boolean);

  // Check if URL matches any excluded pattern
  function isUrlExcluded(url) {
    if (!url) return false;
    for (var i = 0; i < denyUrlsRegex.length; i++) {
      if (denyUrlsRegex[i].test(url)) {
        return true;
      }
    }
    return false;
  }

  // Check if current page should be excluded
  function isCurrentPageExcluded() {
    var currentUrl = window.location.href;
    var isExcluded = isUrlExcluded(currentUrl);
    if (isExcluded) {
      console.log("[Sentry] Current page is excluded:", currentUrl);
    }
    return isExcluded;
  }

  function initSentry() {
    if (!window.Sentry) {
      console.error("[Sentry] Sentry SDK not loaded");
      return;
    }

    // Skip initialization if current page is excluded
    if (isCurrentPageExcluded()) {
      console.log("[Sentry] Skipping initialization - page is excluded");
      return;
    }

    var integrations = [];

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
      integrations: integrations,

      tracesSampleRate: 1.0,
      tracePropagationTargets: ["localhost", window.location.origin],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      denyUrls: denyUrlsRegex,

      beforeSend: function(event) {
        // Check current page URL first
        if (isUrlExcluded(window.location.href)) {
          console.log("[Sentry] Blocked - current page excluded:", window.location.href);
          return null;
        }

        // Filter exception stack frames
        if (event.exception && event.exception.values) {
          for (var i = 0; i < event.exception.values.length; i++) {
            var ex = event.exception.values[i];
            if (ex.stacktrace && ex.stacktrace.frames) {
              for (var j = 0; j < ex.stacktrace.frames.length; j++) {
                var frame = ex.stacktrace.frames[j];
                if (frame.filename && isUrlExcluded(frame.filename)) {
                  console.log("[Sentry] Blocked - excluded frame:", frame.filename);
                  return null;
                }
              }
            }
          }
        }

        // Filter based on request URL
        if (event.request && event.request.url && isUrlExcluded(event.request.url)) {
          console.log("[Sentry] Blocked - excluded request:", event.request.url);
          return null;
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
  var script = document.createElement("script");
  script.src = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.replay.min.js";
  script.crossOrigin = "anonymous";

  script.onload = function() { setTimeout(initSentry, 10); };
  script.onerror = function() { console.error("[Sentry] SDK load failed"); };

  document.head.appendChild(script);
})();`
};

module.exports = sentryTemplate; 