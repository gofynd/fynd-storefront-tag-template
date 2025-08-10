/**
 * Qualaroo Template
 */

const createTemplate = require('../utils/createTemplate');

const qualarooTemplate = createTemplate({
    // Required keys
    name: 'Qualaroo',
    path: 'qualaroo',
    description: 'Customer feedback platform for surveys, NPS, and user research insights.',
    template_id: '1023',
    template_version: '1.0.0',
    category: 'feedback',
    type: 'js',
    sub_type: 'inline',
    position: 'body-bottom',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/qualaroo.com',
    note: '**Qualaroo** provides targeted surveys, NPS feedback, exit intent surveys, and user research tools. Find your Site ID in Install Code section.',
    help_link: {
      text: 'Learn more about Qualaroo implementation in the',
      url: 'https://help.qualaroo.com/hc/en-us/articles/201969437-How-to-Install-Qualaroo-on-Your-Website',
      label: 'Documentation'
    },
    field_mappings: {
      siteId: 'site_id',
      enableOnAllPages: 'enable_on_all_pages',
      disableAutoTargeting: 'disable_auto_targeting',
      cookieDomain: 'cookie_domain',
      cookieSecure: 'cookie_secure',
      showOnMobile: 'show_on_mobile',
      showOnDesktop: 'show_on_desktop',
      language: 'language',
      position: 'position',
      minimizeDelay: 'minimize_delay',
      hideOnFormPages: 'hide_on_form_pages',
      samplingRate: 'sampling_rate',
      privacyMode: 'privacy_mode',
      disableCookies: 'disable_cookies',
      enableGDPR: 'enable_gdpr',
      customUserId: 'custom_user_id',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      userProperties: 'user_properties',
      customVariables: 'custom_variables',
      pageTargeting: 'page_targeting',
      excludePages: 'exclude_pages',
      customEvents: 'custom_events',
      integrations: 'integrations'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'siteId',
        type: 'text',
        label: 'Site ID',
        placeholder: 'YOUR_SITE_ID',
        required: true,
        size: 'medium',
        description: 'Your Qualaroo Site ID from Install Code section.',
        validation: {
          pattern: /^[0-9]{5,10}$/,
          message: 'Must be 5-10 digit numeric ID'
        }
      },
      {
        name: 'enableOnAllPages',
        type: 'checkbox',
        label: 'Enable on All Pages',
        default: true,
        size: 'medium',
        description: 'Load Qualaroo on all pages of your site.'
      },
      {
        name: 'disableAutoTargeting',
        type: 'checkbox',
        label: 'Disable Auto-Targeting',
        default: false,
        size: 'medium',
        description: 'Disable automatic survey targeting rules.'
      },
      {
        name: 'showOnMobile',
        type: 'checkbox',
        label: 'Show on Mobile',
        default: true,
        size: 'medium',
        description: 'Display surveys on mobile devices.'
      },
      {
        name: 'showOnDesktop',
        type: 'checkbox',
        label: 'Show on Desktop',
        default: true,
        size: 'medium',
        description: 'Display surveys on desktop devices.'
      },
      {
        name: 'language',
        type: 'select',
        label: 'Default Language',
        required: false,
        size: 'medium',
        description: 'Default language for surveys.',
        options: [
          { label: 'Auto-detect', value: 'auto' },
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
          { label: 'German', value: 'de' },
          { label: 'Portuguese', value: 'pt' },
          { label: 'Italian', value: 'it' },
          { label: 'Dutch', value: 'nl' },
          { label: 'Japanese', value: 'ja' },
          { label: 'Chinese', value: 'zh' }
        ],
        default: 'auto'
      },
      {
        name: 'position',
        type: 'select',
        label: 'Default Position',
        required: false,
        size: 'medium',
        description: 'Default position for surveys.',
        options: [
          { label: 'Bottom Right', value: 'bottom-right' },
          { label: 'Bottom Left', value: 'bottom-left' },
          { label: 'Top Right', value: 'top-right' },
          { label: 'Top Left', value: 'top-left' },
          { label: 'Center', value: 'center' }
        ],
        default: 'bottom-right'
      },
      {
        name: 'minimizeDelay',
        type: 'number',
        label: 'Auto-minimize Delay (seconds)',
        placeholder: '0',
        required: false,
        size: 'small',
        description: 'Auto-minimize surveys after X seconds (0 = disabled).',
        validation: {
          min: 0,
          max: 300,
          message: 'Must be between 0 and 300 seconds'
        },
        default: 0
      },
      {
        name: 'samplingRate',
        type: 'number',
        label: 'Sampling Rate (%)',
        placeholder: '100',
        required: false,
        size: 'small',
        description: 'Percentage of visitors to show surveys to.',
        validation: {
          min: 1,
          max: 100,
          message: 'Must be between 1 and 100'
        },
        default: 100
      },
      {
        name: 'hideOnFormPages',
        type: 'checkbox',
        label: 'Hide on Form Pages',
        default: false,
        size: 'medium',
        description: 'Automatically hide surveys on pages with forms.'
      },
      {
        name: 'privacyMode',
        type: 'checkbox',
        label: 'Privacy Mode',
        default: false,
        size: 'medium',
        description: 'Enable enhanced privacy mode (no PII collection).'
      },
      {
        name: 'disableCookies',
        type: 'checkbox',
        label: 'Disable Cookies',
        default: false,
        size: 'medium',
        description: 'Disable all Qualaroo cookies.'
      },
      {
        name: 'enableGDPR',
        type: 'checkbox',
        label: 'Enable GDPR Compliance',
        default: false,
        size: 'medium',
        description: 'Enable GDPR compliance features.'
      },
      {
        name: 'cookieDomain',
        type: 'text',
        label: 'Cookie Domain',
        placeholder: 'auto',
        required: false,
        size: 'medium',
        description: 'Domain for Qualaroo cookies (default: auto).',
        validation: {
          pattern: /^(auto|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          message: 'Must be "auto" or a valid domain'
        }
      },
      {
        name: 'cookieSecure',
        type: 'checkbox',
        label: 'Secure Cookies',
        default: true,
        size: 'small',
        description: 'Use secure flag for cookies.'
      },
      {
        name: 'customUserId',
        type: 'text',
        label: 'Custom User ID Field',
        placeholder: 'e.g., user_id',
        required: false,
        size: 'medium',
        description: 'JavaScript variable containing user ID.',
        validation: {
          pattern: /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/,
          message: 'Must be a valid JavaScript variable path'
        }
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
        name: 'userProperties',
        type: 'array',
        label: 'User Properties',
        description: 'User properties for targeting (e.g., plan=premium, role=admin, signup_date=2023-01-01).',
        help_link: {
          url: 'https://help.qualaroo.com/hc/en-us/articles/201489667',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., property=value',
          button_text: 'Add Property',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: property=value'
          }
        }
      },
      {
        name: 'customVariables',
        type: 'array',
        label: 'Custom Variables',
        description: 'Custom variables for survey logic (e.g., cart_value=99.99, items_count=3).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., variable=value',
          button_text: 'Add Variable',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: variable=value'
          }
        }
      },
      {
        name: 'pageTargeting',
        type: 'array',
        label: 'Page Categories',
        description: 'Categorize pages for targeting (e.g., homepage, product, checkout, blog).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., page-category',
          button_text: 'Add Category',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z0-9-_]+$/,
            message: 'Must be alphanumeric with hyphens or underscores'
          }
        }
      },
      {
        name: 'excludePages',
        type: 'array',
        label: 'Exclude URL Patterns',
        description: 'URL patterns where surveys should not appear (e.g., /admin/*, /checkout/*).',
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
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Events to trigger surveys (e.g., purchase_complete, error_occurred, help_clicked).',
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
        name: 'integrations',
        type: 'select',
        label: 'Analytics Integration',
        required: false,
        size: 'full',
        description: 'Send survey responses to analytics platform.',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Google Analytics', value: 'ga' },
          { label: 'Google Analytics 4', value: 'ga4' },
          { label: 'Segment', value: 'segment' },
          { label: 'Mixpanel', value: 'mixpanel' },
          { label: 'Amplitude', value: 'amplitude' }
        ],
        default: 'none'
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Qualaroo] Skipping load in development environment');
          }
          return;
      }
      
      // Check for GDPR consent if enabled
      if ({{enableGDPR}} && typeof window.hasUserConsent === 'function' && !window.hasUserConsent('feedback')) {
          if ({{debugMode}}) {
              console.log('[Qualaroo] Waiting for user consent');
          }
          return;
      }
      
      // Check device type
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile && !{{showOnMobile}}) {
          if ({{debugMode}}) {
              console.log('[Qualaroo] Disabled on mobile devices');
          }
          return;
      }
      if (!isMobile && !{{showOnDesktop}}) {
          if ({{debugMode}}) {
              console.log('[Qualaroo] Disabled on desktop devices');
          }
          return;
      }
      
      // Check excluded pages
      var excludePatternsArray = [{{excludePages}}] || [];
      var currentPath = window.location.pathname;
      for (var i = 0; i < excludePatternsArray.length; i++) {
          var pattern = excludePatternsArray[i];
          if (pattern) {
              var regex = new RegExp(pattern.replace(/\*/g, '.*'));
              if (regex.test(currentPath)) {
                  if ({{debugMode}}) {
                      console.log('[Qualaroo] Page excluded by pattern:', pattern);
                  }
                  return;
              }
          }
      }
      
      // Check sampling rate
      var samplingRate = {{samplingRate}} || 100;
      if (samplingRate < 100) {
          var random = Math.random() * 100;
          if (random > samplingRate) {
              if ({{debugMode}}) {
                  console.log('[Qualaroo] Visitor excluded by sampling rate');
              }
              return;
          }
      }
      
      // Initialize Qualaroo configuration
      window._kiq = window._kiq || [];
      
      // Set site ID
      window._kiq.push(['identify', '{{siteId}}']);
      
      // Configure settings
      if ({{disableAutoTargeting}}) {
          window._kiq.push(['disableAutoTargeting', true]);
      }
      
      if ('{{language}}' !== 'auto') {
          window._kiq.push(['language', '{{language}}']);
      }
      
      if ('{{position}}') {
          window._kiq.push(['position', '{{position}}']);
      }
      
      if ({{minimizeDelay}} > 0) {
          window._kiq.push(['minimizeDelay', {{minimizeDelay}}]);
      }
      
      if ({{hideOnFormPages}}) {
          window._kiq.push(['hideOnFormPages', true]);
      }
      
      // Privacy settings
      if ({{privacyMode}}) {
          window._kiq.push(['privacyMode', true]);
      }
      
      if ({{disableCookies}}) {
          window._kiq.push(['disableCookies', true]);
      }
      
      // Cookie settings
      if ('{{cookieDomain}}' && '{{cookieDomain}}' !== 'auto') {
          window._kiq.push(['cookieDomain', '{{cookieDomain}}']);
      }
      
      if ({{cookieSecure}}) {
          window._kiq.push(['cookieSecure', true]);
      }
      
      // Set custom user ID
      var customUserId = '{{customUserId}}';
      if (customUserId) {
          try {
              var userId = eval(customUserId);
              if (userId) {
                  window._kiq.push(['identify', userId]);
                  if ({{debugMode}}) {
                      console.log('[Qualaroo] User identified:', userId);
                  }
              }
          } catch (e) {
              if ({{debugMode}}) {
                  console.error('[Qualaroo] Error evaluating custom user ID:', e);
              }
          }
      }
      
      // Process user properties
      var userPropsArray = [{{userProperties}}] || [];
      var userProps = {};
      userPropsArray.forEach(function(prop) {
          if (typeof prop === 'string' && prop.includes('=')) {
              var parts = prop.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value)) value = Number(value);
                  userProps[key] = value;
              }
          }
      });
      
      if (Object.keys(userProps).length > 0) {
          window._kiq.push(['set', userProps]);
          if ({{debugMode}}) {
              console.log('[Qualaroo] User properties set:', userProps);
          }
      }
      
      // Process custom variables
      var customVarsArray = [{{customVariables}}] || [];
      customVarsArray.forEach(function(varStr) {
          if (typeof varStr === 'string' && varStr.includes('=')) {
              var parts = varStr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value)) value = Number(value);
                  window._kiq.push(['set', {[key]: value}]);
              }
          }
      });
      
      // Set page categories
      var pageCategories = [{{pageTargeting}}] || [];
      if (pageCategories.length > 0) {
          window._kiq.push(['set', { page_categories: pageCategories }]);
          if ({{debugMode}}) {
              console.log('[Qualaroo] Page categories:', pageCategories);
          }
      }
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          window.qualarooCustomEvents = customEventsArray;
          
          // Helper function to trigger surveys by event
          window.triggerQualarooEvent = function(eventName, data) {
              if (window.qualarooCustomEvents.indexOf(eventName) !== -1) {
                  window._kiq = window._kiq || [];
                  window._kiq.push(['eventHandler', eventName, data || {}]);
                  
                  if ({{debugMode}}) {
                      console.log('[Qualaroo] Event triggered:', eventName, data);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[Qualaroo] Custom events configured:', customEventsArray);
          }
      }
      
      // Analytics integration
      var integration = '{{integrations}}';
      if (integration && integration !== 'none') {
          window._kiq.push(['integration', integration]);
          if ({{debugMode}}) {
              console.log('[Qualaroo] Analytics integration enabled:', integration);
          }
      }
      
      // Helper functions
      window.QualarooAPI = {
          // Show specific survey
          showSurvey: function(surveyId) {
              window._kiq = window._kiq || [];
              window._kiq.push(['showSurvey', surveyId]);
          },
          
          // Hide all surveys
          hideAllSurveys: function() {
              window._kiq = window._kiq || [];
              window._kiq.push(['hideAllMessages']);
          },
          
          // Set custom property
          setProperty: function(key, value) {
              window._kiq = window._kiq || [];
              window._kiq.push(['set', {[key]: value}]);
          },
          
          // Track conversion
          trackConversion: function(value, label) {
              window._kiq = window._kiq || [];
              window._kiq.push(['trackConversion', value, label]);
          }
      };
      
      if ({{debugMode}}) {
          window._kiq.push(['debug', true]);
          console.log('[Qualaroo] Debug mode enabled');
          console.log('[Qualaroo] Site ID:', '{{siteId}}');
          console.log('[Qualaroo] Configuration loaded');
      }
      
      // Load Qualaroo script
      (function() {
          var siteId = '{{siteId}}';
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://cl.qualaroo.com/ki.js/' + siteId + '.js';
          
          script.onload = function() {
              if ({{debugMode}}) {
                  console.log('[Qualaroo] Script loaded successfully');
              }
              
              // Fire page view event
              if ({{enableOnAllPages}}) {
                  window._kiq.push(['trackEvent', 'Page View', {
                      url: window.location.href,
                      title: document.title,
                      timestamp: new Date().toISOString()
                  }]);
              }
          };
          
          script.onerror = function() {
              console.error('[Qualaroo] Failed to load script');
          };
          
          var first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
      })();
    })();`
  }});

module.exports = qualarooTemplate;
