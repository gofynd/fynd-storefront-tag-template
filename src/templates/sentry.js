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
      // Auto-trim leading/trailing whitespace
      transform: function(value) {
        return value ? value.trim() : value;
      },
      validation: {
        // Comprehensive DSN validation regex:
        // - https:// protocol required
        // - [a-f0-9]+ : hex public key (1+ chars)
        // - @ : separator
        // - (?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+ : one or more domain labels with dots (ensures at least one dot)
        //   - Each label: starts/ends with alphanumeric, can have hyphens in middle
        // - [a-z]{2,} : TLD (letters only, 2+ chars)
        // - (?::[0-9]{1,5})? : optional port (1-5 digits)
        // - \/[0-9]+ : project ID (numeric)
        pattern: "/^https:\\/\\/[a-f0-9]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z]{2,}(?::[0-9]{1,5})?\\/[0-9]+$/i",
        message: 'Invalid Sentry DSN. Expected format: https://<key>@<host>.<tld>/<project_id>. Ensure the domain has a valid TLD (e.g., .io, .com) and port is numeric if specified.',
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

  // Track Sentry state
  var sentryState = {
    initialized: false,
    enabled: false,
    sdkLoaded: false
  };

  // ---------------- ERROR DEDUPLICATION & RATE LIMITING ----------------
  var errorCache = {};
  var ERROR_THROTTLE_MS = 5000; // Minimum 5 seconds between identical errors
  var MAX_ERRORS_PER_MINUTE = 5;
  var errorCountThisMinute = 0;
  var lastMinuteReset = Date.now();

  function getErrorFingerprint(event) {
    var message = event.message || '';
    var type = event.exception?.values?.[0]?.type || '';
    var value = event.exception?.values?.[0]?.value || '';
    var stack = event.exception?.values?.[0]?.stacktrace?.frames?.[0]?.filename || '';
    return type + ':' + value + ':' + message + ':' + stack;
  }

  function shouldThrottleError(event) {
    var now = Date.now();

    // Reset counter every minute
    if (now - lastMinuteReset > 60000) {
      errorCountThisMinute = 0;
      lastMinuteReset = now;
    }

    // Check global rate limit
    if (errorCountThisMinute >= MAX_ERRORS_PER_MINUTE) {
      console.log("[Sentry] Rate limit reached (" + MAX_ERRORS_PER_MINUTE + "/min), dropping event");
      return true;
    }

    // Check for duplicate errors (throttle identical errors)
    var fingerprint = getErrorFingerprint(event);
    var lastSent = errorCache[fingerprint];

    if (lastSent && (now - lastSent) < ERROR_THROTTLE_MS) {
      console.log("[Sentry] Duplicate error throttled (wait " + Math.ceil((ERROR_THROTTLE_MS - (now - lastSent)) / 1000) + "s)");
      return true;
    }

    // Update tracking
    errorCache[fingerprint] = now;
    errorCountThisMinute++;

    // Clean old cache entries (prevent memory leak)
    var cacheKeys = Object.keys(errorCache);
    if (cacheKeys.length > 50) {
      var oldestAllowed = now - 60000;
      cacheKeys.forEach(function(key) {
        if (errorCache[key] < oldestAllowed) {
          delete errorCache[key];
        }
      });
    }

    return false;
  }

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
    return denyUrlsRegex.some(function(r) { return r.test(url); });
  }

  function isCurrentPageExcluded() {
    var url = window.location.href;
    var excluded = isUrlExcluded(url);
    if (excluded) console.log("[Sentry] Current page excluded:", url);
    return excluded;
  }

  // ---------------- SOFT DISABLE SENTRY ----------------
  function disableSentry() {
    if (!sentryState.enabled) return;

    try {
      var client = window.Sentry?.getClient?.();
      if (!client) return;

      console.log("[Sentry] Disabling on excluded page");

      // Use enabled option to soft-disable (doesn't close the client)
      var options = client.getOptions();
      options.enabled = false;
      sentryState.enabled = false;
    } catch (err) {
      console.warn("[Sentry] Disable error:", err);
    }
  }

  // ---------------- RE-ENABLE SENTRY ----------------
  function enableSentry() {
    if (sentryState.enabled) return;

    try {
      var client = window.Sentry?.getClient?.();
      if (!client) {
        // If client doesn't exist and SDK is loaded, initialize
        if (sentryState.sdkLoaded && !sentryState.initialized) {
          initSentry();
        }
        return;
      }

      console.log("[Sentry] Re-enabling on allowed page");

      // Re-enable the client
      var options = client.getOptions();
      options.enabled = true;
      sentryState.enabled = true;
    } catch (err) {
      console.warn("[Sentry] Enable error:", err);
    }
  }

  // ---------------- HANDLE ROUTE CHANGE ----------------
  function handleRouteChange(url) {
    console.log("[Sentry] Route changed:", url);

    if (isUrlExcluded(url)) {
      disableSentry();
    } else {
      // If Sentry was never initialized (started on excluded page), initialize now
      if (!sentryState.initialized && sentryState.sdkLoaded) {
        console.log("[Sentry] First allowed page - initializing");
        initSentry();
      } else {
        enableSentry();
      }
    }
  }

  // ---------------- SPA ROUTE GUARD ----------------
  function enableSPARouteGuard() {
    var lastUrl = location.href;

    // 1. Listen to popstate for browser back/forward navigation
    window.addEventListener('popstate', function(event) {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        handleRouteChange(location.href);
      }
    });

    // 2. Wrap history.pushState
    var originalPushState = history.pushState;
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        handleRouteChange(location.href);
      }
    };

    // 3. Wrap history.replaceState
    var originalReplaceState = history.replaceState;
    history.replaceState = function() {
      originalReplaceState.apply(this, arguments);
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        handleRouteChange(location.href);
      }
    };

    // 4. Listen to hashchange for hash-based routing
    window.addEventListener('hashchange', function(event) {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        handleRouteChange(location.href);
      }
    });

    // 5. Fallback polling for edge cases (some frameworks use custom routing)
    setInterval(function() {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        handleRouteChange(location.href);
      }
    }, 500);

    console.log("[Sentry] SPA route guard enabled");
  }

  // ---------------- INITIALIZE SENTRY ----------------
  function initSentry() {
    if (!window.Sentry) {
      console.error("[Sentry] SDK not loaded");
      return;
    }

    // Prevent multiple inits
    if (sentryState.initialized) {
      console.log("[Sentry] Already initialized");
      // If already initialized but disabled, and current page is allowed, enable
      if (!sentryState.enabled && !isCurrentPageExcluded()) {
        enableSentry();
      }
      return;
    }

    // If on excluded page, skip init but enable route guard
    if (isCurrentPageExcluded()) {
      console.log("[Sentry] Skipping init — excluded page (will init on allowed page)");
      enableSPARouteGuard();
      return;
    }

    console.log("[Sentry] Initializing...");

    var integrations = [];

    // Add browser tracing for performance monitoring (no continuous calls)
    if (window.Sentry.browserTracingIntegration) {
      integrations.push(window.Sentry.browserTracingIntegration());
    }

    // Add deduplication integration to prevent duplicate errors
    if (window.Sentry.dedupeIntegration) {
      integrations.push(window.Sentry.dedupeIntegration());
    }

    // NOTE: Session Replay is DISABLED to prevent continuous API calls
    // Replay sends continuous DOM snapshots which causes /envelope/ spam
    // Uncomment below if you need replay (will cause continuous calls):
    // if (window.Sentry.replayIntegration) {
    //   integrations.push(window.Sentry.replayIntegration({
    //     maskAllText: true,
    //     blockAllMedia: true
    //   }));
    // }

    window.Sentry.init({
      dsn: "{{dsn}}",
      sendDefaultPii: false,
      integrations: integrations,
      
      // Performance tracing sample rate (0.1 = 10% of page loads)
      tracesSampleRate: 0.1,
      tracePropagationTargets: ["localhost", window.location.origin],

      // Session Replay DISABLED - set to 0 to prevent continuous calls
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,

      denyUrls: denyUrlsRegex,

      // Limit breadcrumbs to reduce payload size
      maxBreadcrumbs: 30,

      beforeSend: function(event, hint) {
        // Double-check exclusion at send time
        if (isUrlExcluded(window.location.href)) {
          console.log("[Sentry] Dropped event — excluded URL");
          return null;
        }

        // Apply error throttling to prevent spam
        if (shouldThrottleError(event)) {
          return null;
        }

        console.log("[Sentry] Sending error event");
        return event;
      },

      beforeSendTransaction: function(transaction) {
        // Filter transactions on excluded pages
        if (isUrlExcluded(window.location.href)) {
          console.log("[Sentry] Dropped transaction — excluded URL");
          return null;
        }
        return transaction;
      },

      ignoreErrors: [
        "top.GLOBALS",
        "chrome-extension://",
        "moz-extension://",
        "NetworkError",
        "Failed to fetch",
        "Load failed",
        "atomicFindClose",
        "conduitPage",
        "ResizeObserver loop",
        "Non-Error promise rejection",
        "Script error."
      ],
    });

    sentryState.initialized = true;
    sentryState.enabled = true;

    console.log("[Sentry] Initialized OK (Replay disabled, Rate limit: " + MAX_ERRORS_PER_MINUTE + "/min)");

    enableSPARouteGuard();
  }

  // ---------------- LOAD SDK ----------------
  // Using bundle.tracing.min.js (without replay) to prevent continuous calls
  var script = document.createElement("script");
  script.src = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.min.js";
  script.crossOrigin = "anonymous";

  script.onload = function() {
    sentryState.sdkLoaded = true;
    setTimeout(initSentry, 10);
  };
  script.onerror = function() {
    console.error("[Sentry] SDK load failed");
  };

  document.head.appendChild(script);
})();`
};

module.exports = sentryTemplate; 