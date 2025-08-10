/**
 * AB Tasty Template
 */

const createTemplate = require('../utils/createTemplate');

const abTastyTemplate = createTemplate({
    // Required keys
    name: 'AB Tasty',
    path: 'ab-tasty',
    description: 'Experience optimization platform for A/B testing, personalization, and feature management.',
    template_id: '1022',
    template_version: '1.0.0',
    category: 'testing',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/abtasty.com',
    note: '**AB Tasty** provides A/B testing, personalization, AI-powered recommendations, and feature flags. Find your Account ID in Settings → Account.',
    help_link: {
      text: 'Learn more about AB Tasty implementation in the',
      url: 'https://support.abtasty.com/hc/en-us/articles/360017883632-Installation-guide',
      label: 'Documentation'
    },
    field_mappings: {
      accountId: 'account_id',
      testMode: 'test_mode',
      environment: 'environment',
      includeJquery: 'include_jquery',
      apiEndpoint: 'api_endpoint',
      cookieDomain: 'cookie_domain',
      cookieSameSite: 'cookie_same_site',
      cookieSecure: 'cookie_secure',
      cookieDuration: 'cookie_duration',
      autoActivation: 'auto_activation',
      pageViewTracking: 'page_view_tracking',
      clickTracking: 'click_tracking',
      heatmapTracking: 'heatmap_tracking',
      scrollTracking: 'scroll_tracking',
      sessionRecording: 'session_recording',
      consentMode: 'consent_mode',
      dataResidency: 'data_residency',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      customSegments: 'custom_segments',
      globalCode: 'global_code',
      pageTargeting: 'page_targeting',
      customEvents: 'custom_events',
      userContext: 'user_context'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'accountId',
        type: 'text',
        label: 'Account ID',
        placeholder: 'YOUR_ACCOUNT_ID',
        required: true,
        size: 'medium',
        description: 'Your AB Tasty Account ID from Settings → Account.',
        validation: {
          pattern: /^[a-fA-F0-9]{32}$/,
          message: 'Must be a 32-character hexadecimal ID'
        }
      },
      {
        name: 'environment',
        type: 'select',
        label: 'Environment',
        required: true,
        size: 'medium',
        description: 'Select your AB Tasty environment.',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
          { label: 'Development', value: 'development' }
        ],
        default: 'production'
      },
      {
        name: 'testMode',
        type: 'checkbox',
        label: 'Test Mode',
        default: false,
        size: 'medium',
        description: 'Enable test mode (campaigns run but no data is collected).'
      },
      {
        name: 'dataResidency',
        type: 'select',
        label: 'Data Residency',
        required: false,
        size: 'medium',
        description: 'Select your data storage region.',
        options: [
          { label: 'Europe (EU)', value: 'eu' },
          { label: 'United States (US)', value: 'us' },
          { label: 'Asia Pacific (APAC)', value: 'apac' }
        ],
        default: 'eu'
      },
      {
        name: 'includeJquery',
        type: 'checkbox',
        label: 'Include jQuery',
        default: false,
        size: 'medium',
        description: 'Include jQuery library if not already present.'
      },
      {
        name: 'autoActivation',
        type: 'checkbox',
        label: 'Auto-activate Campaigns',
        default: true,
        size: 'medium',
        description: 'Automatically activate eligible campaigns on page load.'
      },
      {
        name: 'pageViewTracking',
        type: 'checkbox',
        label: 'Track Page Views',
        default: true,
        size: 'medium',
        description: 'Automatically track page view events.'
      },
      {
        name: 'clickTracking',
        type: 'checkbox',
        label: 'Track Clicks',
        default: true,
        size: 'medium',
        description: 'Enable automatic click tracking.'
      },
      {
        name: 'heatmapTracking',
        type: 'checkbox',
        label: 'Enable Heatmaps',
        default: false,
        size: 'medium',
        description: 'Enable heatmap data collection.'
      },
      {
        name: 'scrollTracking',
        type: 'checkbox',
        label: 'Track Scroll Depth',
        default: false,
        size: 'medium',
        description: 'Track user scroll behavior.'
      },
      {
        name: 'sessionRecording',
        type: 'checkbox',
        label: 'Session Recording',
        default: false,
        size: 'medium',
        description: 'Enable session recording features.'
      },
      {
        name: 'consentMode',
        type: 'select',
        label: 'Consent Mode',
        required: false,
        size: 'medium',
        description: 'GDPR/Privacy consent handling.',
        options: [
          { label: 'No consent required', value: 'none' },
          { label: 'Implicit consent', value: 'implicit' },
          { label: 'Explicit consent required', value: 'explicit' }
        ],
        default: 'none'
      },
      {
        name: 'cookieDomain',
        type: 'text',
        label: 'Cookie Domain',
        placeholder: 'auto',
        required: false,
        size: 'medium',
        description: 'Domain for AB Tasty cookies (default: auto).',
        validation: {
          pattern: /^(auto|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          message: 'Must be "auto" or a valid domain'
        }
      },
      {
        name: 'cookieSameSite',
        type: 'select',
        label: 'Cookie SameSite',
        required: false,
        size: 'small',
        description: 'SameSite attribute for cookies.',
        options: [
          { label: 'Lax', value: 'Lax' },
          { label: 'Strict', value: 'Strict' },
          { label: 'None', value: 'None' }
        ],
        default: 'Lax'
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
        name: 'cookieDuration',
        type: 'number',
        label: 'Cookie Duration (days)',
        placeholder: '365',
        required: false,
        size: 'small',
        description: 'Visitor cookie duration in days.',
        validation: {
          min: 1,
          max: 730,
          message: 'Must be between 1 and 730 days'
        },
        default: 365
      },
      {
        name: 'debugMode',
        type: 'checkbox',
        label: 'Debug Mode',
        default: false,
        size: 'medium',
        description: 'Enable console logging and debug panel.'
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
        name: 'customSegments',
        type: 'array',
        label: 'Custom Segments',
        description: 'Define custom segments for targeting (e.g., vip=true, location=US, plan=premium).',
        help_link: {
          url: 'https://support.abtasty.com/hc/en-us/articles/360018009372',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., key=value',
          button_text: 'Add Segment',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: key=value'
          }
        }
      },
      {
        name: 'globalCode',
        type: 'textarea',
        label: 'Global JavaScript Code',
        placeholder: '// Custom JavaScript to run before AB Tasty loads',
        required: false,
        size: 'full',
        description: 'JavaScript code to execute before AB Tasty initialization.',
        rows: 5
      },
      {
        name: 'pageTargeting',
        type: 'array',
        label: 'Page Categories',
        description: 'Define page categories for targeting (e.g., home, product, checkout).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., category-name',
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
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Custom events to track (e.g., add-to-cart, checkout, subscribe).',
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
        name: 'userContext',
        type: 'array',
        label: 'User Context Variables',
        description: 'User context for personalization (e.g., userId=123, email=user@example.com).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., key=value',
          button_text: 'Add Context',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: key=value'
          }
        }
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[AB Tasty] Skipping load in development environment');
          }
          return;
      }
      
      // Check for consent if required
      var consentMode = '{{consentMode}}';
      if (consentMode === 'explicit' && typeof window.hasUserConsent === 'function' && !window.hasUserConsent('testing')) {
          if ({{debugMode}}) {
              console.log('[AB Tasty] Waiting for user consent');
          }
          return;
      }
      
      // Global configuration
      window.ABTastyConfig = window.ABTastyConfig || {};
      window.ABTastyConfig.accountId = '{{accountId}}';
      window.ABTastyConfig.environment = '{{environment}}';
      window.ABTastyConfig.testMode = {{testMode}};
      window.ABTastyConfig.autoActivation = {{autoActivation}};
      
      // Cookie configuration
      window.ABTastyConfig.cookies = {
          domain: '{{cookieDomain}}' || 'auto',
          sameSite: '{{cookieSameSite}}' || 'Lax',
          secure: {{cookieSecure}},
          duration: {{cookieDuration}} || 365
      };
      
      // Tracking configuration
      window.ABTastyConfig.tracking = {
          pageView: {{pageViewTracking}},
          click: {{clickTracking}},
          heatmap: {{heatmapTracking}},
          scroll: {{scrollTracking}},
          sessionRecording: {{sessionRecording}}
      };
      
      // Data residency
      var dataResidency = '{{dataResidency}}' || 'eu';
      var apiEndpoints = {
          'eu': 'https://tag-eu.abtasty.com',
          'us': 'https://tag-us.abtasty.com',
          'apac': 'https://tag-apac.abtasty.com'
      };
      window.ABTastyConfig.apiEndpoint = apiEndpoints[dataResidency] || apiEndpoints['eu'];
      
      // Debug mode
      if ({{debugMode}}) {
          window.ABTastyConfig.debug = true;
          window.ABTastyDebug = true;
          console.log('[AB Tasty] Debug mode enabled');
      }
      
      // Process custom segments
      var segmentsArray = [{{customSegments}}] || [];
      var segments = {};
      segmentsArray.forEach(function(segment) {
          if (typeof segment === 'string' && segment.includes('=')) {
              var parts = segment.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value)) value = Number(value);
                  segments[key] = value;
              }
          }
      });
      
      if (Object.keys(segments).length > 0) {
          window.ABTastySegments = segments;
          if ({{debugMode}}) {
              console.log('[AB Tasty] Custom segments:', segments);
          }
      }
      
      // Process user context
      var userContextArray = [{{userContext}}] || [];
      var userContext = {};
      userContextArray.forEach(function(context) {
          if (typeof context === 'string' && context.includes('=')) {
              var parts = context.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  userContext[key] = value;
              }
          }
      });
      
      if (Object.keys(userContext).length > 0) {
          window.ABTastyUserContext = userContext;
          if ({{debugMode}}) {
              console.log('[AB Tasty] User context:', userContext);
          }
      }
      
      // Page categories
      var pageCategories = [{{pageTargeting}}] || [];
      if (pageCategories.length > 0) {
          window.ABTastyPageCategories = pageCategories;
          if ({{debugMode}}) {
              console.log('[AB Tasty] Page categories:', pageCategories);
          }
      }
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          window.ABTastyCustomEvents = customEventsArray;
          
          // Helper function to track custom events
          window.trackABTastyEvent = function(eventName, properties) {
              if (window.ABTastyCustomEvents.indexOf(eventName) !== -1 && window.ABTasty && window.ABTasty.send) {
                  window.ABTasty.send('event', {
                      name: eventName,
                      properties: properties || {},
                      timestamp: new Date().getTime()
                  });
                  
                  if ({{debugMode}}) {
                      console.log('[AB Tasty] Tracked event:', eventName, properties);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[AB Tasty] Custom events configured:', customEventsArray);
          }
      }
      
      // Execute global code
      var globalCode = {{globalCode}};
      if (globalCode) {
          try {
              (function() {
                  eval(globalCode);
              })();
              if ({{debugMode}}) {
                  console.log('[AB Tasty] Global code executed');
              }
          } catch (error) {
              console.error('[AB Tasty] Error executing global code:', error);
          }
      }
      
      // Helper functions
      window.ABTastyHelpers = {
          // Trigger campaign activation
          activateCampaign: function(campaignId) {
              if (window.ABTasty && window.ABTasty.activate) {
                  window.ABTasty.activate(campaignId);
              }
          },
          
          // Update segments
          updateSegments: function(newSegments) {
              if (window.ABTasty && window.ABTasty.updateSegments) {
                  window.ABTasty.updateSegments(newSegments);
              }
          },
          
          // Send custom data
          sendCustomData: function(data) {
              if (window.ABTasty && window.ABTasty.send) {
                  window.ABTasty.send('custom', data);
              }
          }
      };
      
      if ({{debugMode}}) {
          console.log('[AB Tasty] Configuration:', window.ABTastyConfig);
          console.log('[AB Tasty] Account ID:', '{{accountId}}');
      }
      
      // Load AB Tasty script
      (function() {
          var includeJquery = {{includeJquery}};
          var accountId = '{{accountId}}';
          
          // Load jQuery if needed
          if (includeJquery && typeof jQuery === 'undefined') {
              var jquery = document.createElement('script');
              jquery.type = 'text/javascript';
              jquery.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
              jquery.onload = function() {
                  loadABTasty();
              };
              document.head.appendChild(jquery);
          } else {
              loadABTasty();
          }
          
          function loadABTasty() {
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.async = true;
              script.src = window.ABTastyConfig.apiEndpoint + '/tag.js?id=' + accountId;
              
              script.onload = function() {
                  if ({{debugMode}}) {
                      console.log('[AB Tasty] Script loaded successfully');
                  }
                  
                  // Initialize after load
                  if (window.ABTasty && window.ABTasty.init) {
                      window.ABTasty.init();
                      
                      // Send page view if enabled
                      if ({{pageViewTracking}} && window.ABTasty.send) {
                          window.ABTasty.send('pageview', {
                              url: window.location.href,
                              title: document.title
                          });
                      }
                  }
              };
              
              script.onerror = function() {
                  console.error('[AB Tasty] Failed to load script');
              };
              
              var first = document.getElementsByTagName('script')[0];
              first.parentNode.insertBefore(script, first);
          }
      })();
    })();`
  });

module.exports = abTastyTemplate;
