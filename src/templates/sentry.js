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
  // -------------------------------
  // User excluded URLs from template
  // -------------------------------
  var userExcludedUrls = [{{excludedUrls}}]; // e.g. ["https://abc.com/brands/*"]

  // -------------------------------
  // Default excluded URLs
  // -------------------------------
  var defaultExcludedUrls = [
    "chrome-extension://*",
    "moz-extension://*",
    "https://store-cdn1.fynd.com/*"
  ];

  // Merge & remove duplicates
  var allUrls = Array.from(new Set(defaultExcludedUrls.concat(userExcludedUrls)));

  console.log("[Sentry] Excluded URL Patterns:", allUrls);

  // -------------------------------
  // Convert wildcard patterns → RegExp
  // -------------------------------
  function patternToRegex(pattern) {
    if (!pattern) return null;

    var special = [".", "+", "?", "^", "$", "{", "}", "(", ")", "|", "[", "]"];
    var out = "";

    for (var i = 0; i < pattern.length; i++) {
      var c = pattern[i];
      if (c === "*") {
        out += ".*";
      } else if (special.indexOf(c) !== -1) {
        out += "\\" + c;
      } else {
        out += c;
      }
    }

    try {
      return new RegExp("^" + out + "$", "i");
    } catch (e) {
      console.warn("[Sentry] Invalid exclude pattern:", pattern);
      return null;
    }
  }

  var denyUrlsRegex = allUrls.map(patternToRegex).filter(Boolean);

  // -------------------------------
  // URL exclusion checker
  // -------------------------------
  function isUrlExcluded(url) {
    if (!url) return false;
    return denyUrlsRegex.some(function (r) { return r.test(url); });
  }

  function isCurrentPageExcluded() {
    var currentUrl = window.location.href;
    var excluded = isUrlExcluded(currentUrl);

    if (excluded) {
      console.log("[Sentry] Current page is excluded:", currentUrl);
    }

    return excluded;
  }

  // -------------------------------
  // Disable Sentry AFTER navigation
  // -------------------------------
  function disableSentryDynamically() {
    var hub = window.Sentry.getCurrentHub();
    var client = hub.getClient();

    if (!client) return;

    console.log("[Sentry] Dynamically disabling Sentry (SPA navigation)");

    var opts = client.getOptions();
    opts.sampleRate = 0;
    opts.tracesSampleRate = 0;
    opts.replaysSessionSampleRate = 0;
    opts.replaysOnErrorSampleRate = 0;
  }

  // -------------------------------
  // Setup dynamic SPA blocking
  // -------------------------------
  function enableSPARouteGuard() {
    let lastUrl = location.href;

    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;

        if (isUrlExcluded(location.href)) {
          disableSentryDynamically();
        } else {
          console.log("[Sentry] Allowed page after navigation:", location.href);
        }
      }
    }, 300);
  }

  // -------------------------------
  // Initialize Sentry
  // -------------------------------
  function initSentry() {
    if (!window.Sentry) {
      console.error("[Sentry] SDK not loaded");
      return;
    }

    if (isCurrentPageExcluded()) {
      console.log("[Sentry] Skipping initialization - initial page is excluded");
      return;
    }

    console.log("[Sentry] Initializing Sentry...");

    var integrations = [];

    if (typeof window.Sentry.browserTracingIntegration === "function") {
      integrations.push(window.Sentry.browserTracingIntegration());
    }

    if (typeof window.Sentry.replayIntegration === "function") {
      integrations.push(window.Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }));
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

      // ✔ SPA-safe dynamic blocking
      beforeSend: function (event) {
        if (!window.Sentry.getCurrentHub().getClient()) {
          console.log("[Sentry] captureException skipped – Sentry not initialized");
          return null;
        }
        if (isUrlExcluded(window.location.href)) {
          console.log("[Sentry] Event blocked (excluded page):", window.location.href);
          return null;
        }

        // Block frames
        if (event.exception?.values) {
          for (var ex of event.exception.values) {
            if (ex.stacktrace?.frames) {
              for (var frame of ex.stacktrace.frames) {
                if (frame.filename && isUrlExcluded(frame.filename)) {
                  console.log("[Sentry] Event blocked (excluded frame):", frame.filename);
                  return null;
                }
              }
            }
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

    console.log("[Sentry] Initialized successfully");

    // Enable route guard after init
    enableSPARouteGuard();

    // Debug check
    console.log(
      "[Sentry] Initialized client =",
      !!window.Sentry.getCurrentHub().getClient()
    );
  }

  // -------------------------------
  // Load Sentry CDN → then init
  // -------------------------------
  var script = document.createElement("script");
  script.src = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.replay.min.js";
  script.crossOrigin = "anonymous";

  script.onload = function () {
    setTimeout(initSentry, 10);
  };
  script.onerror = function () {
    console.error("[Sentry] Failed to load SDK");
  };

  document.head.appendChild(script);
})();`
};

module.exports = sentryTemplate; 