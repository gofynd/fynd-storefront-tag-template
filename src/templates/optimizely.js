/**
 * Optimizely Template
 */

const createTemplate = require('../utils/createTemplate');

const optimizelyTemplate = createTemplate({
    // Required keys
    name: 'Optimizely',
    path: 'optimizely',
    description: 'A/B testing and experimentation platform for optimizing digital experiences.',
    template_id: '1020',
    template_version: '1.0.0',
    category: 'testing',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/optimizely.com',
    note: '**Optimizely** enables A/B testing, multivariate testing, and personalization experiments. Find your Project ID in Settings → Implementation.',
    help_link: {
      text: 'Learn more about Optimizely Web implementation in the',
      url: 'https://docs.developers.optimizely.com/web/docs/introduction',
      label: 'Developer Docs'
    },
    field_mappings: {
      projectId: 'project_id',
      snippetId: 'snippet_id',
      enableForLoggedInUsers: 'enable_for_logged_in_users',
      enableForAnonymousUsers: 'enable_for_anonymous_users',
      trackingPrefix: 'tracking_prefix',
      disableTracking: 'disable_tracking',
      hideAsyncErrors: 'hide_async_errors',
      optOut: 'opt_out',
      enableLocalhost: 'enable_localhost',
      enablePreview: 'enable_preview',
      enableEditMode: 'enable_edit_mode',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      userAttributes: 'user_attributes',
      customEvents: 'custom_events',
      audiences: 'audiences',
      activateExperiments: 'activate_experiments'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'projectId',
        type: 'text',
        label: 'Project ID',
        placeholder: 'YOUR_PROJECT_ID',
        required: true,
        size: 'medium',
        description: 'Your Optimizely Project ID from Settings → Implementation.',
        validation: {
          pattern: /^[0-9]{8,12}$/,
          message: 'Must be 8-12 numeric characters'
        }
      },
      {
        name: 'snippetId',
        type: 'text',
        label: 'Snippet ID (Optional)',
        placeholder: 'YOUR_SNIPPET_ID',
        required: false,
        size: 'medium',
        description: 'Custom snippet ID for specific environments.',
        validation: {
          pattern: /^[a-zA-Z0-9-_]+$/,
          message: 'Must be alphanumeric with hyphens or underscores'
        }
      },
      {
        name: 'enableForLoggedInUsers',
        type: 'checkbox',
        label: 'Enable for Logged-in Users',
        default: true,
        size: 'medium',
        description: 'Run experiments for authenticated users.'
      },
      {
        name: 'enableForAnonymousUsers',
        type: 'checkbox',
        label: 'Enable for Anonymous Users',
        default: true,
        size: 'medium',
        description: 'Run experiments for non-authenticated visitors.'
      },
      {
        name: 'trackingPrefix',
        type: 'text',
        label: 'Event Tracking Prefix',
        placeholder: 'optimizely_',
        required: false,
        size: 'medium',
        description: 'Prefix for all tracked events (e.g., optimizely_click).',
        validation: {
          pattern: /^[a-zA-Z0-9_-]+$/,
          message: 'Must be alphanumeric with underscores or hyphens'
        }
      },
      {
        name: 'disableTracking',
        type: 'checkbox',
        label: 'Disable Tracking',
        default: false,
        size: 'medium',
        description: 'Disable automatic event tracking.'
      },
      {
        name: 'hideAsyncErrors',
        type: 'checkbox',
        label: 'Hide Async Errors',
        default: true,
        size: 'medium',
        description: 'Suppress console errors from asynchronous operations.'
      },
      {
        name: 'optOut',
        type: 'checkbox',
        label: 'Opt Out by Default',
        default: false,
        size: 'medium',
        description: 'Users are opted out of experiments by default.'
      },
      {
        name: 'enableLocalhost',
        type: 'checkbox',
        label: 'Enable on Localhost',
        default: false,
        size: 'medium',
        description: 'Run experiments on localhost for testing.'
      },
      {
        name: 'enablePreview',
        type: 'checkbox',
        label: 'Enable Preview Mode',
        default: true,
        size: 'medium',
        description: 'Allow preview of experiments with URL parameters.'
      },
      {
        name: 'enableEditMode',
        type: 'checkbox',
        label: 'Enable Visual Editor',
        default: true,
        size: 'medium',
        description: 'Allow using Optimizely Visual Editor on this site.'
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
        description: 'Enable on development environments.'
      },
      {
        name: 'userAttributes',
        type: 'array',
        label: 'User Attributes',
        description: 'Set user attributes for targeting (e.g., plan=premium, country=US, age_group=25-34).',
        help_link: {
          url: 'https://docs.developers.optimizely.com/web/docs/targeting',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., key=value',
          button_text: 'Add Attribute',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: key=value'
          }
        }
      },
      {
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events to Track',
        description: 'Define custom events to track (e.g., signup_completed, item_purchased, video_watched).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., event_name',
          button_text: 'Add Event',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
            message: 'Must be alphanumeric with underscores'
          }
        }
      },
      {
        name: 'audiences',
        type: 'array',
        label: 'Audience IDs',
        description: 'Specific audience IDs to include in experiments.',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., 12345678',
          button_text: 'Add Audience',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[0-9]+$/,
            message: 'Must be numeric audience ID'
          }
        }
      },
      {
        name: 'activateExperiments',
        type: 'array',
        label: 'Auto-activate Experiments',
        description: 'Experiment IDs to automatically activate on page load.',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., 12345678',
          button_text: 'Add Experiment',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[0-9]+$/,
            message: 'Must be numeric experiment ID'
          }
        }
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && !{{enableLocalhost}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Optimizely] Skipping load in development environment');
          }
          return;
      }
      
      // Check user authentication status
      var isLoggedIn = typeof window.userIsLoggedIn === 'function' ? window.userIsLoggedIn() : false;
      
      if (isLoggedIn && !{{enableForLoggedInUsers}}) {
          if ({{debugMode}}) {
              console.log('[Optimizely] Skipping for logged-in user');
          }
          return;
      }
      
      if (!isLoggedIn && !{{enableForAnonymousUsers}}) {
          if ({{debugMode}}) {
              console.log('[Optimizely] Skipping for anonymous user');
          }
          return;
      }
      
      // Initialize Optimizely configuration
      window.optimizely = window.optimizely || [];
      
      // Set opt-out if configured
      if ({{optOut}}) {
          window.optimizely.push(['optOut', true]);
          if ({{debugMode}}) {
              console.log('[Optimizely] User opted out by default');
          }
      }
      
      // Disable tracking if configured
      if ({{disableTracking}}) {
          window.optimizely.push(['disable', true]);
          if ({{debugMode}}) {
              console.log('[Optimizely] Tracking disabled');
          }
      }
      
      // Hide async errors if configured
      if ({{hideAsyncErrors}}) {
          window.optimizely.push(['hideAsyncErrors', true]);
      }
      
      // Process user attributes
      var userAttrsArray = [{{userAttributes}}] || [];
      var userAttrs = {};
      userAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value)) value = Number(value);
                  userAttrs[key] = value;
              }
          }
      });
      
      if (Object.keys(userAttrs).length > 0) {
          window.optimizely.push(['user', {
              attributes: userAttrs
          }]);
          if ({{debugMode}}) {
              console.log('[Optimizely] User attributes:', userAttrs);
          }
      }
      
      // Process audiences
      var audiencesArray = [{{audiences}}] || [];
      if (audiencesArray.length > 0) {
          audiencesArray.forEach(function(audienceId) {
              window.optimizely.push(['audience', audienceId, true]);
          });
          if ({{debugMode}}) {
              console.log('[Optimizely] Audiences:', audiencesArray);
          }
      }
      
      // Track custom events
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          // Store for later use
          window.optimizelyCustomEvents = customEventsArray;
          
          // Helper function to track events
          window.trackOptimizelyEvent = function(eventName, eventData) {
              var prefix = '{{trackingPrefix}}' || '';
              var fullEventName = prefix + eventName;
              
              if (window.optimizelyCustomEvents.indexOf(eventName) !== -1) {
                  window.optimizely.push(['trackEvent', fullEventName, eventData]);
                  if ({{debugMode}}) {
                      console.log('[Optimizely] Tracked event:', fullEventName, eventData);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[Optimizely] Custom events configured:', customEventsArray);
          }
      }
      
      // Auto-activate experiments
      var experimentsArray = [{{activateExperiments}}] || [];
      if (experimentsArray.length > 0) {
          experimentsArray.forEach(function(experimentId) {
              window.optimizely.push(['activate', experimentId]);
          });
          if ({{debugMode}}) {
              console.log('[Optimizely] Auto-activated experiments:', experimentsArray);
          }
      }
      
      // Enable preview mode
      if ({{enablePreview}}) {
          window.optimizely.push(['enablePreview']);
      }
      
      // Enable edit mode
      if ({{enableEditMode}}) {
          window.optimizely.push(['enableEditor']);
      }
      
      // Track page activated event
      window.optimizely.push(['trackEvent', 'page_activated', {
          page_name: document.title,
          page_url: window.location.href,
          page_path: window.location.pathname
      }]);
      
      if ({{debugMode}}) {
          console.log('[Optimizely] Initialized with Project ID:', '{{projectId}}');
          console.log('[Optimizely] Configuration:', {
              enableForLoggedIn: {{enableForLoggedInUsers}},
              enableForAnonymous: {{enableForAnonymousUsers}},
              trackingPrefix: '{{trackingPrefix}}',
              disableTracking: {{disableTracking}},
              optOut: {{optOut}},
              enableLocalhost: {{enableLocalhost}},
              enablePreview: {{enablePreview}},
              enableEditMode: {{enableEditMode}}
          });
          
          // Enable debug logging
          window.optimizely.push(['setLogLevel', 'INFO']);
      }
      
      // Load Optimizely snippet
      (function() {
          var projectId = '{{projectId}}';
          var snippetId = '{{snippetId}}' || projectId;
          
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://cdn.optimizely.com/js/' + snippetId + '.js';
          
          var first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
      })();
    })();`
  });

module.exports = optimizelyTemplate;
