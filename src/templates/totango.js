/**
 * Totango Template
 */

const createTemplate = require('../utils/createTemplate');

const totangoTemplate = createTemplate({
    // Required keys
    name: 'Totango',
    path: 'totango',
    description: 'Customer success platform for tracking product adoption, user behavior, and health scores.',
    template_id: '1027',
    template_version: '1.0.0',
    category: 'analytics',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/totango.com',
    note: '**Totango** provides customer success analytics, health scoring, and engagement tracking. Find your Service ID in Settings → General → Tracking Code.',
    help_link: {
      text: 'Learn more about Totango implementation in the',
      url: 'https://support.totango.com/hc/en-us/articles/360000842323-Tracking-Code-Implementation',
      label: 'Documentation'
    },
    field_mappings: {
      serviceId: 'service_id',
      accountId: 'account_id',
      accountName: 'account_name',
      userId: 'user_id',
      userName: 'user_name',
      userEmail: 'user_email',
      trackPageViews: 'track_page_views',
      trackClicks: 'track_clicks',
      trackTime: 'track_time',
      enableAnonymous: 'enable_anonymous',
      enableAutoAccount: 'enable_auto_account',
      enableAutoUser: 'enable_auto_user',
      dataCenter: 'data_center',
      spaMode: 'spa_mode',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      accountAttributes: 'account_attributes',
      userAttributes: 'user_attributes',
      customEvents: 'custom_events',
      excludeUrls: 'exclude_urls',
      includeUrls: 'include_urls',
      modules: 'modules',
      lifecycle: 'lifecycle',
      contractValue: 'contract_value',
      renewalDate: 'renewal_date',
      onReady: 'on_ready',
      onError: 'on_error'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'serviceId',
        type: 'text',
        label: 'Service ID',
        placeholder: 'SP-XXXXX-XX',
        required: true,
        size: 'medium',
        description: 'Your Totango Service ID from the tracking code.',
        validation: {
          pattern: /^SP-[A-Z0-9]{5}-[A-Z0-9]{2}$/,
          message: 'Must be in format: SP-XXXXX-XX'
        }
      },
      {
        name: 'accountId',
        type: 'text',
        label: 'Account ID Field',
        placeholder: 'e.g., company.id',
        required: false,
        size: 'medium',
        description: 'JavaScript path to account ID (e.g., user.company.id).',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'accountName',
        type: 'text',
        label: 'Account Name Field',
        placeholder: 'e.g., company.name',
        required: false,
        size: 'medium',
        description: 'JavaScript path to account name.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
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
        name: 'trackPageViews',
        type: 'checkbox',
        label: 'Track Page Views',
        default: true,
        size: 'medium',
        description: 'Automatically track all page views.'
      },
      {
        name: 'trackClicks',
        type: 'checkbox',
        label: 'Track Clicks',
        default: false,
        size: 'medium',
        description: 'Automatically track click events.'
      },
      {
        name: 'trackTime',
        type: 'checkbox',
        label: 'Track Time on Page',
        default: true,
        size: 'medium',
        description: 'Track time spent on each page.'
      },
      {
        name: 'enableAnonymous',
        type: 'checkbox',
        label: 'Enable Anonymous Tracking',
        default: false,
        size: 'medium',
        description: 'Track anonymous users without account/user info.'
      },
      {
        name: 'enableAutoAccount',
        type: 'checkbox',
        label: 'Auto-create Accounts',
        default: true,
        size: 'medium',
        description: 'Automatically create accounts when new ones are detected.'
      },
      {
        name: 'enableAutoUser',
        type: 'checkbox',
        label: 'Auto-create Users',
        default: true,
        size: 'medium',
        description: 'Automatically create users when new ones are detected.'
      },
      {
        name: 'dataCenter',
        type: 'select',
        label: 'Data Center',
        required: false,
        size: 'medium',
        description: 'Select your Totango data center region.',
        options: [
          { label: 'US (Default)', value: 'us' },
          { label: 'Europe (EU)', value: 'eu' },
          { label: 'Asia Pacific', value: 'apac' }
        ],
        default: 'us'
      },
      {
        name: 'spaMode',
        type: 'checkbox',
        label: 'SPA Mode',
        default: false,
        size: 'medium',
        description: 'Enable Single Page Application mode for route tracking.'
      },
      {
        name: 'contractValue',
        type: 'text',
        label: 'Contract Value Field',
        placeholder: 'e.g., account.contract_value',
        required: false,
        size: 'medium',
        description: 'JavaScript path to contract value.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'renewalDate',
        type: 'text',
        label: 'Renewal Date Field',
        placeholder: 'e.g., account.renewal_date',
        required: false,
        size: 'medium',
        description: 'JavaScript path to renewal date (ISO format).',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'lifecycle',
        type: 'select',
        label: 'Default Lifecycle Stage',
        required: false,
        size: 'medium',
        description: 'Default customer lifecycle stage.',
        options: [
          { label: 'Free Trial', value: 'free-trial' },
          { label: 'New', value: 'new' },
          { label: 'Active', value: 'active' },
          { label: 'At Risk', value: 'at-risk' },
          { label: 'Engaged', value: 'engaged' },
          { label: 'Expired', value: 'expired' }
        ],
        default: 'new'
      },
      {
        name: 'debugMode',
        type: 'checkbox',
        label: 'Debug Mode',
        default: false,
        size: 'medium',
        description: 'Enable console logging and debug info.'
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
        name: 'accountAttributes',
        type: 'array',
        label: 'Account Attributes',
        description: 'Custom account attributes (e.g., industry=SaaS, tier=enterprise, employees=500).',
        help_link: {
          url: 'https://support.totango.com/hc/en-us/articles/360000839563',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., attribute=value',
          button_text: 'Add Attribute',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: attribute=value'
          }
        }
      },
      {
        name: 'userAttributes',
        type: 'array',
        label: 'User Attributes',
        description: 'Custom user attributes (e.g., role=admin, department=sales, seniority=manager).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., attribute=value',
          button_text: 'Add Attribute',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: attribute=value'
          }
        }
      },
      {
        name: 'modules',
        type: 'array',
        label: 'Product Modules',
        description: 'Product modules/features to track (e.g., dashboard, reports, api, integrations).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., module-name',
          button_text: 'Add Module',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z0-9-_]+$/,
            message: 'Must be alphanumeric with hyphens or underscores'
          }
        }
      },
      {
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Events to track (e.g., feature_used, milestone_reached, integration_connected).',
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
        description: 'URL patterns to exclude from tracking (e.g., /admin/*, /api/*).',
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
        description: 'Track only matching URLs (leave empty for all pages).',
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
        name: 'onReady',
        type: 'textarea',
        label: 'On Ready Callback',
        placeholder: '// Code to run when Totango is ready\n// window.totango_old is available',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when Totango is loaded.',
        rows: 3
      },
      {
        name: 'onError',
        type: 'textarea',
        label: 'On Error Callback',
        placeholder: '// Code to run on tracking errors\n// error object is available',
        required: false,
        size: 'full',
        description: 'JavaScript to execute on tracking errors.',
        rows: 3
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Totango] Skipping load in development environment');
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
                      console.log('[Totango] URL excluded by pattern:', pattern);
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
                  console.log('[Totango] URL not in include list');
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
      
      // Get user and account data
      var accountId = getNestedProperty(window, '{{accountId}}');
      var accountName = getNestedProperty(window, '{{accountName}}');
      var userId = getNestedProperty(window, '{{userId}}');
      var userName = getNestedProperty(window, '{{userName}}');
      var userEmail = getNestedProperty(window, '{{userEmail}}');
      var contractValue = getNestedProperty(window, '{{contractValue}}');
      var renewalDate = getNestedProperty(window, '{{renewalDate}}');
      
      // Initialize Totango configuration
      window.totango_options = {
          service_id: '{{serviceId}}',
          disable_heartbeat: !{{trackTime}},
          track_pageviews: {{trackPageViews}},
          track_clicks: {{trackClicks}},
          allow_empty_accounts: {{enableAnonymous}},
          auto_create_account: {{enableAutoAccount}},
          auto_create_user: {{enableAutoUser}}
      };
      
      // Set data center
      var dataCenter = '{{dataCenter}}';
      if (dataCenter === 'eu') {
          window.totango_options.tracker_url = 'https://tracker-eu.totango.com';
      } else if (dataCenter === 'apac') {
          window.totango_options.tracker_url = 'https://tracker-apac.totango.com';
      }
      
      // Set account information
      if (accountId || accountName) {
          window.totango_options.account = {
              id: accountId || 'Unknown',
              name: accountName || accountId || 'Unknown Account'
          };
          
          // Add contract value if available
          if (contractValue) {
              window.totango_options.account.contract_value = contractValue;
          }
          
          // Add renewal date if available
          if (renewalDate) {
              window.totango_options.account.renewal_date = renewalDate;
          }
          
          // Add lifecycle stage
          var lifecycle = '{{lifecycle}}';
          if (lifecycle) {
              window.totango_options.account.lifecycle_stage = lifecycle;
          }
      }
      
      // Set user information
      if (userId || userName || userEmail) {
          window.totango_options.user = {
              id: userId || userEmail || 'Unknown',
              name: userName,
              email: userEmail
          };
      }
      
      // Process account attributes
      var accountAttrsArray = [{{accountAttributes}}] || [];
      accountAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  window.totango_options.account = window.totango_options.account || {};
                  window.totango_options.account[key] = value;
              }
          }
      });
      
      // Process user attributes
      var userAttrsArray = [{{userAttributes}}] || [];
      userAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  window.totango_options.user = window.totango_options.user || {};
                  window.totango_options.user[key] = value;
              }
          }
      });
      
      // Process modules
      var modulesArray = [{{modules}}] || [];
      if (modulesArray.length > 0) {
          window.totango_options.modules = modulesArray;
      }
      
      // Debug mode
      if ({{debugMode}}) {
          window.totango_options.debug = true;
          console.log('[Totango] Debug mode enabled');
          console.log('[Totango] Configuration:', window.totango_options);
      }
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          window.totangoCustomEvents = customEventsArray;
          
          // Helper function to track custom events
          window.trackTotangoEvent = function(eventName, module, attributes) {
              if (window.totangoCustomEvents.indexOf(eventName) !== -1 && window.totango_old) {
                  var eventData = {
                      'event': eventName,
                      'module': module || 'general'
                  };
                  
                  // Add custom attributes
                  if (attributes && typeof attributes === 'object') {
                      Object.keys(attributes).forEach(function(key) {
                          eventData[key] = attributes[key];
                      });
                  }
                  
                  window.totango_old.track(eventData);
                  
                  if ({{debugMode}}) {
                      console.log('[Totango] Event tracked:', eventName, eventData);
                  }
              }
          };
          
          // Helper for module usage
          window.trackModuleUsage = function(moduleName, action) {
              if (window.totango_old) {
                  window.totango_old.track({
                      'module': moduleName,
                      'action': action || 'used',
                      'timestamp': new Date().toISOString()
                  });
                  
                  if ({{debugMode}}) {
                      console.log('[Totango] Module usage tracked:', moduleName, action);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[Totango] Custom events configured:', customEventsArray);
          }
      }
      
      // Helper functions
      window.TotangoAPI = {
          // Identify user
          identify: function(userId, userData) {
              if (window.totango_old) {
                  window.totango_old.identify(userId, userData);
              }
          },
          
          // Set account
          setAccount: function(accountId, accountData) {
              if (window.totango_old) {
                  window.totango_old.setAccount(accountId, accountData);
              }
          },
          
          // Track activity
          track: function(activity) {
              if (window.totango_old) {
                  window.totango_old.track(activity);
              }
          },
          
          // Update user attributes
          updateUser: function(attributes) {
              if (window.totango_old && window.totango_options.user) {
                  Object.assign(window.totango_options.user, attributes);
                  window.totango_old.identify(window.totango_options.user.id, window.totango_options.user);
              }
          },
          
          // Update account attributes
          updateAccount: function(attributes) {
              if (window.totango_old && window.totango_options.account) {
                  Object.assign(window.totango_options.account, attributes);
                  window.totango_old.setAccount(window.totango_options.account.id, window.totango_options.account);
              }
          }
      };
      
      // Load Totango script
      (function() {
          window.totango_old = window.totango;
          
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = '//cdn.totango.com/totango4.js';
          
          script.onload = function() {
              if ({{debugMode}}) {
                  console.log('[Totango] Script loaded successfully');
              }
              
              // Execute ready callback
              var onReadyCallback = {{onReady}};
              if (onReadyCallback) {
                  try {
                      (function() {
                          eval(onReadyCallback);
                      })();
                  } catch (error) {
                      console.error('[Totango] Error in ready callback:', error);
                  }
              }
              
              // Handle SPA mode
              if ({{spaMode}}) {
                  // Track route changes for SPAs
                  if (window.history && window.history.pushState) {
                      var originalPushState = window.history.pushState;
                      window.history.pushState = function() {
                          originalPushState.apply(window.history, arguments);
                          if (window.totango_old && {{trackPageViews}}) {
                              setTimeout(function() {
                                  window.totango_old.track({
                                      'event': 'page_view',
                                      'page': window.location.pathname,
                                      'title': document.title
                                  });
                              }, 100);
                          }
                      };
                  }
                  
                  // Also handle popstate for back/forward navigation
                  window.addEventListener('popstate', function() {
                      if (window.totango_old && {{trackPageViews}}) {
                          setTimeout(function() {
                              window.totango_old.track({
                                  'event': 'page_view',
                                  'page': window.location.pathname,
                                  'title': document.title
                              });
                          }, 100);
                      }
                  });
              }
          };
          
          script.onerror = function() {
              console.error('[Totango] Failed to load script');
              
              // Execute error callback
              var onErrorCallback = {{onError}};
              if (onErrorCallback) {
                  try {
                      (function(error) {
                          eval(onErrorCallback);
                      })({message: 'Failed to load Totango script'});
                  } catch (err) {
                      console.error('[Totango] Error in error callback:', err);
                  }
              }
          };
          
          var first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
      })();
    })();`
  }});

module.exports = totangoTemplate;
