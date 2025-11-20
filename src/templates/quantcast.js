/**
 * Quantcast Template
 */

const createTemplate = require('../utils/createTemplate');

const quantcastTemplate = createTemplate({
  // Required keys
  name: 'Quantcast',
  path: 'quantcast',
  description: 'Audience measurement and analytics to understand your website visitors demographics and interests.',
  template_id: '1031',
  template_version: '1.0.0',
  category: 'analytics',
  type: 'js',
  sub_type: 'inline',
  position: 'body_bottom',
  attributes: {
    async: 'true'
  },
  compatible_engines: ['react', 'vue2'],
  image: 'https://logo.clearbit.com/quantcast.com',
  note: '**Quantcast** provides audience measurement and demographic insights. Find your P-Code in your Quantcast Publisher account under "Get Quantcast Tag".',
  help_link: {
    text: 'Learn more about Quantcast Measure in the',
    url: 'https://www.quantcast.com/help/getting-started-with-quantcast-measure/',
    label: 'Documentation'
  },
  field_mappings: {
    pCode: 'p_code',
    enableConsent: 'enable_consent',
    consentRequired: 'consent_required',
    enableLabels: 'enable_labels',
    labels: 'labels',
    userId: 'user_id',
    userType: 'user_type',
    enableHashedEmail: 'enable_hashed_email',
    hashedEmail: 'hashed_email',
    enablePageView: 'enable_pageview',
    enableEvents: 'enable_events',
    customEvents: 'custom_events',
    enableSPA: 'enable_spa',
    enableDebug: 'enable_debug',
    enableSecure: 'enable_secure',
    customDomain: 'custom_domain',
    disableFirstParty: 'disable_first_party',
    cookieDomain: 'cookie_domain',
    cookiePath: 'cookie_path',
    cookieExpire: 'cookie_expire',
    pixelDelay: 'pixel_delay',
    onReady: 'on_ready'
  },
  layout: {
    columns: 2,
    gap: '24px'
  },
  fields: [
    {
      name: 'pCode',
      type: 'text',
      label: 'P-Code (Publisher ID)',
      placeholder: 'p-xxxxxxxxxx',
      required: true,
      size: 'medium',
      description: 'Your Quantcast publisher ID (starts with "p-").',
      validation: {
        pattern: /^p-[a-zA-Z0-9_-]+$/,
        message: 'Must be a valid P-Code starting with "p-"'
      }
    },
    {
      name: 'enableConsent',
      type: 'checkbox',
      label: 'Enable Consent Management',
      default: false,
      size: 'medium',
      description: 'Enable GDPR/CCPA consent handling.'
    },
    {
      name: 'consentRequired',
      type: 'checkbox',
      label: 'Require Consent Before Tracking',
      default: false,
      size: 'medium',
      description: 'Wait for explicit consent before tracking.',
      condition: (formData) => formData.enableConsent === true
    },
    {
      name: 'enableLabels',
      type: 'checkbox',
      label: 'Enable Labeled Tracking',
      default: false,
      size: 'medium',
      description: 'Use labels to segment your audience.'
    },
    {
      name: 'labels',
      type: 'array',
      label: 'Audience Labels',
      description: 'Labels for audience segmentation (e.g., registered-user, premium-member, mobile-visitor).',
      default: [],
      size: 'full',
      condition: (formData) => formData.enableLabels === true,
      input_config: {
        type: 'text',
        placeholder: 'e.g., premium-user',
        button_text: 'Add Label',
        input_size: 'medium',
        button_size: 'small',
        validation: {
          pattern: /^[a-zA-Z0-9-_]+$/,
          message: 'Must be alphanumeric with hyphens or underscores'
        }
      }
    },
    {
      name: 'userId',
      type: 'text',
      label: 'User ID Field',
      placeholder: 'e.g., user.id',
      required: false,
      size: 'medium',
      description: 'JavaScript path to user ID for cross-device tracking.',
      validation: {
        pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
        message: 'Must be a valid JavaScript variable path'
      }
    },
    {
      name: 'userType',
      type: 'select',
      label: 'User Type',
      required: false,
      size: 'medium',
      description: 'Type of users to track.',
      options: [
        { label: 'All Users', value: 'all' },
        { label: 'Logged In Only', value: 'logged_in' },
        { label: 'Anonymous Only', value: 'anonymous' }
      ],
      default: 'all'
    },
    {
      name: 'enableHashedEmail',
      type: 'checkbox',
      label: 'Enable Hashed Email Tracking',
      default: false,
      size: 'medium',
      description: 'Track SHA256 hashed emails for better audience insights.'
    },
    {
      name: 'hashedEmail',
      type: 'text',
      label: 'Hashed Email Field',
      placeholder: 'e.g., user.hashedEmail',
      required: false,
      size: 'medium',
      description: 'JavaScript path to SHA256 hashed email.',
      condition: (formData) => formData.enableHashedEmail === true,
      validation: {
        pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
        message: 'Must be a valid JavaScript variable path'
      }
    },
    {
      name: 'enablePageView',
      type: 'checkbox',
      label: 'Track Page Views',
      default: true,
      size: 'medium',
      description: 'Automatically track page views.'
    },
    {
      name: 'enableEvents',
      type: 'checkbox',
      label: 'Enable Custom Events',
      default: false,
      size: 'medium',
      description: 'Track custom events and conversions.'
    },
    {
      name: 'customEvents',
      type: 'array',
      label: 'Custom Event Names',
      description: 'Event names to track (e.g., purchase, signup, download).',
      default: [],
      size: 'full',
      condition: (formData) => formData.enableEvents === true,
      input_config: {
        type: 'text',
        placeholder: 'e.g., purchase-complete',
        button_text: 'Add Event',
        input_size: 'medium',
        button_size: 'small',
        validation: {
          pattern: /^[a-zA-Z0-9-_]+$/,
          message: 'Must be alphanumeric with hyphens or underscores'
        }
      }
    },
    {
      name: 'enableSPA',
      type: 'checkbox',
      label: 'Single Page App Support',
      default: false,
      size: 'medium',
      description: 'Track virtual page views in SPAs.'
    },
    {
      name: 'enableDebug',
      type: 'checkbox',
      label: 'Debug Mode',
      default: false,
      size: 'medium',
      description: 'Enable console logging for debugging.'
    },
    {
      name: 'enableSecure',
      type: 'checkbox',
      label: 'Force Secure (HTTPS)',
      default: true,
      size: 'medium',
      description: 'Always use HTTPS for pixel requests.'
    },
    {
      name: 'customDomain',
      type: 'text',
      label: 'Custom Tracking Domain',
      placeholder: 'e.g., analytics.yourdomain.com',
      required: false,
      size: 'medium',
      description: 'Custom domain for first-party tracking.',
      validation: {
        pattern: /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        message: 'Must be a valid domain'
      }
    },
    {
      name: 'disableFirstParty',
      type: 'checkbox',
      label: 'Disable First-Party Cookies',
      default: false,
      size: 'medium',
      description: 'Disable first-party cookie tracking.'
    },
    {
      name: 'cookieDomain',
      type: 'text',
      label: 'Cookie Domain',
      placeholder: 'e.g., .yourdomain.com',
      required: false,
      size: 'medium',
      description: 'Domain for first-party cookies.',
      validation: {
        pattern: /^\.?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        message: 'Must be a valid domain'
      }
    },
    {
      name: 'cookiePath',
      type: 'text',
      label: 'Cookie Path',
      placeholder: '/',
      required: false,
      size: 'medium',
      description: 'Path for first-party cookies.',
      default: '/'
    },
    {
      name: 'cookieExpire',
      type: 'number',
      label: 'Cookie Expiry (days)',
      placeholder: '395',
      required: false,
      size: 'medium',
      description: 'Cookie expiration in days.',
      validation: {
        min: 1,
        max: 730
      },
      default: 395
    },
    {
      name: 'pixelDelay',
      type: 'number',
      label: 'Pixel Delay (ms)',
      placeholder: '0',
      required: false,
      size: 'medium',
      description: 'Delay before firing the tracking pixel.',
      validation: {
        min: 0,
        max: 5000
      },
      default: 0
    },
    {
      name: 'onReady',
      type: 'textarea',
      label: 'On Ready Callback',
      placeholder: '// Code to run when Quantcast is ready\n// _qevents object is available\n// Example: console.log("Quantcast loaded");',
      required: false,
      size: 'full',
      description: 'JavaScript to execute when Quantcast loads.',
      rows: 3
    }
  ],
  script: `(function() {
    // Debug logging
    var debug = {{enableDebug}};
    if (debug) {
        console.log('[Quantcast] Initializing with P-Code:', '{{pCode}}');
    }
    
    // Check consent if enabled
    var consentEnabled = {{enableConsent}};
    var consentRequired = {{consentRequired}};
    
    if (consentEnabled && consentRequired) {
        // Check for common consent management platforms
        var hasConsent = false;
        
        // Check for __tcfapi (TCF v2)
        if (typeof window.__tcfapi === 'function') {
            window.__tcfapi('getTCData', 2, function(tcData, success) {
                if (success && tcData.gdprApplies) {
                    // Check if Quantcast has consent (vendor ID 11)
                    hasConsent = tcData.vendor && tcData.vendor.consents && tcData.vendor.consents[11];
                } else {
                    hasConsent = true; // GDPR doesn't apply
                }
                
                if (hasConsent) {
                    loadQuantcast();
                } else if (debug) {
                    console.log('[Quantcast] Waiting for consent');
                }
            });
        } else {
            // No CMP found, proceed
            loadQuantcast();
        }
    } else {
        // Consent not required, proceed
        loadQuantcast();
    }
    
    function loadQuantcast() {
        // Helper function to safely get nested property
        function getNestedProperty(obj, path) {
            if (!path) return undefined;
            var parts = path.split('.');
            var current = obj;
            for (var i = 0; i < parts.length; i++) {
                if (current && typeof current === 'object' && parts[i] in current) {
                    current = current[parts[i]];
                } else {
                    return undefined;
                }
            }
            return current;
        }
        
        // Initialize _qevents array
        window._qevents = window._qevents || [];
        
        // Configuration object
        var qacct = '{{pCode}}';
        var config = {
            qacct: qacct
        };
        
        // User tracking
        var userType = '{{userType}}';
        var userId = getNestedProperty(window, '{{userId}}');
        
        // Check user type restrictions
        if (userType === 'logged_in' && !userId) {
            if (debug) {
                console.log('[Quantcast] Skipping - user not logged in');
            }
            return;
        } else if (userType === 'anonymous' && userId) {
            if (debug) {
                console.log('[Quantcast] Skipping - user is logged in');
            }
            return;
        }
        
        // Add user ID if available
        if (userId) {
            config.uid = userId;
        }
        
        // Hashed email tracking
        var enableHashedEmail = {{enableHashedEmail}};
        if (enableHashedEmail) {
            var hashedEmail = getNestedProperty(window, '{{hashedEmail}}');
            if (hashedEmail) {
                config.phemail = hashedEmail;
            }
        }
        
        // Labels
        var enableLabels = {{enableLabels}};
        if (enableLabels) {
            var labelsArray = [{{labels}}] || [];
            if (labelsArray.length > 0) {
                config.labels = labelsArray.join(',');
            }
        }
        
        // Cookie settings
        var disableFirstParty = {{disableFirstParty}};
        if (disableFirstParty) {
            config.qopts = 'n';
        }
        
        var cookieDomain = '{{cookieDomain}}';
        if (cookieDomain) {
            config.qdom = cookieDomain;
        }
        
        var cookiePath = '{{cookiePath}}';
        if (cookiePath && cookiePath !== '/') {
            config.qpath = cookiePath;
        }
        
        var cookieExpire = parseInt('{{cookieExpire}}', 10);
        if (cookieExpire && cookieExpire !== 395) {
            config.qexp = cookieExpire;
        }
        
        // Secure mode
        var enableSecure = {{enableSecure}};
        if (enableSecure) {
            config.secure = 1;
        }
        
        // Custom domain
        var customDomain = '{{customDomain}}';
        if (customDomain) {
            config.qhost = customDomain;
        }
        
        // Track initial page view if enabled
        var enablePageView = {{enablePageView}};
        if (enablePageView) {
            window._qevents.push(config);
            if (debug) {
                console.log('[Quantcast] Page view tracked:', config);
            }
        }
        
        // Helper API
        window.QuantcastAPI = {
            // Track page view
            trackPageView: function(customConfig) {
                var pvConfig = Object.assign({}, config, customConfig || {});
                window._qevents.push(pvConfig);
                if (debug) {
                    console.log('[Quantcast] Page view tracked:', pvConfig);
                }
            },
            
            // Track event
            trackEvent: function(eventName, value, labels) {
                if (!eventName) return;
                
                var eventConfig = Object.assign({}, config, {
                    event: eventName
                });
                
                if (value !== undefined) {
                    eventConfig.value = value;
                }
                
                if (labels) {
                    eventConfig.labels = Array.isArray(labels) ? labels.join(',') : labels;
                }
                
                window._qevents.push(eventConfig);
                if (debug) {
                    console.log('[Quantcast] Event tracked:', eventConfig);
                }
            },
            
            // Update labels
            updateLabels: function(labels) {
                if (!labels) return;
                
                var labelConfig = Object.assign({}, config, {
                    labels: Array.isArray(labels) ? labels.join(',') : labels
                });
                
                window._qevents.push(labelConfig);
                if (debug) {
                    console.log('[Quantcast] Labels updated:', labelConfig);
                }
            },
            
            // Set user ID
            setUserId: function(newUserId) {
                config.uid = newUserId;
                if (debug) {
                    console.log('[Quantcast] User ID updated:', newUserId);
                }
            },
            
            // Opt out
            optOut: function() {
                document.cookie = 'qoo=OPT_OUT; path=/; domain=' + (config.qdom || window.location.hostname) + '; expires=Thu, 01 Jan 2037 00:00:00 GMT';
                if (debug) {
                    console.log('[Quantcast] User opted out');
                }
            },
            
            // Opt in
            optIn: function() {
                document.cookie = 'qoo=; path=/; domain=' + (config.qdom || window.location.hostname) + '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                if (debug) {
                    console.log('[Quantcast] User opted in');
                }
            }
        };
        
        // Custom events setup
        var enableEvents = {{enableEvents}};
        if (enableEvents) {
            var customEventsArray = [{{customEvents}}] || [];
            
            // Set up event listeners for custom events
            customEventsArray.forEach(function(eventName) {
                if (window.addEventListener) {
                    window.addEventListener('quantcast:' + eventName, function(e) {
                        var value = e.detail && e.detail.value;
                        var labels = e.detail && e.detail.labels;
                        window.QuantcastAPI.trackEvent(eventName, value, labels);
                    });
                }
            });
            
            if (debug && customEventsArray.length > 0) {
                console.log('[Quantcast] Listening for custom events:', customEventsArray);
            }
        }
        
        // SPA support
        var enableSPA = {{enableSPA}};
        if (enableSPA) {
            // Track virtual page views on route changes
            if (window.history && window.history.pushState) {
                var originalPushState = window.history.pushState;
                window.history.pushState = function() {
                    originalPushState.apply(window.history, arguments);
                    
                    // Delay to ensure URL has updated
                    setTimeout(function() {
                        window.QuantcastAPI.trackPageView();
                    }, 100);
                };
                
                // Also listen for popstate events
                window.addEventListener('popstate', function() {
                    setTimeout(function() {
                        window.QuantcastAPI.trackPageView();
                    }, 100);
                });
            }
            
            if (debug) {
                console.log('[Quantcast] SPA tracking enabled');
            }
        }
        
        // Load Quantcast script with delay if specified
        var pixelDelay = parseInt('{{pixelDelay}}', 10) || 0;
        
        setTimeout(function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = (enableSecure || document.location.protocol === 'https:' ? 'https://secure' : 'http://edge') + '.quantserve.com/quant.js';
            
            script.onload = function() {
                if (debug) {
                    console.log('[Quantcast] Script loaded successfully');
                }
                
                // Execute ready callback
                var onReadyCallback = {{onReady}};
                if (onReadyCallback) {
                    try {
                        (function() {
                            eval(onReadyCallback);
                        })();
                    } catch (error) {
                        console.error('[Quantcast] Error in ready callback:', error);
                    }
                }
                
                // Fire any custom ready event
                if (window.dispatchEvent) {
                    window.dispatchEvent(new Event('quantcast:ready'));
                }
            };
            
            script.onerror = function() {
                console.error('[Quantcast] Failed to load script');
            };
            
            var first = document.getElementsByTagName('script')[0];
            first.parentNode.insertBefore(script, first);
        }, pixelDelay);
    }
    
    // Also provide a manual init function
    window.initQuantcast = loadQuantcast;
  })();`
});

module.exports = quantcastTemplate; 