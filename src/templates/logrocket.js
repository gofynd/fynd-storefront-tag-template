/**
 * LogRocket Template
 */

const createTemplate = require('../utils/createTemplate');

const logrocketTemplate = createTemplate({
    // Required keys
    name: 'LogRocket',
    path: 'logrocket',
    description: 'Session replay and performance monitoring to understand user behavior and debug issues.',
    template_id: '1029',
    template_version: '1.0.0',
    category: 'recording',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/logrocket.com',
    note: '**LogRocket** records user sessions with console logs, network requests, and Redux state. Find your App ID in Settings → Project Setup.',
    help_link: {
      text: 'Learn more about LogRocket setup in the',
      url: 'https://docs.logrocket.com/docs/quickstart',
      label: 'Documentation'
    },
    field_mappings: {
      appId: 'app_id',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name',
      releaseVersion: 'release_version',
      environment: 'environment',
      enableConsoleLog: 'enable_console_log',
      enableNetworkCapture: 'enable_network_capture',
      enableDomCapture: 'enable_dom_capture',
      enableRageClick: 'enable_rage_click',
      enableScrollMap: 'enable_scroll_map',
      sanitizeInputs: 'sanitize_inputs',
      maskAllText: 'mask_all_text',
      maskAllInputs: 'mask_all_inputs',
      maskEmailInputs: 'mask_email_inputs',
      blockSelectors: 'block_selectors',
      maskTextSelectors: 'mask_text_selectors',
      ignoreSelectors: 'ignore_selectors',
      reduxActionSanitizer: 'redux_action_sanitizer',
      reduxStateSanitizer: 'redux_state_sanitizer',
      networkRequestSanitizer: 'network_request_sanitizer',
      networkResponseSanitizer: 'network_response_sanitizer',
      captureIp: 'capture_ip',
      sampleRate: 'sample_rate',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      userTraits: 'user_traits',
      customEvents: 'custom_events',
      excludeUrls: 'exclude_urls',
      includeUrls: 'include_urls',
      onSessionStart: 'on_session_start'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'appId',
        type: 'text',
        label: 'App ID',
        placeholder: 'your-org/your-app',
        required: true,
        size: 'medium',
        description: 'Your LogRocket App ID from Settings → Project Setup.',
        validation: {
          pattern: /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
          message: 'Must be in format: org-name/app-name'
        }
      },
      {
        name: 'userId',
        type: 'text',
        label: 'User ID Field',
        placeholder: 'e.g., user.id',
        required: false,
        size: 'medium',
        description: 'JavaScript path to user ID.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'userEmail',
        type: 'text',
        label: 'User Email Field',
        placeholder: 'e.g., user.email',
        required: false,
        size: 'medium',
        description: 'JavaScript path to user email.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'userName',
        type: 'text',
        label: 'User Name Field',
        placeholder: 'e.g., user.name',
        required: false,
        size: 'medium',
        description: 'JavaScript path to user name.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'releaseVersion',
        type: 'text',
        label: 'Release Version',
        placeholder: 'e.g., 1.0.0',
        required: false,
        size: 'medium',
        description: 'Your application version for filtering sessions.'
      },
      {
        name: 'environment',
        type: 'select',
        label: 'Environment',
        required: false,
        size: 'medium',
        description: 'Environment name for session filtering.',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
          { label: 'Development', value: 'development' },
          { label: 'QA', value: 'qa' }
        ],
        default: 'production'
      },
      {
        name: 'enableConsoleLog',
        type: 'checkbox',
        label: 'Capture Console Logs',
        default: true,
        size: 'medium',
        description: 'Record console.log, console.error, etc.'
      },
      {
        name: 'enableNetworkCapture',
        type: 'checkbox',
        label: 'Capture Network Requests',
        default: true,
        size: 'medium',
        description: 'Record API calls and responses.'
      },
      {
        name: 'enableDomCapture',
        type: 'checkbox',
        label: 'Capture DOM Mutations',
        default: true,
        size: 'medium',
        description: 'Record DOM changes for replay.'
      },
      {
        name: 'enableRageClick',
        type: 'checkbox',
        label: 'Detect Rage Clicks',
        default: true,
        size: 'medium',
        description: 'Identify frustrated user behavior.'
      },
      {
        name: 'enableScrollMap',
        type: 'checkbox',
        label: 'Enable Scroll Maps',
        default: false,
        size: 'medium',
        description: 'Track scroll depth on pages.'
      },
      {
        name: 'sanitizeInputs',
        type: 'checkbox',
        label: 'Sanitize Form Inputs',
        default: true,
        size: 'medium',
        description: 'Replace input values with asterisks.'
      },
      {
        name: 'maskAllText',
        type: 'checkbox',
        label: 'Mask All Text',
        default: false,
        size: 'medium',
        description: 'Hide all text content (strict privacy).'
      },
      {
        name: 'maskAllInputs',
        type: 'checkbox',
        label: 'Mask All Inputs',
        default: false,
        size: 'medium',
        description: 'Hide all input fields.'
      },
      {
        name: 'maskEmailInputs',
        type: 'checkbox',
        label: 'Mask Email Inputs',
        default: true,
        size: 'medium',
        description: 'Hide email input fields only.'
      },
      {
        name: 'captureIp',
        type: 'checkbox',
        label: 'Capture IP Address',
        default: false,
        size: 'medium',
        description: 'Record user IP addresses.'
      },
      {
        name: 'sampleRate',
        type: 'number',
        label: 'Sample Rate (%)',
        placeholder: '100',
        required: false,
        size: 'medium',
        description: 'Percentage of sessions to record (1-100).',
        validation: {
          min: 1,
          max: 100
        },
        default: 100
      },
      {
        name: 'debugMode',
        type: 'checkbox',
        label: 'Debug Mode',
        default: false,
        size: 'medium',
        description: 'Enable console logging for debugging.'
      },
      {
        name: 'enableInDevelopment',
        type: 'checkbox',
        label: 'Enable in Development',
        default: false,
        size: 'medium',
        description: 'Enable on localhost/development environments.'
      },
      {
        name: 'blockSelectors',
        type: 'array',
        label: 'Block Selectors',
        description: 'CSS selectors for elements to completely hide (e.g., .credit-card, #ssn-field).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., .sensitive-data',
          button_text: 'Add Selector',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[#.\[\]a-zA-Z0-9_:>~\s-]+$/,
            message: 'Must be a valid CSS selector'
          }
        }
      },
      {
        name: 'maskTextSelectors',
        type: 'array',
        label: 'Mask Text Selectors',
        description: 'CSS selectors for elements to mask text (e.g., .user-name, .email).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., .private-info',
          button_text: 'Add Selector',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[#.\[\]a-zA-Z0-9_:>~\s-]+$/,
            message: 'Must be a valid CSS selector'
          }
        }
      },
      {
        name: 'ignoreSelectors',
        type: 'array',
        label: 'Ignore Selectors',
        description: 'CSS selectors for elements to ignore mutations (e.g., .clock, .animation).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., .animated-element',
          button_text: 'Add Selector',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[#.\[\]a-zA-Z0-9_:>~\s-]+$/,
            message: 'Must be a valid CSS selector'
          }
        }
      },
      {
        name: 'userTraits',
        type: 'array',
        label: 'User Traits',
        description: 'Custom user properties (e.g., plan=premium, role=admin, company=Acme).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., property=value',
          button_text: 'Add Trait',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: property=value'
          }
        }
      },
      {
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Events to track (e.g., checkout_started, feature_used, error_occurred).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., event-name',
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
        name: 'excludeUrls',
        type: 'array',
        label: 'Exclude URL Patterns',
        description: 'URL patterns where LogRocket should not record (e.g., /admin/*, /api/*).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., /admin/*',
          button_text: 'Add Pattern',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[/a-zA-Z0-9*?.-]+$/,
            message: 'Must be a valid URL pattern'
          }
        }
      },
      {
        name: 'includeUrls',
        type: 'array',
        label: 'Include Only URL Patterns',
        description: 'Record only on matching URLs (leave empty for all pages).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., /app/*',
          button_text: 'Add Pattern',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[/a-zA-Z0-9*?.-]+$/,
            message: 'Must be a valid URL pattern'
          }
        }
      },
      {
        name: 'reduxActionSanitizer',
        type: 'textarea',
        label: 'Redux Action Sanitizer',
        placeholder: '// Function to sanitize Redux actions\n// action parameter is available\n// Return modified action or false to exclude\n// Example: if (action.type === "SET_PASSWORD") return false;',
        required: false,
        size: 'full',
        description: 'JavaScript function to sanitize Redux actions.',
        rows: 4
      },
      {
        name: 'reduxStateSanitizer',
        type: 'textarea',
        label: 'Redux State Sanitizer',
        placeholder: '// Function to sanitize Redux state\n// state parameter is available\n// Return modified state\n// Example: return { ...state, user: { ...state.user, password: "[REDACTED]" } };',
        required: false,
        size: 'full',
        description: 'JavaScript function to sanitize Redux state.',
        rows: 4
      },
      {
        name: 'networkRequestSanitizer',
        type: 'textarea',
        label: 'Network Request Sanitizer',
        placeholder: '// Function to sanitize network requests\n// request parameter is available\n// Return modified request or false to exclude\n// Example: if (request.url.includes("/api/auth")) return false;',
        required: false,
        size: 'full',
        description: 'JavaScript function to sanitize network requests.',
        rows: 4
      },
      {
        name: 'networkResponseSanitizer',
        type: 'textarea',
        label: 'Network Response Sanitizer',
        placeholder: '// Function to sanitize network responses\n// response parameter is available\n// Return modified response or false to exclude\n// Example: if (response.body && response.body.token) response.body.token = "[REDACTED]";',
        required: false,
        size: 'full',
        description: 'JavaScript function to sanitize network responses.',
        rows: 4
      },
      {
        name: 'onSessionStart',
        type: 'textarea',
        label: 'On Session Start Callback',
        placeholder: '// Code to run when session starts\n// sessionURL variable contains the session URL\n// Example: console.log("Session started:", sessionURL);',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when recording starts.',
        rows: 3
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[LogRocket] Skipping load in development environment');
          }
          return;
      }
      
      // Check URL patterns
      var currentPath = window.location.pathname;
      
      // Check excluded URLs
      var excludeUrlsArray = [{{excludeUrls}}] || [];
      for (var i = 0; i < excludeUrlsArray.length; i++) {
          var pattern = excludeUrlsArray[i];
          if (pattern) {
              var regex = new RegExp(pattern.replace(/\*/g, '.*'));
              if (regex.test(currentPath)) {
                  if ({{debugMode}}) {
                      console.log('[LogRocket] URL excluded by pattern:', pattern);
                  }
                  return;
              }
          }
      }
      
      // Check included URLs (if specified)
      var includeUrlsArray = [{{includeUrls}}] || [];
      if (includeUrlsArray.length > 0) {
          var included = false;
          for (var i = 0; i < includeUrlsArray.length; i++) {
              var pattern = includeUrlsArray[i];
              if (pattern) {
                  var regex = new RegExp(pattern.replace(/\*/g, '.*'));
                  if (regex.test(currentPath)) {
                      included = true;
                      break;
                  }
              }
          }
          if (!included) {
              if ({{debugMode}}) {
                  console.log('[LogRocket] URL not in include list');
              }
              return;
          }
      }
      
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
      
      // Sample rate check
      var sampleRate = parseInt('{{sampleRate}}', 10) || 100;
      if (sampleRate < 100) {
          var random = Math.random() * 100;
          if (random > sampleRate) {
              if ({{debugMode}}) {
                  console.log('[LogRocket] Session not recorded due to sampling rate');
              }
              return;
          }
      }
      
      // Load LogRocket
      !function(){var e=window,t=e.LogRocket;if(!t){var n=e.LogRocket=function(){n.q.push(arguments)};n.q=[];for(var r=["identify","track","getSessionURL","captureException","getVersion"],o=0;o<r.length;o++){var i=r[o];n[i]=function(e){return function(){n.q.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(i)}var a=document.createElement("script");a.async=!0,a.src="https://cdn.lr-in-prod.com/LogRocket.min.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)}}();
      
      // Initialize LogRocket with configuration
      var config = {
          release: '{{releaseVersion}}' || undefined,
          console: {
              isEnabled: {{enableConsoleLog}}
          },
          network: {
              isEnabled: {{enableNetworkCapture}}
          },
          dom: {
              isEnabled: {{enableDomCapture}},
              inputSanitizer: {{sanitizeInputs}},
              textSanitizer: {{maskAllText}}
          }
      };
      
      // Privacy settings
      if ({{maskAllInputs}}) {
          config.dom.inputSanitizer = true;
      }
      if ({{maskEmailInputs}}) {
          config.dom.inputSanitizer = {
              type: 'email'
          };
      }
      
      // Capture IP setting
      config.shouldCaptureIP = {{captureIp}};
      
      // Rage click detection
      if ({{enableRageClick}}) {
          config.mergeIframes = true;
      }
      
      // Environment
      var environment = '{{environment}}';
      if (environment) {
          config.environment = environment;
      }
      
      // Block selectors
      var blockSelectorsArray = [{{blockSelectors}}] || [];
      if (blockSelectorsArray.length > 0) {
          config.dom.privateAttributeBlocklist = blockSelectorsArray;
      }
      
      // Mask text selectors
      var maskTextSelectorsArray = [{{maskTextSelectors}}] || [];
      if (maskTextSelectorsArray.length > 0) {
          config.dom.textSanitizerAllowlist = maskTextSelectorsArray;
      }
      
      // Ignore selectors
      var ignoreSelectorsArray = [{{ignoreSelectors}}] || [];
      if (ignoreSelectorsArray.length > 0) {
          config.dom.ignoreCSSAttributes = ignoreSelectorsArray;
      }
      
      // Sanitizer functions
      var reduxActionSanitizerCode = {{reduxActionSanitizer}};
      if (reduxActionSanitizerCode) {
          try {
              config.reduxActionSanitizer = function(action) {
                  return eval('(' + reduxActionSanitizerCode + ')')(action);
              };
          } catch (e) {
              console.error('[LogRocket] Error in Redux action sanitizer:', e);
          }
      }
      
      var reduxStateSanitizerCode = {{reduxStateSanitizer}};
      if (reduxStateSanitizerCode) {
          try {
              config.reduxStateSanitizer = function(state) {
                  return eval('(' + reduxStateSanitizerCode + ')')(state);
              };
          } catch (e) {
              console.error('[LogRocket] Error in Redux state sanitizer:', e);
          }
      }
      
      var networkRequestSanitizerCode = {{networkRequestSanitizer}};
      if (networkRequestSanitizerCode) {
          try {
              config.network.requestSanitizer = function(request) {
                  return eval('(' + networkRequestSanitizerCode + ')')(request);
              };
          } catch (e) {
              console.error('[LogRocket] Error in network request sanitizer:', e);
          }
      }
      
      var networkResponseSanitizerCode = {{networkResponseSanitizer}};
      if (networkResponseSanitizerCode) {
          try {
              config.network.responseSanitizer = function(response) {
                  return eval('(' + networkResponseSanitizerCode + ')')(response);
              };
          } catch (e) {
              console.error('[LogRocket] Error in network response sanitizer:', e);
          }
      }
      
      // Debug mode
      if ({{debugMode}}) {
          console.log('[LogRocket] Debug mode enabled');
          console.log('[LogRocket] Configuration:', config);
      }
      
      // Initialize LogRocket
      LogRocket.init('{{appId}}', config);
      
      // Get user data
      var userId = getNestedProperty(window, '{{userId}}');
      var userEmail = getNestedProperty(window, '{{userEmail}}');
      var userName = getNestedProperty(window, '{{userName}}');
      
      // Identify user
      if (userId || userEmail) {
          var userInfo = {};
          if (userName) userInfo.name = userName;
          if (userEmail) userInfo.email = userEmail;
          
          // Add user traits
          var userTraitsArray = [{{userTraits}}] || [];
          userTraitsArray.forEach(function(trait) {
              if (typeof trait === 'string' && trait.includes('=')) {
                  var parts = trait.split('=');
                  if (parts.length === 2) {
                      var key = parts[0].trim();
                      var value = parts[1].trim();
                      userInfo[key] = value;
                  }
              }
          });
          
          LogRocket.identify(userId || userEmail, userInfo);
          
          if ({{debugMode}}) {
              console.log('[LogRocket] User identified:', userId || userEmail, userInfo);
          }
      }
      
      // Get session URL and run callback
      LogRocket.getSessionURL(function(sessionURL) {
          if ({{debugMode}}) {
              console.log('[LogRocket] Session URL:', sessionURL);
          }
          
          // Execute session start callback
          var onSessionStartCallback = {{onSessionStart}};
          if (onSessionStartCallback) {
              try {
                  (function(sessionURL) {
                      eval(onSessionStartCallback);
                  })(sessionURL);
              } catch (error) {
                  console.error('[LogRocket] Error in session start callback:', error);
              }
          }
      });
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      
      // Helper functions
      window.LogRocketAPI = {
          // Track custom event
          track: function(eventName, properties) {
              if (customEventsArray.indexOf(eventName) !== -1 || customEventsArray.length === 0) {
                  LogRocket.track(eventName, properties);
                  if ({{debugMode}}) {
                      console.log('[LogRocket] Event tracked:', eventName, properties);
                  }
              }
          },
          
          // Identify user
          identify: function(userId, traits) {
              LogRocket.identify(userId, traits);
          },
          
          // Get session URL
          getSessionURL: function(callback) {
              LogRocket.getSessionURL(callback);
          },
          
          // Capture exception
          captureException: function(error, tags) {
              LogRocket.captureException(error, tags);
          },
          
          // Add custom log
          log: function(message, metadata) {
              LogRocket.log(message, metadata);
          },
          
          // Start/stop recording
          start: function() {
              LogRocket.start();
          },
          
          stop: function() {
              LogRocket.stop();
          }
      };
      
      // Enable scroll map if configured
      if ({{enableScrollMap}}) {
          // Track scroll depth
          var maxScroll = 0;
          window.addEventListener('scroll', function() {
              var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercentage > maxScroll) {
                  maxScroll = scrollPercentage;
                  if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                      LogRocket.track('scroll_depth', {
                          depth: maxScroll,
                          page: window.location.pathname
                      });
                  }
              }
          });
      }
    })();`
  });

module.exports = logrocketTemplate;
