/**
 * TrackJS Template
 */

const createTemplate = require('../utils/createTemplate');

const trackjsTemplate = createTemplate({
    // Required keys
    name: 'TrackJS',
    path: 'trackjs',
    description: 'JavaScript error monitoring to track, replay, and fix errors in production.',
    template_id: '1030',
    template_version: '1.0.0',
    category: 'monitoring',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    image: 'https://logo.clearbit.com/trackjs.com',
    note: '**TrackJS** monitors JavaScript errors with detailed telemetry and session replay. Find your Token in Settings → Tokens.',
    help_link: {
      text: 'Learn more about TrackJS installation in the',
      url: 'https://docs.trackjs.com/getting-started/',
      label: 'Documentation'
    },
    field_mappings: {
      token: 'token',
      application: 'application',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name',
      sessionId: 'session_id',
      version: 'version',
      environment: 'environment',
      enableConsole: 'enable_console',
      enableNetwork: 'enable_network',
      enableNavigation: 'enable_navigation',
      enableVisitor: 'enable_visitor',
      enableError: 'enable_error',
      enableDocumentWrite: 'enable_document_write',
      enableWindowError: 'enable_window_error',
      enablePromiseRejection: 'enable_promise_rejection',
      errorSampleRate: 'error_sample_rate',
      networkSampleRate: 'network_sample_rate',
      consoleSampleRate: 'console_sample_rate',
      maxErrors: 'max_errors',
      maxLogs: 'max_logs',
      maxNetworkRequests: 'max_network_requests',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      metadata: 'metadata',
      customTags: 'custom_tags',
      ignoreMessages: 'ignore_messages',
      ignoreUrls: 'ignore_urls',
      excludeUrls: 'exclude_urls',
      includeUrls: 'include_urls',
      onError: 'on_error',
      onInstalled: 'on_installed'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'token',
        type: 'text',
        label: 'Token',
        placeholder: 'your-trackjs-token',
        required: true,
        size: 'medium',
        description: 'Your TrackJS token from Settings → Tokens.',
        validation: {
          pattern: /^[a-zA-Z0-9]+$/,
          message: 'Must be a valid TrackJS token'
        }
      },
      {
        name: 'application',
        type: 'text',
        label: 'Application Name',
        placeholder: 'e.g., production-app',
        required: false,
        size: 'medium',
        description: 'Application name for organizing errors.'
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
        name: 'sessionId',
        type: 'text',
        label: 'Session ID Field',
        placeholder: 'e.g., session.id',
        required: false,
        size: 'medium',
        description: 'JavaScript path to session ID.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'version',
        type: 'text',
        label: 'Application Version',
        placeholder: 'e.g., 1.0.0',
        required: false,
        size: 'medium',
        description: 'Your application version for error grouping.'
      },
      {
        name: 'environment',
        type: 'select',
        label: 'Environment',
        required: false,
        size: 'medium',
        description: 'Environment name for error filtering.',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
          { label: 'Development', value: 'development' },
          { label: 'QA', value: 'qa' }
        ],
        default: 'production'
      },
      {
        name: 'enableConsole',
        type: 'checkbox',
        label: 'Capture Console',
        default: true,
        size: 'medium',
        description: 'Record console logs, warnings, and errors.'
      },
      {
        name: 'enableNetwork',
        type: 'checkbox',
        label: 'Capture Network',
        default: true,
        size: 'medium',
        description: 'Record network requests and responses.'
      },
      {
        name: 'enableNavigation',
        type: 'checkbox',
        label: 'Capture Navigation',
        default: true,
        size: 'medium',
        description: 'Track page navigation and history.'
      },
      {
        name: 'enableVisitor',
        type: 'checkbox',
        label: 'Capture Visitor Data',
        default: true,
        size: 'medium',
        description: 'Record browser and device information.'
      },
      {
        name: 'enableError',
        type: 'checkbox',
        label: 'Capture Errors',
        default: true,
        size: 'medium',
        description: 'Record JavaScript errors (main feature).'
      },
      {
        name: 'enableDocumentWrite',
        type: 'checkbox',
        label: 'Capture Document Write',
        default: false,
        size: 'medium',
        description: 'Track document.write usage.'
      },
      {
        name: 'enableWindowError',
        type: 'checkbox',
        label: 'Window Error Handler',
        default: true,
        size: 'medium',
        description: 'Use window.onerror for error capture.'
      },
      {
        name: 'enablePromiseRejection',
        type: 'checkbox',
        label: 'Promise Rejection Handler',
        default: true,
        size: 'medium',
        description: 'Capture unhandled promise rejections.'
      },
      {
        name: 'errorSampleRate',
        type: 'number',
        label: 'Error Sample Rate (%)',
        placeholder: '100',
        required: false,
        size: 'medium',
        description: 'Percentage of errors to capture (1-100).',
        validation: {
          min: 1,
          max: 100
        },
        default: 100
      },
      {
        name: 'networkSampleRate',
        type: 'number',
        label: 'Network Sample Rate (%)',
        placeholder: '100',
        required: false,
        size: 'medium',
        description: 'Percentage of network requests to capture.',
        validation: {
          min: 1,
          max: 100
        },
        default: 100
      },
      {
        name: 'consoleSampleRate',
        type: 'number',
        label: 'Console Sample Rate (%)',
        placeholder: '100',
        required: false,
        size: 'medium',
        description: 'Percentage of console logs to capture.',
        validation: {
          min: 1,
          max: 100
        },
        default: 100
      },
      {
        name: 'maxErrors',
        type: 'number',
        label: 'Max Errors Per Minute',
        placeholder: '10',
        required: false,
        size: 'medium',
        description: 'Maximum errors to capture per minute.',
        validation: {
          min: 1,
          max: 100
        },
        default: 10
      },
      {
        name: 'maxLogs',
        type: 'number',
        label: 'Max Console Logs',
        placeholder: '100',
        required: false,
        size: 'medium',
        description: 'Maximum console logs to store.',
        validation: {
          min: 10,
          max: 1000
        },
        default: 100
      },
      {
        name: 'maxNetworkRequests',
        type: 'number',
        label: 'Max Network Requests',
        placeholder: '100',
        required: false,
        size: 'medium',
        description: 'Maximum network requests to store.',
        validation: {
          min: 10,
          max: 1000
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
        name: 'metadata',
        type: 'array',
        label: 'Custom Metadata',
        description: 'Additional metadata for errors (e.g., plan=premium, feature=checkout, browser=chrome).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., key=value',
          button_text: 'Add Metadata',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: key=value'
          }
        }
      },
      {
        name: 'customTags',
        type: 'array',
        label: 'Custom Tags',
        description: 'Tags for error grouping (e.g., critical, payment, authentication).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., tag-name',
          button_text: 'Add Tag',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z0-9-_]+$/,
            message: 'Must be alphanumeric with hyphens or underscores'
          }
        }
      },
      {
        name: 'ignoreMessages',
        type: 'array',
        label: 'Ignore Error Messages',
        description: 'Error messages to ignore (e.g., Script error, ResizeObserver loop limit).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., Error message pattern',
          button_text: 'Add Pattern',
          input_size: 'medium',
          button_size: 'small'
        }
      },
      {
        name: 'ignoreUrls',
        type: 'array',
        label: 'Ignore Script URLs',
        description: 'Script URLs to ignore errors from (e.g., chrome-extension://, third-party CDNs).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., chrome-extension://',
          button_text: 'Add URL',
          input_size: 'medium',
          button_size: 'small'
        }
      },
      {
        name: 'excludeUrls',
        type: 'array',
        label: 'Exclude Page URLs',
        description: 'Page URLs where TrackJS should not load (e.g., /admin/*, /test/*).',
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
        label: 'Include Only Page URLs',
        description: 'Load TrackJS only on matching URLs (leave empty for all pages).',
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
        name: 'onError',
        type: 'textarea',
        label: 'On Error Callback',
        placeholder: '// Function to handle errors before sending\n// payload parameter contains error data\n// Return false to prevent sending\n// Example: if (payload.message.includes("test")) return false;',
        required: false,
        size: 'full',
        description: 'JavaScript function to filter or modify errors.',
        rows: 4
      },
      {
        name: 'onInstalled',
        type: 'textarea',
        label: 'On Installed Callback',
        placeholder: '// Code to run when TrackJS is installed\n// trackjs object is available\n// Example: console.log("TrackJS ready");',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when TrackJS loads.',
        rows: 3
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[TrackJS] Skipping load in development environment');
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
                      console.log('[TrackJS] URL excluded by pattern:', pattern);
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
                  console.log('[TrackJS] URL not in include list');
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
      
      // Get user data
      var userId = getNestedProperty(window, '{{userId}}');
      var userEmail = getNestedProperty(window, '{{userEmail}}');
      var userName = getNestedProperty(window, '{{userName}}');
      var sessionId = getNestedProperty(window, '{{sessionId}}');
      
      // Initialize TrackJS configuration
      window._trackJs = {
          token: '{{token}}'
      };
      
      // Application settings
      var application = '{{application}}';
      if (application) {
          window._trackJs.application = application;
      }
      
      var version = '{{version}}';
      if (version) {
          window._trackJs.version = version;
      }
      
      var environment = '{{environment}}';
      if (environment) {
          window._trackJs.environment = environment;
      }
      
      // User data
      if (userId || userEmail || userName) {
          window._trackJs.userId = userId || userEmail || 'Anonymous';
          
          var customerData = {};
          if (userId) customerData.userId = userId;
          if (userEmail) customerData.email = userEmail;
          if (userName) customerData.name = userName;
          window._trackJs.customer = customerData;
      }
      
      // Session ID
      if (sessionId) {
          window._trackJs.sessionId = sessionId;
      }
      
      // Feature toggles
      window._trackJs.console = {
          enabled: {{enableConsole}},
          sampleRate: {{consoleSampleRate}} / 100 || 1
      };
      
      window._trackJs.network = {
          enabled: {{enableNetwork}},
          sampleRate: {{networkSampleRate}} / 100 || 1
      };
      
      window._trackJs.visitor = {
          enabled: {{enableVisitor}}
      };
      
      window._trackJs.navigation = {
          enabled: {{enableNavigation}}
      };
      
      window._trackJs.error = {
          enabled: {{enableError}},
          sampleRate: {{errorSampleRate}} / 100 || 1
      };
      
      // Error handling options
      window._trackJs.windowError = {{enableWindowError}};
      window._trackJs.promiseRejection = {{enablePromiseRejection}};
      window._trackJs.documentWrite = {{enableDocumentWrite}};
      
      // Limits
      var maxErrors = parseInt('{{maxErrors}}', 10);
      if (maxErrors) {
          window._trackJs.maxErrors = maxErrors;
      }
      
      var maxLogs = parseInt('{{maxLogs}}', 10);
      if (maxLogs) {
          window._trackJs.maxLogs = maxLogs;
      }
      
      var maxNetworkRequests = parseInt('{{maxNetworkRequests}}', 10);
      if (maxNetworkRequests) {
          window._trackJs.maxNetworkRequests = maxNetworkRequests;
      }
      
      // Custom metadata
      var metadataArray = [{{metadata}}] || [];
      var metadata = {};
      metadataArray.forEach(function(item) {
          if (typeof item === 'string' && item.includes('=')) {
              var parts = item.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  metadata[key] = value;
              }
          }
      });
      if (Object.keys(metadata).length > 0) {
          window._trackJs.metadata = metadata;
      }
      
      // Custom tags
      var customTagsArray = [{{customTags}}] || [];
      if (customTagsArray.length > 0) {
          window._trackJs.tags = customTagsArray;
      }
      
      // Ignore patterns
      var ignoreMessagesArray = [{{ignoreMessages}}] || [];
      if (ignoreMessagesArray.length > 0) {
          window._trackJs.ignoreMessages = ignoreMessagesArray;
      }
      
      var ignoreUrlsArray = [{{ignoreUrls}}] || [];
      if (ignoreUrlsArray.length > 0) {
          window._trackJs.ignoreUrls = ignoreUrlsArray;
      }
      
      // Error callback
      var onErrorCode = {{onError}};
      if (onErrorCode) {
          window._trackJs.onError = function(payload) {
              try {
                  return eval('(' + onErrorCode + ')')(payload);
              } catch (e) {
                  console.error('[TrackJS] Error in onError callback:', e);
                  return true; // Allow error to be sent
              }
          };
      }
      
      // Debug mode
      if ({{debugMode}}) {
          window._trackJs.debug = true;
          console.log('[TrackJS] Debug mode enabled');
          console.log('[TrackJS] Configuration:', window._trackJs);
      }
      
      // Load TrackJS
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn.trackjs.com/agent/v3/latest/t.js';
      
      script.onload = function() {
          if ({{debugMode}}) {
              console.log('[TrackJS] Script loaded successfully');
          }
          
          // Execute installed callback
          var onInstalledCallback = {{onInstalled}};
          if (onInstalledCallback) {
              try {
                  (function() {
                      eval(onInstalledCallback);
                  })();
              } catch (error) {
                  console.error('[TrackJS] Error in installed callback:', error);
              }
          }
          
          // Helper functions
          window.TrackJSAPI = {
              // Track custom error
              track: function(error) {
                  if (window.trackJs) {
                      window.trackJs.track(error);
                  }
              },
              
              // Add custom metadata
              addMetadata: function(key, value) {
                  if (window.trackJs) {
                      window.trackJs.addMetadata(key, value);
                  }
              },
              
              // Remove metadata
              removeMetadata: function(key) {
                  if (window.trackJs) {
                      window.trackJs.removeMetadata(key);
                  }
              },
              
              // Attempt operation with error tracking
              attempt: function(fn, context) {
                  if (window.trackJs) {
                      return window.trackJs.attempt(fn, context);
                  }
                  return fn.call(context);
              },
              
              // Watch function for errors
              watchAll: function(obj) {
                  if (window.trackJs) {
                      return window.trackJs.watchAll(obj);
                  }
                  return obj;
              },
              
              // Console API wrapper
              console: {
                  log: function() {
                      if (window.trackJs && window.trackJs.console) {
                          window.trackJs.console.log.apply(window.trackJs.console, arguments);
                      }
                  },
                  error: function() {
                      if (window.trackJs && window.trackJs.console) {
                          window.trackJs.console.error.apply(window.trackJs.console, arguments);
                      }
                  },
                  warn: function() {
                      if (window.trackJs && window.trackJs.console) {
                          window.trackJs.console.warn.apply(window.trackJs.console, arguments);
                      }
                  }
              }
          };
      };
      
      script.onerror = function() {
          console.error('[TrackJS] Failed to load script');
      };
      
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    })();`
  });

module.exports = trackjsTemplate;
