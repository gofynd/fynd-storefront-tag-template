/**
 * NotifyVisitors Template
 */

const createTemplate = require('../utils/createTemplate');

const notifyvisitorsTemplate = createTemplate({
  // Required keys
  name: 'NotifyVisitors',
  path: 'notifyvisitors',
  description: 'Multi-channel customer engagement platform with push, email, SMS, and on-site messaging.',
  template_id: '1019',
  template_version: '1.0.0',
  category: 'engagement',
  type: 'js',
  sub_type: 'inline',
  position: 'head',
  attributes: {
    async: 'true'
  },
  compatible_engines: ['react', 'vue2'],
  img: 'https://logo.clearbit.com/notifyvisitors.com',
  note: '**NotifyVisitors** provides multi-channel customer engagement including web push, email, SMS, on-site messages, and surveys. Find your Brand ID and Secret Key in Settings → Integration.',
  help_link: {
    text: 'Learn more about NotifyVisitors integration in the',
    url: 'https://www.notifyvisitors.com/integration',
    label: 'Documentation'
  },
  field_mappings: {
    brandId: 'brand_id',
    secretKey: 'secret_key',
    enableWebPush: 'enable_web_push',
    enableOnSiteMessage: 'enable_onsite_message',
    enableSurvey: 'enable_survey',
    enableHeatmap: 'enable_heatmap',
    enableSessionRecording: 'enable_session_recording',
    pushPromptDelay: 'push_prompt_delay',
    pushPromptType: 'push_prompt_type',
    cookieConsent: 'cookie_consent',
    hideDefaultPrompt: 'hide_default_prompt',
    customServiceWorkerPath: 'custom_service_worker_path',
    debugMode: 'debug_mode',
    enableInDevelopment: 'enable_in_development',
    userAttributes: 'user_attributes',
    eventAttributes: 'event_attributes',
    customTags: 'custom_tags'
  },
  layout: {
    columns: 2,
    gap: '24px'
  },
  fields: [
    {
      name: 'brandId',
      type: 'text',
      label: 'Brand ID',
      placeholder: 'YOUR_BRAND_ID',
      required: true,
      size: 'medium',
      description: 'Your NotifyVisitors Brand ID from Settings → Integration.',
      validation: {
        pattern: /^[0-9]{4,10}$/,
        message: 'Must be 4-10 numeric characters'
      }
    },
    {
      name: 'secretKey',
      type: 'text',
      label: 'Secret Key',
      placeholder: 'YOUR_SECRET_KEY',
      required: true,
      size: 'medium',
      description: 'Your NotifyVisitors Secret Key from Settings → Integration.',
      validation: {
        pattern: /^[a-zA-Z0-9]{20,50}$/,
        message: 'Must be 20-50 alphanumeric characters'
      }
    },
    {
      name: 'enableWebPush',
      type: 'checkbox',
      label: 'Enable Web Push Notifications',
      default: true,
      size: 'medium',
      description: 'Enable web push notification functionality.'
    },
    {
      name: 'enableOnSiteMessage',
      type: 'checkbox',
      label: 'Enable On-Site Messages',
      default: true,
      size: 'medium',
      description: 'Show on-site popups and messages.'
    },
    {
      name: 'enableSurvey',
      type: 'checkbox',
      label: 'Enable Surveys',
      default: true,
      size: 'medium',
      description: 'Enable survey and feedback collection.'
    },
    {
      name: 'enableHeatmap',
      type: 'checkbox',
      label: 'Enable Heatmaps',
      default: false,
      size: 'medium',
      description: 'Track and visualize user clicks and scrolls.'
    },
    {
      name: 'enableSessionRecording',
      type: 'checkbox',
      label: 'Enable Session Recording',
      default: false,
      size: 'medium',
      description: 'Record user sessions for analysis.'
    },
    {
      name: 'pushPromptDelay',
      type: 'number',
      label: 'Push Prompt Delay (seconds)',
      placeholder: '0',
      required: false,
      size: 'small',
      description: 'Delay before showing push permission prompt.',
      validation: {
        min: 0,
        max: 600,
        message: 'Must be between 0 and 600 seconds'
      },
      default: 0
    },
    {
      name: 'pushPromptType',
      type: 'select',
      label: 'Push Prompt Type',
      required: false,
      size: 'small',
      description: 'Style of push notification opt-in prompt.',
      options: [
        { label: 'Bell', value: 'bell' },
        { label: 'Box', value: 'box' },
        { label: 'Custom', value: 'custom' },
        { label: 'Native Only', value: 'native' }
      ],
      default: 'bell'
    },
    {
      name: 'cookieConsent',
      type: 'checkbox',
      label: 'Require Cookie Consent',
      default: false,
      size: 'medium',
      description: 'Wait for cookie consent before loading.'
    },
    {
      name: 'hideDefaultPrompt',
      type: 'checkbox',
      label: 'Hide Default Push Prompt',
      default: false,
      size: 'medium',
      description: 'Hide the default browser push prompt.'
    },
    {
      name: 'customServiceWorkerPath',
      type: 'text',
      label: 'Custom Service Worker Path',
      placeholder: '/sw.js',
      required: false,
      size: 'full',
      description: 'Path to custom service worker file (default: /service-worker.js).',
      validation: {
        pattern: /^\/[a-zA-Z0-9-_.\/]+\.js$/,
        message: 'Must be a valid JS file path starting with /'
      }
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
      description: 'Set user properties for targeting (e.g., name=John, email=john@example.com, plan=premium).',
      help_link: {
        url: 'https://www.notifyvisitors.com/documentation/user-attributes',
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
      name: 'eventAttributes',
      type: 'array',
      label: 'Event Attributes',
      description: 'Default attributes to include with all events (e.g., page_type=product, currency=USD).',
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
      name: 'customTags',
      type: 'array',
      label: 'User Tags',
      description: 'Tags to segment users (e.g., vip, newsletter_subscriber, early_adopter).',
      default: [],
      size: 'full',
      input_config: {
        type: 'text',
        placeholder: 'e.g., tag_name',
        button_text: 'Add Tag',
        input_size: 'medium',
        button_size: 'small',
        validation: {
          pattern: /^[a-zA-Z0-9_-]+$/,
          message: 'Must be alphanumeric with underscores or hyphens'
        }
      }
    }
  ],
  script: `(function() {
    // Skip loading in development if not enabled
    if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
        if ({{debugMode}}) {
            console.log('[NotifyVisitors] Skipping load in development environment');
        }
        return;
    }
    
    // Check for cookie consent if required
    if ({{cookieConsent}} && typeof window.cookieConsentGiven === 'function' && !window.cookieConsentGiven()) {
        if ({{debugMode}}) {
            console.log('[NotifyVisitors] Waiting for cookie consent');
        }
        return;
    }
    
    // NotifyVisitors configuration
    window.nv = window.nv || function () {
        (window.nv.q = window.nv.q || []).push(arguments);
    };
    
    nv('init', {
        brandID: '{{brandId}}',
        secretKey: '{{secretKey}}'
    });
    
    // Configure features
    var config = {
        push: {{enableWebPush}},
        onsite: {{enableOnSiteMessage}},
        survey: {{enableSurvey}},
        heatmap: {{enableHeatmap}},
        recording: {{enableSessionRecording}}
    };
    
    nv('config', config);
    
    // Configure push notifications
    if ({{enableWebPush}}) {
        var pushConfig = {
            promptType: '{{pushPromptType}}' || 'bell',
            hideNativePrompt: {{hideDefaultPrompt}},
            promptDelay: {{pushPromptDelay}} * 1000 || 0
        };
        
        // Custom service worker path
        var swPath = '{{customServiceWorkerPath}}';
        if (swPath) {
            pushConfig.serviceWorkerPath = swPath;
        }
        
        nv('push', pushConfig);
        
        if ({{debugMode}}) {
            console.log('[NotifyVisitors] Push config:', pushConfig);
        }
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
        nv('user', userAttrs);
        if ({{debugMode}}) {
            console.log('[NotifyVisitors] User attributes:', userAttrs);
        }
    }
    
    // Process custom tags
    var tagsArray = [{{customTags}}] || [];
    if (tagsArray.length > 0) {
        nv('tag', tagsArray);
        if ({{debugMode}}) {
            console.log('[NotifyVisitors] User tags:', tagsArray);
        }
    }
    
    // Process event attributes (global event properties)
    var eventAttrsArray = [{{eventAttributes}}] || [];
    var eventAttrs = {};
    eventAttrsArray.forEach(function(attr) {
        if (typeof attr === 'string' && attr.includes('=')) {
            var parts = attr.split('=');
            if (parts.length === 2) {
                var key = parts[0].trim();
                var value = parts[1].trim();
                // Convert to appropriate type
                if (value === 'true') value = true;
                else if (value === 'false') value = false;
                else if (!isNaN(value)) value = Number(value);
                eventAttrs[key] = value;
            }
        }
    });
    
    if (Object.keys(eventAttrs).length > 0) {
        // Set global event properties
        window.nvEventProperties = eventAttrs;
        
        // Override track method to include global properties
        var originalTrack = window.nv;
        window.nv = function() {
            if (arguments[0] === 'event' && arguments[1] && window.nvEventProperties) {
                // Merge global properties with event-specific properties
                arguments[2] = Object.assign({}, window.nvEventProperties, arguments[2] || {});
            }
            return originalTrack.apply(this, arguments);
        };
        // Preserve the queue
        window.nv.q = originalTrack.q;
        
        if ({{debugMode}}) {
            console.log('[NotifyVisitors] Global event attributes:', eventAttrs);
        }
    }
    
    // Track page view
    nv('event', 'page_view', {
        page_title: document.title,
        page_url: window.location.href,
        page_path: window.location.pathname
    });
    
    if ({{debugMode}}) {
        console.log('[NotifyVisitors] Initialized with Brand ID:', '{{brandId}}');
        console.log('[NotifyVisitors] Features enabled:', config);
    }
    
    // Load NotifyVisitors SDK
    (function() {
        var nv = document.createElement('script');
        nv.type = 'text/javascript';
        nv.async = true;
              nv.src = 'https://cdn.notifyvisitors.com/js/nv.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(nv, s);
  })();
})();`
});

module.exports = notifyvisitorsTemplate;
