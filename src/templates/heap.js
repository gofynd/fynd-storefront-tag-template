/**
 * Heap Analytics Template
 */

const createTemplate = require('../utils/createTemplate');

const heapTemplate = createTemplate({
  // Required keys
  name: 'Heap Analytics',
  path: 'heap-analytics',
  description: 'Autocapture user interactions without code changes.',
  template_id: '1007',
  template_version: '1.0.0',
  category: 'analytics',
  image: 'https://logo.clearbit.com/heap.io',
  note: '**Heap** automatically captures every user interaction without requiring code changes. Find your Environment ID in the Heap Dashboard under Install → Web.',
  help_link: {
    text: 'Learn more about Heap implementation in the',
    url: 'https://developers.heap.io/docs/web',
    label: 'Developer Docs'
  },
  field_mappings: {
    environmentId: 'environment_id',
    autocaptureEnabled: 'autocapture_enabled',
    trackPageviews: 'track_pageviews',
    sessionReplay: 'session_replay',
    disableTextCapture: 'disable_text_capture',
    secureCookie: 'secure_cookie',
    trackUtmParams: 'track_utm_params',
    trackReferrer: 'track_referrer',
    excludedElements: 'excluded_elements',
    customDomain: 'custom_domain'
  },
  layout: {
    columns: 2,
    gap: '24px'
  },
  fields: [
    {
      name: 'environmentId',
      type: 'text',
      label: 'Environment ID',
      placeholder: 'YOUR_ENVIRONMENT_ID',
      required: true,
      size: 'full',
      description: 'Find in Heap Dashboard → Install → Web.',
      validation: {
        pattern: /^\d{10,12}$/,
        message: 'Must be a valid 10-12 digit Environment ID'
      }
    },
    {
      name: 'autocaptureEnabled',
      type: 'checkbox',
      label: 'Enable Autocapture',
      default: true,
      size: 'medium',
      description: 'Automatically capture all clicks, form changes, and page views.'
    },
    {
      name: 'trackPageviews',
      type: 'checkbox',
      label: 'Track Page Views',
      default: true,
      size: 'medium',
      description: 'Automatically track page views on navigation.',
      condition: function(formData) {
        return formData.autocaptureEnabled;
      }
    },
    {
      name: 'sessionReplay',
      type: 'checkbox',
      label: 'Enable Session Replay',
      default: false,
      size: 'medium',
      description: 'Record user sessions for playback and analysis.'
    },
    {
      name: 'disableTextCapture',
      type: 'checkbox',
      label: 'Disable Text Capture',
      default: false,
      size: 'medium',
      description: 'Prevent capturing text content for privacy.'
    },
    {
      name: 'secureCookie',
      type: 'checkbox',
      label: 'Secure Cookie',
      default: true,
      size: 'medium',
      description: 'Use secure flag for cookies (HTTPS only).'
    },
    {
      name: 'trackUtmParams',
      type: 'checkbox',
      label: 'Track UTM Parameters',
      default: true,
      size: 'medium',
      description: 'Automatically capture UTM campaign parameters.'
    },
    {
      name: 'trackReferrer',
      type: 'checkbox',
      label: 'Track Referrer',
      default: true,
      size: 'medium',
      description: 'Capture referrer information for traffic sources.'
    },
    {
      name: 'debug',
      type: 'checkbox',
      label: 'Debug Mode',
      default: false,
      size: 'medium',
      description: 'Enable console logging for debugging.'
    },
    {
      name: 'excludedElements',
      type: 'array',
      label: 'Elements to Exclude',
      description: 'CSS selectors for elements to exclude from autocapture.',
      help_link: {
        url: 'https://developers.heap.io/docs/web#disabling-autocapture',
        text: 'Learn more'
      },
      default: [],
      size: 'full',
      input_config: {
        type: 'text',
        placeholder: 'e.g., .sensitive-data, #password-field',
        button_text: 'Add Selector',
        input_size: 'medium',
        button_size: 'small',
        validation: {
          pattern: /^[#.\[\]:\w\s-]+$/,
          message: 'Must be a valid CSS selector'
        }
      }
    },
    {
      name: 'customDomain',
      type: 'text',
      label: 'Custom Domain',
      placeholder: 'heap.yourdomain.com',
      required: false,
      size: 'full',
      description: 'Optional custom domain for first-party data collection.',
      validation: {
        pattern: /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i,
        message: 'Must be a valid domain'
      }
    }
  ],
  script: `(function() {
    window.heap = window.heap || [];
    heap.load = function(e, t) {
      window.heap.appid = e;
      window.heap.config = t = t || {};
      var r = document.createElement("script");
      r.type = "text/javascript";
      r.async = !0;
      r.src = "https://cdn.heapanalytics.com/js/heap-" + e + ".js";
      
      var a = document.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(r, a);
      
      for (var n = function(e) {
        return function() {
          heap.push([e].concat(Array.prototype.slice.call(arguments, 0)))
        }
      }, p = ["addEventProperties", "addUserProperties", "clearEventProperties", "identify", "resetIdentity", "removeEventProperty", "setEventProperties", "track", "unsetEventProperty"], o = 0; o < p.length; o++) heap[p[o]] = n(p[o])
    };
    
    // Configuration
    var config = {
      disableTextCapture: {{disableTextCapture}},
      secureCookie: {{secureCookie}},
      debug: {{debug}}
    };
    
    // Add custom domain if specified
    var customDomain = '{{customDomain}}';
    if (customDomain) {
      config.hostname = customDomain;
    }
    
    // Configure autocapture
    if (!{{autocaptureEnabled}}) {
      config.disableAutocapture = true;
    } else if (!{{trackPageviews}}) {
      config.disablePageviewAutocapture = true;
    }
    
    // Enable session replay if configured
    if ({{sessionReplay}}) {
      config.sessionReplay = {
        enabled: true
      };
    }
    
    // Initialize Heap
    heap.load('{{environmentId}}', config);
    
    // Track UTM parameters if enabled
    if ({{trackUtmParams}}) {
      var urlParams = new URLSearchParams(window.location.search);
      var utmParams = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function(param) {
        var value = urlParams.get(param);
        if (value) {
          utmParams[param] = value;
        }
      });
      if (Object.keys(utmParams).length > 0) {
        heap.addEventProperties(utmParams);
      }
    }
    
    // Track referrer if enabled
    if ({{trackReferrer}} && document.referrer) {
      heap.addEventProperties({
        referrer: document.referrer,
        referrer_domain: new URL(document.referrer).hostname
      });
    }
    
    // Exclude elements from autocapture
    var excludedSelectorsArray = [{{excludedElements}}] || [];
    
    if (excludedSelectorsArray.length > 0) {
      excludedSelectorsArray.forEach(function(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function(element) {
          element.setAttribute('data-heap-ignore', 'true');
        });
      });
      
      // Also watch for dynamically added elements
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            excludedSelectorsArray.forEach(function(selector) {
              mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                  if (node.matches && node.matches(selector)) {
                    node.setAttribute('data-heap-ignore', 'true');
                  }
                  var elements = node.querySelectorAll ? node.querySelectorAll(selector) : [];
                  elements.forEach(function(element) {
                    element.setAttribute('data-heap-ignore', 'true');
                  });
                }
              });
            });
          }
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  })();`
});

module.exports = heapTemplate; 