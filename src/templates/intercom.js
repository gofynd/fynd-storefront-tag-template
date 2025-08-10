/**
 * Intercom Template
 */

const createTemplate = require('../utils/createTemplate');

const intercomTemplate = createTemplate({
    // Required keys
    name: 'Intercom',
    path: 'intercom',
    description: 'Customer messaging platform for live chat, support, and engagement.',
    template_id: '1028',
    template_version: '1.0.0',
    category: 'engagement',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/intercom.com',
    note: '**Intercom** provides live chat, customer support, and marketing automation. Find your App ID in Settings → Installation → Web.',
    help_link: {
      text: 'Learn more about Intercom installation in the',
      url: 'https://developers.intercom.com/installing-intercom/docs/basic-javascript',
      label: 'Documentation'
    },
    field_mappings: {
      appId: 'app_id',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name',
      userCreatedAt: 'user_created_at',
      userPhone: 'user_phone',
      companyId: 'company_id',
      companyName: 'company_name',
      companyCreatedAt: 'company_created_at',
      companyPlan: 'company_plan',
      companyMonthlySpend: 'company_monthly_spend',
      hideDefaultLauncher: 'hide_default_launcher',
      customLauncherSelector: 'custom_launcher_selector',
      verticalPadding: 'vertical_padding',
      horizontalPadding: 'horizontal_padding',
      alignment: 'alignment',
      backgroundColor: 'background_color',
      actionColor: 'action_color',
      enableArticleSearch: 'enable_article_search',
      enableMessagesApi: 'enable_messages_api',
      enableUnreadCount: 'enable_unread_count',
      spaMode: 'spa_mode',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      userAttributes: 'user_attributes',
      companyAttributes: 'company_attributes',
      customEvents: 'custom_events',
      excludeUrls: 'exclude_urls',
      includeUrls: 'include_urls',
      onShow: 'on_show',
      onHide: 'on_hide',
      onUnreadCountChanged: 'on_unread_count_changed'
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
        placeholder: 'your_app_id',
        required: true,
        size: 'medium',
        description: 'Your Intercom App ID from Settings → Installation.',
        validation: {
          pattern: /^[a-zA-Z0-9_-]+$/,
          message: 'Must be a valid App ID'
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
        description: 'JavaScript path to user email (required for users).',
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
        name: 'userCreatedAt',
        type: 'text',
        label: 'User Created At Field',
        placeholder: 'e.g., user.created_at',
        required: false,
        size: 'medium',
        description: 'JavaScript path to user creation timestamp.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'userPhone',
        type: 'text',
        label: 'User Phone Field',
        placeholder: 'e.g., user.phone',
        required: false,
        size: 'medium',
        description: 'JavaScript path to user phone number.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'companyId',
        type: 'text',
        label: 'Company ID Field',
        placeholder: 'e.g., company.id',
        required: false,
        size: 'medium',
        description: 'JavaScript path to company ID.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'companyName',
        type: 'text',
        label: 'Company Name Field',
        placeholder: 'e.g., company.name',
        required: false,
        size: 'medium',
        description: 'JavaScript path to company name.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'companyCreatedAt',
        type: 'text',
        label: 'Company Created At Field',
        placeholder: 'e.g., company.created_at',
        required: false,
        size: 'medium',
        description: 'JavaScript path to company creation timestamp.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'companyPlan',
        type: 'text',
        label: 'Company Plan Field',
        placeholder: 'e.g., company.plan',
        required: false,
        size: 'medium',
        description: 'JavaScript path to company plan/tier.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'companyMonthlySpend',
        type: 'text',
        label: 'Company Monthly Spend Field',
        placeholder: 'e.g., company.monthly_spend',
        required: false,
        size: 'medium',
        description: 'JavaScript path to company monthly spend.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
      },
      {
        name: 'hideDefaultLauncher',
        type: 'checkbox',
        label: 'Hide Default Launcher',
        default: false,
        size: 'medium',
        description: 'Hide the default Intercom messenger launcher.'
      },
      {
        name: 'customLauncherSelector',
        type: 'text',
        label: 'Custom Launcher Selector',
        placeholder: 'e.g., #custom-intercom-button',
        required: false,
        size: 'medium',
        description: 'CSS selector for custom launcher element.',
        condition: (formData) => formData.hideDefaultLauncher === true
      },
      {
        name: 'alignment',
        type: 'select',
        label: 'Messenger Position',
        required: false,
        size: 'medium',
        description: 'Position of the messenger widget.',
        options: [
          { label: 'Bottom Right (Default)', value: 'right' },
          { label: 'Bottom Left', value: 'left' }
        ],
        default: 'right'
      },
      {
        name: 'verticalPadding',
        type: 'number',
        label: 'Vertical Padding',
        placeholder: '20',
        required: false,
        size: 'medium',
        description: 'Padding from bottom of screen (pixels).',
        validation: {
          min: 0,
          max: 200
        },
        default: 20
      },
      {
        name: 'horizontalPadding',
        type: 'number',
        label: 'Horizontal Padding',
        placeholder: '20',
        required: false,
        size: 'medium',
        description: 'Padding from side of screen (pixels).',
        validation: {
          min: 0,
          max: 200
        },
        default: 20
      },
      {
        name: 'backgroundColor',
        type: 'text',
        label: 'Background Color',
        placeholder: '#0084ff',
        required: false,
        size: 'medium',
        description: 'Messenger background color (hex).',
        validation: {
          pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          message: 'Must be a valid hex color'
        }
      },
      {
        name: 'actionColor',
        type: 'text',
        label: 'Action Color',
        placeholder: '#0084ff',
        required: false,
        size: 'medium',
        description: 'Color for buttons and links (hex).',
        validation: {
          pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          message: 'Must be a valid hex color'
        }
      },
      {
        name: 'enableArticleSearch',
        type: 'checkbox',
        label: 'Enable Article Search',
        default: true,
        size: 'medium',
        description: 'Show help center article search in messenger.'
      },
      {
        name: 'enableMessagesApi',
        type: 'checkbox',
        label: 'Enable Messages API',
        default: false,
        size: 'medium',
        description: 'Enable programmatic message display.'
      },
      {
        name: 'enableUnreadCount',
        type: 'checkbox',
        label: 'Enable Unread Count',
        default: false,
        size: 'medium',
        description: 'Track unread message count.'
      },
      {
        name: 'spaMode',
        type: 'checkbox',
        label: 'SPA Mode',
        default: false,
        size: 'medium',
        description: 'Enable Single Page Application mode.'
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
        name: 'userAttributes',
        type: 'array',
        label: 'User Attributes',
        description: 'Custom user attributes (e.g., role=admin, plan=premium, team_size=50).',
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
        name: 'companyAttributes',
        type: 'array',
        label: 'Company Attributes',
        description: 'Custom company attributes (e.g., industry=SaaS, size=enterprise, region=US).',
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
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Events to track (e.g., purchased_item, completed_onboarding, invited_team_member).',
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
        description: 'URL patterns where Intercom should not load (e.g., /admin/*, /api/*).',
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
        description: 'Load Intercom only on matching URLs (leave empty for all pages).',
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
        name: 'onShow',
        type: 'textarea',
        label: 'On Show Callback',
        placeholder: '// Code to run when messenger is shown\n// Example: console.log("Messenger opened");',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when messenger opens.',
        rows: 3
      },
      {
        name: 'onHide',
        type: 'textarea',
        label: 'On Hide Callback',
        placeholder: '// Code to run when messenger is hidden\n// Example: console.log("Messenger closed");',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when messenger closes.',
        rows: 3
      },
      {
        name: 'onUnreadCountChanged',
        type: 'textarea',
        label: 'On Unread Count Changed',
        placeholder: '// Code to run when unread count changes\n// unreadCount variable is available\n// Example: document.title = "(" + unreadCount + ") " + document.title;',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when unread message count changes.',
        rows: 3,
        condition: (formData) => formData.enableUnreadCount === true
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Intercom] Skipping load in development environment');
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
                      console.log('[Intercom] URL excluded by pattern:', pattern);
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
                  console.log('[Intercom] URL not in include list');
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
      
      // Get user and company data
      var userId = getNestedProperty(window, '{{userId}}');
      var userEmail = getNestedProperty(window, '{{userEmail}}');
      var userName = getNestedProperty(window, '{{userName}}');
      var userCreatedAt = getNestedProperty(window, '{{userCreatedAt}}');
      var userPhone = getNestedProperty(window, '{{userPhone}}');
      var companyId = getNestedProperty(window, '{{companyId}}');
      var companyName = getNestedProperty(window, '{{companyName}}');
      var companyCreatedAt = getNestedProperty(window, '{{companyCreatedAt}}');
      var companyPlan = getNestedProperty(window, '{{companyPlan}}');
      var companyMonthlySpend = getNestedProperty(window, '{{companyMonthlySpend}}');
      
      // Initialize Intercom settings
      window.intercomSettings = {
          app_id: '{{appId}}'
      };
      
      // Add user data
      if (userId || userEmail) {
          if (userId) window.intercomSettings.user_id = userId;
          if (userEmail) window.intercomSettings.email = userEmail;
          if (userName) window.intercomSettings.name = userName;
          if (userPhone) window.intercomSettings.phone = userPhone;
          
          // Convert created_at to Unix timestamp if it's a date
          if (userCreatedAt) {
              var timestamp = userCreatedAt;
              if (typeof userCreatedAt === 'string' || userCreatedAt instanceof Date) {
                  timestamp = Math.floor(new Date(userCreatedAt).getTime() / 1000);
              }
              window.intercomSettings.created_at = timestamp;
          }
      }
      
      // Add company data
      if (companyId || companyName) {
          window.intercomSettings.company = {};
          if (companyId) window.intercomSettings.company.id = companyId;
          if (companyName) window.intercomSettings.company.name = companyName;
          if (companyPlan) window.intercomSettings.company.plan = companyPlan;
          if (companyMonthlySpend) window.intercomSettings.company.monthly_spend = companyMonthlySpend;
          
          // Convert created_at to Unix timestamp if it's a date
          if (companyCreatedAt) {
              var timestamp = companyCreatedAt;
              if (typeof companyCreatedAt === 'string' || companyCreatedAt instanceof Date) {
                  timestamp = Math.floor(new Date(companyCreatedAt).getTime() / 1000);
              }
              window.intercomSettings.company.created_at = timestamp;
          }
      }
      
      // Add user attributes
      var userAttrsArray = [{{userAttributes}}] || [];
      userAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  window.intercomSettings[key] = value;
              }
          }
      });
      
      // Add company attributes
      var companyAttrsArray = [{{companyAttributes}}] || [];
      if (companyAttrsArray.length > 0 && window.intercomSettings.company) {
          companyAttrsArray.forEach(function(attr) {
              if (typeof attr === 'string' && attr.includes('=')) {
                  var parts = attr.split('=');
                  if (parts.length === 2) {
                      var key = parts[0].trim();
                      var value = parts[1].trim();
                      window.intercomSettings.company[key] = value;
                  }
              }
          });
      }
      
      // Messenger configuration
      if ({{hideDefaultLauncher}}) {
          window.intercomSettings.hide_default_launcher = true;
      }
      
      var alignment = '{{alignment}}';
      if (alignment) {
          window.intercomSettings.alignment = alignment;
      }
      
      var verticalPadding = parseInt('{{verticalPadding}}', 10);
      if (!isNaN(verticalPadding)) {
          window.intercomSettings.vertical_padding = verticalPadding;
      }
      
      var horizontalPadding = parseInt('{{horizontalPadding}}', 10);
      if (!isNaN(horizontalPadding)) {
          window.intercomSettings.horizontal_padding = horizontalPadding;
      }
      
      var backgroundColor = '{{backgroundColor}}';
      if (backgroundColor) {
          window.intercomSettings.background_color = backgroundColor;
      }
      
      var actionColor = '{{actionColor}}';
      if (actionColor) {
          window.intercomSettings.action_color = actionColor;
      }
      
      // Features
      window.intercomSettings.article_search = {{enableArticleSearch}};
      if ({{enableMessagesApi}}) {
          window.intercomSettings.api_base = 'https://api-iam.intercom.io';
      }
      
      // Debug mode
      if ({{debugMode}}) {
          console.log('[Intercom] Debug mode enabled');
          console.log('[Intercom] Settings:', window.intercomSettings);
      }
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      
      // Load Intercom
      (function(){
          var w = window;
          var ic = w.Intercom;
          if (typeof ic === "function") {
              ic('reattach_activator');
              ic('update', w.intercomSettings);
          } else {
              var d = document;
              var i = function() {
                  i.c(arguments);
              };
              i.q = [];
              i.c = function(args) {
                  i.q.push(args);
              };
              w.Intercom = i;
              
              var l = function() {
                  var s = d.createElement('script');
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = 'https://widget.intercom.io/widget/{{appId}}';
                  var x = d.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s, x);
              };
              
              if (document.readyState === 'complete') {
                  l();
              } else if (w.attachEvent) {
                  w.attachEvent('onload', l);
              } else {
                  w.addEventListener('load', l, false);
              }
          }
      })();
      
      // Set up callbacks
      if ({{enableUnreadCount}}) {
          Intercom('onUnreadCountChanged', function(unreadCount) {
              var onUnreadCountChangedCallback = {{onUnreadCountChanged}};
              if (onUnreadCountChangedCallback) {
                  try {
                      (function(unreadCount) {
                          eval(onUnreadCountChangedCallback);
                      })(unreadCount);
                  } catch (error) {
                      console.error('[Intercom] Error in onUnreadCountChanged callback:', error);
                  }
              }
          });
      }
      
      Intercom('onShow', function() {
          var onShowCallback = {{onShow}};
          if (onShowCallback) {
              try {
                  (function() {
                      eval(onShowCallback);
                  })();
              } catch (error) {
                  console.error('[Intercom] Error in onShow callback:', error);
              }
          }
      });
      
      Intercom('onHide', function() {
          var onHideCallback = {{onHide}};
          if (onHideCallback) {
              try {
                  (function() {
                      eval(onHideCallback);
                  })();
              } catch (error) {
                  console.error('[Intercom] Error in onHide callback:', error);
              }
          }
      });
      
      // Custom launcher
      if ({{hideDefaultLauncher}}) {
          var customSelector = '{{customLauncherSelector}}';
          if (customSelector) {
              document.addEventListener('click', function(e) {
                  if (e.target.matches(customSelector) || e.target.closest(customSelector)) {
                      e.preventDefault();
                      Intercom('show');
                  }
              });
          }
      }
      
      // Helper functions
      window.IntercomAPI = {
          // Show messenger
          show: function() {
              Intercom('show');
          },
          
          // Hide messenger
          hide: function() {
              Intercom('hide');
          },
          
          // Update user data
          update: function(data) {
              Intercom('update', data);
          },
          
          // Track custom event
          trackEvent: function(eventName, metadata) {
              if (customEventsArray.indexOf(eventName) !== -1 || customEventsArray.length === 0) {
                  Intercom('trackEvent', eventName, metadata);
                  if ({{debugMode}}) {
                      console.log('[Intercom] Event tracked:', eventName, metadata);
                  }
              }
          },
          
          // Show new message
          showNewMessage: function(message) {
              if ({{enableMessagesApi}}) {
                  Intercom('showNewMessage', message);
              }
          },
          
          // Start tour
          startTour: function(tourId) {
              Intercom('startTour', tourId);
          },
          
          // Shutdown and clean up
          shutdown: function() {
              Intercom('shutdown');
          },
          
          // Boot with new user
          boot: function(userData) {
              Intercom('boot', userData);
          }
      };
      
      // SPA mode - handle route changes
      if ({{spaMode}}) {
          if ({{debugMode}}) {
              console.log('[Intercom] SPA mode enabled');
          }
          
          // Track route changes
          if (window.history && window.history.pushState) {
              var originalPushState = window.history.pushState;
              window.history.pushState = function() {
                  originalPushState.apply(window.history, arguments);
                  setTimeout(function() {
                      Intercom('update');
                  }, 100);
              };
          }
          
          // Handle popstate for back/forward navigation
          window.addEventListener('popstate', function() {
              setTimeout(function() {
                  Intercom('update');
              }, 100);
          });
      }
    })();`
  });

module.exports = intercomTemplate;
