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
  var userExcludedUrls = [{{excludedUrls}}];

  var defaultExcludedUrls = [
    "chrome-extension://*",
    "moz-extension://*",
    "https://store-cdn1.fynd.com/*"
  ];

  var allUrls = Array.from(new Set(defaultExcludedUrls.concat(userExcludedUrls)));
  console.log("[Sentry] Exclusion patterns:", allUrls);

  // ---------------- REGEX HELPERS ----------------
  function escapeRegex(str) {
    return str.replace(/[-\/\\^$+?.()|[\]{}]/g, "\\$&");
  }

  function patternToRegex(pattern) {
    if (!pattern) return null;
    var escaped = escapeRegex(pattern).replace(/\\\*/g, ".*");
    try {
      return new RegExp("^" + escaped + "$", "i");
    } catch (err) {
      console.warn("[Sentry] Invalid regex:", pattern);
      return null;
    }
  }

  var denyUrlsRegex = allUrls.map(patternToRegex).filter(Boolean);

  function isUrlExcluded(url) {
    if (!url) return false;
    return denyUrlsRegex.some(r => r.test(url));
  }

  function isCurrentPageExcluded() {
    var url = window.location.href;
    var excluded = isUrlExcluded(url);
    if (excluded) console.log("[Sentry] Current page excluded:", url);
    return excluded;
  }

  // ---------------- HARD DISABLE SENTRY ----------------
  function hardDisableSentry() {
    try {
      var hub = window.Sentry?.getCurrentHub();
      var client = hub?.getClient();

      if (!client) return;

      console.log("[Sentry] HARD DISABLE triggered");

      // Stop transports / replay / tracing
      client.close(); // ⬅️ THIS IS THE CRUCIAL FIX

      // Remove all integrations to stop future events
      client.getOptions().integrations = [];

      // Rewrite beforeSend to block any event
      client.getOptions().beforeSend = function () {
        console.log("[Sentry] Event dropped — Sentry disabled");
        return null;
      };
    } catch (err) {
      console.warn("[Sentry] Hard disable error:", err);
    }
  }

  // ---------------- SPA ROUTE GUARD ----------------
  function enableSPARouteGuard() {
    let lastUrl = location.href;

    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;

        if (isUrlExcluded(location.href)) {
          hardDisableSentry();
        } else {
          console.log("[Sentry] Page allowed after SPA navigation:", location.href);
        }
      }
    }, 300);
  }

  // ---------------- INITIALIZE SENTRY ----------------
  function initSentry() {
    if (!window.Sentry) {
      console.error("[Sentry] SDK not loaded");
      return;
    }

    // Prevent multiple inits with HMR
    if (window.__SENTRY_INITIALIZED__) {
      console.log("[Sentry] Already initialized");
      return;
    }

    if (isCurrentPageExcluded()) {
      console.log("[Sentry] Skipping init — excluded page");
      return;
    }

    console.log("[Sentry] Initializing...");

    var integrations = [];

    if (window.Sentry.browserTracingIntegration)
      integrations.push(window.Sentry.browserTracingIntegration());

    if (window.Sentry.replayIntegration)
      integrations.push(window.Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true
      }));

    window.Sentry.init({
      dsn: "{{dsn}}",
      sendDefaultPii: true,
      integrations,
      tracesSampleRate: 1.0,
      tracePropagationTargets: ["localhost", window.location.origin],

      // Replays (can cause repeated envelopes)
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      denyUrls: denyUrlsRegex,

      beforeSend(event) {
        if (isUrlExcluded(window.location.href)) {
          console.log("[Sentry] Dropped event — excluded URL");
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

    window.__SENTRY_INITIALIZED__ = true;

    console.log("[Sentry] Initialized OK");

    enableSPARouteGuard();
  }

  // ---------------- LOAD SDK ----------------
  var script = document.createElement("script");
  script.src = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.replay.min.js";
  script.crossOrigin = "anonymous";

  script.onload = () => setTimeout(initSentry, 10);
  script.onerror = () => console.error("[Sentry] SDK load failed");

  document.head.appendChild(script);
})();`
};

module.exports = sentryTemplate; 